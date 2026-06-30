import type { TourType } from './types'

export const TOUR_TYPES: TourType[] = [
  {
    name: 'Family Vacations',
    slug: 'family-vacations',
    description: 'Kid-friendly itineraries with activities for every age group.',
  },
  {
    name: 'Honeymoon Packages',
    slug: 'honeymoon-packages',
    description: 'Romantic escapes with private stays and curated experiences.',
  },
  {
    name: 'Wildlife Safaris',
    slug: 'wildlife-safaris',
    description: 'National parks, jungle treks, and guided wildlife encounters.',
  },
  {
    name: 'Beach Holidays',
    slug: 'beach-holidays',
    description: 'Sun, sand, and coastal resorts for the perfect seaside getaway.',
  },
  {
    name: 'Luxury Escapes',
    slug: 'luxury-escapes',
    description: 'Premium stays, private transfers, and bespoke travel planning.',
  },
  {
    name: 'Group Tours',
    slug: 'group-tours',
    description: 'Fixed-departure tours ideal for friends, colleagues, and communities.',
  },
  {
    name: 'Solo Traveler Packages',
    slug: 'solo-traveler-packages',
    description: 'Safe, social, and flexible trips designed for independent explorers.',
  },
  {
    name: 'Weekend Getaways',
    slug: 'weekend-getaways',
    description: 'Short breaks packed with the best sights in two to four days.',
  },
  {
    name: 'Hill Station Tours',
    slug: 'mountain-and-hill-station-tours',
    description: 'Scenic highland routes, trekking, and cool-climate retreats.',
  },
  {
    name: 'Cruise Holidays',
    slug: 'cruise-holidays',
    description: 'Ocean and river cruises with all-inclusive onboard comfort.',
  },
  {
    name: 'Festival & Event Tours',
    slug: 'festival-and-event-tours',
    description: 'Timed around local festivals, cultural events, and celebrations.',
  },
  {
    name: 'Customized Holidays',
    slug: 'customized-holidays',
    description: 'Tailor-made itineraries built around your dates and interests.',
  },
]

export function getTourTypeBySlug(slug: string): TourType | undefined {
  return TOUR_TYPES.find((tourType) => tourType.slug === slug)
}

export function getInspirationPath(tourTypeSlug: string): string {
  return `/inspirations/${tourTypeSlug}`
}

export function getTourTypePath(destinationSlug: string, tourTypeSlug: string): string {
  return `/destinations/${destinationSlug}/${tourTypeSlug}`
}
