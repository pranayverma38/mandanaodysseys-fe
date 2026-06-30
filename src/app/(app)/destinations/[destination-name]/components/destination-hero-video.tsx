'use client'

interface DestinationHeroVideoProps {
  src: string
  poster: string
}

export function DestinationHeroVideo({ src, poster }: DestinationHeroVideoProps) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden
      className="absolute inset-0 size-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
