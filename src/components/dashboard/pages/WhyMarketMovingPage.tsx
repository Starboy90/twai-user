import type { ReactNode } from "react";

export function WhyMarketMovingPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-why-market-moving" data-dashboard-page="Why Market Moving?">
      {children}
    </section>
  );
}
