'use client'

import { Globe02Icon, UserCircle02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import AvatarDropdown from './avatar-dropdown'
import CurrLangDropdown from './curr-lang-dropdown'
import { HeaderHoverPopoverGroup } from './header-hover-popover-group'

type Variant = 'default' | 'hero'

interface Props {
  variant?: Variant
  className?: string
  showCurrLang?: boolean
  showAvatar?: boolean
}

const heroIconButtonClassName =
  'flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/10 hover:backdrop-blur-sm group-data-open/popover:bg-black/10 group-data-open/popover:backdrop-blur-sm'

export function HeaderActionDropdowns({
  variant = 'default',
  className,
  showCurrLang = true,
  showAvatar = true,
}: Props) {
  const useHeroTriggers = variant === 'hero'

  return (
    <HeaderHoverPopoverGroup className={clsx('flex items-center gap-x-1', className)}>
      {showCurrLang && (
        <CurrLangDropdown
          popoverId="curr-lang"
          triggerButton={
            useHeroTriggers ? (
              <button type="button" className={heroIconButtonClassName}>
                <HugeiconsIcon icon={Globe02Icon} size={24} />
              </button>
            ) : undefined
          }
        />
      )}
      {showAvatar && (
        <AvatarDropdown
          popoverId="avatar"
          triggerButton={
            useHeroTriggers ? (
              <button type="button" className={heroIconButtonClassName}>
                <HugeiconsIcon icon={UserCircle02Icon} size={24} />
              </button>
            ) : undefined
          }
        />
      )}
    </HeaderHoverPopoverGroup>
  )
}
