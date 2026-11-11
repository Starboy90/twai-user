import type { ReactNode } from "react";

export function HelpResourcesPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-help-resources" data-dashboard-page="Help & resources">
      {children}
    </section>
  );
}
