"use client";

/**
 * "One system of record" — the brochure's CRM-defining module.
 * Lists what lives inside Susea, reinforcing the Freight Forwarding CRM angle.
 * Styled with the site's shared classes so it reads as native on any page.
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

export default function SystemOfRecord({ band = false }) {
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 16,
          }}
          className="sor-grid"
        >
          {MODULES.map(([title, desc], i) => (
            <div
              key={title}
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 14,
                padding: "20px 20px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                minWidth: 0,
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
                {String(i + 1).padStart(2, "0")}
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
              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  color: "var(--ink-2)",
                }}
              >
                {desc}
              </p>
            </div>
          ))}
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
        @media (max-width: 980px) { .sor-grid { grid-template-columns: repeat(2, minmax(0,1fr)) !important; } }
        @media (max-width: 560px) { .sor-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
