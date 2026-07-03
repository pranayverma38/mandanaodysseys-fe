import type { ItineraryDetail } from '../types'
import { createItineraryDuration } from '../duration'
import { createDefaultReviews, createItineraryLocations, createItineraryPricing } from './_shared'

const duration = createItineraryDuration(5, 4)

export const thailandPhuketSoloBeachEscape: ItineraryDetail = {
  id: 'itinerary://thailand-phuket-solo-beach-escape',
  handle: 'thailand-phuket-solo-beach-escape',
  title: 'Phuket Solo Beach Escape',
  destination: 'thailand',
  address: 'Phuket · Phi Phi Islands · Phang Nga Bay',
  locations: createItineraryLocations([
    { name: 'Phuket', lat: 7.8804, lng: 98.3923 },
    { name: 'Phi Phi Islands', lat: 7.7407, lng: 98.7784 },
    { name: 'Phang Nga Bay', lat: 8.2774, lng: 98.5022 },
  ]),
  reviewStart: 4.7,
  reviewCount: 164,
  categories: [
    { category: 'solo-traveler-packages' },
    { category: 'beach-holidays' },
    { category: 'luxury-escapes' },
    { category: 'weekend-getaways' },
  ],
  duration,
  mobility: 'Easy',
  featuredImage: 'https://images.pexels.com/photos/372945/pexels-photo-372945.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/372945/pexels-photo-372945.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/14573822/pexels-photo-14573822.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'Beach02Icon', text: 'Island hopping' },
    { icon: 'UserMultipleIcon', text: 'Solo friendly' },
    { icon: 'ChefHatIcon', text: 'Beachside dining' },
  ],
  pricing: createItineraryPricing(1099, 1299),
  description:
    'A five-day solo-friendly beach escape in southern Thailand—relax on Phuket\'s shores, island-hop to Phi Phi, kayak through Phang Nga Bay, and join optional group activities designed for independent travellers.',
  thingsToDo: [
    {
      name: 'Patong & Kata Beach Day',
      time: 'Day 1 · All day',
      description: 'Settle into beach life with optional surf lessons, Thai massage, and sunset dining.',
      imageUrl: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 7.8966,
      lng: 98.2966,
    },
    {
      name: 'Phi Phi Islands Day Trip',
      time: 'Day 2 · 7:00 AM - 5:00 PM',
      description: 'Speedboat to Maya Bay, snorkel crystal-clear waters, and lunch on Phi Phi Don.',
      imageUrl: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 7.7407,
      lng: 98.7784,
    },
    {
      name: 'Phang Nga Bay Sea Kayaking',
      time: 'Day 3 · 8:00 AM - 3:00 PM',
      description: 'Paddle through limestone caves and lagoons made famous by James Bond Island.',
      imageUrl: 'https://images.pexels.com/photos/372945/pexels-photo-372945.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 8.275,
      lng: 98.501,
    },
    {
      name: 'Old Phuket Town & Night Market',
      time: 'Day 4 · 4:00 PM - 9:00 PM',
      description: 'Explore Sino-Portuguese architecture and sample street food at the weekend night market.',
      imageUrl: 'https://images.pexels.com/photos/14573822/pexels-photo-14573822.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 7.8846,
      lng: 98.3884,
    },
  ],
  includes: [
    '4 nights beachfront hotel accommodation',
    'Daily breakfast and 2 dinners',
    'Private airport transfers (HKT)',
    'Phi Phi Islands speedboat day trip',
    'Phang Nga Bay kayaking excursion',
    'Old Phuket Town guided walk',
    'All applicable taxes',
  ],
  excludes: [
    'International flights',
    'Travel insurance',
    'Personal expenses',
    'Optional scuba diving',
    'Lunch on day trips (unless specified)',
    'Tips and gratuities',
  ],
  accommodations: [
    {
      name: 'The Nai Harn Phuket',
      imageUrl: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'Nai Harn Beach, Phuket',
    },
    {
      name: 'Keemala Resort',
      imageUrl: 'https://images.pexels.com/photos/372945/pexels-photo-372945.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      location: 'Kamala, Phuket',
    },
  ],
  map: { lat: 7.8804, lng: 98.3923 },
  reviews: createDefaultReviews([
    {
      title: 'Great solo trip',
      content: 'Felt safe throughout and the Phi Phi day trip was the perfect group activity.',
    },
  ]),
}
