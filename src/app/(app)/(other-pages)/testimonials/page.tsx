import { Divider } from '@/components/divider'
import NewsletterSection from '@/components/newsletter-section-1'
import SectionClientSay from '@/components/section-client-say'
import SectionInterestingInfor from '@/components/section-interesting-infor'
import { createPageMetadata } from '@/lib/seo'
import { StarIcon } from '@heroicons/react/24/solid'
import { Metadata } from 'next'

export const metadata: Metadata = createPageMetadata({
  title: 'Testimonials',
  description:
    'Read what travelers say about Mandana Odysseys. Real reviews from guests who booked international tour and travel packages with us.',
  path: '/testimonials',
})

const featuredReviews = [
  {
    name: 'Sarah Mitchell',
    trip: 'Bali & Java Guided Tour',
    quote:
      'Mandana Odysseys made planning our honeymoon effortless. Every detail was handled professionally, and the local guides exceeded our expectations.',
  },
  {
    name: 'James Chen',
    trip: 'European Highlights Package',
    quote:
      'From the first inquiry to the final day of our trip, the team was responsive and genuinely cared about our experience. Highly recommend for group travel.',
  },
  {
    name: 'Priya Sharma',
    trip: 'Southeast Asia Adventure',
    quote:
      'Affordable pricing without cutting corners on quality. Our family of four had an unforgettable vacation, and we are already planning our next trip with them.',
  },
  {
    name: 'Michael Torres',
    trip: 'Japan Cultural Experience',
    quote:
      'The itinerary was perfectly balanced — enough structure to see the highlights, enough flexibility to explore on our own. Outstanding value for money.',
  },
  {
    name: 'Emma Walsh',
    trip: 'Mediterranean Cruise & Land Tour',
    quote:
      'I was nervous booking an international package online, but Mandana Odysseys earned my trust. Transparent pricing, no hidden fees, and a seamless journey.',
  },
  {
    name: 'David Okonkwo',
    trip: 'African Safari & Coast',
    quote:
      'A once-in-a-lifetime trip executed flawlessly. The attention to detail and personalized recommendations made this the best vacation we have ever taken.',
  },
]

const PageTestimonials = () => {
  return (
    <div className="container flex flex-col gap-y-16 py-16 lg:gap-y-32 lg:pb-28">
      <SectionInterestingInfor
        heading={
          <>
            What our travelers <span data-slot="italic">say about us</span>
          </>
        }
        description="Thousands of travelers trust Mandana Odysseys for affordable international tour packages. Here is what some of them have shared about their journeys with us."
      />

      <Divider />

      <SectionClientSay
        heading="Stories from the road"
        subHeading="Real feedback from Mandana Odysseys travelers"
      />

      <section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredReviews.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex gap-0.5 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="size-4" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-muted-foreground">&ldquo;{review.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-medium text-foreground">{review.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{review.trip}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <NewsletterSection />
    </div>
  )
}

export default PageTestimonials
