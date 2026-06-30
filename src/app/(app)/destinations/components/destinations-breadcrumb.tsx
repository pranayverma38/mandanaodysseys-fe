import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getDestinationBySlug, getTourTypeBySlug } from '@/data/destinations'
import Link from 'next/link'

interface DestinationsBreadcrumbProps {
  destinationSlug?: string
  tourTypeSlug?: string
  className?: string
  overlay?: boolean
}

export function DestinationsBreadcrumb({
  destinationSlug,
  tourTypeSlug,
  className,
  overlay = false,
}: DestinationsBreadcrumbProps) {
  const destination = destinationSlug ? getDestinationBySlug(destinationSlug) : undefined
  const tourType = tourTypeSlug ? getTourTypeBySlug(tourTypeSlug) : undefined

  const listClassName = overlay
    ? 'text-white/70 [&_[data-slot=breadcrumb-page]]:text-white [&_[data-slot=breadcrumb-link]]:text-white/80 [&_[data-slot=breadcrumb-link]:hover]:text-white'
    : undefined

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className={listClassName}>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {destination ? (
            <BreadcrumbLink asChild>
              <Link href="/destinations">Destinations</Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage>Destinations</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {destination && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {tourType ? (
                <BreadcrumbLink asChild>
                  <Link href={`/destinations/${destination.slug}`}>{destination.name}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{destination.name}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}
        {destination && tourType && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{tourType.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
