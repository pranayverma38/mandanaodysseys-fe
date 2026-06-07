import ExperiencesCard from '@/components/experiences-card'
import type { TItineraryListing } from '@/data/listings'

interface Props {
  listings: TItineraryListing[]
  emptyMessage?: string
  className?: string
}

const ItineraryListingsGrid = ({
  listings,
  emptyMessage = 'No packages match your selection yet. Check back soon or explore other destinations.',
  className = '',
}: Props) => {
  if (listings.length === 0) {
    return <p className={`text-center text-muted-foreground ${className}`}>{emptyMessage}</p>
  }

  return (
    <div
      className={`grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:gap-y-12 lg:grid-cols-3 xl:gap-x-8 2xl:grid-cols-4 2xl:gap-x-7 ${className}`}
    >
      {listings.map((listing) => (
        <ExperiencesCard key={listing.id} data={listing} />
      ))}
    </div>
  )
}

export default ItineraryListingsGrid
