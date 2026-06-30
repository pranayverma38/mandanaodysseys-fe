import type { DestinationDetail } from './types'

/** Monthly averages for Zurich — MeteoSwiss 1991–2020 normals. */
const ZURICH_TEMPERATURES = [
  { month: 'Jan', avgHighC: 4, avgLowC: -2 },
  { month: 'Feb', avgHighC: 6, avgLowC: -1 },
  { month: 'Mar', avgHighC: 11, avgLowC: 2 },
  { month: 'Apr', avgHighC: 15, avgLowC: 5 },
  { month: 'May', avgHighC: 20, avgLowC: 9 },
  { month: 'Jun', avgHighC: 23, avgLowC: 13 },
  { month: 'Jul', avgHighC: 25, avgLowC: 15 },
  { month: 'Aug', avgHighC: 24, avgLowC: 14 },
  { month: 'Sep', avgHighC: 20, avgLowC: 11 },
  { month: 'Oct', avgHighC: 14, avgLowC: 7 },
  { month: 'Nov', avgHighC: 8, avgLowC: 2 },
  { month: 'Dec', avgHighC: 4, avgLowC: -1 },
]

export const switzerland: DestinationDetail = {
  name: 'Switzerland',
  slug: 'switzerland',
  continent: 'Europe',
  country: 'Switzerland',
  description: 'Alpine peaks, scenic train routes, and lakeside cities in the heart of Europe.',
  thumbnail:
    'https://images.pexels.com/photos/1796727/pexels-photo-1796727.jpeg?auto=compress&cs=tinysrgb&w=800',
  heroImage:
    'https://images.pexels.com/photos/1796727/pexels-photo-1796727.jpeg?auto=compress&cs=tinysrgb&w=1920',
  heroVideo: 'https://videos.pexels.com/video-files/33640410/14295693_3840_2160_30fps.mp4',
  packageCount: 12,
  introTitle: 'Alpine elegance awaits',
  introDescription:
    'Switzerland pairs snow-capped Alps with crystal lakes, medieval old towns, and one of the world\'s finest rail networks. Geneva, Zurich, Lucerne, and Zermatt offer precision, scenery, and hospitality in equal measure.',
  highlightsTitle: 'Swiss perfection, unpacked',
  highlights: [
    {
      title: 'Medieval old towns',
      category: 'History',
      description:
        'Bern\'s UNESCO-listed old town, Château de Chillon on Lake Geneva, and alpine villages preserve centuries of Swiss heritage.',
      image:
        'https://images.pexels.com/photos/5366524/pexels-photo-5366524.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Four languages, one nation',
      category: 'Culture',
      description:
        'German, French, Italian, and Romansh regions each bring distinct traditions — from Fasnacht carnivals to alpine cheese-making.',
      image:
        'https://images.pexels.com/photos/3601389/pexels-photo-3601389.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Matterhorn & Jungfrau',
      category: 'Wonder',
      description:
        'Iconic peaks rise above Zermatt and the Bernese Oberland. Glacier Express and GoldenPass routes rank among the world\'s greatest train journeys.',
      image:
        'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Lake Geneva',
      category: 'Landmark',
      description:
        'Europe\'s largest alpine lake frames Mont Blanc views, vineyard terraces, and the cosmopolitan city of Geneva.',
      image:
        'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  bestTimeToVisit: [
    {
      period: 'June – September',
      title: 'Summer hiking & lakes',
      description:
        'Warm weather opens alpine trails, lake swimming, and outdoor festivals. Book mountain hotels early.',
    },
    {
      period: 'December – March',
      title: 'Ski season',
      description:
        'World-class resorts in Zermatt, Verbier, and St. Moritz offer skiing, snowboarding, and après-ski culture.',
    },
    {
      period: 'April – May & September – October',
      title: 'Shoulder season',
      description:
        'Fewer crowds, lower prices, and pleasant weather for city breaks in Zurich, Lucerne, and Bern.',
    },
  ],
  bestTimeSummary:
    'Visit in summer for hiking and lakes, winter for skiing, or shoulder seasons for city culture without peak prices. Switzerland rewards every season.',
  temperatures: ZURICH_TEMPERATURES,
  temperatureLocation: 'Zurich',
  facts: {
    capital: 'Bern',
    population: '~8.8 million',
    countryCode: 'CH',
    nativeLanguage: 'German, French, Italian & Romansh',
    currency: 'Swiss Franc (CHF)',
  },
  faqs: [
    {
      question: 'Is Switzerland expensive to visit?',
      answer:
        'Switzerland has higher costs than most of Europe. Swiss Travel Passes, city cards, and shoulder-season travel help manage budgets.',
    },
    {
      question: 'Do I need a Swiss Travel Pass?',
      answer:
        'If you plan multiple train journeys, the pass often saves money and includes buses, boats, and museum discounts.',
    },
    {
      question: 'Which airport should I fly into?',
      answer:
        'Zurich (ZRH) and Geneva (GVA) are the main international hubs. Both connect efficiently to the national rail network.',
    },
    {
      question: 'What languages are spoken in Switzerland?',
      answer:
        'Four official languages: German, French, Italian, and Romansh. English is widely spoken in tourist areas and hotels.',
    },
  ],
}
