import type { ItineraryDetail } from '../types'
import { createItineraryDuration } from '../duration'
import { createDefaultReviews, createItineraryLocations, createItineraryPricing } from './_shared'

const duration = createItineraryDuration(7, 6)

export const listingNameItinerary: ItineraryDetail = {
  id: 'itinerary://listing-name',
  handle: 'listing-name',
  title: '7-Day London & Paris Explorer',
  badge: 'Best Seller',
  destination: 'australia',
  address: 'London, United Kingdom · Paris, France',
  locations: createItineraryLocations([
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'Paris', lat: 48.8566, lng: 2.3522 },
  ]),
  reviewStart: 4.9,
  reviewCount: 312,
  categories: [
    { category: 'group-tours' },
    { category: 'customized-holidays' },
  ],
  duration,
  mobility: 'Light Activity',
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
    { icon: 'UserMultipleIcon', text: 'Small group' },
    { icon: 'ChefHatIcon', text: 'Breakfast included' },
  ],
  pricing: createItineraryPricing(1899, 2199),
  description:
    "See over 30 London and Paris sights across seven days. Your fun local guides will make sure you don't miss the history, culture, and legends of Europe's best-loved cities.",
  thingsToDo: [
    {
      name: 'The Ritz London',
      time: 'Day 1 · 7:30 AM - 8:00 AM',
      description: 'Your friendly local London guide will meet you at The Ritz.',
      imageUrl: 'https://images.pexels.com/photos/7245327/pexels-photo-7245327.jpeg',
      lat: 51.507,
      lng: -0.1416,
    },
    {
      name: 'Buckingham Palace',
      time: 'Day 1 · 10:30 AM - 12:15 PM',
      description:
        'Stroll through Green Park to Buckingham Palace and watch the iconic Changing of the Guard.',
      imageUrl: 'https://images.pexels.com/photos/31258524/pexels-photo-31258524.jpeg',
      lat: 51.5014,
      lng: -0.1419,
    },
    {
      name: 'Eiffel Tower & Seine Cruise',
      time: 'Day 4 · 2:00 PM - 6:00 PM',
      description: 'Skip-the-line Eiffel Tower access followed by an evening cruise on the Seine.',
      imageUrl: 'https://images.pexels.com/photos/914682/pexels-photo-914682.jpeg?auto=compress&cs=tinysrgb&w=800',
      lat: 48.8584,
      lng: 2.2945,
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
  excludes: [
    'International flights',
    'Travel insurance',
    'Personal expenses and shopping',
    'Visa fees (if applicable)',
    'Tips and gratuities',
    'Meals not mentioned in inclusions',
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
