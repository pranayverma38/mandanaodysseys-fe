'use client'

import { Button } from '@/components/button'
import ButtonClose from '@/components/button-close'
import { CloseButton, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { Album02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { PlayIcon } from '@heroicons/react/24/solid'
import {
  buildGoogleDriveThumbnailUrl,
  getGoogleDriveFileId,
  isGoogleDriveUrl,
} from '@/lib/google-drive-media'
import { isProxiedItineraryImageUrl, resolveItineraryImageUrl } from '@/lib/itinerary-image-url'
import clsx from 'clsx'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { type SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react'

type GalleryMediaKind = 'image' | 'video' | 'embed'

type GalleryMedia = {
  playbackUrl: string
  kind: GalleryMediaKind
  providerLabel?: string
  posterUrl?: string
}

const VIDEO_FILE_PATTERN = /\.(mp4|webm|ogg|mov|m4v)(?:$|\?)/i

function getPinterestPinId(url: URL): string | null {
  const pinMatch = url.pathname.match(/\/pin\/(\d+)/i)
  return pinMatch?.[1] ?? null
}

function getProviderLabel(hostname: string): string | undefined {
  const normalizedHostname = hostname.replace(/^www\./i, '')

  if (normalizedHostname.includes('google.com')) return 'Google Drive'
  if (normalizedHostname.includes('pinterest.com')) return 'Pinterest'
  if (normalizedHostname.includes('pexels.com')) return 'Pexels'

  return normalizedHostname || undefined
}

function resolveGalleryMedia(url: string): GalleryMedia {
  const trimmedUrl = url.trim()

  if (!trimmedUrl) {
    return {
      playbackUrl: '',
      kind: 'image',
    }
  }

  if (trimmedUrl.startsWith('/')) {
    return {
      playbackUrl: trimmedUrl,
      kind: VIDEO_FILE_PATTERN.test(trimmedUrl) ? 'video' : 'image',
    }
  }

  try {
    const parsedUrl = new URL(trimmedUrl)
    const hostname = parsedUrl.hostname.toLowerCase()
    const pathname = parsedUrl.pathname.toLowerCase()

    const googleDriveFileId = getGoogleDriveFileId(parsedUrl)
    if (googleDriveFileId && hostname.includes('drive.google.com')) {
      const thumbnailUrl = buildGoogleDriveThumbnailUrl(googleDriveFileId, 'w600')

      return {
        playbackUrl: thumbnailUrl,
        kind: 'image',
        providerLabel: 'Google Drive',
        posterUrl: thumbnailUrl,
      }
    }

    const pinterestPinId = getPinterestPinId(parsedUrl)
    if (pinterestPinId && hostname.includes('pinterest.com')) {
      return {
        playbackUrl: `https://assets.pinterest.com/ext/embed.html?id=${pinterestPinId}`,
        kind: 'embed',
        providerLabel: 'Pinterest',
      }
    }

    if (hostname === 'videos.pexels.com' || VIDEO_FILE_PATTERN.test(trimmedUrl)) {
      return {
        playbackUrl: trimmedUrl,
        kind: 'video',
        providerLabel: getProviderLabel(hostname),
      }
    }

    if (pathname.includes('/video/') || pathname.includes('/videos/')) {
      parsedUrl.searchParams.set('autoplay', '1')
      parsedUrl.searchParams.set('muted', '1')
      parsedUrl.searchParams.set('playsinline', '1')

      return {
        playbackUrl: parsedUrl.toString(),
        kind: 'embed',
        providerLabel: getProviderLabel(hostname),
      }
    }
  } catch {
    // Fall back to image rendering for malformed URLs or non-HTTP values.
  }

  return {
    playbackUrl: resolveItineraryImageUrl(trimmedUrl),
    kind: 'image',
  }
}

function prioritizeGalleryMedia(mediaItems: GalleryMedia[]): GalleryMedia[] {
  const firstVideoIndex = mediaItems.findIndex((item) => item.kind === 'video')
  const firstDriveMediaIndex = mediaItems.findIndex(
    (item) => item.providerLabel === 'Google Drive' && Boolean(item.posterUrl)
  )
  const featuredIndex =
    firstVideoIndex >= 0
      ? firstVideoIndex
      : firstDriveMediaIndex >= 0
        ? firstDriveMediaIndex
        : mediaItems.findIndex((item) => item.kind === 'embed')

  if (featuredIndex <= 0) return mediaItems

  return [mediaItems[featuredIndex], ...mediaItems.slice(0, featuredIndex), ...mediaItems.slice(featuredIndex + 1)]
}

const stopMediaEvent = (event: SyntheticEvent) => {
  event.stopPropagation()
}

function shouldBypassNextImageOptimization(url: string): boolean {
  return isProxiedItineraryImageUrl(url) || isGoogleDriveUrl(url)
}

const MediaPlaceholder = ({
  label,
  className,
}: {
  label: string
  className?: string
}) => (
  <div
    className={clsx(
      'absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl bg-linear-to-br from-neutral-900 via-neutral-800 to-neutral-700 text-center text-white',
      className
    )}
  >
    <span className="flex size-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
      <PlayIcon className="size-6" />
    </span>
    <span className="px-3 text-xs font-medium tracking-wide uppercase text-white/85">{label}</span>
  </div>
)

const GalleryMediaSurface = ({
  media,
  alt,
  sizes,
  className,
  priority = false,
  controls = false,
  compact = false,
  autoPlay = false,
}: {
  media: GalleryMedia
  alt: string
  sizes?: string
  className?: string
  priority?: boolean
  controls?: boolean
  compact?: boolean
  autoPlay?: boolean
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (!autoPlay || media.kind !== 'video' || !videoRef.current) return

    const videoElement = videoRef.current
    const attemptPlayback = () => {
      void videoElement.play().catch(() => {
        // Ignore autoplay rejections; browser policies can still intervene.
      })
    }

    attemptPlayback()
    videoElement.addEventListener('loadeddata', attemptPlayback)

    return () => {
      videoElement.removeEventListener('loadeddata', attemptPlayback)
    }
  }, [autoPlay, media.kind, media.playbackUrl])

  if (media.kind === 'video') {
    return (
      <video
        ref={videoRef}
        className={clsx('absolute inset-0 size-full rounded-xl object-cover', className)}
        controls={controls}
        autoPlay={autoPlay}
        loop={autoPlay}
        playsInline
        preload={autoPlay ? 'auto' : controls ? 'metadata' : 'none'}
        muted={autoPlay || !controls}
        poster={media.posterUrl}
        onClick={stopMediaEvent}
        onPointerDown={stopMediaEvent}
      >
        <source src={media.playbackUrl} />
        Your browser does not support the video tag.
      </video>
    )
  }

  if (media.kind === 'embed') {
    if (compact) {
      return <MediaPlaceholder label={media.providerLabel || 'Video'} className={className} />
    }

    return (
      <iframe
        src={media.playbackUrl}
        title={`${media.providerLabel || 'Embedded'} media`}
        className={clsx('absolute inset-0 size-full rounded-xl border-0 bg-black', className)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        loading="lazy"
      />
    )
  }

  return (
    <Image
      fill
      alt={alt}
      src={media.playbackUrl}
      className={clsx('rounded-xl object-cover', className)}
      sizes={sizes}
      priority={priority}
      unoptimized={shouldBypassNextImageOptimization(media.playbackUrl)}
    />
  )
}

const EmblaCarousel = ({ mediaItems, option }: { mediaItems: GalleryMedia[]; option: EmblaOptionsType }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    ...option,
    direction: process.env.NEXT_PUBLIC_THEME_DIR,
  })
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    ...option,
    containScroll: 'keepSnaps',
    dragFree: true,
    direction: process.env.NEXT_PUBLIC_THEME_DIR,
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className="relative size-full embla">
      <div className="embla__viewport relative mx-auto size-full overflow-hidden" ref={emblaMainRef}>
        <div className="embla__container size-full">
          {mediaItems.map((media, index) => (
            <div className="relative z-50 flex embla__slide basis-full items-center justify-center" key={index}>
              <div className="relative aspect-3/2 w-full overflow-hidden rounded-xl bg-black">
                {media.kind === 'image' ? (
                  <Image
                    alt="Slide media"
                    src={media.playbackUrl}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    className="object-contain"
                    unoptimized={shouldBypassNextImageOptimization(media.playbackUrl)}
                  />
                ) : (
                  <GalleryMediaSurface
                    media={media}
                    alt="Slide media"
                    controls
                    className={media.kind === 'video' ? 'object-contain' : undefined}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute top-2.5 right-2.5 z-50 sm:top-4 sm:right-4">
            <CloseButton as={ButtonClose}>
              <span className="sr-only">Close</span>
            </CloseButton>
          </div>
        </div>
      </div>

      <div className="embla-thumbs fixed inset-x-0 bottom-5 z-10">
        <div className="embla-thumbs__viewport mx-auto max-w-28" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container flex">
            {mediaItems.map((media, index) => (
              <div
                key={index}
                className={clsx(
                  'relative flex aspect-5/3 w-24 shrink-0 items-center justify-center transition-[transform,filter] duration-300 ease-in-out',
                  index === selectedIndex
                    ? 'z-10 scale-125 overflow-hidden rounded-md brightness-100'
                    : 'brightness-50 hover:brightness-75'
                )}
                onClick={() => onThumbClick(index)}
              >
                {media.kind === 'image' ? (
                  <Image
                    alt="Slide media"
                    src={media.playbackUrl}
                    fill
                    sizes="100px"
                    className="object-cover"
                    unoptimized={shouldBypassNextImageOptimization(media.playbackUrl)}
                  />
                ) : (
                  <MediaPlaceholder
                    label={media.providerLabel || (media.kind === 'video' ? 'Video' : 'Media')}
                    className="rounded-md"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface Props {
  images: string[]
  gridType?: 'grid1' | 'grid2' | 'grid3' | 'grid4'
}
const HeaderGallery = ({ images, gridType = 'grid1' }: Props) => {
  let [isOpen, setIsOpen] = useState(false)
  let [startIndex, setStartIndex] = useState(0)
  const [mediaItems, setMediaItems] = useState<GalleryMedia[]>(() =>
    prioritizeGalleryMedia(images.map(resolveGalleryMedia))
  )

  useEffect(() => {
    let isCancelled = false

    const initialMediaItems = prioritizeGalleryMedia(images.map(resolveGalleryMedia))
    setMediaItems(initialMediaItems)

    if (!images.some(isGoogleDriveUrl)) {
      return () => {
        isCancelled = true
      }
    }

    const resolveDriveMedia = async () => {
      const resolvedItems = await Promise.all(
        images.map(async (url) => {
          if (!isGoogleDriveUrl(url)) {
            return resolveGalleryMedia(url)
          }

          try {
            const response = await fetch(`/api/media/inspect?src=${encodeURIComponent(url)}`, {
              cache: 'no-store',
            })

            if (!response.ok) {
              return resolveGalleryMedia(url)
            }

            return (await response.json()) as GalleryMedia
          } catch {
            return resolveGalleryMedia(url)
          }
        })
      )

      if (!isCancelled) {
        setMediaItems(prioritizeGalleryMedia(resolvedItems))
      }
    }

    void resolveDriveMedia()

    return () => {
      isCancelled = true
    }
  }, [images])

  const handleOpenDialog = (index = 0) => {
    setStartIndex(index)
    setIsOpen(true)
  }

  return (
    <>
      {gridType === 'grid1' && <HeaderGalleryGrid1 mediaItems={mediaItems} handleOpenDialog={handleOpenDialog} />}
      {gridType === 'grid2' && <HeaderGalleryGrid2 mediaItems={mediaItems} handleOpenDialog={handleOpenDialog} />}
      {gridType === 'grid3' && <HeaderGalleryGrid3 mediaItems={mediaItems} handleOpenDialog={handleOpenDialog} />}
      {gridType === 'grid4' && <HeaderGalleryGrid4 mediaItems={mediaItems} handleOpenDialog={handleOpenDialog} />}

      {/* Dialog for full-screen image gallery */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel
            transition
            className="relative mx-auto aspect-3/2 max-h-full w-full max-w-7xl flex-1 transition data-closed:opacity-0"
          >
            <EmblaCarousel mediaItems={mediaItems} option={{ startIndex, slidesToScroll: 1 }} />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

const HeaderGalleryGrid1 = ({
  mediaItems,
  handleOpenDialog,
}: {
  mediaItems: GalleryMedia[]
  handleOpenDialog: (index?: number) => void
}) => {
  return (
    <header className="relative md:grid md:grid-cols-4 md:gap-2">
      <div className="relative aspect-4/5 size-full md:col-span-2 md:aspect-4/4" onClick={() => handleOpenDialog(0)}>
        {mediaItems[0] && (
          <GalleryMediaSurface
            media={mediaItems[0]}
            alt="Primary itinerary media"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 80vw"
            className="transition-[filter] hover:brightness-75"
            autoPlay={mediaItems[0].kind === 'video'}
            priority
          />
        )}
      </div>
      <div className="hidden md:col-span-2 md:grid md:grid-cols-2 md:gap-2">
        {mediaItems.slice(1, 5).map((item, index) => (
          <div className="relative aspect-2/2 size-full" key={index} onClick={() => handleOpenDialog(index + 1)}>
            <GalleryMediaSurface
              media={item}
              alt={`Itinerary gallery media ${index + 2}`}
              sizes="(max-width: 768px) 33vw, 33vw"
              className="brightness-100 transition-[filter] hover:brightness-75"
              autoPlay={item.kind === 'video'}
              priority
            />
          </div>
        ))}
      </div>

      <ButtonShowAllPhotos handleOpenDialog={handleOpenDialog} />
    </header>
  )
}
const HeaderGalleryGrid2 = ({
  mediaItems,
  handleOpenDialog,
}: {
  mediaItems: GalleryMedia[]
  handleOpenDialog: (index?: number) => void
}) => {
  return (
    <header className="relative md:grid md:grid-cols-4">
      <div className="relative aspect-4/5 size-full md:col-span-3 md:aspect-5/4" onClick={() => handleOpenDialog(0)}>
        {mediaItems[0] && (
          <GalleryMediaSurface
            media={mediaItems[0]}
            alt="Primary itinerary media"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 80vw"
            className="brightness-100 transition-[filter] hover:brightness-75"
            autoPlay={mediaItems[0].kind === 'video'}
            priority
          />
        )}
      </div>

      <div className="hidden md:grid md:grid-cols-1 md:gap-y-2 md:ps-2">
        {mediaItems.slice(1, 4).map((item, index) => (
          <div className="relative aspect-3/2 size-full" key={index} onClick={() => handleOpenDialog(index + 1)}>
            <GalleryMediaSurface
              media={item}
              alt={`Itinerary gallery media ${index + 2}`}
              sizes="(max-width: 768px) 33vw, 33vw"
              className="brightness-100 transition-[filter] hover:brightness-75"
              autoPlay={item.kind === 'video'}
              priority
            />
          </div>
        ))}
      </div>

      <ButtonShowAllPhotos handleOpenDialog={handleOpenDialog} />
    </header>
  )
}
const HeaderGalleryGrid3 = ({
  mediaItems,
  handleOpenDialog,
}: {
  mediaItems: GalleryMedia[]
  handleOpenDialog: (index?: number) => void
}) => {
  return (
    <header className="relative md:grid md:grid-cols-3 md:gap-x-2">
      <div className="relative aspect-4/5 size-full md:aspect-3/4" onClick={() => handleOpenDialog(0)}>
        {mediaItems[0] && (
          <GalleryMediaSurface
            media={mediaItems[0]}
            alt="Primary itinerary media"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 80vw"
            className="brightness-100 transition-[filter] hover:brightness-75"
            autoPlay={mediaItems[0].kind === 'video'}
            priority
          />
        )}
      </div>

      <div className="hidden md:grid md:grid-cols-1 md:gap-y-2">
        <div className="relative aspect-3/2 size-full" onClick={() => handleOpenDialog(1)}>
          {mediaItems[1] && (
            <GalleryMediaSurface
              media={mediaItems[1]}
              alt="Itinerary gallery media 2"
              sizes="(max-width: 768px) 33vw, 33vw"
              className="brightness-100 transition-[filter] hover:brightness-75"
              autoPlay={mediaItems[1].kind === 'video'}
              priority
            />
          )}
        </div>
        <div className="relative aspect-3/2 size-full" onClick={() => handleOpenDialog(2)}>
          {mediaItems[2] && (
            <GalleryMediaSurface
              media={mediaItems[2]}
              alt="Itinerary gallery media 3"
              sizes="(max-width: 768px) 33vw, 33vw"
              className="brightness-100 transition-[filter] hover:brightness-75"
              autoPlay={mediaItems[2].kind === 'video'}
              priority
            />
          )}
        </div>
      </div>

      <div className="relative hidden size-full md:block md:aspect-3/4" onClick={() => handleOpenDialog(3)}>
        {mediaItems[3] && (
          <GalleryMediaSurface
            media={mediaItems[3]}
            alt="Itinerary gallery media 4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 80vw"
            className="brightness-100 transition-[filter] hover:brightness-75"
            autoPlay={mediaItems[3].kind === 'video'}
            priority
          />
        )}
      </div>

      <ButtonShowAllPhotos handleOpenDialog={handleOpenDialog} />
    </header>
  )
}
const HeaderGalleryGrid4 = ({
  mediaItems,
  handleOpenDialog,
}: {
  mediaItems: GalleryMedia[]
  handleOpenDialog: (index?: number) => void
}) => {
  return (
    <header className="relative md:grid md:grid-cols-3 md:gap-x-2">
      <div className="relative aspect-4/5 size-full md:aspect-3/4" onClick={() => handleOpenDialog(0)}>
        {mediaItems[0] && (
          <GalleryMediaSurface
            media={mediaItems[0]}
            alt="Primary itinerary media"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 80vw"
            className="brightness-100 transition-[filter] hover:brightness-75"
            autoPlay={mediaItems[0].kind === 'video'}
            priority
          />
        )}
      </div>

      <div className="relative hidden aspect-4/5 size-full md:block md:aspect-3/4" onClick={() => handleOpenDialog(3)}>
        {mediaItems[3] && (
          <GalleryMediaSurface
            media={mediaItems[3]}
            alt="Itinerary gallery media 4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 80vw"
            className="brightness-100 transition-[filter] hover:brightness-75"
            autoPlay={mediaItems[3].kind === 'video'}
            priority
          />
        )}
      </div>

      <div className="hidden md:grid md:grid-cols-1 md:gap-y-2">
        <div className="relative aspect-3/2 size-full" onClick={() => handleOpenDialog(1)}>
          {mediaItems[1] && (
            <GalleryMediaSurface
              media={mediaItems[1]}
              alt="Itinerary gallery media 2"
              sizes="(max-width: 768px) 33vw, 33vw"
              className="brightness-100 transition-[filter] hover:brightness-75"
              autoPlay={mediaItems[1].kind === 'video'}
              priority
            />
          )}
        </div>
        <div className="relative aspect-3/2 size-full" onClick={() => handleOpenDialog(2)}>
          {mediaItems[2] && (
            <GalleryMediaSurface
              media={mediaItems[2]}
              alt="Itinerary gallery media 3"
              sizes="(max-width: 768px) 33vw, 33vw"
              className="brightness-100 transition-[filter] hover:brightness-75"
              autoPlay={mediaItems[2].kind === 'video'}
              priority
            />
          )}
        </div>
      </div>

      <ButtonShowAllPhotos handleOpenDialog={handleOpenDialog} />
    </header>
  )
}

const ButtonShowAllPhotos = ({ handleOpenDialog }: { handleOpenDialog: (index?: number) => void }) => (
  <div className="absolute bottom-3 left-3">
    <Button color="light" onClick={() => handleOpenDialog()}>
      <HugeiconsIcon icon={Album02Icon} size={20} className="-ml-1" />
      <span className="text-sm">Show all media</span>
    </Button>
  </div>
)

export default HeaderGallery
