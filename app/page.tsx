import {Footer} from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, MapPin, Shield, Zap } from "lucide-react";
import Link from "next/link";

const upcomingGames = [
  {
    id: "1",
    homeTeam: "Lions",
    awayTeam: "Tigers",
    date: "2024-01-15",
    time: "19:30",
    venue: "Stadium Arena",
    ticketsAvailable: true,
  },
  {
    id: "2",
    homeTeam: "Lions",
    awayTeam: "Eagles",
    date: "2024-01-22",
    time: "20:00",
    venue: "Stadium Arena",
    ticketsAvailable: false,
  },
  {
    id: "3",
    homeTeam: "Lions",
    awayTeam: "Wolves",
    date: "2024-01-29",
    time: "19:00",
    venue: "Stadium Arena",
    ticketsAvailable: true,
  },
  {
    id: "4",
    homeTeam: "Lions",
    awayTeam: "Bears",
    date: "2024-02-05",
    time: "18:30",
    venue: "Stadium Arena",
    ticketsAvailable: true,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Turn Your Empty Seats Into
              <span className="text-primary"> Extra Income</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Seatwell connects seasonal ticket holders with fans who want to
              attend games. Sell your tickets when you can't make it, or find
              great seats for the games you want to see.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/buy">Buy a Ticket</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8"
              >
                <Link href="/sell">Sell a Ticket</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Seatwell?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make ticket reselling safe, simple, and profitable for everyone
              involved.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Secure Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All transactions are protected with bank-level security and
                  fraud protection.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Instant Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  List your tickets in seconds and reach thousands of potential
                  buyers immediately.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <DollarSign className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Fair Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our dynamic pricing ensures you get the best value while
                  keeping tickets affordable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Games on the Horizon */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Games on the Horizon</h2>
            <p className="text-muted-foreground">
              Upcoming games where you can buy or sell tickets
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingGames.map((game) => (
              <Card key={game.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge
                      variant={game.ticketsAvailable ? "default" : "secondary"}
                    >
                      {game.ticketsAvailable ? "Available" : "Sold Out"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">
                    {game.homeTeam} vs {game.awayTeam}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(game.date).toLocaleDateString()} at {game.time}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {game.venue}
                  </div>
                  <Button
                    asChild
                    className="w-full"
                    variant={game.ticketsAvailable ? "default" : "secondary"}
                    disabled={!game.ticketsAvailable}
                  >
                    <Link
                      href={
                        game.ticketsAvailable ? `/buy/game/${game.id}` : "#"
                      }
                    >
                      {game.ticketsAvailable
                        ? "View Tickets"
                        : "No Tickets Available"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
