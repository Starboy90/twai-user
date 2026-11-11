import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Prop firm comparison feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function PropFirmComparison() {
  return <DashboardGate initialTab="Prop firm comparison" />;
}
