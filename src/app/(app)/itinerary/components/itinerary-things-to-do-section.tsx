'use client'

import type { ItineraryThingToDo } from '@/data/itineraries/types'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { SectionHeading } from '../../(listings)/components/section-heading'

function ThingToDoItem({ item }: { item: ItineraryThingToDo }) {
  const [expanded, setExpanded] = useState(false)
  const [canExpand, setCanExpand] = useState(false)
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null)
  const [fullHeight, setFullHeight] = useState<number | null>(null)
  const contentRef = useRef<HTMLParagraphElement>(null)

  const measureHeights = useCallback(() => {
    const element = contentRef.current
    if (!element) {
      return
    }

    element.classList.add('line-clamp-2')
    const collapsed = element.clientHeight
    element.classList.remove('line-clamp-2')
    const full = element.scrollHeight

    setCollapsedHeight(collapsed)
    setFullHeight(full)
    setCanExpand(full > collapsed + 1)
  }, [])

  useLayoutEffect(() => {
    measureHeights()
    window.addEventListener('resize', measureHeights)
    return () => window.removeEventListener('resize', measureHeights)
  }, [item.description, measureHeights])

  useLayoutEffect(() => {
    if (!expanded) {
      measureHeights()
    }
  }, [expanded, measureHeights])

  const isMeasured = collapsedHeight !== null && fullHeight !== null
  const toggleExpanded = () => {
    if (canExpand) {
      setExpanded((value) => !value)
    }
  }

  const cardClassName = clsx(
    'flex w-full items-start gap-4 text-start sm:gap-8',
    canExpand &&
      'cursor-pointer rounded-xl border-0 bg-transparent p-3 -m-3 transition-colors hover:bg-neutral-50 sm:p-4 sm:-m-4 dark:hover:bg-neutral-900/40'
  )

  const cardContent = (
    <>
      <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl">
        <Image fill src={item.imageUrl} alt={item.name} className="object-cover shadow-inner" sizes="96px" />
      </div>

      <div className="min-w-0 flex-1 text-sm/5 text-muted-foreground">
        <p>{item.time}</p>
        <p className="mt-2 font-medium text-foreground">{item.name}</p>
        <div
          className={clsx(
            'overflow-hidden transition-[max-height] duration-500 ease-in-out',
            isMeasured && 'motion-reduce:transition-none'
          )}
          style={isMeasured ? { maxHeight: expanded ? fullHeight : collapsedHeight } : undefined}
        >
          <p ref={contentRef} className="mt-1">
            {item.description}
          </p>
        </div>
      </div>

      {canExpand ? (
        <ChevronDownIcon
          aria-hidden="true"
          className={clsx(
            'mt-6 size-5 shrink-0 self-start text-[#00b277] transition-transform duration-500 ease-in-out',
            expanded && 'rotate-180'
          )}
        />
      ) : null}
    </>
  )

  if (canExpand) {
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
      <SectionHeading id="itinerary-your-trip" className="scroll-mt-20">
        What you&apos;ll do
      </SectionHeading>
      <div className="flex flex-col gap-8">
        {thingsToDo.map((item, index) => (
          <ThingToDoItem key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </>
  )
}

export default ItineraryThingsToDoSection
