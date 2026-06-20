import type { ItineraryDetail } from '../types'
import { createItineraryDuration } from '../duration'
import { createDefaultReviews, createItineraryLocations } from './_shared'

const duration = createItineraryDuration(4, 3)

export const baliFamilyCultureAdventure: ItineraryDetail = {
  id: 'itinerary://bali-family-culture-adventure',
  handle: 'bali-family-culture-adventure',
  title: 'Bali Family Culture & Adventure',
  destination: 'bali',
  address: 'Ubud · Tanah Lot · Nusa Dua',
  locations: createItineraryLocations([
    { name: 'Ubud', lat: -8.5069, lng: 115.2625 },
    { name: 'Tanah Lot', lat: -8.6211, lng: 115.0868 },
    { name: 'Nusa Dua', lat: -8.8006, lng: 115.2314 },
  ]),
  reviewStart: 4.8,
  reviewCount: 156,
  categories: [
    { category: 'family-vacations' },
    { category: 'festival-and-event-tours' },
    { category: 'beach-holidays' },
    { category: 'group-tours' },
  ],
  duration,
  mobility: 'Light Activity',
  featuredImage: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'UserMultipleIcon', text: 'Family friendly' },
    { icon: 'ChefHatIcon', text: 'Kids meals included' },
    { icon: 'Beach02Icon', text: 'Beach day pass' },
  ],
  pricing: {
    price: '$1,149',
    originalPrice: '$1,399',
    feeAndTaxes: '$82',
    total: '$1,231',
    priceLabel: ' / person',
  },
  description:
    'A four-day family adventure blending Balinese culture, temple visits, monkey forest fun, and beach time in Nusa Dua. Includes kid-friendly activities and flexible pacing for all ages.',
  thingsToDo: [
    {
      name: 'Ubud Monkey Forest & Art Market',
      time: 'Day 1 · 9:00 AM - 3:00 PM',
      description: 'Meet the macaques at Sacred Monkey Forest and browse local crafts at Ubud Art Market.',
      imageUrl: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: -8.5184,
      lng: 115.2592,
    },
    {
      name: 'Tanah Lot Sunset Temple',
      time: 'Day 2 · 3:00 PM - 7:00 PM',
      description: 'Visit Bali\'s iconic sea temple and enjoy a family dinner with ocean views.',
      imageUrl: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: -8.6211,
      lng: 115.0868,
    },
    {
      name: 'Balinese Cooking Class',
      time: 'Day 3 · 10:00 AM - 1:00 PM',
      description: 'Learn to make satay and lawar together in a hands-on family cooking workshop.',
      imageUrl: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: -8.5069,
      lng: 115.2625,
    },
    {
      name: 'Nusa Dua Beach Day',
      time: 'Day 4 · All day',
      description: 'Relax on calm family-friendly beaches with optional snorkelling and water park visit.',
      imageUrl: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: -8.8006,
      lng: 115.231,
    },
  ],
  includes: [
    '3 nights family resort accommodation',
    'Daily breakfast and 2 family dinners',
    'Private air-conditioned vehicle',
    'English-speaking family guide',
    'Monkey Forest and Tanah Lot entrance fees',
    'Balinese cooking class for the family',
    'All applicable taxes',
  ],
  excludes: [
    'International flights',
    'Travel insurance',
    'Lunch on days not specified',
    'Water park and optional activities',
    'Personal expenses',
    'Tips and gratuities',
  ],
  accommodations: [
    {
      name: 'Ayana Resort Bali',
      imageUrl: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'Nusa Dua, Bali',
    },
    {
      name: 'Komaneka at Monkey Forest',
      imageUrl: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      location: 'Ubud, Bali',
    },
  ],
  map: { lat: -8.5069, lng: 115.2625 },
  reviews: createDefaultReviews([
    {
      title: 'Kids loved every day',
      content: 'The cooking class and monkey forest were highlights for our whole family.',
    },
  ]),
}
