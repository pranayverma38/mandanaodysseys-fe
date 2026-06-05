'use client'

import Logo from '@/components/logo'
import { ListingType } from '@/type'
import { Menu02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { FC } from 'react'
import { useAside } from '../aside'
import { HeaderActionDropdowns } from './header-action-dropdowns'
import { HeaderNavigation } from './navigation/header-navigation'

interface Props {
  className?: string
  initSearchFormTab: ListingType
}

const Header3: FC<Props> = ({ className }) => {
  const { open: openAside } = useAside()
  const iconButtonClassName =
    'flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/10 hover:backdrop-blur-sm group-data-open/popover:bg-black/10 group-data-open/popover:backdrop-blur-sm'

  return (
    <header className={clsx('relative z-20 w-full rounded-full text-white', className)}>
      <div className="relative flex py-3">
        <div className="container flex h-20 flex-1 justify-between">
          {/* Logo (lg+) */}
          <div className="relative z-11 flex flex-1/2 items-center">
            <Logo variant="full-white" />
          </div>

          <div className="mx-auto hidden w-full max-w-lg shrink-0 justify-center lg:flex">
            <HeaderNavigation variant="hero" />
          </div>

          <div className="relative z-10 flex flex-1/2 items-center justify-end gap-x-1">
            <HeaderActionDropdowns variant="hero" />
            <button type="button" className={iconButtonClassName} onClick={() => openAside('sidebar-navigation')}>
              <span className="sr-only">Open main menu</span>
              <HugeiconsIcon icon={Menu02Icon} size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header3
