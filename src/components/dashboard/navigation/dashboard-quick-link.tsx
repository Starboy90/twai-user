import type { ReactNode } from "react";

export function DashboardQuickLink({
  className,
  onNavigate,
  children,
  label,
}: {
  className: string;
  onNavigate: () => void;
  children: ReactNode;
  label: string;
}) {
  return (
    <button type="button" className={className} aria-label={label} onClick={onNavigate}>
      {children}
    </button>
  );
}
