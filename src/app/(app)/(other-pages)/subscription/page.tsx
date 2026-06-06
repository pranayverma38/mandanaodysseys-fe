import { createPageMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import SubscriptionPricingGrid from './subscription-pricing-grid'

export const metadata: Metadata = createPageMetadata({
  title: 'Travel Membership Plans',
  description: 'Explore Mandana Odysseys membership plans for exclusive deals on international tour and travel packages.',
  path: '/subscription',
})

const Page = () => {
  return (
    <div className={`container pb-24 lg:pb-32`}>
      <header className="mx-auto my-20 max-w-2xl text-center">
        <h1 className="flex items-center justify-center text-4xl/[1.15] font-medium sm:text-5xl/[1.15]">
          Subscription
        </h1>
        <span className="mt-2 block">Pricing to fit the needs of any companie size.</span>
      </header>
      <section className="overflow-hidden text-sm text-neutral-600 md:text-base">
        <SubscriptionPricingGrid />
      </section>
    </div>
  )
}

export default Page
