'use client'

import type { ItineraryThingToDo } from '@/data/itineraries/types'
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import ItineraryDayMapModal from './itinerary-day-map-modal'
import ItineraryRouteMap from './itinerary-route-map'

interface Props {
  thingsToDo: ItineraryThingToDo[]
}

const ItineraryMapExplorer = ({ thingsToDo }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  if (thingsToDo.length === 0) {
    return null
  }

  return (
    <>
      <div className="group relative h-full w-full overflow-hidden rounded-xl">
        <ItineraryRouteMap thingsToDo={thingsToDo} />
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="absolute inset-0 z-10 flex cursor-pointer items-end justify-end bg-black/0 p-3 transition-colors hover:bg-black/10 sm:p-4 dark:hover:bg-black/20"
          aria-label="Open day-by-day itinerary map"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-sm font-medium text-neutral-900 shadow-lg transition group-hover:bg-white dark:bg-neutral-900/95 dark:text-white dark:group-hover:bg-neutral-900">
            <ArrowsPointingOutIcon className="size-4 shrink-0" aria-hidden="true" />
            Explore day by day
          </span>
        </button>
      </div>

      <ItineraryDayMapModal thingsToDo={thingsToDo} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default ItineraryMapExplorer
