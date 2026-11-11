import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Trading News AI feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function TradingNewsAi() {
  return <DashboardGate initialTab="Trading News AI" />;
}
