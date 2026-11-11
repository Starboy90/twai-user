import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Overview feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function Overview() {
  return <DashboardGate initialTab="Overview" />;
}
