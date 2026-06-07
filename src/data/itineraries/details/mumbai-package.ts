import type { ItineraryDetail } from '../types'
import { createItineraryDuration } from '../duration'
import { createDefaultReviews, createItineraryLocations } from './_shared'

const duration = createItineraryDuration(4, 3)

export const mumbaiPackage: ItineraryDetail = {
  id: 'itinerary://mumbai-package',
  handle: 'mumbai-package',
  title: 'Mumbai City Explorer Package',
  badge: 'Popular',
  destination: 'india',
  address: 'Mumbai, Maharashtra',
  locations: createItineraryLocations([{ name: 'Mumbai', lat: 19.076, lng: 72.8777 }]),
  reviewStart: 4.7,
  reviewCount: 178,
  categories: [
    { category: 'weekend-getaways' },
    { category: 'customized-holidays' },
  ],
  duration,
  featuredImage: 'https://images.pexels.com/photos/574324/pexels-photo-574324.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/574324/pexels-photo-574324.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2425019/pexels-photo-2425019.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'Clock01Icon', text: duration.label },
    { icon: 'UserMultipleIcon', text: 'Private guide' },
    { icon: 'City03Icon', text: 'City sightseeing' },
  ],
  pricing: {
    price: '$749',
    originalPrice: '$899',
    feeAndTaxes: '$55',
    total: '$804',
  },
  description:
    'Experience the energy of Mumbai in four days—from the Gateway of India and Elephanta Caves to Bollywood studios, street food trails, and Marine Drive at sunset.',
  thingsToDo: [
    {
      name: 'Gateway of India & Colaba',
      time: 'Day 1 · 9:00 AM - 1:00 PM',
      description:
        'Start at the iconic Gateway of India, explore Colaba Causeway markets, and visit the Taj Mahal Palace hotel precinct.',
      imageUrl: 'https://images.pexels.com/photos/2425019/pexels-photo-2425019.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Elephanta Caves Excursion',
      time: 'Day 2 · 8:30 AM - 2:00 PM',
      description:
        'Take a ferry to Elephanta Island and explore ancient rock-cut cave temples dedicated to Lord Shiva.',
      imageUrl: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Dharavi & Street Food Walk',
      time: 'Day 3 · 4:00 PM - 8:00 PM',
      description:
        'Guided walk through Dharavi’s entrepreneurial heart, followed by vada pav, bhel puri, and kulfi on a street food trail.',
      imageUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Marine Drive & Bollywood Studio Tour',
      time: 'Day 4 · 10:00 AM - 6:00 PM',
      description:
        'Tour a working Bollywood film studio, then end the trip with sunset views along Marine Drive and Chowpatty Beach.',
      imageUrl: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  includes: [
    '3 nights city hotel with breakfast',
    'Private guide for all sightseeing',
    'Elephanta Caves ferry & entry tickets',
    'Bollywood studio tour',
    'Street food tasting experience',
    'Airport transfers (BOM)',
  ],
  excludes: [
    'International flights',
    'Travel insurance',
    'Personal expenses and shopping',
    'Visa fees (if applicable)',
    'Tips and gratuities',
    'Meals not mentioned in inclusions',
  ],
  accommodations: [
    {
      name: 'The Taj Mahal Palace',
      imageUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      location: 'Colaba, Mumbai',
    },
    {
      name: 'Trident Nariman Point',
      imageUrl: 'https://images.pexels.com/photos/2425019/pexels-photo-2425019.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.6,
      location: 'Nariman Point, Mumbai',
    },
    {
      name: 'The St. Regis Mumbai',
      imageUrl: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'Lower Parel, Mumbai',
    },
    {
      name: 'ITC Maratha',
      imageUrl: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      location: 'Sahar, Mumbai',
    },
  ],
  map: { lat: 19.076, lng: 72.8777 },
  reviews: createDefaultReviews([
    {
      title: 'Mumbai like a local',
      content: 'The street food walk and Bollywood tour were incredible. Felt like we saw the real Mumbai.',
    },
  ]),
}
