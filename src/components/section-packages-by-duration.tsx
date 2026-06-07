'use client'

import { Button } from '@/components/button'
import FormattedPrice from '@/components/formatted-price'
import { Heading } from '@/components/heading'
import NextPrevButtons from '@/components/next-prev-btns'
import { TextLink } from '@/components/text'
import { ICONS_MAP } from '@/data/data'
import type { PackagesByDurationDestination, PackagesByDurationGroup } from '@/data/packages-by-duration'
import { useCarouselArrowButtons } from '@/hooks/use-carousel-arrow-buttons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import {
  FilterPanelTransition,
  filterPanelStaggerContainer,
  filterPanelStaggerItem,
} from './filter-panel-transition'

interface Props {
  groups: PackagesByDurationGroup[]
  className?: string
  heading?: ReactNode
}

const filterButtonClassName =
  'gap-x-1.5 px-2.5 py-1 text-xs sm:gap-x-2.5 sm:px-[calc(--spacing(5)-1px)] sm:py-[calc(--spacing(2.5)-1px)] sm:text-base'

const DURATION_FILTER_ICONS: Record<string, string> = {
  '3-5': 'Clock01Icon',
  '6-9': 'Clock01Icon',
  '10+': 'EarthIcon',
}

const GRID_SLOT_CLASSES = [
  'md:col-span-2 md:col-start-1 md:row-start-1 md:h-full',
  'md:col-start-1 md:row-start-2 md:h-full',
  'md:col-start-2 md:row-start-2 md:h-full',
  'md:col-start-3 md:row-span-2 md:row-start-1 md:h-full md:min-h-0',
  'md:col-start-4 md:row-start-1 md:h-full',
  'md:col-start-4 md:row-start-2 md:h-full',
] as const

const GRID_SLOT_ASPECT = [
  'aspect-4/3 md:aspect-auto md:h-full md:min-h-[220px]',
  'aspect-7/8 md:aspect-auto md:h-full md:min-h-[200px]',
  'aspect-7/8 md:aspect-auto md:h-full md:min-h-[200px]',
  'aspect-7/8 md:aspect-auto md:h-full',
  'aspect-4/3 md:aspect-auto md:h-full md:min-h-[200px]',
  'aspect-4/3 md:aspect-auto md:h-full md:min-h-[200px]',
] as const

function DurationDestinationCard({
  destination,
  className,
  imageRatio,
}: {
  destination: PackagesByDurationDestination
  className?: string
  imageRatio: string
}) {
  return (
    <div className={clsx('group/collection relative w-full min-h-[220px] md:h-full', className)}>
      <div className={clsx('relative z-0 h-full w-full overflow-hidden rounded-2xl', imageRatio)}>
        <Image
          src={destination.thumbnail}
          alt={destination.name}
          fill
          className="z-0 rounded-2xl object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 30vw"
        />

        <span className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover/collection:opacity-100" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 min-h-32 bg-linear-to-t from-black/70 via-black/35 to-transparent sm:min-h-36" />

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <p className="text-lg font-medium text-white sm:text-xl">{destination.name}</p>
          <p className="mt-1 text-sm text-white/90 sm:text-base">
            Starts from <FormattedPrice value={destination.fromPrice} />
          </p>
        </div>
      </div>

      <TextLink href={destination.href}>
        <span className="absolute inset-0" />
        <span className="sr-only">
          {destination.name}, starts from {destination.fromPrice}
        </span>
      </TextLink>
    </div>
  )
}

const SectionPackagesByDuration = ({
  groups,
  className,
  heading = (
    <>
      Packages by{' '}
      <span className="font-style-script text-[1.3em] text-[#FC6200] italic">Duration</span>
    </>
  ),
}: Props) => {
  const defaultBucket =
    groups.find((group) => group.bucket.value === '3-5' && group.destinations.length > 0)?.bucket.value ??
    groups.find((group) => group.destinations.length > 0)?.bucket.value ??
    groups[0]?.bucket.value ??
    '3-5'
  const [selectedBucket, setSelectedBucket] = useState(defaultBucket)

  const activeDestinations = useMemo(() => {
    return groups.find((group) => group.bucket.value === selectedBucket)?.destinations ?? []
  }, [groups, selectedBucket])

  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 'auto',
    direction: process.env.NEXT_PUBLIC_THEME_DIR,
  })
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useCarouselArrowButtons(emblaApi)

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.reInit()
    emblaApi.scrollTo(0)
  }, [emblaApi, activeDestinations, selectedBucket])

  return (
    <div className={clsx(className)}>
      <Heading className="max-w-2xl">{heading}</Heading>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 sm:mt-12">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {groups.map((group) => {
            const iconKey = DURATION_FILTER_ICONS[group.bucket.value]

            return (
              <Button
                key={group.bucket.value}
                className={filterButtonClassName}
                onClick={() => setSelectedBucket(group.bucket.value)}
                // @ts-ignore
                outline={selectedBucket !== group.bucket.value}
              >
                {iconKey && ICONS_MAP[iconKey] && (
                  <HugeiconsIcon icon={ICONS_MAP[iconKey]} size={16} className="sm:size-5!" />
                )}
                {group.bucket.label}
              </Button>
            )
          })}
        </div>

        {activeDestinations.length > 0 ? (
          <NextPrevButtons
            className="ms-auto hidden sm:block md:hidden xl:ms-0"
            onNextClick={onNextButtonClick}
            onPrevClick={onPrevButtonClick}
            nextBtnDisabled={nextBtnDisabled}
            prevBtnDisabled={prevBtnDisabled}
          />
        ) : null}
      </div>

      {activeDestinations.length > 0 ? (
        <FilterPanelTransition filterKey={selectedBucket} className="mt-8">
          <div className="embla md:hidden" ref={emblaRef}>
            <div className="-ms-6 embla__container">
              {activeDestinations.map((destination) => (
                <div key={destination.id} className="embla__slide basis-[86%] ps-6 sm:basis-[45%]">
                  <DurationDestinationCard destination={destination} imageRatio="aspect-7/8" />
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className="hidden grid-cols-4 grid-rows-2 gap-6 md:grid md:items-stretch"
            variants={filterPanelStaggerContainer}
            initial="hidden"
            animate="show"
          >
            {activeDestinations.slice(0, 6).map((destination, index) => (
              <motion.div
                key={destination.id}
                variants={filterPanelStaggerItem}
                className={clsx(GRID_SLOT_CLASSES[index])}
              >
                <DurationDestinationCard
                  destination={destination}
                  imageRatio={GRID_SLOT_ASPECT[index] ?? 'aspect-7/8'}
                />
              </motion.div>
            ))}
          </motion.div>
        </FilterPanelTransition>
      ) : (
        <FilterPanelTransition filterKey={`${selectedBucket}-empty`} className="mt-8">
          <p className="text-center text-muted-foreground">
            No packages found for this duration. Try another range.
          </p>
        </FilterPanelTransition>
      )}
    </div>
  )
}

export default SectionPackagesByDuration
