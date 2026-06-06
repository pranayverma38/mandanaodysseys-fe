import type { CurrencyCode } from '@/lib/locale/constants'

export type ExchangeRates = Partial<Record<CurrencyCode, number>>

const USD_PRICE_PATTERN = /(?:US\$|\$)\s*([\d,]+(?:\.\d+)?)/g

export function parseUsdAmount(value: string | number): number | null {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null
  }

  const cleaned = value.replace(/,/g, '')
  const match = cleaned.match(/(?:US\$|\$)\s*([\d.]+)/i) ?? cleaned.match(/([\d.]+)/)

  if (!match) {
    return null
  }

  const amount = parseFloat(match[1])
  return Number.isFinite(amount) ? amount : null
}

export async function fetchExchangeRates(): Promise<ExchangeRates> {
  const response = await fetch('/api/exchange-rates')

  if (!response.ok) {
    throw new Error('Failed to fetch exchange rates')
  }

  const data = (await response.json()) as ExchangeRates
  return { USD: 1, ...data }
}

export function formatUsdPrice(
  value: string | number,
  currency: CurrencyCode,
  rates: ExchangeRates
): string {
  const amount = parseUsdAmount(value)

  if (amount === null) {
    return typeof value === 'string' ? value : String(value)
  }

  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const rate = rates[currency]

  if (!rate) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount * rate)
}

export function convertUsdAmount(
  amount: number,
  currency: CurrencyCode,
  rates: ExchangeRates
): number {
  if (currency === 'USD') {
    return amount
  }

  const rate = rates[currency]
  return rate ? amount * rate : amount
}

export function formatUsdPriceInText(
  text: string,
  currency: CurrencyCode,
  rates: ExchangeRates
): string {
  return text.replace(USD_PRICE_PATTERN, (match) => formatUsdPrice(match, currency, rates))
}
