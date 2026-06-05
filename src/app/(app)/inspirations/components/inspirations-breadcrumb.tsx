import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getTourTypeBySlug } from '@/data/destinations'
import Link from 'next/link'

interface InspirationsBreadcrumbProps {
  tourTypeSlug?: string
}

export function InspirationsBreadcrumb({ tourTypeSlug }: InspirationsBreadcrumbProps) {
  const tourType = tourTypeSlug ? getTourTypeBySlug(tourTypeSlug) : undefined

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {tourType ? (
            <BreadcrumbLink asChild>
              <Link href="/inspirations">Inspirations</Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage>Inspirations</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {tourType && (
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
