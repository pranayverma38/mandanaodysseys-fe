import type { DestinationDetail } from './types'
import { NORTH_INDIA_TEMPERATURE_CITIES } from './temperature-cities'

export const northIndia: DestinationDetail = {
  name: 'North India',
  slug: 'north-india',
  enabled: true,
  continent: 'Asia',
  country: 'India',
  description: 'Mughal landmarks, sacred rivers, desert forts, and Himalayan gateways across India\'s north.',
  thumbnail:
    'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=800',
  heroImage:
    'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&w=1920',
  heroVideo: 'https://video.gumlet.io/6ade6b8fd8b4449c83d285c5/6af18437d49b8893475953fa/main.mp4',
  packageCount: 0,
  introTitle: 'India\'s grand north, layered in history',
  introDescription:
    'North India brings together imperial capitals, desert kingdoms, pilgrimage cities, and the first folds of the Himalayas. Delhi, Agra, Jaipur, Varanasi, Amritsar, and Kashmir each offer a different lens on India\'s history, faith, and everyday colour.',
  highlightsTitle: 'Forts, faith & Himalayan horizons',
  highlights: [
    {
      title: 'Cuisine',
      category: 'Cuisine',
      description:
        'Butter chicken, kebabs, chaat, kachori, tandoori breads, and rich Punjabi and Awadhi dishes define a region built on bold spices and generous hospitality.',
      image:
        'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Culture',
      category: 'Culture',
      description:
        'From Sikh gurdwaras and Sufi shrines to Holi celebrations in Rajasthan and evening aarti on the Ganges, North India is intensely ceremonial and deeply lived-in.',
      image: '/images/destinations/northindiaculture.jpg',
    },
    {
      title: 'Mughal & Rajput Heritage',
      category: 'History',
      description:
        'The region was shaped by powerful dynasties, from the Mughal emperors who built Delhi and Agra\'s great monuments to the Rajput rulers whose forts still crown Rajasthan\'s hills.',
      image: '/images/destinations/northindiahistory.jpg',
    },
    {
      title: 'Taj Mahal',
      category: 'Landmark',
      description:
        'Agra\'s marble mausoleum remains North India\'s signature landmark, but it sits within a wider circuit of forts, stepwells, temples, and historic cities.',
      image: '/images/destinations/northindiatourist.jpg',
    },
  ],
  bestTimeToVisit: [
    {
      period: 'October - March',
      title: 'Best overall season',
      description:
        'Cool mornings, clear skies, and comfortable daytime weather make this the ideal window for Delhi, Agra, Rajasthan, Varanasi, and Amritsar.',
    },
    {
      period: 'April - June',
      title: 'Hill stations & Kashmir',
      description:
        'The plains turn hot, but Shimla, Manali, Dharamshala, and the Kashmir Valley become especially pleasant for mountain escapes.',
    },
    {
      period: 'July - September',
      title: 'Monsoon atmosphere',
      description:
        'Rajasthan and the Ganges belt see showers and fewer crowds, while landscapes turn greener. Travel is still possible with flexible pacing.',
    },
  ],
  bestTimeSummary:
    'October to March is the sweet spot for most North India trips. Summer works best in the Himalayas, while monsoon months suit travellers who prefer lower rates and moodier landscapes.',
  temperatureCities: NORTH_INDIA_TEMPERATURE_CITIES,
  facts: {
    capital: 'New Delhi',
    population: '~620 million across northern states and union territories',
    countryCode: 'IN',
    nativeLanguage: 'Hindi, Punjabi, Urdu, Kashmiri, and many regional languages',
    currency: 'Indian Rupee (INR)',
  },
  faqs: [
    {
      question: 'What is the best first-time North India route?',
      answer:
        'The Golden Triangle of Delhi, Agra, and Jaipur is the easiest introduction. Add Varanasi for spirituality, Amritsar for Sikh heritage, or the Himalayas for cooler weather.',
    },
    {
      question: 'Is North India very cold in winter?',
      answer:
        'Winters are mild in Delhi and Rajasthan during the day but can be cold in the mornings and evenings. Himalayan regions such as Himachal, Uttarakhand, and Kashmir get genuinely cold and can see snow.',
    },
    {
      question: 'How many days do I need for North India?',
      answer:
        'Seven to ten days covers the Golden Triangle well. Two weeks gives you room to add Varanasi, Ranthambore, Amritsar, or a hill station without rushing.',
    },
    {
      question: 'Is North India good for culture-focused travel?',
      answer:
        'Yes, it is one of the best parts of the country for heritage travel. You can combine forts, Mughal monuments, living pilgrimage traditions, food walks, and artisan neighbourhoods in a single itinerary.',
    },
  ],
}
