import { redirect } from 'next/navigation'

export default function AccountPasswordRedirect() {
  redirect('/account?tab=password')
}
