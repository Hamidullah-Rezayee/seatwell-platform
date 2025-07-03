"use client";

import { AdminDashboard } from "@/components/admin-dashboard";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const router = useRouter();

  const { role } = JSON.parse(Cookies.get("userRole") || "{}");
  useEffect(() => {
    if (role !== "admin") {
      router.push("/login");
    }
  }, []);

  if (!role) return null;

  return (
    <div>
      <AdminDashboard />
    </div>
  );
}
