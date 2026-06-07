import type { ItineraryDetail } from '../types'
import { createItineraryDuration } from '../duration'
import { createDefaultReviews } from './_shared'

const duration = createItineraryDuration(6, 5)

export const australiaSydneyMelbourneLuxury: ItineraryDetail = {
  id: 'itinerary://australia-sydney-melbourne-luxury',
  handle: 'australia-sydney-melbourne-luxury',
  title: 'Sydney & Melbourne Luxury Escape',
  badge: 'Luxury',
  destination: 'australia',
  address: 'Sydney · Melbourne · Great Ocean Road',
  reviewStart: 4.7,
  reviewCount: 118,
  categories: [
    { category: 'luxury-escapes' },
    { category: 'customized-holidays' },
    { category: 'weekend-getaways' },
    { category: 'cruise-holidays' },
  ],
  duration,
  featuredImage: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1872116/pexels-photo-1872116.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'Clock01Icon', text: duration.label },
    { icon: 'BedSingle02Icon', text: '5-star hotels' },
    { icon: 'ChefHatIcon', text: 'Fine dining' },
    { icon: 'CarParking01Icon', text: 'Private transfers' },
  ],
  pricing: {
    price: '$2,750',
    originalPrice: '$3,199',
    feeAndTaxes: '$185',
    total: '$2,935',
    priceLabel: ' / person',
  },
  description:
    'Experience Australia\'s two greatest cities in style—Sydney Harbour yacht cruise, fine dining in The Rocks, Melbourne laneway culture, and a private Great Ocean Road day trip to the Twelve Apostles.',
  thingsToDo: [
    {
      name: 'Sydney Harbour Luxury Cruise',
      time: 'Day 1 · 5:00 PM - 8:00 PM',
      description: 'Sunset harbour cruise with champagne and canapés past the Opera House and Harbour Bridge.',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'The Rocks Fine Dining',
      time: 'Day 2 · 7:00 PM',
      description: 'Chef\'s tasting menu at a harbour-view restaurant in historic The Rocks district.',
      imageUrl: 'https://images.pexels.com/photos/1872116/pexels-photo-1872116.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Melbourne Laneways & Art',
      time: 'Day 4 · 10:00 AM - 4:00 PM',
      description: 'Private guided tour of Hosier Lane street art, hidden cafés, and Queen Victoria Market.',
      imageUrl: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Great Ocean Road Private Tour',
      time: 'Day 5 · 7:00 AM - 7:00 PM',
      description: 'Luxury vehicle tour to the Twelve Apostles with gourmet picnic stops along the coast.',
      imageUrl: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  includes: [
    '5 nights 5-star hotel accommodation',
    'Daily breakfast and 3 fine dining experiences',
    'Private airport and intercity transfers',
    'Sydney Harbour sunset cruise',
    'Melbourne private laneway tour',
    'Great Ocean Road private day tour',
    'All applicable taxes',
  ],
  excludes: [
    'International flights',
    'Travel insurance',
    'Domestic flights Sydney–Melbourne (included in transfer option)',
    'Personal shopping',
    'Alcoholic beverages outside included meals',
    'Tips and gratuities',
  ],
  accommodations: [
    {
      name: 'Park Hyatt Sydney',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      location: 'Sydney, Australia',
    },
    {
      name: 'Crown Towers Melbourne',
      imageUrl: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'Melbourne, Australia',
    },
  ],
  map: { lat: -33.8688, lng: 151.2093 },
  reviews: createDefaultReviews([
    {
      title: 'Luxury done right',
      content: 'The harbour cruise and Great Ocean Road day were absolutely first class.',
    },
  ]),
}
