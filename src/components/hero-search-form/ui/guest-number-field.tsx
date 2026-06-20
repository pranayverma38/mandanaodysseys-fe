'use client'

import NcInputNumber from '@/components/nc-input-number'
import { GuestsObject } from '@/type'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FC, useState } from 'react'
import { ClearDataButton } from './clear-data-button'
import { minimalSegmentClass, minimalTriggerClass, MinimalSegment } from './minimal-segment-styles'

const styles = {
  button: {
    base: 'relative z-10 shrink-0 w-full cursor-pointer flex items-center gap-x-3 focus:outline-hidden text-start',
    focused: 'rounded-full bg-transparent focus-visible:outline-hidden dark:bg-white/5 custom-shadow-1 ',
    default: 'px-7 py-4 xl:px-8 xl:py-5',
    small: 'py-3 px-7 xl:px-8',
    minimal: 'gap-2.5 px-4 py-2',
  },
  mainText: {
    default: 'text-base xl:text-lg',
    small: 'text-base',
    minimal: 'text-sm font-normal text-white',
  },
  panel: {
    base: 'absolute end-0 top-full z-50 mt-3 flex w-sm flex-col gap-y-6 rounded-3xl bg-white px-8 py-7 text-left shadow-xl transition duration-150 data-closed:translate-y-1 data-closed:opacity-0 dark:bg-neutral-800',
    default: '',
    small: '',
    minimal: '',
  },
  icon: {
    default: 'size-5 text-neutral-300 lg:size-7 dark:text-neutral-400',
    minimal: 'size-4 shrink-0 text-white/70',
  },
}

interface Props {
  fieldStyle: 'default' | 'small' | 'minimal'
  minimalSegment?: MinimalSegment
  className?: string
  clearDataButtonClassName?: string
}

export const GuestNumberField: FC<Props> = ({
  fieldStyle = 'default',
  className = 'flex-1',
  clearDataButtonClassName,
  minimalSegment,
}) => {
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(2)
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(1)
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(1)

  const handleChangeData = (value: number, type: keyof GuestsObject) => {
    let newValue = {
      guestAdults: guestAdultsInputValue,
      guestChildren: guestChildrenInputValue,
      guestInfants: guestInfantsInputValue,
    }
    if (type === 'guestAdults') {
      setGuestAdultsInputValue(value)
      newValue.guestAdults = value
    }
    if (type === 'guestChildren') {
      setGuestChildrenInputValue(value)
      newValue.guestChildren = value
    }
    if (type === 'guestInfants') {
      setGuestInfantsInputValue(value)
      newValue.guestInfants = value
    }
  }

  const totalGuests = guestChildrenInputValue + guestAdultsInputValue + guestInfantsInputValue
  return (
    <Popover
      className={clsx(
        'group relative z-10 flex',
        className,
        fieldStyle === 'minimal' && minimalSegmentClass(minimalSegment),
        fieldStyle === 'minimal' && 'min-h-0 w-full flex-1'
      )}
    >
      {({ open: showPopover }) => (
        <>
          <PopoverButton
            className={clsx(
              styles.button.base,
              fieldStyle !== 'minimal' && styles.button[fieldStyle],
              fieldStyle === 'minimal' && minimalTriggerClass(showPopover),
              fieldStyle !== 'minimal' && showPopover && styles.button.focused
            )}
          >
            {(fieldStyle === 'default' || fieldStyle === 'minimal') && (
              <UserPlusIcon
                className={clsx(fieldStyle === 'minimal' ? styles.icon.minimal : styles.icon.default)}
              />
            )}

            <div className="min-w-0 grow">
              <span className={clsx('block truncate font-[550]', styles.mainText[fieldStyle])}>
                {totalGuests || ''} Guests
              </span>
              {fieldStyle !== 'minimal' && (
                <span className="mt-1 block text-sm leading-none font-[350] text-neutral-400">
                  {totalGuests ? 'Guests' : 'Add guests'}
                </span>
              )}
            </div>

            {fieldStyle === 'minimal' && (
              <ChevronDownIcon aria-hidden className="size-3.5 shrink-0 text-white/70" />
            )}
          </PopoverButton>

          {fieldStyle !== 'minimal' && (
            <ClearDataButton
              className={clsx(!totalGuests && 'sr-only', clearDataButtonClassName)}
              onClick={() => {
                setGuestAdultsInputValue(0)
                setGuestChildrenInputValue(0)
                setGuestInfantsInputValue(0)
              }}
            />
          )}

          <PopoverPanel unmount={false} transition className={clsx(styles.panel.base, styles.panel[fieldStyle])}>
            <NcInputNumber
              className="w-full"
              defaultValue={guestAdultsInputValue}
              onChange={(value) => handleChangeData(value, 'guestAdults')}
              max={10}
              min={1}
              label={'Adults'}
              description={'Ages 13 or above'}
              inputName="guestAdults"
            />
            <NcInputNumber
              className="w-full"
              defaultValue={guestChildrenInputValue}
              onChange={(value) => handleChangeData(value, 'guestChildren')}
              max={4}
              label={'Children'}
              description={'Ages 2–12'}
              inputName="guestChildren"
            />
            <NcInputNumber
              className="w-full"
              defaultValue={guestInfantsInputValue}
              onChange={(value) => handleChangeData(value, 'guestInfants')}
              max={4}
              label={'Infants'}
              description={'Ages 0–2'}
              inputName="guestInfants"
            />
          </PopoverPanel>
        </>
      )}
    </Popover>
  )
}
