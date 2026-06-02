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
import { getMegaMenuItems, getTravelersMenu } from '@/data/navigation'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Link from 'next/link'
import * as React from 'react'

// DEMO DATA
const megaMenuItems = getMegaMenuItems()
const travelers = getTravelersMenu()

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
            <ul className="grid w-80 grid-cols-1 gap-5 p-4">
              {travelers.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="group/traveler -m-2 flex items-center rounded-lg p-2 text-sm text-accent-foreground transition-colors hover:bg-accent focus:outline-none"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-accent transition-colors group-hover/traveler:bg-card sm:size-12 dark:group-hover/traveler:bg-card/30">
                    <HugeiconsIcon icon={item.icon} size={28} />
                  </div>
                  <div className="ms-4 space-y-0.5">
                    <p className="font-medium">{item.title}</p>
                    <p className="line-clamp-1 text-muted-foreground">{item.description}</p>
                  </div>
                </Link>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:flex">
          <NavigationMenuTrigger className={isHero ? heroNavTriggerClassName : undefined}>Packages</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] flex-1 grid-cols-3 gap-x-5 gap-y-10 p-5 text-sm md:w-[500px] lg:w-[600px]">
              {megaMenuItems.map((megaMenuItem, index) => (
                <div key={index}>
                  <p className="font-medium">{megaMenuItem.title}</p>
                  <ul className="mt-4 grid space-y-4">
                    {megaMenuItem.children?.map((menuItem, index) => (
                      <li key={index} className={clsx('menu-item')}>
                        <Link className="font-normal hover:underline" href={menuItem.href || '#'}>
                          {menuItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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

function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
