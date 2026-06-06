import type { StaticImageData } from 'next/image'

export type ItineraryCategoryRef = {
  /** Slug from `ITINERARY_CATEGORIES` in categories.ts */
  category: string
  /** Slug from the parent category's `subCategories` in categories.ts */
  subCategory?: string
}

export type ItineraryAmenity = {
  icon: string
  text: string
}

export type ItineraryThingToDo = {
  name: string
  time: string
  description: string
  imageUrl: string
}

export type ItineraryReview = {
  id: string
  title: string
  rating: number
  content: string
  author: string
  authorAvatar: StaticImageData
  date: string
  datetime: string
}

export type ItineraryPricing = {
  price: string
  originalPrice: string
  feeAndTaxes: string
  total: string
  priceLabel?: string
}

export type ItineraryAccommodation = {
  name: string
  imageUrl: string
  rating: number
  location: string
}

export type ItineraryDetail = {
  id: string
  handle: string
  title: string
  badge?: string
  address: string
  reviewStart: number
  reviewCount: number
  /** 2–3 category tags — slugs defined in `src/data/itineraries/categories.ts` */
  categories: ItineraryCategoryRef[]
  featuredImage: string
  galleryImgs: string[]
  amenities: ItineraryAmenity[]
  pricing: ItineraryPricing
  description: string
  thingsToDo: ItineraryThingToDo[]
  includes: string[]
  excludes: string[]
  accommodations: ItineraryAccommodation[]
  map: { lat: number; lng: number }
  reviews: ItineraryReview[]
}
