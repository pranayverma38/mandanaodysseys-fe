import type { ItineraryDetail } from '../types'
import { createItineraryDuration } from '../duration'
import { createDefaultReviews, createItineraryLocations, createItineraryPricing } from './_shared'

const duration = createItineraryDuration(11, 10)

export const coloursPalacesAndTheTaj: ItineraryDetail = {
  id: 'itinerary://colours-palaces-and-the-taj',
  handle: 'colours-palaces-and-the-taj',
  title: 'Colours of Rajasthan: A Royal Holi Celebration from Udaipur to Jaipur',
  badge: 'Festival Pick',
  destination: 'india',
  address: 'Delhi · Udaipur · Deogarh · Jaipur · Agra',
  locations: createItineraryLocations([
    { name: 'Delhi', lat: 28.6139, lng: 77.209 },
    { name: 'Udaipur', lat: 24.5854, lng: 73.7125 },
    { name: 'Deogarh', lat: 25.533, lng: 73.907 },
    { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
    { name: 'Agra', lat: 27.1767, lng: 78.0081 },
  ]),
  reviewStart: 4.9,
  reviewCount: 142,
  categories: [
    { category: 'festival-and-event-tours' },
    { category: 'luxury-escapes' },
    { category: 'customized-holidays' },
  ],
  duration,
  mobility: 'Light Activity',
  featuredImage: 'https://images.pexels.com/photos/19867662/pexels-photo-19867662.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/19867662/pexels-photo-19867662.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'UserMultipleIcon', text: 'Private guided journey' },
    { icon: 'BedSingle02Icon', text: 'Heritage palace stays' },
    { icon: 'ChefHatIcon', text: 'Breakfast & dinners' },
  ],
  pricing: createItineraryPricing(3899, 4499, { priceLabel: 'per person twin share' }),
  description:
    'A richly layered Rajasthan journey combining Delhi heritage, Udaipur\'s lakeside grandeur, a royal stay in Deogarh, Holi celebrations in Jaipur, and the timeless beauty of the Taj Mahal in Agra.\n\nBased on the supplied itinerary PDF, this route includes private transfers, a Delhi to Udaipur domestic flight, cultural performances, artisan visits, temple and fort sightseeing, a rural village walk, and a joyful Holi feast in Jaipur. Template-only fields such as images, pricing, reviews, and hotel pairings were generated to fit the itinerary naturally.',
  thingsToDo: [
    {
      name: 'Welcome to Delhi',
      time: 'Day 1 · 2:00 PM - 9:00 PM',
      description:
        'Arrive in Delhi, meet your private representative at the airport, transfer to your hotel, and settle in with a light welcome dinner.',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.6139,
      lng: 77.209,
    },
    {
      name: 'Old & New Delhi',
      time: 'Day 2 · 8:30 AM - 6:30 PM',
      description:
        'Visit Jama Masjid, enjoy a cycle-rickshaw ride through Chandni Chowk, browse Khari Baoli spice market, pay respects at Raj Ghat, visit Gurudwara Bangla Sahib, and finish at Qutub Minar.',
      imageUrl: 'https://images.pexels.com/photos/3761124/pexels-photo-3761124.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.5244,
      lng: 77.1855,
    },
    {
      name: 'Delhi to Udaipur',
      time: 'Day 3 · 9:00 AM - 8:00 PM',
      description:
        'Take a domestic flight to Udaipur, the City of Lakes, then enjoy a sunset boat cruise on Lake Pichola followed by a Rajasthani cooking demonstration and dinner.',
      imageUrl: 'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 24.576,
      lng: 73.6831,
    },
    {
      name: 'Udaipur Heritage',
      time: 'Day 4 · 9:00 AM - 8:30 PM',
      description:
        'Explore Jagdish Temple and Udaipur City Palace, stroll through Saheliyon-Ki-Bari, browse miniature painting galleries, and enjoy a tuk-tuk ride to Bagore Ki Haveli for a Dharohar folk performance.',
      imageUrl: 'https://images.pexels.com/photos/19867662/pexels-photo-19867662.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 24.5854,
      lng: 73.7125,
    },
    {
      name: 'Udaipur to Deogarh via Ranakpur',
      time: 'Day 5 · 8:00 AM - 7:30 PM',
      description:
        'Drive through the Aravalli Range to Ranakpur Jain Temple before continuing to Deogarh for a royal stay at a heritage palace hotel.',
      imageUrl: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 25.1145,
      lng: 73.4742,
    },
    {
      name: 'Deogarh to Jaipur',
      time: 'Day 6 · 7:30 AM - 7:00 PM',
      description:
        'Start with a guided village walk in Deogarh, meeting local artisans and farmers, then continue by private vehicle to Jaipur and relax at your resort hotel.',
      imageUrl: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.9124,
      lng: 75.7873,
    },
    {
      name: 'Holi in Jaipur',
      time: 'Day 7 · 10:00 AM - 8:00 PM',
      description:
        'Join a joyful Holi celebration in Jaipur with colors, music, a festive private feast, and a relaxed evening back at the hotel.',
      imageUrl: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.9124,
      lng: 75.7873,
    },
    {
      name: 'Jaipur Forts & Palaces',
      time: 'Day 8 · 8:30 AM - 7:30 PM',
      description:
        'Visit Amber Fort, the City Palace, Jantar Mantar, and Hawa Mahal, then stop at local textile and craft studios for block printing and carpet weaving demonstrations.',
      imageUrl: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.9855,
      lng: 75.8513,
    },
    {
      name: 'Jaipur to Agra',
      time: 'Day 9 · 8:00 AM - 7:30 PM',
      description:
        'Travel to Agra, stopping at Chand Baori stepwell and Fatehpur Sikri before checking in for an evening rooftop dinner.',
      imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 27.0937,
      lng: 77.6601,
    },
    {
      name: 'Taj Mahal & Agra Fort',
      time: 'Day 10 · 5:45 AM - 8:00 PM',
      description:
        'See the Taj Mahal at sunrise, rest after breakfast, visit Agra Fort, and finish with a marble inlay workshop and Mughlai dinner.',
      imageUrl: 'https://images.pexels.com/photos/262780/pexels-photo-262780.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 27.1751,
      lng: 78.0421,
    },
    {
      name: 'Agra to Delhi Departure',
      time: 'Day 11 · 9:00 AM - 9:30 PM',
      description:
        'Drive back to Delhi on the Yamuna Expressway, stop for refreshments, enjoy a farewell dinner, and transfer to Indira Gandhi International Airport.',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.5562,
      lng: 77.1,
    },
  ],
  includes: [
    '10 nights accommodation in handpicked hotels and heritage stays',
    'Daily breakfast and dinners as outlined in the itinerary',
    'Private airport transfers and private air-conditioned vehicle throughout',
    'Delhi to Udaipur domestic flight',
    'Delhi sightseeing with rickshaw ride in Chandni Chowk',
    'Sunset cruise on Lake Pichola',
    'Interactive Rajasthani cooking demonstration in Udaipur',
    'Ranakpur Jain Temple visit',
    'Guided rural village walk in Deogarh',
    'Holi celebration with festive lunch and cultural hosting in Jaipur',
    'Amber Fort, City Palace, Jantar Mantar, Hawa Mahal, Fatehpur Sikri, Agra Fort, and Taj Mahal sightseeing',
    'All applicable taxes',
  ],
  excludes: [
    'International flights',
    'Lunches unless otherwise stated',
    'Travel insurance',
    'Visa fees',
    'Personal expenses and shopping',
    'Optional Ayurvedic wellness massage in Jaipur',
    'Tips and gratuities',
  ],
  accommodations: [
    {
      name: 'The Claridges New Delhi',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      location: 'Lutyens Delhi, New Delhi',
    },
    {
      name: 'Trident Udaipur',
      imageUrl: 'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'Lake Pichola, Udaipur',
    },
    {
      name: 'Deogarh Mahal',
      imageUrl: 'https://images.pexels.com/photos/19867662/pexels-photo-19867662.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.6,
      location: 'Deogarh, Rajasthan',
    },
    {
      name: 'Samode Haveli',
      imageUrl: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'Pink City, Jaipur',
    },
    {
      name: 'ITC Mughal',
      imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      location: 'Taj Ganj, Agra',
    },
  ],
  map: { lat: 26.2884, lng: 75.9852 },
  reviews: createDefaultReviews([
    {
      title: 'Holi and heritage done beautifully',
      content: 'The Holi celebration in Jaipur felt joyful and safe, and the Udaipur-Deogarh section was unforgettable.',
    },
  ]),
}
