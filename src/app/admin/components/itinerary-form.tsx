'use client'

import Input from '@/components/input'
import type { CustomItineraryStatus } from '@/data/account/types'
import { useActionState } from 'react'
import { createItineraryAction, type AdminActionState } from '../actions'

const initialState: AdminActionState = {}

const STATUS_OPTIONS: { value: CustomItineraryStatus; label: string }[] = [
  { value: 'draft', label: 'Draft (hidden from user)' },
  { value: 'sent', label: 'Quotation sent (visible to user)' },
]

export function ItineraryForm() {
  const [state, formAction, pending] = useActionState(createItineraryAction, initialState)

  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <h2 className="text-lg font-semibold">Add custom itinerary</h2>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Assign an itinerary to a customer by their account email. Use &quot;Send&quot; later to publish drafts.
      </p>

      <form action={formAction} className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Customer email" className="sm:col-span-2">
          <Input name="userEmail" type="email" required placeholder="customer@example.com" />
        </Field>

        <Field label="Title">
          <Input name="title" required placeholder="Golden Triangle — Private Luxury" />
        </Field>

        <Field label="Destination">
          <Input name="destination" required placeholder="India" />
        </Field>

        <Field label="Duration">
          <Input name="duration" required placeholder="7 Days / 6 Nights" />
        </Field>

        <Field label="Travelers">
          <Input name="travelers" type="number" min={1} defaultValue={2} required />
        </Field>

        <Field label="Quoted price (AUD)">
          <Input name="totalPrice" type="number" min={0} step={1} required placeholder="3159" />
        </Field>

        <Field label="Valid until">
          <Input name="validUntil" type="date" required />
        </Field>

        <Field label="Thumbnail URL" className="sm:col-span-2">
          <Input name="thumbnail" type="url" required placeholder="https://images.pexels.com/..." />
        </Field>

        <Field label="PDF link" className="sm:col-span-2">
          <Input name="documentUrl" type="url" required placeholder="https://.../itinerary.pdf" />
        </Field>

        <Field label="Notes (optional)" className="sm:col-span-2">
          <textarea
            name="notes"
            rows={3}
            placeholder="Includes private transfers, heritage hotels..."
            className="block w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm"
          />
        </Field>

        <Field label="Initial status">
          <select
            name="status"
            defaultValue="draft"
            className="block h-11 w-full rounded-full border border-input bg-card px-4 text-sm"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>

        <div className="flex items-end sm:col-span-1">
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-[#fc6200] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e55800] disabled:opacity-60"
          >
            {pending ? 'Creating…' : 'Create itinerary'}
          </button>
        </div>

        {state.error && (
          <p className="sm:col-span-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
            {state.error}
          </p>
        )}
        {state.success && (
          <p className="sm:col-span-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-950/40 dark:text-green-300">
            {state.success}
          </p>
        )}
      </form>
    </section>
  )
}

function Field({
  label,
  children,
  className = '',
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
    </div>
  )
}
