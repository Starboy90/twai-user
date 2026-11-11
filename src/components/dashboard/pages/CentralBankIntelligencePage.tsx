import type { ReactNode } from "react";

export function CentralBankIntelligencePage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-central-bank-intelligence" data-dashboard-page="Central Bank Intelligence">
      {children}
    </section>
  );
}
