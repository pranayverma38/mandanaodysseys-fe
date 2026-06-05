import clsx from 'clsx'
import { ReactNode } from 'react'
import { Link } from './link'
import { MotionDiv } from './motion-div'

interface Props {
  className?: string
  title?: ReactNode
  ctaLabel?: string
  ctaHref?: string
  videoUrl?: string
}

const HeroSection2 = ({
  className,
  title = (
    <>
      Extraordinary <span data-slot="style-script">Journey</span> Awaits
    </>
  ),
  ctaLabel = 'Explore Now',
  ctaHref = '/stay-search',
  videoUrl = '/videos/header/header-video.mp4',
}: Props) => {
  return (
    <div
      className={clsx(
        'section-hero-2 relative flex w-full h-[85dvh] min-h-[85dvh] max-h-[85dvh] lg:h-[90dvh] lg:min-h-[90dvh] lg:max-h-[90dvh] lg:justify-center',
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
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
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="absolute inset-0 bg-[#0a0705]/55" aria-hidden />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-28 text-center text-white sm:py-32">
        <MotionDiv initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <h1 className="max-w-4xl text-[clamp(32px,calc(32px+13*((100vw-320px)/(1024-320))),45px)] leading-[1.1] font-normal tracking-[-0.02em] [&_span[data-slot=style-script]]:font-style-script [&_span[data-slot=style-script]]:text-[clamp(40px,calc(40px+39*((100vw-320px)/(1024-320))),79px)] [&_span[data-slot=style-script]]:font-thin [&_span[data-slot=style-script]]:opacity-90 [&_span[data-slot=style-script]]:italic">
            {title}
          </h1>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="mt-8 sm:mt-10"
        >
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-full border border-[#c47a3a]/90 bg-[#0a0a0a]/75 px-7 py-2.5 text-sm font-medium tracking-wide text-white shadow-[0_0_0_1px_rgba(196,122,58,0.15)_inset] backdrop-blur-[2px] transition-colors hover:border-[#d4894a] hover:bg-[#141414]/85"
          >
            {ctaLabel}
          </Link>
        </MotionDiv>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 z-10 w-full overflow-hidden leading-0"
        aria-hidden
      >
        <svg
          className="relative left-1/2 block h-[71px] w-[calc(100%+1.3px)] -translate-x-1/2"
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
