'use client'

import { ChevronDownIcon } from '@heroicons/react/24/outline'

export function DestinationHeroScrollArrow() {
  const handleScroll = () => {
    document.getElementById('destination-content')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={handleScroll}
      aria-label="Scroll down to explore"
      className="flex shrink-0 items-center justify-center text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)] transition-colors hover:text-white/90"
    >
      <ChevronDownIcon className="size-8 animate-bounce sm:size-7" aria-hidden="true" strokeWidth={2} />
    </button>
  )
}
