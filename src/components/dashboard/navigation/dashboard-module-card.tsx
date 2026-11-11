import { ArrowUpRight, type LucideIcon } from "lucide-react";

export function DashboardModuleCard({
  label,
  group,
  icon: Icon,
  onNavigate,
}: {
  label: string;
  group: string;
  icon: LucideIcon;
  onNavigate: (page: string) => void;
}) {
  return (
    <button type="button" className="overview-module-card" onClick={() => onNavigate(label)}>
      <span className="overview-module-icon"><Icon size={17} /></span>
      <span><strong>{label}</strong><small>{group}</small></span>
      <ArrowUpRight size={14} />
    </button>
  );
}
