import type { ItineraryDetail } from '../types'
import { createItineraryDuration } from '../duration'
import { createDefaultReviews } from './_shared'

const duration = createItineraryDuration(3, 2)

export const nepalKathmanduPokharaWeekend: ItineraryDetail = {
  id: 'itinerary://nepal-kathmandu-pokhara-weekend',
  handle: 'nepal-kathmandu-pokhara-weekend',
  title: 'Kathmandu & Pokhara Weekend Escape',
  badge: 'Quick Trip',
  destination: 'nepal',
  address: 'Kathmandu · Pokhara · Phewa Lake',
  reviewStart: 4.6,
  reviewCount: 87,
  categories: [
    { category: 'weekend-getaways' },
    { category: 'honeymoon-packages' },
    { category: 'mountain-and-hill-station-tours' },
    { category: 'luxury-escapes' },
  ],
  duration,
  featuredImage: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'Clock01Icon', text: duration.label },
    { icon: 'MountainIcon', text: 'Annapurna views' },
    { icon: 'BedSingle02Icon', text: 'Boutique stays' },
    { icon: 'ChefHatIcon', text: 'Breakfast included' },
  ],
  pricing: {
    price: '$649',
    originalPrice: '$799',
    feeAndTaxes: '$48',
    total: '$697',
    priceLabel: ' / person',
  },
  description:
    'A short Himalayan getaway pairing Kathmandu\'s UNESCO heritage sites with Pokhara\'s lakeside serenity and Annapurna panoramas. Perfect for couples or travellers short on time.',
  thingsToDo: [
    {
      name: 'Kathmandu Durbar Square',
      time: 'Day 1 · 9:00 AM - 1:00 PM',
      description: 'Explore ancient temples, palaces, and the living heritage of Kathmandu Valley.',
      imageUrl: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Flight to Pokhara',
      time: 'Day 1 · 2:00 PM - 6:00 PM',
      description: 'Scenic flight over the Himalayas followed by a sunset stroll along Phewa Lake.',
      imageUrl: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Sarangkot Sunrise',
      time: 'Day 2 · 5:00 AM - 9:00 AM',
      description: 'Watch the sun illuminate Annapurna and Machapuchare from Sarangkot viewpoint.',
      imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Return to Kathmandu',
      time: 'Day 3 · 10:00 AM - 4:00 PM',
      description: 'Morning at leisure in Pokhara before your return flight to Kathmandu.',
      imageUrl: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  includes: [
    '2 nights boutique hotel accommodation',
    'Daily breakfast',
    'Kathmandu–Pokhara domestic flights',
    'Private airport transfers',
    'Sarangkot sunrise excursion',
    'Kathmandu heritage walking tour',
    'All applicable taxes',
  ],
  excludes: [
    'International flights',
    'Travel insurance',
    'Lunch and dinner',
    'Personal expenses',
    'Optional paragliding in Pokhara',
    'Tips and gratuities',
  ],
  accommodations: [
    {
      name: 'Dwarika\'s Hotel Kathmandu',
      imageUrl: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'Kathmandu, Nepal',
    },
    {
      name: 'Temple Tree Resort & Spa',
      imageUrl: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.6,
      location: 'Pokhara, Nepal',
    },
  ],
  map: { lat: 28.2096, lng: 83.9856 },
  reviews: createDefaultReviews([
    {
      title: 'Perfect long weekend',
      content: 'Sarangkot sunrise was breathtaking and the hotels were charming.',
    },
  ]),
}
