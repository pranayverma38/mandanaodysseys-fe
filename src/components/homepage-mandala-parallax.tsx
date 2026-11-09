'use client'

import { waitForScrollSmoother } from '@/lib/gsap-scroll'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function HomepageMandalaParallax() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const topRightRef = useRef<HTMLDivElement | null>(null)
  const leftRef = useRef<HTMLDivElement | null>(null)
  const bottomRightRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) {
        return
      }

      let isActive = true
      let timeline: gsap.core.Timeline | null = null

      waitForScrollSmoother().then(() => {
        if (!isActive || !rootRef.current || !topRightRef.current || !leftRef.current || !bottomRightRef.current) {
          return
        }

        timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.45,
          },
        })

        timeline
          .fromTo(topRightRef.current, { y: 0 }, { y: 380 }, 0)
          .fromTo(leftRef.current, { y: 20 }, { y: 500 }, 0)
          .fromTo(bottomRightRef.current, { y: 50 }, { y: 640 }, 0)

        ScrollTrigger.refresh()
      })

      return () => {
        isActive = false
        timeline?.scrollTrigger?.kill()
        timeline?.kill()
      }
    },
    { scope: rootRef }
  )

  return (
    <div ref={rootRef} aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <div ref={topRightRef} className="absolute right-0 top-[9%] hidden translate-x-1/2 opacity-[0.15] md:block">
        <Image
          src="/svg/mandala_SVG.svg"
          alt=""
          width={720}
          height={720}
          className="h-auto w-[28rem] origin-center animate-[spin_68s_linear_infinite] lg:w-[38rem] 2xl:w-[46rem]"
        />
      </div>

      <div ref={leftRef} className="absolute left-0 top-[31%] hidden -translate-x-1/2 opacity-[0.15] md:block">
        <Image
          src="/svg/mandala_SVG.svg"
          alt=""
          width={720}
          height={720}
          className="h-auto w-[26rem] origin-center -scale-x-100 animate-[spin_68s_linear_infinite] lg:w-[34rem] 2xl:w-[42rem]"
        />
      </div>

      <div ref={bottomRightRef} className="absolute right-0 top-[56%] hidden translate-x-1/2 opacity-[0.15] md:block">
        <Image
          src="/svg/mandala_SVG.svg"
          alt=""
          width={720}
          height={720}
          className="h-auto w-[22rem] origin-center animate-[spin_68s_linear_infinite] lg:w-[30rem] 2xl:w-[38rem]"
        />
      </div>
    </div>
  )
}
