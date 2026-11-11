import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Chart & Strategy AI feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function ChartAndStrategyAi() {
  return <DashboardGate initialTab="Chart & Strategy AI" />;
}
