import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Trader Passport feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function TraderPassport() {
  return <DashboardGate initialTab="Trader Passport" />;
}
