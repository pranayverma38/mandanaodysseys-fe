import { Divider } from '@/components/divider'
import NewsletterSection from '@/components/newsletter-section-1'
import SectionClientSay, { type ClientTestimonial } from '@/components/section-client-say'
import SectionInterestingInfor from '@/components/section-interesting-infor'
import { createPageMetadata } from '@/lib/seo'
import { StarIcon } from '@heroicons/react/24/solid'
import { Metadata } from 'next'

export const metadata: Metadata = createPageMetadata({
  title: 'Testimonials',
  description:
    'Read what travelers say about Mandana Odysseys. Real reviews from guests who booked international tour and travel packages across Asia and Oceania.',
  path: '/testimonials',
})

const carouselTestimonials: ClientTestimonial[] = [
  {
    id: 1,
    clientName: 'Ananya Reddy',
    content:
      'Booking our Kerala and Sri Lanka tour through Mandana Odysseys was seamless. The package was well priced, and every transfer and hotel was exactly as promised.',
  },
  {
    id: 2,
    clientName: 'Daniel Foster',
    content:
      'We wanted a custom Vietnam and Thailand itinerary for our anniversary. The team listened, adjusted the plan quickly, and delivered a trip we will never forget.',
  },
  {
    id: 3,
    clientName: 'Mei Lin Tan',
    content:
      'From Bali beaches to Nepal trekking, Mandana Odysseys handled visas, guides, and logistics so we could just enjoy the journey. Already booked our next package with them.',
  },
]

const featuredReviews = [
  {
    name: 'Sarah Mitchell',
    trip: 'Bali & Java Honeymoon Package',
    quote:
      'Mandana Odysseys made planning our honeymoon effortless. Flights, boutique stays, and local guides were all arranged in one package — and the price beat every quote we compared.',
  },
  {
    name: 'James Chen',
    trip: 'India Golden Triangle Tour',
    quote:
      'We booked a family tour to Delhi, Agra, and Jaipur online and felt supported at every step. The itinerary was thoughtful, the guides were knowledgeable, and there were no surprise fees.',
  },
  {
    name: 'Priya Sharma',
    trip: 'Sri Lanka & Maldives Combo',
    quote:
      'Affordable pricing without cutting corners on quality. Mandana Odysseys tailored the package for our family of four, and we came home with memories we talk about every week.',
  },
  {
    name: 'Michael Torres',
    trip: 'Japan & South Korea Cultural Tour',
    quote:
      'The package balanced guided sightseeing with free days to explore on our own. Booking through Mandana Odysseys saved us hours of research and gave us real peace of mind.',
  },
  {
    name: 'Emma Walsh',
    trip: 'Thailand Beach & Temple Escape',
    quote:
      'I was nervous booking an international package online, but Mandana Odysseys earned my trust. Clear pricing, responsive support, and a smooth trip from airport pickup to checkout.',
  },
  {
    name: 'David Okonkwo',
    trip: 'Australia & New Zealand Adventure',
    quote:
      'A once-in-a-lifetime trip executed flawlessly. Mandana Odysseys recommended the right mix of cities, nature, and experiences — easily the best vacation we have ever taken.',
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
        description="Travelers across Asia and Oceania trust Mandana Odysseys for curated tour packages, transparent pricing, and end-to-end trip support. Here is what some of them shared about booking and traveling with us."
      />

      <Divider />

      <SectionClientSay
        heading="Stories from the road"
        subHeading="Real feedback from Mandana Odysseys travelers"
        testimonials={carouselTestimonials}
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
