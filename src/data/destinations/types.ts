export type DestinationContinent = 'Asia' | 'Europe' | 'Oceania'

export type DestinationHighlightCategory = 'Cuisine' | 'Culture' | 'History' | 'Landmark'

export type DestinationHighlight = {
  title: string
  category: DestinationHighlightCategory
  description: string
  image: string
}

export type DestinationBestTimePeriod = {
  period: string
  title: string
  description: string
}

export type DestinationMonthlyTemperature = {
  month: string
  avgHighC: number
  avgLowC: number
  rainfallMm: number
}

export type DestinationCityTemperature = {
  city: string
  temperatures: DestinationMonthlyTemperature[]
}

export type DestinationFacts = {
  capital: string
  population: string
  countryCode: string
  nativeLanguage: string
  currency: string
}

export type DestinationFaq = {
  question: string
  answer: string
}

export type Destination = {
  name: string
  slug: string
  continent: DestinationContinent
  country: string
  description: string
  thumbnail: string
  packageCount: number
}

export type DestinationDetail = Destination & {
  introTitle: string
  introDescription: string
  heroImage: string
  heroVideo?: string
  highlightsTitle: string
  highlights: DestinationHighlight[]
  bestTimeToVisit: DestinationBestTimePeriod[]
  bestTimeSummary: string
  temperatureCities: DestinationCityTemperature[]
  facts: DestinationFacts
  faqs: DestinationFaq[]
}

export type TourType = {
  name: string
  slug: string
  description: string
}
