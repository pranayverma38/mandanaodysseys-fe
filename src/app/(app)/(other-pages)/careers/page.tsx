import ButtonPrimary from '@/components/button-primary'
import { Heading } from '@/components/heading'
import NewsletterSection from '@/components/newsletter-section-1'
import { Text } from '@/components/text'
import { createPageMetadata } from '@/lib/seo'
import { MapPinIcon, BriefcaseIcon, ClockIcon } from '@heroicons/react/24/outline'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = createPageMetadata({
  title: 'Careers',
  description:
    'Join the Mandana Odysseys team. Explore career opportunities in travel, customer experience, and tour operations.',
  path: '/careers',
})

const openings = [
  {
    title: 'Travel Experience Specialist',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Help travelers find the perfect international tour packages and deliver exceptional booking support from inquiry to departure.',
  },
  {
    title: 'Destination Content Writer',
    location: 'Hybrid — Bangkok',
    type: 'Part-time',
    description:
      'Create engaging destination guides, blog posts, and tour descriptions that inspire travelers to explore with Mandana Odysseys.',
  },
  {
    title: 'Tour Operations Coordinator',
    location: 'On-site — Bangkok',
    type: 'Full-time',
    description:
      'Coordinate guided tour logistics, partner with local operators, and ensure every trip runs smoothly for our guests.',
  },
]

const PageCareers = () => {
  return (
    <div className="pt-10 pb-24 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Heading level={1} bigger>
            Join the <span data-slot="italic">Mandana Odysseys</span> team
          </Heading>
          <Text className="mt-6 text-lg text-muted-foreground">
            We are building a team passionate about travel, hospitality, and creating unforgettable experiences for
            explorers around the world.
          </Text>
        </div>

        <section className="mt-16 space-y-6">
          <Heading level={2}>Open positions</Heading>
          <div className="grid gap-5 lg:grid-cols-1">
            {openings.map((job) => (
              <article
                key={job.title}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
              >
                <div className="space-y-3">
                  <h3 className="text-xl font-medium text-foreground">{job.title}</h3>
                  <p className="text-muted-foreground">{job.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPinIcon className="size-4 shrink-0" aria-hidden="true" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <BriefcaseIcon className="size-4 shrink-0" aria-hidden="true" />
                      {job.type}
                    </span>
                  </div>
                </div>
                <ButtonPrimary href={`mailto:careers@mandanaodysseys.com?subject=Application: ${job.title}`}>
                  Apply now
                </ButtonPrimary>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-2xl bg-neutral-100 p-8 dark:bg-neutral-900 sm:p-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Heading level={2}>Don&apos;t see the right role?</Heading>
              <Text className="mt-3 max-w-lg text-muted-foreground">
                Send us your resume and tell us how you would like to contribute. We are always looking for talented
                people who share our love of travel.
              </Text>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:items-end">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <ClockIcon className="size-4" aria-hidden="true" />
                We typically respond within 5 business days
              </span>
              <ButtonPrimary href="mailto:careers@mandanaodysseys.com">Get in touch</ButtonPrimary>
            </div>
          </div>
        </section>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Prefer to reach out directly?{' '}
          <Link href="/contact" className="font-medium text-foreground underline-offset-4 hover:underline">
            Contact us
          </Link>
        </p>
      </div>

      <div className="container mt-20 lg:mt-32">
        <NewsletterSection />
      </div>
    </div>
  )
}

export default PageCareers
