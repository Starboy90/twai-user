import type { ReactNode } from "react";

export function BrokerComparisonPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-broker-comparison" data-dashboard-page="Broker comparison">
      {children}
    </section>
  );
}
