export const DEFAULT_PHONE_COUNTRY_CODE = '+61'

export const PHONE_COUNTRY_OPTIONS = [
  { code: '+61', label: '+61 AU', country: 'Australia' },
  { code: '+91', label: '+91 IN', country: 'India' },
  { code: '+1', label: '+1 US', country: 'USA' },
  { code: '+39', label: '+39 IT', country: 'Italy' },
  { code: '+49', label: '+49 DE', country: 'Germany' },
  { code: '+94', label: '+94 LK', country: 'Sri Lanka' },
  { code: '+977', label: '+977 NP', country: 'Nepal' },
  { code: '+66', label: '+66 TH', country: 'Thailand' },
] as const

const COUNTRY_CODES = PHONE_COUNTRY_OPTIONS.map((option) => option.code)

export function splitPhone(phone: string) {
  const trimmed = phone.trim()

  if (!trimmed) {
    return { countryCode: DEFAULT_PHONE_COUNTRY_CODE, localNumber: '' }
  }

  for (const code of [...COUNTRY_CODES].sort((a, b) => b.length - a.length)) {
    if (trimmed.startsWith(code)) {
      return {
        countryCode: code,
        localNumber: trimmed.slice(code.length).replace(/\D/g, ''),
      }
    }
  }

  const digits = trimmed.replace(/\D/g, '')

  if (digits.startsWith('61') && digits.length > 2) {
    return {
      countryCode: DEFAULT_PHONE_COUNTRY_CODE,
      localNumber: digits.slice(2),
    }
  }

  return {
    countryCode: DEFAULT_PHONE_COUNTRY_CODE,
    localNumber: digits.startsWith('0') ? digits.slice(1) : digits,
  }
}

export function normalizePhone(countryCode: string, localNumber: string) {
  const code = countryCode.trim().startsWith('+') ? countryCode.trim() : `+${countryCode.trim()}`
  const digits = localNumber.replace(/\D/g, '')
  const local = digits.startsWith('0') ? digits.slice(1) : digits

  if (!local) {
    return ''
  }

  return `${code}${local}`
}

export function parsePhoneFromFormData(formData: FormData, options: { required?: boolean } = {}) {
  const countryCode = String(formData.get('phoneCountryCode') ?? DEFAULT_PHONE_COUNTRY_CODE).trim()
  const localNumber = String(formData.get('phoneNumber') ?? '').trim()
  const phone = normalizePhone(countryCode, localNumber)

  if (options.required && !phone) {
    return { error: 'Phone number is required.' as const, phone: '' }
  }

  if (phone && localNumber.replace(/\D/g, '').length < 8) {
    return { error: 'Enter a valid phone number.' as const, phone: '' }
  }

  return { phone: phone || undefined }
}
