'use client'

import { useTransition } from 'react'
import { adminLogoutAction } from '../actions'

export function AdminLogoutButton() {
  const [pending, startTransition] = useTransition()

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => adminLogoutAction())}
      className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-60 dark:border-neutral-700 dark:text-neutral-200"
    >
      {pending ? 'Signing out…' : 'Sign out'}
    </button>
  )
}
