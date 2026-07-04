import {
  isPaymentComplete,
  normalizePaymentIntent,
} from '@/lib/stripe/payment-intent-status'
import { upsertBookingOrderFromPayment } from '@/lib/medusa/orders'
import { getStripeServer } from '@/lib/stripe/server'
import PayDoneScrollReset from './pay-done-scroll-reset'
import PayDoneView, { type PayDoneStatus } from './pay-done-view'
import type Stripe from 'stripe'

type PageProps = {
  searchParams: Promise<{ payment_intent?: string }>
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams
  const paymentIntentId = params.payment_intent

  if (!paymentIntentId) {
    return (
      <PayDoneScrollReset>
        <PayDoneView status="missing" />
      </PayDoneScrollReset>
    )
  }

  let paymentIntent: Stripe.PaymentIntent

  try {
    paymentIntent = await getStripeServer().paymentIntents.retrieve(paymentIntentId)
  } catch {
    return (
      <PayDoneScrollReset>
        <PayDoneView status="verify-error" />
      </PayDoneScrollReset>
    )
  }

  const isComplete = isPaymentComplete(paymentIntent.status)
  const isProcessing = paymentIntent.status === 'processing'
  const verifiedPaymentIntent = normalizePaymentIntent(paymentIntent)

  if (isComplete) {
    try {
      await upsertBookingOrderFromPayment(paymentIntent)
    } catch (error) {
      console.error('[pay-done] Failed to sync Medusa booking order', error)
    }
  }

  let status: PayDoneStatus = 'failed'
  if (isProcessing) {
    status = 'processing'
  } else if (isComplete) {
    status = 'succeeded'
  }

  const title = verifiedPaymentIntent.metadata.itineraryTitle ?? 'Your trip'
  const dateRange = verifiedPaymentIntent.metadata.dateRange ?? 'Dates to be confirmed'
  const guests = verifiedPaymentIntent.metadata.guests ?? 'Guests'
  const chargeAmount =
    Number.parseFloat(verifiedPaymentIntent.metadata.chargeAmount ?? '') || verifiedPaymentIntent.amount
  const paymentMode = verifiedPaymentIntent.metadata.paymentMode === 'partial' ? 'Deposit' : 'Full payment'

  return (
    <PayDoneScrollReset>
      <PayDoneView
        status={status}
        title={title}
        dateRange={dateRange}
        guests={guests}
        chargeAmount={chargeAmount}
        paymentMode={paymentMode}
        paymentId={verifiedPaymentIntent.id}
        handle={verifiedPaymentIntent.metadata.handle}
        stripeStatus={verifiedPaymentIntent.status}
      />
    </PayDoneScrollReset>
  )
}

export default Page
