import type { ReactNode } from "react";

export function SubscriptionsPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-subscriptions" data-dashboard-page="Subscriptions">
      {children}
    </section>
  );
}
