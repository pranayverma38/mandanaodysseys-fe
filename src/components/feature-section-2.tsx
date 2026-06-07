'use client'

import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import {
  AccelerationIcon,
  BubbleChatQuestionIcon,
  CustomerSupportIcon,
  SecurityCheckIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { Button } from './button'
import { Heading } from './heading'
import { Text } from './text'

interface FeatureSection2Props {
  className?: string
  variant?: 'down' | 'up'
  heading?: ReactNode
  faqs?: {
    question: string
    answer: string
  }[]
  imageUrl?: string
}

const faqs_demo = [
  {
    question: 'What destinations does Mandana Odysseys offer?',
    answer:
      'Mandana Odysseys curates tours across Asia and Oceania—including India, Sri Lanka, Bali, Australia, and more. Browse destinations by region or tour type to find family holidays, honeymoons, adventure trips, and cruise packages.',
  },
  {
    question: 'How do I book a tour with Mandana Odysseys?',
    answer:
      'Select a destination and package, choose your travel dates and group size, then submit an enquiry or complete checkout on our website. Our team confirms availability and shares a detailed itinerary before your trip.',
  },
  {
    question: 'Can I customize my holiday itinerary?',
    answer:
      'Yes. Many Mandana Odysseys packages can be tailored to your dates, budget, and interests—from honeymoon retreats and family adventures to festival tours and customized holidays. Reach out and we will build a plan around you.',
  },
  {
    question: 'What is your cancellation and refund policy?',
    answer:
      'Cancellation terms depend on the package and supplier, and are shown before you pay. If your plans change—or you face flight delays, baggage issues, or other travel disruptions—our support team is available 24/7 to help rebook or adjust your trip.',
  },
  {
    question: 'What is included in a Mandana Odysseys tour package?',
    answer:
      'Inclusions vary by package but typically cover accommodation, selected meals, guided activities, and local transfers. Flights, visas, travel insurance, and optional add-ons are listed clearly on each itinerary so you know exactly what is covered before booking.',
  },
  {
    question: 'Do you help with visas and travel documents?',
    answer:
      'Yes. Mandana Odysseys provides guidance on visa requirements, entry rules, and essential travel documents for your destination. Where possible, we connect you with trusted partners to simplify the application process before you depart.',
  },
  {
    question: 'What payment methods does Mandana Odysseys accept?',
    answer:
      'We accept major credit and debit cards, bank transfers, and other secure online payment options shown at checkout. A deposit may be required to confirm your booking, with the remaining balance due before travel according to your package terms.',
  },
]

const facts = [
  {
    id: 1,
    title: 'Security',
    description: 'Your security is our top priority',
    icon: SecurityCheckIcon,
    iconColorClass: 'text-pink-600',
    iconBgColorClass: 'bg-pink-50',
  },
  {
    id: 2,
    title: '24/7 Support',
    description: 'Our support team is available 24/7',
    icon: CustomerSupportIcon,
    iconColorClass: 'text-teal-600',
    iconBgColorClass: 'bg-teal-50',
  },
  {
    id: 3,
    title: 'Easy Booking',
    description: 'Booking a holiday has never been easier',
    icon: AccelerationIcon,
    iconColorClass: 'text-orange-600',
    iconBgColorClass: 'bg-orange-50',
  },
]

const FeatureSection2 = ({
  className,
  variant = 'down',
  heading = (
    <>
      Frequently asked <span data-slot="italic">questions</span>
    </>
  ),
  faqs = faqs_demo,
  imageUrl = 'https://images.pexels.com/photos/31776028/pexels-photo-31776028.jpeg',
}: FeatureSection2Props) => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className={clsx('flex flex-col justify-between gap-8 lg:flex-row', className)}>
      <div className="relative aspect-3/4 flex-1/2 overflow-hidden rounded-b-xl 2xl:flex-3/7">
        <Image
          src={imageUrl}
          fill
          alt=""
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          className="z-0 rounded-t-full"
        />

        <div className="absolute inset-x-4 bottom-4 flex flex-col items-center gap-2 sm:bottom-8 sm:gap-5">
          {facts.map((fact) => (
            <div key={fact.id} className="flex items-center gap-2 rounded-xl bg-white p-2 sm:gap-2.5 sm:p-4">
              <div className={`${fact.iconBgColorClass} rounded-lg p-2.5`}>
                <HugeiconsIcon icon={fact.icon} className={`size-7 ${fact.iconColorClass}`} />
              </div>
              <div>
                <Text className="text-sm font-medium text-neutral-900">{fact.title}</Text>
                <Text className="text-sm text-neutral-500">{fact.description}</Text>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex flex-1/2 lg:justify-center 2xl:flex-4/7">
        <div className={clsx('w-full max-w-md', variant === 'up' && 'self-end', variant === 'down' && 'self-start')}>
          {heading && <Heading className="mb-8 sm:mb-14">{heading}</Heading>}

          <dl className="divide-y divide-zinc-900/10">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index

              return (
                <div key={faq.question} className="py-6 first:pt-0 last:pb-0">
                  <dt>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="group flex w-full justify-between text-start"
                    >
                      <Text className="font-medium">{faq.question}</Text>
                      <span className="ms-6 self-center text-zinc-600 dark:text-zinc-400">
                        <PlusIcon
                          aria-hidden="true"
                          className={clsx('size-4 transition-opacity duration-300', isOpen && 'hidden')}
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className={clsx('size-4 transition-opacity duration-300', !isOpen && 'hidden')}
                        />
                      </span>
                    </button>
                  </dt>
                  <dd
                    className={clsx(
                      'grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out',
                      isOpen ? 'mt-3 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <Text className="max-w-sm text-zinc-600 dark:text-zinc-400">{faq.answer}</Text>
                    </div>
                  </dd>
                </div>
              )
            })}
            <dt className="mt-8 flex flex-wrap gap-3 sm:mt-12">
              <Button href="/contact">
                <HugeiconsIcon icon={BubbleChatQuestionIcon} className="size-5" />
                Get contact support
              </Button>
            </dt>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default FeatureSection2
