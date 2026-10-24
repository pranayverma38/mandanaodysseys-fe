import { Badge, BadgeButton } from '@/components/badge'
import LikeSaveBtns from '@/components/like-save-btns'
import { getItineraryCategoryLabels } from '@/data/itineraries/categories'
import { getItineraryDestinationName } from '@/data/itineraries/destinations'
import type { ItineraryCategoryRef } from '@/data/itineraries/types'
import { getDestinationPath } from '@/data/destinations'
import { Location06Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
interface Props {
  title: string
  destination: string
  address: string
  categories: ItineraryCategoryRef[]
  packageHandle: string
  pdfLink?: string | null
}

const ItinerarySectionHeader = ({
  address,
  categories,
  destination,
  title,
  packageHandle,
  pdfLink,
}: Props) => {
  const categoryLabels = getItineraryCategoryLabels(categories)
  const destinationName = getItineraryDestinationName(destination)

  return (
    <div className="flex flex-col items-start gap-y-4">
      <div className="flex w-full items-center justify-between gap-2 sm:gap-4">
        <h1 className="min-w-0 flex-1 text-xl font-[550] sm:text-2xl 2xl:text-3xl">{title}</h1>
        <LikeSaveBtns packageHandle={packageHandle} pdfLink={pdfLink} />
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <div className="flex items-center">
          <HugeiconsIcon icon={Location06Icon} size={20} className="mb-0.5" />
          <span className="ms-1.5">{address}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <BadgeButton href={getDestinationPath(destination)} color="orange">
          {destinationName}
        </BadgeButton>
        {categoryLabels.map((label, index) => (
          <Badge key={`${label}-${index}`}>{label}</Badge>
        ))}
      </div>
    </div>
  )
}

export default ItinerarySectionHeader
