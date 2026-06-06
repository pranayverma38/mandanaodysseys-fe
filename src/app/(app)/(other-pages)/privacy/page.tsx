import LegalPageLayout from '@/components/legal-page-layout'
import { createPageMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = createPageMetadata({
  title: 'Privacy Policy',
  description:
    'Learn how Mandana Odysseys collects, uses, and protects your personal information when you book tour and travel packages.',
  path: '/privacy',
})

const PagePrivacy = () => {
  return (
    <LegalPageLayout
      title={
        <>
          Privacy <span data-slot="italic">Policy</span>
        </>
      }
      subtitle="Your privacy matters to us. This policy explains how we handle your personal data."
      lastUpdated="June 6, 2026"
    >
      <h2>1. Information We Collect</h2>
      <p>When you use Mandana Odysseys, we may collect the following types of information:</p>
      <ul>
        <li>
          <strong>Contact details</strong> — name, email address, phone number, and mailing address when you inquire
          about or book a trip.
        </li>
        <li>
          <strong>Booking information</strong> — travel dates, destination preferences, number of travelers, and special
          requests.
        </li>
        <li>
          <strong>Payment information</strong> — processed securely through our payment partners; we do not store full
          credit card numbers on our servers.
        </li>
        <li>
          <strong>Usage data</strong> — pages visited, device type, and general analytics to improve our website
          experience.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Process and manage your tour and travel bookings.</li>
        <li>Communicate booking confirmations, itinerary updates, and customer support responses.</li>
        <li>Send promotional offers and travel inspiration, only where you have opted in.</li>
        <li>Improve our services, website, and customer experience.</li>
        <li>Comply with legal and regulatory obligations.</li>
      </ul>

      <h2>3. Sharing Your Information</h2>
      <p>
        We share personal data only with trusted partners necessary to fulfill your booking — such as airlines, hotels,
        local tour operators, and payment processors. We do not sell your personal information to third parties.
      </p>

      <h2>4. Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your data against unauthorized access,
        alteration, or disclosure. However, no method of transmission over the internet is completely secure.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        Depending on your location, you may have the right to access, correct, delete, or restrict the processing of your
        personal data. To exercise these rights, contact us at{' '}
        <a href="mailto:support@mandanaodysseys.com">support@mandanaodysseys.com</a>.
      </p>

      <h2>6. Cookies</h2>
      <p>
        Our website uses cookies and similar technologies to remember your preferences and analyze site traffic. You can
        manage cookie settings through your browser.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, please visit our{' '}
        <Link href="/contact">Contact page</Link> or email{' '}
        <a href="mailto:support@mandanaodysseys.com">support@mandanaodysseys.com</a>.
      </p>
    </LegalPageLayout>
  )
}

export default PagePrivacy
