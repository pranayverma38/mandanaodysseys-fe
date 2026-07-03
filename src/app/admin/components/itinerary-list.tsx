'use client'

import FormattedPrice from '@/components/formatted-price'
import Input from '@/components/input'
import type { CustomItineraryStatus } from '@/data/account/types'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useActionState, useState, useTransition } from 'react'
import {
  deleteItineraryAction,
  setItineraryStatusAction,
  updateItineraryAction,
  type AdminActionState,
} from '../actions'
import type { AdminCustomItinerary } from '@/lib/itineraries/store'

const STATUS_LABELS: Record<CustomItineraryStatus, string> = {
  draft: 'Draft',
  sent: 'Quotation sent',
  accepted: 'Accepted',
  expired: 'Expired',
}

const STATUS_COLORS: Record<CustomItineraryStatus, string> = {
  draft: 'bg-neutral-100 text-neutral-700',
  sent: 'bg-orange-100 text-orange-800',
  accepted: 'bg-green-100 text-green-800',
  expired: 'bg-red-100 text-red-800',
}

type Filter = 'all' | 'active' | 'expired'

interface Props {
  itineraries: AdminCustomItinerary[]
  filter: Filter
}

export function ItineraryList({ itineraries, filter }: Props) {
  const router = useRouter()

  function setFilter(next: Filter) {
    const params = new URLSearchParams()
    if (next !== 'all') params.set('filter', next)
    router.push(`/admin${params.toString() ? `?${params}` : ''}`)
  }

  return (
    <section className="rounded-3xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
        <div>
          <h2 className="text-lg font-semibold">Itineraries</h2>
          <p className="text-sm text-neutral-500">{itineraries.length} shown</p>
        </div>

        <div className="flex gap-2">
          {(['all', 'active', 'expired'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={clsx(
                'rounded-full px-4 py-2 text-sm font-medium capitalize transition',
                filter === key
                  ? 'bg-[#fc6200] text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200'
              )}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {itineraries.length === 0 ? (
        <p className="px-6 py-12 text-center text-sm text-neutral-500">No itineraries in this view.</p>
      ) : (
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {itineraries.map((itinerary) => (
            <ItineraryRow key={itinerary.id} itinerary={itinerary} />
          ))}
        </div>
      )}
    </section>
  )
}

function ItineraryRow({ itinerary }: { itinerary: AdminCustomItinerary }) {
  const [editing, setEditing] = useState(false)
  const [pending, startTransition] = useTransition()
  const [message, setMessage] = useState<string | null>(null)

  function runStatus(status: CustomItineraryStatus) {
    startTransition(async () => {
      const result = await setItineraryStatusAction(itinerary.id, status)
      setMessage(result.error ?? result.success ?? null)
    })
  }

  function runDelete() {
    if (!confirm('Delete this itinerary permanently?')) return
    startTransition(async () => {
      const result = await deleteItineraryAction(itinerary.id)
      setMessage(result.error ?? result.success ?? null)
    })
  }

  if (editing) {
    return (
      <div className="p-6">
        <EditForm itinerary={itinerary} onCancel={() => setEditing(false)} />
      </div>
    )
  }

  return (
    <article className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={clsx(
                'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold',
                STATUS_COLORS[itinerary.status]
              )}
            >
              {STATUS_LABELS[itinerary.status]}
            </span>
            <span className="text-xs text-neutral-500">{itinerary.userEmail}</span>
          </div>

          <h3 className="mt-2 text-lg font-semibold">{itinerary.title}</h3>
          <p className="mt-1 text-sm text-[#fc6200] uppercase">{itinerary.destination}</p>
          <p className="mt-1 text-sm text-neutral-500">
            {itinerary.duration} · {itinerary.travelers} travelers ·{' '}
            <FormattedPrice value={itinerary.totalPrice} baseCurrency="AUD" />
          </p>
          {itinerary.notes && (
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{itinerary.notes}</p>
          )}
          <p className="mt-2 text-xs text-neutral-400">
            Created {formatDate(itinerary.createdAt)} · Valid until {formatDate(itinerary.validUntil)}
          </p>
          <a
            href={itinerary.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-xs font-medium text-[#fc6200] underline-offset-2 hover:underline"
          >
            View PDF
          </a>
        </div>

        <div className="flex flex-wrap gap-2">
          {itinerary.status === 'draft' && (
            <ActionButton onClick={() => runStatus('sent')} disabled={pending}>
              Send
            </ActionButton>
          )}
          {itinerary.status === 'sent' && (
            <>
              <ActionButton onClick={() => runStatus('accepted')} disabled={pending} variant="success">
                Mark accepted
              </ActionButton>
              <ActionButton onClick={() => runStatus('draft')} disabled={pending} variant="muted">
                Revoke
              </ActionButton>
              <ActionButton onClick={() => runStatus('expired')} disabled={pending} variant="danger">
                Expire
              </ActionButton>
            </>
          )}
          {itinerary.status === 'accepted' && (
            <ActionButton onClick={() => runStatus('expired')} disabled={pending} variant="danger">
              Expire
            </ActionButton>
          )}
          <ActionButton onClick={() => setEditing(true)} disabled={pending} variant="muted">
            Edit
          </ActionButton>
          <ActionButton onClick={runDelete} disabled={pending} variant="danger">
            Delete
          </ActionButton>
        </div>
      </div>

      {message && (
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">{message}</p>
      )}
    </article>
  )
}

function EditForm({
  itinerary,
  onCancel,
}: {
  itinerary: AdminCustomItinerary
  onCancel: () => void
}) {
  const boundAction = updateItineraryAction.bind(null, itinerary.id)
  const [state, formAction, pending] = useActionState(boundAction, {} as AdminActionState)

  return (
    <form action={formAction} className="grid gap-3 sm:grid-cols-2">
      <Field label="Customer email" className="sm:col-span-2">
        <Input name="userEmail" type="email" defaultValue={itinerary.userEmail} required />
      </Field>
      <Field label="Title">
        <Input name="title" defaultValue={itinerary.title} required />
      </Field>
      <Field label="Destination">
        <Input name="destination" defaultValue={itinerary.destination} required />
      </Field>
      <Field label="Duration">
        <Input name="duration" defaultValue={itinerary.duration} required />
      </Field>
      <Field label="Travelers">
        <Input name="travelers" type="number" min={1} defaultValue={itinerary.travelers} required />
      </Field>
      <Field label="Quoted price (AUD)">
        <Input name="totalPrice" type="number" min={0} defaultValue={itinerary.totalPrice} required />
      </Field>
      <Field label="Valid until">
        <Input name="validUntil" type="date" defaultValue={itinerary.validUntil} required />
      </Field>
      <Field label="Thumbnail URL" className="sm:col-span-2">
        <Input name="thumbnail" type="url" defaultValue={itinerary.thumbnail} required />
      </Field>
      <Field label="PDF link" className="sm:col-span-2">
        <Input name="documentUrl" type="url" defaultValue={itinerary.documentUrl} required />
      </Field>
      <Field label="Notes" className="sm:col-span-2">
        <textarea
          name="notes"
          rows={2}
          defaultValue={itinerary.notes ?? ''}
          className="block w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm"
        />
      </Field>

      <div className="flex gap-2 sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-[#fc6200] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {pending ? 'Saving…' : 'Save changes'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium"
        >
          Cancel
        </button>
      </div>

      {state.error && <p className="sm:col-span-2 text-sm text-red-600">{state.error}</p>}
      {state.success && <p className="sm:col-span-2 text-sm text-green-600">{state.success}</p>}
    </form>
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
      <label className="mb-1 block text-xs font-medium text-neutral-600">{label}</label>
      {children}
    </div>
  )
}

function ActionButton({
  children,
  onClick,
  disabled,
  variant = 'primary',
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  variant?: 'primary' | 'success' | 'danger' | 'muted'
}) {
  const styles = {
    primary: 'bg-[#fc6200] text-white hover:bg-[#e55800]',
    success: 'bg-green-600 text-white hover:bg-green-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    muted: 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'rounded-full px-4 py-2 text-xs font-semibold transition disabled:opacity-50',
        styles[variant]
      )}
    >
      {children}
    </button>
  )
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
