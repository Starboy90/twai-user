import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Alerts feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function Alerts() {
  return <DashboardGate initialTab="Alerts" />;
}
