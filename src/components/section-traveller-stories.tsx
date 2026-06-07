'use client'

import { ButtonCircle } from '@/components/button'
import GoogleLogoSvg from '@/components/google-logo-svg'
import NextPrevButtons from '@/components/next-prev-btns'
import { TRAVELLER_STORIES, type TravellerStory } from '@/data/traveller-stories'
import { useCarouselArrowButtons } from '@/hooks/use-carousel-arrow-buttons'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { SpeakerWaveIcon, SpeakerXMarkIcon, StarIcon, XMarkIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

function FacebookLogoSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}

function TravellerStoryVideoFrame({
  story,
  shouldLoad,
  onOpen,
}: {
  story: TravellerStory
  shouldLoad: boolean
  onOpen: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return

    video.play().catch(() => {})
  }, [shouldLoad, story.videoSrc])

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative mx-auto aspect-9/16 w-full max-w-[240px] cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/10 transition hover:ring-white/25 sm:max-w-[260px]"
      aria-label={`Play ${story.title}`}
    >
      {shouldLoad ? (
        <video
          ref={videoRef}
          src={story.videoSrc}
          className="size-full object-cover transition duration-300 group-hover:scale-[1.02]"
          muted
          loop
          playsInline
          autoPlay
          preload="none"
        />
      ) : (
        <div className="size-full bg-zinc-800" aria-hidden />
      )}
      <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
    </button>
  )
}

function TravellerStoryCard({
  story,
  shouldLoad,
  onOpen,
}: {
  story: TravellerStory
  shouldLoad: boolean
  onOpen: () => void
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <TravellerStoryVideoFrame story={story} shouldLoad={shouldLoad} onOpen={onOpen} />
      <p className="mt-4 max-w-[260px] text-sm font-medium text-white sm:text-base">{story.title}</p>
      <span className="mt-2 inline-flex rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
        {story.destination}
      </span>
    </div>
  )
}

function TravellerStoryPlayer({
  story,
  onClose,
}: {
  story: TravellerStory
  onClose: () => void
}) {
  const playerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = isMuted
    video.play().catch(() => {})
  }, [isMuted, story.videoSrc])

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 639px)').matches
    if (!isMobile) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) onClose()
  }

  const player = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 max-sm:bg-black max-sm:p-0"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={story.title}
    >
      <div
        ref={playerRef}
        className={clsx(
          'relative overflow-hidden bg-black',
          'max-sm:fixed max-sm:inset-0 max-sm:size-full max-sm:rounded-none',
          'sm:aspect-9/16 sm:h-auto sm:max-h-[90vh] sm:w-auto sm:max-w-[min(90vw,360px)] sm:rounded-2xl sm:ring-1 sm:ring-white/10'
        )}
      >
        <video
          ref={videoRef}
          src={story.videoSrc}
          className="size-full object-cover"
          playsInline
          autoPlay
          loop
          muted={isMuted}
        />

        <button
          type="button"
          onClick={onClose}
          className="absolute end-3 top-3 z-20 flex size-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/65 max-sm:top-[max(0.75rem,env(safe-area-inset-top))]"
          aria-label="Close video"
        >
          <XMarkIcon className="size-5" />
        </button>

        <button
          type="button"
          onClick={() => setIsMuted((prev) => !prev)}
          className="absolute end-3 top-14 z-20 flex size-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/65 max-sm:top-[calc(max(0.75rem,env(safe-area-inset-top))+2.75rem)]"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <SpeakerXMarkIcon className="size-5" /> : <SpeakerWaveIcon className="size-5" />}
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 pt-10 max-sm:pb-[max(1rem,env(safe-area-inset-bottom))]">
          <p className="text-sm font-semibold text-white sm:text-base">{story.title}</p>
          <p className="mt-1 text-xs text-white/75">{story.destination}</p>
        </div>
      </div>
    </div>
  )

  if (!mounted) return null

  return createPortal(player, document.body)
}

function RatingBadge({
  logo,
  rating,
  reviews,
}: {
  logo: React.ReactNode
  rating: string
  reviews: string
}) {
  return (
    <div className="flex items-center gap-2.5">
      {logo}
      <div className="text-start">
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold text-white">{rating}</span>
          <StarIcon className="size-3.5 text-amber-400" />
        </div>
        <p className="text-xs text-zinc-400">{reviews}</p>
      </div>
    </div>
  )
}

const SectionTravellerStories = ({ className }: { className?: string }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const [shouldLoadVideos, setShouldLoadVideos] = useState(false)
  const [activeStory, setActiveStory] = useState<TravellerStory | null>(null)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      skipSnaps: true,
      slidesToScroll: 1,
      align: 'start',
      direction: process.env.NEXT_PUBLIC_THEME_DIR,
    },
    [WheelGesturesPlugin()]
  )
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    useCarouselArrowButtons(emblaApi)
  const [scrollNeeded, setScrollNeeded] = useState(false)

  const updateScrollNeeded = useCallback(() => {
    if (!emblaApi) return

    const { limit } = emblaApi.internalEngine()
    setScrollNeeded(Math.abs(limit.max - limit.min) > 1)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    updateScrollNeeded()
    emblaApi.on('reInit', updateScrollNeeded).on('resize', updateScrollNeeded)

    const viewport = emblaApi.rootNode()
    const resizeObserver = new ResizeObserver(updateScrollNeeded)
    resizeObserver.observe(viewport)

    return () => resizeObserver.disconnect()
  }, [emblaApi, updateScrollNeeded])

  const handleOpenStory = useCallback((story: TravellerStory) => {
    setActiveStory(story)
  }, [])

  const handleClosePlayer = useCallback(() => {
    setActiveStory(null)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const activateVideos = () => setShouldLoadVideos(true)

    const isNearViewport = () => {
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      return rect.top < viewportHeight + 300 && rect.bottom > -300
    }

    if (isNearViewport()) {
      activateVideos()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          activateVideos()
          observer.disconnect()
        }
      },
      { rootMargin: '300px 0px 300px 0px', threshold: 0.01 }
    )

    observer.observe(section)

    const handleScroll = () => {
      if (isNearViewport()) {
        activateVideos()
        observer.disconnect()
        window.removeEventListener('scroll', handleScroll, true)
      }
    }

    window.addEventListener('scroll', handleScroll, true)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll, true)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={clsx(
        'relative z-20 overflow-visible bg-black py-14 pb-0 text-white sm:py-16 lg:py-20',
        className
      )}
    >
      <div className="container">
        <h2 className="text-center text-xl font-bold tracking-wide uppercase sm:text-2xl lg:text-3xl">
          Journeys That{' '}
          <span className="font-serif text-[1.3em] font-normal text-[#FC6200] normal-case italic">Inspired</span> Us
          <span aria-hidden>❤️</span>
        </h2>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <RatingBadge
            logo={
              <div className="h-6 w-14 shrink-0 [&_svg]:size-full">
                <GoogleLogoSvg />
              </div>
            }
            rating="4.6/5"
            reviews="8250 reviews"
          />
          <RatingBadge
            logo={<FacebookLogoSvg className="size-6 shrink-0 text-[#1877F2]" />}
            rating="4.8/5"
            reviews="1440 reviews"
          />
        </div>

        <div className="relative mt-10 pb-14 sm:mt-12 sm:pb-16 lg:pb-20">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="-ms-4 embla__container sm:-ms-6">
              {TRAVELLER_STORIES.map((story) => (
                <div
                  key={story.id}
                  className="embla__slide basis-[72%] ps-4 sm:basis-[40%] sm:ps-6 md:basis-[32%] lg:basis-[26%] xl:basis-1/5"
                >
                  <TravellerStoryCard
                    story={story}
                    shouldLoad={shouldLoadVideos}
                    onOpen={() => handleOpenStory(story)}
                  />
                </div>
              ))}
            </div>
          </div>

          {scrollNeeded ? (
            <>
              <ButtonCircle
                outline
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
                className="absolute start-0 top-[38%] z-10 hidden -translate-x-1/3 border-white/20 bg-white/90 text-black sm:inline-flex"
              >
                <span className="sr-only">Prev</span>
                <ChevronLeftIcon className="size-4 rtl:rotate-180" />
              </ButtonCircle>
              <ButtonCircle
                outline
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                className="absolute end-0 top-[38%] z-10 hidden translate-x-1/3 border-white/20 bg-white/90 text-black sm:inline-flex"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="size-4 rtl:rotate-180" />
              </ButtonCircle>
            </>
          ) : null}
        </div>

        {scrollNeeded ? (
          <div className="mt-6 flex justify-center sm:hidden">
            <NextPrevButtons
              onPrevClick={onPrevButtonClick}
              onNextClick={onNextButtonClick}
              prevBtnDisabled={prevBtnDisabled}
              nextBtnDisabled={nextBtnDisabled}
            />
          </div>
        ) : null}
      </div>

      {activeStory ? (
        <TravellerStoryPlayer story={activeStory} onClose={handleClosePlayer} />
      ) : null}
    </section>
  )
}

export default SectionTravellerStories
