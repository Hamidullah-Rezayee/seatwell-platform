"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SeatMapProps {
  selectedSeats: string[]
  onSeatSelect: (seatId: string) => void
}

// Mock seat data - in a real app this would come from an API
const seatSections = [
  {
    name: "Section A",
    rows: [
      { name: "Row 1", seats: ["A1-1", "A1-2", "A1-3", "A1-4", "A1-5", "A1-6"] },
      { name: "Row 2", seats: ["A2-1", "A2-2", "A2-3", "A2-4", "A2-5", "A2-6"] },
      { name: "Row 3", seats: ["A3-1", "A3-2", "A3-3", "A3-4", "A3-5", "A3-6"] },
    ],
  },
  {
    name: "Section B",
    rows: [
      { name: "Row 1", seats: ["B1-1", "B1-2", "B1-3", "B1-4", "B1-5", "B1-6"] },
      { name: "Row 2", seats: ["B2-1", "B2-2", "B2-3", "B2-4", "B2-5", "B2-6"] },
      { name: "Row 3", seats: ["B3-1", "B3-2", "B3-3", "B3-4", "B3-5", "B3-6"] },
    ],
  },
]

// Mock unavailable seats
const unavailableSeats = ["A1-2", "A2-4", "B1-1", "B2-3", "B3-5"]

export function SeatMap({ selectedSeats, onSeatSelect }: SeatMapProps) {
  const isSeatAvailable = (seatId: string) => !unavailableSeats.includes(seatId)
  const isSeatSelected = (seatId: string) => selectedSeats.includes(seatId)

  return (
    <div className="space-y-8">
      {/* Stage/Field indicator */}
      <div className="text-center">
        <div className="bg-muted rounded-lg py-4 px-8 inline-block">
          <span className="text-sm font-medium text-muted-foreground">FIELD / STAGE</span>
        </div>
      </div>

      {/* Seat sections */}
      <div className="space-y-8">
        {seatSections.map((section) => (
          <div key={section.name} className="space-y-4">
            <h3 className="font-semibold text-center">{section.name}</h3>
            <div className="space-y-2">
              {section.rows.map((row) => (
                <div key={row.name} className="flex items-center justify-center gap-2">
                  <span className="text-xs text-muted-foreground w-12 text-right">{row.name}</span>
                  <div className="flex gap-1">
                    {row.seats.map((seatId) => (
                      <Button
                        key={seatId}
                        variant="outline"
                        size="sm"
                        className={cn(
                          "w-8 h-8 p-0 text-xs",
                          !isSeatAvailable(seatId) && "bg-red-100 border-red-300 text-red-600 cursor-not-allowed",
                          isSeatAvailable(seatId) &&
                            !isSeatSelected(seatId) &&
                            "bg-green-100 border-green-300 text-green-700 hover:bg-green-200",
                          isSeatSelected(seatId) && "bg-primary text-primary-foreground border-primary",
                        )}
                        disabled={!isSeatAvailable(seatId)}
                        onClick={() => isSeatAvailable(seatId) && onSeatSelect(seatId)}
                      >
                        {seatId.split("-")[1]}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  )
}
