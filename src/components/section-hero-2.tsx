import { ListingType } from '@/type'
import clsx from 'clsx'
import { ReactNode } from 'react'
import HeroSection2Content from './section-hero-2-content'
import './hero-search-glare.css'

interface Props {
  className?: string
  title?: ReactNode
  videoUrl?: string
  searchFormInitTab?: ListingType
  showSearchTabs?: boolean
}

const HeroSection2 = ({
  className,
  title = (
    <>
      Extraordinary <span data-slot="style-script">Journey</span> Awaits
    </>
  ),
  videoUrl = '/videos/header/header-video.webm',
  searchFormInitTab = 'Experiences',
  showSearchTabs = false,
}: Props) => {
  return (
    <div
      className={clsx(
        'section-hero-2 relative z-[26] flex w-full h-[85dvh] min-h-[85dvh] max-h-[85dvh] lg:h-[90dvh] lg:min-h-[90dvh] lg:max-h-[90dvh]',
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <video
          width="100%"
          height="100%"
          controls={false}
          preload="auto"
          muted
          autoPlay
          loop
          playsInline
          className="absolute inset-0 size-full object-cover object-center"
        >
          <source src={videoUrl} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[#0a0705]/55" aria-hidden />

      <HeroSection2Content
        title={title}
        searchFormInitTab={searchFormInitTab}
        showSearchTabs={showSearchTabs}
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 z-10 w-full leading-0"
        aria-hidden
      >
        <svg
          className="relative left-1/2 block h-[71px] w-[calc(100%+2px)] -translate-x-1/2 translate-y-[2px]"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="matrix(-1 0 0 -1 1000 100)">
            <path
              className="fill-white"
              d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default HeroSection2
