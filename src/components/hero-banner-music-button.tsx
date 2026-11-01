'use client'

import { MusicalNoteIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'

const HERO_AUDIO_SRC = '/audio/Raags Of India.mp3'
const HERO_AUDIO_VOLUME = 0.45

const HeroBannerMusicButton = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const userPausedRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const playAudio = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || userPausedRef.current) {
      return
    }

    try {
      await audio.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    audio.loop = true
    audio.volume = HERO_AUDIO_VOLUME

    const syncPlaying = () => setIsPlaying(!audio.paused)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('play', syncPlaying)
    audio.addEventListener('pause', syncPlaying)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('canplaythrough', playAudio)

    void playAudio()

    const unlockOnGesture = (event: Event) => {
      const target = event.target
      if (target instanceof Node && buttonRef.current?.contains(target)) {
        return
      }

      void playAudio()
    }

    window.addEventListener('pointerdown', unlockOnGesture)
    window.addEventListener('keydown', unlockOnGesture)

    return () => {
      audio.removeEventListener('play', syncPlaying)
      audio.removeEventListener('pause', syncPlaying)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('canplaythrough', playAudio)
      window.removeEventListener('pointerdown', unlockOnGesture)
      window.removeEventListener('keydown', unlockOnGesture)
      audio.pause()
    }
  }, [playAudio])

  const handleToggle = () => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    if (!audio.paused) {
      userPausedRef.current = true
      audio.pause()
      setIsPlaying(false)
      return
    }

    userPausedRef.current = false
    void playAudio()
  }

  return (
    <div className="pointer-events-auto absolute bottom-[max(10%,5.75rem)] left-1/2 z-20 -translate-x-1/2">
      <audio ref={audioRef} autoPlay loop playsInline preload="auto">
        <source src={encodeURI(HERO_AUDIO_SRC)} type="audio/mpeg" />
      </audio>

      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
        className={clsx(
          'relative flex size-9 cursor-pointer items-center justify-center overflow-visible rounded-full border text-white shadow-md-for-card backdrop-blur-md transition',
          'border-white/30 bg-white/15 hover:bg-white/25',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          !isPlaying && 'opacity-80'
        )}
      >
        {isPlaying ? (
          <>
            <span
              aria-hidden
              className="animate-hero-music-ring absolute -inset-4 rounded-full border border-white/35"
            />
            <span
              aria-hidden
              className="animate-hero-music-ring-delay absolute -inset-7 rounded-full border border-white/20"
            />
          </>
        ) : null}

        <MusicalNoteIcon className="relative size-4.5" />
        <span className="sr-only">{isPlaying ? 'Music is playing' : 'Music is paused'}</span>
      </button>
    </div>
  )
}

export default HeroBannerMusicButton
