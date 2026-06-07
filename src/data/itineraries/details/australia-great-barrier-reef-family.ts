import type { ItineraryDetail } from '../types'
import { createItineraryDuration } from '../duration'
import { createDefaultReviews, createItineraryLocations } from './_shared'

const duration = createItineraryDuration(10, 9)

export const australiaGreatBarrierReefFamily: ItineraryDetail = {
  id: 'itinerary://australia-great-barrier-reef-family',
  handle: 'australia-great-barrier-reef-family',
  title: 'Great Barrier Reef Family Adventure',
  badge: 'Popular',
  destination: 'australia',
  address: 'Cairns · Great Barrier Reef · Sydney',
  locations: createItineraryLocations([
    { name: 'Cairns', lat: -16.9186, lng: 145.7781 },
    { name: 'Great Barrier Reef', lat: -18.2871, lng: 147.6992 },
    { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
  ]),
  reviewStart: 4.8,
  reviewCount: 174,
  categories: [
    { category: 'family-vacations' },
    { category: 'wildlife-safaris' },
    { category: 'beach-holidays' },
    { category: 'group-tours' },
  ],
  duration,
  featuredImage: 'https://images.pexels.com/photos/1872116/pexels-photo-1872116.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/1872116/pexels-photo-1872116.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'Clock01Icon', text: duration.label },
    { icon: 'UserMultipleIcon', text: 'Family friendly' },
    { icon: 'Beach02Icon', text: 'Reef snorkelling' },
    { icon: 'ChefHatIcon', text: 'Most meals included' },
  ],
  pricing: {
    price: '$3,499',
    originalPrice: '$4,099',
    feeAndTaxes: '$235',
    total: '$3,734',
    priceLabel: ' / person',
  },
  description:
    'Discover Australia\'s natural wonders on a 10-day family journey—snorkel the Great Barrier Reef, meet koalas and kangaroos, explore the Daintree Rainforest, and finish with Sydney\'s iconic harbour sights.',
  thingsToDo: [
    {
      name: 'Great Barrier Reef Snorkel Cruise',
      time: 'Day 2 · 8:00 AM - 4:00 PM',
      description: 'Full-day outer reef cruise with snorkelling, marine biologist talks, and buffet lunch.',
      imageUrl: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Daintree Rainforest & Cape Tribulation',
      time: 'Day 3 · 7:00 AM - 5:00 PM',
      description: 'Cruise the Daintree River spotting crocodiles and walk through ancient rainforest.',
      imageUrl: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Kuranda Wildlife Experience',
      time: 'Day 4 · 9:00 AM - 3:00 PM',
      description: 'Scenic railway to Kuranda, koala encounters, and Skyrail rainforest cableway return.',
      imageUrl: 'https://images.pexels.com/photos/1872116/pexels-photo-1872116.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Sydney Harbour & Opera House',
      time: 'Day 8 · 10:00 AM - 6:00 PM',
      description: 'Harbour cruise, Opera House tour, and Bondi Beach visit in Sydney.',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  includes: [
    '9 nights family hotel accommodation',
    'Daily breakfast and 5 dinners',
    'Domestic flights Cairns–Sydney',
    'Great Barrier Reef full-day cruise',
    'Daintree Rainforest day tour',
    'Kuranda Scenic Railway & Skyrail',
    'All applicable taxes',
  ],
  excludes: [
    'International flights',
    'Travel insurance',
    'Personal expenses',
    'Optional scuba diving upgrade',
    'Lunch on days not specified',
    'Tips and gratuities',
  ],
  accommodations: [
    {
      name: 'Shangri-La The Marina Cairns',
      imageUrl: 'https://images.pexels.com/photos/1872116/pexels-photo-1872116.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      location: 'Cairns, Australia',
    },
    {
      name: 'Park Hyatt Sydney',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      location: 'Sydney, Australia',
    },
  ],
  map: { lat: -16.9186, lng: 145.7781 },
  reviews: createDefaultReviews([
    {
      title: 'Best family trip ever',
      content: 'The reef day was magical and our kids still talk about the koalas in Kuranda.',
    },
  ]),
}
