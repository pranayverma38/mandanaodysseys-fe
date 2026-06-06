import type { ItineraryDetail } from './types'
import { goldenTriangleIndiaTour } from './details/golden-triangle-india-tour'
import { goaPackage } from './details/goa-package'
import { listingNameItinerary } from './details/listing-name'
import { mumbaiPackage } from './details/mumbai-package'
import { swissAlpsLakeGenevaEscape } from './details/swiss-alps-lake-geneva-escape'

/**
 * Register every itinerary detail file here.
 * To add a new page:
 * 1. Create `src/data/itineraries/details/your-handle.ts`
 * 2. Import and add it to ITINERARY_DETAILS below
 * 3. Visit `/itinerary/your-handle`
 */
export const ITINERARY_DETAILS: ItineraryDetail[] = [
  listingNameItinerary,
  goldenTriangleIndiaTour,
  swissAlpsLakeGenevaEscape,
  goaPackage,
  mumbaiPackage,
]

export async function getItineraries() {
  return ITINERARY_DETAILS.map(
    ({ id, handle, title, badge, featuredImage, address, reviewStart, reviewCount, pricing, amenities, category }) => ({
      id,
      handle,
      title,
      badge,
      featuredImage,
      like: false,
      address,
      reviewStart,
      reviewCount,
      price: pricing.price,
      amenities,
      category,
    })
  )
}

export async function getItineraryByHandle(handle: string) {
  const itinerary =
    ITINERARY_DETAILS.find((item) => item.handle === handle) ??
    ITINERARY_DETAILS.find((item) => item.handle === 'listing-name')

  return itinerary ?? null
}

export async function getItinerariesByCategory(categorySlug: string) {
  return ITINERARY_DETAILS.filter((item) => item.category.category === categorySlug)
}

export async function getItinerariesBySubCategory(categorySlug: string, subCategorySlug: string) {
  return ITINERARY_DETAILS.filter(
    (item) => item.category.category === categorySlug && item.category.subCategory === subCategorySlug
  )
}

export async function getItineraryReviews(handle: string) {
  const itinerary = await getItineraryByHandle(handle)
  return itinerary?.reviews ?? []
}

export type TItineraryListing = Awaited<ReturnType<typeof getItineraries>>[number]
export type TItinerary = ItineraryDetail

export * from './types'
export * from './categories'
