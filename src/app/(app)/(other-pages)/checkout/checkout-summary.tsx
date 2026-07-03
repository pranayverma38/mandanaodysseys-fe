import FormattedPrice from '@/components/formatted-price'
import type { ItineraryDetail } from '@/data/itineraries/types'
import type { CheckoutBooking } from '@/lib/checkout/build-booking'
import Image from 'next/image'
import ItineraryStarRating from '../../itinerary/components/itinerary-star-rating'
import type { PaymentMode } from './payment-options'

interface Props {
  itinerary: ItineraryDetail
  booking: CheckoutBooking
  variant?: 'compact' | 'sidebar'
  chargeAmount?: number
  paymentMode?: PaymentMode
}

const CheckoutSummary = ({
  itinerary,
  booking,
  variant = 'sidebar',
  chargeAmount = booking.total,
  paymentMode = 'full',
}: Props) => {
  const isPartial = paymentMode === 'partial'
  const remainingBalance = Math.max(booking.total - chargeAmount, 0)

  if (variant === 'compact') {
    return (
      <div className="flex gap-3.5 rounded-2xl border border-border bg-card p-3.5 shadow-lg-for-card sm:gap-4 sm:p-4">
        <div className="relative size-[72px] shrink-0 overflow-hidden rounded-xl sm:size-20">
          <Image
            alt={itinerary.title}
            className="object-cover"
            fill
            sizes="80px"
            src={itinerary.featuredImage}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
          <p className="line-clamp-2 text-sm font-medium leading-snug sm:text-base">{itinerary.title}</p>
          <ItineraryStarRating point={itinerary.reviewStart} reviewCount={itinerary.reviewCount} />
          <div className="mt-0.5 flex items-center justify-between gap-3 text-sm">
            <span className="text-muted-foreground">{isPartial ? 'Due today' : 'Total'}</span>
            <span className="font-semibold notranslate">
              <FormattedPrice value={chargeAmount} />
            </span>
          </div>
          {isPartial && (
            <p className="text-xs text-muted-foreground">
              <span className="notranslate">
                <FormattedPrice value={remainingBalance} />
              </span>{' '}
              due later
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="sticky top-8 flex w-full flex-col gap-y-5 rounded-3xl shadow-lg-for-card bg-card p-5 sm:gap-y-6 sm:p-6 xl:p-8">
      <div className="flex flex-col gap-y-4">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
          <Image
            alt={itinerary.title}
            className="object-cover"
            fill
            sizes="(max-width: 1024px) 100vw, 400px"
            src={itinerary.featuredImage}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-base font-medium sm:text-lg">{itinerary.title}</span>
          <ItineraryStarRating point={itinerary.reviewStart} reviewCount={itinerary.reviewCount} />
        </div>
      </div>

      <div className="space-y-3 border-t border-border pt-4">
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
        <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
          <span className="font-semibold text-foreground">{isPartial ? 'Due today' : 'Total due'}</span>
          <span className="text-lg font-semibold notranslate">
            <FormattedPrice value={chargeAmount} />
          </span>
        </div>
        {isPartial && (
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-muted-foreground">Remaining balance</span>
            <span className="notranslate">
              <FormattedPrice value={remainingBalance} />
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckoutSummary
