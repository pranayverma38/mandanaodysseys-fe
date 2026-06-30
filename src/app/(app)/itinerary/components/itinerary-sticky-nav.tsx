'use client'

import {
  BedSingle02Icon,
  LeftToRightListDashIcon,
  MapsIcon,
  PinLocation03Icon,
  StarCircleIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

type TabId = 'your-trip' | 'inclusions' | 'accommodation' | 'reviews' | 'map'

const ACTIVE_ORANGE = '#fc6200'

const TABS: {
  id: TabId
  label: string
  targetId: string
  icon: typeof MapsIcon
}[] = [
  { id: 'map', label: 'Map', targetId: 'itinerary-map', icon: PinLocation03Icon },
  { id: 'your-trip', label: 'Your Trip', targetId: 'itinerary-your-trip', icon: MapsIcon },
  { id: 'inclusions', label: 'Inclusions', targetId: 'itinerary-inclusions', icon: LeftToRightListDashIcon },
  {
    id: 'accommodation',
    label: 'Accommodation',
    targetId: 'itinerary-accommodation',
    icon: BedSingle02Icon,
  },
  { id: 'reviews', label: 'Reviews', targetId: 'itinerary-reviews', icon: StarCircleIcon },
]

const ItineraryStickyNav = () => {
  const [activeTab, setActiveTab] = useState<TabId>('map')

  useEffect(() => {
    const sections = TABS.map((tab) => document.getElementById(tab.targetId)).filter(
      (section): section is HTMLElement => section !== null
    )

    if (!sections.length) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          const tab = TABS.find((item) => item.targetId === visible[0].target.id)
          if (tab) {
            setActiveTab(tab.id)
          }
        }
      },
      {
        rootMargin: '-40% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (targetId: string, tabId: TabId) => {
    const section = document.getElementById(targetId)
    if (!section) {
      return
    }

    setActiveTab(tabId)
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="sticky top-0 z-10 w-full bg-background md:mt-4">
      <nav
        aria-label="Itinerary sections"
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="hidden-scrollbar -mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6 md:mx-0 md:overflow-visible md:px-0">
          <ul className="flex w-max items-center gap-6 sm:gap-8 md:w-full md:gap-12">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id

              return (
                <li key={tab.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => scrollToSection(tab.targetId, tab.id)}
                    className={clsx(
                      'relative flex items-center gap-2 px-1 py-4 text-sm whitespace-nowrap transition-colors sm:text-base',
                      isActive ? 'font-semibold text-[#fc6200]' : 'font-normal text-black hover:text-neutral-700'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <HugeiconsIcon
                      icon={tab.icon}
                      size={22}
                      className="shrink-0"
                      color={isActive ? ACTIVE_ORANGE : 'currentColor'}
                    />
                    <span>{tab.label}</span>
                    <span
                      className={clsx(
                        'absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#fc6200] transition-opacity',
                        isActive ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default ItineraryStickyNav
