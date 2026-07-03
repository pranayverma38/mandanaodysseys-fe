'use client'

import { GuestsObject } from '@/type'
import { Calendar04Icon, UserIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface Props {
  dateRangeLabel: string
  guestsLabel: string
  guests: GuestsObject
  startDate: Date
  endDate: Date
  handle: string
}

const YourTrip = ({ dateRangeLabel, guestsLabel, guests, startDate, endDate, handle }: Props) => {
  return (
    <div>
      <h3 className="mb-2 text-base font-medium sm:text-lg">Your trip</h3>
      <div className="grid grid-cols-2 divide-x divide-border overflow-hidden rounded-xl border border-border bg-card rtl:divide-x-reverse">
        <div className="flex min-w-0 items-center gap-2 px-3 py-2.5">
          <HugeiconsIcon
            className="shrink-0 text-orange-500"
            icon={Calendar04Icon}
            size={18}
            strokeWidth={1.5}
          />
          <div className="min-w-0">
            <span className="block text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              Dates
            </span>
            <span className="mt-0.5 block truncate text-sm font-medium">{dateRangeLabel}</span>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-2 px-3 py-2.5">
          <HugeiconsIcon
            className="shrink-0 text-orange-500"
            icon={UserIcon}
            size={18}
            strokeWidth={1.5}
          />
          <div className="min-w-0">
            <span className="block text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              Guests
            </span>
            <span className="mt-0.5 block truncate text-sm font-medium">{guestsLabel}</span>
          </div>
        </div>
      </div>

      <input type="hidden" name="handle" value={handle} />
      <input type="hidden" name="guestAdults" value={guests.guestAdults} />
      <input type="hidden" name="guestChildren" value={guests.guestChildren} />
      <input type="hidden" name="guestInfants" value={guests.guestInfants} />
      <input type="hidden" name="startDate" value={startDate.toISOString()} />
      <input type="hidden" name="endDate" value={endDate.toISOString()} />
    </div>
  )
}

export default YourTrip
