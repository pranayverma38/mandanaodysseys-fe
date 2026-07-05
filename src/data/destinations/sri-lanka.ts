import type { DestinationDetail } from './types'
import { SRI_LANKA_TEMPERATURE_CITIES } from './temperature-cities'

export const sriLanka: DestinationDetail = {
  name: 'Sri Lanka',
  slug: 'sri-lanka',
  continent: 'Asia',
  country: 'Sri Lanka',
  description: 'Tea hills, golden beaches, and ancient temples on the pearl of the Indian Ocean.',
  thumbnail:
    'https://images.pexels.com/photos/27907343/pexels-photo-27907343.png?auto=compress&cs=tinysrgb&w=800',
  heroImage:
    'https://images.pexels.com/photos/27907343/pexels-photo-27907343.png?auto=compress&cs=tinysrgb&w=1920',
  heroVideo: 'https://videos.pexels.com/video-files/3842814/3842814-uhd_3840_2160_30fps.mp4',
  packageCount: 32,
  introTitle: 'Pearl of the Indian Ocean',
  introDescription:
    'Compact yet astonishingly diverse, Sri Lanka packs ancient kingdoms, misty tea country, wildlife-rich national parks, and Indian Ocean beaches into an island roughly the size of Ireland.',
  highlightsTitle: 'Island magic, up close',
  highlights: [
    {
      title: 'Cuisine',
      category: 'Cuisine',
      description:
        'Rice and curry feasts, hoppers, kottu roti, and fresh seafood reflect Sri Lanka\'s blend of Sinhalese, Tamil, and colonial influences.',
      image:
        'https://images.pexels.com/photos/34070063/pexels-photo-34070063.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Culture',
      category: 'Culture',
      description:
        'Buddhist stupas, Kandy\'s Temple of the Tooth, tea estates, and vibrant festivals define the island\'s rich cultural identity.',
      image:
        'https://images.pexels.com/photos/11696781/pexels-photo-11696781.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Sigiriya',
      category: 'History',
      description:
        'Built in the 5th century by King Kashyapa, Sigiriya served as a royal citadel and capital. Frescoes, mirror walls, and water gardens reveal the sophistication of Sri Lanka\'s ancient Sinhalese civilisation.',
      image:
        'https://images.pexels.com/photos/6045035/pexels-photo-6045035.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Sri Lanka',
      category: 'Landmark',
      description:
        'From ancient kingdoms and hill-country tea trails to palm-fringed coasts, the island packs extraordinary diversity into a compact destination.',
      image:
        'https://images.pexels.com/photos/27907343/pexels-photo-27907343.png?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  bestTimeToVisit: [
    {
      period: 'December – March',
      title: 'West & south coasts',
      description:
        'Dry, sunny weather on the popular southwest coast — ideal for Colombo, Galle, and beach resorts.',
    },
    {
      period: 'May – September',
      title: 'East coast & Cultural Triangle',
      description:
        'The east coast (Trincomalee, Arugam Bay) shines while the southwest monsoon brings rain. Hill country stays pleasant.',
    },
    {
      period: 'Year-round',
      title: 'Hill country',
      description:
        'Kandy, Ella, and tea-country highlands enjoy cooler temperatures and can be visited in most months.',
    },
  ],
  bestTimeSummary:
    'Sri Lanka has two monsoon seasons — plan west/south visits for December–March and east coast trips for May–September. The Cultural Triangle and hill country work well year-round.',
  temperatureCities: SRI_LANKA_TEMPERATURE_CITIES,
  facts: {
    capital: 'Sri Jayawardenepura Kotte (administrative); Colombo (commercial)',
    population: '~22 million',
    countryCode: 'LK',
    nativeLanguage: 'Sinhala & Tamil',
    currency: 'Sri Lankan Rupee (LKR)',
  },
  faqs: [
    {
      question: 'How long should I spend in Sri Lanka?',
      answer:
        'A 10–14 day circuit covers the Cultural Triangle, hill country, and a beach stop. Shorter trips can focus on one region — beaches, wildlife, or heritage.',
    },
    {
      question: 'Is Sri Lanka good for wildlife?',
      answer:
        'Yes. Yala National Park is famous for leopards, while Udawalawe and Minneriya offer elephant gatherings. Whale watching runs off the south coast.',
    },
    {
      question: 'What is the currency in Sri Lanka?',
      answer:
        'The Sri Lankan Rupee (LKR). ATMs are widely available in cities and tourist areas. US dollars and cards are accepted at many hotels.',
    },
    {
      question: 'Do I need vaccinations for Sri Lanka?',
      answer:
        'Consult your doctor before travel. Hepatitis A, typhoid, and routine vaccines are commonly recommended. Malaria risk is low in most tourist areas.',
    },
  ],
}
