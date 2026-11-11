"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Brand } from "./ui";
import {
  ArrowUpRight,
  Check,
  CircleHelp,
  Mail,
  Menu,
  MessageSquareText,
  Send,
  X,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type ContactDraft = {
  name: string;
  email: string;
  topic: string;
  message: string;
  savedAt: string;
};

export function ContactPage() {
  const [saved, setSaved] = useState(false);
  const [menu, setMenu] = useState(false);
  const [error, setError] = useState("");
  // V39 crypto scroll direction listener
  useEffect(() => {
    const root = document.documentElement;
    let lastY = window.scrollY;
    const onScroll = () => {
      const nextY = window.scrollY;
      if (Math.abs(nextY - lastY) < 3) return;
      root.dataset.scrollDirection = nextY > lastY ? "down" : "up";
      lastY = nextY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const draft: ContactDraft = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      topic: String(form.get("topic") ?? "General enquiry"),
      message: String(form.get("message") ?? "").trim(),
      savedAt: new Date().toISOString(),
    };

    if (draft.name.length < 2 || !/^\S+@\S+\.\S+$/.test(draft.email)) {
      setError("Please enter your name and a valid email address.");
      return;
    }
    if (draft.message.length < 10 || draft.message.length > 3000) {
      setError("Your message must be between 10 and 3,000 characters.");
      return;
    }

    try {
      localStorage.setItem("twai-contact-request-v36", JSON.stringify(draft));
      setError("");
      setSaved(true);
      event.currentTarget.reset();
    } catch {
      setError("Your browser could not save this draft. Please try again.");
    }
  }

  return (
    <>
      <header className="site-header twai-contact-site-header">
        <div className="nav-shell">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <div className="nav-item"><a href="/#home">Home</a></div>
            <div className="nav-item"><a href="/#tools">AI Tools</a></div>
            <div className="nav-item"><a href="/#brokers">Brokers</a></div>
            <div className="nav-item"><a href="/#prop-firms">Prop Firms</a></div>
            <div className="nav-item"><a href="/#intelligence">Market Intelligence</a></div>
            <div className="nav-item"><a href="/#pricing">Pricing</a></div>
            <div className="nav-item"><a href="/#about">About</a></div>
            <div className="nav-item"><a className="active" href="/contact" aria-current="page">Contact</a></div>
          </nav>
          <div className="nav-actions">
            <a className="signin-button" href="/login">Sign In</a>
            <a className="button button-primary nav-cta" href="/register">Get Started</a>
            <button className="icon-button menu-toggle" type="button" aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu} aria-controls="contact-mobile-navigation" onClick={() => setMenu(!menu)}>
              {menu ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        {menu && (
          <nav id="contact-mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
            <a href="/#home" onClick={() => setMenu(false)}>Home <ArrowUpRight size={15} /></a>
            <a href="/#tools" onClick={() => setMenu(false)}>AI Tools <ArrowUpRight size={15} /></a>
            <a href="/#brokers" onClick={() => setMenu(false)}>Brokers <ArrowUpRight size={15} /></a>
            <a href="/#prop-firms" onClick={() => setMenu(false)}>Prop Firms <ArrowUpRight size={15} /></a>
            <a href="/#intelligence" onClick={() => setMenu(false)}>Market Intelligence <ArrowUpRight size={15} /></a>
            <a href="/#pricing" onClick={() => setMenu(false)}>Pricing <ArrowUpRight size={15} /></a>
            <a href="/#about" onClick={() => setMenu(false)}>About <ArrowUpRight size={15} /></a>
            <a href="/contact" onClick={() => setMenu(false)}>Contact <ArrowUpRight size={15} /></a>
          </nav>
        )}
      </header>
    <main className="twai-contact-page">
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

      <div className="twai-contact-orb twai-contact-orb-one" aria-hidden="true" />
      <div className="twai-contact-orb twai-contact-orb-two" aria-hidden="true" />

      <section className="twai-contact-hero">
        <span className="twai-contact-eyebrow"><span /> CONTACT TRADER WORLD AI</span>
        <h1>We’re here to help you<br /><span>move with clarity.</span></h1>
        <p className="twai-contact-lede">
          Tell us what you’re working on. Reach out about the platform, account
          questions, product feedback, or a potential partnership.
        </p>
      </section>

      <section className="twai-contact-layout" aria-label="Contact options and message form">
        <aside className="twai-contact-aside">
          <article className="twai-contact-info-card">
            <span className="twai-contact-info-icon"><MessageSquareText size={20} /></span>
            <h2>Product & platform</h2>
            <p>Questions about AI tools, broker research, market insights, or your workspace.</p>
          </article>
          <article className="twai-contact-info-card">
            <span className="twai-contact-info-icon twai-contact-icon-mint"><CircleHelp size={20} /></span>
            <h2>Help & feedback</h2>
            <p>Share a problem, suggest an improvement, or tell us what would make the experience better.</p>
          </article>
          <article className="twai-contact-info-card">
            <span className="twai-contact-info-icon twai-contact-icon-peach"><ShieldCheck size={20} /></span>
            <h2>Privacy-minded</h2>
            <p>Only include information needed to understand your request. Never send passwords or private keys.</p>
          </article>
          <div className="twai-contact-note">
            <Mail size={16} />
            <span>Contact form preview · Support delivery can be connected to your backend.</span>
          </div>
        </aside>

        <div className="twai-contact-form-card">
          <div className="twai-contact-form-heading">
            <div>
              <span>LET’S START A CONVERSATION</span>
              <h2>Send us a message</h2>
            </div>
            <span className="twai-contact-form-spark"><Sparkles size={20} /></span>
          </div>

          {saved ? (
            <div className="twai-contact-success" role="status">
              <span><Check size={25} /></span>
              <h3>Your draft is saved.</h3>
              <p>
                It is stored in this browser only. No email or server request has
                been sent because a support endpoint is not connected yet.
              </p>
              <button type="button" onClick={() => setSaved(false)}>Write another message</button>
            </div>
          ) : (
            <form className="twai-contact-form" onSubmit={submit}>
              <div className="twai-contact-field-grid">
                <label>
                  <span>Your name</span>
                  <input name="name" autoComplete="name" placeholder="Your name" minLength={2} maxLength={80} required />
                </label>
                <label>
                  <span>Email address</span>
                  <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                </label>
              </div>
              <label>
                <span>What can we help with?</span>
                <select name="topic" defaultValue="General enquiry">
                  <option>General enquiry</option>
                  <option>Platform support</option>
                  <option>Account and access</option>
                  <option>Product feedback</option>
                  <option>Partnership enquiry</option>
                </select>
              </label>
              <label>
                <span>Your message</span>
                <textarea name="message" rows={6} minLength={10} maxLength={3000} placeholder="Tell us a little about what you need…" required />
              </label>
              {error && <p className="twai-contact-error" role="alert">{error}</p>}
              <div className="twai-contact-submit-row">
                <p>Do not include passwords, payment details, or private keys.</p>
                <button className="twai-contact-submit" type="submit">
                  Save message <Send size={15} />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <footer className="twai-contact-footer">
        <span>© 2026 Trader World AI</span>
        <a href="/">Return to the platform <ArrowUpRight size={13} /></a>
      </footer>
    </main>
    </>
  );
}
