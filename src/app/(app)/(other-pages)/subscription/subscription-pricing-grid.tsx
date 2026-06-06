'use client'

import { Badge } from '@/components/badge'
import ButtonPrimary from '@/components/button-primary'
import ButtonSecondary from '@/components/button-secondary'
import FormattedPrice from '@/components/formatted-price'
import { CheckIcon } from '@heroicons/react/24/solid'

const pricings = [
  {
    isPopular: false,
    name: 'Starter',
    pricing: 5,
    per: '/mo',
    features: ['Automated Reporting', 'Faster Processing', 'Customizations'],
    description: `Literally you probably haven't heard of them jean shorts.`,
  },
  {
    isPopular: true,
    name: 'Basic',
    pricing: 15,
    per: '/mo',
    features: ['Everything in Starter', '100 Builds', 'Progress Reports', 'Premium Support'],
    description: `Literally you probably haven't heard of them jean shorts.`,
  },
  {
    isPopular: false,
    name: 'Plus',
    pricing: 25,
    per: '/mo',
    features: ['Everything in Basic', 'Unlimited Builds', 'Advanced Analytics', 'Company Evaluations'],
    description: `Literally you probably haven't heard of them jean shorts.`,
  },
]

export default function SubscriptionPricingGrid() {
  const renderPricingItem = (pricing: (typeof pricings)[number], index: number) => {
    return (
      <div
        key={index}
        className={`relative flex h-full flex-col overflow-hidden rounded-3xl border-2 bg-card px-6 py-8 ${
          pricing.isPopular ? 'border-primary' : 'border-border'
        }`}
      >
        {pricing.isPopular && (
          <Badge color="zinc" className="absolute end-3 top-3 z-10">
            Popular
          </Badge>
        )}
        <div className="mb-8">
          <h3 className="mb-3 block text-sm font-medium tracking-widest uppercase">{pricing.name}</h3>
          <h2 className="flex items-center text-5xl leading-none">
            <span className="text-card-foreground notranslate">
              <FormattedPrice value={pricing.pricing} />
            </span>
            <span className="ms-1 text-lg font-normal text-muted-foreground">{pricing.per}</span>
          </h2>
        </div>
        <nav className="mb-8 space-y-4">
          {pricing.features.map((item, featureIndex) => (
            <li className="flex items-center" key={featureIndex}>
              <span className="me-4 inline-flex shrink-0 text-primary">
                <CheckIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </nav>
        <div className="mt-auto flex flex-col">
          {pricing.isPopular ? (
            <ButtonPrimary>Submit</ButtonPrimary>
          ) : (
            <ButtonSecondary>
              <span className="font-medium">Submit</span>
            </ButtonSecondary>
          )}
          <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">{pricing.description}</p>
        </div>
      </div>
    )
  }

  return <div className="grid gap-5 lg:grid-cols-3 xl:gap-8">{pricings.map(renderPricingItem)}</div>
}
