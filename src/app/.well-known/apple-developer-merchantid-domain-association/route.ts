import { readFile } from 'fs/promises'
import { join } from 'path'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

/**
 * Apple Pay requires this file at:
 * https://your-domain/.well-known/apple-developer-merchantid-domain-association
 *
 * Download it from Stripe Dashboard → Settings → Payment method domains → your domain.
 * Place the file in `public/.well-known/` OR set STRIPE_APPLE_PAY_DOMAIN_ASSOCIATION in env.
 */
export async function GET() {
  const fromEnv = process.env.STRIPE_APPLE_PAY_DOMAIN_ASSOCIATION

  if (fromEnv) {
    return new NextResponse(fromEnv, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  try {
    const content = await readFile(
      join(process.cwd(), 'public/.well-known/apple-developer-merchantid-domain-association'),
      'utf-8'
    )

    return new NextResponse(content, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch {
    return new NextResponse('Apple Pay domain file is not configured', { status: 404 })
  }
}
