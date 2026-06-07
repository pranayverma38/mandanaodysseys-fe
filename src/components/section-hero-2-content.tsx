'use client'

import { ListingType } from '@/type'
import clsx from 'clsx'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import HeroSearchForm2 from './hero-search-form/hero-search-form2'
import HeroSearchFormMobile from './hero-search-form-mobile/hero-search-form-mobile'
import HeroSearchGlare from './hero-search-glare'
import { MotionDiv } from './motion-div'

interface Props {
  title: ReactNode
  searchFormInitTab: ListingType
  showSearchTabs: boolean
}

const CLOSE_DELAY_MS = 200

const isSearchFieldOpen = (stack: HTMLElement) =>
  Boolean(stack.querySelector('.hero-search-form [data-open]'))

const HeroSection2Content = ({ title, searchFormInitTab, showSearchTabs }: Props) => {
  const [isFieldOpen, setIsFieldOpen] = useState(false)
  const stackRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const measureTitleShift = useCallback(() => {
    const stack = stackRef.current
    const titleEl = titleRef.current
    if (!stack || !titleEl) return

    const gap = window.matchMedia('(min-width: 1024px)').matches ? 32 : 0
    stack.style.setProperty('--hero-search-shift', `-${titleEl.offsetHeight + gap}px`)
  }, [])

  const cancelPendingClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }, [])

  const setFieldOpen = useCallback(
    (open: boolean) => {
      if (open) {
        cancelPendingClose()
        setIsFieldOpen(true)
        return
      }

      cancelPendingClose()
      closeTimeoutRef.current = setTimeout(() => {
        const stack = stackRef.current
        if (stack && !isSearchFieldOpen(stack)) {
          setIsFieldOpen(false)
        }
        closeTimeoutRef.current = null
      }, CLOSE_DELAY_MS)
    },
    [cancelPendingClose]
  )

  const syncFieldOpenState = useCallback(() => {
    const stack = stackRef.current
    if (!stack) return

    measureTitleShift()

    if (isSearchFieldOpen(stack)) {
      setFieldOpen(true)
    } else {
      setFieldOpen(false)
    }
  }, [measureTitleShift, setFieldOpen])

  useEffect(() => {
    const stack = stackRef.current
    if (!stack) return

    syncFieldOpenState()

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (!target.closest('.hero-search-form button, .hero-search-form [role="combobox"]')) return

      setFieldOpen(true)
    }

    const observer = new MutationObserver(syncFieldOpenState)
    observer.observe(stack, {
      attributes: true,
      subtree: true,
      attributeFilter: ['data-open'],
    })

    stack.addEventListener('pointerdown', handlePointerDown, true)
    window.addEventListener('resize', measureTitleShift)

    return () => {
      observer.disconnect()
      stack.removeEventListener('pointerdown', handlePointerDown, true)
      window.removeEventListener('resize', measureTitleShift)
      cancelPendingClose()
    }
  }, [syncFieldOpenState, measureTitleShift, setFieldOpen, cancelPendingClose])

  return (
    <div
      ref={stackRef}
      className={clsx(
        'section-hero-2__stack pointer-events-auto relative flex flex-1 flex-col items-center justify-center px-4 py-28 text-center sm:py-32',
        isFieldOpen && 'section-hero-2__stack--search-active'
      )}
    >
      <MotionDiv
        ref={titleRef}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="section-hero-2__title text-white"
      >
        <h1 className="max-w-4xl text-[clamp(32px,calc(32px+13*((100vw-320px)/(1024-320))),45px)] leading-[1.1] font-normal tracking-[-0.02em] [&_span[data-slot=style-script]]:font-style-script [&_span[data-slot=style-script]]:text-[clamp(40px,calc(40px+39*((100vw-320px)/(1024-320))),79px)] [&_span[data-slot=style-script]]:font-thin [&_span[data-slot=style-script]]:opacity-90 [&_span[data-slot=style-script]]:italic">
          {title}
        </h1>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.9 }}
        className="section-hero-2__search relative z-20 mt-8 w-full max-w-lg overflow-visible px-2 sm:mt-10 sm:max-w-2xl lg:max-w-6xl"
      >
        <HeroSearchGlare fitContent className="mx-auto lg:hidden">
          <HeroSearchFormMobile compact />
        </HeroSearchGlare>
        <HeroSearchGlare className="hidden w-full lg:block">
          <HeroSearchForm2 initTab={searchFormInitTab} showTabs={showSearchTabs} />
        </HeroSearchGlare>
      </MotionDiv>
    </div>
  )
}

export default HeroSection2Content
