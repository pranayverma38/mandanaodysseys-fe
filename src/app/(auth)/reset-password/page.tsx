import { ResetPasswordForm } from '@/components/auth/reset-password-form'
import { createPageMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = createPageMetadata({
  title: 'Reset Password',
  description: 'Set a new password for your Mandana Odysseys account.',
  path: '/reset-password',
  noIndex: true,
})

interface Props {
  searchParams: Promise<{ token?: string }>
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams

  return (
    <div className="container mx-auto max-w-md px-4 py-16 sm:py-24">
      <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm sm:p-8 dark:border-neutral-800 dark:bg-neutral-900">
        <h1 className="text-2xl font-semibold tracking-tight">Reset your password</h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Enter a new password for your account.
        </p>

        <Suspense fallback={null}>
          <ResetPasswordForm token={token} />
        </Suspense>
      </div>
    </div>
  )
}
