"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Icon from "@/components/ui/Icon";

/**
 * "One system of record" — the brochure's CRM-defining module.
 * Lists what lives inside Susea, reinforcing the Freight Forwarding CRM angle.
 * Desktop shows a grid; ≤768px shows a swipe slider (reuses the shared
 * .features-mobile / .feat-* slider styles from globals.css).
 */
const MODULES = [
  ["Leads", "Import / Export / Air, ports, container, sailing: captured the way your desk takes them."],
  ["Quotations", "Buying, selling, margin, live FX and IGST, priced from your own rate sheets."],
  ["RFQs · Procurement", "Source buy rates from your agents, compare bids, and award the best."],
  ["Communication", "Team chat, WhatsApp and email on a shipment: one tab, one place."],
  ["Pipeline", "Draft → In Progress → Won, with every touch logged against the quote."],
  ["Clients", "Company, GST, contacts, email and WhatsApp: the full relationship in one record."],
  ["Advanced Team Management", "Roles, module permissions and lead routing, so each team sees what it should."],
  ["Custom Configurations", "Pricing, taxes, terms, email and WhatsApp. Set once, used forever."],
];

function Card({ title, desc, index }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--line)",
        borderRadius: 14,
        padding: "20px 20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        minWidth: 0,
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <span
        className="mono"
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: ".08em",
          color: "var(--blue-600)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3
        style={{
          margin: 0,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "-.01em",
          color: "var(--ink)",
        }}
      >
        {title}
      </h3>
      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: "var(--ink-2)" }}>
        {desc}
      </p>
    </div>
  );
}

export default function SystemOfRecord({ band = false }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "center" });
  const [index, setIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className={"sec" + (band ? " band" : "")} id="system-of-record">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">
            <span className="dot"></span> One system of record
          </span>
          <h2 className="h-section" style={{ margin: 0 }}>
            Everything your desk runs on, in one CRM.
          </h2>
          <p className="lead" style={{ maxWidth: 680, margin: "14px auto 0" }}>
            Clients, leads, quotes, RFQs and chat in a single Freight Forwarding
            CRM, with the five automations running on top.
          </p>
        </div>

        {/* Desktop grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 16,
          }}
          className="sor-grid"
        >
          {MODULES.map(([title, desc], i) => (
            <Card key={title} title={title} desc={desc} index={i} />
          ))}
        </div>

        {/* ≤768px swipe slider */}
        <div className="features-mobile sor-mobile">
          <div className="feat-embla" ref={emblaRef}>
            <div className="feat-track">
              {MODULES.map(([title, desc], i) => (
                <div className="feat-slide" key={title}>
                  <Card title={title} desc={desc} index={i} />
                </div>
              ))}
            </div>
          </div>
          <div className="feat-nav">
            <button
              className="feat-nav-btn"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Previous module"
            >
              <Icon name="chevron-left" size={18} />
            </button>
            <span className="feat-nav-count">
              {index + 1} / {MODULES.length}
            </span>
            <button
              className="feat-nav-btn"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              aria-label="Next module"
            >
              <Icon name="chevron-right" size={18} />
            </button>
          </div>
        </div>

        <p
          className="mono"
          style={{
            margin: "22px 0 0",
            textAlign: "center",
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "var(--ink-3)",
          }}
        >
          Works with Outlook · Gmail · WhatsApp · and your own corporate email
        </p>
      </div>

      <style>{`
        @media (max-width: 980px) and (min-width: 769px) {
          .sor-grid { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
        }
        @media (max-width: 768px) {
          .sor-grid { display: none !important; }
          .sor-mobile .feat-slide { flex: 0 0 80%; }
        }
      `}</style>
    </section>
  );
}
