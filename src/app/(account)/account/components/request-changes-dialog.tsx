'use client'

import { Dialog, DialogBody, DialogTitle } from '@/components/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { SUPPORT_EMAIL, SUPPORT_PHONE, SUPPORT_PHONE_HREF } from '@/data/contact'
import { useMedia } from 'react-use'

interface Props {
  open: boolean
  onClose: () => void
}

function ContactMessage() {
  return (
    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
      Contact{' '}
      <a
        href={`mailto:${SUPPORT_EMAIL}`}
        className="font-medium text-[#fc6200] underline-offset-2 hover:underline"
      >
        {SUPPORT_EMAIL}
      </a>
      ,{' '}
      <a href={SUPPORT_PHONE_HREF} className="font-medium text-[#fc6200] underline-offset-2 hover:underline">
        {SUPPORT_PHONE}
      </a>{' '}
      to request changes.
    </p>
  )
}

export function RequestChangesDialog({ open, onClose }: Props) {
  const isMobile = useMedia('(max-width: 767px)', false)

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={(next) => !next && onClose()}>
        <DrawerContent className="px-6 pb-8">
          <DrawerHeader className="px-0 text-left">
            <DrawerTitle className="text-lg font-semibold">Request changes</DrawerTitle>
            <DrawerDescription asChild>
              <ContactMessage />
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onClose={onClose} size="sm">
      <DialogTitle>Request changes</DialogTitle>
      <DialogBody>
        <ContactMessage />
      </DialogBody>
    </Dialog>
  )
}
