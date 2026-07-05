import type { DestinationDetail } from './types'
import { THAILAND_TEMPERATURE_CITIES } from './temperature-cities'

export const thailand: DestinationDetail = {
  name: 'Thailand',
  slug: 'thailand',
  continent: 'Asia',
  country: 'Thailand',
  description: 'Tropical islands, bustling Bangkok, and world-renowned hospitality.',
  thumbnail:
    'https://images.pexels.com/photos/35126706/pexels-photo-35126706.jpeg?auto=compress&cs=tinysrgb&w=800',
  heroImage:
    'https://images.pexels.com/photos/35126706/pexels-photo-35126706.jpeg?auto=compress&cs=tinysrgb&w=1920',
  heroVideo: 'https://videos.pexels.com/video-files/11719472/11719472-uhd_3840_2160_30fps.mp4',
  packageCount: 56,
  introTitle: 'Kingdom of smiles',
  introDescription:
    'Thailand blends golden temples, tropical islands, and night markets with warm hospitality. From Bangkok\'s street food to Chiang Mai\'s hill tribes and Phuket\'s beaches, the country rewards every style of traveller.',
  highlightsTitle: 'Thailand hits different',
  highlights: [
    {
      title: 'Cuisine',
      category: 'Cuisine',
      description:
        'Pad Thai, green curry, tom yum, and mango sticky rice — Thailand\'s bold, balanced flavours are celebrated the world over.',
      image:
        'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Culture',
      category: 'Culture',
      description:
        'Buddhist wats, Loy Krathong lantern festivals, and Muay Thai boxing reflect a culture deeply rooted in spirituality and community.',
      image:
        'https://images.pexels.com/photos/20680206/pexels-photo-20680206.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Phi Phi Islands',
      category: 'History',
      description:
        'Long before tourism arrived, the Andaman coast was shaped by Malay maritime trade and the rise of Sukhothai and Ayutthaya. Phi Phi\'s bays served fishermen and traders navigating routes between the Gulf and the Indian Ocean.',
      image:
        'https://images.pexels.com/photos/14573822/pexels-photo-14573822.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Grand Palace, Bangkok',
      category: 'Landmark',
      description:
        'The opulent royal complex and Wat Phra Kaew anchor Bangkok\'s historic Rattanakosin district with dazzling Thai architecture.',
      image:
        'https://images.pexels.com/photos/20889583/pexels-photo-20889583.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  bestTimeToVisit: [
    {
      period: 'November – February',
      title: 'Cool, dry season',
      description:
        'The most popular window — lower humidity, comfortable temperatures, and clear skies across most of the country.',
    },
    {
      period: 'March – May',
      title: 'Hot season',
      description:
        'Temperatures peak before the rains. Beach resorts remain busy; Songkran (Thai New Year) in April is a lively cultural highlight.',
    },
    {
      period: 'June – October',
      title: 'Rainy season',
      description:
        'Afternoon showers are common but rarely all-day. Fewer tourists, lush landscapes, and good deals on islands like Koh Samui.',
    },
  ],
  bestTimeSummary:
    'November to February offers the best overall weather for sightseeing and beaches. The rainy season still works for island trips, especially on the Gulf of Thailand side.',
  temperatureCities: THAILAND_TEMPERATURE_CITIES,
  facts: {
    capital: 'Bangkok',
    population: '~71 million',
    countryCode: 'TH',
    nativeLanguage: 'Thai',
    currency: 'Thai Baht (THB)',
  },
  faqs: [
    {
      question: 'Is Thailand safe for tourists?',
      answer:
        'Thailand is one of Southeast Asia\'s most visited countries with well-developed tourism infrastructure. Exercise normal precautions in busy areas and respect local customs at temples.',
    },
    {
      question: 'Do I need a visa for Thailand?',
      answer:
        'Many nationalities receive visa-free entry for 30–60 days. Requirements change — verify the latest rules for your passport before booking.',
    },
    {
      question: 'Bangkok or the islands first?',
      answer:
        'Fly into Bangkok for culture and food, then connect south to Phuket, Krabi, or Koh Samui. Chiang Mai suits a northern add-on for temples and hill country.',
    },
    {
      question: 'What is the dress code at temples?',
      answer:
        'Cover shoulders and knees. Remove shoes before entering temple buildings. Sarongs are often available to borrow at major sites.',
    },
  ],
}
