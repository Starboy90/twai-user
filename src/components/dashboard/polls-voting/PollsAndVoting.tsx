import { DashboardGate } from "@/components/dashboard/dashboard-gate";

/**
 * Polls & Voting feature component.
 * The existing workspace remains the shared owner of dashboard state and behavior.
 */
export default function PollsAndVoting() {
  return <DashboardGate initialTab="Polls & Voting" />;
}
