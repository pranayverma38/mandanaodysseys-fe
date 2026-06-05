import readyToExploreBg from '@/images/homepage/ready-to-explore-bg.webp'
import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

interface Props {
  className?: string
  heading?: ReactNode
  description?: string
  buttonText?: string
  buttonHref?: string
}

const defaultHeading = (
  <>
    Ready to Explore? Let&apos;s Chat
    <br />
    About Your Dream Trip
  </>
)

export default function SectionReadyToExplore({
  className,
  heading = defaultHeading,
  description = 'Let your wanderlust soar. Start exploring today and let unforgettable experiences await!',
  buttonText = 'Plan Your Trip',
  buttonHref = '/contact',
}: Props) {
  return (
    <section
      className={clsx(
        'relative mt-20 flex min-h-[680px] w-full flex-col bg-cover bg-top bg-no-repeat',
        className
      )}
      style={{ backgroundImage: `url(${readyToExploreBg.src})` }}
    >
      {/* Top fade — only behind heading text, not over the full image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-white via-white/70 to-transparent md:h-64"
      />

      {/* Bottom fade — blends into dark footer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black"
      />

      <div className="relative flex w-full flex-col items-center px-[15px] pt-16 text-center md:pt-20">
        <h2 className="mb-3 max-w-[600px] font-marcellus text-2xl leading-8 font-normal text-black md:text-[46px] md:leading-[45px]">
          {heading}
        </h2>

        <p className="mb-6 max-w-[500px] text-base leading-relaxed text-[#7A7A7A]">{description}</p>

        <Link
          href={buttonHref}
          className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#FC6200] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#e55800]"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  )
}
