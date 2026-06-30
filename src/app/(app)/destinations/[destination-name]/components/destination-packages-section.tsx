import { Heading } from '@/components/heading'
import ItineraryListingsGrid from '@/components/itinerary-listings-grid'
import { Text } from '@/components/text'
import type { TItineraryListing } from '@/data/itineraries'

interface DestinationPackagesSectionProps {
  destinationName: string
  listings: TItineraryListing[]
}

export function DestinationPackagesSection({ destinationName, listings }: DestinationPackagesSectionProps) {
  return (
    <section className="space-y-8">
      <div>
        <Heading level={2}>
          Tour packages in <span data-slot="italic">{destinationName}</span>
        </Heading>
        <Text className="mt-3 max-w-3xl text-muted-foreground">
          Curated itineraries with guided experiences, handpicked stays, and seamless transfers — designed for how you
          love to travel.
        </Text>
      </div>

      <ItineraryListingsGrid
        listings={listings}
        emptyMessage={`No packages for ${destinationName} yet. Browse holiday types below or explore other destinations.`}
      />
    </section>
  )
}
