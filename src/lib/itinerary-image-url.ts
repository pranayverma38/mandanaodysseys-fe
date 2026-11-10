const GOOGLE_IMAGE_PROXY_PREFIX = '/api/media/image?src='

interface ResolveItineraryImageOptions {
  highRes?: boolean
}

function getGoogleDriveFileId(url: URL): string | null {
  const pathMatch = url.pathname.match(/\/file\/d\/([^/]+)/i)
  if (pathMatch?.[1]) return pathMatch[1]

  return url.searchParams.get('id')
}

function shouldProxyImageUrl(url: URL): boolean {
  const hostname = url.hostname.toLowerCase()

  return (
    hostname.includes('drive.google.com') ||
    hostname === 'lh3.googleusercontent.com' ||
    hostname.endsWith('.googleusercontent.com') ||
    hostname === 'pin.it' ||
    hostname.includes('pinterest.com') ||
    hostname.endsWith('.pinimg.com')
  )
}

function buildProxyImageUrl(sourceUrl: string, { highRes = false }: ResolveItineraryImageOptions = {}): string {
  return `${GOOGLE_IMAGE_PROXY_PREFIX}${encodeURIComponent(sourceUrl)}${highRes ? '&hd=1' : ''}`
}

function upgradeDirectImageUrl(url: URL): string {
  const upgradedUrl = new URL(url.toString())
  const hostname = upgradedUrl.hostname.toLowerCase()

  if (hostname === 'images.pexels.com') {
    upgradedUrl.searchParams.set('w', '2000')
    upgradedUrl.searchParams.set('dpr', '2')
    return upgradedUrl.toString()
  }

  if (hostname === 'images.unsplash.com') {
    upgradedUrl.searchParams.set('w', '2000')
    upgradedUrl.searchParams.set('q', '90')
    upgradedUrl.searchParams.set('dpr', '2')
    return upgradedUrl.toString()
  }

  return upgradedUrl.toString()
}

export function resolveItineraryImageUrl(
  url: string,
  { highRes = false }: ResolveItineraryImageOptions = {}
): string {
  const trimmedUrl = url.trim()

  if (!trimmedUrl || trimmedUrl.startsWith('/')) {
    return trimmedUrl
  }

  try {
    const parsedUrl = new URL(trimmedUrl)

    const googleDriveFileId = getGoogleDriveFileId(parsedUrl)
    if (googleDriveFileId && parsedUrl.hostname.toLowerCase().includes('drive.google.com')) {
      return buildProxyImageUrl(trimmedUrl, { highRes })
    }

    if (shouldProxyImageUrl(parsedUrl)) {
      return buildProxyImageUrl(trimmedUrl, { highRes })
    }

    if (highRes) {
      return upgradeDirectImageUrl(parsedUrl)
    }
  } catch {
    return trimmedUrl
  }

  return trimmedUrl
}

export function isProxiedItineraryImageUrl(url: string): boolean {
  return url.startsWith(GOOGLE_IMAGE_PROXY_PREFIX)
}
