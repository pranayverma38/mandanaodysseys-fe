import type { ItineraryDetail } from '../types'
import { createItineraryDuration } from '../duration'
import { createDefaultReviews, createItineraryLocations } from './_shared'

const duration = createItineraryDuration(8, 7)

export const thailandBangkokChiangMaiCultural: ItineraryDetail = {
  id: 'itinerary://thailand-bangkok-chiang-mai-cultural',
  handle: 'thailand-bangkok-chiang-mai-cultural',
  title: 'Bangkok & Chiang Mai Cultural Journey',
  badge: 'Cultural',
  destination: 'thailand',
  address: 'Bangkok · Ayutthaya · Chiang Mai',
  locations: createItineraryLocations([
    { name: 'Bangkok', lat: 13.7563, lng: 100.5018 },
    { name: 'Ayutthaya', lat: 14.3532, lng: 100.5689 },
    { name: 'Chiang Mai', lat: 18.7883, lng: 98.9853 },
  ]),
  reviewStart: 4.8,
  reviewCount: 231,
  categories: [
    { category: 'festival-and-event-tours' },
    { category: 'group-tours' },
    { category: 'customized-holidays' },
    { category: 'family-vacations' },
  ],
  duration,
  featuredImage: 'https://images.pexels.com/photos/14573822/pexels-photo-14573822.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/14573822/pexels-photo-14573822.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/372945/pexels-photo-372945.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'Clock01Icon', text: duration.label },
    { icon: 'UserMultipleIcon', text: 'Group tour' },
    { icon: 'ChefHatIcon', text: 'Thai cooking class' },
    { icon: 'City03Icon', text: 'Temple tours' },
  ],
  pricing: {
    price: '$1,699',
    originalPrice: '$1,999',
    feeAndTaxes: '$115',
    total: '$1,814',
    priceLabel: ' / person',
  },
  description:
    'Immerse yourself in Thailand\'s rich heritage—from Bangkok\'s Grand Palace and floating markets to the ancient ruins of Ayutthaya and Chiang Mai\'s lantern festivals, night bazaars, and elephant sanctuary visit.',
  thingsToDo: [
    {
      name: 'Grand Palace & Wat Pho',
      time: 'Day 1 · 8:30 AM - 1:00 PM',
      description: 'Explore the Grand Palace complex and the Reclining Buddha at Wat Pho with an expert guide.',
      imageUrl: 'https://images.pexels.com/photos/14573822/pexels-photo-14573822.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Ayutthaya Historical Park',
      time: 'Day 2 · 7:00 AM - 5:00 PM',
      description: 'Day trip to UNESCO-listed Ayutthaya with temple ruins and a riverside Thai lunch.',
      imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Chiang Mai Night Bazaar',
      time: 'Day 4 · 6:00 PM - 10:00 PM',
      description: 'Browse handicrafts, sample northern Thai street food, and watch traditional dance performances.',
      imageUrl: 'https://images.pexels.com/photos/372945/pexels-photo-372945.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Doi Suthep & Ethical Elephant Sanctuary',
      time: 'Day 6 · 8:00 AM - 4:00 PM',
      description: 'Visit Wat Phra That Doi Suthep and spend the afternoon at a responsible elephant sanctuary.',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  includes: [
    '7 nights hotel accommodation with breakfast',
    'Bangkok–Chiang Mai domestic flight',
    'Private air-conditioned vehicle and guide',
    'Grand Palace and temple entrance fees',
    'Ayutthaya day tour with lunch',
    'Ethical elephant sanctuary visit',
    'All applicable taxes',
  ],
  excludes: [
    'International flights',
    'Travel insurance',
    'Personal expenses and shopping',
    'Optional festival event tickets',
    'Dinner on days not specified',
    'Tips and gratuities',
  ],
  accommodations: [
    {
      name: 'Mandarin Oriental Bangkok',
      imageUrl: 'https://images.pexels.com/photos/14573822/pexels-photo-14573822.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      location: 'Bangkok, Thailand',
    },
    {
      name: 'Rachamankha Chiang Mai',
      imageUrl: 'https://images.pexels.com/photos/372945/pexels-photo-372945.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      location: 'Chiang Mai, Thailand',
    },
  ],
  map: { lat: 13.7563, lng: 100.5018 },
  reviews: createDefaultReviews([
    {
      title: 'Rich cultural experience',
      content: 'Ayutthaya and the Chiang Mai night market were unforgettable highlights.',
    },
  ]),
}
