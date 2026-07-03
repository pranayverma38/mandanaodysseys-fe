import Stripe from 'stripe'

let stripeClient: Stripe | null = null

export function getStripeServer(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey)
  }

  return stripeClient
}

export function toStripeAmount(amountInDollars: number): number {
  return Math.round(amountInDollars * 100)
}

export const STRIPE_CHECKOUT_CURRENCY = 'usd'
