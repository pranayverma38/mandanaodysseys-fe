import type { ItineraryDetail } from './types'
import { getItineraryDestinationName } from './destinations'
import { buildItineraryListingAmenities } from './details/_shared'
import { filterItineraryListings } from './search'
import { australiaGreatBarrierReefFamily } from './details/australia-great-barrier-reef-family'
import { australiaSydneyMelbourneLuxury } from './details/australia-sydney-melbourne-luxury'
import { baliFamilyCultureAdventure } from './details/bali-family-culture-adventure'
import { baliHoneymoonRetreat } from './details/bali-honeymoon-retreat'
import { goldenTriangleIndiaTour } from './details/golden-triangle-india-tour'
import { goaPackage } from './details/goa-package'
import { mumbaiPackage } from './details/mumbai-package'
import { nepalEverestBaseCampTrek } from './details/nepal-everest-base-camp-trek'
import { nepalKathmanduPokharaWeekend } from './details/nepal-kathmandu-pokhara-weekend'
import { thailandBangkokChiangMaiCultural } from './details/thailand-bangkok-chiang-mai-cultural'
import { thailandPhuketSoloBeachEscape } from './details/thailand-phuket-solo-beach-escape'
import { swissAlpsLakeGenevaEscape } from './details/swiss-alps-lake-geneva-escape'

/**
 * Register every itinerary detail file here.
 * To add a new page:
 * 1. Create `src/data/itineraries/details/your-handle.ts`
 * 2. Import and add it to ITINERARY_DETAILS below
 * 3. Assign a destination from `ITINERARY_DESTINATIONS` (see `DESTINATIONS` in destinations.ts)
 * 4. Assign 2–3 categories from `ITINERARY_CATEGORIES` (see `TOUR_TYPES` in destinations.ts)
 * 5. Set `duration` with `createItineraryDuration(days, nights)` from duration.ts
 * 6. Set `mobility` to one of: Easy, Light Activity, Moderate, Active
 * 7. Add `lat` and `lng` to each `thingsToDo` entry for the route map
 * 8. Visit `/itinerary/your-handle`
 */
export const ITINERARY_DETAILS: ItineraryDetail[] = [
  goldenTriangleIndiaTour,
  goaPackage,
  mumbaiPackage,
  nepalEverestBaseCampTrek,
  nepalKathmanduPokharaWeekend,
  baliHoneymoonRetreat,
  baliFamilyCultureAdventure,
  australiaGreatBarrierReefFamily,
  australiaSydneyMelbourneLuxury,
  thailandBangkokChiangMaiCultural,
  thailandPhuketSoloBeachEscape,
  swissAlpsLakeGenevaEscape,
]

export async function getItineraries() {
  return ITINERARY_DETAILS.map(
    ({
      id,
      handle,
      title,
      badge,
      featuredImage,
      destination,
      address,
      map,
      locations,
      reviewStart,
      reviewCount,
      pricing,
      amenities,
      categories,
      duration,
    }) => ({
      id,
      handle,
      title,
      badge,
      featuredImage,
      like: false,
      destination,
      destinationName: getItineraryDestinationName(destination),
      address,
      map,
      locations,
      reviewStart,
      reviewCount,
      price: pricing.price,
      amenities: buildItineraryListingAmenities(duration, amenities),
      categories,
      duration,
      listingType: 'itinerary' as const,
    })
  )
}

export async function getItineraryByHandle(handle: string) {
  const itinerary =
    ITINERARY_DETAILS.find((item) => item.handle === handle) ??
    ITINERARY_DETAILS.find((item) => item.handle === 'golden-triangle-india-tour')

  return itinerary ?? null
}

export async function getItineraryListingsByFilters(options?: {
  destination?: string
  category?: string
}) {
  const listings = await getItineraries()

  return filterItineraryListings(listings, {
    destinations: options?.destination ? [options.destination] : [],
    categories: options?.category ? [options.category] : [],
    durationBuckets: [],
  })
}

export async function getItinerariesByDestination(destinationSlug: string) {
  return ITINERARY_DETAILS.filter((item) => item.destination === destinationSlug)
}

export async function getItinerariesByCategory(categorySlug: string) {
  return ITINERARY_DETAILS.filter((item) => item.categories.some((tag) => tag.category === categorySlug))
}

export async function getItinerariesByDurationRange(options?: { minDays?: number; maxDays?: number }) {
  const { minDays, maxDays } = options ?? {}

  return ITINERARY_DETAILS.filter((item) => {
    if (minDays !== undefined && item.duration.days < minDays) {
      return false
    }

    if (maxDays !== undefined && item.duration.days > maxDays) {
      return false
    }

    return true
  })
}

/** @deprecated Sub-categories were removed — pass the tour-type slug as `categorySlug` instead. */
export async function getItinerariesBySubCategory(_categorySlug: string, subCategorySlug: string) {
  return getItinerariesByCategory(subCategorySlug)
}

export async function getItineraryReviews(handle: string) {
  const itinerary = await getItineraryByHandle(handle)
  return itinerary?.reviews ?? []
}

export type TItineraryListing = Awaited<ReturnType<typeof getItineraries>>[number]
export type TItinerary = ItineraryDetail

export * from './types'
export * from './categories'
export * from './destinations'
export * from './duration'
export * from './mobility'
export * from './search'
