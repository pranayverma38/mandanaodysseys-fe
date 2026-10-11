'use client'

import type { ItineraryThingToDo } from '@/data/itineraries/types'
import { isProxiedItineraryImageUrl, resolveItineraryImageUrl } from '@/lib/itinerary-image-url'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { useLayoutEffect, useRef, useState } from 'react'
import { SectionHeading } from '../../(listings)/components/section-heading'

function ThingToDoItem({ item }: { item: ItineraryThingToDo }) {
  const [expanded, setExpanded] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const hasDescription = item.description.trim().length > 0

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
  }, [item.description])

  const toggleExpanded = () => {
    if (hasDescription) {
      setExpanded((value) => !value)
    }
  }

  const cardClassName = clsx(
    'flex w-full items-start gap-4 text-start sm:gap-6',
    hasDescription &&
      'cursor-pointer rounded-xl border-0 bg-transparent p-3 -m-3 transition-colors hover:bg-neutral-50 sm:p-4 sm:-m-4 dark:hover:bg-neutral-900/40'
  )

  const cardContent = (
    <>
      <div className="relative aspect-square w-20 shrink-0 self-center overflow-hidden rounded-xl">
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
        {hasDescription ? (
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out motion-reduce:transition-none"
            style={{
              maxHeight: expanded ? contentHeight : 0,
              opacity: expanded ? 1 : 0,
            }}
          >
            <div ref={contentRef}>
              <p className="pt-1">{item.description}</p>
            </div>
          </div>
        ) : null}
      </div>

      {hasDescription ? (
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

  if (hasDescription) {
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
