import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Subscriptions feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function Subscriptions() {
  return <DashboardGate initialTab="Subscriptions" />;
}
