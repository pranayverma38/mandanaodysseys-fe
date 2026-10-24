'use client'

import { ButtonCircle } from '@/components/button'
import SocialsShare from '@/components/socials-share'
import { useWishlist } from '@/providers/wishlist-provider'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/solid'
import { ArrowRight01Icon, Share03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

function PdfFileIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M6.4 2.8h7.15L17.6 7v14.2H6.4A1.6 1.6 0 0 1 4.8 19.6V4.4A1.6 1.6 0 0 1 6.4 2.8Z"
        fill="currentColor"
      />
      <path d="M13.35 2.8 17.6 7h-3.05a1.2 1.2 0 0 1-1.2-1.2V2.8Z" fill="#fff" fillOpacity="0.35" />
      <path
        d="M8.05 16.1v-5.1h1.55c1.08 0 1.76.56 1.76 1.5 0 .94-.68 1.5-1.76 1.5H8.85v2.1H8.05Zm.8-2.85h.7c.5 0 .9-.24.9-.75s-.4-.75-.9-.75h-.7v1.5Zm4.05 2.85v-5.1h1.95c1.38 0 2.25.86 2.25 2.55s-.87 2.55-2.25 2.55h-1.95Zm.8-4.35v3.6h1.1c.86 0 1.4-.52 1.4-1.8s-.54-1.8-1.4-1.8h-1.1Z"
        fill="#fff"
      />
    </svg>
  )
}

export const ViewPdfButton = ({ href }: { href: string }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View PDF"
      className="inline-flex h-9 shrink-0 items-center gap-1 rounded-full border border-orange-400 bg-white px-2.5 text-xs font-medium text-neutral-950 transition hover:bg-orange-50 sm:h-10 sm:gap-2 sm:px-3.5 sm:text-sm"
    >
      <PdfFileIcon className="size-5 text-red-500" />
      <span className="whitespace-nowrap">View PDF</span>
      <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="hidden text-neutral-800 sm:block" />
    </a>
  )
}

export const LikeButton = ({ packageHandle }: { packageHandle?: string }) => {
  const { isWishlisted, toggleWishlist } = useWishlist()
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (!packageHandle) {
      return
    }

    setIsLiked(isWishlisted(packageHandle))
  }, [isWishlisted, packageHandle])

  if (!packageHandle) {
    return (
      <ButtonCircle className="size-9! sm:size-10!" outline aria-hidden>
        <HeartIconOutline className="size-5!" />
      </ButtonCircle>
    )
  }

  return (
    <ButtonCircle
      className="size-9! sm:size-10!"
      outline
      onClick={() => {
        void toggleWishlist(packageHandle)
      }}
      aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-pressed={isLiked}
    >
      {isLiked ? <HeartIcon className={'size-5! text-red-400'} /> : <HeartIconOutline className="size-5!" />}
    </ButtonCircle>
  )
}

export const ShareButton = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return (
    <Popover className="relative">
      <PopoverButton className={clsx('size-9! sm:size-10!', className)} as={ButtonCircle} outline>
        {children || <HugeiconsIcon icon={Share03Icon} size={20} />}
      </PopoverButton>
      <PopoverPanel
        anchor={{
          to: 'bottom end',
          gap: 12,
        }}
        className="relative z-10"
      >
        <SocialsShare />
      </PopoverPanel>
    </Popover>
  )
}

const LikeSaveBtns = ({
  className,
  packageHandle,
  pdfLink,
}: {
  className?: string
  packageHandle?: string
  pdfLink?: string | null
}) => {
  const resolvedPdfLink = pdfLink?.trim()

  return (
    <div className={clsx('flex shrink-0 items-center gap-2', className)}>
      {resolvedPdfLink ? <ViewPdfButton href={resolvedPdfLink} /> : null}
      {packageHandle ? <LikeButton packageHandle={packageHandle} /> : <LikeButton packageHandle="" />}
      <ShareButton />
    </div>
  )
}

export default LikeSaveBtns
