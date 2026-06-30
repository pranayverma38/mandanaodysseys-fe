'use client'

import { Heading } from '@/components/heading'
import { Text } from '@/components/text'
import type { DestinationMonthlyTemperature } from '@/data/destinations'
import clsx from 'clsx'
import { useCallback, useMemo, useState } from 'react'

interface DestinationTemperatureChartProps {
  location: string
  temperatures: DestinationMonthlyTemperature[]
}

const CHART_HEIGHT = 220
const CHART_PADDING = { top: 16, right: 16, bottom: 36, left: 44 }

function buildPoints(
  temperatures: DestinationMonthlyTemperature[],
  width: number,
  minTemp: number,
  maxTemp: number,
  accessor: (item: DestinationMonthlyTemperature) => number
) {
  const innerWidth = width - CHART_PADDING.left - CHART_PADDING.right
  const innerHeight = CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom
  const range = maxTemp - minTemp || 1

  return temperatures.map((item, index) => {
    const x = CHART_PADDING.left + (index / (temperatures.length - 1)) * innerWidth
    const y = CHART_PADDING.top + innerHeight - ((accessor(item) - minTemp) / range) * innerHeight
    return { x, y, item }
  })
}

function pointsToPath(points: { x: number; y: number }[]) {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
}

export function DestinationTemperatureChart({ location, temperatures }: DestinationTemperatureChartProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  const activeIndex = hoverIndex ?? selectedIndex
  const activeMonth = temperatures[activeIndex]

  const { minTemp, maxTemp, highPoints, lowPoints, areaPath } = useMemo(() => {
    const allTemps = temperatures.flatMap((item) => [item.avgHighC, item.avgLowC])
    const min = Math.floor(Math.min(...allTemps) - 2)
    const max = Math.ceil(Math.max(...allTemps) + 2)
    const width = 640
    const highs = buildPoints(temperatures, width, min, max, (item) => item.avgHighC)
    const lows = buildPoints(temperatures, width, min, max, (item) => item.avgLowC)

    const area =
      highs.length > 0
        ? `${pointsToPath(highs)} L ${lows[lows.length - 1].x} ${lows[lows.length - 1].y} ${[...lows]
            .reverse()
            .map((point) => `L ${point.x} ${point.y}`)
            .join(' ')} Z`
        : ''

    return { minTemp: min, maxTemp: max, highPoints: highs, lowPoints: lows, areaPath: area }
  }, [temperatures])

  const yTicks = useMemo(() => {
    const step = Math.ceil((maxTemp - minTemp) / 4)
    return Array.from({ length: 5 }, (_, index) => minTemp + index * step)
  }, [minTemp, maxTemp])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setSelectedIndex(Math.min(index + 1, temperatures.length - 1))
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setSelectedIndex(Math.max(index - 1, 0))
      }
    },
    [temperatures.length]
  )

  return (
    <section className="space-y-8">
      <div>
        <Heading level={2}>
          Temperatures throughout <span data-slot="italic">the year</span>
        </Heading>
        <Text className="mt-3 max-w-3xl text-muted-foreground">
          Average monthly highs and lows in {location}. Hover or tap a month to explore — based on official
          climatological normals.
        </Text>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-8 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{location}</p>
            <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
              {activeMonth.month}
            </p>
          </div>
          <div className="flex gap-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">High</p>
              <p className="text-xl font-semibold text-[#FC6200]">{activeMonth.avgHighC}°C</p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">Low</p>
              <p className="text-xl font-semibold text-sky-600">{activeMonth.avgLowC}°C</p>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <svg viewBox="0 0 640 220" className="min-w-160 w-full" role="img" aria-label={`Temperature chart for ${location}`}>
            {yTicks.map((tick) => {
              const y =
                CHART_PADDING.top +
                (CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom) *
                  (1 - (tick - minTemp) / (maxTemp - minTemp))

              return (
                <g key={tick}>
                  <line
                    x1={CHART_PADDING.left}
                    x2={640 - CHART_PADDING.right}
                    y1={y}
                    y2={y}
                    className="stroke-neutral-200 dark:stroke-neutral-700"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={CHART_PADDING.left - 8}
                    y={y + 4}
                    textAnchor="end"
                    className="fill-neutral-500 text-[10px]"
                  >
                    {tick}°
                  </text>
                </g>
              )
            })}

            <path d={areaPath} className="fill-[#FC6200]/10" />

            <path
              d={pointsToPath(highPoints)}
              fill="none"
              className="stroke-[#FC6200]"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={pointsToPath(lowPoints)}
              fill="none"
              className="stroke-sky-500"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {highPoints.map((point, index) => {
              const isActive = index === activeIndex

              return (
                <g key={point.item.month}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isActive ? 6 : 4}
                    className={clsx(
                      'cursor-pointer transition-all',
                      isActive ? 'fill-[#FC6200]' : 'fill-[#FC6200]/60 hover:fill-[#FC6200]'
                    )}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                    onClick={() => setSelectedIndex(index)}
                    onFocus={() => setSelectedIndex(index)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${point.item.month}: high ${point.item.avgHighC} degrees, low ${point.item.avgLowC} degrees`}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                  />
                  <circle
                    cx={lowPoints[index].x}
                    cy={lowPoints[index].y}
                    r={isActive ? 6 : 4}
                    className={clsx(
                      'cursor-pointer transition-all',
                      isActive ? 'fill-sky-500' : 'fill-sky-500/60 hover:fill-sky-500'
                    )}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                    onClick={() => setSelectedIndex(index)}
                  />
                  <text
                    x={point.x}
                    y={CHART_HEIGHT - 8}
                    textAnchor="middle"
                    className={clsx(
                      'fill-neutral-500 text-[10px] sm:text-xs',
                      isActive && 'fill-neutral-900 font-semibold dark:fill-neutral-100'
                    )}
                  >
                    {point.item.month}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#FC6200]" />
            Average high
          </span>
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-sky-500" />
            Average low
          </span>
        </div>
      </div>
    </section>
  )
}
