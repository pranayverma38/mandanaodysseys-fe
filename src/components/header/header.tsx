import Logo from '@/components/logo'
import clsx from 'clsx'
import { FC } from 'react'
import { HeaderActionDropdowns } from './header-action-dropdowns'
import HamburgerBtnMenu from './hamburger-btn-menu'
import { HeaderNavigation } from './navigation/header-navigation'

interface Props {
  hasBorderBottom?: boolean
  className?: string
}

const Header: FC<Props> = async ({ hasBorderBottom = true, className }) => {
  return (
    <div className={clsx('relative', className)}>
      <div
        className={clsx(
          'relative border-border bg-background',
          hasBorderBottom && 'border-b',
          !hasBorderBottom && 'has-[.header-popover-full-panel]:border-b'
        )}
      >
        <div className="container flex h-20 justify-between">
          <div className="flex flex-1 items-center">
            <Logo variant="full-colored" />
          </div>

          <div className="mx-4 hidden flex-2 lg:flex">
            <HeaderNavigation />
          </div>

          <div className="flex flex-1 items-center justify-end gap-x-1">
            <HeaderActionDropdowns />
            <HamburgerBtnMenu variant="plain" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
