import { Location06Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { StarIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Image from 'next/image'
import type { ItineraryAccommodation } from '@/data/itineraries/types'
import { SectionHeading } from '../../(listings)/components/section-heading'

interface Props {
  accommodations: ItineraryAccommodation[]
}

function HotelRating({ rating }: { rating: number }) {
  const filledStars = Math.floor(rating)

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((index) => (
          <StarIcon
            key={index}
            aria-hidden="true"
            className={clsx(
              'size-3',
              index < filledStars ? 'text-amber-400' : 'text-neutral-200 dark:text-neutral-600'
            )}
          />
        ))}
      </div>
      <span className="text-sm font-medium">{rating}</span>
    </div>
  )
}

function HotelCard({ className, hotel }: { hotel: ItineraryAccommodation; className?: string }) {
  return (
    <div className={clsx('overflow-hidden rounded-2xl border border-border bg-card shadow-lg-for-card', className)}>
      <div className="relative aspect-4/3 w-full">
        <Image src={hotel.imageUrl} alt={hotel.name} fill className="object-cover" sizes="(max-width: 768px) 40vw, 33vw" />
      </div>
      <div className="flex flex-col gap-1.5 p-3 sm:gap-2 sm:p-4">
        <h3 className="text-sm font-medium sm:text-base">{hotel.name}</h3>
        <HotelRating rating={hotel.rating} />
        <div className="flex items-start gap-1 text-xs text-muted-foreground sm:items-center sm:gap-1.5 sm:text-sm">
          <HugeiconsIcon icon={Location06Icon} size={16} className="mt-0.5 shrink-0 sm:mt-0" />
          <span>{hotel.location}</span>
        </div>
      </div>
    </div>
  )
}

const ItineraryAccommodationSection = ({ accommodations }: Props) => {
  if (!accommodations.length) {
    return null
  }

  const useMobileSlider = accommodations.length > 2

  return (
    <div className="listingSection__wrap">
      <SectionHeading>Accommodation details</SectionHeading>

      {useMobileSlider ? (
        <div className="hidden-scrollbar -mr-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pr-4 sm:-mr-6 sm:pr-6 md:hidden">
          {accommodations.map((hotel) => (
            <HotelCard
              key={hotel.name}
              hotel={hotel}
              className="w-[calc((100%-1.5rem)/2.5)] shrink-0 snap-start"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {accommodations.map((hotel) => (
            <HotelCard key={hotel.name} hotel={hotel} />
          ))}
        </div>
      )}

      <div className="hidden gap-4 md:grid md:grid-cols-3">
        {accommodations.map((hotel) => (
          <HotelCard key={hotel.name} hotel={hotel} />
        ))}
      </div>
    </div>
  )
}

export default ItineraryAccommodationSection
