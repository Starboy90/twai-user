"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "@/components/ui";

type SiteNavbarProps = {
  currentPage?: "home" | "contact" | "login" | "register";
  onGetStarted?: () => void;
};

const links = [
  { label: "Home", href: "/#home" },
  { label: "AI Tools", href: "/#tools" },
  { label: "Brokers", href: "/#brokers" },
  { label: "Prop Firms", href: "/#prop-firms" },
  { label: "Market Intelligence", href: "/#intelligence" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

export function SiteNavbar({ currentPage, onGetStarted }: SiteNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const started = () => {
    setMenuOpen(false);
    if (onGetStarted) onGetStarted();
    else window.location.href = "/register";
  };

  return (
    <header className="site-header twai-shared-site-header">
      <div className="nav-shell">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <div className="nav-item" key={link.href}>
              <a
                href={link.href}
                className={currentPage === "contact" && link.href === "/contact" ? "active" : ""}
                aria-current={currentPage === "contact" && link.href === "/contact" ? "page" : undefined}
              >
                {link.label}
              </a>
            </div>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="signin-button" href="/login" aria-current={currentPage === "login" ? "page" : undefined}>Sign In</a>
          <button className="button button-primary nav-cta" type="button" onClick={started}>Get Started</button>
          <button
            className="icon-button menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="twai-shared-mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      {menuOpen && typeof document !== "undefined" && createPortal(
        <>
          <button
            type="button"
            className="twai-mobile-menu-backdrop"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
          />
          <nav id="twai-shared-mobile-navigation" className="mobile-nav twai-mobile-nav-portal" aria-label="Mobile navigation">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                <span>{link.label}</span><ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
            <a href="/login" onClick={() => setMenuOpen(false)}>
              <span>Sign In</span><ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <button type="button" onClick={started}>
              <span>Get Started</span><ArrowRight size={16} aria-hidden="true" />
            </button>
          </nav>
        </>,
        document.body
      )}
    </header>
  );
}
