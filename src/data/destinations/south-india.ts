import type { DestinationDetail } from './types'
import { SOUTH_INDIA_TEMPERATURE_CITIES } from './temperature-cities'

export const southIndia: DestinationDetail = {
  name: 'South India',
  slug: 'south-india',
  enabled: true,
  continent: 'Asia',
  country: 'India',
  description: 'Temple towns, tropical coasts, spice hills, and backwater journeys across peninsular India.',
  thumbnail: '/images/destinations/south-india-thumbnail.jpg',
  heroImage:
    'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=1920',
  heroVideo: 'https://video.gumlet.io/6ade6b8fd8b4449c83d285c5/6af184375a178b8ae08954bb/main.mp4',
  packageCount: 0,
  introTitle: 'Tropical India at its most soulful',
  introDescription:
    'South India blends Dravidian temple architecture, coastal cuisine, tea-covered highlands, and a slower travel rhythm. Kerala backwaters, Tamil Nadu\'s great temple cities, Karnataka\'s palaces and coffee country, and Goa\'s coastline create a region that feels distinct from the north in both landscape and culture.',
  highlightsTitle: 'Backwaters, temples & coastal flavour',
  highlights: [
    {
      title: 'Cuisine',
      category: 'Cuisine',
      description:
        'Dosas, idlis, appam, Chettinad curries, seafood, filter coffee, and banana-leaf thalis make South India one of the subcontinent\'s richest food regions.',
      image: '/images/destinations/southindiacuisine.jpg',
    },
    {
      title: 'Culture',
      category: 'Culture',
      description:
        'Classical Carnatic music, Bharatanatyam dance, Onam festivities, temple rituals, and handloom traditions shape everyday life across the south.',
      image: '/images/destinations/southindiaculture.jpg',
    },
    {
      title: 'Temple Kingdoms',
      category: 'History',
      description:
        'The Chola, Pandya, Vijayanagara, and Hoysala dynasties left behind monumental temples, palace cities, and sculptural traditions that still define the region.',
      image: '/images/destinations/southindiahistory.jpg',
    },
    {
      title: 'Kerala Backwaters',
      category: 'Landmark',
      description:
        'The serene network of lagoons, canals, and palm-fringed villages in Kerala is one of South India\'s most recognisable travel experiences.',
      image: '/images/destinations/southindiatourist.jpg',
    },
  ],
  bestTimeToVisit: [
    {
      period: 'November - February',
      title: 'Best overall season',
      description:
        'Cooler, drier weather makes this the best time for Kerala, Tamil Nadu, Karnataka, Hyderabad, and most coastal and city circuits.',
    },
    {
      period: 'March - May',
      title: 'Hill country escapes',
      description:
        'The lowlands grow hot, but Munnar, Coorg, Ooty, and Kodaikanal remain pleasant for tea estates, nature stays, and slower mountain trips.',
    },
    {
      period: 'June - September',
      title: 'Monsoon green season',
      description:
        'Kerala and the Western Ghats turn intensely lush. This is excellent for monsoon wellness stays, Ayurveda retreats, and atmospheric houseboat journeys.',
    },
  ],
  bestTimeSummary:
    'November to February is the easiest time for a broad South India itinerary. Monsoon travel can be especially rewarding in Kerala if you want greenery, lower crowds, and spa-focused stays.',
  temperatureCities: SOUTH_INDIA_TEMPERATURE_CITIES,
  facts: {
    capital: 'No single regional capital; major gateways include Bengaluru, Chennai, Hyderabad, and Kochi',
    population: '~300 million across southern states and union territories',
    countryCode: 'IN',
    nativeLanguage: 'Tamil, Telugu, Kannada, Malayalam, and other regional languages',
    currency: 'Indian Rupee (INR)',
  },
  faqs: [
    {
      question: 'What is the best first trip to South India?',
      answer:
        'A classic first route combines Kochi, Munnar, Alleppey, and Kumarakom in Kerala. Another strong option is Chennai, Mahabalipuram, Pondicherry, and Madurai for heritage and coast.',
    },
    {
      question: 'Is South India better than North India for a relaxed trip?',
      answer:
        'Often yes. Many travellers find South India greener, slower paced, and easier for wellness, beach, and backwater experiences, while still offering excellent culture and history.',
    },
    {
      question: 'Can I visit South India during the monsoon?',
      answer:
        'Yes, especially for Kerala wellness stays, plantation retreats, and travellers who enjoy rain-washed landscapes. You just need more flexible day planning and rain-ready transport.',
    },
    {
      question: 'What should I focus on in South India: temples, nature, or beaches?',
      answer:
        'It depends on your pace and interests. Tamil Nadu is strongest for temple architecture, Kerala for nature and backwaters, Karnataka for coffee hills and heritage, and Goa for beaches and nightlife.',
    },
  ],
}
