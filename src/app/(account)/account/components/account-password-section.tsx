import ButtonPrimary from '@/components/button-primary'
import { Field, Label } from '@/components/fieldset'
import Input from '@/components/input'
import { SecurityLockIcon, Shield01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Form from 'next/form'
import { updatePassword } from '../actions'

export function AccountPasswordSection() {
  return (
    <section aria-labelledby="account-password-heading">
      <div className="mb-8">
        <h2 id="account-password-heading" className="text-2xl font-medium tracking-tight sm:text-3xl">
          Reset <span className="font-serif italic text-[#fc6200]">password</span>
        </h2>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Choose a strong password to keep your account and booking history secure.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="rounded-3xl border border-[#fc6200]/20 bg-linear-to-br from-[#fc6200]/10 via-[#ff9a3d]/5 to-transparent p-6 lg:col-span-2 dark:from-[#fc6200]/15">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-[#fc6200] text-white">
            <HugeiconsIcon icon={Shield01Icon} size={24} />
          </div>
          <h3 className="mt-5 text-lg font-semibold">Security tips</h3>
          <ul className="mt-4 space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
            <li className="flex gap-2">
              <span className="text-[#fc6200]">•</span>
              Use at least 8 characters with a mix of letters, numbers, and symbols.
            </li>
            <li className="flex gap-2">
              <span className="text-[#fc6200]">•</span>
              Avoid using personal information or common words.
            </li>
            <li className="flex gap-2">
              <span className="text-[#fc6200]">•</span>
              Do not reuse passwords from other websites.
            </li>
          </ul>
        </div>

        <Form
          action={updatePassword}
          className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 lg:col-span-3 dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="mb-6 flex items-center gap-3 border-b border-neutral-100 pb-6 dark:border-neutral-800">
            <HugeiconsIcon icon={SecurityLockIcon} size={22} className="text-[#fc6200]" />
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Update your password</p>
          </div>

          <div className="space-y-6">
            <Field>
              <Label>Current password</Label>
              <Input type="password" name="currentPassword" className="mt-1.5" autoComplete="current-password" />
            </Field>
            <Field>
              <Label>New password</Label>
              <Input type="password" name="newPassword" className="mt-1.5" autoComplete="new-password" />
            </Field>
            <Field>
              <Label>Confirm new password</Label>
              <Input type="password" name="confirmPassword" className="mt-1.5" autoComplete="new-password" />
            </Field>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              You will be signed out of other devices after updating.
            </p>
            <ButtonPrimary type="submit">Update password</ButtonPrimary>
          </div>
        </Form>
      </div>
    </section>
  )
}
