import { NextResponse } from 'next/server'

const FRANKFURTER_URL = 'https://api.frankfurter.dev/v1/latest?from=USD&to=AUD,INR'

export async function GET() {
  try {
    const response = await fetch(FRANKFURTER_URL, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates')
    }

    const data = (await response.json()) as { rates?: Record<string, number> }

    return NextResponse.json(
      { USD: 1, ...data.rates },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    )
  } catch {
    return NextResponse.json({ USD: 1 }, { status: 502 })
  }
}
