import Logo from '@/components/logo'
import SocialsList1 from '@/components/socials-list1'
import {
  FOOTER_COPYRIGHT,
  FOOTER_TAGLINE,
  footerLegal,
  footerMandanaOdysseys,
  footerTalkToUs,
  type FooterLink,
  type FooterLinkWithIcon,
} from '@/data/footer-navigation'
import React from 'react'

interface WidgetFooterMenu {
  id: string
  title: string
  menus: FooterLink[]
  withIcons?: boolean
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: '1',
    title: 'Mandana Odysseys',
    menus: footerMandanaOdysseys,
  },
  {
    id: '2',
    title: 'Legal',
    menus: footerLegal,
  },
  {
    id: '3',
    title: 'Talk to us',
    menus: footerTalkToUs,
    withIcons: true,
  },
]

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">{menu.title}</h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => {
            const iconItem = menu.withIcons ? (item as FooterLinkWithIcon) : null

            return (
              <li key={index}>
                <a
                  className="inline-flex items-center gap-2 text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                  href={item.href}
                >
                  {iconItem && <iconItem.icon aria-hidden="true" className="size-5 shrink-0" />}
                  {item.name}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="relative border-t border-neutral-200 py-24 lg:py-28 dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10">
        <div className="col-span-2 grid grid-cols-4 gap-5 md:col-span-4 lg:flex lg:flex-col lg:md:col-span-1">
          <div className="col-span-2 md:col-span-1">
            <Logo variant="full-colored" size="lg" />
            <p className="mt-4 text-sm text-balance text-neutral-600 dark:text-neutral-400">{FOOTER_TAGLINE}</p>
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            <SocialsList1 className="flex items-center gap-x-3 lg:flex-col lg:items-start lg:gap-x-0 lg:gap-y-2.5" />
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
      <div className="container mt-16 border-t border-neutral-200 pt-8 dark:border-neutral-700">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{FOOTER_COPYRIGHT}</p>
      </div>
    </div>
  )
}

export default Footer
