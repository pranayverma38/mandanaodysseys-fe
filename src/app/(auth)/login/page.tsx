import { AuthPanel } from '@/components/auth/auth-panel'
import { createPageMetadata } from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = createPageMetadata({
  title: 'Sign In',
  description: 'Sign in to your Mandana Odysseys account to manage tour bookings and travel packages.',
  path: '/login',
  noIndex: true,
})

const Page = () => {
  return <AuthPanel view="login" variant="page" />
}

export default Page
