'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  filterKey: string
  children: ReactNode
  className?: string
}

export function FilterPanelTransition({ filterKey, children, className }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={filterKey}
        className={className}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export const filterPanelStaggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0 },
  },
}

export const filterPanelStaggerItem = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const },
  },
}
