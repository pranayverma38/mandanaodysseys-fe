import { getAuthenticatedCustomer } from '@/lib/auth/session'
import { getStripeServer, STRIPE_CHECKOUT_CURRENCY, toStripeAmount } from '@/lib/stripe/server'
import { NextRequest, NextResponse } from 'next/server'

type PaymentIntentRequest = {
  amount: number
  paymentIntentId?: string
  metadata?: {
    handle?: string
    itineraryTitle?: string
    paymentMode?: string
    tripTotal?: string
    depositAmount?: string
    chargeAmount?: string
    dateRange?: string
    guests?: string
    guestCount?: string
    startDate?: string
    endDate?: string
    destination?: string
    packageImage?: string
  }
}

function buildCustomerName(customer: NonNullable<Awaited<ReturnType<typeof getAuthenticatedCustomer>>>) {
  const metadataName =
    typeof customer.metadata?.full_name === 'string' ? customer.metadata.full_name.trim() : ''

  if (metadataName) {
    return metadataName
  }

  return [customer.first_name, customer.last_name].filter(Boolean).join(' ').trim()
}

type CustomerStripeFields = {
  receipt_email?: string
  customerEmail?: string
  cus_phone?: string
  customerId?: string
  customerName?: string
}

function buildCustomerFields(customer: Awaited<ReturnType<typeof getAuthenticatedCustomer>>): CustomerStripeFields {
  if (!customer?.email) {
    return {}
  }

  const customerName = buildCustomerName(customer)
  const phone = customer.phone?.trim()

  return {
    receipt_email: customer.email,
    customerEmail: customer.email,
    customerId: customer.id,
    ...(phone ? { cus_phone: phone } : {}),
    ...(customerName ? { customerName } : {}),
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PaymentIntentRequest
    const { amount, paymentIntentId, metadata = {} } = body

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Invalid payment amount' }, { status: 400 })
    }

    const stripe = getStripeServer()
    const amountInCents = toStripeAmount(amount)
    const customer = await getAuthenticatedCustomer()
    const customerFields = buildCustomerFields(customer)

    if (amountInCents < 50) {
      return NextResponse.json({ error: 'Payment amount is too low' }, { status: 400 })
    }

    const stripeMetadata = Object.fromEntries(
      Object.entries({
        ...metadata,
        ...(customerFields.customerEmail ? { customerEmail: customerFields.customerEmail } : {}),
        ...(customerFields.cus_phone ? { cus_phone: customerFields.cus_phone } : {}),
        ...(customerFields.customerId ? { customerId: customerFields.customerId } : {}),
        ...(customerFields.customerName ? { customerName: customerFields.customerName } : {}),
      })
        .filter(([, value]) => value !== undefined && value !== '')
        .map(([key, value]) => [key, String(value)])
    )

    const receiptEmail = customerFields.receipt_email

    if (paymentIntentId) {
      const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
        amount: amountInCents,
        metadata: stripeMetadata,
        ...(receiptEmail ? { receipt_email: receiptEmail } : {}),
      })

      if (!paymentIntent.client_secret) {
        return NextResponse.json({ error: 'Missing client secret' }, { status: 500 })
      }

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: STRIPE_CHECKOUT_CURRENCY,
      automatic_payment_methods: { enabled: true },
      metadata: stripeMetadata,
      ...(receiptEmail ? { receipt_email: receiptEmail } : {}),
    })

    if (!paymentIntent.client_secret) {
      return NextResponse.json({ error: 'Missing client secret' }, { status: 500 })
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error('[stripe/payment-intent]', error)
    return NextResponse.json({ error: 'Failed to initialize payment' }, { status: 500 })
  }
}
