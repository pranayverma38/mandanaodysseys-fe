export type DestinationContinent = 'Asia' | 'Oceania'

export type Destination = {
  name: string
  slug: string
  continent: DestinationContinent
  country: string
  description: string
  thumbnail: string
  packageCount: number
}

export type TourType = {
  name: string
  slug: string
  description: string
}

export const DESTINATIONS: Destination[] = [
  {
    name: 'India',
    slug: 'india',
    continent: 'Asia',
    country: 'India',
    description: 'Heritage cities, Himalayan peaks, and vibrant culture across the subcontinent.',
    thumbnail:
      'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
    packageCount: 48,
  },
  {
    name: 'Sri Lanka',
    slug: 'sri-lanka',
    continent: 'Asia',
    country: 'Sri Lanka',
    description: 'Tea hills, golden beaches, and ancient temples on the pearl of the Indian Ocean.',
    thumbnail:
      'https://images.pexels.com/photos/2387866/pexels-photo-2387866.jpeg?auto=compress&cs=tinysrgb&w=800',
    packageCount: 32,
  },
  {
    name: 'Thailand',
    slug: 'thailand',
    continent: 'Asia',
    country: 'Thailand',
    description: 'Tropical islands, bustling Bangkok, and world-renowned hospitality.',
    thumbnail:
      'https://images.pexels.com/photos/14573822/pexels-photo-14573822.jpeg?auto=compress&cs=tinysrgb&w=800',
    packageCount: 56,
  },
  {
    name: 'Nepal',
    slug: 'nepal',
    continent: 'Asia',
    country: 'Nepal',
    description: 'Everest trails, sacred valleys, and adventure in the heart of the Himalayas.',
    thumbnail:
      'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800',
    packageCount: 24,
  },
  {
    name: 'Vietnam',
    slug: 'vietnam',
    continent: 'Asia',
    country: 'Vietnam',
    description: 'Ha Long Bay, lantern-lit streets, and rich cuisine from north to south.',
    thumbnail:
      'https://images.pexels.com/photos/372945/pexels-photo-372945.jpeg?auto=compress&cs=tinysrgb&w=800',
    packageCount: 40,
  },
  {
    name: 'Bali',
    slug: 'bali',
    continent: 'Asia',
    country: 'Indonesia',
    description: 'Rice terraces, spiritual retreats, and surf-ready shores in Indonesia.',
    thumbnail:
      'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800',
    packageCount: 44,
  },
  {
    name: 'Australia',
    slug: 'australia',
    continent: 'Oceania',
    country: 'Australia',
    description: 'Reef dives, outback adventures, and cosmopolitan coastal cities.',
    thumbnail:
      'https://images.pexels.com/photos/1872116/pexels-photo-1872116.jpeg?auto=compress&cs=tinysrgb&w=800',
    packageCount: 36,
  },
]

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

export const DESTINATION_CONTINENTS: DestinationContinent[] = ['Asia', 'Oceania']

export function getDestinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((destination) => destination.slug === slug)
}

export function getTourTypeBySlug(slug: string): TourType | undefined {
  return TOUR_TYPES.find((tourType) => tourType.slug === slug)
}

export function getDestinationsByContinent(continent: DestinationContinent): Destination[] {
  return DESTINATIONS.filter((destination) => destination.continent === continent)
}

export function getDestinationPath(slug: string): string {
  return `/destinations/${slug}`
}

export function getTourTypePath(destinationSlug: string, tourTypeSlug: string): string {
  return `/destinations/${destinationSlug}/${tourTypeSlug}`
}

export function getInspirationPath(tourTypeSlug: string): string {
  return `/inspirations/${tourTypeSlug}`
}
