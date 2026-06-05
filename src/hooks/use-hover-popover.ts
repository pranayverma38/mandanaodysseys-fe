'use client'

import { useHeaderHoverPopoverContext } from '@/components/header/header-hover-popover-group'
import { useCallback, useEffect, useRef } from 'react'

function isNode(value: EventTarget | null): value is Node {
  return value instanceof Node
}

export function useHoverPopover(popoverId?: string, closeDelay = 150) {
  const group = useHeaderHoverPopoverContext()
  const panelRef = useRef<HTMLElement | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearCloseTimeout = useCallback(() => {
    if (group) {
      group.clearCloseTimeout()
      return
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [group])

  const scheduleClose = useCallback(
    (close: () => void) => {
      clearCloseTimeout()

      const timer = setTimeout(() => {
        close()
        timeoutRef.current = null
      }, closeDelay)

      timeoutRef.current = timer
    },
    [clearCloseTimeout, closeDelay]
  )

  const shouldIgnoreLeave = useCallback(
    (relatedTarget: EventTarget | null) => {
      if (!group || !popoverId) {
        return false
      }

      return group.isInsideGroup(isNode(relatedTarget) ? relatedTarget : null)
    },
    [group, popoverId]
  )

  const registerPopover = useCallback(
    (close: () => void) => {
      if (!group || !popoverId) {
        return
      }

      group.register(popoverId, { close, panelRef })
    },
    [group, popoverId]
  )

  const unregisterPopover = useCallback(() => {
    if (!group || !popoverId) {
      return
    }

    group.unregister(popoverId)
  }, [group, popoverId])

  const getTriggerHandlers = useCallback(
    (open: boolean, close: () => void) => {
      registerPopover(close)

      return {
        onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
          clearCloseTimeout()

          if (group && popoverId) {
            group.closeOthers(popoverId)
          }

          if (!open) {
            event.currentTarget.click()
          }
        },
        onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
          if (shouldIgnoreLeave(event.relatedTarget)) {
            return
          }

          if (group && popoverId) {
            group.scheduleClose(popoverId, close)
            return
          }

          scheduleClose(close)
        },
      }
    },
    [clearCloseTimeout, group, popoverId, registerPopover, scheduleClose, shouldIgnoreLeave]
  )

  const getPanelHandlers = useCallback(
    (close: () => void) => {
      registerPopover(close)

      return {
        ref: panelRef,
        onMouseEnter: clearCloseTimeout,
        onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
          if (shouldIgnoreLeave(event.relatedTarget)) {
            return
          }

          if (group && popoverId) {
            group.scheduleClose(popoverId, close)
            return
          }

          scheduleClose(close)
        },
      }
    },
    [clearCloseTimeout, group, popoverId, registerPopover, scheduleClose, shouldIgnoreLeave]
  )

  useEffect(() => {
    return () => {
      unregisterPopover()
      clearCloseTimeout()
    }
  }, [clearCloseTimeout, unregisterPopover])

  return { getTriggerHandlers, getPanelHandlers, panelRef }
}
