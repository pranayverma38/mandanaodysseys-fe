'use client'

import { AuthPanel } from '@/components/auth/auth-panel'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useAuthModal } from '@/providers/auth-modal-provider'
import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

function AuthDesktopDialog({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <Headless.Dialog open={open} onClose={onClose} className="relative z-[60]">
      <Headless.DialogBackdrop
        transition
        className="fixed inset-0 bg-zinc-950/50 transition duration-300 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in supports-backdrop-filter:backdrop-blur-xs dark:bg-zinc-950/70"
      />

      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
        <Headless.DialogPanel
          transition
          className={clsx(
            'w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-zinc-950/10 sm:p-8 dark:bg-neutral-900 dark:ring-white/10',
            'max-h-[min(90vh,720px)]',
            'transition duration-300 will-change-transform data-enter:ease-out data-leave:ease-in',
            'data-closed:translate-y-4 data-closed:opacity-0 data-enter:scale-100 data-closed:scale-95'
          )}
        >
          {children}
        </Headless.DialogPanel>
      </div>
    </Headless.Dialog>
  )
}

export function AuthModal() {
  const { isOpen, view, closeAuth, setView, setAuthenticated } = useAuthModal()
  const [mounted, setMounted] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)', { defaultValue: true })
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSuccess = () => {
    setAuthenticated(true)
    closeAuth()

    const redirectPath = searchParams.get('redirect')
    if (redirectPath) {
      router.replace(redirectPath)
    }
  }

  if (!mounted || !isOpen) {
    return null
  }

  const panel = (
    <AuthPanel view={view} variant="modal" onSwitchView={setView} onSuccess={handleSuccess} showLogo />
  )

  if (isDesktop) {
    return (
      <AuthDesktopDialog open={isOpen} onClose={closeAuth}>
        {panel}
      </AuthDesktopDialog>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && closeAuth()} direction="bottom">
      <DrawerContent className="max-h-[92vh] px-2 pb-6">
        <div className="overflow-y-auto px-4 pb-2">{panel}</div>
      </DrawerContent>
    </Drawer>
  )
}
