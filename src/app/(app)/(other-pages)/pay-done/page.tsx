import {
  isPaymentComplete,
  normalizePaymentIntent,
} from '@/lib/stripe/payment-intent-status'
import { getStripeServer } from '@/lib/stripe/server'
import PayDoneScrollReset from './pay-done-scroll-reset'
import PayDoneView, { type PayDoneStatus } from './pay-done-view'

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

  let paymentIntent

  try {
    paymentIntent = normalizePaymentIntent(await getStripeServer().paymentIntents.retrieve(paymentIntentId))
  } catch {
    return (
      <PayDoneScrollReset>
        <PayDoneView status="verify-error" />
      </PayDoneScrollReset>
    )
  }

  const isComplete = isPaymentComplete(paymentIntent.status)
  const isProcessing = paymentIntent.status === 'processing'

  let status: PayDoneStatus = 'failed'
  if (isProcessing) {
    status = 'processing'
  } else if (isComplete) {
    status = 'succeeded'
  }

  const title = paymentIntent.metadata.itineraryTitle ?? 'Your trip'
  const dateRange = paymentIntent.metadata.dateRange ?? 'Dates to be confirmed'
  const guests = paymentIntent.metadata.guests ?? 'Guests'
  const chargeAmount = Number.parseFloat(paymentIntent.metadata.chargeAmount ?? '') || paymentIntent.amount
  const paymentMode = paymentIntent.metadata.paymentMode === 'partial' ? 'Deposit' : 'Full payment'

  return (
    <PayDoneScrollReset>
      <PayDoneView
        status={status}
        title={title}
        dateRange={dateRange}
        guests={guests}
        chargeAmount={chargeAmount}
        paymentMode={paymentMode}
        paymentId={paymentIntent.id}
        handle={paymentIntent.metadata.handle}
        stripeStatus={paymentIntent.status}
      />
    </PayDoneScrollReset>
  )
}

export default Page
