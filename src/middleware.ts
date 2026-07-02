import { NextResponse, type NextRequest } from 'next/server'
import { AUTH_COOKIE_NAME } from '@/lib/medusa/config'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value

  const isProtectedAccountRoute =
    pathname === '/account' ||
    (pathname.startsWith('/account/') && !pathname.startsWith('/account/dummy'))

  if (isProtectedAccountRoute && !token) {
    const loginUrl = new URL('/', request.url)
    loginUrl.searchParams.set('auth', 'login')
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname + request.nextUrl.search)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/account', '/account/:path*'],
}
