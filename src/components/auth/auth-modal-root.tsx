'use client'

import { AuthModalProvider } from '@/providers/auth-modal-provider'
import { WishlistProvider } from '@/providers/wishlist-provider'
import { Suspense } from 'react'
import { AuthModal } from './auth-modal'
import { AuthRedirectHandler } from './auth-redirect-handler'

export function AuthModalRoot({ children }: { children: React.ReactNode }) {
  return (
    <AuthModalProvider>
      <WishlistProvider>
        <Suspense fallback={null}>
          <AuthRedirectHandler />
        </Suspense>
        {children}
        <Suspense fallback={null}>
          <AuthModal />
        </Suspense>
      </WishlistProvider>
    </AuthModalProvider>
  )
}
