import 'server-only'

import { getItineraryByHandle } from '@/data/itineraries'
import { getItineraryDestinationName } from '@/data/itineraries/destinations'
import { STRIPE_CHECKOUT_CURRENCY } from '@/lib/stripe/server'
import { findCustomerByEmail, isMedusaAdminConfigured, medusaAdminFetch } from '@/lib/itineraries/medusa-admin'
import type { MedusaCustomer } from '@/lib/medusa/server-client'
import type Stripe from 'stripe'
import {
  BOOKING_ORDER_SOURCE,
  type BookingOrderMetadata,
  type MedusaDraftOrderResponse,
  type MedusaOrder,
  type MedusaOrderResponse,
  type MedusaOrdersResponse,
  type MedusaPaymentCollectionResponse,
  type MedusaRegionsResponse,
  type MedusaStoresResponse,
  type RecordedOrderPayment,
} from './order-types'

type MedusaRuntimeConfig = {
  regionId: string
  salesChannelId: string
}

let runtimeConfigPromise: Promise<MedusaRuntimeConfig> | null = null

function parseMetadataNumber(value: unknown, fallback = 0) {
  const parsed = Number.parseFloat(String(value ?? ''))
  return Number.isFinite(parsed) ? parsed : fallback
}

function parseRecordedPayments(metadata: Record<string, unknown> | null | undefined): RecordedOrderPayment[] {
  const raw = metadata?.recorded_payments

  if (typeof raw !== 'string' || !raw.trim()) {
    return []
  }

  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(
      (item): item is RecordedOrderPayment =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as RecordedOrderPayment).payment_intent_id === 'string' &&
        typeof (item as RecordedOrderPayment).payment_collection_id === 'string'
    )
  } catch {
    return []
  }
}

function parsePaymentIntentIds(metadata: Record<string, unknown> | null | undefined) {
  const raw = metadata?.stripe_payment_intent_ids

  if (typeof raw !== 'string' || !raw.trim()) {
    return [] as string[]
  }

  try {
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []
  } catch {
    return []
  }
}

function isBookingOrder(order: MedusaOrder) {
  return order.metadata?.source === BOOKING_ORDER_SOURCE
}

function asBookingMetadata(metadata: Record<string, unknown> | null | undefined): BookingOrderMetadata | null {
  if (!metadata || metadata.source !== BOOKING_ORDER_SOURCE) {
    return null
  }

  return metadata as BookingOrderMetadata
}

function buildCustomerName(customer: Pick<MedusaCustomer, 'first_name' | 'last_name' | 'metadata'> | null) {
  if (!customer) {
    return ''
  }

  const metadataName =
    typeof customer.metadata?.full_name === 'string' ? customer.metadata.full_name.trim() : ''

  if (metadataName) {
    return metadataName
  }

  return [customer.first_name, customer.last_name].filter(Boolean).join(' ').trim()
}

function buildBookingKey(input: { customerId?: string; email: string; handle: string; startDate: string }) {
  const customerKey = input.customerId || input.email.trim().toLowerCase()
  return `${customerKey}:${input.handle}:${input.startDate}`
}

async function getMedusaRuntimeConfig(): Promise<MedusaRuntimeConfig> {
  if (!runtimeConfigPromise) {
    runtimeConfigPromise = (async () => {
      const envRegionId = process.env.MEDUSA_REGION_ID?.trim()
      const envSalesChannelId = process.env.MEDUSA_SALES_CHANNEL_ID?.trim()

      const { stores } = await medusaAdminFetch<MedusaStoresResponse>('/admin/stores')
      const store = stores[0]

      if (!store) {
        throw new Error('No Medusa store is configured.')
      }

      const salesChannelId = envSalesChannelId || store.default_sales_channel_id

      if (!salesChannelId) {
        throw new Error('Medusa sales channel is not configured.')
      }

      if (envRegionId) {
        return { regionId: envRegionId, salesChannelId }
      }

      const { regions } = await medusaAdminFetch<MedusaRegionsResponse>(
        `/admin/regions?currency_code=${STRIPE_CHECKOUT_CURRENCY}&limit=1`
      )

      const region = regions[0]

      if (!region) {
        throw new Error(
          `No Medusa region found for currency "${STRIPE_CHECKOUT_CURRENCY}". Set MEDUSA_REGION_ID in your environment.`
        )
      }

      return { regionId: region.id, salesChannelId }
    })()
  }

  return runtimeConfigPromise
}

async function getOrderById(orderId: string) {
  const { order } = await medusaAdminFetch<MedusaOrderResponse>(
    `/admin/orders/${orderId}?fields=id,display_id,email,customer_id,total,metadata,created_at,updated_at,items,payment_collections,payment_status`
  )

  return order
}

async function listOrdersByEmail(email: string) {
  const orders: MedusaOrder[] = []
  const limit = 100
  let offset = 0
  const fields =
    'id,display_id,email,customer_id,total,metadata,created_at,updated_at,items,payment_status'

  while (true) {
    const { orders: page, count } = await medusaAdminFetch<MedusaOrdersResponse>(
      `/admin/orders?email=${encodeURIComponent(email.trim().toLowerCase())}&fields=${fields}&limit=${limit}&offset=${offset}`
    )

    orders.push(...page)
    offset += page.length

    if (offset >= count || page.length === 0) {
      break
    }
  }

  return orders.filter(isBookingOrder)
}

async function findOrderByPaymentIntentId(paymentIntentId: string, email?: string) {
  if (!email) {
    return null
  }

  const orders = await listOrdersByEmail(email)
  return (
    orders.find((order) => {
      const metadata = order.metadata
      if (!metadata) return false

      if (metadata.stripe_payment_intent_id === paymentIntentId) {
        return true
      }

      return parsePaymentIntentIds(metadata).includes(paymentIntentId)
    }) ?? null
  )
}

async function findOrderByBookingKey(bookingKey: string, email: string) {
  const orders = await listOrdersByEmail(email)
  return orders.find((order) => order.metadata?.booking_key === bookingKey) ?? null
}

async function createDraftBookingOrder(input: {
  regionId: string
  salesChannelId: string
  customerId: string
  email: string
  title: string
  tripTotal: number
  metadata: BookingOrderMetadata
}) {
  const { draft_order } = await medusaAdminFetch<MedusaDraftOrderResponse>('/admin/draft-orders', {
    method: 'POST',
    body: JSON.stringify({
      region_id: input.regionId,
      sales_channel_id: input.salesChannelId,
      email: input.email,
      customer_id: input.customerId,
      items: [
        {
          title: input.title,
          quantity: 1,
          unit_price: input.tripTotal,
          metadata: {
            package_handle: input.metadata.package_handle,
          },
        },
      ],
      metadata: input.metadata,
    }),
  })

  const { order } = await medusaAdminFetch<MedusaOrderResponse>(
    `/admin/draft-orders/${draft_order.id}/convert-to-order`,
    {
      method: 'POST',
      body: JSON.stringify({}),
    }
  )

  return order
}

async function updateBookingOrder(orderId: string, metadata: BookingOrderMetadata) {
  const { order } = await medusaAdminFetch<MedusaOrderResponse>(`/admin/orders/${orderId}`, {
    method: 'POST',
    body: JSON.stringify({ metadata }),
  })

  return order
}

async function recordOrderPayment(
  orderId: string,
  paymentIntentId: string,
  amount: number,
  metadata: BookingOrderMetadata
) {
  const recordedPayments = parseRecordedPayments(metadata)

  if (recordedPayments.some((payment) => payment.payment_intent_id === paymentIntentId)) {
    return metadata
  }

  const order = await getOrderById(orderId)
  const existingCollection = order.payment_collections?.find(
    (collection) =>
      collection.status === 'completed' &&
      !recordedPayments.some((payment) => payment.payment_collection_id === collection.id)
  )

  if (existingCollection && parsePaymentIntentIds(metadata).includes(paymentIntentId)) {
    const nextMetadata: BookingOrderMetadata = {
      ...metadata,
      recorded_payments: JSON.stringify([
        ...recordedPayments,
        {
          payment_intent_id: paymentIntentId,
          payment_collection_id: existingCollection.id,
          amount: String(existingCollection.captured_amount ?? existingCollection.amount ?? amount),
        },
      ]),
    }

    return updateBookingOrder(orderId, nextMetadata)
  }

  const { payment_collection } = await medusaAdminFetch<MedusaPaymentCollectionResponse>(
    '/admin/payment-collections',
    {
      method: 'POST',
      body: JSON.stringify({
        order_id: orderId,
        amount,
      }),
    }
  )

  await medusaAdminFetch<MedusaPaymentCollectionResponse>(
    `/admin/payment-collections/${payment_collection.id}/mark-as-paid`,
    {
      method: 'POST',
      body: JSON.stringify({
        order_id: orderId,
      }),
    }
  )

  const nextMetadata: BookingOrderMetadata = {
    ...metadata,
    recorded_payments: JSON.stringify([
      ...recordedPayments,
      {
        payment_intent_id: paymentIntentId,
        payment_collection_id: payment_collection.id,
        amount: String(amount),
      },
    ]),
  }

  return updateBookingOrder(orderId, nextMetadata)
}

type ParsedPaymentMetadata = {
  handle: string
  itineraryTitle: string
  paymentMode: string
  tripTotal: number
  chargeAmount: number
  dateRange: string
  guestsLabel: string
  guestCount: number
  startDate: string
  endDate: string
  destination: string
  packageImage: string
  customerEmail: string
  customerId: string
  customerName: string
}

async function parsePaymentMetadata(paymentIntent: Stripe.PaymentIntent): Promise<ParsedPaymentMetadata | null> {
  const metadata = paymentIntent.metadata
  const handle = metadata.handle?.trim()

  if (!handle) {
    return null
  }

  const itinerary = await getItineraryByHandle(handle)
  const customerEmail = (metadata.customerEmail || paymentIntent.receipt_email || '').trim().toLowerCase()

  if (!customerEmail) {
    return null
  }

  const resolvedCustomer = await findCustomerByEmail(customerEmail)

  if (!resolvedCustomer?.id) {
    throw new Error(`No Medusa customer found for ${customerEmail}.`)
  }

  const startDate =
    metadata.startDate?.trim() ||
    metadata.start_date?.trim() ||
    new Date().toISOString().slice(0, 10)
  const endDate =
    metadata.endDate?.trim() ||
    metadata.end_date?.trim() ||
    startDate

  const tripTotal = parseMetadataNumber(metadata.tripTotal)
  const chargeAmount = parseMetadataNumber(metadata.chargeAmount, paymentIntent.amount / 100)

  if (tripTotal <= 0 || chargeAmount <= 0) {
    return null
  }

  const destination =
    metadata.destination?.trim() ||
    (itinerary ? getItineraryDestinationName(itinerary.destination) : handle)

  const packageImage =
    metadata.packageImage?.trim() ||
    (typeof itinerary?.featuredImage === 'string' ? itinerary.featuredImage : '')

  const guestCount = Number.parseInt(metadata.guestCount ?? metadata.guest_count ?? '0', 10)

  return {
    handle,
    itineraryTitle: metadata.itineraryTitle?.trim() || itinerary?.title || handle,
    paymentMode: metadata.paymentMode?.trim() || 'full',
    tripTotal,
    chargeAmount,
    dateRange: metadata.dateRange?.trim() || `${startDate} – ${endDate}`,
    guestsLabel: metadata.guests?.trim() || metadata.guests_label?.trim() || '1 guest',
    guestCount: guestCount > 0 ? guestCount : 1,
    startDate,
    endDate,
    destination,
    packageImage,
    customerEmail,
    customerId: resolvedCustomer.id,
    customerName:
      metadata.customerName?.trim() ||
      buildCustomerName(resolvedCustomer) ||
      customerEmail,
  }
}

function buildBookingMetadata(input: {
  parsed: ParsedPaymentMetadata
  bookingKey: string
  paidAmount: number
  amountDue: number
  paymentStatus: 'partial' | 'paid'
  paymentIntentId: string
  paymentIntentIds: string[]
  bookedAt: string
}): BookingOrderMetadata {
  return {
    source: BOOKING_ORDER_SOURCE,
    booking_key: input.bookingKey,
    package_handle: input.parsed.handle,
    package_title: input.parsed.itineraryTitle,
    package_image: input.parsed.packageImage,
    destination: input.parsed.destination,
    customer_id: input.parsed.customerId,
    customer_email: input.parsed.customerEmail,
    customer_name: input.parsed.customerName,
    guests_label: input.parsed.guestsLabel,
    guest_count: String(input.parsed.guestCount),
    start_date: input.parsed.startDate,
    end_date: input.parsed.endDate,
    date_range: input.parsed.dateRange,
    trip_total: String(input.parsed.tripTotal),
    paid_amount: String(input.paidAmount),
    amount_due: String(Math.max(input.amountDue, 0)),
    payment_status: input.paymentStatus,
    payment_mode: input.parsed.paymentMode,
    stripe_payment_intent_id: input.paymentIntentId,
    stripe_payment_intent_ids: JSON.stringify(input.paymentIntentIds),
    booked_at: input.bookedAt,
  }
}

export async function upsertBookingOrderFromPayment(paymentIntent: Stripe.PaymentIntent) {
  if (!isMedusaAdminConfigured()) {
    console.warn('[medusa/orders] MEDUSA_SECRET_KEY is not configured; skipping order creation.')
    return null
  }

  const parsed = await parsePaymentMetadata(paymentIntent)

  if (!parsed) {
    console.warn('[medusa/orders] Missing booking metadata on payment intent', paymentIntent.id)
    return null
  }

  const existingByPayment = await findOrderByPaymentIntentId(paymentIntent.id, parsed.customerEmail)

  if (existingByPayment) {
    const existingMetadata = asBookingMetadata(existingByPayment.metadata)

    if (existingMetadata) {
      await recordOrderPayment(
        existingByPayment.id,
        paymentIntent.id,
        parsed.chargeAmount,
        existingMetadata
      )
    }

    console.info('[medusa/orders] Order already exists for payment intent', paymentIntent.id)
    return getOrderById(existingByPayment.id)
  }

  const bookingKey = buildBookingKey({
    customerId: parsed.customerId,
    email: parsed.customerEmail,
    handle: parsed.handle,
    startDate: parsed.startDate,
  })

  const existingBooking = await findOrderByBookingKey(bookingKey, parsed.customerEmail)
  const paymentIntentIds = existingBooking
    ? [...parsePaymentIntentIds(existingBooking.metadata), paymentIntent.id]
    : [paymentIntent.id]

  const previousPaid = existingBooking
    ? parseMetadataNumber(asBookingMetadata(existingBooking.metadata)?.paid_amount)
    : 0

  const paidAmount = Math.min(parsed.tripTotal, previousPaid + parsed.chargeAmount)
  const amountDue = Math.max(parsed.tripTotal - paidAmount, 0)
  const paymentStatus: 'partial' | 'paid' = amountDue <= 0 ? 'paid' : 'partial'
  const bookedAt =
    asBookingMetadata(existingBooking?.metadata ?? null)?.booked_at ??
    new Date(paymentIntent.created * 1000).toISOString()

  const metadata = buildBookingMetadata({
    parsed,
    bookingKey,
    paidAmount,
    amountDue,
    paymentStatus,
    paymentIntentId: paymentIntent.id,
    paymentIntentIds,
    bookedAt,
  })

  if (existingBooking?.metadata?.recorded_payments) {
    metadata.recorded_payments = String(existingBooking.metadata.recorded_payments)
  }

  let order: MedusaOrder

  if (existingBooking) {
    order = await updateBookingOrder(existingBooking.id, metadata)
    console.info('[medusa/orders] Updated booking order', {
      orderId: order.id,
      paymentIntentId: paymentIntent.id,
      paidAmount,
      amountDue,
    })
  } else {
    const { regionId, salesChannelId } = await getMedusaRuntimeConfig()
    order = await createDraftBookingOrder({
      regionId,
      salesChannelId,
      customerId: parsed.customerId,
      email: parsed.customerEmail,
      title: parsed.itineraryTitle,
      tripTotal: parsed.tripTotal,
      metadata,
    })

    console.info('[medusa/orders] Created booking order', {
      orderId: order.id,
      displayId: order.display_id,
      paymentIntentId: paymentIntent.id,
      paidAmount,
      amountDue,
    })
  }

  await recordOrderPayment(order.id, paymentIntent.id, parsed.chargeAmount, metadata)

  return getOrderById(order.id)
}

function orderBelongsToCustomer(order: MedusaOrder, customer: MedusaCustomer) {
  const email = customer.email?.trim().toLowerCase()
  const metadata = order.metadata

  return (
    order.customer_id === customer.id ||
    (!!email && order.email?.trim().toLowerCase() === email) ||
    metadata?.customer_id === customer.id ||
    (!!email && metadata?.customer_email === email)
  )
}

export async function listBookingOrdersForCustomer(customer: MedusaCustomer) {
  if (!isMedusaAdminConfigured() || !customer.email) {
    return []
  }

  const orders = await listOrdersByEmail(customer.email)

  return orders
    .filter((order) => orderBelongsToCustomer(order, customer))
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
}
