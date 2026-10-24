import { DESTINATIONS, getDestinationBySlug } from '@/data/destinations'

export type ItineraryDestination = {
  slug: string
  name: string
  country: string
  continent: string
}

/** Canonical itinerary destinations — synced with `DESTINATIONS` in destinations.ts */
export const ITINERARY_DESTINATIONS: ItineraryDestination[] = DESTINATIONS.map(
  ({ slug, name, country, continent }) => ({
    slug,
    name,
    country,
    continent,
  })
)

export function getItineraryDestinationName(destinationSlug: string) {
  return getDestinationBySlug(destinationSlug)?.name ?? destinationSlug
}

export function isItineraryDestinationSlug(slug: string) {
  return ITINERARY_DESTINATIONS.some((destination) => destination.slug === slug)
}

/** Map a Medusa destination value such as "Nepal" or "sri lanka" onto a known slug. */
export function resolveItineraryDestinationSlug(value: string): string | null {
  const normalized = value.trim().toLowerCase().replace(/\s+/g, '-')

  if (!normalized) {
    return null
  }

  const match = DESTINATIONS.find(
    (destination) =>
      destination.slug === normalized || destination.name.toLowerCase().replace(/\s+/g, '-') === normalized
  )

  return match?.slug ?? null
}
