'use client'

import type { ItineraryExperience } from '@/data/itineraries/types'
import { isProxiedItineraryImageUrl, resolveItineraryImageUrl } from '@/lib/itinerary-image-url'
import { Location06Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Dialog, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { motion } from 'motion/react'
import Image from 'next/image'
import { Fragment, useState } from 'react'

interface Props {
  experiences: ItineraryExperience[]
}

const ORNAMENT_DOT_SIZES = ['size-1.5', 'size-2', 'size-2.5', 'size-3.5'] as const
const EXPERIENCES_GOLD = '#b8860b'

function ExperienceDots({
  sizes,
}: {
  sizes: readonly string[]
}) {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3.5">
      {sizes.map((sizeClassName, index) => (
        <span
          key={`${sizeClassName}-${index}`}
          className={clsx(sizeClassName, 'rounded-full')}
          style={{ backgroundColor: EXPERIENCES_GOLD }}
        />
      ))}
    </div>
  )
}

function LeftExperienceDots() {
  return (
    <ExperienceDots sizes={ORNAMENT_DOT_SIZES} />
  )
}

function RightExperienceDots() {
  return (
    <ExperienceDots sizes={[...ORNAMENT_DOT_SIZES].reverse()} />
  )
}

function ExperienceHeroHeading() {
  return (
    <div className="mb-8 flex items-center justify-center gap-3 sm:gap-5 lg:mb-10 lg:gap-6">
      <LeftExperienceDots />

      <div className="shrink-0 text-center">
        <h2
          className="font-style-script text-[2.9rem] leading-none italic sm:text-[4.2rem]"
          style={{ color: EXPERIENCES_GOLD }}
        >
          Experiences
        </h2>
      </div>

      <RightExperienceDots />
    </div>
  )
}

function ExperienceCard({
  experience,
  onOpen,
}: {
  experience: ItineraryExperience
  onOpen: () => void
}) {
  const imageUrl = resolveItineraryImageUrl(experience.imageUrl)

  return (
    <article className="group relative min-h-[360px] overflow-hidden rounded-[28px] bg-black shadow-[0_24px_80px_-28px_rgba(0,0,0,0.45)] sm:min-h-[420px]">
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={experience.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          unoptimized={isProxiedItineraryImageUrl(imageUrl)}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />

      <div className="absolute inset-0 flex flex-col justify-end p-5 text-white sm:p-6">
        <div className="max-w-xl space-y-2">
          <h3 className="font-marcellus text-2xl leading-tight sm:text-[2rem]">{experience.title}</h3>
          {experience.subtitle ? (
            <p className="max-w-lg text-sm leading-6 text-white/85 sm:text-base">{experience.subtitle}</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/18"
        >
          Learn More
          <ArrowRightIcon className="size-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}

function ExperienceModal({
  experience,
  isOpen,
  onClose,
}: {
  experience: ItineraryExperience | null
  isOpen: boolean
  onClose: () => void
}) {
  if (!experience) {
    return null
  }

  const imageUrl = resolveItineraryImageUrl(experience.imageUrl)

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/65 backdrop-blur-[2px]" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto p-3 sm:p-6">
          <div className="flex min-h-full items-center justify-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-5xl overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.55)]">
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 rounded-full border border-white/30 bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/45"
                  aria-label="Close"
                >
                  <XMarkIcon className="size-5" aria-hidden="true" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-[280px] sm:min-h-[380px] lg:min-h-[620px]">
                    <Image
                      src={imageUrl}
                      alt={experience.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      unoptimized={isProxiedItineraryImageUrl(imageUrl)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />
                  </div>

                  <div className="flex flex-col justify-center bg-[#fffaf6] p-6 sm:p-8 lg:p-10">
                    <DialogTitle className="font-marcellus text-3xl leading-tight text-neutral-900 sm:text-4xl">
                      {experience.title}
                    </DialogTitle>

                    {experience.subtitle ? (
                      <p className="mt-3 text-base leading-7 text-neutral-600 sm:text-lg">{experience.subtitle}</p>
                    ) : null}

                    {experience.description ? (
                      <p className="mt-6 text-sm leading-7 text-neutral-700 sm:text-[0.98rem]">
                        {experience.description}
                      </p>
                    ) : null}

                    {experience.location ? (
                      <div className="mt-7 flex items-center gap-3 text-neutral-700">
                        <HugeiconsIcon
                          icon={Location06Icon}
                          size={18}
                          className="shrink-0 text-[#fc6200]"
                        />
                        <p className="text-sm font-semibold sm:text-base">{experience.location}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Dialog.Panel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

const ItineraryExperiencesSection = ({ experiences }: Props) => {
  const [activeExperienceIndex, setActiveExperienceIndex] = useState<number | null>(null)

  if (!experiences.length) {
    return null
  }

  const activeExperience =
    activeExperienceIndex !== null ? experiences[activeExperienceIndex] ?? null : null

  return (
    <>
      <section
        id="itinerary-experiences"
        className="scroll-mt-20 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.65 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <ExperienceHeroHeading />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.14,
                delayChildren: 0.12,
              },
            },
          }}
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={`${experience.title}-${index}`}
              variants={{
                hidden: { opacity: 0, y: 36, scale: 0.97 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.72,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <ExperienceCard
                experience={experience}
                onOpen={() => setActiveExperienceIndex(index)}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <ExperienceModal
        experience={activeExperience}
        isOpen={activeExperienceIndex !== null}
        onClose={() => setActiveExperienceIndex(null)}
      />
    </>
  )
}

export default ItineraryExperiencesSection
