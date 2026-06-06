import type { ItineraryDetail } from '../types'
import { createDefaultReviews } from './_shared'

export const goldenTriangleIndiaTour: ItineraryDetail = {
  id: 'itinerary://golden-triangle-india-tour',
  handle: 'golden-triangle-india-tour',
  title: 'Golden Triangle India Tour',
  badge: 'Popular',
  address: 'Delhi · Agra · Jaipur, India',
  reviewStart: 4.8,
  reviewCount: 189,
  categories: [
    { category: 'india', subCategory: 'heritage-tours' },
    { category: 'india', subCategory: 'family-vacations' },
    { category: 'india', subCategory: 'wildlife-safaris' },
  ],
  featuredImage: 'https://images.pexels.com/photos/3761124/pexels-photo-3761124.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/3761124/pexels-photo-3761124.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'Clock01Icon', text: '6 days' },
    { icon: 'UserMultipleIcon', text: 'Private guide' },
    { icon: 'ChefHatIcon', text: 'Meals included' },
  ],
  pricing: {
    price: '$1,250',
    originalPrice: '$1,499',
    feeAndTaxes: '$85',
    total: '$1,335',
  },
  description:
    'Discover the heart of India on this classic 6-day Golden Triangle journey. Explore Mughal architecture in Delhi, witness the sunrise at the Taj Mahal in Agra, and wander the pink-hued palaces of Jaipur with a dedicated private guide throughout.',
  thingsToDo: [
    {
      name: 'Old Delhi Heritage Walk',
      time: 'Day 1 · 9:00 AM - 1:00 PM',
      description:
        'Visit Jama Masjid, Chandni Chowk, and Raj Ghat with your guide. Enjoy a rickshaw ride through the bustling lanes of Old Delhi.',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Taj Mahal at Sunrise',
      time: 'Day 3 · 5:30 AM - 10:00 AM',
      description:
        'Experience the Taj Mahal at first light, then explore Agra Fort and the local marble inlay workshops.',
      imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Amber Fort & Jaipur City Palace',
      time: 'Day 5 · 8:00 AM - 4:00 PM',
      description:
        'Ride up to Amber Fort, tour the City Palace, and browse handicrafts at Johari Bazaar before a traditional Rajasthani dinner.',
      imageUrl: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  includes: [
    '5 nights hotel accommodation with breakfast',
    'Private air-conditioned vehicle and driver',
    'English-speaking tour guide',
    'Monument entrance fees (Taj Mahal, forts & palaces)',
    'Welcome dinner in Jaipur',
    'All applicable taxes',
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
      name: 'The Oberoi New Delhi',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'New Delhi, India',
    },
    {
      name: 'ITC Mughal, Agra',
      imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      location: 'Agra, Uttar Pradesh',
    },
    {
      name: 'Rambagh Palace',
      imageUrl: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      location: 'Jaipur, Rajasthan',
    },
    {
      name: 'The Imperial New Delhi',
      imageUrl: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'Janpath, New Delhi',
    },
  ],
  map: { lat: 27.1751, lng: 78.0421 },
  reviews: createDefaultReviews([
    {
      title: 'Golden Triangle done right',
      content: 'The Taj Mahal sunrise was unforgettable. Hotels and transfers were seamless.',
    },
  ]),
}
