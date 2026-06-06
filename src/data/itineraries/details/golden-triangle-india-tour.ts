import type { ItineraryDetail } from '../types'
import { createDefaultReviews } from './_shared'

export const goldenTriangleIndiaTour: ItineraryDetail = {
  id: 'itinerary://golden-triangle-india-tour',
  handle: 'golden-triangle-india-tour',
  title: 'Golden Triangle India Tour',
  badge: 'Popular',
  address: 'Delhi · Agra · Jaipur, India',
  reviewStart: 4.8,
  reviewCount: 189,
  categories: [
    { category: 'india', subCategory: 'heritage-tours' },
    { category: 'india', subCategory: 'family-vacations' },
    { category: 'india', subCategory: 'wildlife-safaris' },
  ],
  featuredImage: 'https://images.pexels.com/photos/3761124/pexels-photo-3761124.jpeg?auto=compress&cs=tinysrgb&w=1600',
  galleryImgs: [
    'https://images.pexels.com/photos/3761124/pexels-photo-3761124.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  amenities: [
    { icon: 'Clock01Icon', text: '6 days' },
    { icon: 'UserMultipleIcon', text: 'Private guide' },
    { icon: 'ChefHatIcon', text: 'Meals included' },
  ],
  pricing: {
    price: '$1,250',
    originalPrice: '$1,499',
    feeAndTaxes: '$85',
    total: '$1,335',
  },
  description:
    'Discover the heart of India on this classic 6-day Golden Triangle journey. Explore Mughal architecture in Delhi, witness the sunrise at the Taj Mahal in Agra, and wander the pink-hued palaces of Jaipur with a dedicated private guide throughout.',
  thingsToDo: [
    {
      name: 'Old Delhi Heritage Walk',
      time: 'Day 1 · 9:00 AM - 1:00 PM',
      description:
        'Your journey begins in the atmospheric lanes of Old Delhi, where centuries of Mughal and colonial history unfold at every turn. Meet your private guide at your hotel before heading to Jama Masjid, one of the largest mosques in India, where you will climb the southern minaret for sweeping views over the rooftops of Chandni Chowk. From there, step into the sensory overload of the spice market, silver street, and Kinari Bazaar, where vendors have traded fabrics, jewellery, and street snacks for generations. A curated rickshaw ride carries you through narrow alleys too tight for cars, passing havelis, temples, and the famous Paranthe Wali Gali. The morning concludes at Raj Ghat, the serene memorial to Mahatma Gandhi, where your guide shares stories of India\'s independence movement. Light refreshments of masala chai and samosas are included before returning to your hotel for an afternoon at leisure to recover from jet lag.',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'New Delhi Monuments & Humayun\'s Tomb',
      time: 'Day 2 · 8:30 AM - 3:30 PM',
      description:
        'After breakfast, explore the grand boulevards of Lutyens\' New Delhi. Drive past Rashtrapati Bhavan and India Gate, then spend unhurried time at Humayun\'s Tomb, the UNESCO-listed garden tomb that inspired the Taj Mahal\'s design. Your guide explains the Persian-influenced architecture and the dynasty that shaped North India. Continue to Qutub Minar and the Iron Pillar, marvelling at craftsmanship that has survived over a thousand years. A stop at a curated handicraft emporium offers the chance to see block printing, pietra dura marble work, and Pashmina weaving demonstrations without any pressure to buy. Lunch is served at a heritage haveli restaurant serving regional thali with vegetarian and non-vegetarian options. The afternoon ends with a visit to Lotus Temple or Agrasen ki Baoli depending on your interests, before a relaxed evening and optional sound-and-light show at Red Fort (seasonal, tickets included when running).',
      imageUrl: 'https://images.pexels.com/photos/3761124/pexels-photo-3761124.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Taj Mahal at Sunrise',
      time: 'Day 3 · 5:30 AM - 10:00 AM',
      description:
        'Depart early for Agra so you reach the Taj Mahal as the first pale light touches the white marble — the moment this itinerary is built around. Your guide leads you through the south gate, explaining the love story of Shah Jahan and Mumtaz Mahal, the symmetry of the charbagh gardens, and the calligraphy that scales perfectly as it rises up the facade. After ample time for photography from the main platform and the Diana Bench viewpoint, continue to Agra Fort, the red sandstone citadel where the emperor was later imprisoned with a view of his masterpiece. Visit a family-run marble inlay workshop to watch artisans chip semi-precious stones into floral motifs using techniques unchanged since the 17th century. You will have time to browse finished pieces at your own pace. Return to your hotel for brunch, then the afternoon is free to rest by the pool, enjoy the spa, or explore Sadar Bazaar for leather goods and petha sweets before a optional Mohabbat the Taj live performance in the evening.',
      imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Fatehpur Sikri & Drive to Jaipur',
      time: 'Day 4 · 9:00 AM - 6:00 PM',
      description:
        'Check out after breakfast and drive toward the Pink City with a guided stop at Fatehpur Sikri, Akbar\'s abandoned capital and a UNESCO World Heritage Site. Walk the Buland Darwaza, the palace of Jodha Bai, and the Sufi shrine of Salim Chishti while your guide recounts how this sandstone city flourished and was suddenly deserted. The journey continues through rural Rajasthan, with a comfort stop at a clean highway restaurant where lunch is included. Upon arrival in Jaipur, check in to your palace hotel and freshen up before a gentle orientation walk through the old city walls. Optional add-on: a private session with a local astronomer at Jantar Mantar, explaining the massive sundials and zodiac instruments built by Maharaja Jai Singh II. Dinner tonight is at your leisure — your guide will share recommendations for rooftop restaurants overlooking the Hawa Mahal.',
      imageUrl: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Amber Fort & Jaipur City Palace',
      time: 'Day 5 · 8:00 AM - 4:00 PM',
      description:
        'Begin at Amber Fort, ascending by jeep or elephant ride (subject to availability and ethical operator schedules) to the hilltop fortress. Inside, explore the Sheesh Mahal mirror palace, the zenana courtyards, and the panoramic ramparts overlooking Maota Lake. Descend to the town of Amer for a brief photo stop at Panna Meena ka Kund, the geometric stepwell. Back in Jaipur, tour the City Palace complex — still partly occupied by the royal family — including the Peacock Gate, armoury museum, and textile galleries. Stroll Johari Bazaar and Bapu Bazaar for block-print textiles, lac bangles, and blue pottery; your guide helps distinguish fair-priced artisan work from mass-produced souvenirs. A traditional Rajasthani thali dinner is included this evening at a restored haveli, complete with live folk music and kalbeliya dance performance. Dietary requirements are accommodated with advance notice.',
      imageUrl: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Hawa Mahal, Departure & Extension Options',
      time: 'Day 6 · 9:00 AM - 12:00 PM',
      description:
        'On your final morning, photograph the honeycomb facade of Hawa Mahal from the best street-level vantage points before the crowds arrive. If time permits, visit the nearby Albert Hall Museum or indulge in a last-minute shopping stop for gems and handicrafts with guide-assisted bargaining. Transfer to Jaipur International Airport or return overland to Delhi by express train or private car, depending on your onward plans. Your package includes assisted check-in and porterage at the airport. Travellers extending their stay can add optional experiences: a hot-air balloon ride over Amber at dawn, a cooking class with a Jaipur family, a day trip to Pushkar or Ranthambore National Park for a tiger safari, or a luxury train connection toward Udaipur. Our team will share extension pricing and availability when you book — many guests combine this Golden Triangle route with Goa beaches or Kerala backwaters for a longer India discovery.',
      imageUrl: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ],
  includes: [
    '5 nights hotel accommodation with breakfast',
    'Private air-conditioned vehicle and driver',
    'English-speaking tour guide',
    'Monument entrance fees (Taj Mahal, forts & palaces)',
    'Welcome dinner in Jaipur',
    'All applicable taxes',
  ],
  excludes: [
    'International flights',
    'Travel insurance',
    'Personal expenses and shopping',
    'Visa fees (if applicable)',
    'Tips and gratuities',
    'Meals not mentioned in inclusions',
  ],
  accommodations: [
    {
      name: 'The Oberoi New Delhi',
      imageUrl: 'https://images.pexels.com/photos/1006968/pexels-photo-1006968.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'New Delhi, India',
    },
    {
      name: 'ITC Mughal, Agra',
      imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      location: 'Agra, Uttar Pradesh',
    },
    {
      name: 'Rambagh Palace',
      imageUrl: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      location: 'Jaipur, Rajasthan',
    },
    {
      name: 'The Imperial New Delhi',
      imageUrl: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      location: 'Janpath, New Delhi',
    },
  ],
  map: { lat: 27.1751, lng: 78.0421 },
  reviews: createDefaultReviews([
    {
      title: 'Golden Triangle done right',
      content: 'The Taj Mahal sunrise was unforgettable. Hotels and transfers were seamless.',
    },
  ]),
}
