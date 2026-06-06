'use client'

import { Divider } from '@/components/divider'
import { Link } from '@/components/link'
import SocialsList from '@/components/socials-list'
import { Text } from '@/components/text'
import { DESTINATIONS, TOUR_TYPES, getDestinationPath, getInspirationPath } from '@/data/destinations'
import { getMegaMenuItems } from '@/data/navigation'
import { Disclosure, DisclosureButton, DisclosurePanel, useClose } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import React from 'react'

interface Props {}

type SidebarMenuItem = {
  title: string
  href?: string
  children?: SidebarMenuItem[]
}

const megaMenuItems = getMegaMenuItems() as SidebarMenuItem[]

const headerMenuItems: SidebarMenuItem[] = [
  { title: 'Home', href: '/' },
  {
    title: 'Destinations',
    children: [
      ...DESTINATIONS.map((destination) => ({
        title: destination.name,
        href: getDestinationPath(destination.slug),
      })),
      { title: 'View all destinations', href: '/destinations' },
    ],
  },
  {
    title: 'Packages',
    children: [
      ...TOUR_TYPES.map((tourType) => ({
        title: tourType.name,
        href: getInspirationPath(tourType.slug),
      })),
      { title: 'View all packages', href: '/inspirations' },
    ],
  },
  { title: 'About', href: '/about' },
]

const menuItems = [...headerMenuItems, ...megaMenuItems]

type TMenuItem = SidebarMenuItem

const SidebarNavigation: React.FC<Props> = () => {
  const handleClose = useClose()

  const _renderMenuChild = (item: TMenuItem) => {
    return (
      <ul className="nav-mobile-sub-menu border-l border-border ps-4 pb-1">
        {item.children?.map((childMenu, index) => (
          <Disclosure key={index} as="li">
            <Link
              href={childMenu.href || '#'}
              onClick={handleClose}
              className={clsx('mt-0.5 flex rounded-lg px-3 text-sm font-[450] text-foreground hover:bg-accent')}
            >
              <p className={clsx('py-2.5', !childMenu.children && 'block w-full')}>{childMenu.title}</p>
              {childMenu.children && (
                <span className="flex grow items-center" onClick={(e) => e.preventDefault()}>
                  <DisclosureButton as="span" className="flex grow justify-end">
                    <ChevronDownIcon className="ms-2 size-4 text-muted-foreground" aria-hidden="true" />
                  </DisclosureButton>
                </span>
              )}
            </Link>
            {childMenu.children && <DisclosurePanel>{_renderMenuChild(childMenu)}</DisclosurePanel>}
          </Disclosure>
        ))}
      </ul>
    )
  }

  const _renderItem = (menu: TMenuItem) => {
    if (!menu.children?.length) {
      return (
        <li key={menu.title} className="text-foreground">
          <Link
            href={menu.href || '#'}
            onClick={handleClose}
            className="flex w-full rounded-lg px-3 py-2.5 text-sm font-[450] uppercase hover:bg-accent"
          >
            {menu.title}
          </Link>
        </li>
      )
    }

    return (
      <Disclosure key={menu.title} as="li" className="text-foreground">
        <DisclosureButton className="flex w-full cursor-pointer rounded-lg px-3 text-start hover:bg-accent">
          <p className="block py-2.5 text-sm font-[450] uppercase">{menu.title}</p>
          <div className="flex flex-1 justify-end">
            <ChevronDownIcon className="me-2 size-4 self-center text-muted-foreground" aria-hidden="true" />
          </div>
        </DisclosureButton>
        <DisclosurePanel>{_renderMenuChild(menu)}</DisclosurePanel>
      </Disclosure>
    )
  }

  return (
    <div className="flex min-h-full flex-col">
      <Text className="text-muted-foreground">
        Explore the best trip deals in trending destinations, worldwide.
      </Text>

      <SocialsList className="mt-5 gap-x-5 sm:gap-x-6" />
      <ul className="flex flex-col gap-y-1 px-2 py-6">{menuItems.map(_renderItem)}</ul>

      <Divider className="mt-auto" />
      <div className="flex flex-col gap-y-1 px-2 py-6 text-sm text-muted-foreground">
        <a href="tel:0023537878" className="transition-colors hover:text-foreground">
          (00) 2353 7878
        </a>
        <a href="mailto:support@mandanaodysseys.com" className="transition-colors hover:text-foreground">
          support@mandanaodysseys.com
        </a>
      </div>
    </div>
  )
}

export default SidebarNavigation
