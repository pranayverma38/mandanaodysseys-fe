import { AuthPanel } from '@/components/auth/auth-panel'
import { createPageMetadata } from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = createPageMetadata({
  title: 'Reset Password',
  description: 'Reset your Mandana Odysseys account password.',
  path: '/forgot-password',
  noIndex: true,
})

const Page = () => {
  return <AuthPanel view="forgot-password" variant="page" showLogo />
}

export default Page
