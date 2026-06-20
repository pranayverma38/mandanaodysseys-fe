import { ICONS_MAP } from '@/data/data'
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface Props {
  featuredAmenities: { icon: string; text: string }[]
}

export const SectionFeaturedAmenities = ({ featuredAmenities }: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm sm:gap-x-8">
      {featuredAmenities.map((item, index) => (
        <div className="flex shrink-0 items-center gap-3 sm:gap-4" key={index}>
          <HugeiconsIcon icon={ICONS_MAP[item.icon] || CheckmarkCircle02Icon} size={24} />
          {item.text}
        </div>
      ))}
    </div>
  )
}
