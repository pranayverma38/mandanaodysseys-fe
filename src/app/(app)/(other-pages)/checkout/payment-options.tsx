'use client'

import FormattedPrice from '@/components/formatted-price'
import Input from '@/components/input'
import { useLocale } from '@/providers/locale-provider'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import { useEffect, useId, useMemo, useState } from 'react'

export type PaymentMode = 'full' | 'partial' | 'remaining'

const DEPOSIT_MIN_PERCENT = 0.3

const toggleSpring = { type: 'spring' as const, stiffness: 420, damping: 34, mass: 0.75 }

const panelTransition = {
  height: { duration: 0.38, ease: [0.4, 0, 0.2, 1] as const },
  opacity: { duration: 0.28, ease: 'easeOut' as const },
}

interface Props {
  total: number
  onChange: (state: {
    mode: PaymentMode
    chargeAmount: number
    depositAmount: number
    isValid: boolean
  }) => void
}

function getMinDeposit(total: number) {
  return Math.ceil(total * DEPOSIT_MIN_PERCENT)
}

const PaymentOptions = ({ total, onChange }: Props) => {
  const depositFieldId = useId()
  const { currency } = useLocale()
  const [mode, setMode] = useState<PaymentMode>('full')
  const minDeposit = useMemo(() => getMinDeposit(total), [total])
  const [depositInput, setDepositInput] = useState(String(minDeposit))
  const [showDepositError, setShowDepositError] = useState(false)

  const parsedDeposit = Number.parseFloat(depositInput.replace(/,/g, ''))
  const depositAmount = Number.isFinite(parsedDeposit) ? parsedDeposit : 0
  const chargeAmount = mode === 'full' ? total : depositAmount
  const isDepositValid =
    mode === 'full' ||
    (depositAmount >= minDeposit && depositAmount <= total && Number.isFinite(parsedDeposit))
  const remainingBalance = Math.max(total - chargeAmount, 0)

  useEffect(() => {
    onChange({
      mode,
      chargeAmount,
      depositAmount: mode === 'partial' ? depositAmount : total,
      isValid: isDepositValid,
    })
  }, [mode, chargeAmount, depositAmount, isDepositValid, onChange])

  useEffect(() => {
    setDepositInput(String(minDeposit))
  }, [minDeposit])

  const handleModeChange = (nextMode: PaymentMode) => {
    setMode(nextMode)
    setShowDepositError(false)

    if (nextMode === 'partial') {
      setDepositInput(String(minDeposit))
    }
  }

  const currencySymbol = currency === 'AUD' ? 'A$' : currency === 'INR' ? '₹' : '$'

  return (
    <section className="flex flex-col gap-2.5">
      <h3 className="text-base font-medium sm:text-lg">Payment option</h3>

      <div
        className="relative grid grid-cols-2 rounded-xl border border-border bg-muted/40 p-0.5"
        role="group"
        aria-label="Payment option"
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-y-0.5 rounded-[0.65rem] bg-orange-500 shadow-sm ring-1 ring-orange-500 dark:ring-orange-400"
          style={{ width: 'calc(50% - 4px)' }}
          initial={false}
          animate={{ left: mode === 'full' ? 2 : 'calc(50% + 2px)' }}
          transition={toggleSpring}
        />

        <button
          type="button"
          aria-pressed={mode === 'full'}
          onClick={() => handleModeChange('full')}
          className={clsx(
            'relative z-10 rounded-[0.65rem] px-2.5 py-2 text-center text-sm font-medium transition-colors duration-200',
            mode === 'full' ? 'text-white' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Pay in full
        </button>

        <button
          type="button"
          aria-pressed={mode === 'partial'}
          onClick={() => handleModeChange('partial')}
          className={clsx(
            'relative z-10 rounded-[0.65rem] px-2.5 py-2 text-center text-sm font-medium transition-colors duration-200',
            mode === 'partial' ? 'text-white' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Pay deposit
        </button>
      </div>

      <AnimatePresence initial={false}>
        {mode === 'partial' && (
          <motion.div
            key="deposit-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={panelTransition}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
              className="mt-2.5 overflow-hidden rounded-2xl border border-orange-200/90 bg-[#faf6f1] p-4 dark:border-orange-500/30 dark:bg-orange-950/25"
            >
              <div className="flex items-start gap-2.5">
                <InformationCircleIcon className="mt-0.5 size-5 shrink-0 text-orange-600 dark:text-orange-400" />
                <p className="text-sm leading-snug text-[#8b5a2b] dark:text-orange-200/90">
                  Please deposit at least 30% upfront (
                  <span className="font-semibold notranslate">
                    <FormattedPrice value={minDeposit} />
                  </span>
                  ).
                </p>
              </div>

              <div className="mt-4">
                <label htmlFor={depositFieldId} className="text-sm font-semibold text-foreground">
                  Deposit amount
                </label>
                <div className="relative mt-2">
                  <span className="pointer-events-none absolute inset-y-0 start-4 flex items-center text-base text-muted-foreground">
                    {currencySymbol}
                  </span>
                  <Input
                    id={depositFieldId}
                    name="depositAmount"
                    type="number"
                    inputMode="decimal"
                    min={minDeposit}
                    max={total}
                    step="1"
                    value={depositInput}
                    onChange={(event) => {
                      setDepositInput(event.target.value)
                      setShowDepositError(false)
                    }}
                    onBlur={() => setShowDepositError(!isDepositValid)}
                    rounded="rounded-xl"
                    sizeClass="h-12 ps-9 pe-4 py-3 text-lg font-medium tracking-tight"
                    className={clsx(
                      'border-neutral-200/90 bg-white shadow-none [appearance:textfield] focus:border-orange-300 focus:ring-2 focus:ring-orange-500/15 dark:border-neutral-700 dark:bg-neutral-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
                      showDepositError && !isDepositValid && 'border-red-400 focus:border-red-400 focus:ring-red-400/15'
                    )}
                    aria-invalid={showDepositError && !isDepositValid}
                    aria-describedby={`${depositFieldId}-hint`}
                  />
                </div>
                <p id={`${depositFieldId}-hint`} className="mt-2 text-xs text-muted-foreground">
                  Min{' '}
                  <span className="notranslate">
                    <FormattedPrice value={minDeposit} />
                  </span>
                  {' · '}
                  Total{' '}
                  <span className="notranslate">
                    <FormattedPrice value={total} />
                  </span>
                </p>
                {showDepositError && !isDepositValid && (
                  <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                    Enter between{' '}
                    <span className="notranslate">
                      <FormattedPrice value={minDeposit} />
                    </span>{' '}
                    and{' '}
                    <span className="notranslate">
                      <FormattedPrice value={total} />
                    </span>
                    .
                  </p>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-orange-200/70 pt-3.5 text-sm dark:border-orange-500/25">
                <span className="text-muted-foreground">
                  Due today{' '}
                  <span className="font-bold text-foreground notranslate">
                    <FormattedPrice value={chargeAmount} />
                  </span>
                </span>
                <span className="text-muted-foreground/50">·</span>
                <span className="text-muted-foreground">
                  Remaining{' '}
                  <span className="notranslate">
                    <FormattedPrice value={remainingBalance} />
                  </span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <input type="hidden" name="paymentMode" value={mode} />
      <input type="hidden" name="chargeAmount" value={chargeAmount} />
    </section>
  )
}

export default PaymentOptions
