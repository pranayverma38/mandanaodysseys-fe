'use client'

import { TItineraryListing } from '@/data/listings'
import { useCarouselArrowButtons } from '@/hooks/use-carousel-arrow-buttons'
import { cn } from '@/lib/utils'
import type { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import ExperiencesCard from './experiences-card'
import { Heading } from './heading'
import NextPrevButtons from './next-prev-btns'
import { Text } from './text'

interface Props {
  emblaOptions?: EmblaOptionsType
  className?: string
  heading?: string
  headingFontClassName?: string
  subHeading?: string
  listings: TItineraryListing[]
  rows?: number
}

function chunkListings(listings: TItineraryListing[], rows: number) {
  const rowCount = Math.max(1, rows)

  if (rowCount === 1) {
    return listings.map((listing) => [listing])
  }

  const columns: TItineraryListing[][] = []
  for (let index = 0; index < listings.length; index += rowCount) {
    columns.push(listings.slice(index, index + rowCount))
  }
  return columns
}

const SectionListingsCarousel = ({
  className,
  heading = `Popular tours <span data-slot="italic">for you</span>`,
  listings,
  headingFontClassName,
  subHeading,
  rows = 1,
}: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      skipSnaps: true,
      slidesToScroll: 'auto',
      direction: process.env.NEXT_PUBLIC_THEME_DIR,
    },
    [WheelGesturesPlugin()]
  )
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useCarouselArrowButtons(emblaApi)
  const listingColumns = chunkListings(listings, rows)

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Heading
            className="max-w-3xl"
            fontSize={headingFontClassName}
            dangerouslySetInnerHTML={{ __html: heading }}
          />
          {subHeading && <Text className="mt-3 text-muted-foreground">{subHeading}</Text>}
        </div>

        <NextPrevButtons
          className="ms-auto hidden sm:block xl:ms-0"
          onNextClick={onNextButtonClick}
          onPrevClick={onPrevButtonClick}
          nextBtnDisabled={nextBtnDisabled}
          prevBtnDisabled={prevBtnDisabled}
        />
      </div>

      <div className="mt-8 embla sm:mt-10" ref={emblaRef}>
        <div className="-ms-4 embla__container sm:-ms-6">
          {listingColumns.map((column) => (
            <div
              key={column.map((listing) => listing.id).join('-')}
              className="embla__slide basis-[86%] ps-4 sm:ps-6 md:basis-[45%] lg:basis-1/3 xl:basis-[29%] 2xl:basis-1/4"
            >
              <div className={cn('h-full', rows > 1 && 'flex flex-col gap-4 sm:gap-6')}>
                {column.map((listing) => (
                  <ExperiencesCard key={listing.id} data={listing} className="h-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionListingsCarousel
