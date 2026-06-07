'use client'

import { ButtonCircle } from '@/components/button'
import ButtonPrimary from '@/components/button-primary'
import ButtonThird from '@/components/button-third'
import Logo from '@/components/logo'
import { CloseButton, Dialog, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { FilterVerticalIcon, Search01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useTimeoutFn } from 'react-use'
import ExperienceSearchFormMobile from './experience-search-form/experience-search-form-mobile'

const HeroSearchFormMobile = ({
  className,
  compact,
}: {
  className?: string
  compact?: boolean
}) => {
  const [showModal, setShowModal] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  let [, , resetIsShowingDialog] = useTimeoutFn(() => setShowDialog(true), 1)

  const pathname = usePathname()

  let locationText = 'Where to?'
  let weekText = 'Any week'
  let guestsText = 'Add guests'

  if (pathname.startsWith('/experience-search')) {
    locationText = 'Experiences in Bali'
    weekText = 'Mar 22 - 27'
    guestsText = '2 guests'
  }

  function closeModal() {
    setShowModal(false)
  }

  function openModal() {
    setShowModal(true)
  }

  const renderButtonOpenModal = () => {
    return (
      <button
        onClick={openModal}
        className={clsx(
          'relative flex items-center rounded-full shadow-md-for-card bg-card focus:outline-none',
          compact ? 'w-fit justify-center px-5 py-3.5' : 'w-full px-4 py-2 sm:pe-11'
        )}
      >
        <HugeiconsIcon icon={Search01Icon} size={20} />

        <div className={clsx('overflow-hidden', compact ? 'ms-2.5' : 'ms-4 flex-1 text-start')}>
          <span className="block text-sm/5 font-medium">{locationText}</span>
          {!compact && (
            <span className="mt-px flex gap-2 text-sm/5 font-[350] text-muted-foreground">
              {weekText} <span>•</span> <span>{guestsText}</span>
            </span>
          )}
        </div>

        {!compact && (
          <div className="absolute end-2 top-1/2 hidden size-9 -translate-y-1/2 transform items-center justify-center rounded-full border border-border sm:flex">
            <HugeiconsIcon icon={FilterVerticalIcon} size={16} />
          </div>
        )}
      </button>
    )
  }

  return (
    <div className={clsx(className, 'relative z-10', compact ? 'mx-auto w-fit' : 'w-full max-w-lg')}>
      {renderButtonOpenModal()}
      <Dialog as="div" className="relative z-max" onClose={closeModal} open={showModal}>
        <div className="fixed inset-0 bg-accent">
          <div className="flex h-full">
            <DialogPanel
              transition
              className="relative flex-1 transition data-closed:translate-y-28 data-closed:opacity-0"
            >
              {showDialog && (
                <div className="relative flex h-full flex-1 flex-col justify-between">
                  <div className="absolute inset-e-3 top-2 z-10">
                    <CloseButton color="light" as={ButtonCircle} className="size-7!">
                      <XMarkIcon className="size-4!" />
                    </CloseButton>
                  </div>

                  <div className="flex justify-center px-3 pt-10 pb-5">
                    <Logo variant="full-colored" />
                  </div>

                  <div className="flex flex-1 overflow-hidden px-1.5 sm:px-4">
                    <div className="hidden-scrollbar flex-1 overflow-y-auto pt-2 pb-4">
                      <ExperienceSearchFormMobile />
                    </div>
                  </div>

                  <div className="flex justify-between border-t border-border bg-background px-4 py-3">
                    <ButtonThird
                      onClick={() => {
                        setShowDialog(false)
                        resetIsShowingDialog()
                      }}
                    >
                      Clear all
                    </ButtonThird>
                    <ButtonPrimary type="submit" form="form-hero-search-form-mobile" onClick={closeModal}>
                      <HugeiconsIcon icon={Search01Icon} size={16} />
                      <span>Search</span>
                    </ButtonPrimary>
                  </div>
                </div>
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default HeroSearchFormMobile
