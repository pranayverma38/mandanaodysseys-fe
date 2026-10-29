import type { DestinationDetail } from './types'
import { BHUTAN_TEMPERATURE_CITIES } from './temperature-cities'

export const bhutan: DestinationDetail = {
  name: 'Bhutan',
  slug: 'bhutan',
  enabled: true,
  continent: 'Asia',
  country: 'Bhutan',
  description: 'Monastery valleys, Himalayan passes, and mindful culture in the last great Himalayan kingdom.',
  thumbnail:
    'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=800',
  heroImage:
    'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=1920',
  heroVideo: 'https://videos.pexels.com/video-files/31956523/13628738_1920_1080_25fps.mp4',
  packageCount: 0,
  introTitle: 'The Himalayan kingdom of happiness',
  introDescription:
    'Bhutan balances dramatic mountain landscapes with deeply rooted Buddhist traditions, fortress monasteries, and a high-value, low-impact approach to tourism. From Paro and Thimphu to Punakha and Bumthang, the country feels both serene and extraordinary.',
  highlightsTitle: 'Sacred peaks, dzongs & slow travel',
  highlights: [
    {
      title: 'Cuisine',
      category: 'Cuisine',
      description:
        'Ema datshi, red rice, buckwheat noodles, and hearty stews reflect Bhutanese cooking shaped by altitude, chillies, and local dairy traditions.',
      image:
        'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Culture',
      category: 'Culture',
      description:
        'Prayer flags, masked tsechu festivals, national dress, and monastic life remain part of everyday identity across Bhutanese valleys.',
      image:
        'https://images.pexels.com/photos/939729/pexels-photo-939729.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Dzongs',
      category: 'History',
      description:
        'Bhutan’s great dzongs served as fortified monasteries and administrative centers from the 17th century onward, helping unify the kingdom under the Zhabdrung.',
      image:
        'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Tiger’s Nest',
      category: 'Landmark',
      description:
        'Paro Taktsang clings to a cliff nearly 900 metres above the valley floor and remains Bhutan’s most iconic spiritual site.',
      image:
        'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  bestTimeToVisit: [
    {
      period: 'March – May',
      title: 'Spring blossoms',
      description:
        'Rhododendrons bloom, valleys are green, and daytime weather suits sightseeing, cultural touring, and moderate hiking.',
    },
    {
      period: 'September – November',
      title: 'Clear Himalayan views',
      description:
        'Post-monsoon skies are crisp and festivals are frequent. This is one of the best seasons for mountain scenery and photography.',
    },
    {
      period: 'December – February',
      title: 'Quiet winter journeys',
      description:
        'Cold mornings but fewer visitors. Western Bhutan remains very manageable for cultural trips, while higher regions can be snowy.',
    },
  ],
  bestTimeSummary:
    'Spring and autumn are Bhutan’s best overall seasons, with pleasant days, clearer mountain views, and major festivals. Winter works well for quieter cultural travel in Paro, Thimphu, and Punakha.',
  temperatureCities: BHUTAN_TEMPERATURE_CITIES,
  facts: {
    capital: 'Thimphu',
    population: '~790,000',
    countryCode: 'BT',
    nativeLanguage: 'Dzongkha',
    currency: 'Bhutanese Ngultrum (BTN)',
  },
  faqs: [
    {
      question: 'Do I need a visa to visit Bhutan?',
      answer:
        'Most travellers need a visa arranged in advance through a licensed Bhutanese tour operator or international partner. Travel is generally booked as a package with permits and logistics included.',
    },
    {
      question: 'Is Bhutan suitable for first-time Himalayan travel?',
      answer:
        'Yes. Bhutan suits travellers who want mountain scenery and cultural immersion without committing to demanding trekking. Paro, Thimphu, and Punakha are comfortable first-time routes.',
    },
    {
      question: 'Can I visit Tiger’s Nest Monastery?',
      answer:
        'Yes. The hike to Tiger’s Nest is one of Bhutan’s signature experiences. It is steep but manageable for many travellers with a moderate fitness level and regular rest stops.',
    },
    {
      question: 'What makes Bhutan different from nearby Himalayan destinations?',
      answer:
        'Bhutan prioritises low-volume tourism, environmental protection, and cultural preservation. The result is a quieter, more curated travel experience focused on monasteries, valleys, and wellbeing.',
    },
  ],
}
