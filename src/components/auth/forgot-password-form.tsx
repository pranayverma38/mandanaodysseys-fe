'use client'

import ButtonPrimary from '@/components/button-primary'
import { Field, Label } from '@/components/fieldset'
import Input from '@/components/input'
import { requestPasswordResetAction, type AuthActionState } from '@/lib/auth/actions'
import type { AuthView } from '@/providers/auth-modal-provider'
import { useAuthModal } from '@/providers/auth-modal-provider'
import { useActionState } from 'react'

interface Props {
  onSwitchView?: (view: AuthView) => void
}

const initialState: AuthActionState = {}

export function ForgotPasswordForm({ onSwitchView }: Props) {
  const { openAuth } = useAuthModal()
  const [state, formAction, isPending] = useActionState(requestPasswordResetAction, initialState)

  const goToView = (view: AuthView) => {
    if (onSwitchView) {
      onSwitchView(view)
      return
    }
    openAuth(view)
  }

  return (
    <div className="space-y-6">
      <form className="grid grid-cols-1 gap-6" action={formAction}>
        <Field className="block">
          <Label className="text-neutral-800 dark:text-neutral-200">Email address</Label>
          <Input type="email" name="email" placeholder="example@example.com" className="mt-1" required />
        </Field>

        {state.error && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
        {state.success && <p className="text-sm text-emerald-600 dark:text-emerald-400">{state.success}</p>}

        <ButtonPrimary type="submit" disabled={isPending}>
          {isPending ? 'Sending…' : 'Continue'}
        </ButtonPrimary>
      </form>

      <div className="block text-center text-sm text-neutral-700 dark:text-neutral-300">
        New user?{' '}
        <button type="button" onClick={() => goToView('signup')} className="font-medium underline">
          Create an account
        </button>
        {'  or  '}
        <button type="button" onClick={() => goToView('login')} className="font-medium underline">
          Sign in
        </button>
      </div>
    </div>
  )
}
