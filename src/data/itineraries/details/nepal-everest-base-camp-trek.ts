import type { ItineraryDetail } from '../types'
import { createItineraryDuration } from '../duration'
import { createDefaultReviews } from './_shared'

const duration = createItineraryDuration(12, 11)

export const nepalEverestBaseCampTrek: ItineraryDetail = {
  id: 'itinerary://nepal-everest-base-camp-trek',
  handle: 'nepal-everest-base-camp-trek',
  title: 'Everest Base Camp Trek',
  badge: 'Adventure',
  destination: 'nepal',
  address: 'Kathmandu · Lukla · Namche Bazaar · Everest Base Camp',
  reviewStart: 4.9,
  reviewCount: 142,
  categories: [
    { category: 'mountain-and-hill-station-tours' },
    { category: 'wildlife-safaris' },
    { category: 'solo-traveler-packages' },
    { category: 'customized-holidays' },
  ],
  duration,
  featuredImage: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'Clock01Icon', text: duration.label },
    { icon: 'MountainIcon', text: 'Guided trekking' },
    { icon: 'UserMultipleIcon', text: 'Small group' },
    { icon: 'ChefHatIcon', text: 'Teahouse meals' },
  ],
  pricing: {
    price: '$2,199',
    originalPrice: '$2,599',
    feeAndTaxes: '$145',
    total: '$2,344',
    priceLabel: ' / person',
  },
  description:
    'Trek through Sherpa villages, suspension bridges, and rhododendron forests to the foot of the world\'s highest peak. This 12-day adventure includes acclimatisation days, experienced guides, and porter support throughout the Khumbu Valley.',
  thingsToDo: [
    {
      name: 'Kathmandu Arrival & Briefing',
      time: 'Day 1 · All day',
      description: 'Arrive in Kathmandu, gear check, and welcome briefing before your mountain flight to Lukla.',
      imageUrl: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Lukla to Namche Bazaar',
      time: 'Day 2–3 · 6–7 hrs daily',
      description: 'Scenic trek through Phakding and cross the Dudh Koshi river en route to Namche Bazaar.',
      imageUrl: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Acclimatisation at Namche',
      time: 'Day 4 · 4–5 hrs',
      description: 'Hike to Everest View Hotel for panoramic views of Ama Dablam and Everest.',
      imageUrl: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Everest Base Camp',
      time: 'Day 9 · 7–8 hrs',
      description: 'Reach Everest Base Camp at 5,364 m and celebrate with your trekking team.',
      imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  includes: [
    '11 nights teahouse and hotel accommodation',
    'Licensed English-speaking trekking guide',
    'Porter support (1 porter per 2 trekkers)',
    'Kathmandu–Lukla round-trip flights',
    'Sagarmatha National Park permits',
    'All meals on trek',
    'All applicable taxes',
  ],
  excludes: [
    'International flights',
    'Travel insurance (high-altitude cover required)',
    'Personal trekking gear',
    'Tips for guides and porters',
    'Meals in Kathmandu (except breakfast)',
    'Emergency helicopter evacuation',
  ],
  accommodations: [
    {
      name: 'Hyatt Regency Kathmandu',
      imageUrl: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      location: 'Kathmandu, Nepal',
    },
    {
      name: 'Namche Boutique Lodge',
      imageUrl: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.4,
      location: 'Namche Bazaar, Nepal',
    },
  ],
  map: { lat: 27.9881, lng: 86.925 },
  reviews: createDefaultReviews([
    {
      title: 'Life-changing trek',
      content: 'Our guide was incredible and the Base Camp sunrise made every step worth it.',
    },
  ]),
}
