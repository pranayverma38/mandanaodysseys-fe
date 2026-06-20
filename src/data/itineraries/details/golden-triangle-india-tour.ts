import type { ItineraryDetail } from '../types'
import { createItineraryDuration } from '../duration'
import { createDefaultReviews, createItineraryLocations } from './_shared'

const duration = createItineraryDuration(10, 9)

export const goldenTriangleIndiaTour: ItineraryDetail = {
  id: 'itinerary://golden-triangle-india-tour',
  handle: 'golden-triangle-india-tour',
  title: 'Golden Triangle India Tour',
  badge: 'Popular',
  destination: 'india',
  address: 'Delhi · Agra · Ranthambore · Jaipur',
  locations: createItineraryLocations([
    { name: 'Delhi', lat: 28.6139, lng: 77.209 },
    { name: 'Agra', lat: 27.1767, lng: 78.0081 },
    { name: 'Ranthambore', lat: 26.0173, lng: 76.5026 },
    { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
  ]),
  reviewStart: 4.8,
  reviewCount: 189,
  categories: [
    { category: 'group-tours' },
    { category: 'wildlife-safaris' },
    { category: 'family-vacations' },
  ],
  duration,
  mobility: 'Light Activity',
  featuredImage: 'https://images.pexels.com/photos/19867662/pexels-photo-19867662.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/19867662/pexels-photo-19867662.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'UserMultipleIcon', text: 'Group tour' },
    { icon: 'ChefHatIcon', text: 'Meals included' },
    { icon: 'BedSingle02Icon', text: '4-Star Hotels' },
  ],
  pricing: {
    price: '$3,159',
    originalPrice: '$3,799',
    feeAndTaxes: '$215',
    total: '$3,374',
    priceLabel: ' / person',
  },
  description:
    'The Golden Triangle tour is designed for first-time visitors to India and covers the country\'s most iconic destinations. Travelers explore:\n\nOld and New Delhi\nAgra and the Taj Mahal\nRanthambore National Park\nJaipur, the Pink City\n\nHighlights include rickshaw rides through Old Delhi, visits to UNESCO World Heritage sites, tiger safaris in Ranthambore, Amber Fort, Hawa Mahal, traditional handicraft workshops, and authentic Indian cultural experiences.',
  thingsToDo: [
    {
      name: 'Delhi',
      time: 'Day 1 · 2:00 PM - 9:00 PM',
      description:
        'Fly to Delhi. Free time depending on arrival. Group welcome dinner.',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.6139,
      lng: 77.209,
    },
    {
      name: 'Delhi',
      time: 'Day 2 · 8:30 AM - 5:00 PM',
      description:
        'Explore Old and New Delhi. Rickshaw ride, Khari Baoli Spice Market, Jama Masjid, India Gate, and Qutab Minar.',
      imageUrl: 'https://images.pexels.com/photos/3761124/pexels-photo-3761124.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.6139,
      lng: 77.209,
    },
    {
      name: 'Delhi → Agra',
      time: 'Day 3 · 8:00 AM - 8:00 PM',
      description:
        'Drive to Agra. Visit Agra Fort and enjoy the Mohabbat the Taj cultural show.',
      imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 27.1767,
      lng: 78.0081,
    },
    {
      name: 'Agra → Ranthambore',
      time: 'Day 4 · 5:30 AM - 6:00 PM',
      description:
        'Visit the Taj Mahal. Continue to Ranthambore National Park.',
      imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.0173,
      lng: 76.5026,
    },
    {
      name: 'Ranthambore',
      time: 'Day 5 · 6:00 AM - 6:00 PM',
      description:
        'Morning and afternoon safaris searching for Bengal tigers and other wildlife.',
      imageUrl: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.0173,
      lng: 76.5026,
    },
    {
      name: 'Ranthambore → Jaipur',
      time: 'Day 6 · 8:00 AM - 4:00 PM',
      description:
        'Travel to Jaipur. Turban-tying experience and leisure time.',
      imageUrl: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.9124,
      lng: 75.7873,
    },
    {
      name: 'Jaipur',
      time: 'Day 7 · 8:30 AM - 5:30 PM',
      description:
        'Visit Hawa Mahal, Amber Fort, City Palace, Jantar Mantar, block printing and carpet weaving workshops.',
      imageUrl: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.9124,
      lng: 75.7873,
    },
    {
      name: 'Jaipur → Delhi',
      time: 'Day 8 · 8:00 AM - 9:00 PM',
      description:
        'Return to Delhi. Free time. Farewell dinner with group.',
      imageUrl: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.6139,
      lng: 77.209,
    },
    {
      name: 'Delhi',
      time: 'Day 9 · 8:00 AM - 12:00 PM',
      description: 'Fly from Delhi to Australia.',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.6139,
      lng: 77.209,
    },
    {
      name: 'Arrival',
      time: 'Day 10 · All day',
      description: 'Arrive home (same day or following day depending on flights).',
      imageUrl: 'https://images.pexels.com/photos/3761124/pexels-photo-3761124.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.5562,
      lng: 77.1,
    },
  ],
  includes: [
    'Includes flights, accommodation, meals, guides, entrance fees, and visa processing for eligible travelers.',
    '9 nights hotel accommodation with breakfast',
    'Private air-conditioned vehicle and driver',
    'English-speaking tour guide',
    'Monument entrance fees (Taj Mahal, forts & palaces)',
    'Welcome dinner in Jaipur',
    'All applicable taxes',
  ],
  excludes: [
    'Travel insurance',
    'Personal expenses',
    'Optional activities',
    'Additional hotel nights/stopovers',
    'Airline upgrades',
    'Customary tipping (~US$60 per person payable locally)',
  ],
  accommodations: [
    {
      name: 'The Park Hotel',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.6,
      location: 'New Delhi, India',
    },
    {
      name: 'Clarks Shiraz',
      imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.5,
      location: 'Agra, India',
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
