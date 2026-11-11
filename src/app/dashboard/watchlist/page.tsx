import type { Metadata } from "next";
import Watchlist from "@/components/dashboard/watchlist/Watchlist";

export const metadata: Metadata = {
  title: "Watchlist | Trader World AI",
  description: "Your Trader World AI watchlist workspace.",
};

export default function WatchlistRoute() {
  return <Watchlist />;
}
