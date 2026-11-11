import type { ReactNode } from "react";

export function OverviewPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-overview" data-dashboard-page="Overview">
      {children}
    </section>
  );
}
