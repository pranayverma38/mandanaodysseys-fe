import { Heading } from '@/components/heading'
import type { DestinationFacts } from '@/data/destinations'
import {
  BanknotesIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
  ChatBubbleBottomCenterTextIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

interface DestinationFactsSectionProps {
  destinationName: string
  facts: DestinationFacts
}

const FACT_ITEMS = [
  { key: 'capital' as const, label: 'Capital', icon: BuildingOffice2Icon },
  { key: 'population' as const, label: 'Population', icon: UserGroupIcon },
  { key: 'countryCode' as const, label: 'Country code', icon: GlobeAltIcon },
  { key: 'nativeLanguage' as const, label: 'Native language', icon: ChatBubbleBottomCenterTextIcon },
  { key: 'currency' as const, label: 'Currency', icon: BanknotesIcon },
]

export function DestinationFactsSection({ destinationName, facts }: DestinationFactsSectionProps) {
  return (
    <section className="space-y-8">
      <Heading level={2} className="text-center lg:text-start">
        Facts about <span data-slot="italic">{destinationName}</span>
      </Heading>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5 lg:gap-4">
        {FACT_ITEMS.map(({ key, label, icon: Icon }) => (
          <div
            key={key}
            className="flex flex-col items-center rounded-2xl border border-neutral-200 bg-neutral-50 px-3 py-5 text-center sm:px-4 sm:py-6 dark:border-neutral-800 dark:bg-neutral-900/50"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-neutral-800">
              <Icon className="size-5 text-[#FC6200]" />
            </div>
            <p className="mt-3 text-xs font-medium tracking-wide text-neutral-500 uppercase sm:text-sm dark:text-neutral-400">
              {label}
            </p>
            <p className="mt-1.5 text-sm font-semibold text-neutral-900 sm:text-base dark:text-neutral-100">
              {facts[key]}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
