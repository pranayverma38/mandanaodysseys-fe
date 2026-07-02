'use client'

import ButtonPrimary from '@/components/button-primary'
import { Field, Label } from '@/components/fieldset'
import Input from '@/components/input'
import type { UserProfile } from '@/data/account/types'
import type { ActionState } from '../actions'
import { updateProfile } from '../actions'
import Form from 'next/form'
import { useActionState } from 'react'

interface Props {
  profile: UserProfile
}

const initialState: ActionState = {}

export function AccountProfileSection({ profile }: Props) {
  const [state, formAction, isPending] = useActionState(updateProfile, initialState)

  return (
    <section aria-labelledby="account-profile-heading">
      <div className="mb-8">
        <h2 id="account-profile-heading" className="text-2xl font-medium tracking-tight sm:text-3xl">
          Account <span className="font-serif italic text-[#fc6200]">details</span>
        </h2>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Keep your personal information up to date for smoother bookings and personalized recommendations.
        </p>
      </div>

      <Form
        action={formAction}
        className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div className="border-b border-neutral-100 bg-neutral-50/80 px-6 py-8 dark:border-neutral-800 dark:bg-neutral-800/30 sm:px-8">
          <div>
            <h3 className="text-lg font-semibold">{profile.fullName}</h3>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{profile.email}</p>
          </div>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
          <Field className="sm:col-span-2">
            <Label>Full name</Label>
            <Input className="mt-1.5" name="fullName" defaultValue={profile.fullName} />
          </Field>
          <Field>
            <Label>Gender</Label>
            <select
              className="mt-1.5 block w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              name="gender"
              defaultValue={profile.gender}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </Field>
          <Field>
            <Label>Date of birth</Label>
            <Input className="mt-1.5" name="dateOfBirth" type="date" defaultValue={profile.dateOfBirth} />
          </Field>
          <Field className="sm:col-span-2">
            <Label>Email address</Label>
            <Input className="mt-1.5" name="email" type="email" defaultValue={profile.email} readOnly />
          </Field>
          <Field>
            <Label>Phone number</Label>
            <Input className="mt-1.5" name="phone" type="tel" defaultValue={profile.phone} />
          </Field>
          <Field>
            <Label>Country</Label>
            <Input className="mt-1.5" name="country" defaultValue={profile.country} />
          </Field>
          <Field className="sm:col-span-2">
            <Label>Address</Label>
            <Input className="mt-1.5" name="address" defaultValue={profile.address} />
          </Field>
        </div>

        <div className="flex flex-col gap-3 border-t border-neutral-100 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:border-neutral-800">
          <div className="space-y-1">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Your information is securely stored and used only for booking purposes.
            </p>
            {state.error && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
            {state.success && <p className="text-sm text-emerald-600 dark:text-emerald-400">{state.success}</p>}
          </div>
          <ButtonPrimary type="submit" disabled={isPending}>
            {isPending ? 'Saving…' : 'Save changes'}
          </ButtonPrimary>
        </div>
      </Form>
    </section>
  )
}
