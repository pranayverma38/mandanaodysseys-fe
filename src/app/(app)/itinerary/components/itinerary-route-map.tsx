'use client'

import { Map, MapMarker, MapRoute, MarkerContent, MarkerPopup, MarkerTooltip } from '@/components/ui/map'
import { getItineraryMapStops } from '@/data/itineraries/map-stops'
import type { ItineraryThingToDo } from '@/data/itineraries/types'
import MapLibreGL from 'maplibre-gl'
import { useCallback, useEffect, useMemo, useRef } from 'react'

interface Props {
  thingsToDo: ItineraryThingToDo[]
}

const FIT_PADDING = { top: 64, bottom: 64, left: 64, right: 64 } as const
const MIN_BOUNDS_SPAN = 0.02

function fitMapToStops(map: MapLibreGL.Map, stops: { lat: number; lng: number }[]) {
  map.resize()

  if (stops.length === 0) {
    return
  }

  if (stops.length === 1) {
    map.easeTo({ center: [stops[0].lng, stops[0].lat], zoom: 11, duration: 500 })
    return
  }

  const bounds = new MapLibreGL.LngLatBounds()
  stops.forEach((stop) => bounds.extend([stop.lng, stop.lat]))

  const northEast = bounds.getNorthEast()
  const southWest = bounds.getSouthWest()
  const latSpan = northEast.lat - southWest.lat
  const lngSpan = northEast.lng - southWest.lng

  if (latSpan < MIN_BOUNDS_SPAN || lngSpan < MIN_BOUNDS_SPAN) {
    const center = bounds.getCenter()
    bounds.extend([center.lng - MIN_BOUNDS_SPAN / 2, center.lat - MIN_BOUNDS_SPAN / 2])
    bounds.extend([center.lng + MIN_BOUNDS_SPAN / 2, center.lat + MIN_BOUNDS_SPAN / 2])
  }

  map.fitBounds(bounds, { padding: FIT_PADDING, maxZoom: 15, duration: 500 })
}

const ItineraryRouteMap = ({ thingsToDo }: Props) => {
  const mapRef = useRef<MapLibreGL.Map>(null)
  const stops = useMemo(() => getItineraryMapStops(thingsToDo), [thingsToDo])
  const routeCoordinates = useMemo(
    () => stops.map((stop) => [stop.lng, stop.lat] as [number, number]),
    [stops]
  )
  const initialCenter = stops[0] ?? { lat: 0, lng: 0 }

  const fitToStops = useCallback((map: MapLibreGL.Map) => {
    if (stops.length === 0) {
      return
    }

    const runFit = () => fitMapToStops(map, stops)

    if (map.isStyleLoaded()) {
      requestAnimationFrame(runFit)
      return
    }

    map.once('load', runFit)
  }, [stops])

  useEffect(() => {
    if (stops.length === 0) {
      return
    }

    let cancelled = false
    let intervalId: number | undefined

    const attachFit = (map: MapLibreGL.Map) => {
      if (!cancelled) {
        fitToStops(map)
      }
    }

    const map = mapRef.current
    if (map) {
      attachFit(map)
    } else {
      intervalId = window.setInterval(() => {
        const currentMap = mapRef.current
        if (currentMap) {
          window.clearInterval(intervalId)
          attachFit(currentMap)
        }
      }, 50)
    }

    return () => {
      cancelled = true
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [fitToStops, stops.length])

  useEffect(() => {
    const map = mapRef.current
    if (!map || stops.length === 0) {
      return
    }

    const handleResize = () => fitMapToStops(map, stops)
    window.addEventListener('resize', handleResize)

    const container = map.getContainer()
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    return () => {
      window.removeEventListener('resize', handleResize)
      resizeObserver.disconnect()
    }
  }, [stops])

  if (stops.length === 0) {
    return null
  }

  return (
    <Map ref={mapRef} center={[initialCenter.lng, initialCenter.lat]} zoom={4}>
      {routeCoordinates.length >= 2 ? (
        <MapRoute coordinates={routeCoordinates} color="#FC6200" width={3} opacity={0.85} interactive={false} />
      ) : null}
      {stops.map((stop, index) => (
        <MapMarker key={`${stop.lat}-${stop.lng}-${index}`} longitude={stop.lng} latitude={stop.lat}>
          <MarkerContent>
            <div className="size-3 rounded-full border-2 border-white bg-[#FC6200] shadow-lg" />
          </MarkerContent>
          <MarkerTooltip>{stop.name}</MarkerTooltip>
          <MarkerPopup>
            <div className="space-y-1">
              <p className="font-medium text-foreground">{stop.name}</p>
              <p className="text-xs text-muted-foreground">
                Stop {index + 1} of {stops.length}
              </p>
            </div>
          </MarkerPopup>
        </MapMarker>
      ))}
    </Map>
  )
}

export default ItineraryRouteMap
