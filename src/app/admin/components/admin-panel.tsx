import { getAdminDashboardData } from '../actions'
import { AdminLogin } from './admin-login'
import { ItineraryForm } from './itinerary-form'
import { ItineraryList } from './itinerary-list'
import { AdminLogoutButton } from './admin-logout-button'

type Filter = 'all' | 'active' | 'expired'

interface Props {
  filter?: string
}

export async function AdminPanel({ filter }: Props) {
  const data = await getAdminDashboardData(resolveFilter(filter))

  if (!data) {
    return <AdminLogin />
  }

  const { itineraries, stats } = data

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Custom <span className="font-serif italic text-[#fc6200]">itineraries</span>
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Create, send, and manage personalized quotations linked to customer emails.
          </p>
        </div>
        <AdminLogoutButton />
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Drafts" value={stats.draft} />
        <StatCard label="Sent" value={stats.sent} />
        <StatCard label="Accepted" value={stats.accepted} />
        <StatCard label="Expired" value={stats.expired} />
      </div>

      <ItineraryForm />
      <ItineraryList itineraries={itineraries} filter={resolveFilter(filter)} />
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 dark:border-neutral-800 dark:bg-neutral-900">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  )
}

function resolveFilter(value?: string): Filter {
  if (value === 'active' || value === 'expired') return value
  return 'all'
}
