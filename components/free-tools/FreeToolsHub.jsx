"use client";

import { Component, Fragment, createRef } from "react";
import { CALENDLY_URL } from "@/lib/booking";

const FAQS = [["What is a CBM calculator used for?","It works out how much space your cargo takes up in cubic metres. Shippers and forwarders use that figure to plan LCL charges, choose a container size and check whether a shipment will fit."],["How is cargo volume calculated?","Multiply length × width × height for one package. In metres that gives CBM directly; in centimetres, divide by 1,000,000. Multiply by the number of packages and add up each line. The CBM calculator does this for you."],["Can I calculate the CBM of multiple products?","Yes. Add as many product lines as you need, each with its own dimensions, weight and quantity. The calculator shows totals for the whole shipment."],["What is the difference between FCL and LCL?","FCL (full container load) means a container booked for one shipper’s cargo. LCL (less than container load) means your cargo shares a container with other shipments and is usually charged on volume or weight, whichever is higher. The right choice also depends on route, rates and cargo type."],["What is an HSN code?","HSN (Harmonized System of Nomenclature) is the international system for classifying traded goods. The first six digits are shared worldwide; India adds two more for customs and foreign trade."],["How can I search for an HSN code by product name?","Type a plain description of the product, focusing on its material and use, into the HSN code checker. Compare the matches, then confirm the final code with the official tariff or your customs broker."],["Are these logistics tools free to use?","Yes. Both tools are free, with no usage limits."],["Do I need a Susea account to use the tools?","No. Both tools work without an account or sign-up and run in your browser."]];
const BOARD = [
  [['09:40', 'CBM CALCULATOR', 'DEPARTED'], 'done'],
  [['10:15', 'HSN CODE CHECKER', 'DEPARTED'], 'done'],
  [['11:00', 'YOUR WHOLE DESK', 'BOARDING'], 'live']
];
const WID = [5, 16, 8], GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default class FreeToolsHub extends Component {
  state = { faqD: 0, tick: 999 };
  boardRef = createRef();
  componentDidMount() { const el = this.boardRef.current; if (el && window.IntersectionObserver) { this.setState({ tick: 0 }); this._io = new IntersectionObserver(es => { if (es[0].isIntersecting) { this.play(); this._io.disconnect(); } }, { threshold: .35 }); this._io.observe(el); } }
  componentWillUnmount() { clearInterval(this._iv); this._io && this._io.disconnect(); }
  play() { clearInterval(this._iv); this.setState({ tick: 0 }); this._iv = setInterval(() => this.setState(s => { if (s.tick > 80) { clearInterval(this._iv); return { tick: 999 }; } return { tick: s.tick + 1 }; }), 45); }
  renderVals() {
    const d = this.state.faqD, n = i => String(i + 1).padStart(2, '0');
    const tk = this.state.tick;
    let k = 0;
    const boardRows = BOARD.map(([cols, tone], ri) => ({ cells: [].concat(...cols.map((txt, gi) => [].concat(gi ? [{ ch: '', style: {} }] : [], txt.padEnd(WID[gi], ' ').split('').map((ch, ci) => { const at = 6 + ri * 10 + gi * 3 + ci, settled = tk >= at; k++; const shown = settled ? ch : (ch === ' ' && tk < 2 ? ' ' : GLYPHS[(k * 7 + tk * 3) % GLYPHS.length]); const isStatus = gi === 2; const color = !settled ? 'rgba(255,255,255,.55)' : isStatus ? (tone === 'live' ? '#FFB347' : '#5EE6B0') : '#F3F6FB'; return { ch: shown === ' ' ? '\u00A0' : shown, style: { minWidth: 0, aspectRatio: '11 / 16', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', background: 'linear-gradient(180deg,#1A2436 0 49%,#0E1626 49% 51%,#161F30 51%)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.05)', fontFamily: 'var(--font-mono)', fontSize: 'min(17px, 2.5cqw)', fontWeight: 700, color, transition: 'color .2s' } }; })))) }));
    return {
      boardRef: this.boardRef, boardRows, replay: () => this.play(),
      dList: FAQS.map(([q], i) => ({ q, n: n(i), pick: () => this.setState({ faqD: i }), style: { display: 'flex', gap: '14px', alignItems: 'baseline', width: '100%', textAlign: 'left', padding: '14px 16px', borderRadius: '10px', fontSize: '15px', fontWeight: d === i ? 600 : 500, lineHeight: 1.4, background: d === i ? '#fff' : 'transparent', color: d === i ? 'var(--ink)' : 'var(--ink-2)', boxShadow: d === i ? 'var(--shadow-sm)' : 'none', border: '1px solid ' + (d === i ? 'var(--line)' : 'transparent'), cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit' } })),
      dQ: FAQS[d][0], dA: FAQS[d][1], dN: n(d) + ' / ' + String(FAQS.length).padStart(2, '0'),
      dPrev: () => this.setState(st => ({ faqD: (st.faqD + FAQS.length - 1) % FAQS.length })), dNext: () => this.setState(st => ({ faqD: (st.faqD + 1) % FAQS.length }))
    };
  }

  render() {
    const V = this.renderVals();
    return (
<main className="ft-page">
<section className="section" style={{ position: "relative", overflow: "hidden", padding: "44px 20px 44px", background: "linear-gradient(180deg,#EFF5FE 0%,#F7F9FC 55%,#fff 100%)" }}>
  <div className="hero-glow-a"></div>
  <div className="hero-glow-b"></div>
  <div className="hero-grid"></div>
  <div style={{ position: "relative", maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 12px", borderRadius: "999px", background: "#fff", border: "1px solid var(--line)", boxShadow: "var(--shadow-xs)", marginBottom: "20px" }}>
      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--good-500)" }}></span>
      <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-2)" }}>Free logistics tools</span>
    </div>
    <h1 className="hero-h1" style={{ fontWeight: "600", fontSize: "clamp(40px,5vw,60px)", lineHeight: "1.04", letterSpacing: "-.035em", margin: "0 0 18px", textWrap: "balance" }}>Free tools for smarter shipping<br /><span style={{ background: "linear-gradient(120deg,var(--blue-600) 0%,var(--orange-500) 60%,var(--amber-500) 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>and global trade.</span></h1>
    <p style={{ fontSize: "18px", lineHeight: "1.6", color: "var(--ink-2)", margin: "0 auto 28px", maxWidth: "640px", textWrap: "pretty" }}>Work out how much space your cargo needs and find the right product code before you book. Two practical tools for importers, exporters, freight forwarders and logistics teams.</p>
    <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
      <a href="#tools" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 22px", borderRadius: "12px", background: "var(--blue-600)", color: "#fff", fontWeight: "600", fontSize: "15px", boxShadow: "var(--shadow-blue)" }}>Explore free tools ↓</a>
      <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 22px", borderRadius: "12px", border: "1px solid var(--line-strong)", background: "#fff", color: "var(--ink)", fontWeight: "600", fontSize: "15px" }}>Explore Susea</a>
    </div>
  </div>
</section>

<section className="section" id="tools" style={{ padding: "44px 20px 44px", background: "#fff", scrollMarginTop: "72px" }}>
  <div className="grid-1-md" style={{ maxWidth: "1440px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "20px" }}>
    <article style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "20px", boxShadow: "var(--shadow-md)", padding: "32px", display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", padding: "3px 8px", borderRadius: "6px", background: "var(--orange-50)", color: "var(--orange-600, #C85A12)" }}>CBM</span><span style={{ fontSize: "12px", fontWeight: "600", color: "var(--ink-3)" }}>FCL &amp; LCL</span></div>
      <h2 className="ds-h3" style={{ margin: "0", fontSize: "26px" }}>Free CBM calculator for cargo volume</h2>
      <p style={{ margin: "0", fontSize: "15.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Enter package dimensions and quantities to get total cubic metres and weight, then see which container fits or what you are likely to be charged on as LCL.</p>
      <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14.5px", lineHeight: "1.5", color: "var(--ink-2)" }}>
        <li style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}><span style={{ flex: "none", marginTop: "3px", display: "flex", alignItems: "center", justifyContent: "center", width: "18px", height: "18px", borderRadius: "999px", background: "var(--good-50)", color: "var(--good-600)", fontSize: "11px", fontWeight: "700" }}>✓</span><span>Multiple products, each with its own dimensions, weight and quantity</span></li>
        <li style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}><span style={{ flex: "none", marginTop: "3px", display: "flex", alignItems: "center", justifyContent: "center", width: "18px", height: "18px", borderRadius: "999px", background: "var(--good-50)", color: "var(--good-600)", fontSize: "11px", fontWeight: "700" }}>✓</span><span>Boxes, barrels, rolls, sacks, big bags, pallets and custom shapes</span></li>
        <li style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}><span style={{ flex: "none", marginTop: "3px", display: "flex", alignItems: "center", justifyContent: "center", width: "18px", height: "18px", borderRadius: "999px", background: "var(--good-50)", color: "var(--good-600)", fontSize: "11px", fontWeight: "700" }}>✓</span><span>Centimetres, millimetres, metres or inches; kilograms or pounds</span></li>
        <li style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}><span style={{ flex: "none", marginTop: "3px", display: "flex", alignItems: "center", justifyContent: "center", width: "18px", height: "18px", borderRadius: "999px", background: "var(--good-50)", color: "var(--good-600)", fontSize: "11px", fontWeight: "700" }}>✓</span><span>LCL: total CBM, metric tons and chargeable W/M</span></li>
        <li style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}><span style={{ flex: "none", marginTop: "3px", display: "flex", alignItems: "center", justifyContent: "center", width: "18px", height: "18px", borderRadius: "999px", background: "var(--good-50)", color: "var(--good-600)", fontSize: "11px", fontWeight: "700" }}>✓</span><span>FCL: container comparison, volume and payload use, and a 3D loading plan</span></li>
      </ul>
      <a href="/free-tools/cbm-calculator" style={{ marginTop: "auto", alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 18px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", fontWeight: "600", fontSize: "14px", boxShadow: "var(--shadow-blue)" }}>Use the free CBM calculator →</a>
    </article>
    <article style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "20px", boxShadow: "var(--shadow-md)", padding: "32px", display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", padding: "3px 8px", borderRadius: "6px", background: "var(--blue-50)", color: "var(--blue-700)" }}>HSN</span><span style={{ fontSize: "12px", fontWeight: "600", color: "var(--ink-3)" }}>HS 2022 · India 8-digit</span></div>
      <h2 className="ds-h3" style={{ margin: "0", fontSize: "26px" }}>Find HSN codes for your products</h2>
      <p style={{ margin: "0", fontSize: "15.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Search by product description or by code to find likely HS and HSN classifications, and see where each code sits in the hierarchy. Use it for research, then confirm with the official tariff.</p>
      <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14.5px", lineHeight: "1.5", color: "var(--ink-2)" }}>
        <li style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}><span style={{ flex: "none", marginTop: "3px", display: "flex", alignItems: "center", justifyContent: "center", width: "18px", height: "18px", borderRadius: "999px", background: "var(--good-50)", color: "var(--good-600)", fontSize: "11px", fontWeight: "700" }}>✓</span><span>Search by product name or by a 2 to 8 digit code</span></li>
        <li style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}><span style={{ flex: "none", marginTop: "3px", display: "flex", alignItems: "center", justifyContent: "center", width: "18px", height: "18px", borderRadius: "999px", background: "var(--good-50)", color: "var(--good-600)", fontSize: "11px", fontWeight: "700" }}>✓</span><span>Section, chapter, heading, subheading and India 8-digit tariff item</span></li>
        <li style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}><span style={{ flex: "none", marginTop: "3px", display: "flex", alignItems: "center", justifyContent: "center", width: "18px", height: "18px", borderRadius: "999px", background: "var(--good-50)", color: "var(--good-600)", fontSize: "11px", fontWeight: "700" }}>✓</span><span>Browse all 21 sections and 97 chapters of HS 2022</span></li>
        <li style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}><span style={{ flex: "none", marginTop: "3px", display: "flex", alignItems: "center", justifyContent: "center", width: "18px", height: "18px", borderRadius: "999px", background: "var(--good-50)", color: "var(--good-600)", fontSize: "11px", fontWeight: "700" }}>✓</span><span>Copy a code in one click</span></li>
        <li style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}><span style={{ flex: "none", marginTop: "3px", display: "flex", alignItems: "center", justifyContent: "center", width: "18px", height: "18px", borderRadius: "999px", background: "var(--good-50)", color: "var(--good-600)", fontSize: "11px", fontWeight: "700" }}>✓</span><span>Codes and descriptions only. No duty or GST rates</span></li>
      </ul>
      <a href="/free-tools/hsn-code-checker" style={{ marginTop: "auto", alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 18px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", fontWeight: "600", fontSize: "14px", boxShadow: "var(--shadow-blue)" }}>Check HSN codes →</a>
    </article>
  </div>
</section>

<section className="section" style={{ padding: "44px 20px", background: "#fff", borderTop: "1px solid var(--line-soft)" }}>
  <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "20px 40px", marginBottom: "48px" }}>
      <div style={{ maxWidth: "640px" }}>
        <div className="ds-eyebrow" style={{ marginBottom: "14px" }}>How it works</div>
        <h2 className="ds-h2" style={{ margin: "0", textWrap: "balance" }}>Useful trade tools. Simple workflows.</h2>
      </div>
      <p style={{ margin: "0", maxWidth: "420px", fontSize: "15.5px", lineHeight: "1.6", color: "var(--ink-3)", textWrap: "pretty" }}>Three steps from a question about your cargo to an answer you can take to your forwarder or broker.</p>
    </div>
    <div style={{ position: "relative" }}>
      <div className="hide-md" style={{ position: "absolute", left: "26px", right: "26px", top: "25px", height: "2px", background: "linear-gradient(90deg,var(--blue-600) 0%,var(--orange-500) 55%,var(--amber-500) 100%)", opacity: ".35" }}></div>
      <div className="grid-1-md" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "40px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <span style={{ position: "relative", zIndex: "1", display: "flex", alignItems: "center", justifyContent: "center", width: "52px", height: "52px", borderRadius: "16px", background: "var(--blue-600)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "18px", fontWeight: "700", boxShadow: "0 0 0 6px #fff,var(--shadow-md)" }}>01</span>
        <h3 style={{ margin: "6px 0 0", fontSize: "22px", fontWeight: "600", letterSpacing: "-.02em", lineHeight: "1.2", color: "var(--ink)" }}>Pick the tool for the job</h3>
        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "var(--ink-2)", maxWidth: "360px", textWrap: "pretty" }}>Sizing a shipment? Open the CBM calculator. Preparing documents? Open the HSN code checker.</p>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", alignContent: "center", gap: "8px", minHeight: "64px", marginTop: "auto", padding: "14px", borderRadius: "14px", background: "var(--paper-2)", border: "1px solid var(--line-soft)" }}><span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 11px", borderRadius: "9px", background: "var(--orange-50)", border: "1px solid var(--orange-300, #FDBA8C)", fontSize: "12.5px", fontWeight: "600", color: "var(--orange-600, #C85A12)" }}>CBM calculator</span><span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 11px", borderRadius: "9px", background: "var(--blue-50)", border: "1px solid var(--blue-300)", fontSize: "12.5px", fontWeight: "600", color: "var(--blue-700)" }}>HSN code checker</span></div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <span style={{ position: "relative", zIndex: "1", display: "flex", alignItems: "center", justifyContent: "center", width: "52px", height: "52px", borderRadius: "16px", background: "var(--orange-500)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "18px", fontWeight: "700", boxShadow: "0 0 0 6px #fff,var(--shadow-md)" }}>02</span>
        <h3 style={{ margin: "6px 0 0", fontSize: "22px", fontWeight: "600", letterSpacing: "-.02em", lineHeight: "1.2", color: "var(--ink)" }}>Enter your cargo or product</h3>
        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "var(--ink-2)", maxWidth: "360px", textWrap: "pretty" }}>Add package dimensions, weights and quantities, or type a product description or code.</p>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", alignContent: "center", gap: "8px", minHeight: "64px", marginTop: "auto", padding: "14px", borderRadius: "14px", background: "var(--paper-2)", border: "1px solid var(--line-soft)" }}><span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 11px", borderRadius: "9px", background: "#fff", border: "1px solid var(--line)", fontSize: "12.5px", fontWeight: "600", color: "var(--ink-2)", fontFamily: "var(--font-mono)" }}>60 × 40 × 50 cm</span><span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 11px", borderRadius: "9px", background: "#fff", border: "1px solid var(--line)", fontSize: "12.5px", fontWeight: "600", color: "var(--ink-2)", fontFamily: "var(--font-mono)" }}>× 10</span><span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 11px", borderRadius: "9px", background: "#fff", border: "1px solid var(--line)", fontSize: "12.5px", fontWeight: "600", color: "var(--ink-2)" }}>cotton t-shirts</span></div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <span style={{ position: "relative", zIndex: "1", display: "flex", alignItems: "center", justifyContent: "center", width: "52px", height: "52px", borderRadius: "16px", background: "var(--amber-500)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "18px", fontWeight: "700", boxShadow: "0 0 0 6px #fff,var(--shadow-md)" }}>03</span>
        <h3 style={{ margin: "6px 0 0", fontSize: "22px", fontWeight: "600", letterSpacing: "-.02em", lineHeight: "1.2", color: "var(--ink)" }}>Review and take it forward</h3>
        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "var(--ink-2)", maxWidth: "360px", textWrap: "pretty" }}>Check the volume, container fit or matching codes, then confirm the details with your carrier, forwarder or customs broker.</p>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", alignContent: "center", gap: "8px", minHeight: "64px", marginTop: "auto", padding: "14px", borderRadius: "14px", background: "var(--paper-2)", border: "1px solid var(--line-soft)" }}><span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 11px", borderRadius: "9px", background: "var(--orange-50)", border: "1px solid var(--orange-300, #FDBA8C)", fontSize: "12.5px", fontWeight: "600", color: "var(--orange-600, #C85A12)", fontFamily: "var(--font-mono)" }}>1.2 CBM</span><span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 11px", borderRadius: "9px", background: "var(--blue-50)", border: "1px solid var(--blue-300)", fontSize: "12.5px", fontWeight: "600", color: "var(--blue-700)", fontFamily: "var(--font-mono)" }}>HSN 6109</span></div>
      </div>
      </div>
    </div>
  </div>
</section>

<section className="section" style={{ padding: "44px 20px", background: "var(--paper-2)" }}>
  <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
    <div style={{ marginBottom: "32px", maxWidth: "820px" }}>
      <div className="ds-eyebrow" style={{ marginBottom: "14px" }}>Who it's for</div>
      <h2 className="ds-h2" style={{ margin: "0", textWrap: "balance" }}>Built for people who move goods across borders.</h2>
    </div>
    <div className="grid-1-md" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "16px" }}>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Importers and exporters</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Know roughly how much space an order needs and which code it is likely to fall under before you ask for a quote.</p>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Freight forwarders</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Answer a customer’s “will it fit in a 20’?” in minutes, and pick up a missing code while preparing documents.</p>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Customs brokers and CHAs</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Look up a heading fast when a client sends a vague description, then confirm it against the tariff.</p>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Logistics and operations teams</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Check volume, payload and stacking before a booking, so the plan matches what turns up at the dock.</p>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Manufacturers and traders</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Keep product dimensions and codes consistent across purchase orders, invoices and shipping documents.</p>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Procurement teams</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Compare FCL and LCL on the same cargo before you go to market for freight.</p>
      </div>
    </div>
  </div>
</section>

<section className="section" id="faq" style={{ padding: "44px 20px", background: "#fff" }}>
  <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "720px" }}>
      <div className="ds-eyebrow" style={{ alignSelf: "flex-start" }}>FAQ</div>
      <h2 className="ds-h2" style={{ margin: "0", textWrap: "balance" }}>Common questions about the tools.</h2>
    </div>
    <div className="grid-1-md" style={{ display: "grid", gridTemplateColumns: "minmax(0,5fr) minmax(0,7fr)", gap: "24px", alignItems: "stretch" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "8px", borderRadius: "16px", background: "#EEF3FA", maxHeight: "560px", overflowY: "auto" }}>
        {(V.dList || []).map((q, qI) => (<Fragment key={qI}><button onClick={q.pick} style={q.style}><span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "#2F6BD8", flexShrink: "0" }}>{q.n}</span><span>{q.q}</span></button></Fragment>
))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "40px", borderRadius: "18px", background: "#fff", border: "1px solid var(--line)", boxShadow: "var(--shadow-md)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "0", right: "0", top: "0", height: "3px", background: "linear-gradient(90deg,#4A82D9,#F07020,#F5A000)" }}></div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", letterSpacing: ".08em", color: "#6B7A92" }}>{V.dN}</div>
        <h3 style={{ margin: "0", fontSize: "28px", fontWeight: "600", letterSpacing: "-.025em", lineHeight: "1.15", color: "var(--ink)", textWrap: "balance" }}>{V.dQ}</h3>
        <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.7", color: "var(--ink-2)", textWrap: "pretty" }}>{V.dA}</p>
        <div style={{ marginTop: "auto", display: "flex", gap: "10px", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", paddingTop: "20px", borderTop: "1px solid #EDF1F7" }}>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: "14px", fontWeight: "600", color: "#1E5BC6" }}>Still unsure? Book a demo →</a>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={V.dPrev} aria-label="Previous question" style={{ width: "44px", height: "44px", borderRadius: "10px", border: "1px solid var(--line)", background: "#fff", color: "var(--ink)", fontSize: "18px", cursor: "pointer" }}>←</button>
            <button onClick={V.dNext} aria-label="Next question" style={{ width: "44px", height: "44px", borderRadius: "10px", border: "1px solid var(--line)", background: "#fff", color: "var(--ink)", fontSize: "18px", cursor: "pointer" }}>→</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="section" ref={V.boardRef} style={{ padding: "44px 20px", background: "radial-gradient(900px 380px at 85% 0%,rgba(240,112,32,.16),transparent 65%),radial-gradient(900px 380px at 10% 100%,rgba(74,130,217,.2),transparent 65%),var(--ink)" }}>
  <div className="grid-1-lg" style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,5fr) minmax(0,7fr)", gap: "48px", alignItems: "center" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "700", letterSpacing: ".14em", color: "#FFCB6B" }}><span style={{ width: "8px", height: "8px", borderRadius: "999px", background: "#F07020", boxShadow: "0 0 0 4px rgba(240,112,32,.25)" }}></span><span>NEXT DEPARTURE · SUSEA</span></div>
      <h2 style={{ margin: "0", fontSize: "clamp(32px,4vw,50px)", fontWeight: "600", letterSpacing: "-.035em", lineHeight: "1.05", color: "#fff", textWrap: "balance" }}>Need more than free tools? Meet Susea.</h2>
      <p style={{ margin: "0", maxWidth: "520px", fontSize: "17px", lineHeight: "1.6", color: "rgba(255,255,255,.75)", textWrap: "pretty" }}>Susea helps freight-forwarding and logistics teams organise customer information, manage quotations, centralise pricing and automate follow-ups across email and WhatsApp, without replacing the systems you already use.</p>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
        <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "52px", padding: "0 24px", borderRadius: "12px", background: "var(--orange-500)", color: "#fff", fontWeight: "600", fontSize: "15px", boxShadow: "0 10px 24px rgba(240,112,32,.35)" }}>Board now →</a>
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "52px", padding: "0 22px", borderRadius: "12px", border: "1px solid rgba(255,255,255,.28)", color: "#fff", fontWeight: "600", fontSize: "15px" }}>Book a demo</a>
      </div>
    </div>
    <div style={{ containerType: "inline-size", minWidth: "0", borderRadius: "18px", padding: "22px 22px 18px", background: "#0A111E", border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 30px 70px rgba(0,0,0,.45)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", marginBottom: "14px", fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: "700", letterSpacing: ".14em", color: "rgba(255,255,255,.5)" }}><span>DEPARTURES · FREIGHT DESK</span><button onClick={V.replay} style={{ background: "transparent", color: "rgba(255,255,255,.6)", fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: "700", letterSpacing: ".14em", cursor: "pointer", padding: "4px 0" }}>↻ REFRESH</button></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr)) 8px repeat(16,minmax(0,1fr)) 8px repeat(8,minmax(0,1fr))", columnGap: "2px", fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: "700", letterSpacing: ".14em", color: "rgba(255,255,255,.4)", marginBottom: "6px" }}><span style={{ gridColumn: "1 / span 5" }}>TIME</span><span style={{ gridColumn: "7 / span 16" }}>DESTINATION</span><span style={{ gridColumn: "24 / span 8" }}>STATUS</span></div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {(V.boardRows || []).map((r, rI) => (<Fragment key={rI}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr)) 8px repeat(16,minmax(0,1fr)) 8px repeat(8,minmax(0,1fr))", columnGap: "2px" }}>
            {(r.cells || []).map((c, cI) => (<Fragment key={cI}><span style={c.style}>{c.ch}</span></Fragment>
))}
          </div>
        </Fragment>
))}
      </div>
    </div>
  </div>
</section>
</main>
    );
  }
}
