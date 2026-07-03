'use client'

import Input from '@/components/input'
import { useActionState } from 'react'
import { adminLoginAction, type AdminActionState } from '../actions'

const initialState: AdminActionState = {}

export function AdminLogin() {
  const [state, formAction, pending] = useActionState(adminLoginAction, initialState)

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <h1 className="text-2xl font-semibold tracking-tight">Admin sign in</h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Manage custom itineraries for customer accounts.
        </p>

        <form action={formAction} className="mt-8 space-y-4">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Enter admin password"
            />
          </div>

          {state.error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-[#fc6200] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e55800] disabled:opacity-60"
          >
            {pending ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
