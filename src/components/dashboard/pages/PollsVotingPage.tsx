import type { ReactNode } from "react";

export function PollsVotingPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-polls-voting" data-dashboard-page="Polls & Voting">
      {children}
    </section>
  );
}
