import type Stripe from 'stripe'

export type VerifiedPaymentIntent = {
  id: string
  status: Stripe.PaymentIntent.Status
  amount: number
  currency: string
  metadata: {
    handle?: string
    itineraryTitle?: string
    paymentMode?: string
    tripTotal?: string
    depositAmount?: string
    chargeAmount?: string
    dateRange?: string
    guests?: string
  }
}

export function normalizePaymentIntent(paymentIntent: Stripe.PaymentIntent): VerifiedPaymentIntent {
  return {
    id: paymentIntent.id,
    status: paymentIntent.status,
    amount: paymentIntent.amount / 100,
    currency: paymentIntent.currency,
    metadata: {
      handle: paymentIntent.metadata.handle,
      itineraryTitle: paymentIntent.metadata.itineraryTitle,
      paymentMode: paymentIntent.metadata.paymentMode,
      tripTotal: paymentIntent.metadata.tripTotal,
      depositAmount: paymentIntent.metadata.depositAmount,
      chargeAmount: paymentIntent.metadata.chargeAmount,
      dateRange: paymentIntent.metadata.dateRange,
      guests: paymentIntent.metadata.guests,
    },
  }
}

export function isPaymentComplete(status: Stripe.PaymentIntent.Status): boolean {
  return status === 'succeeded' || status === 'processing'
}
