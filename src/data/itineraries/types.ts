import type { StaticImageData } from 'next/image'
import type { ItineraryDuration } from './duration'

export type ItineraryCategoryRef = {
  /** Slug from `ITINERARY_CATEGORIES` / `TOUR_TYPES` in categories.ts */
  category: string
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
  /** Slug from `ITINERARY_DESTINATIONS` / `DESTINATIONS` in destinations.ts */
  destination: string
  /** Cities or regions within the destination */
  address: string
  reviewStart: number
  reviewCount: number
  /** 2–3 category tags — slugs from `ITINERARY_CATEGORIES` / `TOUR_TYPES` */
  categories: ItineraryCategoryRef[]
  /** Trip length — required for filtering */
  duration: ItineraryDuration
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
