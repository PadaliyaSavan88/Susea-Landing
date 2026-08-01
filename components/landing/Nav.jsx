"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { smoothScrollToId, smoothScrollToTop } from "@/lib/scroll";

export default function Nav({ onRequest }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const h = (id) => (isHome ? `#${id}` : `/#${id}`);

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
        </div>
      </div>
    </nav>
  );
}
