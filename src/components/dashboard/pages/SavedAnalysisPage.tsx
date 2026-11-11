import type { ReactNode } from "react";

export function SavedAnalysisPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-saved-analysis" data-dashboard-page="Saved analysis">
      {children}
    </section>
  );
}
