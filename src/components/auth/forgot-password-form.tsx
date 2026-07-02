'use client'

import ButtonPrimary from '@/components/button-primary'
import { Field, Label } from '@/components/fieldset'
import Input from '@/components/input'
import Link from 'next/link'
import type { AuthView } from '@/providers/auth-modal-provider'

interface Props {
  variant?: 'page' | 'modal'
  onSwitchView?: (view: AuthView) => void
}

export function ForgotPasswordForm({ variant = 'page', onSwitchView }: Props) {
  const isModal = variant === 'modal'

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div className="space-y-6">
      <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
        <Field className="block">
          <Label className="text-neutral-800 dark:text-neutral-200">Email address</Label>
          <Input type="email" placeholder="example@example.com" className="mt-1" required />
        </Field>
        <ButtonPrimary type="submit">Continue</ButtonPrimary>
      </form>

      <div className="block text-center text-sm text-neutral-700 dark:text-neutral-300">
        New user?{' '}
        {isModal && onSwitchView ? (
          <button type="button" onClick={() => onSwitchView('signup')} className="font-medium underline">
            Create an account
          </button>
        ) : (
          <Link href="/signup" className="font-medium underline">
            Create an account
          </Link>
        )}
        {'  or  '}
        {isModal && onSwitchView ? (
          <button type="button" onClick={() => onSwitchView('login')} className="font-medium underline">
            Sign in
          </button>
        ) : (
          <Link href="/login" className="font-medium underline">
            Sign in
          </Link>
        )}
      </div>
    </div>
  )
}
