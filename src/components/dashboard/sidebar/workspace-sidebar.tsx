"use client";

import type { RefCallback } from "react";
import {
  BookOpen, BookMarked, LayoutDashboard, UserRound, Star, Sparkles, Bell, PanelLeftClose, PanelLeftOpen,
  ChartNoAxesCombined, Calculator, FileSearch, ShieldCheck, ClipboardCheck,
  Building2, Users, Newspaper, CalendarDays, Landmark, WalletCards,
  CreditCard, Vote, CircleHelp, ChevronDown, X,
  type LucideIcon,
} from "lucide-react";
import { Brand } from "../../ui";

export const workspaceNav = [
  { group: "PERSONAL WORKSPACE", label: "Overview", icon: LayoutDashboard },
  { group: "PERSONAL WORKSPACE", label: "Trader Passport", icon: UserRound },
  { group: "PERSONAL WORKSPACE", label: "Watchlist", icon: Star },
  { group: "PERSONAL WORKSPACE", label: "AI assistant", icon: Sparkles },
  { group: "PERSONAL WORKSPACE", label: "Alerts", icon: Bell },
  { group: "PERSONAL WORKSPACE", label: "Journal", icon: BookOpen },
  { group: "PERSONAL WORKSPACE", label: "Saved analysis", icon: BookMarked },
  { group: "ANALYSIS & RISK", label: "Chart & Strategy AI", icon: ChartNoAxesCombined },
  { group: "ANALYSIS & RISK", label: "Calculators", icon: Calculator },
  { group: "ANALYSIS & RISK", label: "Account Auditor", icon: FileSearch },
  { group: "ANALYSIS & RISK", label: "Risk Planner", icon: ShieldCheck },
  { group: "ANALYSIS & RISK", label: "Pre-Trade Checklist", icon: ClipboardCheck },
  { group: "DISCOVERY", label: "Broker comparison", icon: Building2 },
  { group: "DISCOVERY", label: "Prop firm comparison", icon: Users },
  { group: "MARKET INTELLIGENCE", label: "Trading News AI", icon: Newspaper },
  { group: "MARKET INTELLIGENCE", label: "Economic Calendar", icon: CalendarDays },
  { group: "MARKET INTELLIGENCE", label: "Why Market Moving?", icon: ChartNoAxesCombined },
  { group: "MARKET INTELLIGENCE", label: "Central Bank Intelligence", icon: Landmark },
  { group: "MARKET INTELLIGENCE", label: "News Impact Analyzer", icon: FileSearch },
  { group: "MARKET INTELLIGENCE", label: "Daily Market Brief", icon: Newspaper },
  { group: "ACCOUNT", label: "Credits & Usage", icon: WalletCards },
  { group: "ACCOUNT", label: "Subscriptions", icon: CreditCard },
  { group: "ACCOUNT", label: "Polls & Voting", icon: Vote },
  { group: "ACCOUNT", label: "Help & resources", icon: CircleHelp },
] satisfies WorkspaceNavItem[];

export type WorkspaceNavItem = {
  group: string;
  label: string;
  icon: LucideIcon;
};

type ProfileSummary = {
  name?: string | null;
  plan?: string | null;
} | null;

type WorkspaceSidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  activeTab: string;
  profile: ProfileSummary;
  navRef: RefCallback<HTMLElement>;
  onSelect: (label: string) => void;
  onCloseMobile: () => void;
};

function SidebarNavigationButton({
  item, active, onSelect,
}: { item: WorkspaceNavItem; active: boolean; onSelect: (label: string) => void }) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      aria-label={item.label}
      aria-current={active ? "page" : undefined}
      title={item.label}
      className={active ? "active" : ""}
      onClick={() => onSelect(item.label)}
    >
      <Icon size={17} />
      <span>{item.label}</span>
      {item.label === "AI assistant" && <span className="tiny-ai">AI</span>}
    </button>
  );
}

function SidebarHelpButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}>
      <CircleHelp size={16} />
      <span>Help & resources</span>
    </button>
  );
}

function SidebarMobileCloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="sidebar-close" aria-label="Close menu" onClick={onClick}>
      <X size={18} />
    </button>
  );
}

function SidebarProfileSummary({ profile }: { profile: ProfileSummary }) {
  const name = profile?.name || "Your workspace";
  const plan = profile?.plan?.startsWith("Custom package")
    ? "Custom package"
    : `${profile?.plan || "Starter"} plan`;
  return (
    <div className="profile">
      <span className="avatar">{name.slice(0, 1).toUpperCase()}</span>
      <div>
        <strong>{name}</strong>
        <small>{plan}</small>
      </div>
      <ChevronDown size={14} />
    </div>
  );
}

export function WorkspaceSidebar({
  collapsed, mobileOpen, activeTab, profile, navRef,
  onSelect, onCloseMobile,
}: WorkspaceSidebarProps) {
  return (
    <>
      <button className="sidebar-scrim" aria-label="Close navigation" onClick={onCloseMobile} />
      <aside className={`workspace-sidebar ${collapsed ? "is-collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-brand-row">
          <Brand />
          <SidebarMobileCloseButton onClick={onCloseMobile} />
        </div>
        <span className="sidebar-caption">TRADER WORKSPACE</span>
        <nav ref={navRef as RefCallback<HTMLElement>} aria-label="Workspace">
          {workspaceNav.map((item, index) => (
            <div className="sidebar-nav-item" key={item.label}>
              {(index === 0 || workspaceNav[index - 1]?.group !== item.group) && (
                <span className="sidebar-group-label">{item.group}</span>
              )}
              <SidebarNavigationButton
                item={item}
                active={activeTab === item.label}
                onSelect={onSelect}
              />
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <span className="demo-label"><span /> DEMO WORKSPACE</span>
          <SidebarHelpButton onClick={() => onSelect("Help")} />
          <SidebarProfileSummary profile={profile} />
        </div>
      </aside>
    </>
  );
}

export function SidebarCollapseButton({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className="sidebar-toggle"
      onClick={onToggle}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      aria-expanded={!collapsed}
      title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
    </button>
  );
}
