import clsx from 'clsx'

interface Props {
  className?: string
  quote?: string
  author?: string
  role?: string
}

const WAVE_UNIT_WIDTH = 18
const WAVE_UNIT_COUNT = 4
const WAVE_VIEWBOX_WIDTH = WAVE_UNIT_WIDTH * WAVE_UNIT_COUNT

// One repeating cubic unit — explicit copies keep start/end height and slope aligned.
const WAVE_PATH = `M0 1.5 ${Array.from({ length: WAVE_UNIT_COUNT }, (_, index) => {
  const x = index * WAVE_UNIT_WIDTH
  return `C${x + 6} 0 ${x + 12} 3 ${x + 18} 1.5`
}).join(' ')}`
const WAVE_LINE_COUNT = 4

function TravelQuoteWaves({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'h-12 w-[132px] overflow-hidden sm:h-14 sm:w-[156px]',
        className,
      )}
      aria-hidden="true"
    >
      <div className="animate-travel-quote-wave flex w-max will-change-transform">
        {[0, 1].map((copy) => (
          <svg
            key={copy}
            className="h-12 w-[132px] shrink-0 sm:h-14 sm:w-[156px]"
            viewBox={`0 0 ${WAVE_VIEWBOX_WIDTH} 20`}
            fill="none"
            aria-hidden="true"
          >
            {Array.from({ length: WAVE_LINE_COUNT }, (_, index) => (
              <path
                key={index}
                d={WAVE_PATH}
                transform={`translate(0, ${index * 5.5})`}
                stroke="#FC6200"
                strokeWidth="1.25"
                strokeLinecap="round"
                fill="none"
              />
            ))}
          </svg>
        ))}
      </div>
    </div>
  )
}

export default function SectionTravelQuote({
  className,
  quote = 'The world is a book, and those who do not travel read only one page.',
  author = 'Saint Augustine',
  role = 'Philosopher',
}: Props) {
  return (
    <section className={clsx('flex flex-col items-center px-4 text-center', className)}>
      <TravelQuoteWaves className="mb-12 sm:mb-10" />

      <blockquote className="max-w-3xl font-marcellus text-[28px] leading-[1.35] font-normal text-foreground sm:text-[34px] lg:text-[40px] lg:leading-[1.3]">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <p className="mt-8 text-sm text-foreground sm:mt-10 sm:text-base">
        <span className="font-medium">{author}</span>
        <span className="mx-2 text-neutral-400">·</span>
        <span className="text-neutral-600 dark:text-neutral-400">{role}</span>
      </p>
    </section>
  )
}
