import type { ReactNode } from "react";

export function EconomicCalendarPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-economic-calendar" data-dashboard-page="Economic Calendar">
      {children}
    </section>
  );
}
