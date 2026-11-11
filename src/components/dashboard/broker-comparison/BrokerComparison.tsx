import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Broker comparison feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function BrokerComparison() {
  return <DashboardGate initialTab="Broker comparison" />;
}
