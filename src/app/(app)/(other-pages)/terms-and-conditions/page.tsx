import LegalPageLayout from '@/components/legal-page-layout'
import { createPageMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = createPageMetadata({
  title: 'Terms & Conditions',
  description:
    'Read the terms and conditions for booking international tour and travel packages with Mandana Odysseys.',
  path: '/terms-and-conditions',
})

const PageTermsAndConditions = () => {
  return (
    <LegalPageLayout
      title={
        <>
          Terms & <span data-slot="italic">Conditions</span>
        </>
      }
      subtitle="Please read these terms carefully before booking a tour or travel package with Mandana Odysseys."
      lastUpdated="June 6, 2026"
    >
      <h2>1. Agreement to Terms</h2>
      <p>
        By accessing our website, submitting a booking inquiry, or purchasing a tour or travel package through Mandana
        Odysseys, you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use our
        services.
      </p>

      <h2>2. Bookings and Payments</h2>
      <p>
        All bookings are subject to availability and confirmation. A deposit or full payment may be required at the time
        of booking, depending on the package selected. Prices are quoted in the currency displayed at checkout and may
        be subject to change until your booking is confirmed.
      </p>
      <ul>
        <li>Confirmed bookings will receive a booking reference and itinerary details by email.</li>
        <li>You are responsible for ensuring all traveler information provided is accurate and complete.</li>
        <li>Additional fees for visas, travel insurance, or optional activities may apply and will be disclosed before purchase.</li>
      </ul>

      <h2>3. Travel Documents and Requirements</h2>
      <p>
        Travelers are responsible for obtaining valid passports, visas, vaccinations, and any other documents required
        for their destination. Mandana Odysseys is not liable for denied boarding or entry due to incomplete or invalid
        travel documentation.
      </p>

      <h2>4. Itinerary Changes</h2>
      <p>
        We work with trusted local partners to deliver the experiences described in each package. Occasionally,
        itineraries may be modified due to weather, safety concerns, or operational reasons. We will make reasonable
        efforts to provide equivalent alternatives when changes are necessary.
      </p>

      <h2>5. Liability</h2>
      <p>
        Mandana Odysseys acts as an intermediary between travelers and third-party service providers including
        airlines, hotels, and local tour operators. Our liability is limited to the extent permitted by applicable
        law. We strongly recommend purchasing comprehensive travel insurance for all international trips.
      </p>

      <h2>6. Contact</h2>
      <p>
        For questions about these terms, please{' '}
        <Link href="/contact">contact us</Link> or email{' '}
        <a href="mailto:support@mandanaodysseys.com">support@mandanaodysseys.com</a>.
      </p>
    </LegalPageLayout>
  )
}

export default PageTermsAndConditions
