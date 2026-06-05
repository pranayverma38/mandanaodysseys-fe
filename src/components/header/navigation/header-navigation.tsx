'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { DESTINATIONS, getDestinationPath, getInspirationPath, TOUR_TYPES } from '@/data/destinations'
import Image from 'next/image'
import Link from 'next/link'

const heroNavListClassName =
  'rounded-full border border-white/25 bg-white/15 text-white shadow-md-for-card backdrop-blur-md transition ease-in-out hover:bg-white/20 hover:shadow-lg-for-card px-2 py-1.5'

const heroNavTriggerClassName =
  'group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-2xl bg-transparent px-4.5 py-2.5 text-sm font-[450] text-inherit transition-all outline-none hover:bg-white/20 focus:bg-white/20 focus-visible:ring-[3px] focus-visible:ring-white/30 disabled:pointer-events-none disabled:opacity-50 data-popup-open:bg-white/15 data-popup-open:hover:bg-white/20 data-open:bg-white/15 data-open:hover:bg-white/20 data-open:focus:bg-white/20'

type HeaderNavigationVariant = 'default' | 'hero'

interface HeaderNavigationProps {
  variant?: HeaderNavigationVariant
}

export function HeaderNavigation({ variant = 'default' }: HeaderNavigationProps) {
  const isHero = variant === 'hero'
  const listClassName = isHero ? heroNavListClassName : 'rounded-full shadow-md-for-card px-2 py-1.5'
  const linkTriggerClassName = isHero ? heroNavTriggerClassName : navigationMenuTriggerStyle()

  return (
    <NavigationMenu>
      <NavigationMenuList className={listClassName}>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={linkTriggerClassName}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={isHero ? heroNavTriggerClassName : undefined}>Destinations</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[34rem] grid-cols-2 gap-3 p-4">
              {DESTINATIONS.map((destination) => (
                <li key={destination.slug}>
                  <Link
                    href={getDestinationPath(destination.slug)}
                    className="group/destination flex items-center rounded-lg p-2 text-sm text-accent-foreground transition-colors hover:bg-accent focus:outline-none"
                  >
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={destination.thumbnail}
                        alt={destination.name}
                        fill
                        className="object-cover transition-transform group-hover/destination:scale-105"
                        sizes="40px"
                      />
                    </div>
                    <div className="ms-3 min-w-0">
                      <p className="font-medium">{destination.name}</p>
                    </div>
                  </Link>
                </li>
              ))}
              <li className="col-span-2 border-t border-neutral-200 pt-3 dark:border-neutral-700">
                <Link
                  href="/destinations"
                  className="block rounded-lg p-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent"
                >
                  View all destinations
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:flex">
          <NavigationMenuTrigger className={isHero ? heroNavTriggerClassName : undefined}>Packages</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] flex-1 grid-cols-3 gap-x-5 gap-y-4 p-5 text-sm md:w-[500px] lg:w-[600px]">
              {TOUR_TYPES.map((tourType) => (
                <li key={tourType.slug}>
                  <Link
                    className="font-normal hover:underline"
                    href={getInspirationPath(tourType.slug)}
                  >
                    {tourType.name}
                  </Link>
                </li>
              ))}
              <li className="col-span-3 border-t border-neutral-200 pt-4 dark:border-neutral-700">
                <Link
                  href="/inspirations"
                  className="block font-medium text-accent-foreground transition-colors hover:underline"
                >
                  View all packages
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={linkTriggerClassName}>
            <Link href="/about">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
