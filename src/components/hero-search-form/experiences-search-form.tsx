'use client'

import { buildExperienceSearchUrl } from '@/data/itineraries/search'
import clsx from 'clsx'
import Form from 'next/form'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ButtonSubmit, DateRangeField, GuestNumberField, LocationInputField, VerticalDividerLine } from './ui'

interface Props {
  className?: string
  formStyle: 'default' | 'small' | 'minimal'
}

export const ExperiencesSearchForm = ({ className, formStyle = 'default' }: Props) => {
  const router = useRouter()

  // Prefetch the stay categories page to improve performance
  useEffect(() => {
    router.prefetch('/experience-search')
  }, [router])

  const handleFormSubmit = (formData: FormData) => {
    const location = formData.get('location')?.toString() ?? ''
    router.push(buildExperienceSearchUrl({ location }))
  }

  const isMinimal = formStyle === 'minimal'

  return (
    <Form
      className={clsx(
        isMinimal
          ? 'hero-search-form__form relative z-10 mx-auto flex h-12 w-full max-w-3xl items-stretch gap-0.5 rounded-full border border-white/30 bg-black/35 p-1 shadow-none backdrop-blur-md [--form-bg:transparent]'
          : 'relative z-10 flex w-full rounded-full shadow-lg-for-card bg-white [--form-bg:var(--color-white)] dark:bg-neutral-800 dark:[--form-bg:var(--color-neutral-800)]',
        className
      )}
      action={handleFormSubmit}
    >
      <LocationInputField
        className={clsx(
          'hero-search-form__field-after',
          isMinimal ? 'min-w-0 flex-[1.15]' : 'flex-5/12'
        )}
        fieldStyle={formStyle}
        minimalSegment={isMinimal ? 'first' : undefined}
        placeholder={isMinimal ? 'Where are you going?' : undefined}
      />
      <VerticalDividerLine className={isMinimal ? 'h-5 border-white/25' : undefined} />
      <DateRangeField
        className={clsx(
          'hero-search-form__field-before hero-search-form__field-after',
          isMinimal ? 'min-w-0 flex-1' : 'flex-4/12'
        )}
        fieldStyle={formStyle}
        minimalSegment={isMinimal ? 'middle' : undefined}
        description={isMinimal ? undefined : 'Date range'}
      />
      <VerticalDividerLine className={isMinimal ? 'h-5 border-white/25' : undefined} />
      <GuestNumberField
        className={clsx('hero-search-form__field-before', isMinimal ? 'min-w-0 flex-1' : 'flex-4/12')}
        clearDataButtonClassName={clsx(
          formStyle === 'small' && 'sm:end-18',
          formStyle === 'default' && 'sm:end-22'
        )}
        fieldStyle={formStyle}
        minimalSegment={isMinimal ? 'last' : undefined}
      />

      <ButtonSubmit fieldStyle={formStyle} className="z-10" />
    </Form>
  )
}
