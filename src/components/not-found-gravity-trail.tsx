'use client'

import ButtonPrimary from '@/components/button-primary'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useRef } from 'react'
import './not-found-gravity-trail.css'

const TRAIL_IMAGES = Array.from({ length: 12 }, (_, index) => `/images/sticky-grid-scroll/${index + 1}.png`)

export default function NotFoundGravityTrail() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) {
        return
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) {
        return
      }

      let indexImg = 0
      let incr = 0
      let oldIncrX = 0
      let oldIncrY = 0
      let resetDist = window.innerWidth / 8

      const createMedia = (x: number, y: number, deltaX: number, deltaY: number) => {
        const viewportHeight = window.innerHeight
        if (y > viewportHeight - 200) {
          return
        }

        const image = document.createElement('img')
        image.src = TRAIL_IMAGES[indexImg]!
        image.alt = ''
        image.className = 'not-found-trail__media'
        root.appendChild(image)
        indexImg = (indexImg + 1) % TRAIL_IMAGES.length

        const timeline = gsap.timeline({
          onComplete: () => {
            image.remove()
            timeline.kill()
          },
        })

        timeline.fromTo(
          image,
          {
            xPercent: -50 + (Math.random() - 0.5) * 80,
            yPercent: -50 + (Math.random() - 0.5) * 10,
            scaleX: 1.3,
            scaleY: 1.3,
            rotation: (Math.random() - 0.5) * 20,
          },
          {
            scaleX: 1,
            scaleY: 1,
            ease: 'elastic.out(2, 0.6)',
            duration: 0.4,
          }
        )

        timeline.fromTo(
          image,
          { x },
          {
            x: `+=${deltaX * 2}`,
            rotation: 0,
            ease: 'power1.in',
            duration: 0.4,
          },
          '<'
        )

        timeline.fromTo(
          image,
          { y },
          {
            y: `+=${viewportHeight - y}`,
            scale: 0.9,
            yPercent: -95,
            ease: 'back.in(1.1)',
            duration: 0.4,
          },
          '<'
        )

        timeline.to(image, {
          x: `+=${deltaX * 1.6}`,
          rotation: (Math.random() - 0.5) * 40,
          ease: 'power1.in',
          duration: 0.3,
        })

        timeline.to(
          image,
          {
            yPercent: 150,
            ease: `back.in(${1.5 + (1 - y / viewportHeight)})`,
            duration: 0.3,
          },
          '<'
        )
      }

      const handleResize = () => {
        resetDist = window.innerWidth / 8
      }

      const handleMouseMove = (event: MouseEvent) => {
        const valX = event.clientX
        const valY = event.clientY
        const localY = valY - root.getBoundingClientRect().top

        incr += Math.abs(valX - oldIncrX) + Math.abs(valY - oldIncrY)

        if (incr > resetDist) {
          incr = 0
          createMedia(valX, localY, valX - oldIncrX, valY - oldIncrY)
        }

        oldIncrX = valX
        oldIncrY = valY
      }

      window.addEventListener('resize', handleResize)
      root.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('resize', handleResize)
        root.removeEventListener('mousemove', handleMouseMove)
        root.querySelectorAll('.not-found-trail__media').forEach((element) => element.remove())
        gsap.killTweensOf(root.querySelectorAll('.not-found-trail__media'))
      }
    },
    { scope: rootRef }
  )

  return (
    <section ref={rootRef} className="not-found-trail relative min-h-svh w-full overflow-hidden bg-background">
      <div className="not-found-trail__medias" aria-hidden="true">
        {TRAIL_IMAGES.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </div>

      <div className="pointer-events-none relative z-10 flex min-h-svh flex-col items-center justify-center px-4 text-center">
        <p className="font-style-script text-4xl text-[#FC6200] italic md:text-5xl">Lost in transit</p>
        <h1 className="font-marcellus text-7xl leading-none tracking-tight md:text-9xl">404</h1>
        <p className="mt-4 max-w-md text-sm font-medium tracking-wider text-foreground sm:text-base">
          THE PAGE YOU WERE LOOKING FOR DOESN&apos;T EXIST.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">Move your cursor to leave a trail of destinations.</p>
        <div className="pointer-events-auto mt-8">
          <ButtonPrimary href="/">Return Home Page</ButtonPrimary>
        </div>
      </div>
    </section>
  )
}
