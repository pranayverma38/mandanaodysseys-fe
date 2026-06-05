import type { CurrencyCode } from '@/lib/locale/constants'

export type ExchangeRates = Partial<Record<CurrencyCode, number>>

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
  const response = await fetch('https://api.frankfurter.app/latest?from=USD&to=AUD,INR')

  if (!response.ok) {
    throw new Error('Failed to fetch exchange rates')
  }

  const data = (await response.json()) as { rates?: ExchangeRates }
  return { USD: 1, ...data.rates }
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
    maximumFractionDigits: currency === 'INR' ? 0 : 0,
  }).format(amount * rate)
}
