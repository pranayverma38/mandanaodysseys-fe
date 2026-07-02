'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { toggleWishlistAction } from '@/lib/auth/actions'
import { useAuthModal } from '@/providers/auth-modal-provider'

interface WishlistContextValue {
  handles: string[]
  isLoaded: boolean
  isWishlisted: (packageHandle: string) => boolean
  toggleWishlist: (packageHandle: string) => Promise<void>
  setHandles: (handles: string[]) => void
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { customer, isAuthenticated, openAuth, refreshSession } = useAuthModal()
  const [handles, setHandles] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      setHandles([])
      setIsLoaded(true)
      return
    }

    setHandles(customer?.wishlistHandles ?? [])
    setIsLoaded(true)
  }, [customer, isAuthenticated])

  const isWishlisted = useCallback((packageHandle: string) => handles.includes(packageHandle), [handles])

  const toggleWishlist = useCallback(
    async (packageHandle: string) => {
      if (!isAuthenticated) {
        openAuth('login')
        return
      }

      const previousHandles = handles
      const optimisticHandles = previousHandles.includes(packageHandle)
        ? previousHandles.filter((handle) => handle !== packageHandle)
        : [...previousHandles, packageHandle]

      setHandles(optimisticHandles)

      const result = await toggleWishlistAction(packageHandle)

      if (result.error === 'AUTH_REQUIRED') {
        setHandles(previousHandles)
        openAuth('login')
        return
      }

      if (result.error || !result.handles) {
        setHandles(previousHandles)
        return
      }

      setHandles(result.handles)
      await refreshSession()
    },
    [handles, isAuthenticated, openAuth, refreshSession]
  )

  const value = useMemo(
    () => ({
      handles,
      isLoaded,
      isWishlisted,
      toggleWishlist,
      setHandles,
    }),
    [handles, isLoaded, isWishlisted, toggleWishlist]
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)

  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }

  return context
}
