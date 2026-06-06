import type { ItineraryDetail } from '../types'
import { createDefaultReviews } from './_shared'

export const swissAlpsLakeGenevaEscape: ItineraryDetail = {
  id: 'itinerary://swiss-alps-lake-geneva-escape',
  handle: 'swiss-alps-lake-geneva-escape',
  title: 'Swiss Alps & Lake Geneva Escape',
  address: 'Zurich · Interlaken · Geneva, Switzerland',
  listingCategory: 'Luxury Tour',
  reviewStart: 4.7,
  reviewCount: 94,
  category: {
    category: 'international',
    subCategory: 'luxury-escapes',
  },
  featuredImage: 'https://images.pexels.com/photos/123335/pexels-photo-123335.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/123335/pexels-photo-123335.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'Clock01Icon', text: '5 days' },
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
  map: { lat: 46.2044, lng: 6.1432 },
  reviews: createDefaultReviews(),
}
