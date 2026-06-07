'use client'

import { DESTINATIONS } from '@/data/destinations'
import { SpeakerWaveIcon, SpeakerXMarkIcon, XMarkIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

type Story = {
  src: string
  name: string
  avatar: string
}

const STORIES: Story[] = [
  {
    src: '/videos/header/reel-player/story.mp4',
    name: 'THAILAND',
    avatar: DESTINATIONS.find((d) => d.slug === 'thailand')!.thumbnail,
  },
  {
    src: '/videos/header/reel-player/story-1.mp4',
    name: 'BALI',
    avatar: DESTINATIONS.find((d) => d.slug === 'bali')!.thumbnail,
  },
  {
    src: '/videos/header/reel-player/story-2.mp4',
    name: 'VIETNAM',
    avatar: DESTINATIONS.find((d) => d.slug === 'vietnam')!.thumbnail,
  },
]

const StickyFloatingReelPlayer = () => {
  const playerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)

  const currentStory = STORIES[currentIndex]

  const goToNextStory = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % STORIES.length)
    setProgress(0)
  }, [])

  const handleContainerClick = () => {
    if (!isExpanded) {
      setIsExpanded(true)
      return
    }
    goToNextStory()
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isExpanded) {
      setIsExpanded(false)
      return
    }
    setIsVisible(false)
  }

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMuted((prev) => !prev)
  }

  useEffect(() => {
    if (!isExpanded) return

    const handlePointerDown = (event: PointerEvent) => {
      if (playerRef.current?.contains(event.target as Node)) return
      setIsExpanded(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isExpanded])

  useEffect(() => {
    if (!isExpanded) return

    const isMobile = window.matchMedia('(max-width: 639px)').matches
    if (!isMobile) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isExpanded])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.load()
    video.play().catch(() => {})
  }, [currentIndex])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = isMuted
  }, [isMuted])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      if (!video.duration) return
      setProgress(video.currentTime / video.duration)
    }

    const handleEnded = () => {
      if (isExpanded) {
        goToNextStory()
      } else {
        video.currentTime = 0
        video.play().catch(() => {})
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [currentIndex, isExpanded, goToNextStory])

  const getSegmentProgress = (index: number) => {
    if (index < currentIndex) return 1
    if (index > currentIndex) return 0
    return progress
  }

  if (!isVisible) return null

  return (
    <div
      ref={playerRef}
      className={clsx(
        'fixed z-50 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out',
        isExpanded && 'max-sm:z-[60]',
        isExpanded
          ? 'inset-0 h-dvh w-screen rounded-none sm:inset-auto sm:bottom-8 sm:end-4 sm:h-auto sm:w-auto'
          : 'bottom-24 end-4 size-20 rounded-full sm:bottom-8 sm:size-auto sm:rounded-none'
      )}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={handleContainerClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleContainerClick()
          }
        }}
        className={clsx(
          'relative size-full overflow-hidden bg-black shadow-2xl ring-1 ring-white/10',
          'transition-[height,width,border-radius] duration-300 ease-in-out',
          isExpanded
            ? 'rounded-none sm:rounded-2xl sm:h-[550px] sm:w-[309.375px]'
            : 'rounded-full sm:rounded-2xl sm:h-[250px] sm:w-[140.625px]'
        )}
      >
        <video
          ref={videoRef}
          src={currentStory.src}
          className="size-full object-cover"
          playsInline
          muted={isMuted}
          autoPlay
          loop={!isExpanded}
        />

        <div
          className={clsx(
            'absolute inset-x-2 z-10 flex gap-1 transition-opacity duration-300 ease-in-out',
            'top-2 max-sm:top-[max(0.5rem,env(safe-area-inset-top))]',
            isExpanded ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
        >
          {STORIES.map((story, index) => (
            <div
              key={story.src}
              className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/35"
            >
              <div
                className="h-full rounded-full bg-white transition-[width] duration-100 ease-linear"
                style={{ width: `${getSegmentProgress(index) * 100}%` }}
              />
            </div>
          ))}
        </div>

        <div
          className={clsx(
            'absolute inset-x-3 z-10 flex items-center gap-2 pe-10 transition-opacity duration-300 ease-in-out',
            'top-5 max-sm:top-[calc(max(0.5rem,env(safe-area-inset-top))+1.25rem)]',
            isExpanded ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
        >
          <div className="relative size-7 shrink-0 overflow-hidden rounded-full ring-2 ring-white/80">
            <Image
              src={currentStory.avatar}
              alt={currentStory.name}
              fill
              className="object-cover"
              sizes="28px"
            />
          </div>
          <span className="truncate text-xs font-bold tracking-wide text-white uppercase">
            {currentStory.name}
          </span>
        </div>

        <button
          type="button"
          onClick={handleMuteToggle}
          className={clsx(
            'absolute end-2 top-11 z-20 flex size-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-[opacity,background-color] duration-300 ease-in-out hover:bg-black/55',
            isExpanded ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          tabIndex={isExpanded ? 0 : -1}
        >
          {isMuted ? (
            <SpeakerXMarkIcon className="size-4" />
          ) : (
            <SpeakerWaveIcon className="size-4" />
          )}
        </button>

        <button
          type="button"
          onClick={handleClose}
          className={clsx(
            'absolute end-2 z-20 flex size-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/55',
            'top-2 max-sm:top-[max(0.5rem,env(safe-area-inset-top))]'
          )}
          aria-label={isExpanded ? 'Collapse player' : 'Close player'}
        >
          <XMarkIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}

export default StickyFloatingReelPlayer
