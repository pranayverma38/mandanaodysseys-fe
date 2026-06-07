import { TOUR_TYPES, getTourTypeBySlug } from '@/data/destinations'
import type { ItineraryCategoryRef } from './types'

export type ItineraryCategory = {
  slug: string
  name: string
  description: string
}

/** Canonical itinerary categories — synced with `TOUR_TYPES` in destinations.ts */
export const ITINERARY_CATEGORIES: ItineraryCategory[] = TOUR_TYPES.map(({ slug, name, description }) => ({
  slug,
  name,
  description,
}))

export function getItineraryCategoryName(categorySlug: string) {
  return getTourTypeBySlug(categorySlug)?.name ?? categorySlug
}

/** Resolve a category slug to its display label for badges. */
export function getItineraryCategoryLabel(ref: ItineraryCategoryRef) {
  return getItineraryCategoryName(ref.category)
}

export function getItineraryCategoryLabels(refs: ItineraryCategoryRef[]) {
  return refs.map(getItineraryCategoryLabel)
}

export function isItineraryCategorySlug(slug: string) {
  return ITINERARY_CATEGORIES.some((category) => category.slug === slug)
}
