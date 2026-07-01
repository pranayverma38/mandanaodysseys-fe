import { redirect } from 'next/navigation'

export default function AccountSavelistsRedirect() {
  redirect('/account?tab=wishlist')
}
