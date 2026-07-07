import Icon from "@/components/ui/Icon";

const ROWS = [
  [
    "layout-dashboard",
    "var(--blue-600)",
    "var(--blue-50)",
    "Centralized pricing dashboard",
    "Every tariff, every carrier, one searchable surface",
    "/pricing",
  ],
  [
    "file-output",
    "var(--orange-600)",
    "var(--orange-50)",
    "AI quotation engine",
    "Generates customer-ready quotes from cargo input in <90s",
    "/quotes",
  ],
  [
    "scale",
    "var(--amber-600)",
    "var(--amber-50)",
    "Carrier comparison engine",
    "Spot rates, contract rates, transit time, free time — side by side",
    "/compare",
  ],
  [
    "file-scan",
    "var(--good-600)",
    "var(--good-50)",
    "Tariff intelligence system",
    "Auto-extracts pricing from PDFs, XLS, email and WhatsApp",
    "/tariffs",
  ],
  [
    "sliders-horizontal",
    "var(--blue-600)",
    "var(--blue-50)",
    "Surcharge & margin automation",
    "BAF, CAF, THC, LSS, ISPS — calculated, applied, audited",
    "/automation",
  ],
];

export default function Solution() {
  return (
    <></>
    // <section className="sec tight" id="platform">
    //   <div className="container">
    //     <div className="sec-head">
    //       <span className="eyebrow"><span className="dot"></span> The platform</span>
    //       <h2 className="h-section">One platform for ocean freight<br />pricing &amp; operations.</h2>
    //       <p className="lead">Susea centralizes carrier pricing, quotations, tracking, and operational intelligence into one AI-powered platform — built for how modern forwarders actually work.</p>
    //     </div>
    //     <div className="panel-lg" style={{ padding: 28 }}>
    //       <div className="sol-grid">
    //         <div>
    //           <span className="tag blue">SUSEA OS</span>
    //           <h3 style={{ margin: '8px 0 8px', fontSize: 26, letterSpacing: '-.02em' }}>The pricing &amp; quotation stack</h3>
    //           <p style={{ color: 'var(--ink-2)', fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>Replace 6 tools with one operating system. Built on a tariff intelligence engine that reads anything — PDFs, images, spreadsheets, even forwarded WhatsApp threads — and turns it into structured, comparable pricing.</p>
    //           <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 18 }}>
    //             <span className="pill blue">Pricing engine</span>
    //             <span className="pill orange">Quote automation</span>
    //             <span className="pill amber">Tariff AI</span>
    //             <span className="pill live"><i></i> Real-time</span>
    //           </div>
    //         </div>
    //         <div className="sol-stack">
    //           {ROWS.map(([icon, col, bg, t, s, meta], i) => (
    //             <div className="sol-row" key={i}>
    //               <div className="ico" style={{ color: col, background: bg }}><Icon name={icon} size={17} /></div>
    //               <div><div className="t">{t}</div><div className="s">{s}</div></div>
    //               <div className="meta">{meta}</div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}
