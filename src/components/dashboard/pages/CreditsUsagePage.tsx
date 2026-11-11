import type { ReactNode } from "react";

export function CreditsUsagePage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-credits-usage" data-dashboard-page="Credits & Usage">
      {children}
    </section>
  );
}
