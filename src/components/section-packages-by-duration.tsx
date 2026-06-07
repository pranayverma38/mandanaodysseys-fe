'use client'

import { Button } from '@/components/button'
import FormattedPrice from '@/components/formatted-price'
import { Heading } from '@/components/heading'
import { TextLink } from '@/components/text'
import { ICONS_MAP } from '@/data/data'
import type { PackagesByDurationDestination, PackagesByDurationGroup } from '@/data/packages-by-duration'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Image from 'next/image'
import { ReactNode, useMemo, useState } from 'react'

interface Props {
  groups: PackagesByDurationGroup[]
  className?: string
  heading?: ReactNode
}

const DURATION_FILTER_ICONS: Record<string, string> = {
  '3-5': 'Clock01Icon',
  '6-9': 'Clock01Icon',
  '10+': 'EarthIcon',
}

const GRID_SLOT_CLASSES = [
  'md:col-span-2 md:col-start-1 md:row-start-1',
  'md:col-start-1 md:row-start-2',
  'md:col-start-2 md:row-start-2',
  'md:col-start-3 md:row-span-2 md:row-start-1',
  'md:col-start-4 md:row-start-1',
  'md:col-start-4 md:row-start-2',
] as const

const GRID_SLOT_ASPECT = [
  'aspect-4/3 md:aspect-auto md:h-full md:min-h-[220px]',
  'aspect-7/8 md:aspect-auto md:h-full md:min-h-[200px]',
  'aspect-7/8 md:aspect-auto md:h-full md:min-h-[200px]',
  'aspect-7/8 md:aspect-auto md:h-full md:min-h-[420px]',
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
    <div className={clsx('group/collection relative w-full min-h-[220px]', className)}>
      <div className={clsx('relative z-0 w-full overflow-hidden rounded-2xl', imageRatio)}>
        <Image
          src={destination.thumbnail}
          alt={destination.name}
          fill
          className="z-0 rounded-2xl object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 30vw"
        />

        <span className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover/collection:opacity-100" />

        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 via-black/20 to-transparent p-4 sm:p-5">
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
    groups.find((group) => group.bucket.value === '10+' && group.destinations.length > 0)?.bucket.value ??
    groups.find((group) => group.destinations.length > 0)?.bucket.value ??
    groups[0]?.bucket.value ??
    '3-5'
  const [selectedBucket, setSelectedBucket] = useState(defaultBucket)

  const activeDestinations = useMemo(() => {
    return groups.find((group) => group.bucket.value === selectedBucket)?.destinations ?? []
  }, [groups, selectedBucket])

  return (
    <div className={clsx(className)}>
      <Heading className="max-w-2xl">{heading}</Heading>

      <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-12">
        <div className="flex flex-wrap gap-2">
          {groups.map((group) => {
            const iconKey = DURATION_FILTER_ICONS[group.bucket.value]

            return (
              <Button
                key={group.bucket.value}
                onClick={() => setSelectedBucket(group.bucket.value)}
                // @ts-ignore
                outline={selectedBucket !== group.bucket.value}
              >
                {iconKey && ICONS_MAP[iconKey] && <HugeiconsIcon icon={ICONS_MAP[iconKey]} size={20} />}
                {group.bucket.label}
              </Button>
            )
          })}
        </div>
      </div>

      {activeDestinations.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-4 md:grid-rows-2 md:gap-6">
          {activeDestinations.slice(0, 6).map((destination, index) => (
            <DurationDestinationCard
              key={destination.id}
              destination={destination}
              className={clsx(GRID_SLOT_CLASSES[index])}
              imageRatio={GRID_SLOT_ASPECT[index] ?? 'aspect-7/8'}
            />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-center text-muted-foreground">
          No packages found for this duration. Try another range.
        </p>
      )}
    </div>
  )
}

export default SectionPackagesByDuration
