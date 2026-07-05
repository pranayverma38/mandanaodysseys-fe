'use client'

import {
  BubbleChatQuestionIcon,
  Calendar04Icon,
  EarthIcon,
  MapsIcon,
  ShoppingBag02Icon,
  WindTurbineIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

type TabId = 'overview' | 'packages' | 'best-time' | 'temperature' | 'facts' | 'faq'

const ACTIVE_ORANGE = '#fc6200'

const TABS: {
  id: TabId
  label: string
  targetId: string
  icon: typeof MapsIcon
}[] = [
  { id: 'overview', label: 'Overview', targetId: 'destination-overview', icon: MapsIcon },
  { id: 'packages', label: 'Packages', targetId: 'destination-packages', icon: ShoppingBag02Icon },
  {
    id: 'best-time',
    label: 'Best time to visit',
    targetId: 'destination-best-time',
    icon: Calendar04Icon,
  },
  { id: 'temperature', label: 'Temperature', targetId: 'destination-temperature', icon: WindTurbineIcon },
  { id: 'facts', label: 'Facts', targetId: 'destination-facts', icon: EarthIcon },
  { id: 'faq', label: 'FAQ', targetId: 'destination-faq', icon: BubbleChatQuestionIcon },
]

export function DestinationStickyNav() {
  const [activeTab, setActiveTab] = useState<TabId>('overview')

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
    <div className="sticky top-0 z-30 w-full border-b border-neutral-200 bg-background dark:border-neutral-800">
      <nav aria-label="Destination sections" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="hidden-scrollbar flex justify-center overflow-x-auto">
          <ul className="flex w-max items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
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
