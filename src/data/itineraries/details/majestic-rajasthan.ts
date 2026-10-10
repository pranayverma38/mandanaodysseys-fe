import type { ItineraryDetail } from '../types'
import { createItineraryDuration } from '../duration'
import { createDefaultReviews, createItineraryLocations, createItineraryPricing } from './_shared'

const duration = createItineraryDuration(11, 10)

export const majesticRajasthan: ItineraryDetail = {
  id: 'itinerary://majestic-rajasthan',
  handle: 'majestic-rajasthan',
  title: 'Majestic Rajasthan',
  badge: 'Royal Escape',
  destination: 'india',
  address: 'Delhi · Jodhpur · Jawai · Udaipur · Chittorgarh · Bijaipur · Jaipur · Agra',
  locations: createItineraryLocations([
    { name: 'Delhi', lat: 28.6139, lng: 77.209 },
    { name: 'Jodhpur', lat: 26.2389, lng: 73.0243 },
    { name: 'Jawai', lat: 25.0972, lng: 73.1537 },
    { name: 'Udaipur', lat: 24.5854, lng: 73.7125 },
    { name: 'Chittorgarh', lat: 24.8887, lng: 74.6269 },
    { name: 'Bijaipur', lat: 24.9231, lng: 74.0082 },
    { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
    { name: 'Agra', lat: 27.1767, lng: 78.0081 },
  ]),
  reviewStart: 4.9,
  reviewCount: 109,
  categories: [
    { category: 'luxury-escapes' },
    { category: 'wildlife-safaris' },
    { category: 'customized-holidays' },
  ],
  duration,
  mobility: 'Moderate',
  featuredImage: 'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/19867662/pexels-photo-19867662.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'UserMultipleIcon', text: 'Privately guided route' },
    { icon: 'BedSingle02Icon', text: 'Palaces, lodges & boutique hotels' },
    { icon: 'ChefHatIcon', text: 'Breakfast & dinners' },
  ],
  pricing: createItineraryPricing(4199, 4799, { priceLabel: 'per person twin share' }),
  description:
    'A regal Rajasthan itinerary spanning Jodhpur, Jawai, Udaipur, Chittorgarh, Bijaipur, Jaipur, and Agra, designed around forts, palaces, artisan culture, and a wildlife-rich interlude in Jawai.\n\nThe daily route and touring are drawn from your PDF. Fields required by the website but not present in the PDF, including image selections, hotel pairings, pricing, and review summaries, were generated to feel realistic and on-brand.',
  thingsToDo: [
    {
      name: 'Welcome to Delhi',
      time: 'Day 1 · 3:00 PM - 9:00 PM',
      description:
        'Arrive in Delhi, meet your representative, and transfer to the hotel for check-in and relaxation.',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.6139,
      lng: 77.209,
    },
    {
      name: 'Delhi to Jodhpur',
      time: 'Day 2 · 8:00 AM - 8:00 PM',
      description:
        'Fly to Jodhpur, receive a traditional welcome, and tour Mehrangarh Fort, Jaswant Thada, and Sardar Market before dinner.',
      imageUrl: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.2987,
      lng: 73.0185,
    },
    {
      name: 'Jodhpur to Jawai',
      time: 'Day 3 · 8:00 AM - 7:00 PM',
      description:
        'Drive to Jawai via Ranakpur Jain Temple, then check into your eco-luxury lodge in time for a relaxed evening in the wilderness.',
      imageUrl: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 25.0972,
      lng: 73.1537,
    },
    {
      name: 'Jawai to Udaipur',
      time: 'Day 4 · 6:00 AM - 8:00 PM',
      description:
        'Start with an early-morning leopard safari in Jawai, then continue to Udaipur for a local family cooking demonstration and a sunset Lake Pichola cruise.',
      imageUrl: 'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 24.576,
      lng: 73.6831,
    },
    {
      name: 'Explore Udaipur',
      time: 'Day 5 · 9:00 AM - 7:30 PM',
      description:
        'Visit Jagdish Temple and City Palace, explore miniature painting traditions, and enjoy a tuk-tuk ride through old Udaipur.',
      imageUrl: 'https://images.pexels.com/photos/19867662/pexels-photo-19867662.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 24.5854,
      lng: 73.7125,
    },
    {
      name: 'Udaipur to Bijaipur via Chittorgarh',
      time: 'Day 6 · 8:00 AM - 7:30 PM',
      description:
        'Drive to Chittorgarh Fort, touring Vijay Stambha, Rana Kumbha Palace, and Padmini Palace, then continue to Castle Bijaipur.',
      imageUrl: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 24.8887,
      lng: 74.6269,
    },
    {
      name: 'Bijaipur to Jaipur',
      time: 'Day 7 · 8:30 AM - 7:30 PM',
      description:
        'Drive through rural Rajasthan to Jaipur, settle into your hotel, and spend the evening exploring the walled-city bazaars.',
      imageUrl: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.9124,
      lng: 75.7873,
    },
    {
      name: 'Discover Jaipur',
      time: 'Day 8 · 8:30 AM - 7:30 PM',
      description:
        'Visit Hawa Mahal, Amber Fort, City Palace, and Jantar Mantar, then watch live demonstrations of block printing, gemstone cutting, and carpet weaving.',
      imageUrl: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.9855,
      lng: 75.8513,
    },
    {
      name: 'Jaipur to Agra',
      time: 'Day 9 · 8:00 AM - 7:00 PM',
      description:
        'Drive east to Agra, check into your hotel, and visit Agra Fort for an introduction to Mughal history.',
      imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 27.1795,
      lng: 78.0211,
    },
    {
      name: 'Taj Mahal & Delhi Return',
      time: 'Day 10 · 5:45 AM - 8:30 PM',
      description:
        'Witness the Taj Mahal at sunrise, visit a Pietra Dura workshop, drive to Delhi, and enjoy a special farewell dinner.',
      imageUrl: 'https://images.pexels.com/photos/262780/pexels-photo-262780.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 27.1751,
      lng: 78.0421,
    },
    {
      name: 'Depart Delhi',
      time: 'Day 11 · 8:00 AM - 12:00 PM',
      description:
        'Enjoy breakfast and a private transfer to the airport for your flight home.',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.5562,
      lng: 77.1,
    },
  ],
  includes: [
    '10 nights accommodation in luxury hotels, safari lodge, and heritage palaces',
    'Daily breakfast and dinners',
    'Private airport transfers and private air-conditioned vehicle throughout',
    'Delhi to Jodhpur domestic flight',
    'Mehrangarh Fort, Jaswant Thada, and Sardar Market touring',
    'Ranakpur Jain Temple stop',
    'Jawai leopard safari',
    'Udaipur cooking demonstration and Lake Pichola cruise',
    'Udaipur, Chittorgarh, Jaipur, and Agra guided sightseeing',
    'Pietra Dura marble inlay workshop visit',
    'Sunrise Taj Mahal visit',
    'All applicable taxes',
  ],
  excludes: [
    'International flights',
    'Lunches unless otherwise stated',
    'Travel insurance',
    'Visa fees',
    'Optional spa and wellness treatments',
    'Personal expenses and shopping',
    'Tips and gratuities',
  ],
  accommodations: [
    {
      name: 'RAAS Jodhpur',
      imageUrl: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'Old City, Jodhpur',
    },
    {
      name: 'Sujan Jawai',
      imageUrl: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      location: 'Jawai Bandh, Rajasthan',
    },
    {
      name: 'The Oberoi Udaivilas',
      imageUrl: 'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      location: 'Lake Pichola, Udaipur',
    },
    {
      name: 'Castle Bijaipur',
      imageUrl: 'https://images.pexels.com/photos/19867662/pexels-photo-19867662.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.6,
      location: 'Bijaipur, Rajasthan',
    },
    {
      name: 'Rambagh Palace',
      imageUrl: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      location: 'Jaipur, Rajasthan',
    },
  ],
  map: { lat: 25.9334, lng: 75.0822 },
  reviews: createDefaultReviews([
    {
      title: 'Truly majestic route',
      content: 'The pace felt luxurious, and the mix of Jawai wildlife, Udaipur elegance, and Jaipur heritage made this feel like a complete Rajasthan journey.',
    },
  ]),
}
