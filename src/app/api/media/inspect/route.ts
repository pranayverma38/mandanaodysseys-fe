import { resolveItineraryImageUrl } from '@/lib/itinerary-image-url'
import { NextRequest } from 'next/server'

const GOOGLE_DRIVE_THUMBNAIL_SIZE = 'w1600'

function getGoogleDriveFileId(url: URL): string | null {
  const pathMatch = url.pathname.match(/\/file\/d\/([^/]+)/i)
  if (pathMatch?.[1]) return pathMatch[1]

  return url.searchParams.get('id')
}

async function getGoogleDriveContentType(fileId: string): Promise<string | null> {
  const upstreamUrl = new URL('https://drive.google.com/uc')
  upstreamUrl.searchParams.set('export', 'view')
  upstreamUrl.searchParams.set('id', fileId)

  const response = await fetch(upstreamUrl, {
    method: 'HEAD',
    cache: 'no-store',
  })

  if (!response.ok) {
    return null
  }

  return response.headers.get('content-type')
}

export async function GET(request: NextRequest) {
  const sourceUrl = request.nextUrl.searchParams.get('src')

  if (!sourceUrl) {
    return Response.json({ message: 'Missing media source.' }, { status: 400 })
  }

  let parsedUrl: URL

  try {
    parsedUrl = new URL(sourceUrl)
  } catch {
    return Response.json({ message: 'Invalid media source.' }, { status: 400 })
  }

  const googleDriveFileId = getGoogleDriveFileId(parsedUrl)
  if (googleDriveFileId && parsedUrl.hostname.toLowerCase().includes('drive.google.com')) {
    const contentType = await getGoogleDriveContentType(googleDriveFileId)

    if (contentType?.startsWith('video/')) {
      return Response.json({
        kind: 'video',
        playbackUrl: `/api/media/google-drive/${googleDriveFileId}`,
        posterUrl: `https://drive.google.com/thumbnail?id=${googleDriveFileId}&sz=${GOOGLE_DRIVE_THUMBNAIL_SIZE}`,
        providerLabel: 'Google Drive',
      })
    }

    return Response.json({
      kind: 'image',
      playbackUrl: resolveItineraryImageUrl(sourceUrl),
      providerLabel: 'Google Drive',
    })
  }

  return Response.json({
    kind: 'image',
    playbackUrl: resolveItineraryImageUrl(sourceUrl),
  })
}
