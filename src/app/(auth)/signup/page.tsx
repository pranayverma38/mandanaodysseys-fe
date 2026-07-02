import { AuthPanel } from '@/components/auth/auth-panel'
import { createPageMetadata } from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = createPageMetadata({
  title: 'Create Account',
  description: 'Create your Mandana Odysseys account to book affordable international tour and travel packages.',
  path: '/signup',
  noIndex: true,
})

const Page = () => {
  return <AuthPanel view="signup" variant="page" />
}

export default Page
