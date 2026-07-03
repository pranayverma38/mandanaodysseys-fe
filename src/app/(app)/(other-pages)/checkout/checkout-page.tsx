'use client'

import ButtonPrimary from '@/components/button-primary'
import FormattedPrice from '@/components/formatted-price'
import { Divider } from '@/components/divider'
import { Heading } from '@/components/heading'
import type { ItineraryDetail } from '@/data/itineraries/types'
import type { CheckoutBooking } from '@/lib/checkout/build-booking'
import Form from 'next/form'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import CheckoutSummary from './checkout-summary'
import PaymentOptions, { type PaymentMode } from './payment-options'
import YourTrip from './your-trip'

interface Props {
  itinerary: ItineraryDetail
  booking: CheckoutBooking
}

const CheckoutPage = ({ itinerary, booking }: Props) => {
  const router = useRouter()
  const [paymentState, setPaymentState] = useState({
    mode: 'full' as PaymentMode,
    chargeAmount: booking.total,
    depositAmount: booking.total,
    isValid: true,
  })

  const handlePaymentChange = useCallback(
    (state: {
      mode: PaymentMode
      chargeAmount: number
      depositAmount: number
      isValid: boolean
    }) => {
      setPaymentState(state)
    },
    []
  )

  React.useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }, [])

  const handleSubmitForm = async (formData: FormData) => {
    if (!paymentState.isValid) {
      return
    }

    const formObject = Object.fromEntries(formData.entries())
    console.log('Form submitted:', formObject)
    router.push('/pay-done')
  }

  const isPartial = paymentState.mode === 'partial'
  const remainingBalance = Math.max(booking.total - paymentState.chargeAmount, 0)
  const submitLabel = isPartial ? 'Pay deposit' : 'Confirm and pay'

  return (
    <main className="container mb-28 max-w-7xl px-4 sm:mb-24 sm:px-6 sm:mt-10 lg:mb-32 lg:mt-14">
      <Form action={handleSubmitForm} className="flex flex-col">
        <div className="mt-6 lg:hidden">
          <CheckoutSummary
            itinerary={itinerary}
            booking={booking}
            variant="compact"
            chargeAmount={paymentState.chargeAmount}
            paymentMode={paymentState.mode}
          />
        </div>

        <div className="mt-8 flex flex-col gap-8 lg:mt-0 lg:flex-row lg:gap-16">
          <div className="w-full lg:w-3/5 xl:w-2/3">
            <div className="flex flex-col gap-5 sm:gap-6">
              <div>
                <Heading level={1} fontSize="text-2xl sm:text-3xl xl:text-[2.5rem]/[1.15]">
                  Confirm and <span data-slot="italic">payment</span>
                </Heading>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                  Review your trip details before completing payment.
                </p>
              </div>

              <Divider className="hidden sm:block" />

              <YourTrip
                dateRangeLabel={booking.dateRangeLabel}
                guestsLabel={booking.guestsLabel}
                guests={booking.guests}
                startDate={booking.startDate}
                endDate={booking.endDate}
                handle={booking.handle}
              />

              <PaymentOptions total={booking.total} onChange={handlePaymentChange} />

              <div className="space-y-2 rounded-xl border border-border bg-muted/30 p-3 lg:hidden">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">Fee & Taxes</span>
                  <span className="notranslate">
                    <FormattedPrice value={booking.feeAndTaxes} />
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">Trip total</span>
                  <span className="notranslate">
                    <FormattedPrice value={booking.total} />
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-border pt-2.5 font-semibold">
                  <span>{isPartial ? 'Due today' : 'Total'}</span>
                  <span className="text-base notranslate">
                    <FormattedPrice value={paymentState.chargeAmount} />
                  </span>
                </div>
                {isPartial && (
                  <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
                    <span>Remaining balance</span>
                    <span className="notranslate">
                      <FormattedPrice value={remainingBalance} />
                    </span>
                  </div>
                )}
              </div>

              <div className="hidden lg:block">
                <ButtonPrimary
                  type="submit"
                  className="text-base/6!"
                  disabled={!paymentState.isValid}
                >
                  {submitLabel}
                </ButtonPrimary>
              </div>
            </div>
          </div>

          <div className="hidden grow lg:block">
            <CheckoutSummary
              itinerary={itinerary}
              booking={booking}
              variant="sidebar"
              chargeAmount={paymentState.chargeAmount}
              paymentMode={paymentState.mode}
            />
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm supports-backdrop-filter:bg-background/80 sm:px-6 lg:hidden">
          <div className="mx-auto flex max-w-7xl items-center gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">{isPartial ? 'Due today' : 'Total'}</p>
              <p className="text-lg font-semibold notranslate">
                <FormattedPrice value={paymentState.chargeAmount} />
              </p>
              {isPartial && (
                <p className="truncate text-xs text-muted-foreground">
                  <span className="notranslate">
                    <FormattedPrice value={remainingBalance} />
                  </span>{' '}
                  due later
                </p>
              )}
            </div>
            <ButtonPrimary
              type="submit"
              className="shrink-0 px-5 text-base/6! sm:px-6"
              disabled={!paymentState.isValid}
            >
              {submitLabel}
            </ButtonPrimary>
          </div>
        </div>
      </Form>
    </main>
  )
}

export default CheckoutPage
