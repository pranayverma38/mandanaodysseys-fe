/**
 * Migrates all hardcoded itineraries from static TS data → Medusa admin API.
 * Run: npx tsx scripts/migrate-itineraries.mts
 */

import { ITINERARY_DETAILS } from '../src/data/itineraries/index.js'

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'https://api.mandanaodysseys.com'
const ADMIN_EMAIL = 'mandana@gmail.com'
const ADMIN_PASSWORD = 'mandana'

// ── helpers ──────────────────────────────────────────────────────────────────

function toApiPayload(it: (typeof ITINERARY_DETAILS)[number]) {
  const fallbackAvatarUrl = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'

  return {
    handle: it.handle,
    title: it.title,
    badge: it.badge ?? null,
    destination: it.destination,
    address: it.address,
    locations: it.locations.map((l) => ({ name: l.name, lat: l.lat, lng: l.lng })),
    review_start: it.reviewStart,
    review_count: it.reviewCount,
    categories: it.categories,
    duration: { days: it.duration.days, nights: it.duration.nights },
    mobility: it.mobility,
    featured_image: it.featuredImage,
    gallery_imgs: it.galleryImgs,
    // Strip the duration/mobility amenity rows that _shared.ts prepends on display
    amenities: it.amenities,
    pricing: {
      price: it.pricing.price,
      originalPrice: it.pricing.originalPrice,
      feeAndTaxes: it.pricing.feeAndTaxes,
      total: it.pricing.total,
      ...(it.pricing.priceLabel ? { priceLabel: it.pricing.priceLabel } : {}),
    },
    description: it.description,
    things_to_do: it.thingsToDo.map((t) => ({
      name: t.name,
      time: t.time,
      description: t.description,
      imageUrl: t.imageUrl,
      lat: t.lat,
      lng: t.lng,
    })),
    includes: it.includes,
    excludes: it.excludes,
    accommodations: it.accommodations.map((a) => ({
      name: a.name,
      imageUrl: a.imageUrl,
      rating: a.rating,
      location: a.location,
    })),
    map: { lat: it.map.lat, lng: it.map.lng },
    reviews: it.reviews.map((r) => ({
      id: r.id,
      title: r.title,
      rating: r.rating,
      content: r.content,
      author: r.author,
      date: r.date,
      datetime: r.datetime,
      // authorAvatar is StaticImageData in static data — extract .src, fallback to default
      authorAvatarUrl: (r.authorAvatar as any)?.src?.startsWith('http')
        ? (r.authorAvatar as any).src
        : fallbackAvatarUrl,
    })),
    is_active: true,
  }
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🚀 Migrating ${ITINERARY_DETAILS.length} itineraries → ${BACKEND_URL}\n`)

  // 1. Authenticate
  const authRes = await fetch(`${BACKEND_URL}/auth/user/emailpass`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  })
  const { token } = await authRes.json() as { token: string }
  if (!token) throw new Error('Auth failed — check credentials')
  console.log('✅ Authenticated\n')

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

  // 2. Fetch existing handles to skip duplicates
  const existing = await fetch(`${BACKEND_URL}/admin/itineraries?limit=200`, { headers })
    .then((r) => r.json()) as { itineraries: { handle: string }[] }
  const existingHandles = new Set((existing.itineraries ?? []).map((i) => i.handle))
  console.log(`Found ${existingHandles.size} existing itineraries in Medusa: ${[...existingHandles].join(', ') || 'none'}\n`)

  // 3. Create each itinerary
  let created = 0
  let skipped = 0
  let errors = 0

  for (const it of ITINERARY_DETAILS) {
    if (existingHandles.has(it.handle)) {
      console.log(`⏭  Skipping  ${it.handle} (already exists)`)
      skipped++
      continue
    }

    try {
      const payload = toApiPayload(it)
      const res = await fetch(`${BACKEND_URL}/admin/itineraries`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      })
      const data = await res.json() as { itinerary?: { id: string }; message?: string }

      if (data.itinerary?.id) {
        console.log(`✅ Created   ${it.handle}  (id: ${data.itinerary.id})`)
        created++
      } else {
        console.error(`❌ Failed    ${it.handle}: ${data.message ?? JSON.stringify(data)}`)
        errors++
      }
    } catch (err) {
      console.error(`❌ Error     ${it.handle}: ${(err as Error).message}`)
      errors++
    }
  }

  console.log(`\n──────────────────────────────────────`)
  console.log(`✅ Created:  ${created}`)
  console.log(`⏭  Skipped:  ${skipped}`)
  console.log(`❌ Errors:   ${errors}`)
  console.log(`──────────────────────────────────────\n`)

  if (errors > 0) process.exit(1)
}

main().catch((e) => { console.error(e); process.exit(1) })
