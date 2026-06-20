import clsx from 'clsx'

export type MinimalSegment = 'first' | 'middle' | 'last'

export const minimalSegmentClass = (segment?: MinimalSegment) =>
  clsx('hero-search-minimal-segment h-full self-stretch', segment && `hero-search-minimal-segment--${segment}`)

export const minimalTriggerClass = (isActive: boolean) =>
  clsx('hero-search-minimal-trigger', isActive && 'hero-search-minimal-trigger--active')
