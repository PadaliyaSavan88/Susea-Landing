"use client";
import { useState } from "react";

/**
 * Reusable FAQ accordion, styled to match the site's existing FAQ cards
 * (freight-forwarding / automations pattern). Drop into any page.
 *
 *   <FaqSection
 *     eyebrow="Questions"
 *     heading="The questions teams ask us."
 *     items={[{ q: "…", a: "…" }, …]}
 *   />
 */
export default function FaqSection({
  eyebrow = "FAQ",
  heading = "Questions, answered.",
  items = [],
  band = true,
  id = "faq",
}) {
  const [open, setOpen] = useState(0);
  return (
    <section
      id={id}
      className={"sec" + (band ? " band" : "")}
      style={{ scrollMarginTop: 72 }}
    >
      <div className="container" style={{ maxWidth: 920 }}>
        <div className="sec-head">
          <span className="eyebrow">
            <span className="dot"></span> {eyebrow}
          </span>
          <h2 className="h-section" style={{ margin: 0 }}>
            {heading}
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((f, i) => {
            const on = open === i;
            return (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpen(on ? -1 : i)}
                  aria-expanded={on}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    padding: "20px 24px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    font: "inherit",
                    fontWeight: 600,
                    fontSize: 16,
                    letterSpacing: "-.01em",
                    color: "var(--ink)",
                  }}
                >
                  {f.q}
                  <span
                    style={{
                      flex: "none",
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "var(--paper-2)",
                      color: "var(--ink-2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: on ? "rotate(45deg)" : "none",
                      transition: "transform .2s",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                <div
                  className={"accordion-body" + (on ? " open" : "")}
                  style={{
                    maxHeight: on ? 480 : 0,
                    overflow: "hidden",
                    transition: "max-height .3s ease",
                  }}
                >
                  <div
                    style={{
                      padding: "0 24px 20px",
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "var(--ink-2)",
                    }}
                  >
                    {f.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
