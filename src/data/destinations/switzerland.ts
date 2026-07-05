import type { DestinationDetail } from './types'
import { SWITZERLAND_TEMPERATURE_CITIES } from './temperature-cities'

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
      title: 'Cuisine',
      category: 'Cuisine',
      description:
        'Fondue, raclette, rösti, and artisan chocolate — Swiss cuisine pairs alpine ingredients with precision and regional pride.',
      image:
        'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Culture',
      category: 'Culture',
      description:
        'Four official languages, Fasnacht carnivals, alpine cheese-making, and medieval old towns reflect Switzerland\'s diverse heritage.',
      image:
        'https://images.pexels.com/photos/29386884/pexels-photo-29386884.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Swiss Alps',
      category: 'History',
      description:
        'Alpine passes forged Switzerland\'s identity — the 1291 Federal Charter united cantons, and medieval trade routes over the Alps linked northern Europe to the Mediterranean for centuries.',
      image:
        'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Matterhorn',
      category: 'Landmark',
      description:
        'The pyramid-shaped peak above Zermatt is Switzerland\'s most recognisable mountain — a symbol of alpine beauty and adventure.',
      image:
        'https://images.pexels.com/photos/20367490/pexels-photo-20367490.jpeg?auto=compress&cs=tinysrgb&w=800',
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
  temperatureCities: SWITZERLAND_TEMPERATURE_CITIES,
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
