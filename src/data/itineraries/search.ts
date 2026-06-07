import { DESTINATIONS, TOUR_TYPES } from '@/data/destinations'
import type { TItineraryListing } from './index'

export type ItineraryDurationBucket = {
  value: string
  label: string
  min: number
  max: number
}

export const ITINERARY_DURATION_BUCKETS: ItineraryDurationBucket[] = [
  { value: '1-3', label: '1–3 days', min: 1, max: 3 },
  { value: '4-6', label: '4–6 days', min: 4, max: 6 },
  { value: '7-9', label: '7–9 days', min: 7, max: 9 },
  { value: '10+', label: '10+ days', min: 10, max: Number.POSITIVE_INFINITY },
]

export type ItinerarySearchFilters = {
  destinations: string[]
  categories: string[]
  durationBuckets: string[]
  priceMin?: number
  priceMax?: number
  location?: string
}

export type ItinerarySearchFilterOption =
  | {
      label: string
      name: string
      tabUIType: 'checkbox'
      options: {
        name: string
        value: string
        description?: string
        defaultChecked?: boolean
      }[]
    }
  | {
      label: string
      name: string
      tabUIType: 'price-range'
      min: number
      max: number
    }

export function parseItineraryPrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, '')) || 0
}

export function resolveLocationToDestinationSlug(location: string): string | null {
  const normalized = location.trim().toLowerCase()
  if (!normalized) {
    return null
  }

  const match = DESTINATIONS.find(
    (destination) =>
      destination.slug === normalized ||
      destination.name.toLowerCase() === normalized ||
      normalized.includes(destination.name.toLowerCase()) ||
      destination.name.toLowerCase().includes(normalized)
  )

  return match?.slug ?? null
}

export function buildItinerarySearchFilterOptions(
  listings: TItineraryListing[]
): ItinerarySearchFilterOption[] {
  const prices = listings.map((listing) => parseItineraryPrice(listing.price))
  const minPrice = prices.length ? Math.floor(Math.min(...prices) / 50) * 50 : 0
  const maxPrice = prices.length ? Math.ceil(Math.max(...prices) / 50) * 50 : 4000

  return [
    {
      label: 'Destination',
      name: 'destination',
      tabUIType: 'checkbox',
      options: DESTINATIONS.map((destination) => ({
        name: destination.name,
        value: destination.slug,
        description: destination.description,
      })),
    },
    {
      label: 'Experience type',
      name: 'category',
      tabUIType: 'checkbox',
      options: TOUR_TYPES.map((tourType) => ({
        name: tourType.name,
        value: tourType.slug,
        description: tourType.description,
      })),
    },
    {
      label: 'Duration',
      name: 'duration',
      tabUIType: 'checkbox',
      options: ITINERARY_DURATION_BUCKETS.map((bucket) => ({
        name: bucket.label,
        value: bucket.value,
        description: `Packages lasting ${bucket.label.toLowerCase()}.`,
      })),
    },
    {
      label: 'Price range',
      name: 'priceRange',
      tabUIType: 'price-range',
      min: minPrice,
      max: maxPrice,
    },
  ]
}

function readParamValues(
  params: URLSearchParams | Record<string, string | string[] | undefined>,
  key: string
): string[] {
  if (params instanceof URLSearchParams) {
    return params.getAll(key).filter(Boolean)
  }

  const value = params[key]
  if (!value) {
    return []
  }

  return Array.isArray(value) ? value.filter(Boolean) : [value]
}

export function parseItinerarySearchParams(
  params: URLSearchParams | Record<string, string | string[] | undefined>
): ItinerarySearchFilters {
  const get = (key: string) => {
    if (params instanceof URLSearchParams) {
      return params.get(key) ?? undefined
    }
    const value = params[key]
    return Array.isArray(value) ? value[0] : value
  }

  const destinations = readParamValues(params, 'destination')
  const location = get('location')

  if (!destinations.length && location) {
    const resolved = resolveLocationToDestinationSlug(location)
    if (resolved) {
      destinations.push(resolved)
    }
  }

  const priceMinRaw = get('price_min')
  const priceMaxRaw = get('price_max')

  return {
    destinations,
    categories: readParamValues(params, 'category'),
    durationBuckets: readParamValues(params, 'duration'),
    priceMin: priceMinRaw ? Number(priceMinRaw) : undefined,
    priceMax: priceMaxRaw ? Number(priceMaxRaw) : undefined,
    location: destinations.length ? undefined : location,
  }
}

function matchesDurationBucket(days: number, bucketValue: string): boolean {
  const bucket = ITINERARY_DURATION_BUCKETS.find((item) => item.value === bucketValue)
  if (!bucket) {
    return false
  }

  return days >= bucket.min && days <= bucket.max
}

export function filterItineraryListings(
  listings: TItineraryListing[],
  filters: ItinerarySearchFilters
): TItineraryListing[] {
  return listings.filter((listing) => {
    if (filters.destinations.length && !filters.destinations.includes(listing.destination)) {
      return false
    }

    if (
      filters.categories.length &&
      !listing.categories.some((category) => filters.categories.includes(category.category))
    ) {
      return false
    }

    if (
      filters.durationBuckets.length &&
      !filters.durationBuckets.some((bucket) => matchesDurationBucket(listing.duration.days, bucket))
    ) {
      return false
    }

    const price = parseItineraryPrice(listing.price)

    if (filters.priceMin !== undefined && price < filters.priceMin) {
      return false
    }

    if (filters.priceMax !== undefined && price > filters.priceMax) {
      return false
    }

    if (filters.location) {
      const query = filters.location.toLowerCase()
      const haystack = [
        listing.title,
        listing.address,
        listing.destinationName,
        listing.destination,
      ]
        .join(' ')
        .toLowerCase()

      if (!haystack.includes(query)) {
        return false
      }
    }

    return true
  })
}

export function countActiveItineraryFilters(
  params: URLSearchParams | Record<string, string | string[] | undefined>
): number {
  const filters = parseItinerarySearchParams(params)
  let count = filters.destinations.length + filters.categories.length + filters.durationBuckets.length

  if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
    count += 1
  }

  if (filters.location) {
    count += 1
  }

  return count
}

export function buildExperienceSearchUrl(options?: {
  destination?: string
  location?: string
}): string {
  const params = new URLSearchParams()

  if (options?.destination) {
    params.append('destination', options.destination)
  } else if (options?.location) {
    const resolved = resolveLocationToDestinationSlug(options.location)
    if (resolved) {
      params.append('destination', resolved)
    } else {
      params.append('location', options.location)
    }
  }

  const query = params.toString()
  return query ? `/experience-search?${query}` : '/experience-search'
}
