'use client'

import fullColoredLogo from '@/images/logos/full-colored.png'
import { animate } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const HOLD_MS = 800
const TOTAL_MS = 1300
const SCALE_OUT_MS = TOTAL_MS - HOLD_MS
const EXIT_SCALE = 22

export default function HomeSplashScreen() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(false)
      setShouldRender(false)
      return
    }

    const overlay = overlayRef.current
    const logo = logoRef.current
    if (!overlay || !logo) {
      return
    }

    document.body.style.overflow = 'hidden'

    const entrance = animate(
      logo,
      { scale: [0.88, 1], opacity: [0, 1] },
      { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
    )

    const holdTimer = window.setTimeout(() => {
      animate(logo, { scale: EXIT_SCALE }, { duration: SCALE_OUT_MS / 1000, ease: [0.76, 0, 0.24, 1] })
      animate(overlay, { opacity: [1, 0] }, { duration: SCALE_OUT_MS / 1000, ease: 'easeOut' })
    }, HOLD_MS)

    const exitTimer = window.setTimeout(() => {
      setIsVisible(false)
      document.body.style.overflow = ''
    }, TOTAL_MS)

    const unmountTimer = window.setTimeout(() => {
      setShouldRender(false)
    }, TOTAL_MS + 150)

    return () => {
      entrance.stop()
      window.clearTimeout(holdTimer)
      window.clearTimeout(exitTimer)
      window.clearTimeout(unmountTimer)
      document.body.style.overflow = ''
    }
  }, [])

  if (!shouldRender) {
    return null
  }

  return (
    <div
      ref={overlayRef}
      aria-hidden={!isVisible}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div ref={logoRef} className="will-change-transform" style={{ opacity: 0, transform: 'scale(0.88)' }}>
        <Image
          src={fullColoredLogo}
          alt=""
          width={192}
          height={Math.round((192 / fullColoredLogo.width) * fullColoredLogo.height)}
          className="h-auto w-[160px] max-w-none sm:w-[192px]"
          priority
        />
      </div>
    </div>
  )
}
