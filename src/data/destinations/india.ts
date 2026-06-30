import type { DestinationDetail } from './types'

/** Monthly averages for New Delhi (Safdarjung), 1991–2020 — India Meteorological Department. */
const NEW_DELHI_TEMPERATURES = [
  { month: 'Jan', avgHighC: 20, avgLowC: 8 },
  { month: 'Feb', avgHighC: 24, avgLowC: 11 },
  { month: 'Mar', avgHighC: 30, avgLowC: 16 },
  { month: 'Apr', avgHighC: 37, avgLowC: 21 },
  { month: 'May', avgHighC: 40, avgLowC: 26 },
  { month: 'Jun', avgHighC: 39, avgLowC: 28 },
  { month: 'Jul', avgHighC: 36, avgLowC: 28 },
  { month: 'Aug', avgHighC: 34, avgLowC: 27 },
  { month: 'Sep', avgHighC: 34, avgLowC: 25 },
  { month: 'Oct', avgHighC: 33, avgLowC: 20 },
  { month: 'Nov', avgHighC: 28, avgLowC: 13 },
  { month: 'Dec', avgHighC: 23, avgLowC: 8 },
]

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
      title: 'Mughal & Rajput legacy',
      category: 'History',
      description:
        'Empires from the Mughals to the Rajputs left behind forts, palaces, and UNESCO sites such as the Taj Mahal and Amber Fort.',
      image:
        'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Festivals & living traditions',
      category: 'Culture',
      description:
        'Diwali, Holi, and regional celebrations fill streets with colour, music, and ritual — alongside classical dance, yoga, and artisan crafts.',
      image:
        'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Himalayas & golden beaches',
      category: 'Wonder',
      description:
        'Snow-capped peaks in Ladakh and Himachal contrast with palm-fringed coasts in Goa and Kerala — all within one vast country.',
      image:
        'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Taj Mahal, Agra',
      category: 'Landmark',
      description:
        'The ivory-white marble mausoleum built by Shah Jahan remains one of the most visited monuments on Earth.',
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
  temperatures: NEW_DELHI_TEMPERATURES,
  temperatureLocation: 'New Delhi',
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
