import ButtonPrimary from '@/components/button-primary'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import FormattedPrice from '@/components/formatted-price'
import { Divider } from '@/components/divider'
import { Heading } from '@/components/heading'
import {
  isPaymentComplete,
  normalizePaymentIntent,
} from '@/lib/stripe/payment-intent-status'
import { getStripeServer } from '@/lib/stripe/server'
import { Calendar04Icon, Home02FreeIcons, UserIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import PayDoneScrollReset from './pay-done-scroll-reset'

type PageProps = {
  searchParams: Promise<{ payment_intent?: string }>
}

function PaymentStatusMessage({
  status,
}: {
  status: 'missing' | 'failed' | 'processing' | 'succeeded'
}) {
  if (status === 'missing') {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        No payment reference was found. If you just completed checkout, wait a moment and refresh.
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
        Payment was not completed.{' '}
        <Link href="/checkout" className="font-medium underline">
          Return to checkout
        </Link>{' '}
        to try again.
      </div>
    )
  }

  if (status === 'processing') {
    return (
      <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
        Your payment is processing. We will email you once it is confirmed.
      </div>
    )
  }

  return null
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams
  const paymentIntentId = params.payment_intent

  if (!paymentIntentId) {
    return (
      <PayDoneScrollReset>
        <main className="container mt-10 mb-24 sm:mt-14 lg:mb-32">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-y-8">
            <Heading level={1}>Payment status</Heading>
            <PaymentStatusMessage status="missing" />
          </div>
        </main>
      </PayDoneScrollReset>
    )
  }

  let paymentIntent

  try {
    paymentIntent = normalizePaymentIntent(await getStripeServer().paymentIntents.retrieve(paymentIntentId))
  } catch {
    return (
      <PayDoneScrollReset>
        <main className="container mt-10 mb-24 sm:mt-14 lg:mb-32">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-y-8">
            <Heading level={1}>Payment status</Heading>
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              We could not verify this payment. Contact support if you were charged.
            </div>
          </div>
        </main>
      </PayDoneScrollReset>
    )
  }

  const isComplete = isPaymentComplete(paymentIntent.status)
  const isProcessing = paymentIntent.status === 'processing'
  const isFailed = !isComplete

  const title = paymentIntent.metadata.itineraryTitle ?? 'Your trip'
  const dateRange = paymentIntent.metadata.dateRange ?? 'Dates to be confirmed'
  const guests = paymentIntent.metadata.guests ?? 'Guests'
  const chargeAmount = Number.parseFloat(paymentIntent.metadata.chargeAmount ?? '') || paymentIntent.amount
  const paymentMode = paymentIntent.metadata.paymentMode === 'partial' ? 'Deposit' : 'Full payment'

  return (
    <PayDoneScrollReset>
      <main className="container mt-10 mb-24 sm:mt-14 lg:mb-32">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-y-12">
          <Heading level={1}>
            {isComplete && !isProcessing ? (
              <>
                Congratulation <span data-slot="italic"> 🎉</span>
              </>
            ) : (
              'Payment status'
            )}
          </Heading>

          <PaymentStatusMessage
            status={
              isProcessing ? 'processing' : isFailed ? 'failed' : isComplete ? 'succeeded' : 'missing'
            }
          />

          {isComplete && (
            <>
              <Divider />

              <div>
                <h3 className="text-2xl font-medium">Your booking</h3>
                <div className="mt-5">
                  <span className="block text-base font-medium sm:text-lg">{title}</span>
                  {paymentIntent.metadata.handle && (
                    <span className="mt-1 block text-sm text-neutral-500 dark:text-neutral-400">
                      Ref: {paymentIntent.metadata.handle}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col divide-y divide-border rounded-3xl border border-border bg-card sm:flex-row sm:divide-x sm:divide-y-0">
                <div className="flex flex-1 gap-x-4 p-5">
                  <HugeiconsIcon
                    className="text-muted-foreground-lighter"
                    icon={Calendar04Icon}
                    size={32}
                    strokeWidth={1.5}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="mt-1 text-lg font-medium text-foreground">{dateRange}</span>
                  </div>
                </div>
                <div className="flex flex-1 gap-x-4 p-5">
                  <HugeiconsIcon
                    className="text-muted-foreground-lighter"
                    icon={UserIcon}
                    size={32}
                    strokeWidth={1.5}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Guests</span>
                    <span className="mt-1 text-lg font-medium text-foreground">{guests}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-medium">Booking detail</h3>
                <DescriptionList className="mt-5">
                  <DescriptionTerm>Booking code</DescriptionTerm>
                  <DescriptionDetails>{paymentIntent.id.slice(-12).toUpperCase()}</DescriptionDetails>
                  <DescriptionTerm>Payment type</DescriptionTerm>
                  <DescriptionDetails>{paymentMode}</DescriptionDetails>
                  <DescriptionTerm>Amount paid</DescriptionTerm>
                  <DescriptionDetails className="notranslate">
                    <FormattedPrice value={chargeAmount} />
                  </DescriptionDetails>
                  <DescriptionTerm>Status</DescriptionTerm>
                  <DescriptionDetails className="capitalize">{paymentIntent.status.replace(/_/g, ' ')}</DescriptionDetails>
                </DescriptionList>
              </div>

              <div>
                <ButtonPrimary href="/">
                  <HugeiconsIcon icon={Home02FreeIcons} className="size-6" />
                  Explore more listings
                </ButtonPrimary>
              </div>
            </>
          )}
        </div>
      </main>
    </PayDoneScrollReset>
  )
}

export default Page
