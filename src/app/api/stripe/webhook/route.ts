import { getStripeServer } from '@/lib/stripe/server'
import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'

export const runtime = 'nodejs'

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.info('[stripe/webhook] payment_intent.succeeded', {
    paymentIntentId: paymentIntent.id,
    customerEmail: paymentIntent.metadata.customerEmail ?? paymentIntent.receipt_email,
    handle: paymentIntent.metadata.handle,
    chargeAmount: paymentIntent.metadata.chargeAmount,
    paymentMode: paymentIntent.metadata.paymentMode,
  })
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.warn('[stripe/webhook] payment_intent.payment_failed', {
    paymentIntentId: paymentIntent.id,
    handle: paymentIntent.metadata.handle,
    lastPaymentError: paymentIntent.last_payment_error?.message,
  })
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('[stripe/webhook] STRIPE_WEBHOOK_SECRET is not configured')
    return NextResponse.json({ error: 'Webhook secret is not configured' }, { status: 500 })
  }

  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 })
  }

  const body = await request.text()
  const stripe = getStripeServer()

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error('[stripe/webhook] Signature verification failed', error)
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent)
        break
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent)
        break
      default:
        break
    }
  } catch (error) {
    console.error('[stripe/webhook] Handler failed', { type: event.type, error })
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
