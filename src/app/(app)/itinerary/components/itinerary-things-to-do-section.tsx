'use client'

import { ICONS_MAP } from '@/data/data'
import type { ItineraryThingToDo } from '@/data/itineraries/types'
import { isProxiedItineraryImageUrl, resolveItineraryImageUrl } from '@/lib/itinerary-image-url'
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { useLayoutEffect, useRef, useState } from 'react'
import { SectionHeading } from '../../(listings)/components/section-heading'

const SUB_ACTIVITY_COLOR_CLASSES = [
  'bg-amber-100 text-amber-600',
  'bg-sky-100 text-sky-600',
  'bg-violet-100 text-violet-600',
  'bg-emerald-100 text-emerald-600',
]

function ThingToDoSubActivities({ item }: { item: ItineraryThingToDo }) {
  const subActivities = (item.subActivities || []).filter(
    (subActivity) => subActivity.subtitle.trim() || subActivity.description.trim()
  )

  if (!subActivities.length) {
    return <p className="pt-1">{item.description}</p>
  }

  return (
    <div className="pt-3">
      {subActivities.map((subActivity, index) => {
        const colorClassName = SUB_ACTIVITY_COLOR_CLASSES[index % SUB_ACTIVITY_COLOR_CLASSES.length]
        const isLastItem = index === subActivities.length - 1
        const hasSubtitle = subActivity.subtitle.trim().length > 0
        const hasCustomIcon = Boolean(subActivity.icon && ICONS_MAP[subActivity.icon])
        const isDescriptionOnly = !hasSubtitle && !hasCustomIcon

        if (isDescriptionOnly) {
          return (
            <div key={`${subActivity.description}-${index}`} className={clsx('pb-5', isLastItem && 'pb-0')}>
              <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
                {subActivity.description}
              </p>
            </div>
          )
        }

        return (
          <div key={`${subActivity.subtitle}-${index}`} className="grid grid-cols-[auto_1fr] gap-x-3">
            <div className="flex flex-col items-center">
              <div className={clsx('flex size-9 items-center justify-center rounded-full', colorClassName)}>
                <HugeiconsIcon
                  icon={(subActivity.icon && ICONS_MAP[subActivity.icon]) || CheckmarkCircle02Icon}
                  size={18}
                  strokeWidth={1.8}
                />
              </div>
              {!isLastItem ? <div className="mt-2 h-full min-h-6 w-px bg-neutral-200 dark:bg-neutral-700" /> : null}
            </div>

            <div className={clsx('pb-5', isLastItem && 'pb-0')}>
              <p className="text-sm font-semibold leading-6 text-foreground">{subActivity.subtitle}</p>
              <p className="text-sm leading-6 text-muted-foreground">{subActivity.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ThingToDoItem({ item }: { item: ItineraryThingToDo }) {
  const [expanded, setExpanded] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const hasDescription = item.description.trim().length > 0
  const hasSubActivities = (item.subActivities || []).some(
    (subActivity) => subActivity.subtitle.trim().length > 0 || subActivity.description.trim().length > 0
  )
  const hasExpandableContent = hasSubActivities || hasDescription

  useLayoutEffect(() => {
    const element = contentRef.current

    if (!element) {
      return
    }

    const measureHeight = () => {
      setContentHeight(element.scrollHeight)
    }

    measureHeight()
    window.addEventListener('resize', measureHeight)
    return () => window.removeEventListener('resize', measureHeight)
  }, [item.description, item.subActivities])

  const toggleExpanded = () => {
    if (hasExpandableContent) {
      setExpanded((value) => !value)
    }
  }

  const cardClassName = clsx(
    'flex w-full items-start gap-4 text-start sm:gap-6',
    hasExpandableContent &&
      'cursor-pointer rounded-xl border-0 bg-transparent p-3 -m-3 transition-colors hover:bg-neutral-50 sm:p-4 sm:-m-4 dark:hover:bg-neutral-900/40'
  )

  const cardContent = (
    <>
      <div className="relative aspect-square w-20 shrink-0 self-start overflow-hidden rounded-xl">
        {(() => {
          const imageUrl = resolveItineraryImageUrl(item.imageUrl)

          return (
        <Image
          fill
          src={imageUrl}
          alt={item.name}
          className="object-cover shadow-inner"
          sizes="80px"
          unoptimized={isProxiedItineraryImageUrl(imageUrl)}
        />
          )
        })()}
      </div>

      <div className="min-w-0 flex-1 self-center text-sm/5 text-muted-foreground">
        <p>{item.time}</p>
        <p className="mt-1 text-lg font-semibold leading-6 text-foreground">{item.name}</p>
        {hasExpandableContent ? (
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out motion-reduce:transition-none"
            style={{
              maxHeight: expanded ? contentHeight : 0,
              opacity: expanded ? 1 : 0,
            }}
          >
            <div ref={contentRef}>
              <ThingToDoSubActivities item={item} />
            </div>
          </div>
        ) : null}
      </div>

      {hasExpandableContent ? (
        <ChevronDownIcon
          aria-hidden="true"
          className={clsx(
            'size-5 shrink-0 self-center text-[#00b277] transition-transform duration-300 ease-in-out motion-reduce:transition-none',
            expanded && 'rotate-180'
          )}
        />
      ) : null}
    </>
  )

  if (hasExpandableContent) {
    return (
      <button
        type="button"
        onClick={toggleExpanded}
        aria-expanded={expanded}
        aria-label={`${expanded ? 'Collapse' : 'Expand'} ${item.name}`}
        className={cardClassName}
      >
        {cardContent}
      </button>
    )
  }

  return <div className={cardClassName}>{cardContent}</div>
}

interface Props {
  thingsToDo: ItineraryThingToDo[]
}

const ItineraryThingsToDoSection = ({ thingsToDo }: Props) => {
  return (
    <>
      <SectionHeading className="mb-6">What you&apos;ll do</SectionHeading>
      <div className="flex flex-col gap-8">
        {thingsToDo.map((item, index) => (
          <ThingToDoItem key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </>
  )
}

export default ItineraryThingsToDoSection
