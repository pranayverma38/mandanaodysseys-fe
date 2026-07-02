'use client'

import Logo from '@/components/logo'
import type { AuthView } from '@/providers/auth-modal-provider'
import { ForgotPasswordForm } from './forgot-password-form'
import { LoginForm } from './login-form'
import { SignupForm } from './signup-form'

interface Props {
  view: AuthView
  variant?: 'page' | 'modal'
  onSwitchView?: (view: AuthView) => void
  onSuccess?: () => void
  showLogo?: boolean
}

export function AuthPanel({ view, variant = 'modal', onSwitchView, onSuccess, showLogo = true }: Props) {
  return (
    <div className={variant === 'page' ? 'container' : undefined}>
      {showLogo && (
        <div className={variant === 'page' ? 'my-16 flex justify-center' : 'mb-8 flex justify-center pt-2'}>
          <Logo variant="full-colored" size={variant === 'page' ? 'lg' : 'default'} />
        </div>
      )}

      <div className="mx-auto max-w-md">
        {view === 'login' && <LoginForm onSwitchView={onSwitchView} onSuccess={onSuccess} />}
        {view === 'signup' && <SignupForm onSwitchView={onSwitchView} onSuccess={onSuccess} />}
        {view === 'forgot-password' && <ForgotPasswordForm onSwitchView={onSwitchView} />}
      </div>
    </div>
  )
}
