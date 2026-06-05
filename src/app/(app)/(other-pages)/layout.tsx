import { ApplicationLayout } from '@/app/application-layout'
import Header from '@/components/header/header'

export default function Layout({ children, params }: { children: React.ReactNode; params: any }) {
  return <ApplicationLayout header={<Header hasBorderBottom={true} />}>{children}</ApplicationLayout>
}
