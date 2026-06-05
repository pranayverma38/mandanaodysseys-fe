'use client'

import { waitForScrollSmoother } from '@/lib/gsap-scroll'
import { isSmoothScrollEnabled } from '@/lib/smooth-scroll'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import './section-sticky-grid-scroll.css'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

/** Component-only scrub lag — animations coast briefly after scroll stops. */
const SCROLL_SCRUB_LAG = 0.65

const GRID_IMAGES = Array.from({ length: 12 }, (_, index) => ({
  src: `/images/sticky-grid-scroll/${index + 1}.png`,
  alt: `Travel destination ${index + 1}`,
}))

function preloadImages(container: HTMLElement): Promise<void> {
  const images = container.querySelectorAll('img')

  return Promise.all(
    Array.from(images).map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve()
            return
          }

          img.onload = () => resolve()
          img.onerror = () => resolve()
        }),
    ),
  ).then(() => undefined)
}

export default function SectionStickyGridScroll() {
  const blockRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const block = blockRef.current
      if (!block) {
        return
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isTabletOrUp = window.matchMedia('(min-width: 768px)').matches
      if (prefersReducedMotion || !isTabletOrUp) {
        return
      }

      let triggers: ScrollTrigger[] = []
      let refresh: (() => void) | undefined
      let isMounted = true

      const initAnimation = () => {
        const wrapper = block.querySelector<HTMLElement>('.block__wrapper')
        const content = block.querySelector<HTMLElement>('.content')
        const textGroup = block.querySelector<HTMLElement>('.content__text')
        const description = block.querySelector<HTMLElement>('.content__description')
        const author = block.querySelector<HTMLElement>('.content__author')
        const grid = block.querySelector<HTMLElement>('.gallery__grid')
        const gallery = block.querySelector<HTMLElement>('.gallery')
        const items = block.querySelectorAll<HTMLElement>('.gallery__item')

        if (!wrapper || !content || !textGroup || !description || !author || !grid || !gallery || !items.length) {
          return
        }

        gsap.set([description, author], { opacity: 0, pointerEvents: 'none' })
        gsap.set(textGroup, { opacity: 1, yPercent: 0 })

        const numColumns = 3
        const columns: HTMLElement[][] = Array.from({ length: numColumns }, () => [])
        items.forEach((item, index) => {
          columns[index % numColumns].push(item)
        })

        const intro =
          block.previousElementSibling ??
          block.parentElement?.previousElementSibling ??
          block.closest('main')?.querySelector<HTMLElement>('.sticky-grid-scroll-intro') ??
          null
        const wh = window.innerHeight
        const revealDistance = wh - (wh - grid.offsetHeight) / 2

        columns.forEach((column, colIndex) => {
          const fromTop = colIndex % 2 === 0
          gsap.set(column, { y: revealDistance * (fromTop ? -1 : 1) })
        })
        gsap.set(grid, { scale: 1, transformOrigin: '50% 50%' })
        gsap.set(gallery, { opacity: 0 })

        const gridRevealTimeline = () => {
          const timeline = gsap.timeline()

          columns.forEach((column, colIndex) => {
            const fromTop = colIndex % 2 === 0

            timeline.to(
              column,
              {
                y: 0,
                stagger: {
                  each: 0.06,
                  from: fromTop ? 'end' : 'start',
                },
                ease: 'power1.inOut',
              },
              'grid-reveal',
            )
          })

          return timeline
        }

        const gridZoomTimeline = () => {
          const timeline = gsap.timeline({ defaults: { duration: 1, ease: 'power3.inOut' } })

          timeline.to(grid, { scale: 2.05 })
          timeline.to(columns[0], { xPercent: -40 }, '<')
          timeline.to(columns[2], { xPercent: 40 }, '<')
          timeline.to(
            columns[1],
            {
              yPercent: (index) => (index < Math.floor(columns[1].length / 2) ? -1 : 1) * 40,
              duration: 0.5,
              ease: 'power1.inOut',
            },
            '-=0.5',
          )

          return timeline
        }

        const toggleContent = (isVisible = true) => {
          const timeline = gsap.timeline({ defaults: { overwrite: true } })

          timeline.to(textGroup, {
            yPercent: isVisible ? -8 : 0,
            duration: 0.7,
            ease: 'power2.inOut',
          })

          if (isVisible) {
            timeline
              .to(
                description,
                {
                  opacity: 1,
                  duration: 0.4,
                  ease: 'power1.inOut',
                  pointerEvents: 'all',
                },
                '-=90%',
              )
              .to(
                author,
                {
                  opacity: 1,
                  duration: 0.4,
                  ease: 'power1.inOut',
                },
                '+=0.3',
              )
          } else {
            timeline
              .to(
                [author, description],
                {
                  opacity: 0,
                  duration: 0.4,
                  ease: 'power1.out',
                  pointerEvents: 'none',
                },
                '<',
              )
          }
        }

        triggers = []

        if (isSmoothScrollEnabled()) {
          triggers.push(
            ScrollTrigger.create({
              trigger: block,
              pin: wrapper,
              start: 'top top',
              end: 'bottom bottom',
              pinSpacing: false,
              invalidateOnRefresh: true,
            }),
          )
        }

        const mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: intro ?? block,
            start: intro ? 'bottom 5%' : 'top 25%',
            endTrigger: block,
            end: 'bottom bottom',
            scrub: SCROLL_SCRUB_LAG,
          },
        })

        mainTimeline
          .to(gallery, { opacity: 1, duration: 0.01 }, 0)
          .add(gridRevealTimeline(), 0)
          .add(gridZoomTimeline(), '-=0.6')
          .add(() => toggleContent(mainTimeline.scrollTrigger?.direction === 1), '-=0.32')

        if (mainTimeline.scrollTrigger) {
          triggers.push(mainTimeline.scrollTrigger)
        }

        refresh = () => ScrollTrigger.refresh()
        window.addEventListener('resize', refresh)
        ScrollTrigger.refresh()
      }

      Promise.all([preloadImages(block), waitForScrollSmoother()]).then(() => {
        if (isMounted) {
          initAnimation()
        }
      })

      return () => {
        isMounted = false
        if (refresh) {
          window.removeEventListener('resize', refresh)
        }
        triggers.forEach((trigger) => trigger.kill())
      }
    },
    { scope: blockRef, dependencies: [] },
  )

  return (
    <section ref={blockRef} className="sticky-grid-scroll block block--main hidden md:block">
      <div className="block__wrapper">
        <div className="content">
          <div className="content__text">
            <h2 className="content__title">The world is a book</h2>
            <div className="content__copy">
              <p className="content__description">and those who do not travel read only one page.</p>
              <p className="content__author">
                <span className="content__author-name">Saint Augustine</span>
                <span className="content__author-separator" aria-hidden="true">
                  ·
                </span>
                <span className="content__author-role">Philosopher</span>
              </p>
            </div>
          </div>
        </div>
        <div className="gallery">
          <ul className="gallery__grid">
            {GRID_IMAGES.map((image) => (
              <li key={image.src} className="gallery__item">
                <img className="gallery__image" src={image.src} alt={image.alt} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
