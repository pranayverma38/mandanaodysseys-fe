'use client'

import { ExchangeRates, fetchExchangeRates, formatAudPrice, formatUsdPrice } from '@/lib/currency'
import {
  applyGoogleTranslateCookie,
  initGoogleTranslate,
  triggerGoogleTranslate,
} from '@/lib/google-translate'
import {
  CURRENCY_STORAGE_KEY,
  CurrencyCode,
  DEFAULT_CURRENCY,
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  LanguageCode,
} from '@/lib/locale/constants'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface LocaleContextValue {
  language: LanguageCode
  currency: CurrencyCode
  rates: ExchangeRates
  ratesLoading: boolean
  setLanguage: (language: LanguageCode) => void
  setCurrency: (currency: CurrencyCode) => void
  formatPrice: (value: string | number) => string
  formatAudPrice: (value: string | number) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function readStoredLanguage(): LanguageCode {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE
  }

  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)

  if (stored === 'en' || stored === 'fr' || stored === 'de' || stored === 'it') {
    return stored
  }

  return DEFAULT_LANGUAGE
}

function readStoredCurrency(): CurrencyCode {
  if (typeof window === 'undefined') {
    return DEFAULT_CURRENCY
  }

  const stored = localStorage.getItem(CURRENCY_STORAGE_KEY)

  if (stored === 'USD' || stored === 'AUD' || stored === 'INR') {
    return stored
  }

  return DEFAULT_CURRENCY
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(DEFAULT_LANGUAGE)
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY)
  const [rates, setRates] = useState<ExchangeRates>({ USD: 1 })
  const [ratesLoading, setRatesLoading] = useState(true)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const storedLanguage = readStoredLanguage()
    const storedCurrency = readStoredCurrency()

    setLanguageState(storedLanguage)
    setCurrencyState(storedCurrency)
    applyGoogleTranslateCookie(storedLanguage)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) {
      return
    }

    let cancelled = false

    const loadRates = async () => {
      setRatesLoading(true)

      try {
        const nextRates = await fetchExchangeRates()

        if (!cancelled) {
          setRates(nextRates)
        }
      } catch {
        if (!cancelled) {
          setRates({ USD: 1 })
        }
      } finally {
        if (!cancelled) {
          setRatesLoading(false)
        }
      }
    }

    loadRates()
    const interval = window.setInterval(loadRates, 60 * 60 * 1000)

    return () => {
      cancelled = true
      window.clearInterval(interval)
    }
  }, [hydrated])

  useEffect(() => {
    if (!hydrated) {
      return
    }

    initGoogleTranslate(() => {
      if (language !== DEFAULT_LANGUAGE) {
        triggerGoogleTranslate(language)
      }
    })
  }, [hydrated, language])

  const setLanguage = useCallback((nextLanguage: LanguageCode) => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
    applyGoogleTranslateCookie(nextLanguage)
    window.location.reload()
  }, [])

  const setCurrency = useCallback((nextCurrency: CurrencyCode) => {
    localStorage.setItem(CURRENCY_STORAGE_KEY, nextCurrency)
    setCurrencyState(nextCurrency)
  }, [])

  const formatPrice = useCallback(
    (value: string | number) => formatUsdPrice(value, currency, rates),
    [currency, rates]
  )

  const formatAudPriceValue = useCallback(
    (value: string | number) => formatAudPrice(value, currency, rates),
    [currency, rates]
  )

  const value = useMemo(
    () => ({
      language,
      currency,
      rates,
      ratesLoading,
      setLanguage,
      setCurrency,
      formatPrice,
      formatAudPrice: formatAudPriceValue,
    }),
    [currency, formatAudPriceValue, formatPrice, language, rates, ratesLoading, setCurrency, setLanguage]
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }

  return context
}
