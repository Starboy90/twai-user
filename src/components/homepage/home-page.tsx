"use client";
import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  LockKeyhole,
  Menu,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  X,
} from "lucide-react";
import { z } from "zod";
import {
  pageCopy,
  headlines,
  navigation,
  quotes,
  site,
  toolGroups,
  workflow,
} from "@/data";
import { Brand, Modal, Reveal } from "../ui";
import { Workspace } from "../workspace";
import { BrokerDiscovery, Heading, PropDiscovery } from "../discovery";
import {
  AssistantDemo,
  HeroChart,
  PassportSection,
  RiskCalculator,
  ToolDirectory,
} from "../research-tools";
import { Faq, PackageBuilder, Pricing } from "../pricing";
import { ToolIcon } from "../tool-icon";

const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter at least 2 characters.")
    .max(60, "Use 60 characters or fewer."),
  email: z.email("Please enter a valid email address."),
  consent: z.literal(true, {
    error: "Please confirm that you understand this is a demo.",
  }),
});
type FormErrors = Partial<
  Record<"name" | "email" | "consent" | "storage", string>
>;
type Dialog =
  | "signup"
  | "workspace"
  | "privacy"
  | "terms"
  | "risk"
  | "contact"
  | "tool"
  | null;
export function HomePage() {
  const [dialog, setDialog] = useState<Dialog>(null),
    [menu, setMenu] = useState(false),
    [toolsMenu, setToolsMenu] = useState(false),
    [errors, setErrors] = useState<FormErrors>({}),
    [success, setSuccess] = useState(false),
    [active, setActive] = useState("#home"),
    [selection, setSelection] = useState({
      plan: "Starter",
      price: 19,
      period: "month",
    }),
    [tool, setTool] = useState("");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  // Track scroll direction so the decorative crypto coins spin with the page movement.
  useEffect(() => {
    const root = document.documentElement;
    let lastY = window.scrollY;
    let direction = "down";
    const onScroll = () => {
      const nextY = window.scrollY;
      if (Math.abs(nextY - lastY) < 3) return;
      const nextDirection = nextY > lastY ? "down" : "up";
      if (nextDirection !== direction) {
        root.dataset.scrollDirection = nextDirection;
        direction = nextDirection;
      }
      lastY = nextY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      delete root.dataset.scrollDirection;
    };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    for (const n of navigation) {
      const el = document.querySelector(n.href);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    function key(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setDialog("workspace");
      }
      if (e.key === "Escape") {
        setMenu(false);
        setToolsMenu(false);
      }
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  // V32 subtle mouse parallax for the homepage hero.
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;
    const root = document.documentElement;
    const onPointerMove = (event: PointerEvent) => {
      const x = (event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2;
      const y = (event.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2;
      root.style.setProperty("--twai-mouse-x", String(Math.max(-1, Math.min(1, x))));
      root.style.setProperty("--twai-mouse-y", String(Math.max(-1, Math.min(1, y))));
    };
    const resetPointer = () => {
      root.style.setProperty("--twai-mouse-x", "0");
      root.style.setProperty("--twai-mouse-y", "0");
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", resetPointer);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", resetPointer);
      resetPointer();
    };
  }, []);
  const close = () => setDialog(null);
  function choose(plan = "Starter", price = 19, period = "month") {
    setSelection({ plan, price, period });
    setErrors({});
    setSuccess(false);
    setDialog("signup");
    setMenu(false);
  }
  function legal(kind: Dialog) {
    setSuccess(false);
    setErrors({});
    setDialog(kind);
  }
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const result = profileSchema.safeParse({
      name: f.get("name"),
      email: f.get("email"),
      consent: f.get("consent") === "on",
    });
    if (!result.success) {
      const next: FormErrors = {};
      for (const issue of result.error.issues)
        next[issue.path[0] as keyof FormErrors] = issue.message;
      setErrors(next);
      return;
    }
    try {
      localStorage.setItem(
        "twai-profile",
        JSON.stringify({ ...result.data, ...selection }),
      );
      setErrors({});
      setSuccess(true);
    } catch {
      setErrors({
        storage:
          "Your browser did not allow a profile to be saved. You can still explore without a profile.",
      });
    }
  }
  function openTool(name: string) {
    setToolsMenu(false);
    if (name.includes("Broker")) {
      document
        .querySelector("#brokers")
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (name.includes("Prop Firm")) {
      document
        .querySelector("#prop-firms")
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (name.includes("Calculator") || name.includes("Risk Planner")) {
      document.querySelector("#risk")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (name.includes("Credits")) {
      document
        .querySelector("#pricing")
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (name === "Ask Trader World AI") {
      document
        .querySelector("#assistant")
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setTool(name);
    setDialog("tool");
  }
  return (
    <>
                  <div className="crypto-float-layer" aria-hidden="true">
        <span className="crypto-float-icon crypto-bitcoin"><span className="crypto-coin-face"><svg className="crypto-brand-svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="#F7931A"/><text x="24" y="32" textAnchor="middle" fontSize="27" fontWeight="800" fill="#fff">₿</text></svg></span></span>
        <span className="crypto-float-icon crypto-tether"><span className="crypto-coin-face"><svg className="crypto-brand-svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="#26A17B"/><path d="M10 11h28v6H27v5.2c7.1.35 12 1.55 12 3.35 0 2.1-6.7 3.8-15 3.8s-15-1.7-15-3.8c0-1.8 4.9-3 12-3.35V17H10zM21 29.1v8.2h6v-8.2c-1 .04-2 .06-3 .06s-2-.02-3-.06z" fill="#fff"/><path d="M11 25.5c2.6 2.5 23.4 2.5 26 0" fill="none" stroke="#fff" strokeWidth="1.4" opacity=".8"/></svg></span></span>
        <span className="crypto-float-icon crypto-ethereum"><span className="crypto-coin-face"><svg className="crypto-brand-svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="#26334F"/><path d="M24 6 12.7 24.2 24 30.8l11.3-6.6L24 6z" fill="#D7E0F0"/><path d="M24 6v24.8l11.3-6.6L24 6z" fill="#8798B5"/><path d="m12.7 27.1 11.3 14.7 11.3-14.7L24 33.6l-11.3-6.5z" fill="#AAB8D0"/><path d="M24 33.6v8.2l11.3-14.7L24 33.6z" fill="#7183A5"/></svg></span></span>
        <span className="crypto-float-icon crypto-solana"><span className="crypto-coin-face"><svg className="crypto-brand-svg" viewBox="0 0 48 48"><defs><linearGradient id="twai-sol-gradient-v37" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#9B5DE5"/><stop offset=".52" stopColor="#24D8B8"/><stop offset="1" stopColor="#6C73F5"/></linearGradient></defs><circle cx="24" cy="24" r="21" fill="#171A35"/><g fill="url(#twai-sol-gradient-v37)"><path d="M13 13h24l-5 5H8z"/><path d="M11 21h24l5 5H16z"/><path d="M13 29h24l-5 5H8z"/></g></svg></span></span>
        <span className="crypto-float-icon crypto-xrp"><span className="crypto-coin-face"><svg className="crypto-brand-svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="#202A3B"/><path d="M12 13h5.2l6.8 6.1 6.8-6.1H36l-9.2 8.2a4.2 4.2 0 0 1-5.6 0L12 13zm24 22h-5.2L24 28.9 17.2 35H12l9.2-8.2a4.2 4.2 0 0 1 5.6 0L36 35z" fill="#fff"/></svg></span></span>
        <span className="crypto-float-icon crypto-litecoin"><span className="crypto-coin-face"><svg className="crypto-brand-svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="#345D9D"/><text x="24" y="32" textAnchor="middle" fontSize="27" fontWeight="700" fill="#fff">Ł</text></svg></span></span>
        <span className="crypto-float-icon crypto-bnb"><span className="crypto-coin-face"><svg className="crypto-brand-svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="#F0B90B"/><g fill="#fff"><path d="m24 9 5.3 5.3-5.3 5.3-5.3-5.3z"/><path d="m12.6 20.4 5.3-5.3 5.3 5.3-5.3 5.3z"/><path d="m30.1 20.4 5.3-5.3 5.3 5.3-5.3 5.3z"/><path d="m24 26.1 5.3 5.3-5.3 5.3-5.3-5.3z"/><path d="m24 20.1 3.9 3.9-3.9 3.9-3.9-3.9z"/></g></svg></span></span>
        <span className="crypto-float-icon crypto-dogecoin"><span className="crypto-coin-face"><svg className="crypto-brand-svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="#C2A633"/><text x="24" y="32" textAnchor="middle" fontSize="26" fontWeight="800" fill="#fff">Ð</text></svg></span></span>
        <span className="crypto-float-icon crypto-cardano"><span className="crypto-coin-face"><svg className="crypto-brand-svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="#1746B5"/><g fill="#fff"><circle cx="24" cy="24" r="3.2"/><circle cx="24" cy="13" r="1.8"/><circle cx="24" cy="35" r="1.8"/><circle cx="13" cy="24" r="1.8"/><circle cx="35" cy="24" r="1.8"/><circle cx="16.2" cy="16.2" r="1.45"/><circle cx="31.8" cy="16.2" r="1.45"/><circle cx="16.2" cy="31.8" r="1.45"/><circle cx="31.8" cy="31.8" r="1.45"/><circle cx="24" cy="8" r="1"/><circle cx="24" cy="40" r="1"/><circle cx="8" cy="24" r="1"/><circle cx="40" cy="24" r="1"/></g></svg></span></span>
        <span className="crypto-float-icon crypto-avalanche"><span className="crypto-coin-face"><svg className="crypto-brand-svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="#E84142"/><path d="M24 10.5 37.5 36h-7.3L24 23.9 17.8 36h-7.3L24 10.5z" fill="#fff"/><path d="m24 27.5 4.1 8.5h-8.2z" fill="#E84142"/></svg></span></span>
      </div>      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <header className="site-header">
        <div className="nav-shell">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((n) => (
              <div className="nav-item" key={n.href}>
                {n.label === "AI Tools" ? (
                  <>
                    <button
                      className={active === n.href ? "active" : ""}
                      aria-expanded={toolsMenu}
                      aria-controls="tools-dropdown"
                      onClick={() => setToolsMenu(!toolsMenu)}
                    >
                      AI Tools
                      <ChevronDown size={12} />
                    </button>
                    {toolsMenu && (
                      <div className="tools-dropdown glass" id="tools-dropdown">
                        <a href="#tools" onClick={() => setToolsMenu(false)}>
                          Explore all 22 tools
                          <ArrowUpRight size={14} />
                        </a>
                        {toolGroups.map((g) => (
                          <a
                            key={g.title}
                            href="#tools"
                            onClick={() => setToolsMenu(false)}
                          >
                            <span className={`category-dot color-${g.color}`} />
                            {g.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    className={active === n.href ? "active" : ""}
                    href={n.href}
                  >
                    {n.label}
                  </a>
                )}
              </div>
            ))}
            <div className="nav-item"><a href="/contact">Contact</a></div>
          </nav>
          <div className="nav-actions">
            <a className="signin-button" href="/login">
              Sign In
            </a>
            <button
              className="button button-primary nav-cta"
              onClick={() => choose()}
            >
              Get Started
            </button>
            <button
              className="icon-button menu-toggle"
              aria-label={menu ? "Close navigation" : "Open navigation"}
              aria-expanded={menu}
              aria-controls="mobile-navigation"
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menu && (
            <motion.nav
              id="mobile-navigation"
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {navigation.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenu(false)}>
                  {n.label}
                  <ArrowUpRight size={15} />
                </a>
              ))}
              <a href="/contact" onClick={() => setMenu(false)}>Contact <ArrowUpRight size={15} /></a>
              <button onClick={() => choose()}>
                Get Started
                <ArrowRight size={15} />
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <main id="main">
        <section id="home" className="hero">
          <div className="hero-grid" />
          <div className="container hero-layout">
            <Reveal className="hero-copy">
              <span className="hero-badge">
                <span /> {pageCopy.hero.badge}
              </span>
              <h1>
                {pageCopy.hero.first}{" "}
                <span className="gradient-text">
                  {pageCopy.hero.firstAccent}
                </span>
                <br />
                {pageCopy.hero.second}
                <br />
                <span className="gradient-text">{pageCopy.hero.third}</span>
              </h1>
              <p>
                Your <strong className="gradient-text">AI-Powered</strong>{" "}
                {pageCopy.hero.description}
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#assistant">
                  Ask the AI Assistant
                  <ArrowRight size={16} />
                </a>
                <a className="button button-secondary" href="#tools">
                  Explore 22 AI Tools
                </a>
              </div>
              <div className="hero-checks">
                <span>
                  <Check size={13} />
                  22 AI tools connected
                </span>
                <span>
                  <Check size={13} />
                  Broker & prop matching
                </span>
                <span>
                  <Check size={13} />
                  7-day free trial*
                </span>
              </div>
              <div className="hero-shortcuts">
                <button onClick={() => openTool("Chart & Strategy AI")}>
                  Chart AI
                </button>
                <a href="#brokers">Broker Compare</a>
                <a href="#risk">Risk Planner</a>
                <button onClick={() => setDialog("workspace")}>Journal</button>
              </div>
            </Reveal>
            <Reveal className="hero-visual" delay={0.15}>
              <HeroChart />
              <div className="hero-security-float" aria-label="Risk and security tools">
                <span className="hero-security-icon"><ShieldCheck size={17} /></span>
                <span className="hero-security-copy">
                  <strong>Risk-aware workspace</strong>
                  <small>Security &amp; risk tools</small>
                </span>
              </div>
            </Reveal>
          </div>
          <div className="container">
            <Reveal className="glass quotes-panel">
              {quotes.map((q) => (
                <div key={q.symbol}>
                  <div>
                    <span>{q.symbol}</span>
                    <small
                      className={
                        q.change.startsWith("+") ? "positive" : "negative"
                      }
                    >
                      {q.change.startsWith("+") ? "↗" : "↘"} {q.change}
                    </small>
                  </div>
                  <strong>{q.price}</strong>
                  <span>SIMULATED QUOTE</span>
                </div>
              ))}
            </Reveal>
          </div>
          <div className="headline-ticker">
            <div className="headline-track">
              {[...headlines, ...headlines].map((h, i) => (
                <span key={i}>
                  <strong>{h.symbol}</strong>
                  {h.text}
                  <small>SIMULATED</small>
                </span>
              ))}
            </div>
          </div>
        </section>
        <AssistantDemo />
        <ToolDirectory onTool={openTool} />
        <BrokerDiscovery />
        <PropDiscovery />
        <RiskCalculator />
        <PassportSection onOpen={() => setDialog("workspace")} />
        <section className="section" id="about">
          <div className="container">
            <Heading copy={pageCopy.workflow} />
            <div className="workflow-grid">
              {workflow.map((s, i) => (
                <Reveal
                  key={s.title}
                  delay={i * 0.07}
                  className="glass workflow-card"
                >
                  <div>
                    <span className="gradient-icon">
                      <ToolIcon name={s.icon} size={21} />
                    </span>
                    <strong>0{i + 1}</strong>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <Pricing onChoose={choose} />
        <PackageBuilder onChoose={choose} />
        <Faq />
      </main>
      <footer className="footer">
        <div className="container glass footer-card">
          <div className="footer-top">
            <div className="footer-brand">
              <Brand />
              <p>{pageCopy.footer}</p>
              <button
                className="inline-link"
                onClick={() => setDialog("workspace")}
              >
                Explore the workspace
                <ArrowUpRight size={14} />
              </button>
            </div>
            <div className="footer-links">
              <div>
                <span>PLATFORM</span>
                <a href="#tools">AI Tools</a>
                <a href="#brokers">Brokers</a>
                <a href="#prop-firms">Prop Firms</a>
                <a href="#pricing">Pricing</a>
                <a href="#about">How It Works</a>
              </div>
              <div>
                <span>COMPANY</span>
                <a href="#about">About</a>
                <a href="#intelligence">Market Intelligence</a>
                <a href="#faq">FAQ</a>
                <a href="/contact">Contact</a>
              </div>
              <div>
                <span>LEGAL</span>
                <button onClick={() => legal("terms")}>
                  Terms & Conditions
                </button>
                <button onClick={() => legal("privacy")}>Privacy Policy</button>
                <button onClick={() => legal("risk")}>Risk Disclosure</button>
              </div>
            </div>
          </div>
          <div className="risk-warning">
            <TriangleAlert size={17} />
            <p>
              <strong>Risk warning:</strong> {pageCopy.riskWarning}
            </p>
          </div>
          <div className="footer-bottom">
            <span>
              © {site.copyrightYear} Trader World AI. All rights reserved.
            </span>
            <span>SIMULATED DATA · DEMO EXPERIENCE</span>
          </div>
        </div>
      </footer>
      {dialog === "workspace" && (
        <Modal title="Your workspace" onClose={close}>
          <Workspace onClose={close} />
        </Modal>
      )}
      {dialog === "signup" && (
        <Modal
          title={
            success ? "Your workspace is ready." : "Start your trading journey"
          }
          onClose={close}
        >
          {success ? (
            <div className="signup-success">
              <span className="success-icon">
                <Check size={28} />
              </span>
              <p>
                Your demo profile and plan selection are saved in this browser.
              </p>
              <p className="muted">
                No account or subscription was created. No payment was taken.
              </p>
              <button
                className="button button-primary"
                onClick={() => setDialog("workspace")}
              >
                Enter your workspace
                <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <>
              <p className="modal-description">
                Create a local demo profile. Explore the platform before
                connecting a backend.
              </p>
              <div className="selected-plan">
                <Sparkles size={18} />
                <span>{selection.plan}</span>
                <strong>
                  ${selection.price}/{selection.period === "year" ? "yr" : "mo"}
                </strong>
              </div>
              <form className="stack-form" onSubmit={submit} noValidate>
                <label htmlFor="signup-name">Your name</label>
                <input
                  id="signup-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Alex Morgan"
                  required
                  maxLength={60}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p className="form-error" id="name-error">
                    {errors.name}
                  </p>
                )}
                <label htmlFor="signup-email">Email address</label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p className="form-error" id="email-error">
                    {errors.email}
                  </p>
                )}
                <label className="checkbox-label">
                  <input
                    name="consent"
                    type="checkbox"
                    required
                    aria-describedby={
                      errors.consent ? "consent-error" : undefined
                    }
                  />
                  <span>
                    I understand this is a demo. My profile stays in this
                    browser; no payment is collected.
                  </span>
                </label>
                {errors.consent && (
                  <p className="form-error" id="consent-error">
                    {errors.consent}
                  </p>
                )}
                {errors.storage && (
                  <p className="form-error" role="alert">
                    {errors.storage}
                  </p>
                )}
                <button className="button button-primary" type="submit">
                  Create demo profile
                  <ArrowRight size={16} />
                </button>
              </form>
              <button
                className="signup-skip"
                onClick={() => setDialog("workspace")}
              >
                Explore without a profile
                <ArrowRight size={13} />
              </button>
              <p className="modal-footnote">
                <LockKeyhole size={12} /> Demo only · No card required · No
                active trial subscription
              </p>
            </>
          )}
        </Modal>
      )}
      {dialog === "tool" && (
        <ToolDialog
          name={tool}
          onClose={close}
          onWorkspace={() => setDialog("workspace")}
        />
      )}
      {(dialog === "privacy" ||
        dialog === "terms" ||
        dialog === "risk" ||
        dialog === "contact") && (
        <Modal
          title={
            dialog === "privacy"
              ? "Privacy policy"
              : dialog === "terms"
                ? "Terms & conditions"
                : dialog === "risk"
                  ? "Risk disclosure"
                  : "Get in touch"
          }
          onClose={close}
        >
          <div className="legal-copy">
            {dialog === "privacy" ? (
              <>
                <p>
                  This demo stores your optional name, email, plan selection,
                  watchlist, journal and price targets in browser local storage.
                  Forms do not send your data to a server. There is no account
                  recovery or cloud synchronization.
                </p>
                <p>
                  Remove saved information at any time using the button below.
                </p>
                <button
                  className="button button-secondary"
                  onClick={() => {
                    try {
                      localStorage.removeItem("twai-profile");
                      localStorage.removeItem("twai-workspace");
                      localStorage.removeItem("twai-contact-draft");
                      window.dispatchEvent(new Event("twai-storage"));
                      setSuccess(true);
                    } catch {
                      setErrors({
                        storage:
                          "Your browser did not allow stored data to be removed.",
                      });
                    }
                  }}
                >
                  Clear my demo data
                  <X size={15} />
                </button>
                {success && (
                  <p className="positive" role="status">
                    Your saved demo data has been removed.
                  </p>
                )}
                {errors.storage && (
                  <p className="form-error">{errors.storage}</p>
                )}
              </>
            ) : dialog === "contact" ? (
              <ContactForm />
            ) : (
              <>
                <p>{site.disclaimer}</p>
                <p>
                  This is a demonstration frontend. No trade execution, real
                  authentication, live price alerts, AI provider, or billing
                  service is connected. Broker names, challenge rules and market
                  data are illustrative examples.
                </p>
                <p>
                  Selecting a plan or a custom package does not create a paid
                  subscription. The displayed trial is a demonstration offer; no
                  trial starts when using this frontend.
                </p>
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
function ContactForm() {
  const [sent, setSent] = useState(false),
    [error, setError] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const parsed = z
      .object({
        email: z.email(),
        message: z.string().trim().min(10).max(3000),
      })
      .safeParse({ email: f.get("email"), message: f.get("message") });
    if (!parsed.success) {
      setError(
        "Enter a valid email and a message between 10 and 3,000 characters.",
      );
      return;
    }
    try {
      localStorage.setItem("twai-contact-draft", JSON.stringify(parsed.data));
      setSent(true);
      setError("");
    } catch {
      setError(
        "Browser storage is unavailable. Your draft could not be saved.",
      );
    }
  }
  return sent ? (
    <div className="signup-success">
      <span className="success-icon">
        <Check size={26} />
      </span>
      <p role="status">
        Your message draft is saved in this browser. It has not been sent: a
        support backend is not connected.
      </p>
    </div>
  ) : (
    <>
      <p>
        Write a support message below. This demo saves a draft locally; it does
        not send email.
      </p>
      <form className="stack-form" onSubmit={submit}>
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
        <label htmlFor="contact-message">Your message</label>
        <textarea
          id="contact-message"
          name="message"
          minLength={10}
          maxLength={3000}
          rows={5}
          required
        />
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="button button-primary" type="submit">
          Save message draft
          <Check size={16} />
        </button>
      </form>
    </>
  );
}
function ToolDialog({
  name,
  onClose,
  onWorkspace,
}: {
  name: string;
  onClose: () => void;
  onWorkspace: () => void;
}) {
  const definition = toolGroups
    .flatMap((g) => g.tools)
    .find((t) => t.name === name);
  const [input, setInput] = useState(""),
    [result, setResult] = useState(""),
    [error, setError] = useState("");
  const isWorkspace = [
    "Journal",
    "Passport",
    "Watchlist",
    "History",
    "Saved Analysis",
  ].some((word) => name.includes(word));
  function analyze(e: FormEvent) {
    e.preventDefault();
    const parsed = z
      .string()
      .trim()
      .min(10, "Add at least 10 characters so there is enough context.")
      .max(3000)
      .safeParse(input);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError("");
    setResult(
      name.includes("Checklist")
        ? "Research checklist: confirm your thesis, define your entry and invalidation, check upcoming events, verify position size, and write down your maximum acceptable loss. Review each item before making any decision."
        : name.includes("Education")
          ? "Start with the basics: understand the market structure, learn how orders work, and practice defining risk. Keep a journal of your questions and revisit your assumptions. This is an example learning response; no live AI service is connected."
          : "A useful research framework: identify the relevant timeframe, compare recent price structure with the broader context, note your assumptions, and define what would invalidate your idea. These are illustrative research steps. A live AI or data service is needed for analysis of your specific input.",
    );
  }
  return (
    <Modal title={name} onClose={onClose}>
      <p className="modal-description">{definition?.description}</p>
      {isWorkspace ? (
        <>
          <p className="muted">
            Open your personal workspace to save notes, manage a watchlist,
            create price targets, and explore the research assistant. Changes
            stay in this browser.
          </p>
          <button
            className="button button-primary"
            style={{ marginTop: 24 }}
            onClick={onWorkspace}
          >
            Open workspace
            <ArrowUpRight size={16} />
          </button>
        </>
      ) : (
        <>
          <span className="demo-tag">
            <ShieldCheck size={12} /> Interactive frontend demonstration
          </span>
          <form className="stack-form" onSubmit={analyze}>
            <label htmlFor="tool-context">
              Your question or research context
            </label>
            <textarea
              id="tool-context"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe what you would like to explore…"
              rows={4}
              maxLength={3000}
              required
            />
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button className="button button-primary" type="submit">
              Explore example analysis
              <Sparkles size={15} />
            </button>
          </form>
          {result && (
            <div className="example-result" role="status">
              <strong>Example research response</strong>
              <p>{result}</p>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}
