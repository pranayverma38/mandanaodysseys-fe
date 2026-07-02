'use client'

import ButtonPrimary from '@/components/button-primary'
import { Field, Label } from '@/components/fieldset'
import Input from '@/components/input'
import { loginAction, type AuthActionState } from '@/lib/auth/actions'
import type { AuthView } from '@/providers/auth-modal-provider'
import { useAuthModal } from '@/providers/auth-modal-provider'
import { useActionState, useEffect } from 'react'
import { AuthDivider } from './auth-divider'
import { AuthSocialButtons } from './auth-social-buttons'

interface Props {
  onSwitchView?: (view: AuthView) => void
  onSuccess?: () => void
}

const initialState: AuthActionState = {}

export function LoginForm({ onSwitchView, onSuccess }: Props) {
  const { openAuth, setAuthenticated } = useAuthModal()
  const [state, formAction, isPending] = useActionState(loginAction, initialState)

  useEffect(() => {
    if (state.success) {
      setAuthenticated(true)
      onSuccess?.()
    }
  }, [state.success, setAuthenticated, onSuccess])

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

      <form className="grid grid-cols-1 gap-6" action={formAction}>
        <Field className="block">
          <Label className="text-neutral-800 dark:text-neutral-200">Email address</Label>
          <Input type="email" name="email" placeholder="example@example.com" className="mt-1" required />
        </Field>
        <Field className="block">
          <div className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
            <Label>Password</Label>
            <button type="button" onClick={() => goToView('forgot-password')} className="text-sm font-medium underline">
              Forgot password?
            </button>
          </div>
          <Input type="password" name="password" className="mt-1" required />
        </Field>

        {state.error && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}

        <ButtonPrimary type="submit" disabled={isPending}>
          {isPending ? 'Signing in…' : 'Login'}
        </ButtonPrimary>
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
