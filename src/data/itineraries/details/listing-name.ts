import type { ItineraryDetail } from '../types'
import { createDefaultReviews } from './_shared'

export const listingNameItinerary: ItineraryDetail = {
  id: 'itinerary://listing-name',
  handle: 'listing-name',
  title: '7-Day London & Paris Explorer',
  badge: 'Best Seller',
  address: 'London, United Kingdom · Paris, France',
  reviewStart: 4.9,
  reviewCount: 312,
  categories: [
    { category: 'international', subCategory: 'europe-tours' },
    { category: 'international', subCategory: 'group-tours' },
  ],
  featuredImage: 'https://images.pexels.com/photos/4348078/pexels-photo-4348078.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/4348078/pexels-photo-4348078.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/4706134/pexels-photo-4706134.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3825578/pexels-photo-3825578.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/8926846/pexels-photo-8926846.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/7003624/pexels-photo-7003624.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'Clock01Icon', text: '7 days' },
    { icon: 'UserMultipleIcon', text: 'Small group' },
    { icon: 'ChefHatIcon', text: 'Breakfast included' },
  ],
  pricing: {
    price: '$1,899',
    originalPrice: '$2,199',
    feeAndTaxes: '$120',
    total: '$2,019',
  },
  description:
    "See over 30 London and Paris sights across seven days. Your fun local guides will make sure you don't miss the history, culture, and legends of Europe's best-loved cities.",
  thingsToDo: [
    {
      name: 'The Ritz London',
      time: 'Day 1 · 7:30 AM - 8:00 AM',
      description: 'Your friendly local London guide will meet you at The Ritz.',
      imageUrl: 'https://images.pexels.com/photos/7245327/pexels-photo-7245327.jpeg',
    },
    {
      name: 'Buckingham Palace',
      time: 'Day 1 · 10:30 AM - 12:15 PM',
      description:
        'Stroll through Green Park to Buckingham Palace and watch the iconic Changing of the Guard.',
      imageUrl: 'https://images.pexels.com/photos/31258524/pexels-photo-31258524.jpeg',
    },
    {
      name: 'Eiffel Tower & Seine Cruise',
      time: 'Day 4 · 2:00 PM - 6:00 PM',
      description: 'Skip-the-line Eiffel Tower access followed by an evening cruise on the Seine.',
      imageUrl: 'https://images.pexels.com/photos/914682/pexels-photo-914682.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  includes: [
    'Set menu lunch on Thames river cruise',
    'Eurostar transfer London to Paris',
    'Mineral water on coach transfers',
    'Skip-the-line Eiffel Tower ticket',
    'English-speaking tour guides in both cities',
    '6 nights hotel with daily breakfast',
  ],
  accommodations: [
    {
      name: 'The Savoy London',
      imageUrl: 'https://images.pexels.com/photos/4348078/pexels-photo-4348078.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      location: 'Strand, London',
    },
    {
      name: 'Hotel Le Meurice',
      imageUrl: 'https://images.pexels.com/photos/914682/pexels-photo-914682.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'Rue de Rivoli, Paris',
    },
    {
      name: 'The Langham London',
      imageUrl: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.6,
      location: 'Regent Street, London',
    },
    {
      name: 'Shangri-La Paris',
      imageUrl: 'https://images.pexels.com/photos/4706134/pexels-photo-4706134.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      location: 'Trocadéro, Paris',
    },
  ],
  map: { lat: 51.5074, lng: -0.1278 },
  reviews: createDefaultReviews(),
}
