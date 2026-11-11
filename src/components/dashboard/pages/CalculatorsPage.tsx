import type { ReactNode } from "react";

export function CalculatorsPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-calculators" data-dashboard-page="Calculators">
      {children}
    </section>
  );
}
