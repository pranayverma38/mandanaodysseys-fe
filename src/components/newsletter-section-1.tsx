'use client'

import ctaImage1449 from '@/images/cta-images/1449.jpg'
import ctaImage2757 from '@/images/cta-images/2757.jpg'
import ctaImage602509 from '@/images/cta-images/602509.jpg'
import iconWhiteLogo from '@/images/logos/icon-white.png'
import newsletterSectionBg from '@/images/news-letter-bg.jpg'

import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ButtonCircle } from './button'
import { Heading } from './heading'
import { Text } from './text'

const NEWSLETTER_BG_IMAGES: StaticImageData[] = [
  newsletterSectionBg,
  ctaImage1449,
  ctaImage2757,
  ctaImage602509,
]

function getRandomNewsletterBg() {
  return NEWSLETTER_BG_IMAGES[Math.floor(Math.random() * NEWSLETTER_BG_IMAGES.length)]
}

interface NewsletterProps {
  className?: string
}

export default function NewsletterSection({ className = '' }: NewsletterProps) {
  const [backgroundImage] = useState(getRandomNewsletterBg)

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-2xl p-4 md:p-10 lg:p-14">
        <Image src={backgroundImage} className="-z-10 object-cover" fill alt="cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/20 via-black/15 to-transparent"></div>

        <Image
          src={iconWhiteLogo}
          alt="Mandana Odysseys"
          width={56}
          height={56}
          className="absolute top-4 right-4 z-10 h-11 w-11 md:top-10 md:right-10 md:h-14 md:w-14"
        />

        <div className="relative z-10 flex flex-col justify-between gap-24 text-white lg:gap-40 xl:gap-60">
          <div className="max-w-2xl">
            <Heading className="text-white">
              Want product news and updates?{' '}
              <span className="font-style-script text-[1.3em] text-white italic">Sign up</span> for our
              newsletter.
            </Heading>
          </div>

          <form className="w-full max-w-md">
            <div className="flex gap-x-0.5">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-full border-white bg-white px-4 py-2 text-sm/6 text-zinc-900 placeholder:text-zinc-600 sm:px-6"
              />
              <ButtonCircle color="white" className="border-white!">
                <ArrowUpRightIcon className="size-4! rtl:-rotate-90" />
              </ButtonCircle>
            </div>
            <div className="mt-4 pl-1.5">
              <Text className="text-xs text-white">
                We care about your data. Read our{' '}
                <Link href="#" className="text-white underline">
                  privacy&nbsp;policy
                </Link>
                .
              </Text>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
