import type { Metadata } from "next";
import Overview from "@/components/dashboard/overview/Overview";

export const metadata: Metadata = {
  title: "Overview | Trader World AI",
  description: "Your Trader World AI overview workspace.",
};

export default function OverviewRoute() {
  return <Overview />;
}
