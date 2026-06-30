import { Divider } from '@/components/divider'
import FeatureSection2 from '@/components/feature-section-2'
import SectionWhyUs from '@/components/section-why-us'
import type { DestinationDetail } from '@/data/destinations'
import type { TItineraryListing } from '@/data/itineraries'
import { DestinationBestTimeSection } from './destination-best-time-section'
import { DestinationFactsSection } from './destination-facts-section'
import { DestinationHolidayTypesSection } from './destination-holiday-types-section'
import { DestinationIntroSection } from './destination-intro-section'
import { DestinationPackagesSection } from './destination-packages-section'
import { DestinationTemperatureChart } from './destination-temperature-chart'

interface DestinationDetailTemplateProps {
  destination: DestinationDetail
  listings: TItineraryListing[]
}

export function DestinationDetailTemplate({ destination, listings }: DestinationDetailTemplateProps) {
  return (
    <div className="flex flex-col">
      <DestinationIntroSection
        destinationSlug={destination.slug}
        introTitle={destination.introTitle}
        introDescription={destination.introDescription}
        highlightsTitle={destination.highlightsTitle}
        highlights={destination.highlights}
        destinationName={destination.name}
        heroImage={destination.heroImage}
        heroVideo={destination.heroVideo}
      />

      <div className="relative z-10 w-full bg-background">
        <div className="container flex flex-col gap-y-16 px-4 sm:px-6 lg:gap-y-24 lg:px-8 lg:pb-12">
        <DestinationPackagesSection destinationName={destination.name} listings={listings} />

        <DestinationBestTimeSection
          destinationName={destination.name}
          bestTimeSummary={destination.bestTimeSummary}
          periods={destination.bestTimeToVisit}
        />

        <DestinationTemperatureChart
          location={destination.temperatureLocation}
          temperatures={destination.temperatures}
        />

        <DestinationFactsSection destinationName={destination.name} facts={destination.facts} />

        <Divider />

        <DestinationHolidayTypesSection
          destinationName={destination.name}
          destinationSlug={destination.slug}
          listings={listings}
        />

        <SectionWhyUs
          logoVariant="icon"
          heading={
            <>
              Why customers <span data-slot="italic" className="text-[#FC6200]">rely on us</span> for travel
            </>
          }
          description="We craft curated tour and travel packages designed around how you love to explore. Whether you are planning a family holiday, a romantic getaway, or an international adventure, we help you discover unforgettable journeys with ease."
        />

        <FeatureSection2
          variant="up"
          faqs={destination.faqs}
          heading={
            <>
              {destination.name} travel <span data-slot="italic">questions</span>
            </>
          }
          imageUrl={destination.heroImage}
        />
        </div>
      </div>
    </div>
  )
}
