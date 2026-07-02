'use client'

import { AuthModalProvider } from '@/providers/auth-modal-provider'
import { AuthModal } from './auth-modal'

export function AuthModalRoot({ children }: { children: React.ReactNode }) {
  return (
    <AuthModalProvider>
      {children}
      <AuthModal />
    </AuthModalProvider>
  )
}
