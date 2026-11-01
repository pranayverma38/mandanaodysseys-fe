import { Badge } from '@/components/badge'
import BtnLikeIcon from '@/components/btn-like-icon'
import StartRating from '@/components/start-rating'
import { TItineraryListing } from '@/data/listings'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import AmenitiesChips from './amenities-chips'
import FormattedPrice from './formatted-price'

interface Props {
  className?: string
  data: TItineraryListing
  size?: 'default' | 'small'
}

function getVisibleAmenities(amenities: TItineraryListing['amenities']) {
  return amenities
    .filter((amenity) => {
      const text = amenity.text.trim()
      if (!text) {
        return false
      }

      if (amenity.icon === 'Clock01Icon') {
        return false
      }

      return !/\b(days?|nights?)\b/i.test(text)
    })
    .slice(0, 2)
}

const ExperiencesCard: FC<Props> = ({ size = 'default', className = '', data }) => {
  const {
    address,
    title,
    handle: listingHandle,
    like,
    price,
    reviewStart,
    reviewCount,
    amenities,
    featuredImage,
    badge,
  } = data

  const listingHref = `/itinerary/${listingHandle}`
  const priceSuffix = 'duration' in data ? ` · ${data.duration.label}` : ' / guest'
  const locationLabel = 'destinationName' in data ? `${data.destinationName} · ${address}` : address
  const visibleAmenities = getVisibleAmenities(amenities)

  const renderFeaturedImage = () => {
    return (
      <div className="relative w-full shrink-0">
        <div className="aspect-4/3 mask-b-from-60% mask-b-to-100%">
          <Image
            fill
            src={featuredImage}
            alt={title}
            sizes="(max-width: 640px) 100vw, 350px"
            className="object-cover"
          />
        </div>
        <BtnLikeIcon isLiked={like} packageHandle={listingHandle} className="absolute top-3 right-3 z-1" />
        {badge && (
          <Badge color="white" className="absolute start-3 top-3">
            {badge}
          </Badge>
        )}
      </div>
    )
  }

  const renderContent = () => {
    return (
      <div className={cn('flex flex-1 flex-col', size === 'default' ? 'p-4 pt-0' : 'p-2 pt-0')}>
        <h2 className="line-clamp-2 min-h-[2lh] text-lg leading-snug font-medium" title={title}>
          {title}
        </h2>
        <div className="mt-1 truncate text-sm text-gray-500 dark:text-gray-400" title={locationLabel}>
          {locationLabel}
        </div>

        <AmenitiesChips className="mt-3.5 min-h-6 max-w-full flex-nowrap overflow-hidden" data={visibleAmenities} />

        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <div className="min-w-0 truncate">
            <FormattedPrice value={price} baseCurrency="USD" className="text-base font-medium underline" />
            <span className="text-sm text-gray-500 dark:text-gray-400">{priceSuffix}</span>
          </div>
          <StartRating reviewCount={reviewCount} point={reviewStart} />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 border-slate-100 bg-white dark:border-neutral-800 dark:bg-neutral-900',
        className
      )}
    >
      <div className="flex h-full flex-col">
        {renderFeaturedImage()}
        {renderContent()}
      </div>
      <Link href={listingHref} className="absolute inset-0"></Link>
    </div>
  )
}

export default ExperiencesCard
