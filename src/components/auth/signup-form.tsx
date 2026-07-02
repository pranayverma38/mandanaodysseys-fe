'use client'

import ButtonPrimary from '@/components/button-primary'
import { Field, Label } from '@/components/fieldset'
import Input from '@/components/input'
import type { AuthView } from '@/providers/auth-modal-provider'
import { useAuthModal } from '@/providers/auth-modal-provider'
import { AuthDivider } from './auth-divider'
import { AuthSocialButtons } from './auth-social-buttons'

interface Props {
  onSwitchView?: (view: AuthView) => void
  onSuccess?: () => void
}

export function SignupForm({ onSwitchView, onSuccess }: Props) {
  const { openAuth } = useAuthModal()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSuccess?.()
  }

  const goToView = (view: AuthView) => {
    if (onSwitchView) {
      onSwitchView(view)
      return
    }
    openAuth(view)
  }

  return (
    <div className="space-y-6">
      <AuthSocialButtons />
      <AuthDivider />

      <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
        <Field className="block">
          <Label className="text-neutral-800 dark:text-neutral-200">First name</Label>
          <Input type="text" name="firstName" placeholder="Your first name" className="mt-1" required autoComplete="given-name" />
        </Field>
        <Field className="block">
          <Label className="text-neutral-800 dark:text-neutral-200">Email address</Label>
          <Input type="email" placeholder="example@example.com" className="mt-1" required />
        </Field>
        <Field className="block">
          <Label className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">Password</Label>
          <Input type="password" className="mt-1" required />
        </Field>
        <ButtonPrimary type="submit">Continue</ButtonPrimary>
      </form>

      <div className="block text-center text-sm text-neutral-700 dark:text-neutral-300">
        Already have an account?{' '}
        <button type="button" onClick={() => goToView('login')} className="font-medium underline">
          Sign in
        </button>
      </div>
    </div>
  )
}
