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
