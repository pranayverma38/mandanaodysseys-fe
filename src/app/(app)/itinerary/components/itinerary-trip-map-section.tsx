import type { ItineraryThingToDo } from '@/data/itineraries/types'
import ItineraryMapExplorer from './itinerary-map-explorer'
import ItineraryThingsToDoSection from './itinerary-things-to-do-section'

interface Props {
  thingsToDo: ItineraryThingToDo[]
}

const ItineraryTripMapSection = ({ thingsToDo }: Props) => {
  if (thingsToDo.length === 0) {
    return null
  }

  return (
    <div id="itinerary-your-trip" className="scroll-mt-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-10 xl:gap-14">
        <div className="min-w-0">
          <ItineraryThingsToDoSection thingsToDo={thingsToDo} />
        </div>

        <div id="itinerary-map" className="min-w-0">
          <div className="h-80 w-full overflow-hidden rounded-xl sm:h-96 lg:sticky lg:top-[calc(50vh-min(20rem,(100vh-8rem)/2))] lg:h-[min(40rem,calc(100vh-8rem))]">
            <ItineraryMapExplorer thingsToDo={thingsToDo} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItineraryTripMapSection
