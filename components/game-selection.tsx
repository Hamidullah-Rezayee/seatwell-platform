"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, CheckCircle, MapPin } from "lucide-react";
import { useState } from "react";
import { Footer } from "./footer";

const upcomingGames = [
  {
    id: "1",
    homeTeam: "Lions",
    awayTeam: "Tigers",
    date: "2024-01-15",
    time: "19:30",
    venue: "Stadium Arena",
    seatSection: "Section A, Row 5, Seats 12-13",
    estimatedValue: 150,
  },
  {
    id: "2",
    homeTeam: "Lions",
    awayTeam: "Eagles",
    date: "2024-01-22",
    time: "20:00",
    venue: "Stadium Arena",
    seatSection: "Section A, Row 5, Seats 12-13",
    estimatedValue: 180,
  },
  {
    id: "3",
    homeTeam: "Lions",
    awayTeam: "Wolves",
    date: "2024-01-29",
    time: "19:00",
    venue: "Stadium Arena",
    seatSection: "Section A, Row 5, Seats 12-13",
    estimatedValue: 120,
  },
  {
    id: "4",
    homeTeam: "Lions",
    awayTeam: "Bears",
    date: "2024-02-05",
    time: "18:30",
    venue: "Stadium Arena",
    seatSection: "Section A, Row 5, Seats 12-13",
    estimatedValue: 200,
  },
];

export function GameSelection() {
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [bankInfo, setBankInfo] = useState({
    accountHolder: "",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleGameToggle = (gameId: string) => {
    setSelectedGames((prev) =>
      prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const selectedGameDetails = upcomingGames.filter((game) =>
    selectedGames.includes(game.id)
  );
  const totalEstimatedValue = selectedGameDetails.reduce(
    (sum, game) => sum + game.estimatedValue,
    0
  );
  const estimatedPayout = Math.round(totalEstimatedValue * 0.85); // 85% after fees

  if (showConfirmation) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">
                Tickets Listed Successfully!
              </CardTitle>
              <CardDescription>
                Your tickets are now available for purchase on Seatwell.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-4">Listed Games</h3>
                <div className="space-y-2">
                  {selectedGameDetails.map((game) => (
                    <div key={game.id} className="flex justify-between text-sm">
                      <span>
                        {game.homeTeam} vs {game.awayTeam}
                      </span>
                      <span>{new Date(game.date).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Estimated Payout (85%):</span>
                    <span>${estimatedPayout}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium text-blue-900 mb-2">
                    What happens next?
                  </p>
                  <ul className="space-y-1 text-blue-800">
                    <li>• You will be notified once tickets are resold</li>
                    <li>• You will receive 85% of the resale price</li>
                    <li>
                      • Payout will be sent to your bank account within 3-5
                      business days
                    </li>
                    <li>
                      • You can modify or cancel listings anytime before they
                      sell
                    </li>
                  </ul>
                </div>
              </div>

              <Button asChild className="w-full">
                <a href="/">Return to Homepage</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Sell Your Season Tickets</h1>
          <p className="text-muted-foreground">
            Select the games you cannot attend and provide your payout
            information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Game Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Games You Cannot Attend</CardTitle>
              <CardDescription>
                Choose the games where you want to sell your season tickets.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingGames.map((game) => (
                  <div
                    key={game.id}
                    className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50"
                  >
                    <Checkbox
                      id={game.id}
                      checked={selectedGames.includes(game.id)}
                      onCheckedChange={() => handleGameToggle(game.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">
                            {game.homeTeam} vs {game.awayTeam}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(game.date).toLocaleDateString()} at{" "}
                              {game.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {game.venue}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {game.seatSection}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="mb-1">
                            Est. ${game.estimatedValue}
                          </Badge>
                          <p className="text-xs text-muted-foreground">
                            You get: ${Math.round(game.estimatedValue * 0.85)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Games Summary */}
          {selectedGames.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Selected Games Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Game</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Estimated Value</TableHead>
                      <TableHead>Your Payout (85%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedGameDetails.map((game) => (
                      <TableRow key={game.id}>
                        <TableCell>
                          {game.homeTeam} vs {game.awayTeam}
                        </TableCell>
                        <TableCell>
                          {new Date(game.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>${game.estimatedValue}</TableCell>
                        <TableCell>
                          ${Math.round(game.estimatedValue * 0.85)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-medium">
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell>${totalEstimatedValue}</TableCell>
                      <TableCell>${estimatedPayout}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Bank Information */}
          {selectedGames.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Bank Payout Information</CardTitle>
                <CardDescription>
                  Enter your bank details to receive payments when your tickets
                  are sold.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountHolder">Account Holder Name</Label>
                    <Input
                      id="accountHolder"
                      value={bankInfo.accountHolder}
                      onChange={(e) =>
                        setBankInfo((prev) => ({
                          ...prev,
                          accountHolder: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={bankInfo.bankName}
                      onChange={(e) =>
                        setBankInfo((prev) => ({
                          ...prev,
                          bankName: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      value={bankInfo.accountNumber}
                      onChange={(e) =>
                        setBankInfo((prev) => ({
                          ...prev,
                          accountNumber: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="routingNumber">Routing Number</Label>
                    <Input
                      id="routingNumber"
                      value={bankInfo.routingNumber}
                      onChange={(e) =>
                        setBankInfo((prev) => ({
                          ...prev,
                          routingNumber: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedGames.length > 0 && (
            <div className="flex justify-end">
              <Button type="submit" size="lg" className="px-8">
                List {selectedGames.length} Game
                {selectedGames.length > 1 ? "s" : ""} for Sale
              </Button>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
}
