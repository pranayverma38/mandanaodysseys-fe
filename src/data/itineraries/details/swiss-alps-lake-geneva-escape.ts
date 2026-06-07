import type { ItineraryDetail } from '../types'
import { createItineraryDuration } from '../duration'
import { createDefaultReviews, createItineraryLocations } from './_shared'

const duration = createItineraryDuration(5, 4)

export const swissAlpsLakeGenevaEscape: ItineraryDetail = {
  id: 'itinerary://swiss-alps-lake-geneva-escape',
  handle: 'swiss-alps-lake-geneva-escape',
  title: 'Swiss Alps & Lake Geneva Escape',
  destination: 'switzerland',
  address: 'Zurich · Interlaken · Geneva, Switzerland',
  locations: createItineraryLocations([
    { name: 'Zurich', lat: 47.3769, lng: 8.5417 },
    { name: 'Interlaken', lat: 46.6863, lng: 7.8632 },
    { name: 'Geneva', lat: 46.2044, lng: 6.1432 },
  ]),
  reviewStart: 4.7,
  reviewCount: 94,
  categories: [
    { category: 'luxury-escapes' },
    { category: 'mountain-and-hill-station-tours' },
  ],
  duration,
  featuredImage: 'https://images.pexels.com/photos/123335/pexels-photo-123335.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/123335/pexels-photo-123335.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'Clock01Icon', text: duration.label },
    { icon: 'UserMultipleIcon', text: '2 guests max' },
    { icon: 'EquipmentGym03Icon', text: 'Scenic train rides' },
  ],
  pricing: {
    price: '$2,450',
    originalPrice: '$2,850',
    feeAndTaxes: '$175',
    total: '$2,625',
  },
  description:
    'A five-day luxury escape through Switzerland featuring alpine vistas, chocolate tastings, and a scenic cruise on Lake Geneva.',
  thingsToDo: [
    {
      name: 'Zurich Old Town',
      time: 'Day 1 · 10:00 AM - 2:00 PM',
      description: 'Explore Lindenhof, Fraumünster, and the lakeside promenade with your private guide.',
      imageUrl: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Jungfraujoch Excursion',
      time: 'Day 3 · 8:00 AM - 5:00 PM',
      description: 'Ride the cogwheel train to the Top of Europe for glacier views and alpine photography.',
      imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  includes: [
    '4 nights luxury hotel stays',
    'Swiss Travel Pass for scenic trains',
    'Lake Geneva sunset cruise',
    'Private airport transfers',
    'Daily breakfast and two gourmet dinners',
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
      name: 'Baur au Lac',
      imageUrl: 'https://images.pexels.com/photos/123335/pexels-photo-123335.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      location: 'Zurich, Switzerland',
    },
    {
      name: 'Victoria-Jungfrau Grand Hotel',
      imageUrl: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'Interlaken, Switzerland',
    },
    {
      name: 'Beau-Rivage Palace',
      imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      location: 'Lausanne, Switzerland',
    },
    {
      name: 'Hotel d\'Angleterre',
      imageUrl: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      location: 'Geneva, Switzerland',
    },
  ],
  map: { lat: 46.2044, lng: 6.1432 },
  reviews: createDefaultReviews(),
}
