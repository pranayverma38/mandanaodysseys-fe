import type { ItineraryDetail } from '../types'
import { createItineraryDuration } from '../duration'
import { createDefaultReviews, createItineraryLocations, createItineraryPricing } from './_shared'

const duration = createItineraryDuration(9, 8)

export const goldenTriangleAndShekhawati: ItineraryDetail = {
  id: 'itinerary://golden-triangle-and-shekhawati',
  handle: 'golden-triangle-and-shekhawati',
  title: 'Colours of India: Golden Triangle & Shekhawati',
  badge: 'Heritage',
  destination: 'india',
  address: 'Delhi · Mandawa · Jaipur · Agra',
  locations: createItineraryLocations([
    { name: 'Delhi', lat: 28.6139, lng: 77.209 },
    { name: 'Mandawa', lat: 28.0556, lng: 75.1496 },
    { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
    { name: 'Agra', lat: 27.1767, lng: 78.0081 },
  ]),
  reviewStart: 4.8,
  reviewCount: 118,
  categories: [
    { category: 'group-tours' },
    { category: 'customized-holidays' },
    { category: 'luxury-escapes' },
  ],
  duration,
  mobility: 'Easy',
  featuredImage: 'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/19867662/pexels-photo-19867662.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'UserMultipleIcon', text: 'Private chauffeur-guided tour' },
    { icon: 'BedSingle02Icon', text: 'Boutique heritage hotels' },
    { icon: 'ChefHatIcon', text: 'Breakfast & dinners' },
  ],
  pricing: createItineraryPricing(2699, 3199, { priceLabel: 'per person twin share' }),
  description:
    'This classic North India route pairs Delhi, Mandawa in the Shekhawati region, Jaipur, and Agra to showcase Mughal monuments, painted havelis, royal palaces, artisan traditions, and the Taj Mahal.\n\nThe day plan comes directly from the provided PDF, while website-specific assets such as images, accommodations, pricing, and review signals were generated to match the tone and structure of the existing itinerary catalog.',
  thingsToDo: [
    {
      name: 'Arrival in Delhi',
      time: 'Day 1 · 5:00 PM - 10:00 PM',
      description:
        'Arrive in New Delhi, meet your English-speaking escort and private chauffeur, and transfer to your hotel for check-in and rest.',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.6139,
      lng: 77.209,
    },
    {
      name: 'Old & New Delhi Exploration',
      time: 'Day 2 · 8:30 AM - 6:30 PM',
      description:
        'Visit Jama Masjid, ride through Chandni Chowk, then explore Humayun\'s Tomb and Qutub Minar before a drive past India Gate, Parliament House, and Rashtrapati Bhavan.',
      imageUrl: 'https://images.pexels.com/photos/3761124/pexels-photo-3761124.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.5933,
      lng: 77.2507,
    },
    {
      name: 'Delhi to Mandawa',
      time: 'Day 3 · 8:00 AM - 7:00 PM',
      description:
        'Drive into Shekhawati to Mandawa, check into a heritage mansion, and explore painted havelis including Murmuria Haveli and Jhunjhunwala Haveli.',
      imageUrl: 'https://images.pexels.com/photos/19867662/pexels-photo-19867662.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.0556,
      lng: 75.1496,
    },
    {
      name: 'Mandawa to Jaipur',
      time: 'Day 4 · 9:00 AM - 7:30 PM',
      description:
        'Travel to Jaipur, visit the City Palace Museum and Peacock Gate, explore Jantar Mantar, and stop at artisan workshops for block printing and gemstone cutting demonstrations.',
      imageUrl: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.9239,
      lng: 75.8267,
    },
    {
      name: 'Jaipur Heritage & Wellness',
      time: 'Day 5 · 8:30 AM - 8:30 PM',
      description:
        'Start at Hawa Mahal, continue to Amber Fort and Sheesh Mahal, then enjoy a relaxed afternoon and a traditional Ayurvedic Abhyanga massage in the evening.',
      imageUrl: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.9855,
      lng: 75.8513,
    },
    {
      name: 'Jaipur to Agra',
      time: 'Day 6 · 8:00 AM - 7:30 PM',
      description:
        'Drive to Agra with stops at Chand Baori stepwell and Fatehpur Sikri, then check in and relax at your hotel.',
      imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 27.0937,
      lng: 77.6601,
    },
    {
      name: 'Taj Mahal & Agra Fort',
      time: 'Day 7 · 5:45 AM - 7:30 PM',
      description:
        'Visit the Taj Mahal at sunrise, tour Agra Fort in the afternoon, and end with sunset views of the Taj from Mehtab Bagh.',
      imageUrl: 'https://images.pexels.com/photos/262780/pexels-photo-262780.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 27.1751,
      lng: 78.0421,
    },
    {
      name: 'Agra to Delhi',
      time: 'Day 8 · 9:00 AM - 7:30 PM',
      description:
        'Visit a private Pietra Dura marble inlay workshop, then return to Delhi via the Yamuna Expressway for free time and a final evening at leisure.',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.6139,
      lng: 77.209,
    },
    {
      name: 'Delhi Departure',
      time: 'Day 9 · 8:00 AM - 1:00 PM',
      description:
        'Enjoy breakfast and a private transfer back to the airport for your onward flight.',
      imageUrl: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.5562,
      lng: 77.1,
    },
  ],
  includes: [
    '8 nights accommodation in boutique and heritage hotels',
    'Daily breakfast and dinners',
    'Private airport transfers and private air-conditioned vehicle throughout',
    'Delhi guided sightseeing with rickshaw ride in Old Delhi',
    'Mandawa haveli walking tour',
    'Jaipur palace, fort, observatory, and artisan workshop visits',
    '60-minute Ayurvedic massage in Jaipur',
    'Chand Baori and Fatehpur Sikri en route touring',
    'Sunrise Taj Mahal visit and Agra Fort touring',
    'Pietra Dura marble inlay workshop visit',
    'All applicable taxes',
  ],
  excludes: [
    'International flights',
    'Lunches unless otherwise stated',
    'Travel insurance',
    'Visa fees',
    'Personal expenses and shopping',
    'Optional photography fees at monuments',
    'Tips and gratuities',
  ],
  accommodations: [
    {
      name: 'The Imperial New Delhi',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'Connaught Place, New Delhi',
    },
    {
      name: 'Mandawa Castle',
      imageUrl: 'https://images.pexels.com/photos/19867662/pexels-photo-19867662.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.5,
      location: 'Mandawa, Shekhawati',
    },
    {
      name: 'Alsisar Haveli',
      imageUrl: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.6,
      location: 'Old Jaipur, Rajasthan',
    },
    {
      name: 'Trident Agra',
      imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      location: 'Fatehabad Road, Agra',
    },
  ],
  map: { lat: 27.6897, lng: 76.0292 },
  reviews: createDefaultReviews([
    {
      title: 'Excellent cultural route',
      content: 'Mandawa was a standout surprise, and the Delhi-Jaipur-Agra flow made the trip feel rich without being rushed.',
    },
  ]),
}
