import {
  Beach02FreeIcons,
  Beach02Icon,
  City03Icon,
  EarthIcon,
  HotAirBalloonFreeIcons,
  House04Icon,
  MountainIcon,
  Time04Icon,
  UserMultipleIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { Heading } from './heading'
import { Link } from './link'

interface Props {
  className?: string
  heading?: ReactNode
}

const DEMO_DATA = [
  {
    id: '1',
    icon: MountainIcon,
    title: 'Adventure Tours',
    href: '/stay-categories/location-name',
  },
  {
    id: '2',
    icon: City03Icon,
    title: 'Cultural Journeys',
    href: '/stay-categories/location-name',
  },
  {
    id: '3',
    icon: House04Icon,
    title: 'Family Vacations',
    href: '/stay-categories/location-name',
  },
  {
    id: '4',
    icon: HotAirBalloonFreeIcons,
    title: 'Luxury Escapes',
    href: '/stay-categories/location-name',
  },
  {
    id: '5',
    icon: Beach02FreeIcons,
    title: 'Honeymoon Packages',
    href: '/stay-categories/location-name',
  },
  {
    id: '6',
    icon: UserMultipleIcon,
    title: 'Group Tours',
    href: '/stay-categories/location-name',
  },
  {
    id: '7',
    icon: Time04Icon,
    title: 'Weekend Getaways',
    href: '/stay-categories/location-name',
  },
  {
    id: '8',
    icon: EarthIcon,
    title: 'International Holidays',
    href: '/stay-categories/location-name',
  },
]

export default function InspirationFutureGetawaysSection({
  className,
  heading = (
    <>
      Inspiration for <span data-slot="italic">future</span> getaways
    </>
  ),
}: Props) {
  return (
    <div className={clsx('', className)}>
      {heading && <Heading className="mb-11">{heading}</Heading>}
      <div className="relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-5">
        <div className="flex rtl:flex-row-reverse">
          {/* Nhóm  thứ 1 */}
          <div className="animate-marquee flex shrink-0 items-center justify-around gap-6 px-3 sm:gap-16 sm:px-8">
            {DEMO_DATA.map((item) => (
              <Link href={item.href} key={item.id} className="flex items-center gap-2.5">
                <div className="flex size-14 shrink-0 -rotate-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <HugeiconsIcon icon={item.icon} className="size-9 rotate-12" />
                </div>
                <h3 className="shrink-0 text-lg font-medium text-foreground">{item.title}</h3>
              </Link>
            ))}
          </div>
          {/* Nhóm  thứ 2 */}
          <div
            className="animate-marquee flex shrink-0 items-center justify-around gap-6 px-3 sm:gap-16 sm:px-8"
            aria-hidden="true"
          >
            {DEMO_DATA.map((item) => (
              <Link href={item.href} key={item.id} className="flex items-center gap-2.5">
                <div className="flex size-14 shrink-0 -rotate-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <HugeiconsIcon icon={item.icon} className="size-9 rotate-12" />
                </div>
                <h3 className="shrink-0 text-lg font-medium text-foreground">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex sm:mt-10 rtl:flex-row-reverse">
          {/* Nhóm  thứ 1 */}
          <div className="animate-marquee-reverse flex shrink-0 items-center justify-around gap-6 px-3 sm:gap-16 sm:px-8">
            {DEMO_DATA.map((item) => (
              <Link href={item.href} key={item.id} className="flex items-center gap-2.5">
                <div className="flex size-14 shrink-0 -rotate-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <HugeiconsIcon icon={item.icon} className="size-9 rotate-12" />
                </div>
                <h3 className="shrink-0 text-lg font-medium text-foreground">{item.title}</h3>
              </Link>
            ))}
          </div>
          {/* Nhóm  thứ 2 */}
          <div
            className="animate-marquee-reverse flex shrink-0 items-center justify-around gap-6 px-3 sm:gap-16 sm:px-8"
            aria-hidden="true"
          >
            {DEMO_DATA.map((item) => (
              <Link href={item.href} key={item.id} className="flex items-center gap-2.5">
                <div className="flex size-14 shrink-0 -rotate-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <HugeiconsIcon icon={item.icon} className="size-9 rotate-12" />
                </div>
                <h3 className="shrink-0 text-lg font-medium text-foreground">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
