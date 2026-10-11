const GOOGLE_IMAGE_PROXY_PREFIX = '/api/media/image?src='

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

export function resolveItineraryImageUrl(url: string): string {
  const trimmedUrl = url.trim()

  if (!trimmedUrl || trimmedUrl.startsWith('/')) {
    return trimmedUrl
  }

  try {
    const parsedUrl = new URL(trimmedUrl)

    const googleDriveFileId = getGoogleDriveFileId(parsedUrl)
    if (googleDriveFileId && parsedUrl.hostname.toLowerCase().includes('drive.google.com')) {
      return `${GOOGLE_IMAGE_PROXY_PREFIX}${encodeURIComponent(trimmedUrl)}`
    }

    if (shouldProxyImageUrl(parsedUrl)) {
      return `${GOOGLE_IMAGE_PROXY_PREFIX}${encodeURIComponent(trimmedUrl)}`
    }
  } catch {
    return trimmedUrl
  }

  return trimmedUrl
}

export function isProxiedItineraryImageUrl(url: string): boolean {
  return url.startsWith(GOOGLE_IMAGE_PROXY_PREFIX)
}
