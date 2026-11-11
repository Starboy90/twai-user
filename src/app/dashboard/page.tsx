import type { Metadata } from "next";
import { DashboardGate } from "@/components/dashboard/dashboard-gate";

export const metadata: Metadata = {
  title: "Your Dashboard | Trader World AI",
  description: "Your personal Trader World AI workspace for market overview, watchlists, research, alerts and trading notes.",
};

export default function DashboardPage() {
  return <DashboardGate />;
}
