import { StarIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

interface Props {
  point: number
  reviewCount: number
  className?: string
}

const ItineraryStarRating = ({ className, point, reviewCount }: Props) => {
  const filledStars = Math.floor(point)

  return (
    <div className={clsx('flex shrink-0 items-center gap-x-1.5 text-sm', className)}>
      <div className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((index) => (
          <StarIcon
            key={index}
            aria-hidden="true"
            className={clsx(
              'size-3.5',
              index < filledStars ? 'text-amber-400' : 'text-neutral-200 dark:text-neutral-600'
            )}
          />
        ))}
      </div>
      <span className="font-medium">{point}</span>
      <span className="text-muted-foreground">({reviewCount})</span>
    </div>
  )
}

export default ItineraryStarRating
