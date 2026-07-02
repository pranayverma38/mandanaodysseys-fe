import Link from 'next/link'
import { AUTH_SOCIALS } from './auth-socials'

export function AuthSocialButtons() {
  return (
    <div className="grid gap-3">
      {AUTH_SOCIALS.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="flex w-full rounded-lg bg-primary-foreground px-4 py-3 transition-transform hover:translate-y-0.5 dark:bg-neutral-800"
        >
          <item.icon className="size-5 shrink-0" />
          <p className="grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300">{item.name}</p>
        </Link>
      ))}
    </div>
  )
}
