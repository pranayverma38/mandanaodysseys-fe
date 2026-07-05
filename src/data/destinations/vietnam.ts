import type { DestinationDetail } from './types'
import { VIETNAM_TEMPERATURE_CITIES } from './temperature-cities'

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
      title: 'Cuisine',
      category: 'Cuisine',
      description:
        'Pho, banh mi, fresh spring rolls, and ca phe sua da — Vietnamese food balances herbs, broth, and bold regional flavours.',
      image:
        'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Culture',
      category: 'Culture',
      description:
        'The ao dai, water puppetry, ethnic minority markets, and centuries of craft traditions reflect Vietnam\'s layered heritage.',
      image:
        'https://images.pexels.com/photos/32221272/pexels-photo-32221272.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Ha Long Bay',
      category: 'History',
      description:
        'Legend tells of dragons descending to defend Vietnam\'s coast, shaping the bay\'s islands. Archaeological sites reveal human settlement for thousands of years, and the area later became a strategic maritime frontier.',
      image:
        'https://images.pexels.com/photos/372945/pexels-photo-372945.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Hoi An',
      category: 'Landmark',
      description:
        'A beautifully preserved trading port where yellow-walled shop houses and lantern festivals create an unforgettable atmosphere.',
      image:
        'https://images.pexels.com/photos/36886920/pexels-photo-36886920.jpeg?auto=compress&cs=tinysrgb&w=800',
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
  temperatureCities: VIETNAM_TEMPERATURE_CITIES,
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
