import type { ReactNode } from "react";

export function AlertsPage({ children }: { children?: ReactNode }) {
  return <section className="dashboard-module-page dashboard-module-alerts" data-dashboard-page="Alerts">{children}</section>;
}
