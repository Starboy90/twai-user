import type { ReactNode } from "react";

export function RiskPlannerPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-risk-planner" data-dashboard-page="Risk Planner">
      {children}
    </section>
  );
}
