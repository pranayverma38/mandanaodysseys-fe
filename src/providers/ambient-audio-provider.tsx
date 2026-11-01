'use client'

import { MusicalNoteIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

const AMBIENT_AUDIO_SRC = '/audio/Raags Of India.mp3'
const AMBIENT_AUDIO_VOLUME = 0.45

interface AmbientAudioContextValue {
  hasEverPlayed: boolean
  isPlaying: boolean
  pause: () => void
  play: () => Promise<void>
  requestAutoplay: () => void
  toggle: () => Promise<void>
}

const AmbientAudioContext = createContext<AmbientAudioContextValue | null>(null)

export function AmbientAudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const userPausedRef = useRef(false)
  const [autoplayRequested, setAutoplayRequested] = useState(false)
  const [hasEverPlayed, setHasEverPlayed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const syncPlaybackState = useCallback(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    const playing = !audio.paused
    setIsPlaying(playing)

    if (playing) {
      setHasEverPlayed(true)
    }
  }, [])

  const tryPlay = useCallback(async () => {
    const audio = audioRef.current

    if (!audio || userPausedRef.current) {
      return
    }

    try {
      await audio.play()
      syncPlaybackState()
    } catch {
      setIsPlaying(false)
    }
  }, [syncPlaybackState])

  const play = useCallback(async () => {
    userPausedRef.current = false
    setAutoplayRequested(true)
    await tryPlay()
  }, [tryPlay])

  const pause = useCallback(() => {
    const audio = audioRef.current

    userPausedRef.current = true
    audio?.pause()
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(async () => {
    const audio = audioRef.current

    if (audio && !audio.paused) {
      pause()
      return
    }

    await play()
  }, [pause, play])

  const requestAutoplay = useCallback(() => {
    setAutoplayRequested(true)
    void tryPlay()
  }, [tryPlay])

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    audio.loop = true
    audio.volume = AMBIENT_AUDIO_VOLUME

    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('play', syncPlaybackState)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handlePause)

    return () => {
      audio.removeEventListener('play', syncPlaybackState)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handlePause)
      audio.pause()
    }
  }, [syncPlaybackState])

  useEffect(() => {
    if (!autoplayRequested || isPlaying || userPausedRef.current) {
      return
    }

    const unlockOnGesture = () => {
      void tryPlay()
    }

    window.addEventListener('pointerdown', unlockOnGesture)
    window.addEventListener('keydown', unlockOnGesture)

    void tryPlay()

    return () => {
      window.removeEventListener('pointerdown', unlockOnGesture)
      window.removeEventListener('keydown', unlockOnGesture)
    }
  }, [autoplayRequested, isPlaying, tryPlay])

  const value = useMemo(
    () => ({
      hasEverPlayed,
      isPlaying,
      pause,
      play,
      requestAutoplay,
      toggle,
    }),
    [hasEverPlayed, isPlaying, pause, play, requestAutoplay, toggle]
  )

  return (
    <AmbientAudioContext.Provider value={value}>
      {children}
      <audio ref={audioRef} loop playsInline preload="auto" className="hidden" aria-hidden>
        <source src={encodeURI(AMBIENT_AUDIO_SRC)} type="audio/mpeg" />
      </audio>
      <AmbientAudioFloatingControl />
    </AmbientAudioContext.Provider>
  )
}

function AmbientAudioFloatingControl() {
  const pathname = usePathname()
  const { hasEverPlayed, isPlaying, toggle } = useAmbientAudio()

  if (pathname === '/' || !hasEverPlayed) {
    return null
  }

  return (
    <div className="pointer-events-none fixed right-4 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-[60] sm:bottom-5">
      <button
        type="button"
        onClick={() => void toggle()}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Pause ambient music' : 'Resume ambient music'}
        title={isPlaying ? 'Pause music' : 'Resume music'}
        className={clsx(
          'pointer-events-auto group flex items-center gap-2 overflow-hidden rounded-full border px-2 py-1.5 text-white shadow-2xl backdrop-blur-xl transition-all duration-300',
          'border-white/15 bg-neutral-950/70 ring-1 ring-black/10 hover:-translate-y-0.5 hover:bg-neutral-950/80',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'
        )}
      >
        <span
          className={clsx(
            'relative flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors',
            isPlaying ? 'border-white/20 bg-white/12' : 'border-white/12 bg-white/8'
          )}
        >
          {isPlaying ? (
            <>
              <span
                aria-hidden
                className="animate-hero-music-ring absolute -inset-2 rounded-full border border-white/20"
              />
              <span
                aria-hidden
                className="animate-hero-music-ring-delay absolute -inset-3.5 rounded-full border border-white/10"
              />
            </>
          ) : null}

          <MusicalNoteIcon className="relative size-4" />
        </span>

        <span
          className={clsx(
            'relative hidden min-w-0 overflow-hidden text-left transition-[width] duration-300 ease-out sm:block',
            isPlaying ? 'w-[3.4rem]' : 'w-[4rem]'
          )}
        >
          <span className="relative block h-5">
            <span
              className={clsx(
                'absolute inset-0 text-[13px] font-medium text-white/90 transition-all duration-300 ease-out',
                isPlaying ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
              )}
            >
              Music
            </span>
            <span
              className={clsx(
                'absolute inset-0 text-[13px] font-medium text-white/90 transition-all duration-300 ease-out',
                isPlaying ? 'translate-y-1 opacity-0' : 'translate-y-0 opacity-100'
              )}
            >
              Resume
            </span>
          </span>
        </span>

        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/90 transition-colors group-hover:bg-white/15">
          {isPlaying ? <PauseIcon className="size-3.5" /> : <PlayIcon className="ms-0.5 size-3.5" />}
        </span>
      </button>
    </div>
  )
}

export function useAmbientAudio() {
  const context = useContext(AmbientAudioContext)

  if (!context) {
    throw new Error('useAmbientAudio must be used within AmbientAudioProvider')
  }

  return context
}
