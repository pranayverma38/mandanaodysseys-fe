'use client'

import { Divider } from '@/components/divider'
import { Link } from '@/components/link'
import { useHoverPopover } from '@/hooks/use-hover-popover'
import { Popover, PopoverPanel } from '@headlessui/react'
import {
  FavouriteIcon,
  Logout01Icon,
  Notification01Icon,
  Task01Icon,
  UserCircle02Icon,
  UserIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { ReactNode } from 'react'
import ButtonCircle from '../button-circle'
import { HeaderPopoverTrigger } from './header-popover-trigger'

interface Props {
  className?: string
  triggerButton?: ReactNode
  popoverId?: string
}

const menuItems = [
  {
    href: '/account',
    icon: UserIcon,
    label: 'Profile',
  },
  {
    href: '#',
    icon: Notification01Icon,
    label: 'Notifications',
  },
  {
    href: '/account?tab=bookings',
    icon: Task01Icon,
    label: 'My bookings',
  },
  {
    href: '/account?tab=wishlist',
    icon: FavouriteIcon,
    label: 'Wishlist',
  },
]

export default function AvatarDropdown({ className, triggerButton, popoverId }: Props) {
  const { getTriggerHandlers, getPanelHandlers } = useHoverPopover(popoverId)

  return (
    <div className={className}>
      <Popover className="group/popover relative">
        {({ open, close }) => (
          <>
            <HeaderPopoverTrigger
              triggerButton={triggerButton}
              triggerHandlers={getTriggerHandlers(open, close)}
              fallback={
                <ButtonCircle color="accent">
                  <HugeiconsIcon icon={UserCircle02Icon} size={24} />
                </ButtonCircle>
              }
            />

            <PopoverPanel
              {...getPanelHandlers(close)}
              transition
              anchor={{
                to: 'bottom end',
                gap: 12,
              }}
              className="z-40 w-80 rounded-3xl shadow-lg-for-card bg-card transition duration-200 ease-in-out data-closed:translate-y-1 data-closed:opacity-0"
            >
              <div className="relative grid grid-cols-1 gap-6 px-6 py-7">
                <div className="flex items-center space-x-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-muted-foreground">
                    <HugeiconsIcon icon={UserIcon} size={22} />
                  </div>

                  <div className="grow">
                    <h4 className="font-semibold">Eden Smith</h4>
                    <p className="mt-0.5 text-xs">Los Angeles, CA</p>
                  </div>
                </div>

                <Divider />

                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="-m-3 flex items-center rounded-lg p-2 transition-colors hover:bg-accent focus:outline-none"
                  >
                    <div className="flex shrink-0 items-center justify-center text-muted-foreground">
                      <HugeiconsIcon icon={item.icon} size={20} />
                    </div>
                    <p className="ms-4 text-sm font-medium">{item.label}</p>
                  </Link>
                ))}

                <Divider />

                <Link
                  href={'#'}
                  className="-m-3 flex items-center rounded-lg p-2 transition-colors hover:bg-accent focus:outline-none"
                >
                  <div className="flex shrink-0 items-center justify-center text-muted-foreground">
                    <HugeiconsIcon icon={Logout01Icon} size={20} />
                  </div>
                  <p className="ms-4 text-sm font-medium">{'Log out'}</p>
                </Link>
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>
    </div>
  )
}
