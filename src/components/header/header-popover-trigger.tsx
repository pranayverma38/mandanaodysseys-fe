'use client'

import { PopoverButton } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

interface Props {
  triggerButton?: ReactNode
  fallback: ReactNode
  triggerHandlers: {
    onMouseEnter: (event: React.MouseEvent<HTMLElement>) => void
    onMouseLeave: (event: React.MouseEvent<HTMLElement>) => void
  }
}

export function HeaderPopoverTrigger({ triggerButton, fallback, triggerHandlers }: Props) {
  return (
    <PopoverButton as={triggerButton ? Fragment : undefined} {...triggerHandlers}>
      {triggerButton ?? fallback}
    </PopoverButton>
  )
}
