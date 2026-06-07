import { getDestinationBySlug, getDestinationPath } from '@/data/destinations'
import { ITINERARY_DETAILS } from '@/data/itineraries/index'
import { parseItineraryPrice } from '@/data/itineraries/search'

export type PackagesByDurationBucket = {
  value: string
  label: string
  min: number
  max: number
}

export type PackagesByDurationDestination = {
  id: string
  name: string
  handle: string
  thumbnail: string
  href: string
  fromPrice: string
  fromPriceValue: number
  packageCount: number
}

export type PackagesByDurationGroup = {
  bucket: PackagesByDurationBucket
  destinations: PackagesByDurationDestination[]
}

export const PACKAGES_BY_DURATION_BUCKETS: PackagesByDurationBucket[] = [
  { value: '3-5', label: '3-5 Days', min: 3, max: 5 },
  { value: '6-9', label: '6-9 Days', min: 6, max: 9 },
  { value: '10+', label: '10+ Days', min: 10, max: Number.POSITIVE_INFINITY },
]

function matchesDurationDays(days: number, bucket: PackagesByDurationBucket) {
  return days >= bucket.min && days <= bucket.max
}

function getDestinationsForBucket(bucket: PackagesByDurationBucket): PackagesByDurationDestination[] {
  const destinationMap = new Map<string, { prices: number[]; count: number }>()

  for (const itinerary of ITINERARY_DETAILS) {
    if (!matchesDurationDays(itinerary.duration.days, bucket)) {
      continue
    }

    const existing = destinationMap.get(itinerary.destination) ?? { prices: [], count: 0 }
    existing.prices.push(parseItineraryPrice(itinerary.pricing.price))
    existing.count += 1
    destinationMap.set(itinerary.destination, existing)
  }

  return [...destinationMap.entries()]
    .map(([slug, { prices, count }]) => {
      const destination = getDestinationBySlug(slug)
      if (!destination) return null

      const minPrice = Math.min(...prices)
      const matchingItinerary = ITINERARY_DETAILS.find(
        (itinerary) =>
          itinerary.destination === slug &&
          matchesDurationDays(itinerary.duration.days, bucket) &&
          parseItineraryPrice(itinerary.pricing.price) === minPrice
      )

      return {
        id: `packages-by-duration://${bucket.value}/${slug}`,
        name: destination.name,
        handle: destination.slug,
        thumbnail: destination.thumbnail,
        href: getDestinationPath(destination.slug),
        fromPrice: matchingItinerary?.pricing.price ?? `$${minPrice.toLocaleString()}`,
        fromPriceValue: minPrice,
        packageCount: count,
      }
    })
    .filter((destination): destination is PackagesByDurationDestination => destination !== null)
    .sort((a, b) => a.name.localeCompare(b.name))
}

export async function getPackagesByDurationGroups(): Promise<PackagesByDurationGroup[]> {
  return PACKAGES_BY_DURATION_BUCKETS.map((bucket) => ({
    bucket,
    destinations: getDestinationsForBucket(bucket),
  }))
}
