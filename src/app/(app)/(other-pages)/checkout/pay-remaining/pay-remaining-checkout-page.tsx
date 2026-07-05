'use client'

import { Button } from '@/components/button'
import FormattedPrice from '@/components/formatted-price'
import { Divider } from '@/components/divider'
import { Heading } from '@/components/heading'
import { getItineraryDestinationName } from '@/data/itineraries/destinations'
import type { RemainingCheckoutSession } from '@/lib/bookings/remaining-checkout'
import React, { useState } from 'react'
import CheckoutStripePayment, { CHECKOUT_FORM_ID } from '../checkout-stripe-payment'
import YourTrip from '../your-trip'

interface Props {
  session: RemainingCheckoutSession
}

const PayRemainingCheckoutPage = ({ session }: Props) => {
  const { itinerary, booking, medusaOrderId, paidSoFar, amountDue, tripTotal, orderNumber } = session
  const [isProcessing, setIsProcessing] = useState(false)

  React.useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }, [])

  return (
    <main className="container mb-28 max-w-7xl px-4 sm:mb-24 sm:px-6 sm:mt-10 lg:mb-32 lg:mt-14">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <div>
          <p className="text-sm font-medium text-[#fc6200]">Complete your booking · #{orderNumber}</p>
          <Heading level={1} fontSize="text-2xl sm:text-3xl xl:text-[2.5rem]/[1.15]" className="mt-2">
            Pay <span data-slot="italic">remaining balance</span>
          </Heading>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Pay the outstanding balance in full to confirm your trip. The amount below is fixed and must be paid
            entirely.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 shadow-lg-for-card sm:p-6">
          <h2 className="text-lg font-semibold">{itinerary.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {getItineraryDestinationName(itinerary.destination)}
          </p>

          <div className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Package total</span>
              <span className="font-medium notranslate">
                <FormattedPrice value={tripTotal} />
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Paid so far</span>
              <span className="font-medium text-[#fc6200] notranslate">
                <FormattedPrice value={paidSoFar} />
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border pt-3 text-base font-semibold">
              <span>Remaining due today</span>
              <span className="notranslate">
                <FormattedPrice value={amountDue} />
              </span>
            </div>
          </div>
        </div>

        <Divider />

        <YourTrip
          dateRangeLabel={booking.dateRangeLabel}
          guestsLabel={booking.guestsLabel}
          guests={booking.guests}
          startDate={booking.startDate}
          endDate={booking.endDate}
          handle={booking.handle}
        />

        <CheckoutStripePayment
          booking={booking}
          itineraryTitle={itinerary.title}
          destinationName={getItineraryDestinationName(itinerary.destination)}
          packageImage={typeof itinerary.featuredImage === 'string' ? itinerary.featuredImage : ''}
          chargeAmount={amountDue}
          paymentMode="remaining"
          depositAmount={amountDue}
          medusaOrderId={medusaOrderId}
          disabled={false}
          submitLabel="Pay remaining balance"
          onProcessingChange={setIsProcessing}
        />

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm supports-backdrop-filter:bg-background/80 sm:px-6 lg:hidden">
          <div className="mx-auto flex max-w-3xl items-center gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Remaining balance</p>
              <p className="text-lg font-semibold notranslate">
                <FormattedPrice value={amountDue} />
              </p>
            </div>
            <Button
              color="orange"
              type="submit"
              form={CHECKOUT_FORM_ID}
              className="shrink-0 rounded-xl! px-5 py-3! text-base! sm:px-6"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing…' : 'Pay remaining'}
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PayRemainingCheckoutPage
