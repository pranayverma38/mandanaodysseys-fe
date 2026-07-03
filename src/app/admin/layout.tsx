import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Custom Itineraries',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="container max-w-6xl py-10 sm:py-12">{children}</div>
    </div>
  )
}
