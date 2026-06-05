import type { LanguageCode } from '@/lib/locale/constants'

const GOOGLE_TRANSLATE_SCRIPT_ID = 'google-translate-script'
const GOOGLE_TRANSLATE_ELEMENT_ID = 'google_translate_element'

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string
            includedLanguages: string
            autoDisplay: boolean
          },
          elementId: string
        ) => void
      }
    }
  }
}

export function applyGoogleTranslateCookie(language: LanguageCode) {
  const hostname = window.location.hostname
  const clearCookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

  document.cookie = clearCookie

  if (hostname !== 'localhost') {
    document.cookie = `${clearCookie} domain=.${hostname};`
  }

  if (language === 'en') {
    return
  }

  const value = `/en/${language}`
  document.cookie = `googtrans=${value}; path=/;`

  if (hostname !== 'localhost') {
    document.cookie = `googtrans=${value}; path=/; domain=.${hostname};`
  }
}

export function initGoogleTranslate(onReady?: () => void) {
  if (document.getElementById(GOOGLE_TRANSLATE_ELEMENT_ID)) {
    onReady?.()
    return
  }

  const container = document.createElement('div')
  container.id = GOOGLE_TRANSLATE_ELEMENT_ID
  container.className = 'hidden'
  document.body.appendChild(container)

  window.googleTranslateElementInit = () => {
    new window.google!.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,fr,de,it',
        autoDisplay: false,
      },
      GOOGLE_TRANSLATE_ELEMENT_ID
    )
    onReady?.()
  }

  if (document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) {
    return
  }

  const script = document.createElement('script')
  script.id = GOOGLE_TRANSLATE_SCRIPT_ID
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  script.async = true
  document.body.appendChild(script)
}

export function triggerGoogleTranslate(language: LanguageCode) {
  const select = document.querySelector<HTMLSelectElement>('.goog-te-combo')

  if (!select) {
    return false
  }

  select.value = language
  select.dispatchEvent(new Event('change'))
  return true
}
