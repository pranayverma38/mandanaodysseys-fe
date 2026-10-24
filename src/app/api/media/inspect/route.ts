import {
  buildGoogleDriveStreamUrl,
  buildGoogleDriveThumbnailUrl,
  getGoogleDriveFileId,
} from '@/lib/google-drive-media'
import { resolveItineraryImageUrl } from '@/lib/itinerary-image-url'
import { NextRequest } from 'next/server'

const MEDIA_CACHE_CONTROL = 'public, s-maxage=86400, stale-while-revalidate=604800'

async function getGoogleDriveContentType(fileId: string): Promise<string | null> {
  const upstreamUrl = new URL('https://drive.google.com/uc')
  upstreamUrl.searchParams.set('export', 'view')
  upstreamUrl.searchParams.set('id', fileId)

  const response = await fetch(upstreamUrl, {
    method: 'HEAD',
    next: { revalidate: 86400 },
  })

  if (!response.ok) {
    return null
  }

  return response.headers.get('content-type')
}

export async function GET(request: NextRequest) {
  const sourceUrl = request.nextUrl.searchParams.get('src')

  if (!sourceUrl) {
    return Response.json(
      { message: 'Missing media source.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    )
  }

  let parsedUrl: URL

  try {
    parsedUrl = new URL(sourceUrl)
  } catch {
    return Response.json(
      { message: 'Invalid media source.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    )
  }

  const googleDriveFileId = getGoogleDriveFileId(parsedUrl)
  if (googleDriveFileId && parsedUrl.hostname.toLowerCase().includes('drive.google.com')) {
    const contentType = await getGoogleDriveContentType(googleDriveFileId)

    if (contentType?.startsWith('video/')) {
      return Response.json(
        {
          kind: 'video',
          playbackUrl: buildGoogleDriveStreamUrl(googleDriveFileId),
          posterUrl: buildGoogleDriveThumbnailUrl(googleDriveFileId, 'w800'),
          providerLabel: 'Google Drive',
        },
        { headers: { 'Cache-Control': MEDIA_CACHE_CONTROL } }
      )
    }

    return Response.json(
      {
        kind: 'image',
        playbackUrl: resolveItineraryImageUrl(sourceUrl),
        providerLabel: 'Google Drive',
      },
      { headers: { 'Cache-Control': MEDIA_CACHE_CONTROL } }
    )
  }

  return Response.json(
    {
      kind: 'image',
      playbackUrl: resolveItineraryImageUrl(sourceUrl),
    },
    { headers: { 'Cache-Control': MEDIA_CACHE_CONTROL } }
  )
}
