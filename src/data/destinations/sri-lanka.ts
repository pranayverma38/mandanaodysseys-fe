import type { DestinationDetail } from './types'

/** Monthly averages for Colombo — Sri Lanka Department of Meteorology climatological normals. */
const COLOMBO_TEMPERATURES = [
  { month: 'Jan', avgHighC: 31, avgLowC: 22 },
  { month: 'Feb', avgHighC: 31, avgLowC: 23 },
  { month: 'Mar', avgHighC: 32, avgLowC: 24 },
  { month: 'Apr', avgHighC: 32, avgLowC: 25 },
  { month: 'May', avgHighC: 31, avgLowC: 26 },
  { month: 'Jun', avgHighC: 30, avgLowC: 26 },
  { month: 'Jul', avgHighC: 30, avgLowC: 26 },
  { month: 'Aug', avgHighC: 30, avgLowC: 26 },
  { month: 'Sep', avgHighC: 30, avgLowC: 25 },
  { month: 'Oct', avgHighC: 30, avgLowC: 25 },
  { month: 'Nov', avgHighC: 30, avgLowC: 24 },
  { month: 'Dec', avgHighC: 30, avgLowC: 23 },
]

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
      title: 'Ancient kingdoms',
      category: 'History',
      description:
        'Anuradhapura and Polonnaruwa preserve Buddhist stupas and royal ruins dating back over two millennia.',
      image:
        'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Tea culture & temples',
      category: 'Culture',
      description:
        "Colonial tea estates in Nuwara Eliya, Kandy's Temple of the Tooth, and vibrant Sinhalese and Tamil traditions shape daily life.",
      image:
        'https://images.pexels.com/photos/3601389/pexels-photo-3601389.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Wildlife & coastlines',
      category: 'Wonder',
      description:
        'Yala and Udawalawe host leopards and elephants, while Mirissa and Unawatuna offer whale watching and surf.',
      image:
        'https://images.pexels.com/photos/2387866/pexels-photo-2387866.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Sigiriya Rock Fortress',
      category: 'Landmark',
      description:
        'The 5th-century palace atop a 200-metre granite monolith is a UNESCO World Heritage site and icon of Sri Lankan history.',
      image:
        'https://images.pexels.com/photos/3601380/pexels-photo-3601380.jpeg?auto=compress&cs=tinysrgb&w=800',
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
  temperatures: COLOMBO_TEMPERATURES,
  temperatureLocation: 'Colombo',
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
