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

export function LoginForm({ onSwitchView, onSuccess }: Props) {
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
          <Label className="text-neutral-800 dark:text-neutral-200">Email address</Label>
          <Input type="email" placeholder="example@example.com" className="mt-1" required />
        </Field>
        <Field className="block">
          <div className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
            <Label>Password</Label>
            <button type="button" onClick={() => goToView('forgot-password')} className="text-sm font-medium underline">
              Forgot password?
            </button>
          </div>
          <Input type="password" className="mt-1" required />
        </Field>
        <ButtonPrimary type="submit">Login</ButtonPrimary>
      </form>

      <div className="block text-center text-sm text-neutral-700 dark:text-neutral-300">
        New user?{' '}
        <button type="button" onClick={() => goToView('signup')} className="font-medium underline">
          Create an account
        </button>
      </div>
    </div>
  )
}
