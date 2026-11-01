'use client'

import { MusicalNoteIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useAmbientAudio } from '@/providers/ambient-audio-provider'

const HeroBannerMusicButton = () => {
  const { isPlaying, requestAutoplay, toggle } = useAmbientAudio()

  useEffect(() => {
    requestAutoplay()
  }, [requestAutoplay])

  return (
    <div className="pointer-events-auto absolute bottom-[max(10%,5.75rem)] left-1/2 z-20 -translate-x-1/2">
      <button
        type="button"
        onClick={() => void toggle()}
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
