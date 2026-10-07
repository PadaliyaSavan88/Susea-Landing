"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { smoothScrollToId, smoothScrollToTop } from "@/lib/scroll";

/* Hover helper; mirrors the one in the homepage */
function Hover({ as: Tag = "div", base, hover, children, ...rest }) {
  const [h, setH] = useState(false);
  return (
    <Tag
      style={{ ...base, ...(h ? hover : null) }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default function Nav({ onRequest }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const h = (id) => (isHome ? `#${id}` : `/#${id}`);

  // Nav destinations, shared by the desktop links and the mobile dropdown.
  // `id` marks an in-page section (smooth-scrolled on home); its absence means a
  // real route that should navigate normally.
  const links = [
    { label: "RFQ", href: "/rfq" },
    { label: "Automations", href: "/automations" },
    { label: "Pricing", href: "/pricing" },
    { label: "ROI calculator", id: "roi" },
    { label: "Why Susea", id: "why-susea" },
    { label: "FAQ", id: "faq" },
  ];

  // Arriving from another page via /#section: smooth-scroll to the target, then
  // strip the hash so the URL settles back to a clean "/".
  useEffect(() => {
    if (!isHome) return;
    const id = window.location.hash.slice(1);
    if (!id) return;
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
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,.78)", backdropFilter: "blur(14px) saturate(140%)", WebkitBackdropFilter: "blur(14px) saturate(140%)", borderBottom: "1px solid var(--line-soft)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", gap: "24px", padding: "14px 20px" }}>
        <a href={isHome ? "#top" : "/"} onClick={onLogo} style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
          <Image src="/assets/susea-mark-black.png" alt="Susea" width={28} height={28} style={{ height: "28px", width: "auto" }} />
          <span style={{ fontWeight: 700, fontSize: "20px", letterSpacing: "-.02em", color: "var(--ink)" }}>Susea</span>
        </a>

        <nav style={{ display: "flex", gap: "22px", marginLeft: "16px" }} className="hide-md">
          {links.map(({ label, id, href }) => (
            <Hover
              key={label}
              as="a"
              href={id ? h(id) : href}
              onClick={id ? onInternal(id) : undefined}
              base={{ fontSize: "14px", color: "var(--ink-2)", fontWeight: 500, whiteSpace: "nowrap" }}
              hover={{ color: "var(--ink)" }}
            >
              {label}
            </Hover>
          ))}
        </nav>

        <div style={{ marginLeft: "auto", display: "flex", gap: "10px", alignItems: "center" }}>
          <Hover
            as="button"
            onClick={onRequest}
            className="hide-md"
            base={{ fontSize: "14px", color: "var(--ink)", fontWeight: 600, padding: "9px 14px", borderRadius: "10px", border: "1px solid var(--line-strong)", background: "#fff", cursor: "pointer" }}
            hover={{ background: "var(--paper-2)" }}
          >
            Request beta access
          </Hover>
          <Hover
            as="a"
            href={h("booking")}
            onClick={onInternal("booking")}
            base={{ fontSize: "14px", color: "#fff", fontWeight: 600, padding: "10px 16px", borderRadius: "10px", background: "var(--blue-600)", boxShadow: "var(--shadow-blue)" }}
            hover={{ background: "var(--blue-700)", transform: "translateY(-1px)" }}
          >
            Book a demo
          </Hover>
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
        <div style={{ borderTop: "1px solid var(--line-soft)", background: "rgba(255,255,255,.98)", backdropFilter: "saturate(140%) blur(14px)", WebkitBackdropFilter: "saturate(140%) blur(14px)", padding: "10px 20px 18px", display: "flex", flexDirection: "column", gap: "2px" }}>
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
    </header>
  );
}
