import ButtonPrimary from '@/components/button-primary'
import { Field, Label } from '@/components/fieldset'
import Input from '@/components/input'
import Select from '@/components/select'
import Textarea from '@/components/textarea'
import type { UserProfile } from '@/data/account/types'
import Form from 'next/form'
import { updateProfile } from '../actions'

interface Props {
  profile: UserProfile
}

export function AccountProfileSection({ profile }: Props) {
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
        action={updateProfile}
        className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div className="border-b border-neutral-100 bg-neutral-50/80 px-6 py-8 dark:border-neutral-800 dark:bg-neutral-800/30 sm:px-8">
          <div>
            <h3 className="text-lg font-semibold">
              {profile.firstName} {profile.lastName}
            </h3>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{profile.email}</p>
            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
              {profile.city}, {profile.country}
            </p>
          </div>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
          <Field>
            <Label>First name</Label>
            <Input className="mt-1.5" name="firstName" defaultValue={profile.firstName} />
          </Field>
          <Field>
            <Label>Last name</Label>
            <Input className="mt-1.5" name="lastName" defaultValue={profile.lastName} />
          </Field>
          <Field>
            <Label>Gender</Label>
            <Select className="mt-1.5" name="gender" defaultValue={profile.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </Select>
          </Field>
          <Field>
            <Label>Date of birth</Label>
            <Input className="mt-1.5" name="dateOfBirth" type="date" defaultValue={profile.dateOfBirth} />
          </Field>
          <Field className="sm:col-span-2">
            <Label>Email address</Label>
            <Input className="mt-1.5" name="email" type="email" defaultValue={profile.email} />
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
          <Field>
            <Label>City</Label>
            <Input className="mt-1.5" name="city" defaultValue={profile.city} />
          </Field>
          <Field className="sm:col-span-2">
            <Label>About you</Label>
            <Textarea className="mt-1.5 min-h-28" name="about" defaultValue={profile.about} />
          </Field>
        </div>

        <div className="flex flex-col gap-3 border-t border-neutral-100 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:border-neutral-800">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Your information is securely stored and used only for booking purposes.
          </p>
          <ButtonPrimary type="submit">Save changes</ButtonPrimary>
        </div>
      </Form>
    </section>
  )
}
