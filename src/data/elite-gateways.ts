import { DESTINATIONS, getDestinationBySlug, getDestinationPath, getTourTypePath } from '@/data/destinations'
import { getItineraryDetails } from '@/data/itineraries/index'
import { resolveItineraryDestinationSlug } from '@/data/itineraries/destinations'
import type { ItineraryDetail } from '@/data/itineraries/types'

export type EliteGatewayDestinationCard = {
  id: string
  name: string
  handle: string
  thumbnail: string
  href: string
  description: string
  count: number
}

export type EliteGatewayGroup = {
  title: string
  handle: string
  icon: string
  categorySlug: string | null
  categories: EliteGatewayDestinationCard[]
}

const ELITE_GATEWAY_FILTERS = [
  {
    title: 'Popular',
    handle: 'popular',
    icon: 'EarthIcon',
    categorySlug: null,
  },
  {
    title: 'Beach',
    handle: 'beach',
    icon: 'Beach02Icon',
    categorySlug: 'beach-holidays',
  },
  {
    title: 'Mountains',
    handle: 'mountains',
    icon: 'MountainIcon',
    categorySlug: 'mountain-and-hill-station-tours',
  },
  {
    title: 'Honeymoon',
    handle: 'honeymoon',
    icon: 'Beach02FreeIcons',
    categorySlug: 'honeymoon-packages',
  },
  {
    title: 'Luxury',
    handle: 'luxury',
    icon: 'StarCircleIcon',
    categorySlug: 'luxury-escapes',
  },
] as const

function getItinerarySlug(itinerary: ItineraryDetail) {
  return resolveItineraryDestinationSlug(itinerary.destination)
}

function getAllDestinations(itineraries: ItineraryDetail[]): EliteGatewayDestinationCard[] {
  return DESTINATIONS.map((destination) => ({
    id: `destination://${destination.slug}`,
    name: destination.name,
    handle: destination.slug,
    thumbnail: destination.thumbnail,
    href: getDestinationPath(destination.slug),
    description: destination.description,
    count: itineraries.filter((itinerary) => getItinerarySlug(itinerary) === destination.slug).length,
  }))
}

function getDestinationsForTourCategory(
  categorySlug: string,
  itineraries: ItineraryDetail[]
): EliteGatewayDestinationCard[] {
  const destinationSlugs = new Set<string>()

  for (const itinerary of itineraries) {
    const slug = getItinerarySlug(itinerary)
    const matchesCategory = itinerary.categories.some((tag) => tag.category === categorySlug)
    if (slug && matchesCategory) {
      destinationSlugs.add(slug)
    }
  }

  return [...destinationSlugs]
    .map((slug) => getDestinationBySlug(slug))
    .filter((destination): destination is NonNullable<typeof destination> => destination !== undefined)
    .map((destination) => ({
      id: `destination://${destination.slug}`,
      name: destination.name,
      handle: destination.slug,
      thumbnail: destination.thumbnail,
      href: getTourTypePath(destination.slug, categorySlug),
      description: destination.description,
      count: itineraries.filter(
        (itinerary) =>
          getItinerarySlug(itinerary) === destination.slug &&
          itinerary.categories.some((tag) => tag.category === categorySlug)
      ).length,
    }))
}

export async function getEliteGatewayGroups(): Promise<EliteGatewayGroup[]> {
  const itineraries = await getItineraryDetails()

  return ELITE_GATEWAY_FILTERS.map((filter) => ({
    title: filter.title,
    handle: filter.handle,
    icon: filter.icon,
    categorySlug: filter.categorySlug,
    categories:
      filter.categorySlug === null
        ? getAllDestinations(itineraries)
        : getDestinationsForTourCategory(filter.categorySlug, itineraries),
  }))
}
