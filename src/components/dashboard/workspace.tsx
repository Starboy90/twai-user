"use client";
import { useState, useEffect, useRef, type FormEvent } from "react";
import { z } from "zod";
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  Globe2,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  ChartNoAxesCombined,
  Calculator,
  ShieldCheck,
  ClipboardCheck,
  Building2,
  Newspaper,
  CalendarDays,
  Landmark,
  FileSearch,
  WalletCards,
  CreditCard,
  Users,
  Vote,
  BookMarked,
  Plus,
  Search,
  Send,
  Sparkles,
  Star,
  Trash2,
  X,
  IdCard,
  LockKeyhole,
  Pencil,
  Save,
  BadgeCheck,
  CalendarClock,
  Shield,
  CircleUserRound,
} from "lucide-react";
import { insightPrompts, insights, markets } from "@/data";
import { useDemoProfile, useWorkspace } from "@/lib/use-workspace";
import { useDashboardNavigationStore } from "@/store/dashboard-navigation.store";
import { Coin, Modal } from "../ui";
import { formatPrice, PriceChart } from "../price-chart";
import { SidebarCollapseButton, WorkspaceSidebar, workspaceNav } from "./sidebar/workspace-sidebar";
import { DashboardPageSwitcher } from "./topbar/dashboard-page-switcher";
import { DashboardPageRenderer } from "./pages/dashboard-page-renderer";
import { DashboardModuleCard } from "./navigation/dashboard-module-card";
import { DashboardQuickLink } from "./navigation/dashboard-quick-link";

type Entry = { id: string; text: string; date: string };
type Alert = { id: string; symbol: string; price: number };
type Message = { role: "user" | "assistant"; text: string };
const noteSchema = z
  .string()
  .trim()
  .min(3, "Write at least 3 characters.")
  .max(2000, "Keep your note under 2,000 characters.");
const alertSchema = z.coerce
  .number()
  .positive("Enter a price greater than zero.")
  .max(100000000, "Enter a price below 100 million.");
export function Workspace({
  preview = false,
  onClose,
  initialTab = "Overview",
}: {
  preview?: boolean;
  onClose?: () => void;
  initialTab?: string;
}) {
  const activeTab = useDashboardNavigationStore((state) => state.activeTab);
  const setActiveTab = useDashboardNavigationStore((state) => state.setActiveTab);
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, setActiveTab]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [floatingAiOpen, setFloatingAiOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [readNotifications, setReadNotifications] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  /* V19 assistant page scroll reset */
  useEffect(() => {
    if (activeTab !== "AI assistant") return;
    const page = document.querySelector<HTMLElement>(".workspace-main");
    if (page) page.scrollTop = 0;
  }, [activeTab]);

  // AI Assistant owns its own transcript scroll area; lock the outer document.
  useEffect(() => {
    if (preview || activeTab !== "AI assistant") return;
    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyHeight = body.style.height;
    const previousBodyOverscroll = body.style.overscrollBehavior;

    root.classList.add("twai-assistant-page-lock");
    body.classList.add("twai-assistant-page-lock");
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.height = "100dvh";
    body.style.overscrollBehavior = "none";

    return () => {
      root.classList.remove("twai-assistant-page-lock");
      body.classList.remove("twai-assistant-page-lock");
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.height = previousBodyHeight;
      body.style.overscrollBehavior = previousBodyOverscroll;
    };
  }, [preview, activeTab]);


  const sidebarNavRef = useRef<HTMLElement | null>(null);
  const [selected, setSelected] = useState(markets[0]);
  const [timeframe, setTimeframe] = useState("1D");
  const [category, setCategory] = useState("All markets");
  const [query, setQuery] = useState("");
  const { data, update, storageError } = useWorkspace();
  const profile = useDemoProfile();
  const [passportEditOpen, setPassportEditOpen] = useState(false);
  const [passwordEditOpen, setPasswordEditOpen] = useState(false);
  const [passportName, setPassportName] = useState("Trader");
  const [passportEmail, setPassportEmail] = useState("trader@example.com");
  const [passportMessage, setPassportMessage] = useState("");
  const [passportError, setPassportError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  useEffect(() => {
    if (!mobileNavOpen) return;
    const navElement = sidebarNavRef.current;
    if (navElement) {
      navElement.scrollTop = 0;
    }
  }, [mobileNavOpen]);

  useEffect(() => {
    if (profile?.name) setPassportName(profile.name);
    if (profile?.email) setPassportEmail(profile.email);
  }, [profile?.name, profile?.email]);
  function savePassportProfile(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = passportName.trim();
    const email = passportEmail.trim();
    if (name.length < 2 || name.length > 60) {
      setPassportError("Enter a name between 2 and 60 characters.");
      return;
    }
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      setPassportError("Enter a valid email address.");
      return;
    }
    try {
      const existing = JSON.parse(localStorage.getItem("twai-profile") || "{}");
      localStorage.setItem("twai-profile", JSON.stringify({
        name, email, plan: typeof existing.plan === "string" ? existing.plan : "Starter",
      }));
      setPassportError("");
      setPassportMessage("Your profile details were saved in this browser.");
      setPassportEditOpen(false);
      window.dispatchEvent(new Event("twai-storage"));
    } catch {
      setPassportError("Could not save profile details in browser storage.");
    }
  }
  function savePassportPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const current = String(form.get("currentPassword") || "");
    const next = String(form.get("newPassword") || "");
    const confirm = String(form.get("confirmPassword") || "");
    if (current.length < 1) {
      setPassportError("Enter your current password.");
      return;
    }
    if (next.length < 8) {
      setPassportError("New password must contain at least 8 characters.");
      return;
    }
    if (next !== confirm) {
      setPassportError("New password and confirmation do not match.");
      return;
    }
    setPassportError("");
    setPasswordMessage("Password form validated. Connect the authentication API to securely update your password.");
    setPasswordEditOpen(false);
    e.currentTarget.reset();
  }
  const { watchlist, entries, alerts } = data;
  const setWatchlist = (v: string[] | ((w: string[]) => string[])) =>
    update("watchlist", v);
  const setEntries = (v: Entry[] | ((w: Entry[]) => Entry[])) =>
    update("entries", v);
  const setAlerts = (v: Alert[] | ((w: Alert[]) => Alert[])) =>
    update("alerts", v);
  const [alertOpen, setAlertOpen] = useState(false);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");
  const [thinking, setThinking] = useState(false);
  const [assistantMarketType, setAssistantMarketType] = useState("");
  const [assistantInstrument, setAssistantInstrument] = useState("");
  const [assistantTopic, setAssistantTopic] = useState("");
  const [assistantTimeframe, setAssistantTimeframe] = useState("");
  const [assistantStyle, setAssistantStyle] = useState("");
  const [assistantExperience, setAssistantExperience] = useState("");
  const [assistantFlowStep, setAssistantFlowStep] = useState(0);
  const [assistantAttachment, setAssistantAttachment] = useState<File | null>(null);
  const assistantReady = assistantFlowStep === 5;
/* V20 FIX: assistant transcript auto-scroll after messages initialization */
  useEffect(() => {
    if (activeTab !== "AI assistant" || messages.length === 0) return;
    const transcript = document.querySelector<HTMLElement>(".assistant-chat-transcript");
    if (transcript) transcript.scrollTop = transcript.scrollHeight;
  }, [activeTab, messages.length, thinking, assistantFlowStep]);
  useEffect(() => {
    if (!thinking) return;
    const timer = setTimeout(() => {
      const question = messages.at(-1)?.text.toLowerCase() ?? "";
      const response = question.includes("level")
        ? insights.levels
        : question.includes("plan") || question.includes("research")
          ? insights.research
          : insights.summary;
      setMessages((m) => [
        ...m,
        { role: "assistant", text: `${selected.name}: ${response}` },
      ]);
      setThinking(false);
    }, 750);
    return () => clearTimeout(timer);
  }, [thinking, messages, selected.name]);
  function ask(text: string) {
    const parsed = z.string().trim().min(3).max(2000).safeParse(text);
    if (!parsed.success || thinking) return;
    const contextParts = [
      `Market: ${assistantMarketType}`,
      `Instrument: ${assistantInstrument}`,
      `Focus: ${assistantTopic}`,
      `Trading style: ${assistantStyle}`,
      `Timeframe: ${assistantTimeframe}`,
      `Experience: ${assistantExperience}`,
    ];
    if (assistantAttachment) contextParts.push(`Attachment: ${assistantAttachment.name}`);
    const context = `[${contextParts.join(" | ")}]`;
    setMessages((m) => [...m, { role: "user", text: `${parsed.data}\n\n${context}` }]);
    setPrompt("");
    setAssistantAttachment(null);
    setThinking(true);
  }
  function toggleWatch(symbol: string) {
    setWatchlist((w) =>
      w.includes(symbol) ? w.filter((s) => s !== symbol) : [...w, symbol],
    );
  }
  function saveNote(e: FormEvent) {
    e.preventDefault();
    const result = noteSchema.safeParse(note);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setEntries((v) => [
      {
        id: crypto.randomUUID(),
        text: result.data,
        date: new Date().toISOString(),
      },
      ...v,
    ]);
    setNote("");
    setError("");
  }
  function saveAlert(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = alertSchema.safeParse(
      new FormData(e.currentTarget).get("price"),
    );
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setAlerts((v) => [
      ...v,
      { id: crypto.randomUUID(), symbol: selected.symbol, price: result.data },
    ]);
    setAlertOpen(false);
    setError("");
    setActiveTab("Alerts");
  }
  const visible = markets.filter(
    (m) =>
      (category === "All markets" || m.category === category) &&
      (activeTab !== "Watchlist" || watchlist.includes(m.symbol)) &&
      `${m.name} ${m.symbol}`.toLowerCase().includes(query.toLowerCase()),
  );
  const nav = workspaceNav;
  const builtTabs = ["Overview", "Trader Passport", "Watchlist", "AI assistant", "Alerts", "Journal", "Help"];

  const marketTable = (
    <div className="market-table">
      <div className="table-header">
        <span>Asset</span>
        <span>Price</span>
        <span>24h change</span>
        <span className="table-trend">Last 24 hours</span>
        <span />
      </div>
      {visible.length ? (
        visible.map((m) => (
          <div
            key={m.symbol}
            className={`market-row ${selected.symbol === m.symbol ? "selected" : ""}`}
          >
            <button
              className="asset-button"
              onClick={() => setSelected(m)}
              aria-label={`View ${m.name}`}
            >
              <Coin symbol={m.symbol} color={m.color} />
              <span>
                <strong>{m.name}</strong>
                <small>{m.symbol}</small>
              </span>
            </button>
            <span className="table-price">{formatPrice(m.price)}</span>
            <span className={m.change >= 0 ? "positive" : "negative"}>
              {m.change > 0 ? "+" : ""}
              {m.change.toFixed(2)}%
            </span>
            <span className="table-trend">
              <PriceChart market={m} mini />
            </span>
            <button
              className={`icon-button star-button ${watchlist.includes(m.symbol) ? "starred" : ""}`}
              aria-label={`${watchlist.includes(m.symbol) ? "Remove" : "Add"} ${m.symbol} ${watchlist.includes(m.symbol) ? "from" : "to"} watchlist`}
              onClick={() => toggleWatch(m.symbol)}
            >
              <Star
                size={15}
                fill={watchlist.includes(m.symbol) ? "currentColor" : "none"}
              />
            </button>
          </div>
        ))
      ) : (
        <p className="empty-state">
          {activeTab === "Watchlist"
            ? "Your watchlist is empty. Add a star beside a market in Overview."
            : "No markets match your search."}
        </p>
      )}
    </div>
  );
  const assistantInstrumentChoices: Record<string, string[]> = {
    Forex: ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "USD/CAD", "USD/CHF", "NZD/USD", "EUR/GBP", "GBP/JPY"],
    Crypto: ["BTC/USDT", "ETH/USDT", "BNB/USDT", "SOL/USDT", "XRP/USDT", "ADA/USDT", "DOGE/USDT"],
    Stocks: ["AAPL", "MSFT", "NVDA", "TSLA", "AMZN", "GOOGL", "META"],
    Commodities: ["XAU/USD (Gold)", "XAG/USD (Silver)", "WTI Crude Oil", "Brent Crude", "Natural Gas"],
    Indices: ["US30", "NAS100", "SPX500", "GER40", "UK100", "NIFTY 50"],
  };

  const assistantGoalChoices = [
    "Chart & technical analysis",
    "Price action & market structure",
    "News & fundamentals",
    "Risk & position sizing",
    "Trading basics & education",
  ];

  const assistantStyleChoices = [
    { label: "Scalping", detail: "1m–5m", timeframe: "5m" },
    { label: "Intraday", detail: "15m–1H", timeframe: "1H" },
    { label: "Swing", detail: "4H–1D", timeframe: "1D" },
    { label: "Position", detail: "1W–1M", timeframe: "1W" },
  ];

  function chooseAssistantMarket(value: string) {
    setAssistantMarketType(value);
    setAssistantInstrument(assistantInstrumentChoices[value]?.[0] ?? "");
    setAssistantFlowStep(1);
  }

  function chooseAssistantFlowOption(value: string) {
    if (assistantFlowStep === 1) {
      setAssistantInstrument(value);
      setAssistantFlowStep(2);
      return;
    }
    if (assistantFlowStep === 2) {
      setAssistantTopic(value);
      setAssistantFlowStep(3);
      return;
    }
    if (assistantFlowStep === 3) {
      const style = assistantStyleChoices.find((item) => item.label === value);
      if (style) {
        setAssistantStyle(style.label);
        setAssistantTimeframe(style.timeframe);
      }
      setAssistantFlowStep(4);
      return;
    }
    if (assistantFlowStep === 4) {
      setAssistantExperience(value);
      setAssistantFlowStep(5);
    }
  }

  const assistantFlowQuestion = [
    "Which market would you like to explore?",
    assistantMarketType === "Forex"
      ? "Which currency pair are you interested in?"
      : assistantMarketType === "Crypto"
        ? "Which coin or crypto pair should we look at?"
        : assistantMarketType === "Stocks"
          ? "Which company or stock do you want to explore?"
          : assistantMarketType === "Commodities"
            ? "Which commodity would you like to analyse?"
            : "Which market index should we focus on?",
    "What would you like help with?",
    "What is your trading style?",
    "How would you describe your trading experience?",
    "Your market workspace is ready. What would you like to explore first?",
  ][assistantFlowStep];

  const assistantGuidedFlow = (
    <div className="assistant-guided-flow">
      <div className="assistant-guided-intro">
        <span className="assistant-guided-kicker">TRADER WORLD AI</span>
        <p>Hi! I’ll help you set up your market view. Let’s start with one quick question.</p>
      </div>

      {assistantFlowStep > 0 && (
        <div className="assistant-guided-history" aria-label="Your selected setup">
          <div><small>Market</small><strong>{assistantMarketType}</strong></div>
          {assistantFlowStep > 1 && <div><small>Instrument</small><strong>{assistantInstrument}</strong></div>}
          {assistantFlowStep > 2 && <div><small>Focus</small><strong>{assistantTopic}</strong></div>}
          {assistantFlowStep > 3 && <div><small>Style</small><strong>{assistantStyle} · {assistantTimeframe}</strong></div>}
          {assistantFlowStep > 4 && <div><small>Experience</small><strong>{assistantExperience}</strong></div>}
        </div>
      )}

      <div className="assistant-guided-bot-message">
        <span className="assistant-guided-bot-name">Trader World AI</span>
        <p>{assistantFlowQuestion}</p>
        {assistantFlowStep === 1 && <small>Choose a pair below. For example, Forex includes EUR/USD and GBP/JPY.</small>}
        {assistantFlowStep === 3 && <small>I’ll use the matching chart timeframe with your selected trading style.</small>}
      </div>

      {assistantFlowStep === 0 && (
        <div className="assistant-guided-choice-grid market-types">
          {["Forex", "Crypto", "Stocks", "Commodities", "Indices"].map((option) => (
            <button type="button" key={option} onClick={() => chooseAssistantMarket(option)}>{option}<span>›</span></button>
          ))}
        </div>
      )}

      {assistantFlowStep === 1 && (
        <div className="assistant-guided-choice-grid instruments">
          {(assistantInstrumentChoices[assistantMarketType] ?? []).map((option) => (
            <button type="button" key={option} onClick={() => chooseAssistantFlowOption(option)}>{option}<span>›</span></button>
          ))}
          <button type="button" onClick={() => chooseAssistantFlowOption("Other / I’ll specify in chat")}>Other / I’ll specify<span>›</span></button>
        </div>
      )}

      {assistantFlowStep === 2 && (
        <div className="assistant-guided-choice-grid goals">
          {assistantGoalChoices.map((option) => (
            <button type="button" key={option} onClick={() => chooseAssistantFlowOption(option)}>{option}<span>›</span></button>
          ))}
        </div>
      )}

      {assistantFlowStep === 3 && (
        <div className="assistant-guided-choice-grid styles">
          {assistantStyleChoices.map((option) => (
            <button type="button" key={option.label} onClick={() => chooseAssistantFlowOption(option.label)}>
              <strong>{option.label}</strong><small>{option.detail}</small><span>›</span>
            </button>
          ))}
        </div>
      )}

      {assistantFlowStep === 4 && (
        <div className="assistant-guided-choice-grid experience">
          {["Beginner", "Intermediate", "Advanced"].map((option) => (
            <button type="button" key={option} onClick={() => chooseAssistantFlowOption(option)}>{option}<span>›</span></button>
          ))}
        </div>
      )}

      {assistantReady && (
        <div className="assistant-guided-ready">
          <div className="assistant-guided-ready-title">You’re all set</div>
          <p>{assistantMarketType} · {assistantInstrument} · {assistantTopic} · {assistantStyle} ({assistantTimeframe}) · {assistantExperience}</p>
          <button type="button" onClick={() => setAssistantFlowStep(0)}>Change my setup</button>
        </div>
      )}
    </div>
  );

  const assistant = (
    <div className="assistant-chat-shell">
      <div className="assistant-chat-transcript" aria-live="polite">
        {messages.length === 0 ? (
          <div className="assistant-welcome">
            {assistantGuidedFlow}
            {assistantReady && (
              <div className="assistant-starters">
                {[
                  "Analyse the latest chart structure",
                  "Explain the current market trend",
                  "What risks should I watch?",
                ].map((q) => <button key={q} onClick={() => ask(q)} disabled={thinking}>{q}<ArrowUpRight size={14}/></button>)}
              </div>
            )}
          </div>
        ) : (
          <div className="messages">
            {messages.map((m, i) => (
              <div className={`chat-message ${m.role}`} key={i}>
                <span className="chat-role">{m.role === "user" ? "You" : "Trader World AI"}</span>
                <span>{m.text}</span>
              </div>
            ))}
            {thinking && <p className="thinking">Preparing a demo response…</p>}
          </div>
        )}
      </div>
      <form className="assistant-composer" onSubmit={(e) => { e.preventDefault(); ask(prompt); }}>
        {assistantAttachment && <div className="assistant-attachment-chip"><span>{assistantAttachment.name}</span><button type="button" onClick={() => setAssistantAttachment(null)} aria-label="Remove attachment"><X size={13}/></button></div>}
        <div className="assistant-composer-row">
          <label className={`assistant-attach-button ${!assistantReady ? "is-disabled" : ""}`} title={assistantReady ? "Attach screenshot or document" : "Complete the setup first"}>
            <Plus size={19}/>
            <input type="file" accept="image/*,.pdf,.doc,.docx,.csv,.txt" disabled={!assistantReady} onChange={(e) => setAssistantAttachment(e.target.files?.[0] ?? null)} />
          </label>
          <textarea aria-label="Ask Trader World AI" placeholder={assistantReady ? "Ask about your selected market..." : "Answer the questions above to start chatting..."} value={prompt}
            disabled={!assistantReady}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                e.preventDefault();
                e.currentTarget.form?.requestSubmit();
              }
            }}
            data-v24-shortcut="enabled"
            onChange={(e) => setPrompt(e.target.value)} minLength={3} maxLength={2000} rows={2} required/>
          <button className="assistant-send-button" type="submit" disabled={!assistantReady || thinking || prompt.trim().length < 3} aria-label="Send message"><Send size={17}/></button>
        </div>
        <div className="assistant-composer-footer"><span>{assistantReady ? "Enter for a new line - Ctrl+Enter to send" : "Complete the guided setup to unlock the chat"}</span><span>Demo replies only - live AI/API not connected</span></div>
      </form>
      <p className="assistant-disclaimer">Educational information only. AI responses are not financial advice. Verify live prices, broker terms and news from approved sources.</p>
    </div>
  );
  return (
    <div
      className={`workspace ${preview ? "workspace-preview" : "workspace-full"} ${mobileNavOpen ? "mobile-nav-open" : ""} ${activeTab === "AI assistant" ? "is-ai-assistant" : ""}`}
    >
      <WorkspaceSidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileNavOpen}
        activeTab={activeTab}
        profile={profile}
        navRef={(node) => { sidebarNavRef.current = node as HTMLElement | null; }}
        onSelect={(label) => {
          setActiveTab(label === "Help & resources" ? "Help" : label);
          setError("");
          setMobileNavOpen(false);
        }}
        onCloseMobile={() => setMobileNavOpen(false)}
      />
      <div className="workspace-body">
        <header className="workspace-topbar">
          <div className="workspace-topbar-left">
            {!preview && (
              <SidebarCollapseButton
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed((value) => !value)}
              />
            )}
            <span className="topbar-context">
              <button className="mobile-menu-trigger" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Menu size={19}/></button>
              <span className="muted">Workspace</span>
              <span className="breadcrumb">/</span>
              <DashboardPageSwitcher
                activeTab={activeTab}
                onChange={(page) => {
                  setActiveTab(page === "Help & resources" ? "Help" : page);
                  setError("");
                }}
              />
            </span>
          </div>
          <div className="workspace-topbar-actions">
            <span className="data-badge">
              <span /> Demo workspace
            </span>
            {!preview && (
              <>
                <div className="topbar-popover-anchor">
                  <button
                    className={`topbar-icon-action ${notificationsOpen ? "is-active" : ""}`}
                    onClick={() => { setNotificationsOpen((v) => !v); setProfileMenuOpen(false); }}
                    aria-label="Notifications"
                    aria-expanded={notificationsOpen}
                    title="Notifications"
                  >
                    <Bell size={18} />
                    {!readNotifications && <span className="notification-dot" />}
                  </button>
                  {notificationsOpen && (
                    <section className="topbar-popover notification-popover">
                      <div className="popover-heading">
                        <div><strong>Notifications</strong><small>Your workspace updates</small></div>
                        <button className="popover-text-action" onClick={() => setReadNotifications(true)}>Mark all read</button>
                      </div>
                      <div className={`notification-entry ${readNotifications ? "is-read" : ""}`}>
                        <span className="notification-entry-icon"><Bell size={15}/></span>
                        <div><strong>Welcome to Trader World AI</strong><p>Your demo trading workspace is ready to explore.</p><small>Just now Ãƒâ€šÃ‚Â· Demo notification</small></div>
                      </div>
                      <div className="notification-entry is-read">
                        <span className="notification-entry-icon"><ChartNoAxesCombined size={15}/></span>
                        <div><strong>Market overview refreshed</strong><p>Sample prices and chart data are available in your dashboard.</p><small>Today Ãƒâ€šÃ‚Â· Sample update</small></div>
                      </div>
                      <div className="popover-footer">Notifications are local demo content.</div>
                    </section>
                  )}
                </div>
                <div className="topbar-popover-anchor">
                  <button
                    className={`topbar-profile-action ${profileMenuOpen ? "is-active" : ""}`}
                    onClick={() => { setProfileMenuOpen((v) => !v); setNotificationsOpen(false); }}
                    aria-expanded={profileMenuOpen}
                    aria-label="Open user profile"
                    title="Your profile"
                  >
                    <span className="topbar-avatar">{(profile?.name ?? "Trader").slice(0,1).toUpperCase()}</span>
                    <span className="topbar-profile-copy"><strong>{profile?.name ?? "Trader"}</strong><small>{profile?.plan ?? "Starter plan"}</small></span>
                    <ChevronDown size={15}/>
                  </button>
                  {profileMenuOpen && (
                    <section className="topbar-popover profile-popover">
                      <div className="profile-popover-header">
                        <span className="profile-popover-avatar">{(profile?.name ?? "Trader").slice(0,1).toUpperCase()}</span>
                        <div><strong>{profile?.name ?? "Trader"}</strong><small>{profile?.email ?? "Demo account"}</small></div>
                      </div>
                      <div className="profile-detail-list">
                        <div><span>Account type</span><strong>Demo user</strong></div>
                        <div><span>Current plan</span><strong>{profile?.plan ?? "Starter"}</strong></div>
                        <div><span>Workspace</span><strong>Trader World AI</strong></div>
                      </div>
                      <button className="profile-menu-link" onClick={() => { setActiveTab("Trader Passport"); setProfileMenuOpen(false); }}><UserRound size={16}/> View trader profile <ArrowUpRight size={14}/></button>
                      <button className="profile-menu-link" onClick={() => { setActiveTab("Help"); setProfileMenuOpen(false); }}><ShieldCheck size={16}/> Account &amp; settings <ArrowUpRight size={14}/></button>
                      <button className="profile-menu-link signout-link" onClick={() => { localStorage.removeItem("twai-demo-session"); window.location.assign("/login"); }}><LogOut size={16}/> Sign out</button>
                    </section>
                  )}
                </div>
              </>
            )}
            {onClose && (
              <button className="icon-button" onClick={onClose} aria-label="Close workspace"><X size={20} /></button>
            )}
          </div>
        </header>
        <div className="workspace-main">
          <div className="workspace-title">
            <div>
              <p className="workspace-greeting">YOUR DAILY PERSPECTIVE</p>
              <h2>
                {activeTab === "Overview"
                  ? "A clearer view of the market."
                  : activeTab === "AI assistant"
                    ? "Think it through, together."
                    : activeTab === "Help"
                      ? "Make yourself at home."
                      : `Your ${activeTab.toLowerCase()}.`}
              </h2>
            </div>
            <span className="market-status">
              <span /> Markets in focus
            </span>
          </div>
          <DashboardPageRenderer page={activeTab}>
          {storageError && (
            <p role="status" className="form-error">
              {storageError}
            </p>
          )}
          {(activeTab === "Overview" || activeTab === "Watchlist") && (
            <>
              <div className="market-summaries">
                {markets.slice(0, 3).map((m) => (
                  <button
                    key={m.symbol}
                    className={`summary-card ${selected.symbol === m.symbol ? "chosen" : ""}`}
                    onClick={() => setSelected(m)}
                  >
                    <div>
                      <Coin symbol={m.symbol} color={m.color} />
                      <strong>{m.name}</strong>
                      <ArrowUpRight size={14} className="muted" />
                    </div>
                    <strong className="summary-price">
                      {formatPrice(m.price)}
                    </strong>
                    <span className={m.change > 0 ? "positive" : "negative"}>
                      {m.change > 0 ? "+" : ""}
                      {m.change}% <small>past 24h</small>
                    </span>
                    <div className="summary-spark">
                      <PriceChart market={m} mini />
                    </div>
                  </button>
                ))}
              </div>
              <div className="workspace-grid">
                <section className="panel chart-panel">
                  <div className="panel-heading">
                    <div className="chart-market">
                      <Coin symbol={selected.symbol} color={selected.color} />
                      <div>
                        <h3>{selected.name}</h3>
                        <small>{selected.pair}</small>
                      </div>
                      <ChevronDown size={14} />
                    </div>
                    <button
                      className="text-button"
                      onClick={() => {
                        setAlertOpen(true);
                        setError("");
                      }}
                    >
                      <Bell size={14} /> Set alert
                    </button>
                  </div>
                  <div className="chart-price">
                    {formatPrice(selected.price)}
                    <span
                      className={selected.change > 0 ? "positive" : "negative"}
                    >
                      {selected.change > 0 ? "+" : ""}
                      {selected.change}%<ArrowUpRight size={13} />
                    </span>
                  </div>
                  <div className="timeframes" aria-label="Chart timeframe">
                    {["1H", "4H", "1D", "1W", "1M"].map((t) => (
                      <button
                        className={timeframe === t ? "active" : ""}
                        key={t}
                        aria-pressed={timeframe === t}
                        onClick={() => setTimeframe(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <PriceChart market={selected} timeframe={timeframe} />
                  <div className="chart-footer">
                    <span>
                      <span className="status-dot" /> Illustrative price
                      movement
                    </span>
                    <span>Powered by perspective</span>
                  </div>
                </section>
                <section className="panel ai-panel">
                  <div className="panel-heading">
                    <h3>
                      <Sparkles size={16} /> AI insights
                    </h3>
                    <span className="tiny-ai">BETA</span>
                  </div>
                  {assistant}
                </section>
              </div>
              <section className="panel markets-panel">
                <div className="panel-heading">
                  <h3>
                    {activeTab === "Watchlist"
                      ? "Your watchlist"
                      : "Market overview"}
                    <span className="count-badge">{visible.length}</span>
                  </h3>
                  <label className="search-field">
                    <Search size={14} />
                    <input
                      placeholder="Search markets"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      aria-label="Search markets"
                    />
                  </label>
                </div>
                <div className="market-filters">
                  {["All markets", "Crypto", "Stocks", "Forex"].map((c) => (
                    <button
                      key={c}
                      className={category === c ? "active" : ""}
                      aria-pressed={category === c}
                      onClick={() => setCategory(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                {marketTable}
              </section>
              <section className="overview-intelligence-grid">
                <article className="panel overview-feed-panel">
                  <div className="panel-heading">
                    <h3><Newspaper size={17} /> Market news &amp; policy watch</h3>
                    <span className="tiny-ai">SAMPLE FEED</span>
                  </div>
                  <div className="overview-feed-list">
                    {[
                      { tag: "MACRO", title: "Central bank policy outlook: what traders are watching", desc: "Review rate expectations, official statements and the next scheduled policy decision.", time: "Today Ãƒâ€šÃ‚Â· Illustrative" },
                      { tag: "ECONOMY", title: "Economic calendar: upcoming high-impact releases", desc: "Check event timing, forecast versus previous values and the currencies in focus.", time: "Upcoming Ãƒâ€šÃ‚Â· Sample data" },
                      { tag: "MARKET", title: "Gold and currency markets: research themes to monitor", desc: "Compare dollar direction, yields and broader risk sentiment before drawing conclusions.", time: "Research note Ãƒâ€šÃ‚Â· Demo" },
                    ].map((item) => (
                      <DashboardQuickLink
                        className="overview-feed-item"
                        key={item.title}
                        label={`Open ${item.title}`}
                        onNavigate={() => setActiveTab(item.tag === "ECONOMY" ? "Economic Calendar" : item.tag === "MACRO" ? "Central Bank Intelligence" : "Trading News AI")}
                      >
                        <span className="feed-meta"><span>{item.tag}</span><small>{item.time}</small></span>
                        <strong>{item.title}</strong>
                        <p>{item.desc}</p>
                        <span className="feed-open">Open research <ArrowUpRight size={13}/></span>
                      </DashboardQuickLink>
                    ))}
                  </div>
                </article>
                <article className="panel overview-policy-panel">
                  <div className="panel-heading">
                    <h3><Landmark size={17}/> Policy &amp; central banks</h3>
                    <span className="tiny-ai">DEMO</span>
                  </div>
                  <div className="policy-highlight">
                    <span className="policy-icon"><Landmark size={19}/></span>
                    <div><strong>Policy monitor</strong><p>Follow rate decisions, meeting minutes and official communications.</p></div>
                  </div>
                  <div className="policy-stat-row"><span>Next event</span><strong>Policy decision Ãƒâ€šÃ‚Â· Sample</strong></div>
                  <div className="policy-stat-row"><span>Research focus</span><strong>Rates Ãƒâ€šÃ‚Â· Inflation Ãƒâ€šÃ‚Â· Outlook</strong></div>
                  <button className="button button-secondary button-small policy-action" onClick={() => setActiveTab("Central Bank Intelligence")}>Explore central bank intelligence <ArrowUpRight size={14}/></button>
                </article>
              </section>
              <section className="panel overview-modules-panel">
                <div className="panel-heading">
                  <h3><LayoutDashboard size={17}/> Your Trader World modules</h3>
                  <span className="count-badge">{nav.filter((n) => !["Overview", "Help & resources"].includes(n.label)).length}</span>
                </div>
                <p className="overview-modules-intro">Open a workspace tool. Modules not yet developed are clearly marked as upcoming demo screens.</p>
                <div className="overview-module-grid">
                  {nav.filter((n) => !["Overview", "Help & resources"].includes(n.label)).map(({label, icon: Icon, group}) => (
                    <DashboardModuleCard
                      key={label}
                      label={label}
                      group={group}
                      icon={Icon}
                      onNavigate={setActiveTab}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
          {activeTab === "Trader Passport" && (
            <section className="passport-page">
              <div className="passport-hero panel">
                <div className="passport-hero-top">
                  <span className="passport-mark"><IdCard size={24}/></span>
                  <span className="passport-status"><span/> Active Ãƒâ€šÃ‚Â· Demo passport</span>
                </div>
                <div className="passport-hero-content">
                  <p className="workspace-greeting">TRADER WORLD AI Ãƒâ€šÃ‚Â· DIGITAL IDENTITY</p>
                  <h3>Trader Passport</h3>
                  <p>Your trading identity and preferences in one secure workspace.</p>
                </div>
                <div className="passport-number-row">
                  <div><small>PASSPORT REFERENCE</small><strong>TWA-DEMO-000128</strong></div>
                  <BadgeCheck size={30}/>
                </div>
              </div>
              <div className="passport-section-heading">
                <div><p className="workspace-greeting">YOUR INFORMATION</p><h3>Passport details</h3></div>
                <button className="button button-secondary button-small" onClick={() => { setPassportEditOpen(v => !v); setPassportError(""); setPassportMessage(""); }}><Pencil size={14}/>{passportEditOpen ? "Close editor" : "Edit profile"}</button>
              </div>
              {passportMessage && <p className="passport-success" role="status"><Check size={15}/>{passportMessage}</p>}
              {passportEditOpen && (
                <form className="panel passport-edit-form" onSubmit={savePassportProfile}>
                  <div className="panel-heading"><h3><CircleUserRound size={17}/> Edit personal details</h3><span className="tiny-ai">USER EDITABLE</span></div>
                  <div className="passport-form-grid">
                    <label>Full name<input value={passportName} onChange={e => setPassportName(e.target.value)} minLength={2} maxLength={60} required/></label>
                    <label>Email address<input type="email" value={passportEmail} onChange={e => setPassportEmail(e.target.value)} required/></label>
                  </div>
                  <p className="passport-hint">Passport reference, status and trading preferences are managed by your administrator.</p>
                  {passportError && <p className="form-error" role="alert">{passportError}</p>}
                  <button className="button button-primary button-small" type="submit"><Save size={14}/> Save profile</button>
                </form>
              )}
              <div className="passport-info-grid">
                <article className="panel passport-info-card"><span className="passport-info-icon"><UserRound size={18}/></span><small>FULL NAME</small><strong>{passportName}</strong><span>Personal identity</span></article>
                <article className="panel passport-info-card"><span className="passport-info-icon"><Globe2 size={18}/></span><small>EMAIL ADDRESS</small><strong>{passportEmail}</strong><span>Account contact</span></article>
                <article className="panel passport-info-card"><span className="passport-info-icon"><ChartNoAxesCombined size={18}/></span><small>TRADING EXPERIENCE</small><strong>Not provided</strong><span>Set by administrator</span></article>
                <article className="panel passport-info-card"><span className="passport-info-icon"><WalletCards size={18}/></span><small>TRADER CATEGORY</small><strong>Not assigned</strong><span>Set by administrator</span></article>
                <article className="panel passport-info-card"><span className="passport-info-icon"><Star size={18}/></span><small>PREFERRED MARKETS</small><strong>Not configured</strong><span>Set by administrator</span></article>
                <article className="panel passport-info-card"><span className="passport-info-icon"><Shield size={18}/></span><small>RISK PROFILE</small><strong>Not assessed</strong><span>Set by administrator</span></article>
              </div>
              <div className="passport-lower-grid">
                <section className="panel passport-admin-card">
                  <div className="panel-heading"><h3><ShieldCheck size={17}/> Administrator information</h3><span className="tiny-ai">READ ONLY</span></div>
                  <div className="passport-detail-row"><span>Passport status</span><strong className="passport-active">Active Ãƒâ€šÃ‚Â· Demo</strong></div>
                  <div className="passport-detail-row"><span>Created on</span><strong>Not supplied</strong></div>
                  <div className="passport-detail-row"><span>Last updated</span><strong>Not supplied</strong></div>
                  <p className="passport-hint">Live administrator-issued passport data will appear here after the backend is connected.</p>
                </section>
                <section className="panel passport-security-card">
                  <div className="panel-heading"><h3><LockKeyhole size={17}/> Account security</h3></div>
                  <p>Change your account password. The form is frontend-only until authentication endpoints are connected.</p>
                  {!passwordEditOpen ? (
                    <button className="button button-secondary button-small" onClick={() => { setPasswordEditOpen(true); setPassportError(""); setPasswordMessage(""); }}><LockKeyhole size={14}/> Change password</button>
                  ) : (
                    <form className="stack-form passport-password-form" onSubmit={savePassportPassword}>
                      <label>Current password<input name="currentPassword" type="password" autoComplete="current-password" required/></label>
                      <label>New password<input name="newPassword" type="password" minLength={8} autoComplete="new-password" required/></label>
                      <label>Confirm new password<input name="confirmPassword" type="password" minLength={8} autoComplete="new-password" required/></label>
                      {passportError && <p className="form-error" role="alert">{passportError}</p>}
                      <div className="passport-form-actions"><button type="button" className="button button-secondary button-small" onClick={() => setPasswordEditOpen(false)}>Cancel</button><button type="submit" className="button button-primary button-small">Validate change <Check size={14}/></button></div>
                    </form>
                  )}
                  {passwordMessage && <p className="passport-hint" role="status">{passwordMessage}</p>}
                </section>
              </div>
            </section>
          )}
          {activeTab === "AI assistant" && (
            <section className="panel assistant-standalone assistant-chat-page">
              {assistant}
            </section>
          )}
          {activeTab === "Alerts" && (
            <section className="panel tool-panel">
              <div className="panel-heading">
                <h3>Price alerts</h3>
                <button
                  className="button button-primary button-small"
                  onClick={() => {
                    setAlertOpen(true);
                    setError("");
                  }}
                >
                  <Plus size={14} /> Create alert
                </button>
              </div>
              <p className="muted">
                Saved locally. Live monitoring and notifications require a
                connected market service.
              </p>
              {alerts.length ? (
                alerts.map((a) => (
                  <div className="saved-row" key={a.id}>
                    <Bell size={19} />
                    <div>
                      <strong>
                        {a.symbol} target: {formatPrice(a.price)}
                      </strong>
                      <small>Saved price target Ãƒâ€šÃ‚Â· Example data</small>
                    </div>
                    <button
                      className="icon-button"
                      aria-label={`Delete ${a.symbol} alert`}
                      onClick={() =>
                        setAlerts((v) => v.filter((x) => x.id !== a.id))
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <Bell size={30} />
                  <h3>Let the market come to you.</h3>
                  <p>Create a price target to keep your research organized.</p>
                </div>
              )}
            </section>
          )}
          {activeTab === "Journal" && (
            <section className="panel tool-panel">
              <h3>Your thinking, in one place.</h3>
              <p className="muted">
                Capture your research, decisions, and lessons. Notes stay in
                this browser.
              </p>
              <form onSubmit={saveNote} className="journal-form">
                <label htmlFor="journal-note">New journal entry</label>
                <textarea
                  id="journal-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What are you seeing in the market today?"
                  maxLength={2000}
                  rows={5}
                  required
                  aria-describedby={error ? "journal-error" : undefined}
                />
                <div className="form-bottom">
                  <small className="muted">{note.length} / 2,000</small>
                  <button
                    className="button button-primary button-small"
                    type="submit"
                  >
                    <Plus size={15} /> Save entry
                  </button>
                </div>
                {error && (
                  <p id="journal-error" className="form-error" role="alert">
                    {error}
                  </p>
                )}
              </form>
              {entries.length ? (
                entries.map((n) => (
                  <article key={n.id} className="journal-entry">
                    <div>
                      <time dateTime={n.date}>
                        {new Date(n.date).toLocaleString()}
                      </time>
                      <button
                        className="icon-button"
                        aria-label="Delete journal entry"
                        onClick={() =>
                          setEntries((v) => v.filter((x) => x.id !== n.id))
                        }
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <p>{n.text}</p>
                  </article>
                ))
              ) : (
                <p className="empty-state">
                  Your next insight starts with a note.
                </p>
              )}
            </section>
          )}
          {activeTab === "Help" && (
            <section className="panel tool-panel">
              <Globe2 size={30} />
              <h3>A workspace for a clearer routine.</h3>
              <p className="muted">
                Choose an asset in Overview to explore its example chart. Star a
                market to save it to your watchlist. Use AI assistant for
                illustrative research prompts, Alerts to save price targets, and
                Journal to record your thinking.
              </p>
              <p className="muted">
                This frontend runs entirely in your browser. It does not execute
                trades, stream live prices, or connect to a paid subscription.
                Your saved workspace is specific to this browser.
              </p>
              <button
                className="button button-primary"
                onClick={() => setActiveTab("Overview")}
              >
                Explore the workspace
                <ArrowUpRight size={15} />
              </button>
            </section>
          )}
          {!builtTabs.includes(activeTab) && (
            <section className="module-placeholder glass-panel">
              <div className="module-placeholder-icon"><Sparkles size={23}/></div>
              <span className="workspace-greeting">TRADER WORLD AI MODULE</span>
              <h3>{activeTab}</h3>
              <p>This module is part of your Trader World workspace. Its dedicated interactive screens will be added in the upcoming module updates. For now, explore the dashboard, watchlist, AI assistant, alerts and journal.</p>
              <div className="module-placeholder-actions">
                <button className="button button-primary button-small" onClick={() => setActiveTab("Overview")}>Back to overview <ArrowUpRight size={14}/></button>
                <span className="module-demo-note"><span/> Frontend demo Ãƒâ€šÃ‚Â· No API connected</span>
              </div>
            </section>
          )}
          </DashboardPageRenderer>
          <div className="workspace-footnote">
            <Check size={12} /> A calmer space to think.{" "}
            <span>Research tools, not financial advice.</span>
          </div>
        </div>
      </div>
      {!preview && (
        <div className="floating-ai-root">
          {floatingAiOpen && (
            <section className="floating-ai-window panel" aria-label="Ask Trader World AI">
              <div className="floating-ai-heading">
                <span className="gradient-icon"><Sparkles size={19}/></span>
                <div><strong>Ask Trader World AI</strong><small>Quick trading research - demo mode</small></div>
                <button className="icon-button" aria-label="Close AI assistant" onClick={() => setFloatingAiOpen(false)}><X size={17}/></button>
              </div>
              {assistant}
            </section>
          )}
          <button className="floating-ai-trigger" onClick={() => setFloatingAiOpen((v) => !v)} aria-expanded={floatingAiOpen}>
            <Sparkles size={19}/><span>{floatingAiOpen ? "Close assistant" : "Ask AI"}</span>
          </button>
        </div>
      )}
      {alertOpen && (
        <Modal title="Create a price alert" onClose={() => setAlertOpen(false)}>
          <p className="muted">
            Save a target for {selected.name}. Live notifications are not
            connected.
          </p>
          <form onSubmit={saveAlert} className="stack-form">
            <label htmlFor="alert-price">Target price (USD)</label>
            <input
              id="alert-price"
              name="price"
              type="number"
              step="any"
              min="0.00001"
              placeholder={String(selected.price)}
              required
              autoFocus
            />
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="button button-primary">
              Save price target
              <Check size={16} />
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
