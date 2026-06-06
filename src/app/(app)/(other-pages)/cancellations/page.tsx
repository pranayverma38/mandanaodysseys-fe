import LegalPageLayout from '@/components/legal-page-layout'
import { createPageMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = createPageMetadata({
  title: 'Cancellation Policy',
  description:
    'Understand Mandana Odysseys cancellation and refund policies for international tour and travel package bookings.',
  path: '/cancellations',
})

const PageCancellations = () => {
  return (
    <LegalPageLayout
      title={
        <>
          Cancellation <span data-slot="italic">Policy</span>
        </>
      }
      subtitle="We understand plans can change. Here is how cancellations and refunds work for Mandana Odysseys bookings."
      lastUpdated="June 6, 2026"
    >
      <h2>1. Cancellation by the Traveler</h2>
      <p>
        If you need to cancel your booking, please notify us as soon as possible by email at{' '}
        <a href="mailto:support@mandanaodysseys.com">support@mandanaodysseys.com</a> or through our{' '}
        <Link href="/contact">Contact page</Link>. Refund eligibility depends on how far in advance you cancel and the
        specific package terms.
      </p>

      <h2>2. Standard Refund Schedule</h2>
      <p>For most international tour packages, the following guidelines apply unless otherwise stated at booking:</p>
      <ul>
        <li>
          <strong>More than 60 days before departure</strong> — Full refund minus any non-refundable deposits or
          third-party fees already incurred.
        </li>
        <li>
          <strong>30–60 days before departure</strong> — 75% refund of the total package price, minus non-refundable
          components.
        </li>
        <li>
          <strong>15–29 days before departure</strong> — 50% refund of the total package price, minus non-refundable
          components.
        </li>
        <li>
          <strong>Less than 15 days before departure</strong> — No refund, except where required by law or covered by
          travel insurance.
        </li>
      </ul>

      <h2>3. Non-Refundable Items</h2>
      <p>
        Certain components of your booking may be non-refundable once confirmed, including but not limited to airline
        tickets, visa fees, special event tickets, and deposits paid to local partners. These will be clearly
        communicated at the time of booking.
      </p>

      <h2>4. Date Changes and Transfers</h2>
      <p>
        Where possible, we will work with you to reschedule your trip to a later date instead of cancelling outright.
        Change requests are subject to availability and may incur a change fee. Transferring your booking to another
        traveler may be permitted on select packages — contact us for details.
      </p>

      <h2>5. Cancellation by Mandana Odysseys</h2>
      <p>
        In rare cases, we may need to cancel a tour due to insufficient enrollment, safety concerns, or circumstances
        beyond our control. If this occurs, you will receive a full refund or the option to rebook on an alternative
        date or package of equal value.
      </p>

      <h2>6. Travel Insurance</h2>
      <p>
        We strongly recommend purchasing comprehensive travel insurance that covers trip cancellation, medical
        emergencies, and unexpected disruptions. Insurance claims are handled directly between you and your insurance
        provider.
      </p>

      <h2>7. Force Majeure</h2>
      <p>
        Mandana Odysseys is not liable for cancellations or delays caused by events outside our reasonable control,
        including natural disasters, pandemics, political unrest, or government travel restrictions. In such cases, we
        will work with our partners to find the best available resolution.
      </p>

      <h2>8. Questions</h2>
      <p>
        For cancellation requests or refund status inquiries, reach out to{' '}
        <a href="mailto:support@mandanaodysseys.com">support@mandanaodysseys.com</a>. Our team typically responds
        within 2 business days.
      </p>
    </LegalPageLayout>
  )
}

export default PageCancellations
