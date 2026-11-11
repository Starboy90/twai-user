import type { ReactNode } from "react";

export function AccountAuditorPage({ children }: { children?: ReactNode }) {
  return (
    <section className="dashboard-module-page dashboard-module-account-auditor" data-dashboard-page="Account Auditor">
      {children}
    </section>
  );
}
