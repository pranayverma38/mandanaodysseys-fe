import LegalPageLayout from '@/components/legal-page-layout'
import { createPageMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = createPageMetadata({
  title: 'Code of Conduct',
  description:
    'Mandana Odysseys Code of Conduct for travelers, partners, and team members — respectful, safe, and responsible travel.',
  path: '/code-of-conduct',
})

const PageCodeOfConduct = () => {
  return (
    <LegalPageLayout
      title={
        <>
          Code of <span data-slot="italic">Conduct</span>
        </>
      }
      subtitle="Our shared standards for respectful, safe, and responsible travel with Mandana Odysseys."
      lastUpdated="June 20, 2026"
    >
      <h2>1. Our Commitment</h2>
      <p>
        Mandana Odysseys is built on trust, hospitality, and a genuine respect for the people and places we visit. This
        Code of Conduct applies to all travelers booking with us, our local partners, guides, and team members. By
        traveling with Mandana Odysseys, you agree to uphold these standards.
      </p>

      <h2>2. Respect for People &amp; Cultures</h2>
      <ul>
        <li>Treat local communities, hosts, guides, and fellow travelers with courtesy and respect.</li>
        <li>Honor local customs, dress codes, and cultural norms at religious sites, markets, and public spaces.</li>
        <li>Do not engage in harassment, discrimination, or abusive behavior of any kind.</li>
        <li>Ask permission before photographing people, especially in sensitive or private settings.</li>
      </ul>

      <h2>3. Responsible Travel</h2>
      <ul>
        <li>Follow guidance from your guide and adhere to itinerary safety briefings.</li>
        <li>Protect natural environments — avoid littering, damaging wildlife habitats, or removing cultural artifacts.</li>
        <li>Support local economies ethically; avoid exploitative activities or unauthorized wildlife interactions.</li>
        <li>Comply with local laws, visa requirements, and health advisories for each destination.</li>
      </ul>

      <h2>4. Safety &amp; Wellbeing</h2>
      <p>
        Your safety is our priority. Report any concerns — including illness, injury, or feeling unsafe — to your guide
        or our support team immediately. Alcohol and substance misuse that endangers yourself or others is not
        permitted. Mandana Odysseys reserves the right to remove any participant from a trip without refund if their
        behavior poses a risk to themselves or others.
      </p>

      <h2>5. Honest Communication</h2>
      <p>
        Provide accurate information during booking and throughout your journey, including health conditions, dietary
        needs, and emergency contacts. Misrepresentation may affect your eligibility for certain activities or
        insurance coverage.
      </p>

      <h2>6. Reporting Concerns</h2>
      <p>
        If you witness or experience behavior that violates this Code of Conduct, please contact us at{' '}
        <a href="mailto:support@mandanaodysseys.com">support@mandanaodysseys.com</a> or through our{' '}
        <Link href="/contact">Contact page</Link>. All reports are reviewed confidentially and addressed promptly.
      </p>

      <h2>7. Updates</h2>
      <p>
        We may update this Code of Conduct from time to time. The latest version will always be available on this page.
        Continued use of our services after changes are posted constitutes acceptance of the revised standards.
      </p>
    </LegalPageLayout>
  )
}

export default PageCodeOfConduct
