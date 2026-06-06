'use client'

import FormattedPriceText from '@/components/formatted-price-text'
import { CheckmarkCircle01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { SectionHeading } from '../../(listings)/components/section-heading'

const INCLUDED_ICON_COLOR = '#00b277'

interface Props {
  includes: string[]
  excludes: string[]
}

const ItineraryInclusionsSection = ({ includes, excludes }: Props) => {
  return (
    <div id="itinerary-inclusions" className="listingSection__wrap scroll-mt-20">
      <SectionHeading>Included in the price</SectionHeading>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-8">
        <div className="flex flex-col gap-4">
          {includes.map((item) => (
            <div key={item} className="flex items-start gap-x-3">
              <HugeiconsIcon
                icon={CheckmarkCircle01Icon}
                size={24}
                className="mt-px shrink-0"
                color={INCLUDED_ICON_COLOR}
              />
              <span>
                <FormattedPriceText text={item} />
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {excludes.map((item) => (
            <div key={item} className="flex items-start gap-x-3">
              <XMarkIcon aria-hidden="true" strokeWidth={2} className="mt-0.5 size-6 shrink-0 text-red-500" />
              <span>
                <FormattedPriceText text={item} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ItineraryInclusionsSection
