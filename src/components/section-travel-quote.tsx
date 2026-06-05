import clsx from 'clsx'

interface Props {
  className?: string
  quote?: string
  author?: string
  role?: string
}

function TravelQuoteWaves({ className }: { className?: string }) {
  const lines = [0, 5.5, 11, 16.5]

  return (
    <svg
      className={clsx('h-12 w-[132px] sm:h-14 sm:w-[156px]', className)}
      viewBox="0 0 72 20"
      fill="none"
      aria-hidden="true"
    >
      {lines.map((y) => (
        <path
          key={y}
          d="M0 1.5 C6 0 12 3 18 1.5 S30 0 36 1.5 S48 3 54 1.5 S66 0 72 1.5"
          transform={`translate(0, ${y})`}
          stroke="#FC6200"
          strokeWidth="1.25"
          strokeLinecap="round"
          fill="none"
        />
      ))}
    </svg>
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
