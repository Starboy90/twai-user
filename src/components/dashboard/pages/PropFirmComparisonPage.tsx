import type { ReactNode } from "react";

export function PropFirmComparisonPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-prop-firm-comparison" data-dashboard-page="Prop firm comparison">
      {children}
    </section>
  );
}
