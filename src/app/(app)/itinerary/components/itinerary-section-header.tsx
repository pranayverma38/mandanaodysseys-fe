import { Badge } from '@/components/badge'
import LikeSaveBtns from '@/components/like-save-btns'
import StartRating from '@/components/start-rating'
import { Location06Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface Props {
  title: string
  listingCategory: string
  reviewStart: number
  reviewCount: number
  address: string
}

const ItinerarySectionHeader = ({ address, listingCategory, reviewCount, reviewStart, title }: Props) => {
  return (
    <div className="flex flex-col items-start gap-y-6">
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
        <Badge>{listingCategory}</Badge>
        <span>·</span>
        <StartRating size="lg" point={reviewStart} reviewCount={reviewCount} />
      </div>
    </div>
  )
}

export default ItinerarySectionHeader
