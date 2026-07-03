import { getStripeServer } from '@/lib/stripe/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/stripe/domain-status?host=site.mandanaodysseys.com
 * Debug helper — lists Stripe payment method domain status for the given host.
 */
export async function GET(request: NextRequest) {
  try {
    const host = request.nextUrl.searchParams.get('host')

    if (!host) {
      return NextResponse.json({ error: 'Missing host query param' }, { status: 400 })
    }

    const stripe = getStripeServer()
    const domains = await stripe.paymentMethodDomains.list({ limit: 100 })
    const match = domains.data.find((d) => d.domain_name === host)

    if (!match) {
      return NextResponse.json({
        registered: false,
        host,
        hint: 'Add this exact hostname in Stripe Dashboard → Settings → Payment method domains (same Test/Live mode as your API keys).',
        allDomains: domains.data.map((d) => d.domain_name),
      })
    }

    return NextResponse.json({
      registered: true,
      host,
      enabled: match.enabled,
      applePay: match.apple_pay,
      googlePay: match.google_pay,
      link: match.link,
      livemode: match.livemode,
      hint: match.livemode
        ? 'Domain is registered in LIVE mode. Use pk_live_/sk_live_ keys.'
        : 'Domain is registered in TEST mode. Use pk_test_/sk_test_ keys.',
    })
  } catch (error) {
    console.error('[stripe/domain-status]', error)
    return NextResponse.json({ error: 'Failed to fetch domain status' }, { status: 500 })
  }
}
