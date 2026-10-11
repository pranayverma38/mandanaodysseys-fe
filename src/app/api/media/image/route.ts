import { NextRequest } from 'next/server'

const DEFAULT_THUMBNAIL_SIZE = 'w1600'

function getGoogleDriveFileId(url: URL): string | null {
  const pathMatch = url.pathname.match(/\/file\/d\/([^/]+)/i)
  if (pathMatch?.[1]) return pathMatch[1]

  return url.searchParams.get('id')
}

function decodeHtmlEntity(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function extractMetaContent(html: string, attribute: 'property' | 'name', key: string): string | null {
  const patterns = [
    new RegExp(
      `<meta[^>]*${attribute}=["']${key}["'][^>]*content=["']([^"']+)["'][^>]*>`,
      'i'
    ),
    new RegExp(
      `<meta[^>]*content=["']([^"']+)["'][^>]*${attribute}=["']${key}["'][^>]*>`,
      'i'
    ),
  ]

  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match?.[1]) {
      return decodeHtmlEntity(match[1])
    }
  }

  return null
}

async function resolvePinterestImageUrl(url: string): Promise<string> {
  const response = await fetch(url, {
    cache: 'no-store',
    headers: {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    },
  })

  if (!response.ok) {
    throw new Error('Unable to resolve Pinterest image.')
  }

  const contentType = response.headers.get('content-type') || ''
  if (contentType.startsWith('image/')) {
    return response.url
  }

  const html = await response.text()
  const resolvedImageUrl =
    extractMetaContent(html, 'property', 'og:image') ||
    extractMetaContent(html, 'name', 'twitter:image')

  if (!resolvedImageUrl) {
    throw new Error('Pinterest image metadata not found.')
  }

  return resolvedImageUrl
}

async function resolveUpstreamImageUrl(url: string): Promise<string> {
  const parsedUrl = new URL(url)
  const hostname = parsedUrl.hostname.toLowerCase()

  const googleDriveFileId = getGoogleDriveFileId(parsedUrl)
  if (googleDriveFileId && hostname.includes('drive.google.com')) {
    const thumbnailUrl = new URL('https://drive.google.com/thumbnail')
    thumbnailUrl.searchParams.set('id', googleDriveFileId)
    thumbnailUrl.searchParams.set('sz', DEFAULT_THUMBNAIL_SIZE)
    return thumbnailUrl.toString()
  }

  if (hostname === 'pin.it' || hostname.includes('pinterest.com')) {
    return resolvePinterestImageUrl(url)
  }

  return url
}

function buildImageResponseHeaders(upstreamHeaders: Headers): Headers {
  const headers = new Headers()

  for (const headerName of ['cache-control', 'content-length', 'content-type', 'etag', 'last-modified']) {
    const headerValue = upstreamHeaders.get(headerName)
    if (headerValue) {
      headers.set(headerName, headerValue)
    }
  }

  return headers
}

export async function GET(request: NextRequest) {
  const sourceUrl = request.nextUrl.searchParams.get('src')

  if (!sourceUrl) {
    return new Response('Missing image source.', { status: 400 })
  }

  let parsedUrl: URL

  try {
    parsedUrl = new URL(sourceUrl)
  } catch {
    return new Response('Invalid image source.', { status: 400 })
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    return new Response('Unsupported image source.', { status: 400 })
  }

  try {
    const upstreamImageUrl = await resolveUpstreamImageUrl(parsedUrl.toString())
    const upstreamResponse = await fetch(upstreamImageUrl, {
      cache: 'no-store',
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      },
    })

    if (!upstreamResponse.ok) {
      return new Response('Unable to load external image.', { status: upstreamResponse.status })
    }

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers: buildImageResponseHeaders(upstreamResponse.headers),
    })
  } catch {
    return new Response('Unable to resolve external image.', { status: 502 })
  }
}
