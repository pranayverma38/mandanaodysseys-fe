import type { DestinationDetail } from './types'
import { INDIA_TEMPERATURE_CITIES } from './temperature-cities'

export const india: DestinationDetail = {
  name: 'India',
  slug: 'india',
  continent: 'Asia',
  country: 'India',
  description: 'Heritage cities, Himalayan peaks, and vibrant culture across the subcontinent.',
  thumbnail:
    'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=800',
  heroImage:
    'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=1920',
  heroVideo: 'https://videos.pexels.com/video-files/27911058/12260747_3840_2160_30fps.mp4',
  packageCount: 48,
  introTitle: 'Land of timeless wonders',
  introDescription:
    'India spans deserts, rainforests, and the world\'s highest mountains, woven together by millennia of art, faith, and cuisine. From Mughal monuments to Kerala backwaters, every region tells a different story.',
  highlightsTitle: 'Four strokes of incredible India',
  highlights: [
    {
      title: 'Cuisine',
      category: 'Cuisine',
      description:
        'From fragrant curries and tandoori breads to regional thalis and street snacks, Indian food is as diverse as the country itself.',
      image:
        'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Culture',
      category: 'Culture',
      description:
        'Diwali, Holi, classical dance, yoga, and centuries of art and craft traditions shape everyday life across the subcontinent.',
      image:
        'https://images.pexels.com/photos/31008414/pexels-photo-31008414.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Himalayas',
      category: 'History',
      description:
        'For centuries the Himalayas were a crossroads of empires and faith — ancient trade routes linked India to Central Asia, while Buddhist monasteries in Ladakh and Himachal preserved art and scripture from the 7th century onward.',
      image:
        'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Taj Mahal',
      category: 'Landmark',
      description:
        'Shah Jahan\'s ivory-white marble mausoleum in Agra remains one of the most visited and admired monuments on Earth.',
      image:
        'https://images.pexels.com/photos/262780/pexels-photo-262780.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  bestTimeToVisit: [
    {
      period: 'October – March',
      title: 'Peak travel season',
      description:
        'Cooler, drier weather across most of North and Central India makes sightseeing comfortable. Ideal for Rajasthan, the Golden Triangle, and Kerala.',
    },
    {
      period: 'April – June',
      title: 'Hill stations & Himalayas',
      description:
        'Plains heat up, but hill towns like Shimla, Manali, and Darjeeling offer pleasant escapes. Ladakh opens for high-altitude adventures.',
    },
    {
      period: 'July – September',
      title: 'Monsoon greenery',
      description:
        'Heavy rains refresh the countryside. Western Ghats, Kerala, and Goa become lush — with fewer crowds and lower prices.',
    },
  ],
  bestTimeSummary:
    'Most travellers visit India between October and March when temperatures are mild and rainfall is low. Hill stations and the Himalayas are best in summer, while the monsoon suits lush southern landscapes.',
  temperatureCities: INDIA_TEMPERATURE_CITIES,
  facts: {
    capital: 'New Delhi',
    population: '~1.4 billion',
    countryCode: 'IN',
    nativeLanguage: 'Hindi (22 scheduled languages)',
    currency: 'Indian Rupee (INR)',
  },
  faqs: [
    {
      question: 'Do I need a visa to visit India?',
      answer:
        'Most foreign nationals require a visa before travel. India offers e-Visas for citizens of many countries — apply online at least a few days before departure. Check current requirements for your nationality.',
    },
    {
      question: 'What is the best first trip to India?',
      answer:
        'The Golden Triangle (Delhi, Agra, Jaipur) is the classic introduction — compact, well connected, and rich in history. Kerala or Goa suit beach and nature lovers.',
    },
    {
      question: 'Is India safe for tourists?',
      answer:
        'Millions visit India safely each year. Use registered guides, drink bottled water, and follow local advice in crowded areas. Our packages include vetted transfers and accommodation.',
    },
    {
      question: 'What should I pack for India?',
      answer:
        'Light cotton clothing for warm months, a light jacket for winter evenings in the north, modest dress for temples, comfortable walking shoes, and sun protection year-round.',
    },
  ],
}
