import type { ItineraryDetail } from '../types'
import { createItineraryDuration } from '../duration'
import { createDefaultReviews, createItineraryLocations, createItineraryPricing } from './_shared'

const duration = createItineraryDuration(8, 7)

export const heritageAndTheGanges: ItineraryDetail = {
  id: 'itinerary://heritage-and-the-ganges',
  handle: 'heritage-and-the-ganges',
  title: 'Colours of India: Heritage & The Ganges',
  badge: 'Soulful Journey',
  destination: 'india',
  address: 'Delhi · Rishikesh · Haridwar · Jaipur · Agra',
  locations: createItineraryLocations([
    { name: 'Delhi', lat: 28.6139, lng: 77.209 },
    { name: 'Rishikesh', lat: 30.0869, lng: 78.2676 },
    { name: 'Haridwar', lat: 29.9457, lng: 78.1642 },
    { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
    { name: 'Agra', lat: 27.1767, lng: 78.0081 },
  ]),
  reviewStart: 4.8,
  reviewCount: 74,
  categories: [
    { category: 'customized-holidays' },
    { category: 'luxury-escapes' },
    { category: 'group-tours' },
  ],
  duration,
  mobility: 'Light Activity',
  featuredImage: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'UserMultipleIcon', text: 'Private cultural touring' },
    { icon: 'BedSingle02Icon', text: 'Riverside and city stays' },
    { icon: 'ChefHatIcon', text: 'Daily breakfast' },
  ],
  pricing: createItineraryPricing(2399, 2899, { priceLabel: 'per person twin share' }),
  description:
    'This itinerary weaves together Delhi heritage, spiritual time in Rishikesh and Haridwar, royal Jaipur, and the iconic finale of Agra and the Taj Mahal. It balances light wellness, sacred river experiences, and classic North India highlights.\n\nThe route and sightseeing sequence come from the PDF provided by you. Images, pricing, review data, and hotel selections were generated to suit the website\'s `ItineraryDetail` template while keeping the itinerary believable and cohesive.',
  thingsToDo: [
    {
      name: 'Welcome to Delhi',
      time: 'Day 1 · 3:00 PM - 9:00 PM',
      description:
        'Arrive in Delhi, meet your private chauffeur and representative, and transfer to your hotel for orientation and rest.',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.6139,
      lng: 77.209,
    },
    {
      name: 'Delhi to Rishikesh',
      time: 'Day 2 · 6:30 AM - 8:00 PM',
      description:
        'Drive to Rishikesh, explore The Beatles Ashram, and spend the evening around Ram Jhula and Swarg Ashram on the Ganges.',
      imageUrl: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 30.1233,
      lng: 78.3211,
    },
    {
      name: 'Yoga Retreat & Haridwar',
      time: 'Day 3 · 6:00 AM - 8:00 PM',
      description:
        'Begin with sunrise yoga and meditation by the river, then visit Har Ki Pauri in Haridwar before returning for the evening Ganga Aarti at Parmarth Niketan.',
      imageUrl: 'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 29.9591,
      lng: 78.173,
    },
    {
      name: 'Rishikesh to Delhi',
      time: 'Day 4 · 8:00 AM - 8:00 PM',
      description:
        'Drive back to Delhi, visit Humayun\'s Tomb on arrival, and enjoy a scenic drive past India Gate, Rashtrapati Bhavan, and Parliament House.',
      imageUrl: 'https://images.pexels.com/photos/3761124/pexels-photo-3761124.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.5933,
      lng: 77.2507,
    },
    {
      name: 'Delhi to Jaipur',
      time: 'Day 5 · 8:00 AM - 7:30 PM',
      description:
        'Drive to Jaipur, check in, and explore City Palace, Jantar Mantar, and local workshops showcasing block printing and gemstone cutting.',
      imageUrl: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.9239,
      lng: 75.8267,
    },
    {
      name: 'Jaipur Sightseeing',
      time: 'Day 6 · 8:30 AM - 7:00 PM',
      description:
        'Ride up to Amber Fort, explore Sheesh Mahal, stop at Hawa Mahal, and enjoy evening views of Jal Mahal before returning to the hotel.',
      imageUrl: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.9855,
      lng: 75.8513,
    },
    {
      name: 'Jaipur to Agra',
      time: 'Day 7 · 8:00 AM - 7:30 PM',
      description:
        'Drive through Rajasthan to Agra, stopping at Chand Baori, then check in and visit Agra Fort for a UNESCO-rich afternoon.',
      imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 27.1795,
      lng: 78.0211,
    },
    {
      name: 'Taj Mahal & Airport Transfer',
      time: 'Day 8 · 5:45 AM - 7:30 PM',
      description:
        'Experience the Taj Mahal at sunrise, return for breakfast, then drive to Delhi Airport on the Yamuna Expressway for your onward flight.',
      imageUrl: 'https://images.pexels.com/photos/262780/pexels-photo-262780.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 27.1751,
      lng: 78.0421,
    },
  ],
  includes: [
    '7 nights accommodation in hotels and a riverside retreat',
    'Daily breakfast',
    'Private airport transfers and private air-conditioned vehicle throughout',
    'Rishikesh and Haridwar touring',
    'Sunrise yoga and meditation session in Rishikesh',
    'Parmarth Niketan Ganga Aarti experience',
    'Delhi, Jaipur, and Agra guided sightseeing',
    'Amber Fort and Agra Fort entry touring',
    'Sunrise Taj Mahal visit',
    'All applicable taxes',
  ],
  excludes: [
    'International flights',
    'Lunches and dinners unless otherwise stated',
    'Travel insurance',
    'Visa fees',
    'Cable car tickets to Mansa Devi Temple',
    'Optional wellness treatments',
    'Personal expenses',
    'Tips and gratuities',
  ],
  accommodations: [
    {
      name: 'The Lodhi',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'New Delhi, India',
    },
    {
      name: 'Aloha on the Ganges',
      imageUrl: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.6,
      location: 'Tapovan, Rishikesh',
    },
    {
      name: 'Taj Jai Mahal Palace',
      imageUrl: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      location: 'Civil Lines, Jaipur',
    },
    {
      name: 'Courtyard by Marriott Agra',
      imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.6,
      location: 'Taj Nagri, Agra',
    },
  ],
  map: { lat: 28.1594, lng: 77.3667 },
  reviews: createDefaultReviews([
    {
      title: 'Beautiful balance of culture and calm',
      content: 'Rishikesh added a peaceful dimension to the classic Delhi-Jaipur-Agra circuit, and the Ganga Aarti was unforgettable.',
    },
  ]),
}
