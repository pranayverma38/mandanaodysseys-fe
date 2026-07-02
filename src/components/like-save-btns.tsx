'use client'

import { ButtonCircle } from '@/components/button'
import SocialsShare from '@/components/socials-share'
import { useWishlist } from '@/providers/wishlist-provider'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/solid'
import { Share03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

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
      <ButtonCircle className="size-10!" outline aria-hidden>
        <HeartIconOutline className="size-5!" />
      </ButtonCircle>
    )
  }

  return (
    <ButtonCircle
      className="size-10!"
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
      <PopoverButton className={clsx('size-10!', className)} as={ButtonCircle} outline>
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

const LikeSaveBtns = ({ className, packageHandle }: { className?: string; packageHandle?: string }) => {
  return (
    <div className={clsx('flex gap-2', className)}>
      {packageHandle ? <LikeButton packageHandle={packageHandle} /> : <LikeButton packageHandle="" />}
      <ShareButton />
    </div>
  )
}

export default LikeSaveBtns
