'use client'

import {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react'

interface PopoverRegistration {
  close: () => void
  panelRef: RefObject<HTMLElement | null>
}

interface HeaderHoverPopoverContextValue {
  groupRef: RefObject<HTMLDivElement | null>
  register: (id: string, registration: PopoverRegistration) => void
  unregister: (id: string) => void
  isInsideGroup: (node: Node | null) => boolean
  clearCloseTimeout: () => void
  scheduleClose: (id: string, close: () => void) => void
  closeOthers: (activeId: string) => void
}

const HeaderHoverPopoverContext = createContext<HeaderHoverPopoverContextValue | null>(null)

export function useHeaderHoverPopoverContext() {
  return useContext(HeaderHoverPopoverContext)
}

interface GroupProps {
  children: ReactNode
  className?: string
}

export function HeaderHoverPopoverGroup({ children, className }: GroupProps) {
  const groupRef = useRef<HTMLDivElement>(null)
  const popoversRef = useRef<Map<string, PopoverRegistration>>(new Map())
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearCloseTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const register = useCallback((id: string, registration: PopoverRegistration) => {
    popoversRef.current.set(id, registration)
  }, [])

  const unregister = useCallback((id: string) => {
    popoversRef.current.delete(id)
  }, [])

  const isInsideGroup = useCallback((node: Node | null) => {
    if (!node || !(node instanceof Node)) {
      return false
    }

    if (groupRef.current?.contains(node)) {
      return true
    }

    for (const registration of popoversRef.current.values()) {
      if (registration.panelRef.current?.contains(node)) {
        return true
      }
    }

    return false
  }, [])

  const closeOthers = useCallback((activeId: string) => {
    for (const [id, registration] of popoversRef.current.entries()) {
      if (id !== activeId) {
        registration.close()
      }
    }
  }, [])

  const scheduleClose = useCallback(
    (id: string, close: () => void) => {
      clearCloseTimeout()
      timeoutRef.current = setTimeout(() => {
        close()
        timeoutRef.current = null
      }, 150)
    },
    [clearCloseTimeout]
  )

  const value = useMemo(
    () => ({
      groupRef,
      register,
      unregister,
      isInsideGroup,
      clearCloseTimeout,
      scheduleClose,
      closeOthers,
    }),
    [clearCloseTimeout, closeOthers, isInsideGroup, register, scheduleClose, unregister]
  )

  return (
    <HeaderHoverPopoverContext.Provider value={value}>
      <div ref={groupRef} className={className}>
        {children}
      </div>
    </HeaderHoverPopoverContext.Provider>
  )
}
