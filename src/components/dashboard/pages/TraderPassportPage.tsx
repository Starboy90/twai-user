import type { ReactNode } from "react";

export function TraderPassportPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-trader-passport" data-dashboard-page="Trader Passport">
      {children}
    </section>
  );
}
