import { getItineraries } from '@/data/itineraries'
import { ITINERARY_DESTINATIONS, resolveItineraryDestinationSlug } from '@/data/itineraries/destinations'

export async function getDestinationPackageCounts(): Promise<Record<string, number>> {
  const itineraries = await getItineraries()
  const counts = Object.fromEntries(ITINERARY_DESTINATIONS.map((destination) => [destination.slug, 0])) as Record<
    string,
    number
  >

  for (const itinerary of itineraries) {
    const slug = resolveItineraryDestinationSlug(itinerary.destination)

    if (!slug || !(slug in counts)) {
      continue
    }

    counts[slug] += 1
  }

  return counts
}
