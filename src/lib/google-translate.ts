import type { LanguageCode } from '@/lib/locale/constants'

const GOOGLE_TRANSLATE_SCRIPT_ID = 'google-translate-script'
const GOOGLE_TRANSLATE_ELEMENT_ID = 'google_translate_element'
const COMBO_POLL_INTERVAL_MS = 50
const COMBO_POLL_TIMEOUT_MS = 5000
const RESET_BEFORE_SWITCH_MS = 500

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

function isIpOrLocalHost(hostname: string) {
  return (
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    hostname === '127.0.0.1' ||
    /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)
  )
}

/**
 * Google Translate writes `googtrans` on the host, the dotted host, and the
 * parent registrable domain (e.g. `.mandanaodysseys.com` for
 * `site.mandanaodysseys.com`). All of those have to be expired or the widget
 * keeps the previous language after reload.
 */
function getGoogTransDomains(): Array<string | undefined> {
  const hostname = window.location.hostname
  const domains: Array<string | undefined> = [undefined, hostname]

  if (isIpOrLocalHost(hostname)) {
    return domains
  }

  const parts = hostname.split('.')
  for (let i = 0; i < parts.length - 1; i += 1) {
    const domain = parts.slice(i).join('.')
    domains.push(domain, `.${domain}`)
  }

  return [...new Set(domains)]
}

function expireGoogTransCookie(domain?: string) {
  const domainPart = domain ? ` domain=${domain};` : ''
  const paths = ['/', window.location.pathname]
  const extras = ['', ' Secure;', ' SameSite=Lax;', ' SameSite=None; Secure;']

  for (const path of paths) {
    for (const extra of extras) {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=${path};${domainPart}${extra}`
    }
  }
}

function clearGoogTransHash() {
  if (!window.location.hash.toLowerCase().includes('googtrans')) {
    return
  }

  history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
}

export function applyGoogleTranslateCookie(language: LanguageCode) {
  for (const domain of getGoogTransDomains()) {
    expireGoogTransCookie(domain)
  }

  clearGoogTransHash()

  if (language === 'en') {
    return
  }

  // Host-only cookie. Setting it on the parent domain is what made later
  // language changes stick on the first translated language in production.
  document.cookie = `googtrans=/en/${language}; path=/;`
}

function getTranslateSelect() {
  return document.querySelector<HTMLSelectElement>('.goog-te-combo')
}

function comboValueFor(language: LanguageCode) {
  // The widget's original-language option is "" ("Select Language"), not "en".
  return language === 'en' ? '' : language
}

function dispatchTranslateChange(select: HTMLSelectElement, language: LanguageCode) {
  select.value = comboValueFor(language)
  select.dispatchEvent(new Event('change', { bubbles: true }))
}

function whenTranslateSelectReady(onReady: (select: HTMLSelectElement | null) => void) {
  const startedAt = Date.now()

  const poll = () => {
    const select = getTranslateSelect()

    if (select || Date.now() - startedAt >= COMBO_POLL_TIMEOUT_MS) {
      onReady(select)
      return
    }

    window.setTimeout(poll, COMBO_POLL_INTERVAL_MS)
  }

  poll()
}

export function triggerGoogleTranslate(language: LanguageCode) {
  const select = getTranslateSelect()

  if (!select) {
    return false
  }

  const target = comboValueFor(language)

  if (select.value === target) {
    return true
  }

  // The widget cannot jump from one non-English language to another. Reset to
  // the original page language first, then apply the new target.
  if (select.value && target) {
    dispatchTranslateChange(select, 'en')
    window.setTimeout(() => {
      const nextSelect = getTranslateSelect()
      if (nextSelect) {
        dispatchTranslateChange(nextSelect, language)
      }
    }, RESET_BEFORE_SWITCH_MS)
    return true
  }

  dispatchTranslateChange(select, language)
  return true
}

export function initGoogleTranslate(onReady?: () => void) {
  const notifyReady = () => {
    whenTranslateSelectReady(() => {
      onReady?.()
    })
  }

  if (getTranslateSelect() || (document.getElementById(GOOGLE_TRANSLATE_ELEMENT_ID) && window.google?.translate)) {
    notifyReady()
    return
  }

  if (!document.getElementById(GOOGLE_TRANSLATE_ELEMENT_ID)) {
    const container = document.createElement('div')
    container.id = GOOGLE_TRANSLATE_ELEMENT_ID
    container.className = 'hidden'
    document.body.appendChild(container)
  }

  if (!window.googleTranslateElementInit) {
    window.googleTranslateElementInit = () => {
      new window.google!.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,fr,de,it',
          autoDisplay: false,
        },
        GOOGLE_TRANSLATE_ELEMENT_ID
      )
      notifyReady()
    }
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
