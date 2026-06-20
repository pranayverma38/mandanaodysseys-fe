'use client'

import DatePickerCustomDay from '@/components/date-picker-custom-day'
import DatePickerCustomHeaderTwoMonth from '@/components/date-picker-custom-header-two-month'
import { excludeDateIntervals } from '@/lib/utils'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { CalendarIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { addDays } from 'date-fns'
import { FC, useState } from 'react'
import DatePicker from 'react-datepicker'
import { ClearDataButton } from './clear-data-button'
import { minimalSegmentClass, minimalTriggerClass, MinimalSegment } from './minimal-segment-styles'

const styles = {
  button: {
    base: 'relative z-10 shrink-0 w-full cursor-pointer flex items-center gap-x-3 focus:outline-hidden text-start',
    focused: 'rounded-full bg-transparent focus-visible:outline-hidden dark:bg-white/5 custom-shadow-1',
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
    base: 'absolute top-full z-10 mt-3 w-3xl transition duration-150 data-closed:translate-y-1 data-closed:opacity-0 left-1/2 -translate-x-1/2 overflow-hidden rounded-3xl bg-white p-8 shadow-lg ring-1 ring-black/5 dark:bg-neutral-800',
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
  className?: string
  fieldStyle: 'default' | 'small' | 'minimal'
  minimalSegment?: MinimalSegment
  clearDataButtonClassName?: string
  description?: string
  panelClassName?: string
  isOnlySingleDate?: boolean
}

export const DateRangeField: FC<Props> = ({
  className = 'flex-1',
  fieldStyle = 'default',
  clearDataButtonClassName,
  description = 'Check-in / Check-out',
  panelClassName,
  isOnlySingleDate = false,
  minimalSegment,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(addDays(new Date(), 3))

  return (
    <>
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
                <CalendarIcon
                  className={clsx(fieldStyle === 'minimal' ? styles.icon.minimal : styles.icon.default)}
                />
              )}

              <div className="min-w-0 flex-1 text-start">
                <span className={clsx('block truncate font-[550]', styles.mainText[fieldStyle])}>
                  {startDate?.toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                  }) || 'Add dates'}
                  {endDate && !isOnlySingleDate
                    ? ' - ' +
                      endDate?.toLocaleDateString('en-US', {
                        month: 'short',
                        day: '2-digit',
                      })
                    : ''}
                </span>
                {fieldStyle !== 'minimal' && (
                  <span className="mt-1 block text-sm leading-none font-[350] text-neutral-400">
                    {description || 'Add dates'}
                  </span>
                )}
              </div>

              {fieldStyle === 'minimal' && (
                <ChevronDownIcon aria-hidden className="size-3.5 shrink-0 text-white/70" />
              )}
            </PopoverButton>

            {fieldStyle !== 'minimal' && (
              <ClearDataButton
                className={clsx(!startDate && !endDate && 'sr-only', clearDataButtonClassName)}
                onClick={() => {
                  setStartDate(null)
                  setEndDate(null)
                }}
              />
            )}

            <PopoverPanel
              unmount={false}
              transition
              className={clsx(panelClassName, styles.panel.base, styles.panel[fieldStyle])}
            >
              {isOnlySingleDate ? (
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => {
                    setStartDate(date)
                    // set end-date = start-date + 2 day
                    setEndDate(new Date((date?.getTime() || 0) + 2 * 24 * 60 * 60 * 1000))
                  }}
                  startDate={startDate}
                  monthsShown={2}
                  showPopperArrow={false}
                  inline
                  excludeDateIntervals={excludeDateIntervals}
                  renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
                  renderDayContents={(day, date) => <DatePickerCustomDay dayOfMonth={day} date={date} />}
                />
              ) : (
                <DatePicker
                  selected={startDate}
                  onChange={(dates) => {
                    const [start, end] = dates
                    setStartDate(start)
                    setEndDate(end)
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  monthsShown={2}
                  showPopperArrow={false}
                  inline
                  excludeDateIntervals={excludeDateIntervals}
                  renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
                  renderDayContents={(day, date) => <DatePickerCustomDay dayOfMonth={day} date={date} />}
                />
              )}
            </PopoverPanel>
          </>
        )}
      </Popover>

      {/* input:hidde */}
      <input type="hidden" name="checkin" value={startDate ? startDate.toISOString().split('T')[0] : ''} />
      {!isOnlySingleDate && (
        <input type="hidden" name="checkout" value={endDate ? endDate.toISOString().split('T')[0] : ''} />
      )}
    </>
  )
}
