'use client'

import { useLocale } from '@/providers/locale-provider'
import { formatAudPriceInText, formatUsdPriceInText } from '@/lib/currency'
import clsx from 'clsx'
import { FC, ReactNode } from 'react'

interface Props {
  text: string
  className?: string
  children?: ReactNode
  /** Store prices from Medusa are AUD. Pass USD only for leftover template data. */
  baseCurrency?: 'USD' | 'AUD'
}

const FormattedPriceText: FC<Props> = ({ text, className, children, baseCurrency = 'AUD' }) => {
  const { currency, rates } = useLocale()
  const formatter = baseCurrency === 'USD' ? formatUsdPriceInText : formatAudPriceInText

  return (
    <span key={currency} className={clsx('notranslate', className)} suppressHydrationWarning>
      {children ?? formatter(text, currency, rates)}
    </span>
  )
}

export default FormattedPriceText
