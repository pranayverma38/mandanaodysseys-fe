const DEFAULT_GOOGLE_DRIVE_THUMBNAIL_SIZE = 'w1200'

export function getGoogleDriveFileId(url: string | URL): string | null {
  const parsedUrl = typeof url === 'string' ? new URL(url) : url
  const pathMatch = parsedUrl.pathname.match(/\/file\/d\/([^/]+)/i)

  if (pathMatch?.[1]) return pathMatch[1]

  return parsedUrl.searchParams.get('id')
}

export function isGoogleDriveUrl(url: string): boolean {
  try {
    return new URL(url).hostname.toLowerCase().includes('drive.google.com')
  } catch {
    return false
  }
}

export function buildGoogleDriveThumbnailUrl(
  fileId: string,
  size: string = DEFAULT_GOOGLE_DRIVE_THUMBNAIL_SIZE
): string {
  const thumbnailUrl = new URL('https://drive.google.com/thumbnail')
  thumbnailUrl.searchParams.set('id', fileId)
  thumbnailUrl.searchParams.set('sz', size)
  return thumbnailUrl.toString()
}

export function buildGoogleDriveStreamUrl(fileId: string): string {
  const streamUrl = new URL('https://drive.usercontent.google.com/download')
  streamUrl.searchParams.set('id', fileId)
  streamUrl.searchParams.set('export', 'download')
  return streamUrl.toString()
}
