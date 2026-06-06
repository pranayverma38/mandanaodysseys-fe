import {
  Award04Icon,
  CustomerSupportIcon,
  DollarSquareIcon,
  SecurityCheckIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'

const BENEFITS: {
  title: string
  description: string
  icon: IconSvgElement
}[] = [
  {
    title: 'Flexible Deposit',
    description: 'Transfer your deposit if your plans change.',
    icon: DollarSquareIcon,
  },
  {
    title: 'Travel Protection',
    description: 'flexible options if travel plans are disrupted.',
    icon: SecurityCheckIcon,
  },
  {
    title: '24/7 Assistance',
    description: 'Round-the-clock emergency assistance',
    icon: CustomerSupportIcon,
  },
  {
    title: 'Australian Owned',
    description: 'Australian-Accredited Tour Operator',
    icon: Award04Icon,
  },
]

const ItineraryBenefitsSection = () => {
  return (
    <div className="mt-4 grid min-w-0 max-w-full grid-cols-[repeat(2,minmax(0,1fr))] gap-2 sm:mt-5 sm:gap-3">
      {BENEFITS.map((benefit) => (
        <div
          key={benefit.title}
          className="flex min-w-0 max-w-full items-start gap-2 overflow-hidden rounded-xl border border-border bg-card p-2.5 shadow-lg-for-card sm:p-3"
        >
          <HugeiconsIcon
            icon={benefit.icon}
            size={18}
            className="mt-0.5 shrink-0 text-foreground"
            strokeWidth={1.5}
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-medium leading-snug break-words sm:text-sm">{benefit.title}</h3>
            <p className="mt-0.5 text-[11px] leading-snug break-words text-muted-foreground sm:text-xs">
              {benefit.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ItineraryBenefitsSection
