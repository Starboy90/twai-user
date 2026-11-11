import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Watchlist feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function Watchlist() {
  return <DashboardGate initialTab="Watchlist" />;
}
