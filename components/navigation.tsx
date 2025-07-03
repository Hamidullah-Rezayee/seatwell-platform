"use client";

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  let displayName = "";
  if (user && user.name) {
    displayName = user.name;
  } else {
    const userCookie = Cookies.get("userRole");
    if (userCookie) {
      try {
        const parsed = JSON.parse(userCookie);
        displayName = parsed.name || "";
      } catch (e) {
        displayName = "";
      }
    }
  }

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-xl">Seatwell</span>
            </Link>

            <div className="hidden md:flex space-x-6">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Home
              </Link>
              <Link
                href="/buy"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/buy") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Buy a Ticket
              </Link>
              <Link
                href="/sell"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/sell") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Sell a Ticket
              </Link>
              <Link
                href="/contact"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/contact")
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Contact
              </Link>
              <Link
                href="/admin"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/admin") ? "text-primary" : "hidden"
                }`}
              >
                Admin Dashboard
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user || displayName ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>{displayName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
