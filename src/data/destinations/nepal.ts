import type { DestinationDetail } from './types'

/** Monthly averages for Kathmandu — Department of Hydrology and Meteorology, Nepal. */
const KATHMANDU_TEMPERATURES = [
  { month: 'Jan', avgHighC: 19, avgLowC: 2 },
  { month: 'Feb', avgHighC: 21, avgLowC: 4 },
  { month: 'Mar', avgHighC: 25, avgLowC: 8 },
  { month: 'Apr', avgHighC: 28, avgLowC: 12 },
  { month: 'May', avgHighC: 29, avgLowC: 16 },
  { month: 'Jun', avgHighC: 29, avgLowC: 19 },
  { month: 'Jul', avgHighC: 28, avgLowC: 20 },
  { month: 'Aug', avgHighC: 28, avgLowC: 20 },
  { month: 'Sep', avgHighC: 28, avgLowC: 19 },
  { month: 'Oct', avgHighC: 27, avgLowC: 13 },
  { month: 'Nov', avgHighC: 24, avgLowC: 7 },
  { month: 'Dec', avgHighC: 20, avgLowC: 3 },
]

export const nepal: DestinationDetail = {
  name: 'Nepal',
  slug: 'nepal',
  continent: 'Asia',
  country: 'Nepal',
  description: 'Everest trails, sacred valleys, and adventure in the heart of the Himalayas.',
  thumbnail:
    'https://images.pexels.com/photos/11785267/pexels-photo-11785267.jpeg?auto=compress&cs=tinysrgb&w=800',
  heroImage:
    'https://images.pexels.com/photos/11785267/pexels-photo-11785267.jpeg?auto=compress&cs=tinysrgb&w=1920',
  heroVideo: 'https://videos.pexels.com/video-files/28079562/12295491_3840_2160_30fps.mp4',
  packageCount: 24,
  introTitle: 'Roof of the world',
  introDescription:
    'Nepal holds eight of the world\'s ten highest peaks, including Mount Everest. Beyond trekking, medieval Kathmandu Valley towns, jungle safaris in Chitwan, and serene Pokhara lakeside life await.',
  highlightsTitle: 'Peaks, prayers & pure adventure',
  highlights: [
    {
      title: 'Kathmandu Valley kingdoms',
      category: 'History',
      description:
        'Durbar Squares in Kathmandu, Bhaktapur, and Patan preserve Newari architecture and royal palaces from the Malla period.',
      image:
        'https://images.pexels.com/photos/3601389/pexels-photo-3601389.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Hindu & Buddhist heritage',
      category: 'Culture',
      description:
        'Pashupatinath, Swayambhunath, and Boudhanath stupa draw pilgrims. Festivals like Dashain and Tihar colour the calendar.',
      image:
        'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Himalayan peaks',
      category: 'Wonder',
      description:
        'Everest Base Camp, Annapurna Circuit, and Langtang offer world-class trekking amid the planet\'s highest mountains.',
      image:
        'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Mount Everest',
      category: 'Landmark',
      description:
        'At 8,849 metres, Everest is Earth\'s highest peak. Base camp treks and scenic flights offer unforgettable Himalayan views.',
      image:
        'https://images.pexels.com/photos/936719/pexels-photo-936719.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  bestTimeToVisit: [
    {
      period: 'October – November',
      title: 'Post-monsoon clarity',
      description:
        'Clear skies, stable weather, and excellent mountain views make this the prime trekking season.',
    },
    {
      period: 'March – May',
      title: 'Spring rhododendrons',
      description:
        'Warmer valleys and blooming rhododendron forests on trails. Visibility can haze before monsoon rains arrive.',
    },
    {
      period: 'December – February',
      title: 'Winter calm',
      description:
        'Cold at altitude but fewer crowds. Lower-elevation tours and Kathmandu cultural visits work well.',
    },
  ],
  bestTimeSummary:
    'Autumn (October–November) and spring (March–May) are best for trekking and mountain views. Avoid monsoon months (June–September) for high-altitude routes.',
  temperatures: KATHMANDU_TEMPERATURES,
  temperatureLocation: 'Kathmandu',
  facts: {
    capital: 'Kathmandu',
    population: '~30 million',
    countryCode: 'NP',
    nativeLanguage: 'Nepali',
    currency: 'Nepalese Rupee (NPR)',
  },
  faqs: [
    {
      question: 'Do I need trekking experience for Nepal?',
      answer:
        'Short hikes around Pokhara suit beginners. Everest Base Camp and Annapurna Circuit require fitness and acclimatisation. Guided packages handle permits and logistics.',
    },
    {
      question: 'What permits do I need?',
      answer:
        'TIMS card and national park entry permits are required for most treks. Restricted areas need special permits — included in our organised packages.',
    },
    {
      question: 'Is altitude sickness a concern?',
      answer:
        'Yes above 3,000 metres. Ascend gradually, stay hydrated, and allow rest days. Our itineraries build in acclimatisation for high-altitude routes.',
    },
    {
      question: 'Can I combine trekking with a safari?',
      answer:
        'Absolutely. Chitwan or Bardia National Park add jungle safaris with rhinos, tigers, and elephants — a perfect contrast to mountain trekking.',
    },
  ],
}
