'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useRef, useState } from 'react'

const ACCENT = '#FC6200'
const MIN_VISIBLE_MS = 280
const COMPLETE_HOLD_MS = 260
const SAFETY_TIMEOUT_MS = 2500

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0
}

function locationKey(pathname: string, search = '') {
  const normalizedSearch = search.startsWith('?') ? search.slice(1) : search
  return normalizedSearch ? `${pathname}?${normalizedSearch}` : pathname
}

function getInternalNavigationUrl(anchor: HTMLAnchorElement): URL | null {
  if (anchor.target && anchor.target !== '_self') {
    return null
  }

  if (anchor.hasAttribute('download')) {
    return null
  }

  const href = anchor.getAttribute('href')
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return null
  }

  try {
    const url = new URL(anchor.href, window.location.href)
    if (url.origin !== window.location.origin) {
      return null
    }

    if (locationKey(url.pathname, url.search) === locationKey(window.location.pathname, window.location.search)) {
      return null
    }

    return url
  } catch {
    return null
  }
}

function NavigationProgressInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  const progressRef = useRef(0)
  const isNavigatingRef = useRef(false)
  const startedAtRef = useRef(0)
  const fromLocationRef = useRef(locationKey(pathname, searchParams.toString()))
  const toLocationRef = useRef<string | null>(null)
  const intervalRef = useRef<number | null>(null)
  const hideTimeoutRef = useRef<number | null>(null)
  const completeTimeoutRef = useRef<number | null>(null)
  const safetyTimeoutRef = useRef<number | null>(null)
  const pollRef = useRef<number | null>(null)

  const clearTimers = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (hideTimeoutRef.current !== null) {
      window.clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }

    if (completeTimeoutRef.current !== null) {
      window.clearTimeout(completeTimeoutRef.current)
      completeTimeoutRef.current = null
    }

    if (safetyTimeoutRef.current !== null) {
      window.clearTimeout(safetyTimeoutRef.current)
      safetyTimeoutRef.current = null
    }

    if (pollRef.current !== null) {
      window.clearInterval(pollRef.current)
      pollRef.current = null
    }
  }

  const updateProgress = (value: number) => {
    progressRef.current = value
    setProgress(value)
  }

  const finish = () => {
    if (!isNavigatingRef.current) {
      return
    }

    const elapsed = Date.now() - startedAtRef.current
    const waitMs = Math.max(0, MIN_VISIBLE_MS - elapsed)

    const complete = () => {
      isNavigatingRef.current = false
      toLocationRef.current = null
      clearTimers()
      updateProgress(100)
      delete document.documentElement.dataset.navigating

      hideTimeoutRef.current = window.setTimeout(() => {
        setIsVisible(false)
        updateProgress(0)
      }, COMPLETE_HOLD_MS)
    }

    if (waitMs > 0) {
      completeTimeoutRef.current = window.setTimeout(complete, waitMs)
      return
    }

    complete()
  }

  const hasNavigationCommitted = () => {
    const current = locationKey(window.location.pathname, window.location.search)
    const destination = toLocationRef.current

    if (destination && current === destination) {
      return true
    }

    return current !== fromLocationRef.current
  }

  const start = (destination?: string) => {
    if (isNavigatingRef.current) {
      return
    }

    const current = locationKey(window.location.pathname, window.location.search)
    isNavigatingRef.current = true
    startedAtRef.current = Date.now()
    fromLocationRef.current = current
    toLocationRef.current = destination ?? null
    clearTimers()
    setIsVisible(true)
    updateProgress(16)
    document.documentElement.dataset.navigating = 'true'
    document.title = 'Loading…'

    intervalRef.current = window.setInterval(() => {
      const currentProgress = progressRef.current
      if (currentProgress >= 90) {
        return
      }

      const increment = Math.max(0.8, (90 - currentProgress) * 0.085)
      updateProgress(Math.min(currentProgress + increment, 90))
    }, 180)

    const completeIfCommitted = () => {
      if (hasNavigationCommitted()) {
        finish()
      }
    }

    // Next.js can commit the URL on pointerdown/prefetch before click, or
    // before usePathname updates. Finish as soon as the location matches.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(completeIfCommitted)
    })

    pollRef.current = window.setInterval(completeIfCommitted, 80)
    safetyTimeoutRef.current = window.setTimeout(finish, SAFETY_TIMEOUT_MS)
  }

  useEffect(() => {
    const onNavigateIntent = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) {
        return
      }

      const target = event.target
      if (!(target instanceof Element)) {
        return
      }

      const anchor = target.closest('a')
      if (!(anchor instanceof HTMLAnchorElement)) {
        return
      }

      const url = getInternalNavigationUrl(anchor)
      if (!url) {
        return
      }

      start(locationKey(url.pathname, url.search))
    }

    const onPopState = () => {
      start()
    }

    document.addEventListener('pointerdown', onNavigateIntent, true)
    document.addEventListener('click', onNavigateIntent, true)
    window.addEventListener('popstate', onPopState)

    return () => {
      document.removeEventListener('pointerdown', onNavigateIntent, true)
      document.removeEventListener('click', onNavigateIntent, true)
      window.removeEventListener('popstate', onPopState)
      clearTimers()
      delete document.documentElement.dataset.navigating
    }
  }, [])

  useEffect(() => {
    if (!isNavigatingRef.current) {
      fromLocationRef.current = locationKey(pathname, searchParams.toString())
      return
    }

    if (hasNavigationCommitted() || locationKey(pathname, searchParams.toString()) !== fromLocationRef.current) {
      finish()
    }
  }, [pathname, searchParams])

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={isVisible ? 'Loading' : undefined}
      className="pointer-events-none fixed inset-x-0 top-0 z-[400] h-0.5"
    >
      <div
        className="h-full origin-left rounded-r-full bg-[#FC6200] shadow-[0_0_12px_rgba(252,98,0,0.65)] transition-opacity duration-200"
        style={{
          width: `${progress}%`,
          opacity: isVisible ? 1 : 0,
          transitionProperty: 'width, opacity',
          transitionDuration: progress === 100 ? '180ms' : '220ms',
          backgroundColor: ACCENT,
        }}
      />
    </div>
  )
}

/**
 * Immediate route-change feedback for App Router navigations.
 * Client transitions do not spin the browser tab, so this shows a top bar
 * and a temporary `Loading…` document title.
 */
export function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <NavigationProgressInner />
    </Suspense>
  )
}
