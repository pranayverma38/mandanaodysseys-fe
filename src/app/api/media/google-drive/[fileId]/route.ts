import { NextRequest } from 'next/server'

const GOOGLE_DRIVE_STREAM_URL = 'https://drive.usercontent.google.com/download'

function buildProxyHeaders(request: NextRequest): Headers {
  const headers = new Headers()
  const rangeHeader = request.headers.get('range')

  if (rangeHeader) {
    headers.set('range', rangeHeader)
  }

  return headers
}

function buildResponseHeaders(upstreamHeaders: Headers): Headers {
  const headers = new Headers()

  for (const headerName of [
    'accept-ranges',
    'cache-control',
    'content-length',
    'content-range',
    'content-type',
    'etag',
    'last-modified',
  ]) {
    const headerValue = upstreamHeaders.get(headerName)
    if (headerValue) {
      headers.set(headerName, headerValue)
    }
  }

  return headers
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ fileId: string }> }
) {
  const { fileId } = await context.params

  if (!fileId) {
    return new Response('Missing Google Drive file ID.', { status: 400 })
  }

  const upstreamUrl = new URL(GOOGLE_DRIVE_STREAM_URL)
  upstreamUrl.searchParams.set('id', fileId)
  upstreamUrl.searchParams.set('export', 'download')

  const upstreamResponse = await fetch(upstreamUrl, {
    headers: buildProxyHeaders(request),
    cache: 'no-store',
  })

  if (!upstreamResponse.ok && upstreamResponse.status !== 206) {
    return new Response('Unable to stream Google Drive media.', { status: upstreamResponse.status })
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers: buildResponseHeaders(upstreamResponse.headers),
  })
}
