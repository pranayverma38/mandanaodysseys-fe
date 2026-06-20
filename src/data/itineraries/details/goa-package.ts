import type { ItineraryDetail } from '../types'
import { createItineraryDuration } from '../duration'
import { createDefaultReviews, createItineraryLocations } from './_shared'

const duration = createItineraryDuration(5, 4)

export const goaPackage: ItineraryDetail = {
  id: 'itinerary://goa-package',
  handle: 'goa-package',
  title: 'Goa Beach & Heritage Package',
  badge: 'Best Seller',
  destination: 'india',
  address: 'North Goa · South Goa',
  locations: createItineraryLocations([
    { name: 'North Goa', lat: 15.5449, lng: 73.7739 },
    { name: 'South Goa', lat: 15.2993, lng: 74.124 },
  ]),
  reviewStart: 4.9,
  reviewCount: 246,
  categories: [
    { category: 'beach-holidays' },
    { category: 'family-vacations' },
  ],
  duration,
  mobility: 'Easy',
  featuredImage: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/457878/pexels-photo-457878.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3601433/pexels-photo-3601433.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'Beach02Icon', text: 'Beach resort stay' },
    { icon: 'ChefHatIcon', text: 'Breakfast & dinner' },
  ],
  pricing: {
    price: '$899',
    originalPrice: '$1,099',
    feeAndTaxes: '$65',
    total: '$964',
  },
  description:
    'Unwind on golden Goan beaches, explore Portuguese-era churches, and enjoy sunset cruises along the Arabian Sea. This 5-day package blends relaxation with culture and coastal adventure.',
  thingsToDo: [
    {
      name: 'Calangute & Baga Beach Day',
      time: 'Day 1 · 10:00 AM - 6:00 PM',
      description:
        'Relax on North Goa beaches, try water sports, and enjoy fresh seafood at a beach shack with live music.',
      imageUrl: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Old Goa Heritage Tour',
      time: 'Day 2 · 9:00 AM - 1:00 PM',
      description:
        'Visit Basilica of Bom Jesus, Sé Cathedral, and Fontainhas—the Latin Quarter known for colourful Portuguese houses.',
      imageUrl: 'https://images.pexels.com/photos/3601433/pexels-photo-3601433.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Sunset River Cruise',
      time: 'Day 3 · 5:00 PM - 7:30 PM',
      description:
        'Cruise the Mandovi River at sunset with Goan folk performances and views of Panjim lit up at dusk.',
      imageUrl: 'https://images.pexels.com/photos/457878/pexels-photo-457878.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Palolem & Agonda South Goa',
      time: 'Day 4 · 8:00 AM - 5:00 PM',
      description:
        'Discover quieter southern beaches, kayak in calm waters, and enjoy a beachside barbecue dinner.',
      imageUrl: 'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  includes: [
    '4 nights beach resort accommodation',
    'Daily breakfast and 2 dinners',
    'Private airport transfers (GOI)',
    'Sunset Mandovi river cruise',
    'North & South Goa sightseeing',
    'All applicable taxes',
  ],
  excludes: [
    'International flights',
    'Travel insurance',
    'Personal expenses and shopping',
    'Optional water sports activities',
    'Tips and gratuities',
    'Meals not mentioned in inclusions',
  ],
  accommodations: [
    {
      name: 'Taj Exotica Resort & Spa',
      imageUrl: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'Benaulim, South Goa',
    },
    {
      name: 'W Goa',
      imageUrl: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      location: 'Vagator, North Goa',
    },
    {
      name: 'Grand Hyatt Goa',
      imageUrl: 'https://images.pexels.com/photos/457878/pexels-photo-457878.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.6,
      location: 'Bambolim, North Goa',
    },
    {
      name: 'Alila Diwa Goa',
      imageUrl: 'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'Majorda, South Goa',
    },
  ],
  map: { lat: 15.2993, lng: 74.124 },
  reviews: createDefaultReviews([
    {
      title: 'Perfect Goa getaway',
      content: 'Beautiful beaches, great food, and the sunset cruise was the highlight of our trip.',
    },
  ]),
}
