import { AdminPanel } from './components/admin-panel'

interface Props {
  searchParams: Promise<{ filter?: string }>
}

export default async function AdminPage({ searchParams }: Props) {
  const { filter } = await searchParams

  return <AdminPanel filter={filter} />
}
