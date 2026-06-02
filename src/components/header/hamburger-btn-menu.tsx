'use client'

import { Menu01Icon, Menu02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { useAside } from '../aside'
import { ButtonCircle, ButtonProps } from '../button'

interface Props {
  className?: string
  buttonClassName?: string
  buttonColor?: ButtonProps['color']
  variant?: 'circle' | 'plain'
}

const HamburgerBtnMenu = ({ buttonClassName, buttonColor = 'accent', variant = 'circle' }: Props) => {
  const { open: openAside } = useAside()

  if (variant === 'plain') {
    return (
      <button
        className={clsx(
          'flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/10 hover:backdrop-blur-sm data-active:bg-black/10 data-active:backdrop-blur-sm',
          buttonClassName
        )}
        onClick={() => openAside('sidebar-navigation')}
      >
        <span className="sr-only">Open main menu</span>
        <HugeiconsIcon icon={Menu02Icon} size={24} />
      </button>
    )
  }

  return (
    <ButtonCircle onClick={() => openAside('sidebar-navigation')} color={buttonColor} className={buttonClassName}>
      <span className="sr-only">Open main menu</span>
      <HugeiconsIcon icon={Menu01Icon} size={24} />
    </ButtonCircle>
  )
}

export default HamburgerBtnMenu
