'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PropsWithChildren, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export function ScrollSmootherProvider({ children }: PropsWithChildren) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion || !wrapperRef.current || !contentRef.current) {
        return
      }

      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.4,
        smoothTouch: 0.12,
        effects: true,
        normalizeScroll: true,
      })

      return () => {
        smoother.kill()
      }
    },
    { dependencies: [], scope: wrapperRef }
  )

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  )
}
