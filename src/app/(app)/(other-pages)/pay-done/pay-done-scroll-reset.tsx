'use client'

import React from 'react'

export default function PayDoneScrollReset({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }, [])

  return <>{children}</>
}
