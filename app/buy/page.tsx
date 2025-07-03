import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";

const games = [
  {
    id: "1",
    homeTeam: "Lions",
    awayTeam: "Tigers",
    date: "2024-01-15",
    time: "19:30",
    venue: "Stadium Arena",
    ticketsAvailable: true,
    availableCount: 12,
    priceRange: "$45 - $120",
  },
  {
    id: "2",
    homeTeam: "Lions",
    awayTeam: "Eagles",
    date: "2024-01-22",
    time: "20:00",
    venue: "Stadium Arena",
    ticketsAvailable: false,
    availableCount: 0,
    priceRange: "N/A",
  },
  {
    id: "3",
    homeTeam: "Lions",
    awayTeam: "Wolves",
    date: "2024-01-29",
    time: "19:00",
    venue: "Stadium Arena",
    ticketsAvailable: true,
    availableCount: 8,
    priceRange: "$50 - $95",
  },
  {
    id: "4",
    homeTeam: "Lions",
    awayTeam: "Bears",
    date: "2024-02-05",
    time: "18:30",
    venue: "Stadium Arena",
    ticketsAvailable: true,
    availableCount: 15,
    priceRange: "$40 - $110",
  },
  {
    id: "5",
    homeTeam: "Lions",
    awayTeam: "Panthers",
    date: "2024-02-12",
    time: "19:30",
    venue: "Stadium Arena",
    ticketsAvailable: false,
    availableCount: 0,
    priceRange: "N/A",
  },
  {
    id: "6",
    homeTeam: "Lions",
    awayTeam: "Hawks",
    date: "2024-02-19",
    time: "20:00",
    venue: "Stadium Arena",
    ticketsAvailable: true,
    availableCount: 6,
    priceRange: "$55 - $130",
  },
];

export default function BuyTicketsPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Buy Tickets</h1>
          <p className="text-muted-foreground">
            Browse upcoming games and purchase tickets from verified season
            ticket holders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card key={game.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge
                    variant={game.ticketsAvailable ? "default" : "secondary"}
                  >
                    {game.ticketsAvailable
                      ? `${game.availableCount} Available`
                      : "No Tickets"}
                  </Badge>
                  {game.ticketsAvailable && (
                    <span className="text-sm font-medium text-primary">
                      {game.priceRange}
                    </span>
                  )}
                </div>
                <CardTitle className="text-xl">
                  {game.homeTeam} vs {game.awayTeam}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(game.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {game.venue} • {game.time}
                  </div>
                  {game.ticketsAvailable && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      {game.availableCount} tickets from season holders
                    </div>
                  )}
                </div>

                <Button
                  asChild
                  className="w-full"
                  variant={game.ticketsAvailable ? "default" : "secondary"}
                  disabled={!game.ticketsAvailable}
                >
                  <Link
                    href={game.ticketsAvailable ? `/buy/game/${game.id}` : "#"}
                  >
                    {game.ticketsAvailable
                      ? "View Available Tickets"
                      : "No Tickets Available Yet"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
