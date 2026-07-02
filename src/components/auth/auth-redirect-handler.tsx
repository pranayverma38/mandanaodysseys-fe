'use client'

import { useAuthModal } from '@/providers/auth-modal-provider'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function AuthRedirectHandler() {
  const searchParams = useSearchParams()
  const { openAuth, isLoading } = useAuthModal()

  useEffect(() => {
    if (isLoading) {
      return
    }

    const authView = searchParams.get('auth')

    if (authView === 'login' || authView === 'signup' || authView === 'forgot-password') {
      openAuth(authView)
    }
  }, [isLoading, openAuth, searchParams])

  return null
}
