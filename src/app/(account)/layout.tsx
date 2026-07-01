import Header from '@/components/header/header'
import React, { FC } from 'react'
import { ApplicationLayout } from '../application-layout'

interface Props {
  children?: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <ApplicationLayout header={<Header />}>
      <div className="bg-neutral-50 dark:bg-neutral-950">
        <div className="container pt-10 pb-24 sm:pt-12 lg:pb-32">{children}</div>
      </div>
    </ApplicationLayout>
  )
}

export default Layout
