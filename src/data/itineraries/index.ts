import type { ItineraryDetail } from './types'
import { getItineraryDestinationName, resolveItineraryDestinationSlug } from './destinations'
import { buildItineraryListingAmenities } from './details/_shared'
import { filterItineraryListings } from './search'
import { fetchItinerariesFromMedusa, fetchItineraryByHandleFromMedusa } from '@/lib/medusa-itineraries'
import { australiaGreatBarrierReefFamily } from './details/australia-great-barrier-reef-family'
import { australiaSydneyMelbourneLuxury } from './details/australia-sydney-melbourne-luxury'
import { baliFamilyCultureAdventure } from './details/bali-family-culture-adventure'
import { baliHoneymoonRetreat } from './details/bali-honeymoon-retreat'
import { coloursPalacesAndTheTaj } from './details/colours-palaces-and-the-taj'
import { desertDunesToRoyalPalaces } from './details/desert-dunes-to-royal-palaces'
import { goldenTriangleIndiaTour } from './details/golden-triangle-india-tour'
import { goldenTriangleAndShekhawati } from './details/golden-triangle-and-shekhawati'
import { goaPackage } from './details/goa-package'
import { heritageAndTheGanges } from './details/heritage-and-the-ganges'
import { holiInThePinkCity } from './details/holi-in-the-pink-city'
import { majesticRajasthan } from './details/majestic-rajasthan'
import { mumbaiPackage } from './details/mumbai-package'
import { nepalEverestBaseCampTrek } from './details/nepal-everest-base-camp-trek'
import { nepalKathmanduPokharaWeekend } from './details/nepal-kathmandu-pokhara-weekend'
import { thailandBangkokChiangMaiCultural } from './details/thailand-bangkok-chiang-mai-cultural'
import { thailandPhuketSoloBeachEscape } from './details/thailand-phuket-solo-beach-escape'
import { swissAlpsLakeGenevaEscape } from './details/swiss-alps-lake-geneva-escape'

function isEnabledItineraryDestination(destination: string): boolean {
  return resolveItineraryDestinationSlug(destination) !== null
}

/** Static fallback catalog. Disabled-destination itineraries stay here but are hidden from the public frontend. */
export const ALL_ITINERARY_DETAILS: ItineraryDetail[] = [
  goldenTriangleIndiaTour,
  coloursPalacesAndTheTaj,
  desertDunesToRoyalPalaces,
  goldenTriangleAndShekhawati,
  goaPackage,
  heritageAndTheGanges,
  holiInThePinkCity,
  majesticRajasthan,
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

/** Public itinerary catalog — only itineraries whose destination is currently enabled. */
export const ITINERARY_DETAILS: ItineraryDetail[] = ALL_ITINERARY_DETAILS.filter((item) =>
  isEnabledItineraryDestination(item.destination)
)

/** Fetch itineraries from Medusa; fall back to static data if API is unavailable */
async function resolveItineraries(): Promise<ItineraryDetail[]> {
  const apiItineraries = await fetchItinerariesFromMedusa()
  return apiItineraries?.filter((item) => isEnabledItineraryDestination(item.destination)) ?? ITINERARY_DETAILS
}

export async function getItineraries() {
  const itineraries = await resolveItineraries()
  return itineraries.map(
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
  // Try Medusa API first
  const apiItinerary = await fetchItineraryByHandleFromMedusa(handle)
  if (apiItinerary && isEnabledItineraryDestination(apiItinerary.destination)) {
    return apiItinerary
  }

  // Fall back to static data
  return ITINERARY_DETAILS.find((item) => item.handle === handle) ?? null
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
