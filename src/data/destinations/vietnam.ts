import type { DestinationDetail } from './types'

/** Monthly averages for Hanoi — Vietnam Institute of Meteorology and Hydrology normals. */
const HANOI_TEMPERATURES = [
  { month: 'Jan', avgHighC: 20, avgLowC: 14 },
  { month: 'Feb', avgHighC: 21, avgLowC: 15 },
  { month: 'Mar', avgHighC: 23, avgLowC: 17 },
  { month: 'Apr', avgHighC: 27, avgLowC: 21 },
  { month: 'May', avgHighC: 32, avgLowC: 24 },
  { month: 'Jun', avgHighC: 33, avgLowC: 26 },
  { month: 'Jul', avgHighC: 33, avgLowC: 26 },
  { month: 'Aug', avgHighC: 32, avgLowC: 26 },
  { month: 'Sep', avgHighC: 31, avgLowC: 25 },
  { month: 'Oct', avgHighC: 29, avgLowC: 23 },
  { month: 'Nov', avgHighC: 26, avgLowC: 19 },
  { month: 'Dec', avgHighC: 22, avgLowC: 15 },
]

export const vietnam: DestinationDetail = {
  name: 'Vietnam',
  slug: 'vietnam',
  continent: 'Asia',
  country: 'Vietnam',
  description: 'Ha Long Bay, lantern-lit streets, and rich cuisine from north to south.',
  thumbnail:
    'https://images.pexels.com/photos/36662118/pexels-photo-36662118.jpeg?auto=compress&cs=tinysrgb&w=800',
  heroImage:
    'https://images.pexels.com/photos/36662118/pexels-photo-36662118.jpeg?auto=compress&cs=tinysrgb&w=1920',
  heroVideo: 'https://videos.pexels.com/video-files/17246662/17246662-hd_1920_1080_30fps.mp4',
  packageCount: 40,
  introTitle: 'Timeless charm unfolds',
  introDescription:
    'Vietnam stretches over 1,600 kilometres from the Chinese border to the Mekong Delta. French-colonial Hanoi, lantern-lit Hoi An, dynamic Ho Chi Minh City, and Ha Long Bay\'s karst seascape define a country of remarkable contrast.',
  highlightsTitle: 'Vietnam\'s greatest hits',
  highlights: [
    {
      title: 'Imperial Hue & war history',
      category: 'History',
      description:
        'The Nguyen Dynasty citadel in Hue and sites like Cu Chi Tunnels and the War Remnants Museum trace Vietnam\'s layered past.',
      image:
        'https://images.pexels.com/photos/3601380/pexels-photo-3601380.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Water puppetry & craft traditions',
      category: 'Culture',
      description:
        'Ethnic minority markets in Sapa, ao dai silk tailoring, and water puppet shows reflect centuries of Vietnamese artistry.',
      image:
        'https://images.pexels.com/photos/3601389/pexels-photo-3601389.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Ha Long Bay',
      category: 'Wonder',
      description:
        'Thousands of limestone islands rise from emerald waters — a UNESCO World Heritage site best explored by overnight cruise.',
      image:
        'https://images.pexels.com/photos/372945/pexels-photo-372945.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Hoi An Ancient Town',
      category: 'Landmark',
      description:
        'A beautifully preserved trading port where yellow-walled shop houses and lantern festivals create an unforgettable atmosphere.',
      image:
        'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  bestTimeToVisit: [
    {
      period: 'March – April',
      title: 'North & central Vietnam',
      description:
        'Mild, dry weather in Hanoi and Ha Long Bay. Hoi An and Hue are comfortable before summer heat builds.',
    },
    {
      period: 'December – February',
      title: 'South Vietnam',
      description:
        'Dry season in Ho Chi Minh City and the Mekong Delta — ideal for southern exploration when the north can be cool and misty.',
    },
    {
      period: 'September – November',
      title: 'Central coast',
      description:
        'Typhoon season ends and beaches from Da Nang to Nha Trang enjoy calmer weather and warm seas.',
    },
  ],
  bestTimeSummary:
    'Vietnam\'s climate varies by latitude — there is no single best month. Match your route: north in spring, south in winter, central coast in autumn.',
  temperatures: HANOI_TEMPERATURES,
  temperatureLocation: 'Hanoi',
  facts: {
    capital: 'Hanoi',
    population: '~100 million',
    countryCode: 'VN',
    nativeLanguage: 'Vietnamese',
    currency: 'Vietnamese Dong (VND)',
  },
  faqs: [
    {
      question: 'How many days do I need in Vietnam?',
      answer:
        'Two weeks allows a north-to-south overview: Hanoi, Ha Long Bay, Hoi An, and Ho Chi Minh City. Add time for Sapa trekking or Mekong Delta homestays.',
    },
    {
      question: 'Is Vietnam good for food lovers?',
      answer:
        'Among the best in Asia. Street food is safe and affordable at busy stalls. Our guides can recommend trusted vendors and cooking classes.',
    },
    {
      question: 'Do I need a visa for Vietnam?',
      answer:
        'Many nationalities need an e-visa or visa on arrival. Apply online before travel and check the latest policy for your passport.',
    },
    {
      question: 'What is the best way to travel between cities?',
      answer:
        'Domestic flights connect major hubs quickly. Overnight trains and private car transfers suit scenic routes. Our packages handle inter-city logistics.',
    },
  ],
}
