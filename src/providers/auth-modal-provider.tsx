'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getSessionCustomer, logoutAction } from '@/lib/auth/actions'

export type AuthView = 'login' | 'signup' | 'forgot-password'

export type SessionCustomer = {
  id: string
  email: string
  fullName: string
  wishlistHandles: string[]
}

interface AuthModalContextValue {
  isAuthenticated: boolean
  isLoading: boolean
  customer: SessionCustomer | null
  isOpen: boolean
  view: AuthView
  openAuth: (view?: AuthView) => void
  closeAuth: () => void
  setView: (view: AuthView) => void
  refreshSession: () => Promise<void>
  logout: () => Promise<void>
  setAuthenticated: (value: boolean) => void
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null)

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<SessionCustomer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState<AuthView>('login')

  const refreshSession = useCallback(async () => {
    const session = await getSessionCustomer()
    setCustomer(session)
  }, [])

  useEffect(() => {
    refreshSession().finally(() => setIsLoading(false))
  }, [refreshSession])

  const openAuth = useCallback((nextView: AuthView = 'login') => {
    setView(nextView)
    setIsOpen(true)
  }, [])

  const closeAuth = useCallback(() => {
    setIsOpen(false)
  }, [])

  const logout = useCallback(async () => {
    await logoutAction()
    setCustomer(null)
  }, [])

  const setAuthenticated = useCallback(
    (value: boolean) => {
      if (value) {
        void refreshSession()
        return
      }

      setCustomer(null)
    },
    [refreshSession]
  )

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(customer),
      isLoading,
      customer,
      isOpen,
      view,
      openAuth,
      closeAuth,
      setView,
      refreshSession,
      logout,
      setAuthenticated,
    }),
    [customer, isLoading, isOpen, view, openAuth, closeAuth, refreshSession, logout, setAuthenticated]
  )

  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>
}

export function useAuthModal() {
  const context = useContext(AuthModalContext)

  if (!context) {
    throw new Error('useAuthModal must be used within AuthModalProvider')
  }

  return context
}
