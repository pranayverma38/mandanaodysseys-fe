'use client'

import { Map, MapMarker, MapRoute, MarkerContent, MarkerTooltip } from '@/components/ui/map'
import type { ItineraryThingToDo } from '@/data/itineraries/types'
import clsx from 'clsx'
import MapLibreGL from 'maplibre-gl'
import { useEffect, useMemo, useRef, type RefObject } from 'react'

interface Props {
  thingsToDo: ItineraryThingToDo[]
  activeIndex: number
  isOpen: boolean
}

const FLY_DURATION_MS = 1600

function attachMapWhenReady(mapRef: RefObject<MapLibreGL.Map | null>, callback: (map: MapLibreGL.Map) => void) {
  const map = mapRef.current
  if (!map) {
    return false
  }

  const run = () => callback(map)

  if (map.isStyleLoaded()) {
    requestAnimationFrame(run)
    return true
  }

  map.once('load', run)
  return true
}

const ItineraryDayFocusMap = ({ thingsToDo, activeIndex, isOpen }: Props) => {
  const mapRef = useRef<MapLibreGL.Map>(null)
  const previousIndexRef = useRef<number | null>(null)
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

  useEffect(() => {
    if (!isOpen) {
      previousIndexRef.current = null
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !activeItem) {
      return
    }

    let cancelled = false
    let intervalId: number | undefined
    const indexChanged = previousIndexRef.current !== null && previousIndexRef.current !== activeIndex
    previousIndexRef.current = activeIndex

    const moveToActiveStop = (map: MapLibreGL.Map) => {
      if (cancelled) {
        return
      }

      map.resize()

      const camera = {
        center: [activeItem.lng, activeItem.lat] as [number, number],
        zoom: 12,
        duration: indexChanged ? FLY_DURATION_MS : 0,
        essential: true,
      }

      if (indexChanged) {
        map.flyTo(camera)
      } else {
        map.jumpTo(camera)
      }
    }

    const tryAttach = () => {
      if (attachMapWhenReady(mapRef, moveToActiveStop)) {
        if (intervalId) {
          window.clearInterval(intervalId)
        }
        return true
      }

      return false
    }

    if (!tryAttach()) {
      intervalId = window.setInterval(() => tryAttach(), 50)
    }

    return () => {
      cancelled = true
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [activeIndex, activeItem, isOpen])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !isOpen) {
      return
    }

    const handleResize = () => {
      map.resize()

      const item = thingsToDo[activeIndex]
      if (item) {
        map.jumpTo({ center: [item.lng, item.lat], zoom: map.getZoom() })
      }
    }

    window.addEventListener('resize', handleResize)

    const container = map.getContainer()
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    return () => {
      window.removeEventListener('resize', handleResize)
      resizeObserver.disconnect()
    }
  }, [activeIndex, isOpen, thingsToDo])

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
