import { Divider } from '@/components/divider'
import { ListingMapMarker } from './listing-map-maker'
import { SectionHeading, SectionSubheading } from './section-heading'
import clsx from 'clsx'

interface Props {
  className?: string
  heading?: string
  subheading?: string
  showHeader?: boolean
  location: {
    id: number
    name: string
    lng: number
    lat: number
  }
}

const SectionMap = ({
  className,
  heading = 'Location',
  subheading,
  showHeader = true,
  location,
}: Props) => {
  return (
    <div className={clsx(showHeader && 'listingSection__wrap', className)}>
      {showHeader ? (
        <>
          <div>
            <SectionHeading>{heading}</SectionHeading>
            {subheading ? <SectionSubheading>{subheading}</SectionSubheading> : null}
          </div>
          <Divider className="w-14!" />
        </>
      ) : null}

      <div className="h-96 w-full overflow-hidden rounded-xl sm:h-120">
        <ListingMapMarker location={location} />
      </div>
    </div>
  )
}

export default SectionMap
