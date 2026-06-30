import type { DestinationDetail } from './types'

/** Monthly averages for Denpasar, Bali — BMKG Indonesia climatological data. */
const DENPASAR_TEMPERATURES = [
  { month: 'Jan', avgHighC: 31, avgLowC: 24 },
  { month: 'Feb', avgHighC: 31, avgLowC: 24 },
  { month: 'Mar', avgHighC: 31, avgLowC: 24 },
  { month: 'Apr', avgHighC: 32, avgLowC: 24 },
  { month: 'May', avgHighC: 31, avgLowC: 23 },
  { month: 'Jun', avgHighC: 30, avgLowC: 23 },
  { month: 'Jul', avgHighC: 29, avgLowC: 22 },
  { month: 'Aug', avgHighC: 29, avgLowC: 22 },
  { month: 'Sep', avgHighC: 31, avgLowC: 23 },
  { month: 'Oct', avgHighC: 32, avgLowC: 23 },
  { month: 'Nov', avgHighC: 32, avgLowC: 24 },
  { month: 'Dec', avgHighC: 31, avgLowC: 24 },
]

export const bali: DestinationDetail = {
  name: 'Bali',
  slug: 'bali',
  continent: 'Asia',
  country: 'Indonesia',
  description: 'Rice terraces, spiritual retreats, and surf-ready shores in Indonesia.',
  thumbnail:
    'https://images.pexels.com/photos/32877903/pexels-photo-32877903.jpeg?auto=compress&cs=tinysrgb&w=800',
  heroImage:
    'https://images.pexels.com/photos/32877903/pexels-photo-32877903.jpeg?auto=compress&cs=tinysrgb&w=1920',
  heroVideo: 'https://videos.pexels.com/video-files/32150732/13707600_1920_1080_25fps.mp4',
  packageCount: 44,
  introTitle: 'Island of the gods',
  introDescription:
    'Bali is Indonesia\'s most beloved island — a blend of Hindu temples, emerald rice paddies, volcanic peaks, and world-class beaches. Ubud\'s art scene and Seminyak\'s dining draw travellers from every continent.',
  highlightsTitle: 'Bali beckons beautifully',
  highlights: [
    {
      title: 'Hindu temples & rituals',
      category: 'History',
      description:
        'Ancient pura (temples) like Besakih and Tanah Lot anchor Balinese Hinduism — a faith unique to this Indonesian island.',
      image:
        'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Dance, offerings & crafts',
      category: 'Culture',
      description:
        'Daily canang sari offerings, kecak fire dance, batik, and wood carving reflect a living culture woven into village life.',
      image:
        'https://images.pexels.com/photos/3601389/pexels-photo-3601389.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Rice terraces & volcanoes',
      category: 'Wonder',
      description:
        'Tegallalang and Jatiluwih rice terraces cascade down hillsides, while Mount Batur and Mount Agung dominate the skyline.',
      image:
        'https://images.pexels.com/photos/303394/pexels-photo-303394.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Uluwatu Temple',
      category: 'Landmark',
      description:
        'Perched on a clifftop above the Indian Ocean, Pura Luhur Uluwatu is famed for sunset views and kecak performances.',
      image:
        'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  bestTimeToVisit: [
    {
      period: 'April – October',
      title: 'Dry season',
      description:
        'Lower humidity, less rain, and ideal conditions for beaches, trekking, and temple visits across the island.',
    },
    {
      period: 'July – August',
      title: 'Peak season',
      description:
        'School holidays bring higher prices and crowds. Book accommodation and tours well in advance.',
    },
    {
      period: 'November – March',
      title: 'Wet season',
      description:
        'Short tropical showers, lush landscapes, and fewer tourists. Surf on the east coast peaks during these months.',
    },
  ],
  bestTimeSummary:
    'April to October is the dry season and best for most activities. The wet season still works for cultural trips and surf, with brief afternoon rains.',
  temperatures: DENPASAR_TEMPERATURES,
  temperatureLocation: 'Denpasar',
  facts: {
    capital: 'Denpasar',
    population: '~4.4 million (Bali province)',
    countryCode: 'ID',
    nativeLanguage: 'Indonesian & Balinese',
    currency: 'Indonesian Rupiah (IDR)',
  },
  faqs: [
    {
      question: 'Is Bali part of Indonesia?',
      answer:
        'Yes. Bali is a province of Indonesia. International flights land at Ngurah Rai Airport (DPS) near Denpasar.',
    },
    {
      question: 'Ubud or the beach — where to stay?',
      answer:
        'Ubud suits culture, yoga, and rice terraces. Seminyak, Canggu, and Nusa Dua suit beach lovers. Many itineraries combine both.',
    },
    {
      question: 'Do I need vaccinations for Bali?',
      answer:
        'Consult your doctor. Hepatitis A and typhoid are commonly recommended. Drink bottled water and use mosquito protection.',
    },
    {
      question: 'What is the currency in Bali?',
      answer:
        'Indonesian Rupiah (IDR). ATMs are widely available. Cards are accepted at hotels and restaurants in tourist areas.',
    },
  ],
}
