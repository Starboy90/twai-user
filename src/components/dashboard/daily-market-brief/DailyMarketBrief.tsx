import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Daily Market Brief feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function DailyMarketBrief() {
  return <DashboardGate initialTab="Daily Market Brief" />;
}
