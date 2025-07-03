"use client";

import type React from "react";
import { useEffect } from "react";

import { AdminDashboard } from "@/components/admin-dashboard";
import { useAuth } from "@/components/auth-provider";
import { GameSelection } from "@/components/game-selection";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import Cookies from "js-cookie";
import { AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function AdminPage() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const success = await login(email, password);

    if (success && user) {
      Cookies.set(
        "userRole",
        JSON.stringify({ name: user.name, role: user.role }),
        { expires: 1 }
      );
      if (user.role === "admin") {
        redirect("/admin");
      } else if (user.role === "seller") {
        redirect("/sell");
      }
    } else {
      setError("Invalid credentials");
    }

    setIsLoading(false);
  };
  const fillAdminDemoAccount = () => {
    setEmail("admin@seatwell.com");
    setPassword("password");
  };
  const fillSellerDemoAccount = () => {
    setEmail("john@club.com");
    setPassword("password");
  };
  useEffect(() => {
    if (user) {
      Cookies.set(
        "userRole",
        JSON.stringify({ name: user.name, role: user.role }),
        { expires: 1 }
      );
      if (user.role === "admin") {
        redirect("/admin");
      } else if (user.role === "seller") {
        redirect("/sell");
      }
    }
  }, [user]);
  if (user?.role === "admin") {
    return <AdminDashboard />;
  }
  if (user && user.hasSeasonTicket) {
    return <GameSelection />;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Login to SeatWell</CardTitle>
            <CardDescription>
              Access the Seatwell administration panel to manage the entire
              platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@seatwell.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Login"}
              </Button>
            </form>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-2">
                Demo Account (for testing):
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={fillAdminDemoAccount}
                className="w-full bg-transparent mb-2"
              >
                Use Demo as Admin
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={fillSellerDemoAccount}
                className="w-full bg-transparent"
              >
                Use Demo as Seller
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
