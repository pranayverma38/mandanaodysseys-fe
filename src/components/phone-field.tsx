import { Field, Label } from '@/components/fieldset'
import Input from '@/components/input'
import { DEFAULT_PHONE_COUNTRY_CODE, PHONE_COUNTRY_OPTIONS, splitPhone } from '@/lib/phone'

interface Props {
  defaultPhone?: string
  required?: boolean
  className?: string
}

export function PhoneField({ defaultPhone = '', required = false, className }: Props) {
  const { countryCode, localNumber } = splitPhone(defaultPhone)

  return (
    <Field className={className ?? 'block'}>
      <Label className="text-neutral-800 dark:text-neutral-200">Phone number</Label>
      <div className="mt-1 flex gap-2">
        <select
          name="phoneCountryCode"
          defaultValue={countryCode || DEFAULT_PHONE_COUNTRY_CODE}
          className="h-11 shrink-0 rounded-full border border-input bg-card px-3 text-sm font-normal sm:text-sm"
          aria-label="Country code"
        >
          {PHONE_COUNTRY_OPTIONS.map((option) => (
            <option key={option.code} value={option.code}>
              {option.label}
            </option>
          ))}
        </select>
        <Input
          type="tel"
          name="phoneNumber"
          defaultValue={localNumber}
          placeholder="412 345 678"
          required={required}
          autoComplete="tel-national"
          className="min-w-0 flex-1"
          inputMode="tel"
        />
      </div>
    </Field>
  )
}
