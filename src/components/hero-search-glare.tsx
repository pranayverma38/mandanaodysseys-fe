import clsx from 'clsx'
import { ReactNode } from 'react'
import './hero-search-glare.css'

interface Props {
  children: ReactNode
  className?: string
  fitContent?: boolean
}

const HeroSearchGlare = ({ children, className, fitContent }: Props) => {
  return (
    <div className={clsx('hero-search-glare', fitContent && 'hero-search-glare--fit', className)}>
      <div className="hero-search-glare__content">{children}</div>
    </div>
  )
}

export default HeroSearchGlare
