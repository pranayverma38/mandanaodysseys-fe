import type { ItineraryDetail } from '../types'
import { createItineraryDuration } from '../duration'
import { createDefaultReviews, createItineraryLocations, createItineraryPricing } from './_shared'

const duration = createItineraryDuration(8, 7)

export const holiInThePinkCity: ItineraryDetail = {
  id: 'itinerary://holi-in-the-pink-city',
  handle: 'holi-in-the-pink-city',
  title: 'Holi in the Pink City',
  badge: 'Holi Special',
  destination: 'india',
  address: 'Delhi · Jaipur · Agra · Delhi',
  locations: createItineraryLocations([
    { name: 'Delhi', lat: 28.6139, lng: 77.209 },
    { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
    { name: 'Agra', lat: 27.1767, lng: 78.0081 },
  ]),
  reviewStart: 4.9,
  reviewCount: 133,
  categories: [
    { category: 'festival-and-event-tours' },
    { category: 'group-tours' },
    { category: 'customized-holidays' },
  ],
  duration,
  mobility: 'Easy',
  featuredImage: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'UserMultipleIcon', text: 'Festival-hosted celebration' },
    { icon: 'BedSingle02Icon', text: 'Heritage city hotels' },
    { icon: 'ChefHatIcon', text: 'Breakfast & dinners' },
  ],
  pricing: createItineraryPricing(2299, 2699, { priceLabel: 'per person twin share' }),
  description:
    'An extended Jaipur stay transforms the classic Golden Triangle into a joyful Holi-season journey with safe, hosted festivities, artisan encounters, and iconic monument visits across Delhi, Jaipur, and Agra.\n\nThe sequence and experiences come from your PDF. Template-only data required by the site, such as imagery, pricing, accommodation pairings, and guest-review metadata, were generated to fit the itinerary naturally.',
  thingsToDo: [
    {
      name: 'Welcome to Delhi',
      time: 'Day 1 · 3:00 PM - 9:00 PM',
      description:
        'Arrive in Delhi, meet your chauffeur and representative, and transfer to the hotel for check-in and rest.',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.6139,
      lng: 77.209,
    },
    {
      name: 'Old & New Delhi',
      time: 'Day 2 · 8:30 AM - 6:30 PM',
      description:
        'Visit Jama Masjid, ride through Chandni Chowk, browse Khari Baoli, pay respects at Raj Ghat, visit Gurudwara Bangla Sahib, and explore Qutub Minar.',
      imageUrl: 'https://images.pexels.com/photos/3761124/pexels-photo-3761124.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.6507,
      lng: 77.2334,
    },
    {
      name: 'Delhi to Jaipur',
      time: 'Day 3 · 8:00 AM - 7:30 PM',
      description:
        'Drive to Jaipur, check into your heritage hotel, stop at Patrika Gate and Albert Hall Museum, then shop in Johari Bazaar and Bapu Bazaar for Holi outfits and local crafts.',
      imageUrl: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.8932,
      lng: 75.8078,
    },
    {
      name: 'Jaipur Heritage Experience',
      time: 'Day 4 · 8:30 AM - 8:00 PM',
      description:
        'Visit Amber Fort and Jal Mahal, then continue to City Palace and Jantar Mantar before evening folk music, Kalbelia dance, sweets, and Holi safety guidance at the hotel.',
      imageUrl: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.9855,
      lng: 75.8513,
    },
    {
      name: 'Celebrate Holi in Jaipur',
      time: 'Day 5 · 10:00 AM - 9:00 PM',
      description:
        'Celebrate Holi at a tourist-friendly venue with organic colors, dhol drummers, folk dancing, festive treats, and a relaxed afternoon before a royal-style farewell dinner.',
      imageUrl: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.9124,
      lng: 75.7873,
    },
    {
      name: 'Jaipur to Agra',
      time: 'Day 6 · 8:00 AM - 7:30 PM',
      description:
        'Drive to Agra via Fatehpur Sikri, then visit Agra Fort and a marble inlay workshop before returning to the hotel for dinner.',
      imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 27.1795,
      lng: 78.0211,
    },
    {
      name: 'Taj Mahal & Delhi Return',
      time: 'Day 7 · 5:45 AM - 9:00 PM',
      description:
        'Visit the Taj Mahal at sunrise, drive to Delhi on the Yamuna Expressway, check into your airport hotel, and enjoy a farewell dinner before your evening airport transfer.',
      imageUrl: 'https://images.pexels.com/photos/262780/pexels-photo-262780.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 27.1751,
      lng: 78.0421,
    },
    {
      name: 'Departure from Delhi',
      time: 'Day 8 · 7:00 AM - 11:00 AM',
      description:
        'Board your international flight home after breakfast and a final transfer to the airport.',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.5562,
      lng: 77.1,
    },
  ],
  includes: [
    '7 nights accommodation in Delhi, Jaipur, Agra, and an airport hotel',
    'Daily breakfast and dinners',
    'Private airport transfers and private air-conditioned vehicle throughout',
    'Delhi guided sightseeing with rickshaw ride in Old Delhi',
    'Patrika Gate, Albert Hall, Amber Fort, City Palace, Jantar Mantar, Jal Mahal, and Agra Fort visits',
    'Hosted Holi celebration with organic colors, music, dancing, and festive treats',
    'Marble inlay workshop in Agra',
    'Sunrise Taj Mahal visit',
    'All applicable taxes',
  ],
  excludes: [
    'International flights',
    'Lunches unless otherwise stated',
    'Travel insurance',
    'Visa fees',
    'Optional spa treatment in Jaipur',
    'Personal expenses and shopping',
    'Tips and gratuities',
  ],
  accommodations: [
    {
      name: 'The Claridges New Delhi',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      location: 'New Delhi, India',
    },
    {
      name: 'Samode Haveli',
      imageUrl: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'Jaipur Walled City, Rajasthan',
    },
    {
      name: 'ITC Mughal',
      imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      location: 'Taj Ganj, Agra',
    },
    {
      name: 'Novotel New Delhi Aerocity',
      imageUrl: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.5,
      location: 'Aerocity, New Delhi',
    },
  ],
  map: { lat: 27.5677, lng: 77.2791 },
  reviews: createDefaultReviews([
    {
      title: 'Best way to do Holi in India',
      content: 'Jaipur was colorful, well-organized, and memorable. The Holi day felt celebratory without ever feeling chaotic.',
    },
  ]),
}
