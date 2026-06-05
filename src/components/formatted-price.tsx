'use client'

import { useLocale } from '@/providers/locale-provider'
import clsx from 'clsx'
import { FC, ReactNode } from 'react'

interface Props {
  value: string | number
  className?: string
  children?: ReactNode
}

const FormattedPrice: FC<Props> = ({ value, className, children }) => {
  const { formatPrice } = useLocale()

  return <span className={clsx('notranslate', className)}>{children ?? formatPrice(value)}</span>
}

export default FormattedPrice
