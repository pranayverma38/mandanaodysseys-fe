'use client'

import { TCategory } from '@/data/categories'
import { GroupCategoryCarouselCard } from '@/data/group-categories'
import clsx from 'clsx'
import { EmblaViewportRefType } from 'embla-carousel-react'
import CardCategory1 from './card-category1'
import CardCategory3 from './card-category3'
import CardCategory4 from './card-category4'
import CardCategory5 from './card-category5'
import CardCategory6 from './card-category6'
import CardCategory7 from './card-category7'
import CardCategory8 from './card-category8'

interface Props {
  categories: GroupCategoryCarouselCard[]
  className?: string
  emblaRef: EmblaViewportRefType
  cardStyle?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
  showCategoryOverlay?: boolean
}

const CarouselCategories = ({
  className,
  categories,
  emblaRef,
  cardStyle = '8',
  showCategoryOverlay = true,
}: Props) => {
  const renderCard = (category: GroupCategoryCarouselCard) => {
    const legacyCategory = category as TCategory

    switch (cardStyle) {
      case '1':
        return <CardCategory1 category={legacyCategory} />
      case '2':
        return <CardCategory3 category={legacyCategory} />
      case '3':
        return <CardCategory3 category={legacyCategory} />
      case '4':
        return <CardCategory4 category={legacyCategory} />
      case '5':
        return <CardCategory5 category={legacyCategory} />
      case '6':
        return <CardCategory6 category={legacyCategory} />
      case '7':
        return <CardCategory7 category={legacyCategory} />
      case '8':
        return <CardCategory8 category={category} showOverlay={showCategoryOverlay} />

      default:
        return <CardCategory8 category={category} showOverlay={showCategoryOverlay} />
    }
  }

  return (
    <div className={clsx('embla', className)} ref={emblaRef}>
      <div className="-ms-6 embla__container">
        {categories.map((category) => (
          <div key={category.id} className="embla__slide basis-[86%] ps-6 md:basis-[45%] lg:basis-1/3 xl:basis-1/4">
            {renderCard(category)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CarouselCategories
