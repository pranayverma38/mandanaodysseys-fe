import type { DestinationDetail } from './types'
import { BALI_TEMPERATURE_CITIES } from './temperature-cities'

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
      title: 'Cuisine',
      category: 'Cuisine',
      description:
        'Ayam betutu, babi guling, and satay lilit showcase Bali\'s distinctive Hindu-Balinese flavours, often served on banana leaf with sambal.',
      image:
        'https://images.pexels.com/photos/37106528/pexels-photo-37106528.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Culture',
      category: 'Culture',
      description:
        'Daily canang sari offerings, kecak dance, batik, and wood carving reflect a living culture woven into village life across the island.',
      image:
        'https://images.pexels.com/photos/32877828/pexels-photo-32877828.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Tegalalang Rice Terraces',
      category: 'History',
      description:
        'Bali\'s subak irrigation system dates to the 9th century — a cooperative water-management tradition rooted in Hindu philosophy that UNESCO recognises as living cultural heritage.',
      image:
        'https://images.pexels.com/photos/303394/pexels-photo-303394.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Uluwatu Temple',
      category: 'Landmark',
      description:
        'Pura Luhur Uluwatu clings to a clifftop above the Indian Ocean, famed for sunset views and nightly kecak fire dance performances.',
      image:
        'https://images.pexels.com/photos/2403049/pexels-photo-2403049.jpeg?auto=compress&cs=tinysrgb&w=800',
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
  temperatureCities: BALI_TEMPERATURE_CITIES,
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
