import ButtonPrimary from '@/components/button-primary'
import { Field, Label } from '@/components/fieldset'
import { Heading } from '@/components/heading'
import Input from '@/components/input'
import NewsletterSection from '@/components/newsletter-section-1'
import SocialsList from '@/components/socials-list'
import Textarea from '@/components/textarea'
import { SentIcon, Facebook01Icon, InstagramFreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { createPageMetadata } from '@/lib/seo'
import { Metadata } from 'next'

const info = [
  {
    title: 'ADDRESS',
    description: 'Melbourne, Australia',
  },
  {
    title: 'EMAIL',
    description: 'support@mandanaodysseys.com',
    href: 'mailto:support@mandanaodysseys.com',
  },
  {
    title: 'PHONE',
    description: '(00) 2353 7878',
    href: 'tel:0023537878',
  },
] as const

const contactSocials = [
  {
    name: 'Facebook',
    href: '#',
    icon: Facebook01Icon,
  },
  {
    name: 'Instagram',
    href: '#',
    icon: InstagramFreeIcons,
  },
]

export const metadata: Metadata = createPageMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with Mandana Odysseys for tour package inquiries, travel bookings, and personalized vacation planning. We are here to help plan your next adventure.',
  path: '/contact',
})

const PageContact = () => {
  return (
    <div className="pt-10 pb-24 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl">
        <div className="grid shrink-0 grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2">
          <div>
            <Heading level={1} bigger>
              Contact <span data-slot="italic">Us</span>
            </Heading>
            <div className="mt-10 flex max-w-sm flex-col gap-y-8 sm:mt-20">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="text-sm font-medium tracking-wider uppercase dark:text-neutral-200">{item.title}</h3>
                  {'href' in item ? (
                    <a
                      href={item.href}
                      className="mt-2 block text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.description}
                    </a>
                  ) : (
                    <span className="mt-2 block text-muted-foreground">{item.description}</span>
                  )}
                </div>
              ))}
              <div>
                <h3 className="text-sm font-medium tracking-wider uppercase dark:text-neutral-200">SOCIALS</h3>
                <SocialsList className="mt-2" socials={contactSocials} />
              </div>
            </div>
          </div>
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <Field className="block">
              <Label>Full name</Label>
              <Input placeholder="Example Doe" type="text" className="mt-1" />
            </Field>
            <Field className="block">
              <Label>Email address</Label>
              <Input type="email" placeholder="example@example.com" className="mt-1" />
            </Field>
            <Field className="block">
              <Label>Message</Label>
              <Textarea className="mt-1" rows={6} />
            </Field>
            <div>
              <ButtonPrimary type="submit">
                Send Message
                <HugeiconsIcon icon={SentIcon} size={16} />
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </div>

      {/* OTHER SECTIONS */}
      <div className="container mt-20 lg:mt-32">
        <NewsletterSection />
      </div>
    </div>
  )
}

export default PageContact
