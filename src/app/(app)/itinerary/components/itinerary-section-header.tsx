import { Badge } from '@/components/badge'
import LikeSaveBtns from '@/components/like-save-btns'
import { getItineraryCategoryLabels } from '@/data/itineraries/categories'
import type { ItineraryCategoryRef } from '@/data/itineraries/types'
import { Location06Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import ItineraryStarRating from './itinerary-star-rating'

interface Props {
  title: string
  reviewStart: number
  reviewCount: number
  address: string
  categories: ItineraryCategoryRef[]
}

const ItinerarySectionHeader = ({ address, categories, reviewCount, reviewStart, title }: Props) => {
  const categoryLabels = getItineraryCategoryLabels(categories)

  return (
    <div className="flex flex-col items-start gap-y-4">
      <div className="flex w-full flex-col-reverse items-baseline justify-between gap-4 sm:flex-row">
        <h1 className="text-2xl font-[550] 2xl:text-3xl">{title}</h1>
        <LikeSaveBtns />
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <div className="flex items-center">
          <HugeiconsIcon icon={Location06Icon} size={20} className="mb-0.5" />
          <span className="ms-1.5">{address}</span>
        </div>
        <span>·</span>
        <ItineraryStarRating point={reviewStart} reviewCount={reviewCount} />
      </div>

      {categoryLabels.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          {categoryLabels.map((label, index) => (
            <Badge key={`${label}-${index}`}>{label}</Badge>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default ItinerarySectionHeader
