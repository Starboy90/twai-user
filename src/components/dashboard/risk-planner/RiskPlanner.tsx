import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Risk Planner feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function RiskPlanner() {
  return <DashboardGate initialTab="Risk Planner" />;
}
