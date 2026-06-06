import type { StaticImageData } from 'next/image'

export type ItineraryCategoryRef = {
  category: string
  subCategory: string
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

export type ItineraryDetail = {
  id: string
  handle: string
  title: string
  badge?: string
  address: string
  listingCategory: string
  reviewStart: number
  reviewCount: number
  category: ItineraryCategoryRef
  featuredImage: string
  galleryImgs: string[]
  amenities: ItineraryAmenity[]
  pricing: ItineraryPricing
  description: string
  thingsToDo: ItineraryThingToDo[]
  includes: string[]
  map: { lat: number; lng: number }
  reviews: ItineraryReview[]
}
