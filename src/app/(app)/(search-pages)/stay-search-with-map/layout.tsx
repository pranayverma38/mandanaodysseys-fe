import { ApplicationLayout } from '@/app/application-layout'
import Header from '@/components/header/header'
import { ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <ApplicationLayout isStickyHeader header={<Header />}>
      {children}
    </ApplicationLayout>
  )
}

export default Layout
