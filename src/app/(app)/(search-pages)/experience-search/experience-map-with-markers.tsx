'use client'

import { Map, MapControls, MapMarker, MarkerContent, MarkerTooltip } from '@/components/ui/map'
import type { ItineraryLocation } from '@/data/itineraries/types'
import type { TItineraryListing } from '@/data/listings'
import MapLibreGL from 'maplibre-gl'
import { useEffect, useMemo, useRef } from 'react'

interface Props {
  currentHoverID: string
  listings: TItineraryListing[]
}

const DEFAULT_CENTER = { lat: 15, lng: 90 }

function fitMapToLocations(
  map: MapLibreGL.Map,
  locations: ItineraryLocation[],
  options?: { padding?: number; maxZoom?: number }
) {
  const { padding = 60, maxZoom = 11 } = options ?? {}

  if (locations.length === 0) {
    map.easeTo({ center: [DEFAULT_CENTER.lng, DEFAULT_CENTER.lat], zoom: 2, duration: 500 })
    return
  }

  if (locations.length === 1) {
    map.easeTo({ center: [locations[0].lng, locations[0].lat], zoom: 10, duration: 500 })
    return
  }

  const bounds = new MapLibreGL.LngLatBounds()
  locations.forEach((location) => bounds.extend([location.lng, location.lat]))
  map.fitBounds(bounds, { padding, maxZoom, duration: 500 })
}

function fitMapToListings(map: MapLibreGL.Map, listings: TItineraryListing[]) {
  const locations = listings.flatMap((listing) => listing.locations)
  fitMapToLocations(map, locations, { padding: 80, maxZoom: 4 })
}

const ExperienceMapWithMarkers = ({ currentHoverID, listings }: Props) => {
  const mapRef = useRef<MapLibreGL.Map>(null)

  const hoveredListing = useMemo(
    () => listings.find((listing) => listing.id === currentHoverID),
    [currentHoverID, listings]
  )

  const visibleLocations = hoveredListing?.locations ?? []

  const initialCenter = useMemo(() => {
    const first = listings[0]?.locations[0]
    return first ? { lat: first.lat, lng: first.lng } : DEFAULT_CENTER
  }, [listings])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const runFit = () => {
      if (hoveredListing) {
        fitMapToLocations(map, hoveredListing.locations)
        return
      }

      fitMapToListings(map, listings)
    }

    if (map.isStyleLoaded()) {
      runFit()
      return
    }

    map.once('load', runFit)
    return () => {
      map.off('load', runFit)
    }
  }, [hoveredListing, listings])

  return (
    <Map ref={mapRef} center={initialCenter} zoom={2}>
      <MapControls position="bottom-right" showZoom showFullscreen />
      {visibleLocations.map((location) => (
        <MapMarker key={`${currentHoverID}-${location.name}`} longitude={location.lng} latitude={location.lat}>
          <MarkerContent>
            <div className="size-3 rounded-full border-2 border-white bg-[#FC6200] shadow-lg" />
          </MarkerContent>
          <MarkerTooltip>{location.name}</MarkerTooltip>
        </MapMarker>
      ))}
    </Map>
  )
}

export default ExperienceMapWithMarkers
