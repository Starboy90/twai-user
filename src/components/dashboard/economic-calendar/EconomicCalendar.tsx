import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Economic Calendar feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function EconomicCalendar() {
  return <DashboardGate initialTab="Economic Calendar" />;
}
