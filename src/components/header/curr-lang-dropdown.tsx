'use client'

import { getCurrencies, getLanguages } from '@/data/navigation'
import { useHoverPopover } from '@/hooks/use-hover-popover'
import type { CurrencyCode, LanguageCode } from '@/lib/locale/constants'
import { useLocale } from '@/providers/locale-provider'
import {
  CloseButton,
  Popover,
  PopoverPanel,
  PopoverPanelProps,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { Globe02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { FC, ReactNode } from 'react'
import { ButtonCircle } from '../button'
import { HeaderPopoverTrigger } from './header-popover-trigger'

const Currencies = ({
  currencies,
  activeCurrency,
  onSelect,
}: {
  currencies: Awaited<ReturnType<typeof getCurrencies>>
  activeCurrency: CurrencyCode
  onSelect: (currency: CurrencyCode) => void
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {currencies.map((item) => (
        <CloseButton
          as="button"
          type="button"
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={clsx(
            'flex items-center rounded-lg p-2.5 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-hidden dark:hover:bg-neutral-700',
            activeCurrency === item.id ? 'bg-neutral-100 dark:bg-neutral-700' : 'opacity-80'
          )}
        >
          <div dangerouslySetInnerHTML={{ __html: item.icon }} />
          <p className="ms-2 text-sm font-medium notranslate">{item.name}</p>
        </CloseButton>
      ))}
    </div>
  )
}

const Languages = ({
  languages,
  activeLanguage,
  onSelect,
}: {
  languages: Awaited<ReturnType<typeof getLanguages>>
  activeLanguage: LanguageCode
  onSelect: (language: LanguageCode) => void
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {languages.map((item) => (
        <CloseButton
          as="button"
          type="button"
          key={item.id}
          onClick={() => onSelect(item.code)}
          className={clsx(
            'flex items-center rounded-lg p-2.5 text-start transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-hidden dark:hover:bg-neutral-700',
            activeLanguage === item.code ? 'bg-neutral-100 dark:bg-neutral-700' : 'opacity-80'
          )}
        >
          <div>
            <p className="text-sm font-medium notranslate">{item.name}</p>
            <p className="text-xs text-neutral-500 notranslate dark:text-neutral-400">{item.description}</p>
          </div>
        </CloseButton>
      ))}
    </div>
  )
}

interface Props {
  panelAnchor?: PopoverPanelProps['anchor']
  panelClassName?: PopoverPanelProps['className']

  className?: string
  triggerButton?: ReactNode
  popoverId?: string
}

const CurrLangDropdown: FC<Props> = ({
  panelAnchor = {
    to: 'bottom end',
    gap: 12,
  },
  className,
  panelClassName = 'w-sm',
  triggerButton,
  popoverId,
}) => {
  const { language, currency, setLanguage, setCurrency } = useLocale()
  const { getTriggerHandlers, getPanelHandlers } = useHoverPopover(popoverId)
  const currencies = getCurrencies()
  const languages = getLanguages()

  return (
    <Popover className={clsx('group/popover relative', className)}>
      {({ open, close }) => (
        <>
          <HeaderPopoverTrigger
            triggerButton={triggerButton}
            triggerHandlers={getTriggerHandlers(open, close)}
            fallback={
              <ButtonCircle color="accent">
                <HugeiconsIcon icon={Globe02Icon} size={22} />
              </ButtonCircle>
            }
          />

          <PopoverPanel
            {...getPanelHandlers(close)}
            anchor={panelAnchor}
            transition
            className={clsx(
              'z-20 rounded-3xl shadow-lg-for-card bg-card p-6 transition duration-200 ease-in-out data-closed:translate-y-1 data-closed:opacity-0',
              panelClassName
            )}
          >
            <TabGroup>
              <TabList className="flex space-x-1 rounded-full bg-accent p-1">
                {['Language', 'Currency'].map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      clsx(
                        'w-full rounded-full py-2 text-sm leading-5 font-medium text-neutral-700 focus:ring-0 focus:outline-hidden notranslate',
                        selected
                          ? 'bg-white shadow-sm'
                          : 'text-neutral-700 hover:bg-white/70 dark:text-neutral-300 dark:hover:bg-neutral-900/40'
                      )
                    }
                  >
                    {category}
                  </Tab>
                ))}
              </TabList>
              <TabPanels className="mt-5">
                <TabPanel className="rounded-xl p-3 focus:ring-0 focus:outline-hidden">
                  <Languages languages={languages} activeLanguage={language} onSelect={setLanguage} />
                </TabPanel>
                <TabPanel className="rounded-xl p-3 focus:ring-0 focus:outline-hidden">
                  <Currencies currencies={currencies} activeCurrency={currency} onSelect={setCurrency} />
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </PopoverPanel>
        </>
      )}
    </Popover>
  )
}
export default CurrLangDropdown
