'use client'

import { useLocale } from '@/providers/locale-provider'
import clsx from 'clsx'
import { FC, ReactNode } from 'react'

interface Props {
  value: string | number
  className?: string
  children?: ReactNode
  /** Store prices from Medusa are AUD. Pass USD only for leftover template data. */
  baseCurrency?: 'USD' | 'AUD'
}

const FormattedPrice: FC<Props> = ({ value, className, children, baseCurrency = 'AUD' }) => {
  const { formatPrice, formatAudPrice, currency } = useLocale()
  const formatter = baseCurrency === 'AUD' ? formatAudPrice : formatPrice

  return (
    <span key={currency} className={clsx('notranslate', className)} suppressHydrationWarning>
      {children ?? formatter(value)}
    </span>
  )
}

export default FormattedPrice
