'use client'

import { Button } from '@/components/button'
import { getItineraryDayLabel } from '@/data/itineraries/day-label'
import type { ItineraryThingToDo } from '@/data/itineraries/types'
import { Dialog, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import ItineraryDayFocusMap from './itinerary-day-focus-map'

interface Props {
  thingsToDo: ItineraryThingToDo[]
  isOpen: boolean
  onClose: () => void
  initialDayIndex?: number
}

const ItineraryDayMapModal = ({ thingsToDo, isOpen, onClose, initialDayIndex = 0 }: Props) => {
  const [activeIndex, setActiveIndex] = useState(initialDayIndex)
  const totalDays = thingsToDo.length
  const activeItem = thingsToDo[activeIndex]
  const { label: dayLabel } = activeItem
    ? getItineraryDayLabel(activeItem.time, activeIndex)
    : { label: `Day ${activeIndex + 1}` }

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialDayIndex)
    }
  }, [initialDayIndex, isOpen])

  const goToPrevious = () => {
    setActiveIndex((index) => Math.max(index - 1, 0))
  }

  const goToNext = () => {
    setActiveIndex((index) => Math.min(index + 1, totalDays - 1))
  }

  if (!activeItem) {
    return null
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-900/60 dark:bg-neutral-950/80" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-stretch justify-center p-2 sm:items-center sm:p-6">
          <div className="flex h-full w-full min-h-0 items-stretch sm:h-auto sm:min-h-full sm:items-center sm:justify-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="flex h-[calc(100dvh-1rem)] w-full max-w-6xl min-h-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl sm:h-auto sm:max-h-[calc(100vh-1.5rem)] lg:max-h-[90vh] lg:min-h-[680px] dark:border-neutral-700 dark:bg-neutral-900">
                <div className="relative flex shrink-0 items-center justify-center border-b border-neutral-200 px-10 py-2.5 sm:px-12 dark:border-neutral-700">
                  <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 sm:right-4 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                    aria-label="Close"
                  >
                    <XMarkIcon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                  </button>
                  <div className="text-center">
                    <DialogTitle className="text-base font-semibold sm:text-[1.05rem]">
                      Explore your itinerary
                    </DialogTitle>
                    <p className="text-xs text-muted-foreground">
                      {dayLabel} of {totalDays}
                    </p>
                  </div>
                </div>

                <div className="flex min-h-0 flex-1 flex-col lg:min-h-[560px] lg:flex-row">
                  <div className="shrink-0 border-b border-neutral-200 p-3 sm:p-6 lg:flex lg:min-h-0 lg:w-1/2 lg:flex-1 lg:flex-col lg:overflow-y-auto lg:border-r lg:border-b-0 dark:border-neutral-700">
                    <span className="inline-flex w-fit rounded-full bg-[#FC6200]/10 px-2.5 py-0.5 text-xs font-semibold text-[#FC6200]">
                      {dayLabel}
                    </span>

                    <div
                      key={activeIndex}
                      className={clsx(
                        'mt-2 flex items-start gap-3 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300 sm:mt-4 sm:gap-6 lg:flex-row'
                      )}
                    >
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-lg sm:size-16 lg:aspect-square lg:h-auto lg:w-40">
                        <Image
                          fill
                          src={activeItem.imageUrl}
                          alt={activeItem.name}
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground sm:text-sm">{activeItem.time}</p>
                        <h3 className="mt-1 text-base font-medium text-foreground sm:mt-2 sm:text-lg">
                          {activeItem.name}
                        </h3>
                        <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:line-clamp-none sm:text-sm">
                          {activeItem.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative min-h-[220px] flex-1 lg:min-h-0 lg:w-1/2">
                    <div className="absolute inset-0">
                      <ItineraryDayFocusMap thingsToDo={thingsToDo} activeIndex={activeIndex} isOpen={isOpen} />
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-2 border-t border-neutral-200 px-3 py-2.5 sm:gap-3 sm:px-6 dark:border-neutral-700">
                  <Button
                    outline
                    className="px-3 py-1.5 text-sm *:data-[slot=icon]:size-3.5"
                    onClick={goToPrevious}
                    disabled={activeIndex === 0}
                  >
                    <ChevronLeftIcon data-slot="icon" aria-hidden="true" />
                    Previous
                  </Button>

                  <span className="text-xs text-muted-foreground sm:text-sm">
                    {activeIndex + 1} / {totalDays}
                  </span>

                  {activeIndex < totalDays - 1 ? (
                    <Button
                      color="orange"
                      className="px-3 py-1.5 text-sm *:data-[slot=icon]:size-3.5"
                      onClick={goToNext}
                    >
                      Next day
                      <ChevronRightIcon data-slot="icon" aria-hidden="true" />
                    </Button>
                  ) : (
                    <Button color="orange" className="px-3 py-1.5 text-sm" onClick={onClose}>
                      Done
                    </Button>
                  )}
                </div>
              </Dialog.Panel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ItineraryDayMapModal
