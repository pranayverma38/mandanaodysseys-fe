'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { Link } from '../link'
import { MotionDiv } from '../motion-div'

interface CharmsOfAsiaImage {
  src: string
  alt: string
  flexClass: string
  sizeClass: string
  delay: number
}

const IMAGES: CharmsOfAsiaImage[] = [
  {
    src: '/images/charms-of-asia/charms-asia-1.webp',
    alt: 'Clownfish in coral reef',
    flexClass: 'flex-[4]',
    sizeClass: 'h-[92px] w-full sm:h-[180px] sm:w-[90px] sm:flex-none lg:h-[195px] lg:w-[98px]',
    delay: 0.2,
  },
  {
    src: '/images/charms-of-asia/charms-asia-2.webp',
    alt: 'Snorkeling in tropical waters',
    flexClass: 'flex-[7]',
    sizeClass: 'h-[162px] w-full sm:h-[340px] sm:w-[170px] sm:flex-none lg:h-[391px] lg:w-[195px]',
    delay: 0.3,
  },
  {
    src: '/images/charms-of-asia/charms-asia-3.webp',
    alt: 'Woman walking on a beach',
    flexClass: 'flex-[7]',
    sizeClass: 'h-[162px] w-full sm:h-[340px] sm:w-[170px] sm:flex-none lg:h-[391px] lg:w-[195px]',
    delay: 0.4,
  },
  {
    src: '/images/charms-of-asia/charms-asia-4.webp',
    alt: 'Beach chairs under a yellow umbrella',
    flexClass: 'flex-[7]',
    sizeClass: 'h-[162px] w-full sm:h-[340px] sm:w-[170px] sm:flex-none lg:h-[391px] lg:w-[195px]',
    delay: 0.5,
  },
]

interface Props {
  className?: string
}

export default function SectionCharmsOfAsia({ className }: Props) {
  return (
    <section
      id="section-charms-of-asia"
      className={clsx('section-charms-of-asia w-full lg:pt-[100px]', className)}
    >
      <div
        className={clsx(
          'mx-auto flex w-full max-w-[1140px] flex-col flex-nowrap items-center justify-start gap-[46px]',
          'lg:flex-row lg:items-center lg:gap-0'
        )}
      >
        <div
          className={clsx(
            'flex w-full shrink-0 grow-0 basis-auto flex-col items-center text-center',
            'lg:items-start lg:text-left',
            'lg:w-[40%] lg:max-w-[456px] lg:pr-10'
          )}
        >
          <h2 className="mb-4 font-marcellus text-[32px] leading-none font-normal text-foreground lg:mb-4 lg:text-[46px] lg:leading-[58px]">
            Indulge in the{' '}
            <span className="font-style-script text-[1.3em] text-[#FC6200] italic">Charms</span> of Asia
          </h2>

          <p className="mb-6 max-w-none text-base leading-[26px] text-[#7A7A7A] lg:mb-6 lg:text-lg">
            Planning an international holiday shouldn&apos;t be overwhelming. At{' '}
            <span className="font-semibold text-foreground">Mandana Odysseys</span>, we make travel easy and personally
            designed around you. Discover a smarter way to plan unforgettable journeys that reflect your style.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[#FC6200] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#e55800] lg:self-start"
          >
            Contact Us
          </Link>
        </div>

        <div
          className={clsx(
            'flex w-full max-w-full min-w-0 flex-row flex-nowrap',
            'items-center justify-center overflow-hidden py-0',
            'lg:min-h-[400px] lg:flex-1 lg:overflow-visible'
          )}
        >
          {IMAGES.map((image) => (
            <MotionDiv
              key={image.src}
              className={clsx('relative min-w-0', image.flexClass, image.sizeClass)}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -15% 0px' }}
              transition={{
                delay: image.delay,
                duration: 0.9,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 30vw, 200px"
                className="rounded-r-[200px] object-cover"
              />
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
}
