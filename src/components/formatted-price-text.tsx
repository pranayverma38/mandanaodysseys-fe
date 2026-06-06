'use client'

import { useLocale } from '@/providers/locale-provider'
import { formatUsdPriceInText } from '@/lib/currency'
import clsx from 'clsx'
import { FC, ReactNode } from 'react'

interface Props {
  text: string
  className?: string
  children?: ReactNode
}

const FormattedPriceText: FC<Props> = ({ text, className, children }) => {
  const { currency, rates } = useLocale()

  return (
    <span key={currency} className={clsx('notranslate', className)} suppressHydrationWarning>
      {children ?? formatUsdPriceInText(text, currency, rates)}
    </span>
  )
}

export default FormattedPriceText
