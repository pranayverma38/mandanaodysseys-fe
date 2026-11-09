'use client'
import { GroupCategoryCarouselGroup } from '@/data/group-categories'
import { useCarouselArrowButtons } from '@/hooks/use-carousel-arrow-buttons'
import type { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { ReactNode } from 'react'
import CarouselCategories from './carousel-categories'
import { Heading } from './heading'
import NextPrevButtons from './next-prev-btns'

interface Props {
  emblaOptions?: EmblaOptionsType
  className?: string
  heading?: ReactNode
  groupCategories: GroupCategoryCarouselGroup[]
  cardStyle?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
  showCategoryOverlay?: boolean
  showCategoryCenteredLabel?: boolean
}

const SectionGroupCategoriesCarousel = ({
  emblaOptions = {
    slidesToScroll: 'auto',
  },
  className,
  heading = (
    <>
      Travel Beyond <span className="font-style-script text-[1.3em] text-[#FC6200] italic">Borders</span>
    </>
  ),
  groupCategories,
  cardStyle = '8',
  showCategoryOverlay = true,
  showCategoryCenteredLabel = false,
}: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...emblaOptions,
    direction: process.env.NEXT_PUBLIC_THEME_DIR,
  })
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useCarouselArrowButtons(emblaApi)
  const categories = groupCategories?.[0]?.categories || []

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6">
        <Heading className="max-w-2xl">{heading}</Heading>
        <NextPrevButtons
          className="hidden shrink-0 sm:block"
          onNextClick={onNextButtonClick}
          onPrevClick={onPrevButtonClick}
          nextBtnDisabled={nextBtnDisabled}
          prevBtnDisabled={prevBtnDisabled}
        />
      </div>

      <div className="mt-8 sm:mt-12">
        <CarouselCategories
          emblaRef={emblaRef}
          categories={categories}
          cardStyle={cardStyle}
          showCategoryOverlay={showCategoryOverlay}
          showCategoryCenteredLabel={showCategoryCenteredLabel}
        />
      </div>
    </div>
  )
}

export default SectionGroupCategoriesCarousel
