import 'server-only'

import { getItineraryByHandle } from '@/data/itineraries'
import type { ItineraryDetail } from '@/data/itineraries/types'
import { asBookingMetadata, getBookingOrderForCustomer } from '@/lib/medusa/orders'
import type { CheckoutBooking } from '@/lib/checkout/build-booking'
import type { MedusaCustomer } from '@/lib/medusa/server-client'

export type RemainingCheckoutSession = {
  medusaOrderId: string
  orderNumber: string
  itinerary: ItineraryDetail
  booking: CheckoutBooking
  paidSoFar: number
  amountDue: number
  tripTotal: number
}

function parseMetadataNumber(value: unknown, fallback = 0) {
  const parsed = Number.parseFloat(String(value ?? ''))
  return Number.isFinite(parsed) ? parsed : fallback
}

function formatOrderNumber(displayId: number, createdAt: string) {
  const year = new Date(createdAt).getFullYear()
  return `MO-${year}-${String(displayId).padStart(4, '0')}`
}

export async function getRemainingCheckoutSession(
  orderId: string,
  customer: MedusaCustomer
): Promise<RemainingCheckoutSession | null> {
  const order = await getBookingOrderForCustomer(orderId, customer)

  if (!order) {
    return null
  }

  const metadata = asBookingMetadata(order.metadata)

  if (!metadata || metadata.payment_status === 'paid') {
    return null
  }

  const tripTotal = parseMetadataNumber(metadata.trip_total, order.total)
  const paidSoFar = parseMetadataNumber(metadata.paid_amount)
  const amountDue = parseMetadataNumber(metadata.amount_due, Math.max(tripTotal - paidSoFar, 0))

  if (amountDue <= 0) {
    return null
  }

  const itinerary = await getItineraryByHandle(metadata.package_handle)

  if (!itinerary) {
    return null
  }

  const guestCount = Number.parseInt(metadata.guest_count ?? '1', 10) || 1
  const startDate = new Date(metadata.start_date)
  const endDate = new Date(metadata.end_date)

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return null
  }

  const booking: CheckoutBooking = {
    handle: metadata.package_handle,
    startDate,
    endDate,
    dateRangeLabel: metadata.date_range,
    guests: {
      guestAdults: guestCount,
      guestChildren: 0,
      guestInfants: 0,
    },
    guestsLabel: metadata.guests_label,
    totalGuests: guestCount,
    feeAndTaxes: 0,
    total: tripTotal,
  }

  return {
    medusaOrderId: order.id,
    orderNumber: formatOrderNumber(order.display_id, order.created_at),
    itinerary,
    booking,
    paidSoFar,
    amountDue,
    tripTotal,
  }
}
