import type { ReactNode } from "react";

export function PreTradeChecklistPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-pre-trade-checklist" data-dashboard-page="Pre-Trade Checklist">
      {children}
    </section>
  );
}
