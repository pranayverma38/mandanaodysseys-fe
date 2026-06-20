'use client'

import clsx from 'clsx'
import { ExperiencesSearchForm } from './experiences-search-form'

const HeroSearchFormMinimal = ({ className }: { className?: string }) => {
  return (
    <div className={clsx('hero-search-form hero-search-form--minimal w-full', className)}>
      <ExperiencesSearchForm formStyle="minimal" />
    </div>
  )
}

export default HeroSearchFormMinimal
