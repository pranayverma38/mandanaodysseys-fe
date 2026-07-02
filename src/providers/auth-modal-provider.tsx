'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

export type AuthView = 'login' | 'signup' | 'forgot-password'

interface AuthModalContextValue {
  isAuthenticated: boolean
  isOpen: boolean
  view: AuthView
  openAuth: (view?: AuthView) => void
  closeAuth: () => void
  setView: (view: AuthView) => void
  setAuthenticated: (value: boolean) => void
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null)

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState<AuthView>('login')

  const openAuth = useCallback((nextView: AuthView = 'login') => {
    setView(nextView)
    setIsOpen(true)
  }, [])

  const closeAuth = useCallback(() => {
    setIsOpen(false)
  }, [])

  const setAuthenticated = useCallback((value: boolean) => {
    setIsAuthenticated(value)
  }, [])

  const value = useMemo(
    () => ({
      isAuthenticated,
      isOpen,
      view,
      openAuth,
      closeAuth,
      setView,
      setAuthenticated,
    }),
    [isAuthenticated, isOpen, view, openAuth, closeAuth, setAuthenticated]
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
