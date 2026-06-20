export function getItineraryDayLabel(time: string, index: number) {
  const match = time.match(/Day\s+(\d+)/i)
  const dayNumber = match ? Number.parseInt(match[1], 10) : index + 1

  return { dayNumber, label: `Day ${dayNumber}` }
}
