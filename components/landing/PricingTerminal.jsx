"use client";
import { useState, useMemo } from "react";
import Icon from "@/components/ui/Icon";

function TrendChart() {
  return (
    <svg
      viewBox="0 0 660 170"
      width="100%"
      height="170"
      preserveAspectRatio="none"
      style={{ marginTop: 6, display: "block" }}
    >
      <defs>
        <linearGradient id="gA" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#4A82D9" stopOpacity=".22" />
          <stop offset="1" stopColor="#4A82D9" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#9AA8BE">
        <text x="44" y="22" textAnchor="end">
          $1,600
        </text>
        <text x="44" y="65" textAnchor="end">
          $1,450
        </text>
        <text x="44" y="108" textAnchor="end">
          $1,300
        </text>
      </g>
      <g stroke="#EDF1F7" strokeWidth="1">
        <line x1="50" y1="18" x2="650" y2="18" />
        <line x1="50" y1="61" x2="650" y2="61" />
        <line x1="50" y1="104" x2="650" y2="104" />
        <line x1="50" y1="125" x2="650" y2="125" stroke="#D2DBE8" />
      </g>
      <path
        d="M50,90 L80,82 L110,86 L140,70 L170,74 L200,60 L230,68 L260,52 L290,58 L320,42 L350,48 L380,38 L410,46 L440,34 L470,42 L500,30 L530,38 L560,28 L590,34 L620,24 L650,30 L650,125 L50,125 Z"
        fill="url(#gA)"
      />
      <path
        d="M50,90 L80,82 L110,86 L140,70 L170,74 L200,60 L230,68 L260,52 L290,58 L320,42 L350,48 L380,38 L410,46 L440,34 L470,42 L500,30 L530,38 L560,28 L590,34 L620,24 L650,30"
        fill="none"
        stroke="#4A82D9"
        strokeWidth="2"
      />
      <path
        d="M50,100 L80,96 L110,98 L140,92 L170,96 L200,88 L230,92 L260,82 L290,88 L320,80 L350,86 L380,78 L410,84 L440,74 L470,80 L500,72 L530,78 L560,70 L590,74 L620,68 L650,72"
        fill="none"
        stroke="#F07020"
        strokeWidth="1.6"
        strokeDasharray="4 3"
      />
      <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#9AA8BE">
        <text x="50" y="148">
          Oct 26
        </text>
        <text x="200" y="148">
          Nov 02
        </text>
        <text x="350" y="148">
          Nov 09
        </text>
        <text x="500" y="148">
          Nov 16
        </text>
        <text x="650" y="148" textAnchor="end">
          Nov 23
        </text>
      </g>
      <g
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="11"
        fill="#41506A"
      >
        <rect x="50" y="160" width="8" height="8" rx="1.5" fill="#4A82D9" />
        <text x="64" y="168">
          INNSA → AEJEA spot
        </text>
        <rect x="210" y="160" width="8" height="8" rx="1.5" fill="#F07020" />
        <text x="224" y="168">
          Global FBX ocean index
        </text>
      </g>
    </svg>
  );
}

function TradeMap() {
  const dots = useMemo(() => {
    const blobs = [
      [200, 140, 130, 70, 0.5],
      [320, 250, 80, 70, 0.5],
      [470, 150, 130, 80, 0.55],
      [520, 260, 90, 90, 0.5],
      [700, 200, 140, 90, 0.6],
      [900, 200, 130, 80, 0.55],
      [1020, 320, 80, 50, 0.5],
    ];
    const out = [];
    for (let x = 20; x < 1180; x += 15)
      for (let y = 20; y < 400; y += 15)
        for (const [cx, cy, rx, ry, d] of blobs) {
          const dx = (x - cx) / rx,
            dy = (y - cy) / ry;
          if (dx * dx + dy * dy < 1 && Math.random() < d) {
            out.push([x, y]);
            break;
          }
        }
    return out;
  }, []);
  const dests = [
    [540, 190, 16, "AEJEA", 500, 180],
    [420, 180, 14, "EGPSD", 380, 170],
    [320, 260, 14, "ZADUR", 280, 250],
    [920, 170, 14, "SGSIN", 930, 165],
    [820, 300, 12, "IDJKT", 830, 296],
    [460, 120, 14, "NLRTM", 470, 115],
    [1040, 320, 12, "AUSYD", 990, 335],
    [880, 210, 12, "CNSHA", 890, 205],
  ];
  return (
    <svg
      className="map-svg"
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "auto" }}
    >
      <defs>
        <radialGradient id="port" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#F07020" stopOpacity="1" />
          <stop offset="1" stopColor="#F07020" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="portB" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#4A82D9" stopOpacity="1" />
          <stop offset="1" stopColor="#4A82D9" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="route" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#4A82D9" stopOpacity=".15" />
          <stop offset=".5" stopColor="#4A82D9" stopOpacity=".85" />
          <stop offset="1" stopColor="#F07020" stopOpacity=".85" />
        </linearGradient>
      </defs>
      <g>
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.3" fill="#C7D2E0" />
        ))}
      </g>
      <g fill="none" stroke="url(#route)" strokeWidth="1.4">
        <path d="M700 215 Q 620 140 540 190" />
        <path d="M700 215 Q 800 160 920 170" />
        <path d="M700 215 Q 760 270 820 300" />
        <path d="M700 215 Q 540 250 320 260" />
        <path d="M700 215 Q 580 180 420 180" />
        <path d="M700 215 Q 760 200 880 210" />
      </g>
      <g
        fill="none"
        stroke="#4A82D9"
        strokeOpacity=".3"
        strokeDasharray="3 3"
        strokeWidth="1"
      >
        <path d="M700 215 Q 600 100 460 120" />
        <path d="M700 215 Q 900 280 1040 320" />
      </g>
      <g>
        <circle cx="700" cy="215" r="22" fill="url(#portB)" />
        <circle cx="700" cy="215" r="4" fill="#1E5BC6" />
        <text
          x="710"
          y="208"
          fontFamily="JetBrains Mono"
          fontSize="10"
          fill="#41506A"
        >
          INNSA · Nhava Sheva
        </text>
      </g>
      <g fontFamily="JetBrains Mono" fontSize="10" fill="#6B7C96">
        {dests.map(([cx, cy, r, code, tx, ty], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill="url(#port)" />
            <circle cx={cx} cy={cy} r="3" fill="#C2540F" />
            <text x={tx} y={ty}>
              {code}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

const TABS = [
  "Pricing",
  "Schedules",
  "Surcharges",
  "Market trends",
  "Saved lanes",
];
const CTNS = ["20' GP", "40' GP", "40' HC", "40' RF", "LCL"];
const RATES = [
  [
    "MA",
    "Maritime A",
    "$1,420",
    "7d",
    "14d",
    "Dec 02",
    "BEST",
    "tag-best",
    true,
  ],
  ["OC", "Oceanic Co", "$1,475", "8d", "14d", "Nov 30", "", "", false],
  [
    "PA",
    "Pacific Line",
    "$1,510",
    "6d",
    "10d",
    "Dec 04",
    "FAST",
    "tag-fast",
    false,
  ],
  [
    "EV",
    "Eastern Ven.",
    "$1,540",
    "10d",
    "21d",
    "Dec 02",
    "FREE TIME",
    "tag-eco",
    false,
  ],
  ["SR", "Sealink Roy.", "$1,612", "8d", "10d", "Nov 28", "", "", false],
  ["HN", "Harbor Nine", "$1,684", "9d", "14d", "Dec 06", "", "", false],
];
const SURCHARGES = [
  ["BAF — Bunker Adj.", "$84.00"],
  ["CAF — Currency Adj.", "$36.00"],
  ["THC origin (INNSA)", "$62.00"],
  ["THC destination (AEJEA)", "$78.00"],
  ["LSS — Low Sulphur", "$28.00"],
  ["ISPS / Security", "$12.00"],
  ["Documentation", "$35.00"],
];
const LANES = [
  ["INNSA → AEJEA", "$1,420", "▲4.2%", true],
  ["INMUN → NLRTM", "$2,840", "▼1.1%", false],
  ["INMAA → SGSIN", "$ 980", "▲2.6%", true],
  ["INPAV → USNYC", "$3,260", "▲0.8%", true],
  ["INNSA → ZADUR", "$1,710", "▼3.3%", false],
];

export default function PricingTerminal() {
  const [tab, setTab] = useState("Pricing");
  const [ctn, setCtn] = useState("40' GP");

  return (
    <></>
    // <section className="pi sec" id="pricing-intel" style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
    //   <div className="container">
    //     <div className="sec-head left">
    //       <span className="eyebrow"><span className="dot"></span> Pricing intelligence</span>
    //       <h2 className="h-section">An AI-powered Bloomberg terminal,<br />for ocean freight.</h2>
    //       <p className="lead">Compare carriers in real time. Watch market trends across trade lanes. Get AI-suggested routings and validity windows — for every container you ship.</p>
    //     </div>

    //     <div style={{ border: '1px solid var(--line)', borderRadius: 20, background: '#fff', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
    //       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid var(--line)', gap: 12, flexWrap: 'wrap' }}>
    //         <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
    //           {TABS.map(t => (
    //             <span key={t} onClick={() => setTab(t)} style={{ padding: '6px 12px', fontSize: 12, fontWeight: 600, borderRadius: 8, cursor: 'pointer', border: '1px solid ' + (tab === t ? 'var(--line)' : 'transparent'), background: tab === t ? 'var(--paper-2)' : 'transparent', color: tab === t ? 'var(--ink)' : 'var(--ink-3)' }}>
    //               {t}{t === 'Saved lanes' && <span className="mono" style={{ color: 'var(--ink-4)', marginLeft: 6 }}>12</span>}
    //             </span>
    //           ))}
    //         </div>
    //         <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--paper-2)', border: '1px solid var(--line)', borderRadius: 9, padding: '6px 10px', fontSize: 12, color: 'var(--ink-3)', minWidth: 260 }}>
    //           <Icon name="search" size={13} /> Search lane, port, carrier…
    //           <span className="mono" style={{ marginLeft: 'auto', border: '1px solid var(--line)', padding: '1px 5px', borderRadius: 4, fontSize: 10, color: 'var(--ink-3)' }}>⌘K</span>
    //         </div>
    //       </div>

    //       <div className="pi-body">
    //         <div style={{ padding: 18, borderRight: '1px solid var(--line)' }}>
    //           <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '8px 0 18px' }}>
    //             <div style={{ textAlign: 'center', flex: 'none' }}>
    //               <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)' }}>INNSA</div>
    //               <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>Nhava Sheva</div>
    //               <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', marginTop: 2 }}>India</div>
    //             </div>
    //             <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,var(--blue-500),var(--orange-500))', position: 'relative' }}>
    //               <span style={{ position: 'absolute', top: -8, color: 'var(--blue-600)', fontSize: 13, animation: 'slideAcross 6s linear infinite' }}>▸</span>
    //             </div>
    //             <div style={{ textAlign: 'center', flex: 'none' }}>
    //               <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)' }}>AEJEA</div>
    //               <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>Jebel Ali</div>
    //               <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', marginTop: 2 }}>UAE</div>
    //             </div>
    //           </div>
    //           <div style={{ display: 'flex', gap: 14, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-2)', paddingBottom: 10, borderBottom: '1px solid var(--line)', flexWrap: 'wrap' }}>
    //             <span>Distance · <b style={{ color: 'var(--ink)' }}>1,940 nm</b></span>
    //             <span>Transit · <b style={{ color: 'var(--ink)' }}>7–10 days</b></span>
    //             <span>Sailings · <b style={{ color: 'var(--ink)' }}>14/week</b></span>
    //             <span>Volatility · <b style={{ color: 'var(--amber-600)' }}>+ moderate</b></span>
    //           </div>
    //           <div style={{ display: 'flex', gap: 6, margin: '14px 0 10px', flexWrap: 'wrap' }}>
    //             {CTNS.map(c => (
    //               <span key={c} onClick={() => setCtn(c)} style={{ padding: '6px 10px', fontSize: 12, fontWeight: 600, border: '1px solid ' + (ctn === c ? 'var(--blue-300)' : 'var(--line)'), borderRadius: 8, cursor: 'pointer', color: ctn === c ? 'var(--blue-700)' : 'var(--ink-3)', background: ctn === c ? 'var(--blue-50)' : '#fff' }}>{c}</span>
    //             ))}
    //           </div>
    //           <div style={{ border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
    //             <div style={{ display: 'grid', gridTemplateColumns: '1.3fr .9fr .9fr .9fr .9fr .6fr', gap: 10, padding: '11px 14px', background: 'var(--paper-3)', color: 'var(--ink-3)', fontSize: 10, letterSpacing: '.07em', textTransform: 'uppercase', fontWeight: 700, borderBottom: '1px solid var(--line)' }}>
    //               <div>Carrier</div><div>All-in</div><div>Transit</div><div>Free time</div><div>Valid</div><div></div>
    //             </div>
    //             {RATES.map(([mg, n, price, t, ft, v, tag, tagCls, best], i) => (
    //               <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.3fr .9fr .9fr .9fr .9fr .6fr', gap: 10, padding: '11px 14px', alignItems: 'center', fontSize: 13, color: 'var(--ink-2)', borderTop: i ? '1px solid var(--line-soft)' : '0', background: best ? 'var(--blue-50)' : 'transparent' }}>
    //                 <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--ink)', fontWeight: 600 }}><span className="mg">{mg}</span> {n}</div>
    //                 <div className="mono" style={{ color: 'var(--ink)', fontWeight: 700 }}>{price}</div>
    //                 <div className="mono">{t}</div><div className="mono">{ft}</div>
    //                 <div className="mono" style={{ color: 'var(--ink-3)' }}>{v}</div>
    //                 <div>{tag && <span style={{ display: 'inline-block', padding: '2px 7px', borderRadius: 5, fontSize: 10, fontWeight: 700, letterSpacing: '.03em', background: tagCls === 'tag-best' ? 'var(--blue-100)' : tagCls === 'tag-fast' ? 'var(--amber-100)' : 'var(--good-50)', color: tagCls === 'tag-best' ? 'var(--blue-700)' : tagCls === 'tag-fast' ? 'var(--amber-600)' : 'var(--good-600)' }}>{tag}</span>}</div>
    //               </div>
    //             ))}
    //           </div>
    //           <div style={{ marginTop: 18, border: '1px solid var(--line)', borderRadius: 12, padding: 14, background: 'var(--paper-2)' }}>
    //             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
    //               <div>
    //                 <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Spot market — {ctn} · last 30 days</div>
    //                 <div className="small" style={{ marginTop: 2 }}>Index: Susea Ocean Pricing · INNSA→AEJEA</div>
    //               </div>
    //               <div className="mono" style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>$1,486 <span style={{ color: 'var(--good-600)', fontSize: 11 }}>▲ 4.2%</span></div>
    //             </div>
    //             <TrendChart />
    //           </div>
    //         </div>

    //         <div style={{ padding: 18 }}>
    //           <div style={{ border: '1px solid var(--line)', borderRadius: 12, padding: 14, background: 'var(--paper-2)', marginBottom: 12 }}>
    //             <h5 style={{ margin: '0 0 10px', fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--ink-4)' }}>Surcharge breakdown · {ctn}</h5>
    //             {SURCHARGES.map(([n, v], i) => (
    //               <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--ink-2)', padding: '6px 0', borderBottom: '1px dashed var(--line)' }}>
    //                 <span>{n}</span><b className="mono" style={{ color: 'var(--ink)', fontWeight: 600 }}>{v}</b>
    //               </div>
    //             ))}
    //             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '8px 0 0' }}>
    //               <span style={{ color: 'var(--blue-700)', fontWeight: 600 }}>Subtotal surcharges</span><b className="mono" style={{ color: 'var(--blue-700)' }}>$335.00</b>
    //             </div>
    //           </div>

    //           <div style={{ border: '1px solid var(--amber-100)', borderRadius: 12, padding: 14, background: 'linear-gradient(180deg,var(--amber-50),#fff)' }}>
    //             <h5 style={{ color: 'var(--amber-600)', margin: '0 0 6px', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="sparkles" size={13} /> AI recommendation</h5>
    //             <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-2)' }}>Route via <b style={{ color: 'var(--ink)' }}>Mundra → Jebel Ali</b> on <b style={{ color: 'var(--ink)' }}>Maritime A</b>. Saves <b style={{ color: 'var(--orange-700)' }}>$184</b> versus current best, with same 7-day transit. GRI announced Dec 1 — lock booking by <b style={{ color: 'var(--ink)' }}>Nov 28</b>.</p>
    //             <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
    //               <button className="btn btn-primary" style={{ height: 32, fontSize: 12, padding: '0 12px' }}>Apply suggestion</button>
    //               <button className="btn btn-ghost" style={{ height: 32, fontSize: 12, padding: '0 12px' }}>Dismiss</button>
    //             </div>
    //           </div>

    //           <div style={{ border: '1px solid var(--line)', borderRadius: 12, padding: 14, background: 'var(--paper-2)', marginTop: 12 }}>
    //             <h5 style={{ margin: '0 0 10px', fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--ink-4)' }}>Active trade lanes</h5>
    //             <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
    //               {LANES.map(([l, p, d, up], i) => (
    //                 <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, gap: 12 }}>
    //                   <span style={{ color: 'var(--ink-2)' }}>{l}</span>
    //                   <span className="mono" style={{ color: 'var(--ink)' }}>{p} <span style={{ color: up ? 'var(--good-600)' : 'var(--bad-500)', fontSize: 11 }}>{d}</span></span>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div style={{ borderTop: '1px solid var(--line)', padding: 18 }}>
    //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 10 }}>
    //           <div>
    //             <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Global trade lane network</div>
    //             <div className="small" style={{ marginTop: 2 }}>Live vessel routing · <span className="mono" style={{ color: 'var(--ink-2)' }}>427 sailings</span> across <span className="mono" style={{ color: 'var(--ink-2)' }}>17 carriers</span></div>
    //           </div>
    //           <div style={{ display: 'flex', gap: 6 }}>
    //             <span className="pill blue">India lanes · 12</span>
    //             <span className="pill orange">High activity</span>
    //           </div>
    //         </div>
    //         <TradeMap />
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}
