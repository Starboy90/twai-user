"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { ArrowRight, ArrowUpRight, Eye, EyeOff, LockKeyhole, Mail, Menu, ShieldCheck, X } from "lucide-react";
import { Brand } from "@/components/ui";

type Mode = "login" | "register" | "forgot";

type AuthPageProps = { initialMode?: Mode };

type DemoUser = { name: string; email: string; password: string };
const DEMO_USER_KEY = "twai-demo-user";
const DEMO_SESSION_KEY = "twai-demo-session";
const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must contain at least 8 characters."),
});
const registerSchema = z.object({
  name: z.string().trim().min(2, "Enter at least 2 characters.").max(60, "Name must be 60 characters or fewer."),
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters."),
  confirmPassword: z.string(),
  terms: z.literal("on", { error: "Please accept the terms to continue." }),
}).refine((v) => v.password === v.confirmPassword, {
  path: ["confirmPassword"], message: "Passwords do not match.",
});
const forgotSchema = z.object({ email: z.string().trim().email("Enter a valid email address.") });

export default function AuthPage({ initialMode = "login" }: AuthPageProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [menu, setMenu] = useState(false);

  function changeMode(next: Mode) {
    setMode(next); setMessage(""); setError(""); setFieldErrors({});
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(""); setError(""); setFieldErrors({});
    const form = new FormData(event.currentTarget);
    const raw = Object.fromEntries(form.entries());
    const parsed = mode === "login" ? loginSchema.safeParse(raw)
      : mode === "register" ? registerSchema.safeParse(raw)
      : forgotSchema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0] ?? "form")] = issue.message;
      setFieldErrors(next); return;
    }

    // Frontend-only demo authentication. No API calls are made in this phase.
    setBusy(true);
    try {
      if (mode === "forgot") {
        setMessage("Demo mode: password reset flow validated. No email was sent.");
        return;
      }

      if (mode === "register") {
        const user: DemoUser = {
          name: String(raw.name ?? "").trim(),
          email: String(raw.email ?? "").trim().toLowerCase(),
          password: String(raw.password ?? ""),
        };
        localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
        localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify({
          name: user.name,
          email: user.email,
          signedInAt: new Date().toISOString(),
        }));
        window.location.assign("/dashboard");
        return;
      }

      const email = String(raw.email ?? "").trim().toLowerCase();
      const password = String(raw.password ?? "");
      const stored = localStorage.getItem(DEMO_USER_KEY);
      const savedUser = stored ? (JSON.parse(stored) as DemoUser) : null;
      // Demo convenience: first valid login creates a local demo identity.
      if (savedUser && (savedUser.email !== email || savedUser.password !== password)) {
        setError("Email or password does not match the locally registered demo account.");
        return;
      }
      const user = savedUser ?? { name: email.split("@")[0] || "Trader", email, password };
      if (!savedUser) localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
      localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify({
        name: user.name,
        email: user.email,
        signedInAt: new Date().toISOString(),
      }));
      window.location.assign("/dashboard");
    } catch {
      setError("Browser storage is unavailable. Please enable local storage and try again.");
    } finally {
      setBusy(false);
    }
  }

  const title = mode === "login" ? "Welcome back." : mode === "register" ? "Create your account." : "Reset your password.";
  return (
    <main className="auth-page">
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
      </div>
            <header className="site-header auth-site-header">
        <div className="nav-shell">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <div className="nav-item"><Link href="/#home">Home</Link></div>
            <div className="nav-item"><Link href="/#tools">AI Tools</Link></div>
            <div className="nav-item"><Link href="/#brokers">Brokers</Link></div>
            <div className="nav-item"><Link href="/#prop-firms">Prop Firms</Link></div>
            <div className="nav-item"><Link href="/#intelligence">Market Intelligence</Link></div>
            <div className="nav-item"><Link href="/#pricing">Pricing</Link></div>
            <div className="nav-item"><Link href="/#about">About</Link></div>
            <div className="nav-item"><Link href="/contact">Contact</Link></div>
          </nav>
          <div className="nav-actions">
            <Link className="signin-button" href="/login" aria-current={mode === "login" ? "page" : undefined}>Sign In</Link>
            <Link className="button button-primary nav-cta" href="/register" aria-current={mode === "register" ? "page" : undefined}>Get Started</Link>
            <button className="icon-button menu-toggle" type="button" aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu} aria-controls="auth-mobile-navigation" onClick={() => setMenu(!menu)}>
              {menu ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        {menu && (
          <nav id="auth-mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
            <Link href="/#home" onClick={() => setMenu(false)}>Home <ArrowUpRight size={15} /></Link>
            <Link href="/#tools" onClick={() => setMenu(false)}>AI Tools <ArrowUpRight size={15} /></Link>
            <Link href="/#brokers" onClick={() => setMenu(false)}>Brokers <ArrowUpRight size={15} /></Link>
            <Link href="/#prop-firms" onClick={() => setMenu(false)}>Prop Firms <ArrowUpRight size={15} /></Link>
            <Link href="/#intelligence" onClick={() => setMenu(false)}>Market Intelligence <ArrowUpRight size={15} /></Link>
            <Link href="/#pricing" onClick={() => setMenu(false)}>Pricing <ArrowUpRight size={15} /></Link>
            <Link href="/#about" onClick={() => setMenu(false)}>About <ArrowUpRight size={15} /></Link>
            <Link href="/contact" onClick={() => setMenu(false)}>Contact <ArrowUpRight size={15} /></Link>
            <Link href="/login" onClick={() => setMenu(false)}>Sign In <ArrowUpRight size={15} /></Link>
            <Link href="/register" onClick={() => setMenu(false)}>Get Started <ArrowUpRight size={15} /></Link>
          </nav>
        )}
      </header>
      <section className="auth-layout">
        <div className="auth-story">
          <span className="auth-kicker"><ShieldCheck size={14}/> YOUR TRADING WORKSPACE</span>
          <h1>A clearer view.<br/><span>One step at a time.</span></h1>
          <p>Bring your market research, trading tools and personal workflow together in Trader World AI.</p>
          <div className="auth-trust"><LockKeyhole size={16}/><span>Demo mode: your sample account is stored locally in this browser. No backend or API is used.</span></div>
          <div className="auth-security-float" aria-label="Risk and security tools">
            <span className="auth-security-float-icon"><ShieldCheck size={16} /></span>
            <span><strong>Risk-aware workspace</strong><small>Security &amp; risk tools</small></span>
          </div>
        </div>
        <div className="auth-card">
          <div className="auth-card-head"><span className="auth-icon"><Mail size={19}/></span><p className="eyebrow">TRADER WORLD AI</p><h2>{title}</h2><p>{mode === "login" ? "Sign in to continue to your workspace." : mode === "register" ? "Set up your personal trading workspace." : "Enter your email and we'll send reset instructions if an account exists."}</p></div>
          <form className="auth-form" onSubmit={submit} noValidate>
            {mode === "register" && <label>Full name<input name="name" autoComplete="name" placeholder="Your full name" maxLength={60} aria-invalid={!!fieldErrors.name}/>{fieldErrors.name && <small className="auth-error">{fieldErrors.name}</small>}</label>}
            <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required aria-invalid={!!fieldErrors.email}/>{fieldErrors.email && <small className="auth-error">{fieldErrors.email}</small>}</label>
            {mode !== "forgot" && <label>Password<div className="auth-password"><input name="password" type={showPassword ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder="At least 8 characters" minLength={8} required aria-invalid={!!fieldErrors.password}/><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div>{fieldErrors.password && <small className="auth-error">{fieldErrors.password}</small>}</label>}
            {mode === "register" && <><label>Confirm password<input name="confirmPassword" type="password" autoComplete="new-password" placeholder="Re-enter password" required aria-invalid={!!fieldErrors.confirmPassword}/>{fieldErrors.confirmPassword && <small className="auth-error">{fieldErrors.confirmPassword}</small>}</label><label className="auth-terms"><input name="terms" type="checkbox"/> <span>I agree to the Terms and Privacy Policy.</span></label>{fieldErrors.terms && <small className="auth-error">{fieldErrors.terms}</small>}</>}
            {mode === "login" && <div className="auth-forgot"><button type="button" onClick={() => changeMode("forgot")}>Forgot password?</button></div>}
            {error && <p className="auth-alert" role="alert">{error}</p>}
            {message && <p className="auth-success" role="status">{message}</p>}
            <button className="button button-primary auth-submit" type="submit" disabled={busy}>{busy ? "Please wait…" : mode === "login" ? "Sign in" : mode === "register" ? "Create account" : "Send reset instructions"} <ArrowRight size={16}/></button>
          </form>
          <div className="auth-switch">{mode === "login" ? <>New to Trader World AI? <button onClick={() => changeMode("register")}>Create account</button></> : mode === "register" ? <>Already have an account? <button onClick={() => changeMode("login")}>Sign in</button></> : <button onClick={() => changeMode("login")}>Back to sign in</button>}</div>
        </div>
      </section>
      <footer className="auth-footer">© 2026 Trader World AI · Trading involves risk. Always do your own research.</footer>
    </main>
  );
}
