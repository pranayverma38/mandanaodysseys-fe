import { getStripeServer, STRIPE_CHECKOUT_CURRENCY, toStripeAmount } from '@/lib/stripe/server'
import { NextRequest, NextResponse } from 'next/server'

type PaymentIntentRequest = {
  amount: number
  paymentIntentId?: string
  metadata?: {
    handle?: string
    paymentMode?: string
    tripTotal?: string
    depositAmount?: string
    chargeAmount?: string
    dateRange?: string
    guests?: string
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

    if (amountInCents < 50) {
      return NextResponse.json({ error: 'Payment amount is too low' }, { status: 400 })
    }

    const stripeMetadata = Object.fromEntries(
      Object.entries(metadata)
        .filter(([, value]) => value !== undefined && value !== '')
        .map(([key, value]) => [key, String(value)])
    )

    if (paymentIntentId) {
      const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
        amount: amountInCents,
        metadata: stripeMetadata,
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
