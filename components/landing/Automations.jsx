"use client";
import Icon from "@/components/ui/Icon";

const CLUSTERS = [
  {
    label: "Requests coming in",
    items: [
      {
        icon: "message-square",
        title: "Inquiry intake",
        desc: "Reads inbound WhatsApp and email requests, prices them, and queues a ready-to-send quote.",
      },
      {
        icon: "mail-search",
        title: "Tariff inbox watch",
        desc: "Monitors your pricing inbox and WhatsApp groups for new rate sheets and GRI notices.",
      },
    ],
  },
  {
    label: "Quotes going out",
    items: [
      {
        icon: "clock",
        title: "Quote follow-up",
        desc: "Drafts a nudge the moment a customer's quote goes quiet, timed to its expiry.",
      },
      {
        icon: "refresh-cw",
        title: "Expiry re-price",
        desc: "Catches lapsing quotes, re-prices them, and drafts the re-send before the customer notices.",
      },
    ],
  },
  {
    label: "Agents & awards",
    items: [
      {
        icon: "search",
        title: "Bid chasing",
        desc: "Nudges invited agents who haven't bid yet, with time-left and ranking context.",
      },
      {
        icon: "shield-check",
        title: "Bid QA",
        desc: "Flags bids with missing surcharges, wrong currency or unrealistic transit times.",
      },
      {
        icon: "file-text",
        title: "Award justification",
        desc: "Drafts the audit-ready rationale memo for every award, automatically.",
      },
      {
        icon: "database",
        title: "Contract utilization alerts",
        desc: "Flags awarded contracts running under-used before the negotiated saving is lost.",
      },
    ],
  },
];

const QUEUE_ITEMS = [
  {
    icon: "message-square",
    title: "New inquiry via WhatsApp",
    sub: "Acme Exports · Nhava Sheva → Jebel Ali · priced at $1,882.40",
    tag: "Ready to send",
  },
  {
    icon: "clock",
    title: "Quote SQ-48311 expiring in 6h",
    sub: "Re-priced against today's tariff: draft ready",
    tag: "Ready to send",
  },
  {
    icon: "search",
    title: "3 agents haven't bid on RFQ-2207",
    sub: "Nudge drafted: time-left and ranking included",
    tag: "Ready to send",
  },
];

const STATS = [
  { v: "6.5h", l: "Saved chasing quotes & bids, per week", placeholder: true },
  { v: "32%", l: "Of quotes recovered before expiring", placeholder: true },
  { v: "0", l: "Auto-sends; every draft is human-approved", placeholder: false },
];

export default function Automations() {
  return (
    <section className="sec band" id="automations">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow orange">
            <span className="dot"></span> Automations
          </span>
          <h2 className="h-section">
            Susea already owns the price.
            <br />
            Now it owns the thread.
          </h2>
          <p className="lead">
            Nothing waits for a human to remember it. Inbound requests,
            follow-ups, agent chasing, award memos: Susea drafts them the
            moment they&rsquo;re needed. You approve everything; nothing sends,
            prices or decides on its own.
          </p>
        </div>

        {/* Clusters */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 22,
            marginBottom: 26,
          }}
          className="auto-clusters"
        >
          {CLUSTERS.map((cl) => (
            <div
              key={cl.label}
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 18,
                padding: 24,
              }}
            >
              <h4
                style={{
                  margin: "0 0 4px",
                  fontSize: 11,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  color: "var(--orange-700)",
                }}
              >
                {cl.label}
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  marginTop: 14,
                }}
              >
                {cl.items.map((it) => (
                  <div
                    key={it.title}
                    style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                  >
                    <div
                      style={{
                        flex: "none",
                        width: 32,
                        height: 32,
                        borderRadius: 9,
                        border: "1px solid var(--line)",
                        background: "var(--orange-50)",
                        color: "var(--orange-600)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon name={it.icon} size={16} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "var(--ink)",
                          letterSpacing: "-.01em",
                        }}
                      >
                        {it.title}
                      </div>
                      <div
                        style={{
                          fontSize: 12.5,
                          color: "var(--ink-2)",
                          lineHeight: 1.45,
                          marginTop: 2,
                        }}
                      >
                        {it.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Approval queue mockup */}
        <div
          style={{
            border: "1px solid var(--line)",
            borderRadius: 20,
            background: "#fff",
            overflow: "hidden",
            boxShadow: "var(--shadow-lg)",
            marginBottom: 26,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "16px 20px",
              borderBottom: "1px solid var(--line)",
              background: "linear-gradient(180deg,var(--orange-50),#fff)",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}
            >
              Your approval queue
            </span>
            <span className="pill blue">3 drafts waiting</span>
          </div>
          {QUEUE_ITEMS.map((q, i) => (
            <div
              key={i}
              className="aq-row"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 20px",
                borderBottom:
                  i < QUEUE_ITEMS.length - 1 ? "1px solid var(--line-soft)" : 0,
              }}
            >
              <div
                className="aq-main"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    flex: "none",
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    border: "1px solid var(--line)",
                    background: "var(--paper-2)",
                    color: "var(--ink-2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name={q.icon} size={16} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>
                    {q.title}
                  </div>
                  <div
                    style={{ fontSize: 12.5, color: "var(--ink-2)", marginTop: 2 }}
                  >
                    {q.sub}
                  </div>
                </div>
              </div>
              <span
                className="aq-tag"
                style={{
                  flex: "none",
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 600,
                  border: "1px solid var(--orange-100)",
                  color: "var(--orange-700)",
                  background: "var(--orange-50)",
                  whiteSpace: "nowrap",
                }}
              >
                {q.tag}
              </span>
              <div className="aq-actions" style={{ flex: "none", display: "flex", gap: 6 }}>
                <span
                  className="aq-btn"
                  style={{
                    height: 32,
                    padding: "0 12px",
                    fontSize: 12,
                    borderRadius: 9,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    background: "var(--blue-600)",
                    whiteSpace: "nowrap",
                    fontWeight: 600,
                  }}
                >
                  Approve &amp; send
                </span>
                <span
                  className="aq-btn"
                  style={{
                    height: 32,
                    padding: "0 12px",
                    fontSize: 12,
                    borderRadius: 9,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--ink)",
                    border: "1px solid var(--line)",
                    background: "#fff",
                    whiteSpace: "nowrap",
                    fontWeight: 600,
                  }}
                >
                  Edit
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust callout */}
        <div
          style={{
            border: "1px solid var(--blue-100)",
            background: "linear-gradient(180deg,var(--blue-50),#fff)",
            borderRadius: 14,
            padding: "20px 24px",
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
            marginBottom: 26,
          }}
        >
          <div
            style={{
              flex: "none",
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "#fff",
              border: "1px solid var(--blue-100)",
              color: "var(--blue-700)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="lock" size={16} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>
              Every draft is human-approved before anything sends.
            </div>
            <div
              style={{
                fontSize: 13.5,
                color: "var(--ink-2)",
                lineHeight: 1.5,
                marginTop: 4,
              }}
            >
              AI drafts, extracts and routes; it never touches the price or the
              margin math. Pricing stays exactly as deterministic as it is today,
              and everything above is fully logged and audit-ready.
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 14,
          }}
          className="auto-stats"
        >
          {STATS.map((s) => (
            <div
              key={s.v}
              style={{
                border: "1px solid var(--line)",
                borderRadius: 14,
                padding: 22,
                background: "#fff",
                boxShadow: "var(--shadow-xs)",
                position: "relative",
              }}
            >
              {s.placeholder && (
                <span
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    fontSize: 9.5,
                    fontWeight: 700,
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    color: "var(--ink-4)",
                    border: "1px solid var(--line)",
                    borderRadius: 999,
                    padding: "2px 8px",
                    background: "var(--paper-2)",
                  }}
                >
                  Placeholder
                </span>
              )}
              <div
                className="mono"
                style={{
                  fontSize: 38,
                  fontWeight: 700,
                  letterSpacing: "-.03em",
                  lineHeight: 1,
                  color: "var(--ink)",
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 13,
                  color: "var(--ink-2)",
                  lineHeight: 1.45,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
        <p
          style={{
            margin: "10px 0 0",
            fontSize: 11.5,
            color: "var(--ink-4)",
            textAlign: "center",
          }}
        >
          Placeholder figures shown for illustration; swapped for real pilot
          data before launch.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginTop: 26,
            flexWrap: "wrap",
          }}
        >
          <a
            href="/automations"
            className="btn btn-orange"
            style={{ height: 44, padding: "0 20px", fontSize: 14 }}
          >
            See how it works <Icon name="arrow-right" size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
