"use client";

import { SeatMap } from "@/components/seat-map";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import jsPDF from "jspdf";
import { ArrowLeft, Calendar, Check, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const gameData = {
  "1": {
    homeTeam: "Lions",
    awayTeam: "Tigers",
    date: "2024-01-15",
    time: "19:30",
    venue: "Stadium Arena",
  },
};

export default function GamePage({ params }: { params: { id: string } }) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<string>("");
  const router = useRouter();

  const game = gameData[params.id as keyof typeof gameData] || gameData["1"];

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handlePurchase = () => {
    setShowConfirmation(true);
  };

  const totalPrice = selectedSeats.length * 75; // Mock price calculation

  if (showConfirmation) {
    // تابع ساخت PDF
    const handleDownload = () => {
      const doc = new jsPDF();
      doc.text(`Ticket for ${game.homeTeam} vs ${game.awayTeam}`, 10, 10);
      doc.text(
        `Date: ${new Date(game.date).toLocaleDateString()} at ${game.time}`,
        10,
        20
      );
      doc.text(`Venue: ${game.venue}`, 10, 30);
      doc.text(`Seats: ${selectedSeats.join(", ")}`, 10, 40);
      doc.text(`Total Price: $${totalPrice}`, 10, 50);
      doc.save("ticket.pdf");
    };

    // تابع ارسال ایمیل
    const handleSendEmail = async () => {
      if (!email) {
        setEmailStatus("Please enter your email address.");
        return;
      }

      setEmailStatus("Sending...");
      try {
        const res = await fetch(`/api/tickets/${params.id}/email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            seats: selectedSeats,
            price: totalPrice,
            email: email,
          }),
        });
        if (res.ok) {
          setEmailStatus("Ticket sent to your email!");
          setShowEmailForm(false);
        } else {
          setEmailStatus("Failed to send ticket email.");
        }
      } catch (e) {
        setEmailStatus("Failed to send ticket email.");
      }
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleSendEmail();
    };

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">
                Purchase Successful!
              </CardTitle>
              <CardDescription>
                Your tickets have been purchased and will be transferred to you
                shortly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">
                  {game.homeTeam} vs {game.awayTeam}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(game.date).toLocaleDateString()} at {game.time}
                </p>
                <p className="text-sm text-muted-foreground">{game.venue}</p>
                <p className="font-medium mt-2">
                  Seats: {selectedSeats.join(", ")} • Total: ${totalPrice}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                You will receive an email confirmation with your ticket details
                and transfer instructions.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={handleDownload} variant="secondary">
                  Download Ticket (PDF)
                </Button>
                <Button
                  onClick={() => setShowEmailForm(true)}
                  variant="outline"
                >
                  Send Ticket to Email
                </Button>
              </div>
              {emailStatus && (
                <div className="text-sm text-blue-600 mt-2">{emailStatus}</div>
              )}
              {/* Email Form Modal */}
              {showEmailForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <Card className="w-full max-w-md mx-4">
                    <CardHeader>
                      <CardTitle>Enter Your Email</CardTitle>
                      <CardDescription>
                        We'll send your ticket to this email address.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button type="submit" className="flex-1">
                            Send Ticket
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setShowEmailForm(false);
                              setEmail("");
                              setEmailStatus("");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              )}
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <Link href="/">Return Home</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/buy">Browse More Games</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/buy">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {game.homeTeam} vs {game.awayTeam}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(game.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {game.venue} • {game.time}
              </div>
            </div>
          </div>

          {selectedSeats.length > 0 && (
            <Card className="w-full md:w-auto">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    Selected Seats
                  </p>
                  <p className="font-semibold">{selectedSeats.join(", ")}</p>
                  <p className="text-lg font-bold text-primary">
                    ${totalPrice}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Select Your Seats</CardTitle>
              <CardDescription>
                Click on available seats to select them. Green seats are
                available, red seats are taken.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SeatMap
                selectedSeats={selectedSeats}
                onSeatSelect={handleSeatSelect}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price per ticket:</span>
                <span className="font-medium">$75</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Selected seats:</span>
                <span className="font-medium">{selectedSeats.length}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Purchase Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <p>✓ Instant ticket transfer</p>
                <p>✓ Secure payment processing</p>
                <p>✓ 100% authentic tickets</p>
                <p>✓ Customer support included</p>
              </div>

              <Button
                onClick={handlePurchase}
                disabled={selectedSeats.length === 0}
                className="w-full"
                size="lg"
              >
                {selectedSeats.length === 0
                  ? "Select Seats to Continue"
                  : `Buy ${selectedSeats.length} Ticket${
                      selectedSeats.length > 1 ? "s" : ""
                    } - $${totalPrice}`}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="font-medium">Powered by Seatwell</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
