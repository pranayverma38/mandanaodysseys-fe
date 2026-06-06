import Avatar from '@/components/avatar'
import type { ItineraryReview } from '@/data/itineraries/types'
import { StarIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { SectionHeading } from '../../(listings)/components/section-heading'
import ItineraryStarRating from './itinerary-star-rating'

interface Props {
  reviewCount: number
  reviewStart: number
  reviews: ItineraryReview[]
}

const ItineraryReviewCard = ({ className, review }: { className?: string; review: ItineraryReview }) => {
  const { author, authorAvatar, content, date, rating } = review

  return (
    <article className={clsx('flex h-full flex-col rounded-xl border border-border bg-card p-4', className)}>
      <div className="flex items-start gap-3">
        <Avatar className="size-8 shrink-0" src={authorAvatar.src} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-sm font-medium">{author}</span>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
          <div className="mt-1 flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((index) => (
              <StarIcon
                key={index}
                aria-hidden="true"
                className={clsx(
                  'size-3 shrink-0',
                  rating > index ? 'text-amber-400' : 'text-neutral-200 dark:text-neutral-600'
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <p
        className="mt-3 line-clamp-4 flex-1 text-sm leading-snug text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  )
}

const ItineraryReviewsSection = ({ reviews, reviewCount, reviewStart }: Props) => {
  return (
    <section className="flex flex-col gap-5 sm:gap-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <SectionHeading>Reviews</SectionHeading>
        <ItineraryStarRating point={reviewStart} reviewCount={reviewCount} />
      </div>

      <div className="hidden-scrollbar -mr-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pr-4 sm:-mr-6 sm:pr-6 md:hidden">
        {reviews.map((review) => (
          <ItineraryReviewCard
            key={review.id}
            review={review}
            className="w-[calc((100%-0.75rem)/1.15)] shrink-0 snap-start"
          />
        ))}
      </div>

      <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <ItineraryReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  )
}

export default ItineraryReviewsSection
