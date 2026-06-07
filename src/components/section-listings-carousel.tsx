'use client'

import { TItineraryListing } from '@/data/listings'
import { useCarouselArrowButtons } from '@/hooks/use-carousel-arrow-buttons'
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
}

const SectionListingsCarousel = ({
  className,
  heading = `Popular tours <span data-slot="italic">for you</span>`,
  listings,
  headingFontClassName,
  subHeading,
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
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="embla__slide basis-[86%] ps-4 sm:ps-6 md:basis-[45%] lg:basis-1/3 xl:basis-[29%] 2xl:basis-1/4"
            >
              <ExperiencesCard data={listing} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionListingsCarousel
