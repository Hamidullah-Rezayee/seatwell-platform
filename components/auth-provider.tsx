"use client";

import Cookies from "js-cookie";
import { redirect, RedirectType } from "next/navigation";
import { createContext, useContext, useState, type ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "seller" | "admin";
  hasSeasonTicket?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@club.com",
    role: "seller",
    hasSeasonTicket: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@club.com",
    role: "seller",
    hasSeasonTicket: true,
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@seatwell.com",
    role: "admin",
  },
  {
    id: "4",
    name: "Regular User",
    email: "user@example.com",
    role: "buyer",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    const foundUser = mockUsers.find((u) => u.email === email);

    if (foundUser && password === "password") {
      setUser(foundUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("userRole");
    redirect("/", RedirectType.replace);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
