import type { ReactNode } from "react";

export function ChartStrategyAiPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-chart-strategy-ai" data-dashboard-page="Chart & Strategy AI">
      {children}
    </section>
  );
}
