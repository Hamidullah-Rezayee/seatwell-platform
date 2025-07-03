"use client";

import { GameSelection } from "@/components/game-selection";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SellPage() {
  const router = useRouter();

  const { role } = JSON.parse(Cookies.get("userRole") || "{}");
  useEffect(() => {
    if (role !== "seller") {
      router.push("/login");
    }
  }, []);

  if (!role) return null;

  return (
    <div>
      <GameSelection />
    </div>
  );
}
