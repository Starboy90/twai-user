import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Calculators feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function Calculators() {
  return <DashboardGate initialTab="Calculators" />;
}
