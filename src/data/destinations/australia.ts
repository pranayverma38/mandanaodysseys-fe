import type { DestinationDetail } from './types'

/** Monthly averages for Sydney — Bureau of Meteorology 1991–2020 normals. */
const SYDNEY_TEMPERATURES = [
  { month: 'Jan', avgHighC: 27, avgLowC: 19 },
  { month: 'Feb', avgHighC: 27, avgLowC: 19 },
  { month: 'Mar', avgHighC: 25, avgLowC: 17 },
  { month: 'Apr', avgHighC: 23, avgLowC: 14 },
  { month: 'May', avgHighC: 20, avgLowC: 11 },
  { month: 'Jun', avgHighC: 18, avgLowC: 9 },
  { month: 'Jul', avgHighC: 17, avgLowC: 8 },
  { month: 'Aug', avgHighC: 19, avgLowC: 9 },
  { month: 'Sep', avgHighC: 21, avgLowC: 11 },
  { month: 'Oct', avgHighC: 23, avgLowC: 14 },
  { month: 'Nov', avgHighC: 25, avgLowC: 16 },
  { month: 'Dec', avgHighC: 26, avgLowC: 18 },
]

export const australia: DestinationDetail = {
  name: 'Australia',
  slug: 'australia',
  continent: 'Oceania',
  country: 'Australia',
  description: 'Reef dives, outback adventures, and cosmopolitan coastal cities.',
  thumbnail:
    'https://images.pexels.com/photos/37930273/pexels-photo-37930273.jpeg?auto=compress&cs=tinysrgb&w=800',
  heroImage:
    'https://images.pexels.com/photos/37930273/pexels-photo-37930273.jpeg?auto=compress&cs=tinysrgb&w=1920',
  heroVideo: 'https://videos.pexels.com/video-files/7478078/7478078-uhd_3840_2160_30fps.mp4',
  packageCount: 36,
  introTitle: 'Land down under awaits',
  introDescription:
    'Australia spans a continent of extremes — the Great Barrier Reef, red Outback deserts, rainforests, and vibrant cities like Sydney and Melbourne. Unique wildlife, Aboriginal heritage, and coastal living define the Australian experience.',
  highlightsTitle: 'Down under, distilled',
  highlights: [
    {
      title: 'Cuisine',
      category: 'Cuisine',
      description:
        'From pavlova and meat pies to fresh seafood and multicultural café culture, Australian food reflects its coastal, global identity.',
      image:
        'https://images.pexels.com/photos/29625647/pexels-photo-29625647.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Culture',
      category: 'Culture',
      description:
        'Indigenous heritage, harbour-side cities, outdoor festivals, and a diverse, laid-back lifestyle define modern Australian culture.',
      image:
        'https://images.pexels.com/photos/31597128/pexels-photo-31597128.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Great Barrier Reef',
      category: 'History',
      description:
        'Aboriginal and Torres Strait Islander peoples have cared for this sea country for over 65,000 years. European charts mapped the reef from the 18th century, and it became a protected marine park in 1975.',
      image:
        'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Sydney Opera House',
      category: 'Landmark',
      description:
        'Jørn Utzon\'s sail-shaped masterpiece on Bennelong Point is a UNESCO site and global symbol of Australia.',
      image:
        'https://images.pexels.com/photos/37930273/pexels-photo-37930273.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  bestTimeToVisit: [
    {
      period: 'September – November',
      title: 'Spring (southern hemisphere)',
      description:
        'Wildflowers bloom, temperatures are mild, and cities come alive before summer crowds. Ideal for Sydney and the east coast.',
    },
    {
      period: 'December – February',
      title: 'Summer beach season',
      description:
        'Peak season for beaches and the Great Barrier Reef. Book early for holidays. Northern tropics can be wet (cyclone season).',
    },
    {
      period: 'June – August',
      title: 'Winter & Outback',
      description:
        'Cooler, drier weather suits the Red Centre (Uluru) and northern Queensland. Ski season opens in the Australian Alps.',
    },
  ],
  bestTimeSummary:
    'Australia\'s seasons are reversed from the Northern Hemisphere. Spring and autumn offer comfortable weather nationwide; match your region to avoid tropical wet seasons.',
  temperatures: SYDNEY_TEMPERATURES,
  temperatureLocation: 'Sydney',
  facts: {
    capital: 'Canberra',
    population: '~27 million',
    countryCode: 'AU',
    nativeLanguage: 'English',
    currency: 'Australian Dollar (AUD)',
  },
  faqs: [
    {
      question: 'Do I need a visa for Australia?',
      answer:
        'Most visitors need an Electronic Travel Authority (ETA) or eVisitor visa. Apply online before departure — processing is usually quick.',
    },
    {
      question: 'How big is Australia to travel?',
      answer:
        'Very large — Sydney to Perth is a five-hour flight. Focus on one region per trip: east coast, Red Centre, or Great Barrier Reef.',
    },
    {
      question: 'Is Australia safe for wildlife encounters?',
      answer:
        'Yes with guidance. Guided reef dives, wildlife parks, and ranger-led Outback tours are the safest way to see kangaroos, koalas, and marine life.',
    },
    {
      question: 'What plug type does Australia use?',
      answer:
        'Type I plugs at 230V. Bring an adapter. Sun protection is essential — UV levels are high year-round.',
    },
  ],
}
