import type { ItineraryDetail } from '../types'
import { createItineraryDuration } from '../duration'
import { createDefaultReviews, createItineraryLocations, createItineraryPricing } from './_shared'

const duration = createItineraryDuration(13, 12)

export const desertDunesToRoyalPalaces: ItineraryDetail = {
  id: 'itinerary://desert-dunes-to-royal-palaces',
  handle: 'desert-dunes-to-royal-palaces',
  title: 'Desert Dunes to Royal Palaces',
  badge: 'Luxury Trail',
  destination: 'india',
  address: 'Delhi · Jaisalmer · Dechu · Jodhpur · Jawai · Udaipur · Deogarh · Jaipur · Agra',
  locations: createItineraryLocations([
    { name: 'Delhi', lat: 28.6139, lng: 77.209 },
    { name: 'Jaisalmer', lat: 26.9157, lng: 70.9083 },
    { name: 'Dechu', lat: 26.9728, lng: 72.3569 },
    { name: 'Jodhpur', lat: 26.2389, lng: 73.0243 },
    { name: 'Jawai', lat: 25.0972, lng: 73.1537 },
    { name: 'Udaipur', lat: 24.5854, lng: 73.7125 },
    { name: 'Deogarh', lat: 25.533, lng: 73.907 },
    { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
    { name: 'Agra', lat: 27.1767, lng: 78.0081 },
  ]),
  reviewStart: 4.9,
  reviewCount: 96,
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
    'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'UserMultipleIcon', text: 'Private escorted route' },
    { icon: 'BedSingle02Icon', text: 'Desert camps & palace hotels' },
    { icon: 'ChefHatIcon', text: 'Breakfast & dinners' },
  ],
  pricing: createItineraryPricing(4799, 5499, { priceLabel: 'per person twin share' }),
  description:
    'A grand Rajasthan circuit that moves from the golden lanes of Jaisalmer to desert dunes in Dechu, the blue city of Jodhpur, leopard country in Jawai, lakeside Udaipur, palace Deogarh, Jaipur, and Agra for the Taj Mahal.\n\nAll day-by-day touring is based on the provided PDF. Site-only fields such as imagery, pricing, hotels, and review data were generated to feel consistent with the route and the existing website template.',
  thingsToDo: [
    {
      name: 'Welcome to Delhi',
      time: 'Day 1 · 2:00 PM - 9:00 PM',
      description:
        'Arrive in Delhi, meet your private driver, transfer to the hotel, and unwind after your international flight.',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.6139,
      lng: 77.209,
    },
    {
      name: 'Flight to Jaisalmer',
      time: 'Day 2 · 8:00 AM - 8:00 PM',
      description:
        'Fly west to Jaisalmer, settle into your hotel, and enjoy an evening stroll through the golden sandstone lanes followed by rooftop dinner views of the fort.',
      imageUrl: 'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.9157,
      lng: 70.9083,
    },
    {
      name: 'Jaisalmer Fort to Dechu',
      time: 'Day 3 · 8:30 AM - 9:00 PM',
      description:
        'Explore Jaisalmer Fort and Patwon Ki Haveli, then drive into the desert to Dechu for a sunset camel ride, folk dance performance, and starlit dinner.',
      imageUrl: 'https://images.pexels.com/photos/19867662/pexels-photo-19867662.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.9728,
      lng: 72.3569,
    },
    {
      name: 'Dechu to Jodhpur',
      time: 'Day 4 · 7:30 AM - 8:00 PM',
      description:
        'Watch sunrise over the dunes, then continue to Jodhpur for visits to Mehrangarh Fort, Jaswant Thada, and the lively Clock Tower market.',
      imageUrl: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.2987,
      lng: 73.0185,
    },
    {
      name: 'Jodhpur to Jawai',
      time: 'Day 5 · 8:00 AM - 8:00 PM',
      description:
        'Drive into Jawai\'s granite wilderness, check into camp, and head out on an open-top jeep safari in search of leopards at sunset.',
      imageUrl: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 25.0972,
      lng: 73.1537,
    },
    {
      name: 'Jawai to Udaipur via Ranakpur',
      time: 'Day 6 · 8:00 AM - 7:30 PM',
      description:
        'Leave Jawai for Udaipur, stopping at the Ranakpur Jain Temple before ending the day with a peaceful sunset cruise on Lake Pichola.',
      imageUrl: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 24.576,
      lng: 73.6831,
    },
    {
      name: 'Udaipur Heritage Tour',
      time: 'Day 7 · 9:00 AM - 8:00 PM',
      description:
        'Visit Udaipur City Palace and Jagdish Temple, stroll through Saheliyon-Ki-Bari, enjoy a miniature painting studio visit, and attend the Dharohar folk dance performance at Bagore Ki Haveli.',
      imageUrl: 'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 24.5854,
      lng: 73.7125,
    },
    {
      name: 'Drive to Deogarh',
      time: 'Day 8 · 9:00 AM - 6:30 PM',
      description:
        'Travel north to Deogarh Mahal, settle into the palace, and join a guided village walk through rural Rajasthan.',
      imageUrl: 'https://images.pexels.com/photos/19867662/pexels-photo-19867662.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 25.533,
      lng: 73.907,
    },
    {
      name: 'Deogarh to Jaipur',
      time: 'Day 9 · 8:00 AM - 7:00 PM',
      description:
        'Optional vintage metre-gauge train ride in the morning before the overland journey to Jaipur and an easy evening at your resort.',
      imageUrl: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.9124,
      lng: 75.7873,
    },
    {
      name: 'Jaipur Forts & Markets',
      time: 'Day 10 · 8:30 AM - 7:30 PM',
      description:
        'Visit Amber Fort, the City Palace, Jantar Mantar, and Hawa Mahal, then join a hands-on block printing or carpet weaving workshop.',
      imageUrl: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 26.9855,
      lng: 75.8513,
    },
    {
      name: 'Jaipur to Agra',
      time: 'Day 11 · 8:00 AM - 7:30 PM',
      description:
        'Travel east with stops at Chand Baori and Fatehpur Sikri before arriving in Agra for an evening rooftop dinner.',
      imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 27.0937,
      lng: 77.6601,
    },
    {
      name: 'Agra Monuments',
      time: 'Day 12 · 5:45 AM - 8:00 PM',
      description:
        'See the Taj Mahal at sunrise, tour Agra Fort later in the day, and head to Mehtab Bagh for sunset views across the Yamuna River.',
      imageUrl: 'https://images.pexels.com/photos/262780/pexels-photo-262780.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 27.1751,
      lng: 78.0421,
    },
    {
      name: 'Return to Delhi',
      time: 'Day 13 · 9:00 AM - 9:30 PM',
      description:
        'Visit a marble inlay workshop in Agra, drive back to Delhi on the expressway, enjoy a farewell dinner, and transfer to the airport.',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 28.5562,
      lng: 77.1,
    },
  ],
  includes: [
    '12 nights accommodation across hotels, palace estates, and a wilderness camp',
    'Daily breakfast and dinners',
    'Private airport transfers and private air-conditioned vehicle throughout',
    'Delhi to Jaisalmer domestic flight',
    'Jaisalmer Fort and Patwon Ki Haveli sightseeing',
    'Desert camel ride and folk dance evening in Dechu',
    'Mehrangarh Fort and Jaswant Thada visit in Jodhpur',
    'Jawai jeep safari',
    'Ranakpur Jain Temple visit',
    'Lake Pichola sunset cruise',
    'Udaipur heritage touring and Bagore Ki Haveli show',
    'Deogarh heritage stay and guided village walk',
    'Jaipur and Agra monument touring',
    'All applicable taxes',
  ],
  excludes: [
    'International flights',
    'Lunches unless otherwise stated',
    'Travel insurance',
    'Visa fees',
    'Personal expenses and shopping',
    'Optional nature walk in Jawai',
    'Optional vintage train ride in Deogarh',
    'Tips and gratuities',
  ],
  accommodations: [
    {
      name: 'Suryagarh Jaisalmer',
      imageUrl: 'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'Jaisalmer, Rajasthan',
    },
    {
      name: 'Samsara Resort & Camp',
      imageUrl: 'https://images.pexels.com/photos/19867662/pexels-photo-19867662.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      location: 'Dechu Desert, Rajasthan',
    },
    {
      name: 'RAAS Jodhpur',
      imageUrl: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'Old City, Jodhpur',
    },
    {
      name: 'Jawai Leopard Camp',
      imageUrl: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      location: 'Jawai Bandh, Rajasthan',
    },
    {
      name: 'The Leela Palace Udaipur',
      imageUrl: 'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      location: 'Lake Pichola, Udaipur',
    },
  ],
  map: { lat: 25.8591, lng: 74.6065 },
  reviews: createDefaultReviews([
    {
      title: 'Epic Rajasthan circuit',
      content: 'We loved the contrast between Jaisalmer, Jawai, Udaipur, and Jaipur. The desert camp and leopard safari were highlights.',
    },
  ]),
}
