'use client'

import ButtonPrimary from '@/components/button-primary'
import { Field, Label } from '@/components/fieldset'
import Input from '@/components/input'
import { resetPasswordWithTokenAction, type AuthActionState } from '@/lib/auth/actions'
import Link from 'next/link'
import { useActionState } from 'react'

interface Props {
  token?: string
}

const initialState: AuthActionState = {}

export function ResetPasswordForm({ token }: Props) {
  const [state, formAction, isPending] = useActionState(resetPasswordWithTokenAction, initialState)

  if (!token) {
    return (
      <div className="mt-8 space-y-4">
        <p className="text-sm text-red-600 dark:text-red-400">
          This reset link is invalid or has expired. Request a new password reset email from the sign-in screen.
        </p>
        <Link href="/?auth=forgot-password" className="text-sm font-medium underline">
          Request a new reset link
        </Link>
      </div>
    )
  }

  return (
    <form action={formAction} className="mt-8 space-y-6">
      <input type="hidden" name="token" value={token} />

      <Field>
        <Label>New password</Label>
        <Input type="password" name="password" className="mt-1.5" minLength={8} required autoComplete="new-password" />
      </Field>

      <Field>
        <Label>Confirm new password</Label>
        <Input
          type="password"
          name="confirmPassword"
          className="mt-1.5"
          minLength={8}
          required
          autoComplete="new-password"
        />
      </Field>

      {state.error && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
      {state.success && (
        <div className="space-y-3">
          <p className="text-sm text-emerald-600 dark:text-emerald-400">{state.success}</p>
          <Link href="/?auth=login" className="text-sm font-medium underline">
            Sign in with your new password
          </Link>
        </div>
      )}

      <ButtonPrimary type="submit" disabled={isPending}>
        {isPending ? 'Updating…' : 'Update password'}
      </ButtonPrimary>
    </form>
  )
}
