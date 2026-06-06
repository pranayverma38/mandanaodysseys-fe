import { Heading } from '@/components/heading'
import NewsletterSection from '@/components/newsletter-section-1'
import { ReactNode } from 'react'

interface LegalPageLayoutProps {
  title: ReactNode
  subtitle?: string
  lastUpdated?: string
  children: ReactNode
}

export default function LegalPageLayout({ title, subtitle, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="pt-10 pb-24 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-3xl">
        <Heading level={1} bigger>
          {title}
        </Heading>
        {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
        {lastUpdated && <p className="mt-2 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>}
        <div className="prose prose-sm mt-12 max-w-none sm:prose lg:prose-lg dark:prose-invert">{children}</div>
      </div>
      <div className="container mt-20 lg:mt-32">
        <NewsletterSection />
      </div>
    </div>
  )
}
