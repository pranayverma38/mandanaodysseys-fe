'use client'

import { Map, MapMarker, MapRoute, MarkerContent, MarkerTooltip } from '@/components/ui/map'
import type { ItineraryThingToDo } from '@/data/itineraries/types'
import clsx from 'clsx'
import MapLibreGL from 'maplibre-gl'
import { useCallback, useEffect, useMemo, useRef } from 'react'

interface Props {
  thingsToDo: ItineraryThingToDo[]
  activeIndex: number
  isOpen: boolean
}

const TARGET_ZOOM = 12
const ZOOM_OUT_OFFSET = 1.5
const ZOOM_OUT_DURATION_MS = 450
const ZOOM_IN_DURATION_MS = 900

const ItineraryDayFocusMap = ({ thingsToDo, activeIndex, isOpen }: Props) => {
  const mapRef = useRef<MapLibreGL.Map>(null)
  const settledIndexRef = useRef<number | null>(null)
  const animationGenerationRef = useRef(0)
  const initialCenter = useMemo(() => thingsToDo[0] ?? { lat: 0, lng: 0 }, [thingsToDo])
  const activeItem = thingsToDo[activeIndex]
  const routeCoordinates = useMemo(
    () => thingsToDo.map((item) => [item.lng, item.lat] as [number, number]),
    [thingsToDo]
  )
  const progressCoordinates = useMemo(
    () => thingsToDo.slice(0, activeIndex + 1).map((item) => [item.lng, item.lat] as [number, number]),
    [thingsToDo, activeIndex]
  )

  const flyToDay = useCallback(
    (index: number, animate: boolean) => {
      const map = mapRef.current
      const item = thingsToDo[index]
      if (!map || !item) {
        return
      }

      const generation = ++animationGenerationRef.current
      const isCurrent = () => animationGenerationRef.current === generation
      const targetCenter: [number, number] = [item.lng, item.lat]
      const shouldAnimate =
        animate && settledIndexRef.current !== null && settledIndexRef.current !== index

      map.resize()

      if (!shouldAnimate) {
        map.jumpTo({ center: targetCenter, zoom: TARGET_ZOOM })
        settledIndexRef.current = index
        return
      }

      const zoomOut = Math.max(map.getZoom() - ZOOM_OUT_OFFSET, 7.5)

      map.flyTo({
        center: map.getCenter(),
        zoom: zoomOut,
        duration: ZOOM_OUT_DURATION_MS,
        essential: true,
        easing: (t) => t,
      })

      map.once('moveend', function handleZoomOutEnd() {
        if (!isCurrent()) {
          return
        }

        map.flyTo({
          center: targetCenter,
          zoom: TARGET_ZOOM,
          duration: ZOOM_IN_DURATION_MS,
          essential: true,
          easing: (t) => t * (2 - t),
        })

        map.once('moveend', function handleZoomInEnd() {
          if (!isCurrent()) {
            return
          }
          settledIndexRef.current = index
        })
      })
    },
    [thingsToDo]
  )

  useEffect(() => {
    if (!isOpen) {
      settledIndexRef.current = null
      animationGenerationRef.current += 1
      return
    }

    let intervalId: number | undefined

    const run = () => {
      if (settledIndexRef.current === null) {
        flyToDay(activeIndex, false)
        return
      }

      if (settledIndexRef.current !== activeIndex) {
        flyToDay(activeIndex, true)
      }
    }

    const tryRun = () => {
      if (!mapRef.current?.isStyleLoaded()) {
        return false
      }

      run()
      return true
    }

    if (!tryRun()) {
      intervalId = window.setInterval(() => {
        if (tryRun() && intervalId) {
          window.clearInterval(intervalId)
        }
      }, 50)
    }

    return () => {
      animationGenerationRef.current += 1
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [activeIndex, flyToDay, isOpen])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !isOpen) {
      return
    }

    const handleResize = () => {
      map.resize()
    }

    window.addEventListener('resize', handleResize)

    const container = map.getContainer()
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    return () => {
      window.removeEventListener('resize', handleResize)
      resizeObserver.disconnect()
    }
  }, [isOpen])

  if (!activeItem) {
    return null
  }

  return (
    <Map ref={mapRef} center={[initialCenter.lng, initialCenter.lat]} zoom={4}>
      {routeCoordinates.length >= 2 ? (
        <MapRoute coordinates={routeCoordinates} color="#FC6200" width={2} opacity={0.25} interactive={false} />
      ) : null}
      {progressCoordinates.length >= 2 ? (
        <MapRoute coordinates={progressCoordinates} color="#FC6200" width={3} opacity={0.9} interactive={false} />
      ) : null}
      {thingsToDo.map((item, index) => (
        <MapMarker key={`${item.lat}-${item.lng}-${index}`} longitude={item.lng} latitude={item.lat}>
          <MarkerContent>
            <div
              className={clsx(
                'rounded-full border-2 border-white bg-[#FC6200] shadow-lg transition-all duration-500',
                index === activeIndex ? 'size-3.5 ring-4 ring-[#FC6200]/30' : 'size-3',
                index > activeIndex && 'bg-[#FC6200]/70 opacity-50'
              )}
            />
          </MarkerContent>
          <MarkerTooltip>{item.name}</MarkerTooltip>
        </MapMarker>
      ))}
    </Map>
  )
}

export default ItineraryDayFocusMap
