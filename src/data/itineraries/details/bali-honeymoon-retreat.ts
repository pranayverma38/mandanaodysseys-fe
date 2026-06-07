import type { ItineraryDetail } from '../types'
import { createItineraryDuration } from '../duration'
import { createDefaultReviews, createItineraryLocations } from './_shared'

const duration = createItineraryDuration(7, 6)

export const baliHoneymoonRetreat: ItineraryDetail = {
  id: 'itinerary://bali-honeymoon-retreat',
  handle: 'bali-honeymoon-retreat',
  title: 'Bali Honeymoon Retreat',
  badge: 'Romantic',
  destination: 'bali',
  address: 'Ubud · Seminyak · Uluwatu',
  locations: createItineraryLocations([
    { name: 'Ubud', lat: -8.5069, lng: 115.2625 },
    { name: 'Seminyak', lat: -8.6913, lng: 115.1682 },
    { name: 'Uluwatu', lat: -8.8291, lng: 115.0849 },
  ]),
  reviewStart: 4.9,
  reviewCount: 203,
  categories: [
    { category: 'honeymoon-packages' },
    { category: 'luxury-escapes' },
    { category: 'beach-holidays' },
    { category: 'customized-holidays' },
  ],
  duration,
  featuredImage: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'Clock01Icon', text: duration.label },
    { icon: 'BedSingle02Icon', text: 'Private pool villas' },
    { icon: 'ChefHatIcon', text: 'Couples spa & dining' },
    { icon: 'Beach02Icon', text: 'Beach club access' },
  ],
  pricing: {
    price: '$2,899',
    originalPrice: '$3,399',
    feeAndTaxes: '$195',
    total: '$3,094',
    priceLabel: ' / couple',
  },
  description:
    'Celebrate your honeymoon across Bali\'s most romantic settings—from Ubud\'s jungle villas and couples spa rituals to Seminyak sunsets and a private cliffside dinner at Uluwatu.',
  thingsToDo: [
    {
      name: 'Ubud Rice Terrace & Spa',
      time: 'Day 1–2 · Flexible',
      description: 'Walk Tegallalang rice terraces and unwind with a traditional Balinese couples massage.',
      imageUrl: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Seminyak Beach & Sunset',
      time: 'Day 3–4 · Afternoons',
      description: 'Beach club days, oceanfront dining, and golden-hour cocktails on Seminyak Beach.',
      imageUrl: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Uluwatu Temple & Kecak Dance',
      time: 'Day 5 · 4:00 PM - 8:00 PM',
      description: 'Watch the sunset Kecak fire dance perched above the Indian Ocean cliffs.',
      imageUrl: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Private Candlelit Dinner',
      time: 'Day 6 · 7:00 PM',
      description: 'A chef-curated private dinner under the stars at your villa.',
      imageUrl: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  includes: [
    '6 nights luxury villa and resort stays',
    'Daily breakfast and 3 romantic dinners',
    'Private airport transfers (DPS)',
    'Couples spa treatment in Ubud',
    'Uluwatu temple & Kecak dance tickets',
    'Private candlelit villa dinner',
    'All applicable taxes',
  ],
  excludes: [
    'International flights',
    'Travel insurance',
    'Personal expenses',
    'Optional water sports',
    'Alcoholic beverages (except welcome drink)',
    'Tips and gratuities',
  ],
  accommodations: [
    {
      name: 'Hanging Gardens of Bali',
      imageUrl: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      location: 'Ubud, Bali',
    },
    {
      name: 'Potato Head Beach Club Hotel',
      imageUrl: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'Seminyak, Bali',
    },
  ],
  map: { lat: -8.4095, lng: 115.1889 },
  reviews: createDefaultReviews([
    {
      title: 'Dream honeymoon',
      content: 'The private pool villa and cliffside dinner made our trip unforgettable.',
    },
  ]),
}
