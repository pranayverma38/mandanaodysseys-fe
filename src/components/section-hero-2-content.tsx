'use client'

import { ListingType } from '@/type'
import { ReactNode } from 'react'
import HeroSearchFormMinimal from './hero-search-form/hero-search-form-minimal'
import HeroSearchFormMobile from './hero-search-form-mobile/hero-search-form-mobile'
import { MotionDiv } from './motion-div'

interface Props {
  title: ReactNode
  searchFormInitTab: ListingType
  showSearchTabs: boolean
}

const HeroSection2Content = ({ title }: Props) => {
  return (
    <div className="section-hero-2__stack pointer-events-auto relative flex h-full min-h-0 w-full flex-1 flex-col px-4">
      <MotionDiv
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="section-hero-2__search relative z-20 hidden w-full pt-[6.5rem] lg:block"
      >
        <HeroSearchFormMinimal className="mx-auto max-w-3xl" />
      </MotionDiv>

      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 text-center">
        <div className="flex w-full max-w-4xl flex-col items-center gap-6 sm:gap-8">
          <MotionDiv
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="section-hero-2__title text-white"
          >
            <h1 className="max-w-4xl text-[clamp(32px,calc(32px+13*((100vw-320px)/(1024-320))),45px)] leading-[1.1] font-normal tracking-[-0.02em] [&_span[data-slot=style-script]]:font-style-script [&_span[data-slot=style-script]]:text-[clamp(40px,calc(40px+39*((100vw-320px)/(1024-320))),79px)] [&_span[data-slot=style-script]]:font-thin [&_span[data-slot=style-script]]:opacity-90 [&_span[data-slot=style-script]]:italic">
              {title}
            </h1>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="section-hero-2__search relative z-20 w-full lg:hidden"
          >
            <HeroSearchFormMobile compact variant="hero" className="mx-auto" />
          </MotionDiv>
        </div>
      </div>
    </div>
  )
}

export default HeroSection2Content
