"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { smoothScrollToId, smoothScrollToTop } from "@/lib/scroll";

export default function Nav({ onRequest }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const h = (id) => (isHome ? `#${id}` : `/#${id}`);

  // Nav destinations, shared by the desktop links and the mobile dropdown.
  // `id` marks an in-page section (smooth-scrolled on home); its absence means a
  // real route that should navigate normally.
  const links = [
    { label: "Overview", id: "two-ways" },
    { label: "Instant rates", href: "/instant-rates" },
    { label: "RFQ", href: "/rfq" },
    { label: "Automations", href: "/automations" },
    { label: "Features", id: "features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Why Susea", id: "why" },
  ];

  // Arriving from another page via /#section: smooth-scroll to the target, then
  // strip the hash so the URL settles back to a clean "/".
  useEffect(() => {
    if (!isHome) return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Wait a beat so layout (and images above the target) has settled.
    const t = setTimeout(() => {
      smoothScrollToId(id);
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }, 80);
    return () => clearTimeout(t);
  }, [isHome]);

  // On the home page, intercept internal links to smooth-scroll without dirtying
  // the URL. On other pages, let the href (/#section or /) navigate normally.
  const onInternal = (id) => (e) => {
    if (!isHome) return;
    e.preventDefault();
    smoothScrollToId(id);
  };

  const onLogo = (e) => {
    if (!isHome) return;
    e.preventDefault();
    smoothScrollToTop();
  };

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a className="logo" href={isHome ? "#top" : "/"} onClick={onLogo}>
          <Image
            src="/assets/susea-mark-black.png"
            alt="Susea"
            width={26}
            height={26}
          />
          <span>Susea</span>
        </a>
        <div className="nav-links">
          <a href={h("two-ways")} onClick={onInternal("two-ways")}>Overview</a>
          <a href="/instant-rates">Instant rates</a>
          <a href="/rfq">RFQ</a>
          <a href="/automations">Automations</a>
          <a href={h("features")} onClick={onInternal("features")}>Features</a>
          <a href="/pricing">Pricing</a>
          <a href={h("why")} onClick={onInternal("why")}>Why Susea</a>
        </div>
        <div className="nav-cta">
          <a className="btn btn-ghost" href="/signin">
            Sign in
          </a>
          <button className="btn btn-primary" onClick={onRequest}>
            Request access
          </button>
          <button
            type="button"
            className="nav-hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="nav-mobile-menu">
          {links.map(({ label, id, href }) => (
            <a
              key={label}
              href={id ? h(id) : href}
              className="nav-menu-link"
              onClick={(e) => {
                setMenuOpen(false);
                if (id) onInternal(id)(e);
              }}
            >
              <span>{label}</span>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
