'use client'

import { Heading } from '@/components/heading'
import { Text } from '@/components/text'
import type { DestinationCityTemperature } from '@/data/destinations'
import clsx from 'clsx'
import { useMemo, useState } from 'react'

interface DestinationTemperatureChartProps {
  destinationName: string
  cities: DestinationCityTemperature[]
}

interface TemperatureRangeBarProps {
  min: number
  max: number
  average: number
  scaleMin: number
  scaleMax: number
}

function TemperatureRangeBar({ min, max, average, scaleMin, scaleMax }: TemperatureRangeBarProps) {
  const range = scaleMax - scaleMin || 1
  const leftPct = ((min - scaleMin) / range) * 100
  const widthPct = ((max - min) / range) * 100
  const avgPct = ((average - scaleMin) / range) * 100

  return (
    <div className="relative h-6 w-full">
      <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-neutral-200 dark:bg-neutral-700">
        <div
          className="absolute inset-y-0 rounded-full bg-teal-500"
          style={{ left: `${leftPct}%`, width: `${Math.max(widthPct, 2)}%` }}
        />
      </div>
      <span
        className="absolute top-1/2 -translate-x-full -translate-y-1/2 pr-1 text-[10px] font-semibold text-teal-600 sm:pr-1.5 sm:text-xs"
        style={{ left: `${leftPct}%` }}
      >
        {min}
      </span>
      <span
        className="absolute top-1/2 -translate-y-1/2 translate-x-1 text-[10px] font-semibold text-rose-400 sm:translate-x-1.5 sm:text-xs"
        style={{ left: `${leftPct + widthPct}%` }}
      >
        {max}
      </span>
      <div
        className="absolute top-1/2 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-teal-500 text-[10px] font-semibold text-white ring-2 ring-white sm:size-7 sm:text-[11px] dark:ring-neutral-900"
        style={{ left: `${avgPct}%` }}
      >
        {average}
      </div>
    </div>
  )
}

interface RainfallBarProps {
  value: number
  scaleMax: number
}

function RainfallBar({ value, scaleMax }: RainfallBarProps) {
  const widthPct = scaleMax > 0 ? (value / scaleMax) * 100 : 0
  const markerLeft = Math.min(Math.max(widthPct, 8), 92)

  return (
    <div className="relative h-6 w-full">
      <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-neutral-200 dark:bg-neutral-700" />
      {value > 0 && (
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-amber-400"
          style={{ width: `${Math.max(widthPct, 2)}%` }}
        />
      )}
      <div
        className="absolute top-1/2 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amber-400 text-[10px] font-semibold text-white ring-2 ring-white sm:size-7 sm:text-[11px] dark:ring-neutral-900"
        style={{ left: `${markerLeft}%` }}
      >
        {value}
      </div>
    </div>
  )
}

export function DestinationTemperatureChart({ destinationName, cities }: DestinationTemperatureChartProps) {
  const months = cities[0]?.temperatures ?? []

  const [selectedIndex, setSelectedIndex] = useState(() => {
    const currentMonth = new Date().toLocaleString('en-US', { month: 'short' })
    const match = months.findIndex((item) => item.month === currentMonth)
    return match >= 0 ? match : 0
  })

  const { scaleMin, scaleMax, rainfallMax } = useMemo(() => {
    const allTemps = cities.flatMap((city) =>
      city.temperatures.flatMap((item) => [item.avgHighC, item.avgLowC])
    )
    const allRain = cities.flatMap((city) => city.temperatures.map((item) => item.rainfallMm))
    return {
      scaleMin: Math.min(...allTemps) - 2,
      scaleMax: Math.max(...allTemps) + 2,
      rainfallMax: Math.max(...allRain, 1),
    }
  }, [cities])

  return (
    <section className="space-y-5">
      <div>
        <Heading level={2}>
          Temperatures throughout <span data-slot="italic">the year</span>
        </Heading>
        <Text className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Compare monthly temperatures and rainfall across top cities in {destinationName}.
        </Text>
      </div>

      <div className="overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800/60">
        <div className="hidden-scrollbar flex overflow-x-auto px-1.5 pt-1.5">
          {months.map((item, index) => {
            const isSelected = index === selectedIndex

            return (
              <button
                key={item.month}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-pressed={isSelected}
                aria-label={item.month}
                className={clsx(
                  'shrink-0 px-2.5 py-1.5 text-[11px] font-bold tracking-wide uppercase sm:px-3 sm:text-xs',
                  isSelected
                    ? 'rounded-t-lg bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100'
                    : 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
                )}
              >
                {item.month}
              </button>
            )
          })}
        </div>

        <div className="bg-white px-3 py-3 sm:px-4 sm:py-3.5 dark:bg-neutral-900">
          <div className="mb-2 hidden text-[11px] font-medium text-neutral-500 sm:grid sm:grid-cols-[minmax(88px,100px)_1fr_1fr] sm:gap-3 dark:text-neutral-400">
            <span>Location</span>
            <span>Avg. temperature (°C)</span>
            <span>Rainfall (mm)</span>
          </div>

          <div className="space-y-2.5">
            {cities.map((city) => {
              const monthData = city.temperatures[selectedIndex]
              const averageTemp = Math.round((monthData.avgHighC + monthData.avgLowC) / 2)

              return (
                <div
                  key={city.city}
                  className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[minmax(88px,100px)_1fr_1fr] sm:gap-3"
                >
                  <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {city.city}
                  </p>
                  <TemperatureRangeBar
                    min={monthData.avgLowC}
                    max={monthData.avgHighC}
                    average={averageTemp}
                    scaleMin={scaleMin}
                    scaleMax={scaleMax}
                  />
                  <RainfallBar value={monthData.rainfallMm} scaleMax={rainfallMax} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
