import type { ReactNode } from "react";

export function DailyMarketBriefPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-daily-market-brief" data-dashboard-page="Daily Market Brief">
      {children}
    </section>
  );
}
