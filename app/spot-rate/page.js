"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Script from "next/script";
import useEmblaCarousel from "embla-carousel-react";
import * as Lucide from "lucide-react";
import { smoothScrollToId, smoothScrollToTop } from "@/lib/scroll";
import "./spot-rate.css";

function I({ n, style }) {
  const key = n.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
  const C = Lucide[key];
  return C ? <C style={style} strokeWidth={1.85} /> : null;
}

/* ---- HubSpot demo-request form (same portal/form as the main landing page). ---- */
const HS_PORTAL_ID = "246430647";
const HS_REGION = "na2";
const HS_FORM_ID = "e8384cae-33eb-484b-8cae-63985955f33d";

function HubSpotForm() {
  return (
    <>
      <div className="hs-form-frame" data-region={HS_REGION} data-form-id={HS_FORM_ID} data-portal-id={HS_PORTAL_ID} />
      <Script src={`https://js-${HS_REGION}.hsforms.net/forms/embed/${HS_PORTAL_ID}.js`} strategy="afterInteractive" />
    </>
  );
}

function fmtMoney(n) {
  return Math.round(n).toLocaleString("en-US");
}

function computeRoi(roi) {
  const { shipments, hours, spend } = roi;
  const HOURLY = 35;
  const FREIGHT_REDUCTION = 0.06;
  const TIME_REDUCTION = 0.9;
  const hoursSaved = Math.round(shipments * hours * TIME_REDUCTION);
  const timeSavings = hoursSaved * HOURLY * 12;
  const freightSavings = shipments * spend * FREIGHT_REDUCTION * 12;
  const totalSavings = timeSavings + freightSavings;
  const extraShipments = Math.round((shipments * hours * TIME_REDUCTION) / Math.max(hours, 0.5));
  return {
    hoursSaved: hoursSaved.toLocaleString("en-US"),
    timeSavings: fmtMoney(timeSavings),
    freightSavings: fmtMoney(freightSavings),
    totalSavings: fmtMoney(totalSavings),
    extraShipments: extraShipments.toLocaleString("en-US"),
  };
}

function tabStyle(active, accent) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 16px",
    borderRadius: "10px", fontSize: "13.5px", fontWeight: 600, transition: "all .15s", cursor: "pointer",
  };
  if (active) {
    return { ...base, background: accent, color: "#fff",
      boxShadow: accent === "var(--blue-600)" ? "var(--shadow-blue)" : "var(--shadow-orange)" };
  }
  return { ...base, color: "var(--ink-3)", background: "transparent" };
}

const FAQ_ITEMS = [
  { q:"How difficult is implementation?", a:"Zero implementation. You log in, connect your team, and start pulling rates in under 24 hours. No IT project, no migration." },
  { q:"How long does onboarding take?", a:"Most teams are running their first real RFQ within a day. Our team walks your buyers through it in a single 30-minute session." },
  { q:"Will my team need training?", a:"Susea looks like the tools your team already uses. Most users are confident on day one; we include unlimited async support and a live 30-min session for every new hire." },
  { q:"Is my data secure?", a:"Yes. 256-bit encryption at rest and in transit, GDPR compliant, SOC 2 Type II in progress. Your contracts and supplier data never leave your workspace." },
  { q:"Can we keep using our existing forwarders?", a:"Absolutely. Susea layers on top of your existing forwarder relationships; you just get them all in one workspace, responding in one format." },
  { q:"Do you integrate with our ERP / TMS?", a:"Yes; we have native connectors for SAP, Oracle NetSuite, Zoho and generic REST APIs. Everything you award on Susea can flow back into your system of record." },
  { q:"What support do you provide?", a:"Every plan includes a dedicated onboarding lead, chat & email support, and a shared Slack channel. Enterprise plans get a named account manager." },
  { q:"How do you price?", a:"Simple usage-based tiers. Book a demo for a quote; most teams find the platform pays for itself in the first 60 days from freight-cost savings alone." }
];

const TESTIMONIALS = [
  { company: "Meridian Freight Solutions", name: "Arjun Mehta", title: "Head of Pricing", icon: "layers", border: "var(--orange-500)", iconBg: "var(--blue-50)", iconColor: "var(--blue-600)",
    quote: "Before Susea, our pricing desk was copy-pasting rates from four different WhatsApp groups into Excel every morning. Now we get a live comparison across 200+ carriers before the first coffee. Quotation time went from 20 minutes to under 90 seconds. That's not an exaggeration." },
  { company: "BlueWave Logistics", name: "Priya Nair", title: "Commercial Director", icon: "waves", border: "var(--blue-500)", iconBg: "var(--amber-50)", iconColor: "var(--amber-600)",
    quote: "The tariff extraction alone saved us hours every week. We were drowning in PDF rate sheets from agents. Susea just reads them and normalises everything automatically. The surcharge automation is something we didn't know we needed until we had it." },
  { company: "Trident Global Forwarding", name: "Daniel Osei", title: "Operations Manager", icon: "gavel", border: "var(--orange-500)", iconBg: "var(--orange-50)", iconColor: "var(--orange-600)",
    quote: "We used to have someone calling eight agents one by one asking if they'd bid yet. Now Susea nudges them automatically: time left, their rank, a reason to move. Our last RFQ closed with all eight bids in without a single manual chase. That's a job nobody misses." },
  { company: "Apex Trade Partners", name: "Sarah Lindqvist", title: "CEO", icon: "activity", border: "var(--blue-500)", iconBg: "var(--orange-50)", iconColor: "var(--orange-600)",
    quote: "A customer's WhatsApp message used to sit in an inbox until someone had time to retype it into a quote. Now it shows up already priced, ready for me to approve. I still say yes or no; I just never have to be the one who starts it." },
  { company: "Harbor & Co Freight", name: "Mohammed Al-Rashidi", title: "Pricing Lead", icon: "life-buoy", border: "var(--orange-500)", iconBg: "var(--blue-50)", iconColor: "var(--blue-600)",
    quote: "The WhatsApp quote sharing is genuinely a game changer for our market. Customers expect instant responses. Now we send a branded, fully calculated quote directly on WhatsApp in seconds, with a one-tap acceptance. Our conversion rate on quotes has gone up noticeably." },
  { company: "Continental Cargo Group", name: "Elena Vasquez", title: "Head of Procurement", icon: "globe", border: "var(--blue-500)", iconBg: "var(--bad-50)", iconColor: "var(--bad-500)",
    quote: "We had a $40,000 quote expire because nobody caught it in time. Now Susea flags anything about to lapse, re-prices it against today's tariff, and has the re-send ready before the customer even notices. We haven't lost one since." },
];

const PROCUREMENT_FEATURES = [
  { icon:"search", iconBg:"var(--blue-50)", iconColor:"var(--blue-600)", title:"Live rates on any lane", body:"40+ carriers, updated continuously. FCL, LCL, air. Every major trade lane." },
  { icon:"scale", iconBg:"var(--blue-50)", iconColor:"var(--blue-600)", title:"Side-by-side comparison", body:"All-in price, transit time, free time, validity: apples to apples." },
  { icon:"send", iconBg:"var(--blue-50)", iconColor:"var(--blue-600)", title:"Multi-provider RFQ", body:"One structured brief → every forwarder responds in the same format." },
  { icon:"sparkles", iconBg:"linear-gradient(135deg,var(--amber-500),var(--orange-500))", iconColor:"#fff", title:"AI recommendations", body:"“Best rate”, “fastest transit”, “best free time”: surfaced automatically." },
  { icon:"file-text", iconBg:"var(--blue-50)", iconColor:"var(--blue-600)", title:"Branded quotations", body:"Customer-ready PDF quotes with your logo, generated in seconds." },
  { icon:"calculator", iconBg:"var(--blue-50)", iconColor:"var(--blue-600)", title:"Surcharges built-in", body:"BAF, THC, ISPS, LSS: calculated and audited. No margin leaks." },
  { icon:"history", iconBg:"var(--blue-50)", iconColor:"var(--blue-600)", title:"Rate & RFQ history", body:"Every quote, every award: searchable. Real leverage on your next lane." },
  { icon:"users", iconBg:"var(--blue-50)", iconColor:"var(--blue-600)", title:"Team collaboration", body:"Buyers, ops, finance: everyone on the same shipment, same page." },
];

function renderProcCard(f, key) {
  const gradient = f.iconBg.startsWith("linear-gradient");
  return React.createElement("div", { key, style:{ position:"relative", border:"1px solid var(--line)", background:"#fff", borderRadius:"16px", padding:"22px", minHeight:"190px", boxShadow:"var(--shadow-xs)" }},
    React.createElement("div", { style:{ width:"40px", height:"40px", borderRadius:"11px", border: gradient ? "1px solid transparent" : "1px solid var(--line)", display:"flex", alignItems:"center", justifyContent:"center", background:f.iconBg, color:f.iconColor, marginBottom:"14px" }},
      React.createElement(I, { n:f.icon, style:{ width:"20px", height:"20px" }})
    ),
    React.createElement("h4", { style:{ margin:"0 0 6px", fontSize:"15px", fontWeight:600, color:"var(--ink)" }}, f.title),
    React.createElement("p", { style:{ margin:"0", fontSize:"13px", color:"var(--ink-2)", lineHeight:1.5 }}, f.body)
  );
}

// Isolated so Embla's select/drag state updates re-render ONLY the slider,
// not the whole (very large) SpotRatePage tree; this is what keeps the
// animation as smooth as the main page's Features slider.
function ProcMobileSlider() {
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
    <div className="features-mobile">
      <div className="feat-embla" ref={emblaRef}>
        <div className="feat-track">
          {PROCUREMENT_FEATURES.map((f, i) => (
            <div className="feat-slide" key={i}>
              {renderProcCard(f, i)}
            </div>
          ))}
        </div>
      </div>
      <div className="feat-nav">
        <button
          className="feat-nav-btn"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label="Previous feature"
        >
          <I n="chevron-left" style={{ width: "18px", height: "18px" }} />
        </button>
        <span className="feat-nav-count">
          {index + 1} / {PROCUREMENT_FEATURES.length}
        </span>
        <button
          className="feat-nav-btn"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label="Next feature"
        >
          <I n="chevron-right" style={{ width: "18px", height: "18px" }} />
        </button>
      </div>
    </div>
  );
}

function renderRatesPanel() {
    return React.createElement("div", { style:{ position:"relative", border:"1px solid var(--line)", borderRadius:"18px", background:"#fff", padding:"14px", boxShadow:"var(--shadow-xl)", animation:"suFadeUp .35s ease" }, key:"rates" },
      React.createElement("div", { style:{ position:"absolute", left:"18px", right:"18px", top:"-1px", height:"2px", borderRadius:"2px", background:"linear-gradient(90deg,transparent,var(--blue-500),var(--orange-500),var(--amber-500),transparent)" }}),
      React.createElement("div", { style:{ display:"flex", alignItems:"center", gap:"10px", padding:"6px 8px 12px" }},
        React.createElement("div", { "data-su-url":true, style:{ flex:1, height:"28px", borderRadius:"8px", background:"var(--paper-2)", border:"1px solid var(--line-soft)", display:"flex", alignItems:"center", padding:"0 10px", color:"var(--ink-3)", fontSize:"12px", fontFamily:"var(--font-mono)", whiteSpace:"nowrap", overflow:"hidden" }}, "app.susea.ai/instant-rates/INNSA-AEJEA"),
        React.createElement("span", { style:{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"4px 10px", borderRadius:"999px", fontSize:"11px", fontWeight:600, color:"var(--good-600)", background:"var(--good-50)", border:"1px solid #C2E7D6" }},
          React.createElement("i", { style:{ width:"6px", height:"6px", borderRadius:"999px", background:"var(--good-500)", boxShadow:"0 0 0 3px rgba(31,157,107,.18)", animation:"suPulse 1.8s infinite" }}), "LIVE"
        )
      ),
      // large screenshot-like content
      React.createElement("div", { style:{ padding:"8px", display:"grid", gridTemplateColumns:"1fr", gap:"12px" }},
        React.createElement("div", { style:{ padding:"18px", borderRadius:"12px", background:"var(--paper-2)", border:"1px solid var(--line-soft)" }},
          React.createElement("div", { "data-su-rates-search":true, style:{ display:"flex", gap:"12px", flexWrap:"wrap", alignItems:"center" }},
            React.createElement("div", { style:{ padding:"8px 14px", background:"#fff", border:"1px solid var(--line)", borderRadius:"10px" }},
              React.createElement("div", { style:{ fontSize:"10px", color:"var(--ink-4)", letterSpacing:".06em", textTransform:"uppercase", fontWeight:700 }}, "Origin"),
              React.createElement("div", { style:{ fontSize:"13px", fontWeight:600, color:"var(--ink)", marginTop:"2px" }}, "Nhava Sheva · INNSA")
            ),
            React.createElement(I, { n:"arrow-right", style:{ width:"18px", height:"18px", color:"var(--blue-600)" }}),
            React.createElement("div", { style:{ padding:"8px 14px", background:"#fff", border:"1px solid var(--line)", borderRadius:"10px" }},
              React.createElement("div", { style:{ fontSize:"10px", color:"var(--ink-4)", letterSpacing:".06em", textTransform:"uppercase", fontWeight:700 }}, "Destination"),
              React.createElement("div", { style:{ fontSize:"13px", fontWeight:600, color:"var(--ink)", marginTop:"2px" }}, "Jebel Ali · AEJEA")
            ),
            React.createElement("div", { style:{ padding:"8px 14px", background:"#fff", border:"1px solid var(--line)", borderRadius:"10px" }},
              React.createElement("div", { style:{ fontSize:"10px", color:"var(--ink-4)", letterSpacing:".06em", textTransform:"uppercase", fontWeight:700 }}, "Cargo"),
              React.createElement("div", { style:{ fontSize:"13px", fontWeight:600, color:"var(--ink)", marginTop:"2px" }}, "1× 40′HC · FCL")
            ),
            React.createElement("div", { style:{ marginLeft:"auto", padding:"9px 16px", background:"var(--blue-600)", color:"#fff", borderRadius:"10px", fontSize:"13px", fontWeight:600, boxShadow:"var(--shadow-blue)" }}, "Search rates")
          )
        ),
        renderRatesTable()
      )
    );
  }

function renderRatesTable() {
    const rows = [
      { c:"Maersk", mg:"MA", price:"$1,420", transit:"18d", ft:"14 days", tag:"BEST", best:true },
      { c:"MSC", mg:"MK", price:"$1,485", transit:"17d", ft:"10 days", tag:"FAST" },
      { c:"CMA CGM", mg:"CG", price:"$1,510", transit:"19d", ft:"14 days", tag:"" },
      { c:"Hapag-Lloyd", mg:"HL", price:"$1,565", transit:"20d", ft:"7 days", tag:"" },
      { c:"ONE", mg:"ON", price:"$1,580", transit:"21d", ft:"14 days", tag:"" },
      { c:"COSCO", mg:"CO", price:"$1,610", transit:"22d", ft:"10 days", tag:"" }
    ];
    return React.createElement("div", { "data-su-rates-table":true, style:{ borderRadius:"12px", overflow:"hidden", border:"1px solid var(--line)", background:"#fff" }},
      React.createElement("div", { style:{ display:"grid", gridTemplateColumns:"1.6fr .9fr .55fr .7fr .6fr", padding:"11px 14px", gap:"10px", background:"var(--paper-3)", color:"var(--ink-3)", fontSize:"10.5px", letterSpacing:".07em", textTransform:"uppercase", fontWeight:700, borderBottom:"1px solid var(--line)" }},
        React.createElement("div", null, "Carrier"),
        React.createElement("div", null, "All-in / TEU"),
        React.createElement("div", null, "Transit"),
        React.createElement("div", null, "Free time"),
        React.createElement("div", null, "")
      ),
      rows.map((r, i) => React.createElement("div", { key:i, style:{ display:"grid", gridTemplateColumns:"1.6fr .9fr .55fr .7fr .6fr", padding:"12px 14px", gap:"10px", alignItems:"center", background: r.best ? "var(--blue-50)" : "#fff", borderBottom: i === rows.length-1 ? "0" : "1px solid var(--line-soft)", fontSize:"13px", color:"var(--ink-2)" }},
        React.createElement("div", { style:{ display:"flex", alignItems:"center", gap:"10px", fontWeight:600, color:"var(--ink)" }},
          React.createElement("span", { style:{ width:"24px", height:"24px", border:"1px solid var(--line)", borderRadius:"5px", display:"inline-flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-mono)", fontSize:"10px", color:"var(--blue-700)", background: r.best ? "#fff" : "var(--blue-50)", fontWeight:700 }}, r.mg),
          r.c
        ),
        React.createElement("div", { style:{ fontFamily:"var(--font-mono)", fontWeight:600, color:"var(--ink)" }}, r.price),
        React.createElement("div", { style:{ fontFamily:"var(--font-mono)" }}, r.transit),
        React.createElement("div", { style:{ fontFamily:"var(--font-mono)" }}, r.ft),
        React.createElement("div", null, r.tag ? React.createElement("span", { style:{ display:"inline-flex", padding:"3px 8px", borderRadius:"999px", background: r.tag==="BEST" ? "var(--blue-600)" : "var(--amber-50)", color: r.tag==="BEST" ? "#fff" : "var(--amber-600)", border: r.tag==="BEST" ? "none" : "1px solid var(--amber-100)", fontSize:"10px", fontWeight:700, letterSpacing:".05em" }}, r.tag) : null)
      ))
    );
  }

function renderRfqPanel() {
    const steps = [
      { n:1, title:"Build & launch", body:"Upload many lanes at once and float the RFQ to your own agents in one click: spot or contract.", icon:"rocket" },
      { n:2, title:"Agents bid live", body:"Invited agents bid in your chosen visibility mode: sealed, rank-only, best-price or open, and re-bid down to climb.", icon:"gavel" },
      { n:3, title:"AI compares & ranks", body:"Every bid is normalized and sanity-checked. AI recommends the best agent by cost, transit or schedule.", icon:"sparkles" },
      { n:4, title:"Approve & award", body:"Route the winner through your approval matrix with documented justification; fully audit-ready.", icon:"check-check" },
      { n:5, title:"Contract & track", body:"Awarded rates become digital contracts. Susea tracks utilization so negotiated savings actually land.", icon:"file-check" }
    ];
    const workflow = React.createElement("div", { style:{ marginBottom:"14px" }},
      React.createElement("div", { style:{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"10px", marginBottom:"12px" }},
        React.createElement("div", null,
          React.createElement("div", { style:{ fontSize:"10.5px", fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"var(--orange-700)" }}, "How an RFQ works"),
          React.createElement("div", { style:{ fontSize:"15px", fontWeight:600, color:"var(--ink)", marginTop:"3px", letterSpacing:"-.01em" }}, "Launch → bid → compare → award, in days, not a month")
        ),
        React.createElement("span", { style:{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"5px 10px", borderRadius:"999px", fontSize:"11px", fontWeight:700, color:"var(--good-600)", background:"var(--good-50)", border:"1px solid #C2E7D6" }}, "1–3 days, tender → award")
      ),
      React.createElement("div", { "data-su-rfq-flow":true, "data-su-pair-tight":true, style:{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"10px" }},
        steps.map(s => React.createElement("div", { key:s.n, style:{ position:"relative", border:"1px solid var(--line)", borderRadius:"12px", padding:"14px 12px", background:"var(--paper-2)", display:"flex", flexDirection:"column", gap:"6px" }},
          React.createElement("div", { style:{ display:"flex", alignItems:"center", justifyContent:"space-between" }},
            React.createElement("span", { style:{ width:"26px", height:"26px", borderRadius:"8px", background:"var(--orange-500)", color:"#fff", fontFamily:"var(--font-mono)", fontWeight:700, fontSize:"12px", display:"inline-flex", alignItems:"center", justifyContent:"center" }}, s.n),
            React.createElement(I, { n:s.icon, style:{ width:"16px", height:"16px", color:"var(--orange-600)" }})
          ),
          React.createElement("div", { style:{ fontSize:"12.5px", fontWeight:700, color:"var(--ink)", lineHeight:1.25, marginTop:"2px" }}, s.title),
          React.createElement("div", { style:{ fontSize:"11.5px", color:"var(--ink-3)", lineHeight:1.4 }}, s.body)
        ))
      ),
      React.createElement("div", { "data-su-rfq-vis":true, style:{ marginTop:"12px", padding:"12px 14px", border:"1px solid var(--line)", borderRadius:"12px", background:"#fff", display:"flex", gap:"10px 12px", alignItems:"center", flexWrap:"wrap" }},
        React.createElement("div", { style:{ fontSize:"11px", fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", color:"var(--ink-3)" }}, "Bidder visibility"),
        React.createElement("div", { "data-su-rfq-vis-chips":true, style:{ display:"flex", gap:"8px", flexWrap:"wrap" }},
          [
            ["eye-off","Sealed bid"],
            ["list-ordered","Rank-only",true],
            ["trending-down","Best price"],
            ["eye","Open auction"]
          ].map(([ic, lbl, on], i) => React.createElement("span", { key:i, style:{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"6px", padding:"5px 10px", borderRadius:"999px", fontSize:"11.5px", fontWeight:600, whiteSpace:"nowrap", color: on ? "var(--orange-700)" : "var(--ink-2)", background: on ? "var(--orange-50)" : "var(--paper-2)", border: on ? "1px solid var(--orange-100)" : "1px solid var(--line)" }},
            React.createElement(I, { n:ic, style:{ width:"12px", height:"12px", flex:"none" }}),
            lbl,
            on ? React.createElement("b", { style:{ marginLeft:"4px", fontSize:"10px", color:"var(--orange-700)" }}, "· recommended") : null
          ))
        ),
        React.createElement("span", { "data-su-rfq-vis-note":true, style:{ marginLeft:"auto", fontSize:"11.5px", color:"var(--ink-3)" }}, "Switch per auction; not a one-time setup.")
      )
    );
    return React.createElement("div", { key:"rfq", style:{ position:"relative", border:"1px solid var(--line)", borderRadius:"18px", background:"#fff", padding:"20px", boxShadow:"var(--shadow-xl)", animation:"suFadeUp .35s ease" }},
      React.createElement("div", { style:{ position:"absolute", left:"18px", right:"18px", top:"-1px", height:"2px", borderRadius:"2px", background:"linear-gradient(90deg,transparent,var(--orange-500),var(--amber-500),var(--blue-500),transparent)" }}),
      workflow,
      React.createElement("div", { style:{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"10px", padding:"6px 4px 16px", borderBottom:"1px solid var(--line-soft)" }},
        React.createElement("div", null,
          React.createElement("div", { style:{ fontFamily:"var(--font-mono)", fontSize:"11.5px", color:"var(--ink-3)" }}, "RFQ #24801 · 40′HC × 12 · Q1 lanes"),
          React.createElement("div", { style:{ fontSize:"15px", fontWeight:600, color:"var(--ink)", marginTop:"3px" }}, "India → UAE, KSA, Oman · 3-month contract")
        ),
        React.createElement("span", { style:{ display:"inline-flex", alignItems:"center", gap:"7px", padding:"7px 12px", borderRadius:"9px", fontSize:"12.5px", fontWeight:700, color:"var(--orange-700)", background:"var(--orange-50)", border:"1px solid var(--orange-100)", fontFamily:"var(--font-mono)" }},
          React.createElement("i", { style:{ width:"7px", height:"7px", borderRadius:"999px", background:"var(--orange-500)", boxShadow:"0 0 0 3px var(--orange-100)", animation:"suPulse 1.4s infinite" }}),
          "closes in 04:12:36"
        )
      ),
      React.createElement("div", { "data-su-rfq-head":true, style:{ display:"grid", gridTemplateColumns:"36px 1.8fr 1fr .9fr 1fr", padding:"12px 4px", gap:"10px", color:"var(--ink-3)", fontSize:"10.5px", letterSpacing:".07em", textTransform:"uppercase", fontWeight:700, borderBottom:"1px solid var(--line-soft)" }},
        React.createElement("div", null, "#"),
        React.createElement("div", null, "Provider"),
        React.createElement("div", null, "Latest bid"),
        React.createElement("div", null, "Transit"),
        React.createElement("div", { style:{ textAlign:"right" }}, "Move")
      ),
      React.createElement("div", { "data-su-rfq-table":true, style:{ display:"flex", flexDirection:"column", gap:"9px", marginTop:"12px" }},
        [
          { r:1, name:"Blue Anchor Logistics", av:"BA", bid:"$1,412", transit:"17d", move:"▼ $28", moveColor:"var(--good-600)", lead:true },
          { r:2, name:"Meridian Forwarders", av:"MF", bid:"$1,425", transit:"18d", move:"▼ $15", moveColor:"var(--good-600)", lead:false },
          { r:3, name:"CargoStream Global", av:"CS", bid:"$1,438", transit:"18d", move:"hold", moveColor:"var(--ink-4)", lead:false },
          { r:4, name:"Ocean-Lane Freight", av:"OL", bid:"$1,455", transit:"19d", move:"▼ $10", moveColor:"var(--good-600)", lead:false },
          { r:5, name:"Trident Shipping", av:"TS", bid:"$1,470", transit:"20d", move:"hold", moveColor:"var(--ink-4)", lead:false }
        ].map((r) => React.createElement("div", { key:r.r, style:{ display:"grid", gridTemplateColumns:"36px 1.8fr 1fr .9fr 1fr", gap:"10px", alignItems:"center", padding:"10px 12px", border:`1px solid ${r.lead ? "#F6C9A6" : "var(--line)"}`, borderRadius:"12px", background: r.lead ? "linear-gradient(90deg,var(--orange-50),#fff)" : "#fff", boxShadow: r.lead ? "var(--shadow-sm)" : "none" }},
          React.createElement("span", { style:{ width:"26px", height:"26px", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-mono)", fontWeight:700, fontSize:"12px", background: r.lead ? "var(--orange-500)" : "var(--paper-3)", color: r.lead ? "#fff" : "var(--ink-3)" }}, r.r),
          React.createElement("div", { style:{ display:"flex", alignItems:"center", gap:"9px", fontWeight:600, color:"var(--ink)", fontSize:"12.5px" }},
            React.createElement("span", { style:{ width:"27px", height:"27px", borderRadius:"8px", border:"1px solid var(--line)", display:"inline-flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-mono)", fontSize:"10.5px", fontWeight:700, color:"var(--blue-700)", background:"var(--blue-50)", flex:"none" }}, r.av),
            r.name
          ),
          React.createElement("div", { style:{ fontFamily:"var(--font-mono)", fontWeight:700, fontSize:"13.5px", color:"var(--ink)" }}, r.bid),
          React.createElement("div", { style:{ fontFamily:"var(--font-mono)", fontSize:"12px", color:"var(--ink-2)" }}, r.transit),
          React.createElement("div", { style:{ fontFamily:"var(--font-mono)", fontSize:"11.5px", fontWeight:600, color:r.moveColor, textAlign:"right" }}, r.move)
        ))
      ),
      React.createElement("div", { style:{ marginTop:"14px", padding:"14px", border:"1px solid var(--amber-100)", borderRadius:"12px", background:"linear-gradient(180deg,var(--amber-50),#fff)", display:"flex", gap:"12px", alignItems:"flex-start" }},
        React.createElement("div", { style:{ width:"32px", height:"32px", borderRadius:"9px", background:"linear-gradient(135deg,var(--amber-500),var(--orange-500))", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", flex:"none", fontWeight:700 }}, "◆"),
        React.createElement("div", { style:{ fontSize:"13px", color:"var(--ink-2)", lineHeight:1.5 }},
          React.createElement("b", { style:{ color:"var(--orange-700)", fontWeight:600 }}, "Susea AI: "),
          "Blue Anchor is 1.9% below the market median. ",
          React.createElement("b", { style:{ color:"var(--ink)" }}, "Recommended award."),
          " Estimated annual savings vs. last year: $18,240."
        )
      )
    );
  }

function renderDashPanel() {
    return React.createElement("div", { key:"dash", style:{ position:"relative", border:"1px solid var(--line)", borderRadius:"18px", background:"#fff", padding:"20px", boxShadow:"var(--shadow-xl)", animation:"suFadeUp .35s ease" }},
      React.createElement("div", { style:{ position:"absolute", left:"18px", right:"18px", top:"-1px", height:"2px", borderRadius:"2px", background:"linear-gradient(90deg,transparent,var(--blue-500),var(--orange-500),var(--amber-500),transparent)" }}),
      React.createElement("div", { style:{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"12px", marginBottom:"16px" }, "data-su-cols":"4" },
        [
          { v:"$186K", l:"YTD freight savings", c:"var(--good-600)" },
          { v:"42h", l:"Team hours saved / mo", c:"var(--blue-600)" },
          { v:"128", l:"RFQs closed", c:"var(--orange-600)" },
          { v:"6.2%", l:"Avg cost reduction", c:"var(--amber-600)" }
        ].map((s, i) => React.createElement("div", { key:i, style:{ border:"1px solid var(--line)", borderRadius:"12px", padding:"16px", background:"var(--paper-2)" }},
          React.createElement("div", { style:{ fontSize:"11px", color:"var(--ink-3)", fontWeight:600, letterSpacing:".05em", textTransform:"uppercase" }}, s.l),
          React.createElement("div", { style:{ fontFamily:"var(--font-mono)", fontSize:"28px", fontWeight:700, color:s.c, marginTop:"8px", letterSpacing:"-.02em" }}, s.v)
        ))
      ),
      React.createElement("div", { style:{ padding:"18px", border:"1px solid var(--line)", borderRadius:"12px", background:"#fff" }},
        React.createElement("div", { style:{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px" }},
          React.createElement("div", { style:{ fontSize:"14px", fontWeight:600, color:"var(--ink)" }}, "Active shipments · this week"),
          React.createElement("span", { style:{ fontSize:"11px", color:"var(--ink-3)" }}, "18 in progress")
        ),
        React.createElement("div", { "data-su-dash-table":true, style:{ display:"flex", flexDirection:"column", gap:"8px" }},
          [
            { id:"SH-24-8801", lane:"INNSA → AEJEA", carrier:"Maersk", eta:"Nov 2", status:"On water", statusColor:"var(--good-500)" },
            { id:"SH-24-8802", lane:"INMAA → NLRTM", carrier:"MSC", eta:"Nov 8", status:"Loading", statusColor:"var(--amber-500)" },
            { id:"SH-24-8803", lane:"CNSHA → USLAX", carrier:"Hapag-Lloyd", eta:"Nov 14", status:"Booked", statusColor:"var(--blue-500)" },
            { id:"SH-24-8804", lane:"INMUN → SGSIN", carrier:"COSCO", eta:"Oct 30", status:"Delivered", statusColor:"var(--ink-3)" }
          ].map((s, i) => React.createElement("div", { key:i, style:{ display:"grid", gridTemplateColumns:"1fr 1.5fr 1.2fr .8fr .8fr", gap:"10px", padding:"10px 12px", border:"1px solid var(--line-soft)", borderRadius:"10px", background:"var(--paper-2)", alignItems:"center", fontSize:"12px" }},
            React.createElement("div", { style:{ fontFamily:"var(--font-mono)", fontSize:"11px", color:"var(--ink-3)", fontWeight:600 }}, s.id),
            React.createElement("div", { style:{ fontWeight:600, color:"var(--ink)", fontFamily:"var(--font-mono)", fontSize:"11.5px" }}, s.lane),
            React.createElement("div", { style:{ color:"var(--ink-2)" }}, s.carrier),
            React.createElement("div", { style:{ color:"var(--ink-2)", fontFamily:"var(--font-mono)", fontSize:"11px" }}, "ETA " + s.eta),
            React.createElement("div", { style:{ display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"11px", fontWeight:600, color:s.statusColor }},
              React.createElement("i", { style:{ width:"7px", height:"7px", borderRadius:"999px", background:s.statusColor }}),
              s.status
            )
          ))
        )
      )
    );
  }

// Isolated so a slider drag re-renders only the calculator, not the whole page
// (keeps the range sliders lag-free while dragging).
function RoiCalculator() {
  const [roi, setRoiState] = useState({ shipments: 60, team: 4, hours: 3, spend: 2200 });
  const setRoi = (k, v) => setRoiState((s) => ({ ...s, [k]: Number(v) }));
  const roiVals = computeRoi(roi);
  return (
          <div
            data-su-roi
            data-su-pair-tight
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.15fr",
              gap: "22px",
              border: "1px solid var(--line)",
              borderRadius: "20px",
              background: "#fff",
              boxShadow: "var(--shadow-lg)",
              overflow: "hidden",
            }}
          >
            <div
              data-su-mobile-pad
              style={{
                padding: "32px",
                background: "var(--paper-2)",
                borderRight: "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      color: "var(--ink-3)",
                    }}
                  >
                    Shipments per month
                  </label>
                  <span
                    data-su-roi-slider-val
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "var(--ink)",
                    }}
                  >
                    {roi.shipments}
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={roi.shipments}
                  onChange={(e) => setRoi("shipments", e.target.value)}
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    accentColor: "var(--blue-600)",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--ink-4)",
                    marginTop: "2px",
                  }}
                >
                  <span>5</span>
                  <span>500</span>
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      color: "var(--ink-3)",
                    }}
                  >
                    Procurement team size
                  </label>
                  <span
                    data-su-roi-slider-val
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "var(--ink)",
                    }}
                  >
                    {roi.team}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={roi.team}
                  onChange={(e) => setRoi("team", e.target.value)}
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    accentColor: "var(--blue-600)",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--ink-4)",
                    marginTop: "2px",
                  }}
                >
                  <span>1</span>
                  <span>30</span>
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      color: "var(--ink-3)",
                    }}
                  >
                    Hours to source freight per shipment
                  </label>
                  <span
                    data-su-roi-slider-val
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "var(--ink)",
                    }}
                  >
                    {roi.hours}
                    <span
                      style={{
                        fontSize: "13px",
                        color: "var(--ink-3)",
                        marginLeft: "2px",
                      }}
                    >
                      hrs
                    </span>
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="8"
                  step="0.5"
                  value={roi.hours}
                  onChange={(e) => setRoi("hours", e.target.value)}
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    accentColor: "var(--blue-600)",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--ink-4)",
                    marginTop: "2px",
                  }}
                >
                  <span>0.5</span>
                  <span>8</span>
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      color: "var(--ink-3)",
                    }}
                  >
                    Avg. freight spend / shipment (USD)
                  </label>
                  <span
                    data-su-roi-slider-val
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "var(--ink)",
                    }}
                  >
                    {"$" + roi.spend.toLocaleString("en-US")}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="8000"
                  step="100"
                  value={roi.spend}
                  onChange={(e) => setRoi("spend", e.target.value)}
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    accentColor: "var(--blue-600)",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--ink-4)",
                    marginTop: "2px",
                  }}
                >
                  <span>$500</span>
                  <span>$8,000</span>
                </div>
              </div>
              <div
                style={{
                  marginTop: "6px",
                  padding: "14px",
                  border: "1px solid var(--blue-100)",
                  background: "var(--blue-50)",
                  borderRadius: "12px",
                  fontSize: "12.5px",
                  color: "var(--blue-700)",
                  lineHeight: "1.5",
                  display: "flex",
                  gap: "9px",
                  alignItems: "flex-start",
                }}
              >
                <I
                  n="info"
                  style={{
                    width: "16px",
                    height: "16px",
                    flex: "none",
                    marginTop: "1px",
                  }}
                />
                <span>
                  Based on Susea customer averages: 90% quote turnaround
                  reduction, ~6% average freight cost reduction on RFQ'd lanes,
                  $35/hr fully-loaded procurement cost.
                </span>
              </div>
            </div>

            <div
              data-su-mobile-pad
              style={{
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "24px",
                  right: "24px",
                  top: "-1px",
                  height: "2px",
                  borderRadius: "2px",
                  background:
                    "linear-gradient(90deg,transparent,var(--blue-500),var(--orange-500),var(--amber-500),transparent)",
                }}
              ></div>
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: ".09em",
                    textTransform: "uppercase",
                    color: "var(--ink-3)",
                  }}
                >
                  Your Susea impact: annual
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "10px",
                  }}
                >
                  <div
                    data-su-roi-total
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "64px",
                      fontWeight: "700",
                      letterSpacing: "-.035em",
                      lineHeight: ".95",
                      color: "var(--blue-700)",
                    }}
                  >
                    {"$" + roiVals.totalSavings}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "var(--ink-3)",
                      fontWeight: "600",
                      paddingBottom: "8px",
                    }}
                  >
                    saved / year
                  </div>
                </div>
              </div>
              <div
                data-su-cols="2"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: "12px",
                    padding: "16px",
                    background: "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "var(--blue-600)",
                    }}
                  >
                    <I n="clock" style={{ width: "16px", height: "16px" }} />
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                        color: "var(--ink-3)",
                      }}
                    >
                      Hours saved / month
                    </span>
                  </div>
                  <div
                    data-su-roi-stat
                    style={{
                      marginTop: "8px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "26px",
                      fontWeight: "700",
                      letterSpacing: "-.02em",
                      color: "var(--ink)",
                    }}
                  >
                    {roiVals.hoursSaved}
                    <span
                      style={{
                        fontSize: "14px",
                        color: "var(--ink-3)",
                        marginLeft: "3px",
                      }}
                    >
                      hrs
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: "12px",
                    padding: "16px",
                    background: "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "var(--orange-600)",
                    }}
                  >
                    <I
                      n="dollar-sign"
                      style={{ width: "16px", height: "16px" }}
                    />
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                        color: "var(--ink-3)",
                      }}
                    >
                      Time savings / year
                    </span>
                  </div>
                  <div
                    data-su-roi-stat
                    style={{
                      marginTop: "8px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "26px",
                      fontWeight: "700",
                      letterSpacing: "-.02em",
                      color: "var(--ink)",
                    }}
                  >
                    {"$" + roiVals.timeSavings}
                  </div>
                </div>
                <div
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: "12px",
                    padding: "16px",
                    background: "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "var(--good-600)",
                    }}
                  >
                    <I
                      n="trending-down"
                      style={{ width: "16px", height: "16px" }}
                    />
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                        color: "var(--ink-3)",
                      }}
                    >
                      Freight cost savings / year
                    </span>
                  </div>
                  <div
                    data-su-roi-stat
                    style={{
                      marginTop: "8px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "26px",
                      fontWeight: "700",
                      letterSpacing: "-.02em",
                      color: "var(--ink)",
                    }}
                  >
                    {"$" + roiVals.freightSavings}
                  </div>
                </div>
                <div
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: "12px",
                    padding: "16px",
                    background: "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "var(--amber-600)",
                    }}
                  >
                    <I n="rocket" style={{ width: "16px", height: "16px" }} />
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                        color: "var(--ink-3)",
                      }}
                    >
                      Extra shipments handled
                    </span>
                  </div>
                  <div
                    data-su-roi-stat
                    style={{
                      marginTop: "8px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "26px",
                      fontWeight: "700",
                      letterSpacing: "-.02em",
                      color: "var(--ink)",
                    }}
                  >
                    {"+" + roiVals.extraShipments}
                    <span
                      style={{
                        fontSize: "14px",
                        color: "var(--ink-3)",
                        marginLeft: "3px",
                      }}
                    >
                      / mo
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <a
                  href="#demo"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    height: "52px",
                    padding: "0 22px",
                    borderRadius: "12px",
                    fontSize: "15px",
                    fontWeight: "600",
                    background: "var(--blue-600)",
                    color: "#fff",
                    boxShadow: "var(--shadow-blue)",
                  }}
                >
                  Get this ROI for my team
                  <I
                    n="arrow-right"
                    style={{ width: "16px", height: "16px" }}
                  />
                </a>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--ink-3)",
                    textAlign: "center",
                  }}
                >
                  Book a 20-min demo; your procurement lead will thank you.
                </div>
              </div>
            </div>
          </div>
  );
}

export default function SpotRatePage() {
  const [tab, setTab] = useState("rates");
  const [form, setFormState] = useState({
    name: "", email: "", company: "", role: "Procurement / Sourcing", volume: "10\u201350", lane: "",
  });
  const [formOpen, setFormOpen] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const setForm = (k, v) => setFormState((s) => ({ ...s, [k]: v }));
  const submitForm = (e) => {
    e.preventDefault();
    setFormOpen(false);
    setFormSubmitted(true);
    setTimeout(() => {
      const el = document.getElementById("demo");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  };
  const openCalendly = (e) => {
    e.preventDefault();
    window.open("https://calendly.com/darshit-alphabitssolutions/30min", "_blank", "noopener");
  };
  const toggleFaq = (i) => setOpenFaq((v) => (v === i ? -1 : i));


  const renderPreview = () =>
    tab === "rates" ? renderRatesPanel() : tab === "rfq" ? renderRfqPanel() : renderDashPanel();

  const renderFaq = () =>
    FAQ_ITEMS.map((it, i) => {
      const open = openFaq === i;
      return (
        <div key={i} style={{ border: "1px solid var(--line)", borderRadius: "12px", background: "#fff", boxShadow: open ? "var(--shadow-sm)" : "var(--shadow-xs)", overflow: "hidden", transition: "box-shadow .2s" }}>
          <button data-su-faq-q onClick={() => toggleFaq(i)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "14px", padding: "18px 20px", width: "100%", textAlign: "left", fontSize: "15px", fontWeight: 600, color: "var(--ink)", cursor: "pointer" }}>
            <span>{it.q}</span>
            <span style={{ width: "28px", height: "28px", borderRadius: "8px", background: open ? "var(--blue-600)" : "var(--paper-2)", color: open ? "#fff" : "var(--ink-2)", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none", transition: "all .2s", transform: open ? "rotate(45deg)" : "rotate(0)" }}>
              <I n="plus" style={{ width: "16px", height: "16px" }} />
            </span>
          </button>
          {open && (
            <div data-su-faq-a style={{ padding: "0 20px 20px", fontSize: "14px", color: "var(--ink-2)", lineHeight: 1.6, animation: "suFadeUp .25s ease" }}>
              {it.a}
            </div>
          )}
        </div>
      );
    });

  // Smooth-scroll every in-page hash link (nav, logo, CTAs) with a single
  // delegated handler, offsetting for the sticky nav and leaving the URL clean.
  const pageRef = useRef(null);
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || !root.contains(a)) return;
      const hash = a.getAttribute("href");
      e.preventDefault();
      if (hash === "#") return; // placeholder links: no-op, no jump, no dirty URL
      if (hash === "#top") smoothScrollToTop();
      else smoothScrollToId(hash.slice(1));
    };
    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, []);

  // Drag-to-scroll for the testimonials marquee (same interaction as the main site).
  const testiRef = useRef(null);
  useEffect(() => {
    const track = testiRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const DURATION = 90; // seconds, must match the suSlide animation-duration
    track.style.cursor = "grab";

    let dragging = false;
    let startX = 0;
    let startOffset = 0;
    const mod = (a, b) => ((a % b) + b) % b;
    const getTranslateX = () => new DOMMatrix(window.getComputedStyle(track).transform).m41;
    const clientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);
    const changedClientX = (e) => (e.changedTouches ? e.changedTouches[0].clientX : e.clientX);
    const pause = (x) => {
      track.style.animation = "none";
      track.style.transform = `translateX(${x}px)`;
    };
    const resume = (x) => {
      const loopPx = track.offsetWidth * 0.5; // half the doubled strip = one loop
      const pos = -mod(-x, loopPx);
      const delay = -((Math.abs(pos) / loopPx) * DURATION);
      track.style.transform = "";
      track.style.animation = `suSlide ${DURATION}s ${delay}s linear infinite`;
    };
    const onStart = (e) => {
      dragging = true;
      startX = clientX(e);
      startOffset = getTranslateX();
      pause(startOffset);
      track.style.cursor = "grabbing";
      track.style.userSelect = "none";
    };
    const onMove = (e) => {
      if (!dragging) return;
      track.style.transform = `translateX(${startOffset + clientX(e) - startX}px)`;
    };
    const onEnd = (e) => {
      if (!dragging) return;
      dragging = false;
      resume(startOffset + changedClientX(e) - startX);
      track.style.cursor = "grab";
      track.style.userSelect = "";
    };

    track.addEventListener("mousedown", onStart);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    track.addEventListener("touchstart", onStart, { passive: true });
    track.addEventListener("touchmove", onMove, { passive: true });
    track.addEventListener("touchend", onEnd);
    return () => {
      track.removeEventListener("mousedown", onStart);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      track.removeEventListener("touchstart", onStart);
      track.removeEventListener("touchmove", onMove);
      track.removeEventListener("touchend", onEnd);
    };
  }, []);

  const renderTestimonials = () => {
    const cards = TESTIMONIALS.concat(TESTIMONIALS); // duplicate for a seamless -50% loop
    return cards.map((t, i) => (
      <div key={i} aria-hidden={i >= TESTIMONIALS.length} style={{ flex: "0 0 328px", maxWidth: "328px", border: "1.5px solid " + t.border, borderRadius: "14px", padding: "18px", background: "#fff", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", gap: "11px", whiteSpace: "normal" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: t.iconBg, color: t.iconColor, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><I n={t.icon} style={{ width: "18px", height: "18px" }} /></div>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--ink)" }}>{t.company}</div>
        </div>
        <p style={{ margin: "0", fontSize: "13px", lineHeight: "1.5", color: "var(--ink-2)" }}>{t.quote}</p>
        <div style={{ marginTop: "auto", paddingTop: "10px", borderTop: "1px solid var(--line-soft)", fontSize: "12.5px" }}>
          <b style={{ color: "var(--ink)", fontWeight: "600" }}>{t.name}</b> <span style={{ color: "var(--ink-3)" }}>· {t.title}</span>
        </div>
      </div>
    ));
  };

  return (
    <div
      ref={pageRef}
      className="spot-rate-page"
      style={{ position: "relative", isolation: "isolate" }}
    >
      <nav
        data-su-nav
        style={{
          position: "sticky",
          top: "0",
          zIndex: "60",
          backdropFilter: "saturate(140%) blur(14px)",
          WebkitBackdropFilter: "saturate(140%) blur(14px)",
          background: "rgba(255,255,255,.50)",
          borderBottom: "1px solid var(--line-soft)",
        }}
      >
        <div
          data-su-container
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "66px",
          }}
        >
          <a
            href="#top"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              fontWeight: "700",
              letterSpacing: "-.02em",
              fontSize: "18px",
              color: "var(--ink)",
            }}
          >
            <img
              src="/assets/susea-mark-black.png"
              alt="Susea"
              style={{ height: "26px", width: "auto" }}
            />
            <span>Susea</span>
          </a>
          <div data-su-nav-links style={{ display: "flex", gap: "26px" }}>
            <a
              href="#how"
              style={{
                color: "var(--ink-2)",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              How it works
            </a>
            <a
              href="#features"
              style={{
                color: "var(--ink-2)",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Features
            </a>
            <a
              href="#roi"
              style={{
                color: "var(--ink-2)",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              ROI
            </a>
            <a
              href="#faq"
              style={{
                color: "var(--ink-2)",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              FAQ
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a
              href="#demo"
              data-su-hide-sm
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "38px",
                padding: "0 15px",
                borderRadius: "10px",
                fontSize: "13.5px",
                fontWeight: "600",
                color: "var(--ink)",
                border: "1px solid var(--line)",
                background: "#fff",
              }}
            >
              Book demo
            </a>
            <a
              href="#demo"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                justifyContent: "center",
                height: "38px",
                padding: "0 15px",
                borderRadius: "10px",
                fontSize: "13.5px",
                fontWeight: "600",
                color: "#fff",
                background: "var(--blue-600)",
                boxShadow: "var(--shadow-blue)",
              }}
            >
              <span>Get instant rates</span>
              <I n="arrow-right" style={{ width: "15px", height: "15px" }} />
            </a>
            <button
              type="button"
              data-su-hamburger
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                border: "1px solid var(--line)",
                background: "#fff",
                color: "var(--ink)",
                flex: "0 0 auto",
              }}
            >
              <I
                n={menuOpen ? "x" : "menu"}
                style={{ width: "20px", height: "20px" }}
              />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            data-su-mobile-menu
            style={{
              borderTop: "1px solid var(--line-soft)",
              background: "rgba(255,255,255,.98)",
              backdropFilter: "saturate(140%) blur(14px)",
              WebkitBackdropFilter: "saturate(140%) blur(14px)",
              padding: "10px 20px 18px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              animation: "suFadeUp .18s ease-out",
            }}
          >
            {[
              ["#how", "How it works"],
              ["#features", "Features"],
              ["#roi", "ROI"],
              ["#faq", "FAQ"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: "13px 4px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--ink)",
                  borderBottom: "1px solid var(--line-soft)",
                }}
              >
                {label}
              </a>
            ))}
            <a
              href="#demo"
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: "12px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "46px",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: "600",
                color: "var(--ink)",
                border: "1px solid var(--line)",
                background: "#fff",
              }}
            >
              Book demo
            </a>
            <a
              href="#demo"
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: "8px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                justifyContent: "center",
                height: "46px",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: "600",
                color: "#fff",
                background: "var(--blue-600)",
                boxShadow: "var(--shadow-blue)",
              }}
            >
              <span>Get instant rates</span>
              <I n="arrow-right" style={{ width: "16px", height: "16px" }} />
            </a>
          </div>
        )}
      </nav>

      <section
        id="top"
        style={{
          position: "relative",
          padding: "56px 0 72px",
          overflow: "hidden",
          background:
            "radial-gradient(900px 480px at 18% -6%, var(--blue-50), transparent 62%),radial-gradient(720px 420px at 92% 4%, var(--orange-50), transparent 60%),linear-gradient(180deg,var(--tint-blue),#fff 70%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0",
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(1100px 640px at 50% 0%,#000 30%,transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(1100px 640px at 50% 0%,#000 30%,transparent 72%)",
            pointerEvents: "none",
          }}
        ></div>

        <div
          data-su-container
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 32px",
            position: "relative",
          }}
        >
          <div
            data-su-hero-grid
            style={{
              display: "grid",
              gridTemplateColumns: "1.05fr 1fr",
              gap: "56px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "22px",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "9px",
                  padding: "6px 14px",
                  border: "1px solid var(--line)",
                  borderRadius: "999px",
                  background: "#fff",
                  color: "var(--ink-3)",
                  fontSize: "12px",
                  fontWeight: "600",
                  boxShadow: "var(--shadow-xs)",
                }}
              >
                <i
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "999px",
                    background: "var(--orange-500)",
                    boxShadow: "0 0 0 3px var(--orange-100)",
                  }}
                />
                For importers, exporters &amp; global buyers
              </span>
              <h1
                data-su-h1
                style={{
                  margin: "0",
                  fontSize: "clamp(38px,5.2vw,64px)",
                  lineHeight: "1.02",
                  letterSpacing: "-.035em",
                  fontWeight: "600",
                  color: "var(--ink)",
                  textWrap: "balance",
                  maxWidth: "640px",
                }}
              >
                Instant freight rates.
                <br />
                <em style={{ fontStyle: "normal", color: "var(--blue-600)" }}>
                  One RFQ.
                </em>{" "}
                Every carrier.
              </h1>
              <p
                style={{
                  margin: "0",
                  color: "var(--ink-2)",
                  fontSize: "18px",
                  lineHeight: "1.55",
                  maxWidth: "560px",
                  textWrap: "pretty",
                }}
              >
                Stop chasing forwarders over email and WhatsApp. Compare live
                ocean freight prices from{" "}
                <b style={{ color: "var(--ink)" }}>40+ carriers</b> and run one
                RFQ to multiple providers in{" "}
                <b style={{ color: "var(--ink)" }}>under 5 minutes</b>.
              </p>
              <div
                data-su-hero-ctas
                data-su-flex-col-sm
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginTop: "4px",
                }}
              >
                <a
                  href="#demo"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    height: "52px",
                    padding: "0 24px",
                    borderRadius: "12px",
                    fontSize: "15px",
                    fontWeight: "600",
                    background: "var(--blue-600)",
                    color: "#fff",
                    boxShadow: "var(--shadow-blue)",
                  }}
                >
                  <span>Book your 20-min demo</span>
                  <I
                    n="arrow-right"
                    style={{ width: "16px", height: "16px" }}
                  />
                </a>
                <a
                  href="#preview"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    height: "52px",
                    padding: "0 22px",
                    borderRadius: "12px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "var(--ink)",
                    border: "1px solid var(--line)",
                    background: "#fff",
                  }}
                >
                  <I
                    n="play"
                    style={{
                      width: "15px",
                      height: "15px",
                      color: "var(--blue-600)",
                    }}
                  />
                  <span>Watch 90s product tour</span>
                </a>
              </div>
              <div
                data-su-hero-trust
                style={{
                  display: "flex",
                  gap: "18px",
                  alignItems: "center",
                  color: "var(--ink-3)",
                  fontSize: "13px",
                  flexWrap: "wrap",
                  marginTop: "2px",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <I
                    n="check-circle-2"
                    style={{
                      width: "14px",
                      height: "14px",
                      color: "var(--good-500)",
                    }}
                  />
                  No credit card
                </span>
                <i
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "999px",
                    background: "var(--line-strong)",
                  }}
                />
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <I
                    n="clock"
                    style={{
                      width: "14px",
                      height: "14px",
                      color: "var(--good-500)",
                    }}
                  />
                  Setup in 24h
                </span>
                <i
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "999px",
                    background: "var(--line-strong)",
                  }}
                />
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <I
                    n="shield-check"
                    style={{
                      width: "14px",
                      height: "14px",
                      color: "var(--good-500)",
                    }}
                  />
                  SOC 2 in progress
                </span>
              </div>

              <div
                style={{
                  marginTop: "22px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "14px 18px",
                  border: "1px solid var(--line)",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,.7)",
                  backdropFilter: "blur(6px)",
                  boxShadow: "var(--shadow-xs)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "999px",
                      background: "var(--blue-100)",
                      border: "2px solid #fff",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "var(--blue-700)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    AJ
                  </span>
                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "999px",
                      background: "var(--orange-100)",
                      border: "2px solid #fff",
                      marginLeft: "-8px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "var(--orange-700)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    RM
                  </span>
                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "999px",
                      background: "var(--amber-100)",
                      border: "2px solid #fff",
                      marginLeft: "-8px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "var(--amber-600)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    SP
                  </span>
                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "999px",
                      background: "var(--good-50)",
                      border: "2px solid #fff",
                      marginLeft: "-8px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "var(--good-600)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    +
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      color: "var(--amber-600)",
                    }}
                  >
                    <I
                      n="star"
                      style={{
                        width: "13px",
                        height: "13px",
                        fill: "currentColor",
                      }}
                    />
                    <I
                      n="star"
                      style={{
                        width: "13px",
                        height: "13px",
                        fill: "currentColor",
                      }}
                    />
                    <I
                      n="star"
                      style={{
                        width: "13px",
                        height: "13px",
                        fill: "currentColor",
                      }}
                    />
                    <I
                      n="star"
                      style={{
                        width: "13px",
                        height: "13px",
                        fill: "currentColor",
                      }}
                    />
                    <I
                      n="star"
                      style={{
                        width: "13px",
                        height: "13px",
                        fill: "currentColor",
                      }}
                    />
                    <span
                      style={{
                        color: "var(--ink)",
                        fontSize: "13px",
                        fontWeight: "700",
                        marginLeft: "4px",
                      }}
                    >
                      4.9/5
                    </span>
                  </div>
                  <span style={{ fontSize: "12px", color: "var(--ink-3)" }}>
                    from 240+ procurement &amp; sourcing teams
                  </span>
                </div>
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "18px",
                  border: "1px solid var(--line)",
                  background: "#fff",
                  padding: "14px",
                  boxShadow: "var(--shadow-xl)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "18px",
                    right: "18px",
                    top: "-1px",
                    height: "2px",
                    borderRadius: "2px",
                    background:
                      "linear-gradient(90deg,transparent,var(--blue-500),var(--orange-500),var(--amber-500),transparent)",
                  }}
                ></div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "6px 8px 12px",
                  }}
                >
                  <div
                    style={{
                      flex: "1",
                      height: "28px",
                      borderRadius: "8px",
                      background: "var(--paper-2)",
                      border: "1px solid var(--line-soft)",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 10px",
                      color: "var(--ink-3)",
                      fontSize: "12px",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    app.susea.ai/instant-rates
                  </div>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 10px",
                      borderRadius: "999px",
                      fontSize: "11px",
                      fontWeight: "600",
                      color: "var(--good-600)",
                      background: "var(--good-50)",
                      border: "1px solid #C2E7D6",
                    }}
                  >
                    <i
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "999px",
                        background: "var(--good-500)",
                        boxShadow: "0 0 0 3px rgba(31,157,107,.18)",
                        animation: "suPulse 1.8s infinite",
                      }}
                    />
                    LIVE
                  </span>
                </div>

                <div
                  data-su-hero-search
                  style={{
                    display: "flex",
                    gap: "8px",
                    padding: "4px 4px 12px",
                  }}
                >
                  <div
                    style={{
                      flex: "1",
                      background: "var(--paper-2)",
                      border: "1px solid var(--line)",
                      borderRadius: "9px",
                      padding: "8px 9px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
                        color: "var(--ink-4)",
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                        fontWeight: "700",
                      }}
                    >
                      Origin
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "var(--ink)",
                        marginTop: "2px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Nhava Sheva{" "}
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--ink-3)",
                          fontWeight: "500",
                        }}
                      >
                        · INNSA
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      alignSelf: "center",
                      width: "26px",
                      height: "26px",
                      borderRadius: "999px",
                      border: "1px solid var(--line)",
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--blue-600)",
                      boxShadow: "var(--shadow-xs)",
                    }}
                  >
                    <I
                      n="arrow-right"
                      style={{ width: "14px", height: "14px" }}
                    />
                  </div>
                  <div
                    style={{
                      flex: "1",
                      background: "var(--paper-2)",
                      border: "1px solid var(--line)",
                      borderRadius: "9px",
                      padding: "8px 9px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
                        color: "var(--ink-4)",
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                        fontWeight: "700",
                      }}
                    >
                      Destination
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "var(--ink)",
                        marginTop: "2px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Jebel Ali{" "}
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--ink-3)",
                          fontWeight: "500",
                        }}
                      >
                        · AEJEA
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: ".6",
                      background: "var(--paper-2)",
                      border: "1px solid var(--line)",
                      borderRadius: "9px",
                      padding: "8px 9px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
                        color: "var(--ink-4)",
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                        fontWeight: "700",
                      }}
                    >
                      Cargo
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "var(--ink)",
                        marginTop: "2px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      1× 40′HC
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: "1px solid var(--line)",
                    background: "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.4fr .95fr .55fr .7fr .55fr",
                      padding: "9px 12px",
                      gap: "8px",
                      background: "var(--paper-3)",
                      color: "var(--ink-3)",
                      fontSize: "10px",
                      letterSpacing: ".07em",
                      textTransform: "uppercase",
                      fontWeight: "700",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    <div>Carrier</div>
                    <div>All-in</div>
                    <div>Transit</div>
                    <div>Free time</div>
                    <div></div>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.4fr .95fr .55fr .7fr .55fr",
                      padding: "11px 12px",
                      gap: "8px",
                      alignItems: "center",
                      background: "var(--blue-50)",
                      borderBottom: "1px solid var(--line-soft)",
                      fontSize: "12.5px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: "600",
                        color: "var(--ink)",
                      }}
                    >
                      <span
                        style={{
                          width: "22px",
                          height: "22px",
                          border: "1px solid var(--line)",
                          borderRadius: "5px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          color: "var(--blue-700)",
                          background: "#fff",
                          fontWeight: "700",
                        }}
                      >
                        MA
                      </span>
                      Maersk
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: "600",
                        color: "var(--ink)",
                      }}
                    >
                      $1,420
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--ink-2)",
                      }}
                    >
                      18d
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--ink-2)",
                      }}
                    >
                      14 days
                    </div>
                    <div>
                      <span
                        style={{
                          display: "inline-flex",
                          padding: "3px 8px",
                          borderRadius: "999px",
                          background: "var(--blue-600)",
                          color: "#fff",
                          fontSize: "10px",
                          fontWeight: "700",
                          letterSpacing: ".05em",
                        }}
                      >
                        BEST
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.4fr .95fr .55fr .7fr .55fr",
                      padding: "11px 12px",
                      gap: "8px",
                      alignItems: "center",
                      borderBottom: "1px solid var(--line-soft)",
                      fontSize: "12.5px",
                      color: "var(--ink-2)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: "600",
                        color: "var(--ink)",
                      }}
                    >
                      <span
                        style={{
                          width: "22px",
                          height: "22px",
                          border: "1px solid var(--line)",
                          borderRadius: "5px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          color: "var(--blue-700)",
                          background: "var(--blue-50)",
                          fontWeight: "700",
                        }}
                      >
                        MK
                      </span>
                      MSC
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: "600",
                        color: "var(--ink)",
                      }}
                    >
                      $1,485
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)" }}>17d</div>
                    <div style={{ fontFamily: "var(--font-mono)" }}>
                      10 days
                    </div>
                    <div>
                      <span
                        style={{
                          display: "inline-flex",
                          padding: "3px 8px",
                          borderRadius: "999px",
                          background: "var(--amber-50)",
                          color: "var(--amber-600)",
                          border: "1px solid var(--amber-100)",
                          fontSize: "10px",
                          fontWeight: "700",
                          letterSpacing: ".05em",
                        }}
                      >
                        FAST
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.4fr .95fr .55fr .7fr .55fr",
                      padding: "11px 12px",
                      gap: "8px",
                      alignItems: "center",
                      borderBottom: "1px solid var(--line-soft)",
                      fontSize: "12.5px",
                      color: "var(--ink-2)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: "600",
                        color: "var(--ink)",
                      }}
                    >
                      <span
                        style={{
                          width: "22px",
                          height: "22px",
                          border: "1px solid var(--line)",
                          borderRadius: "5px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          color: "var(--blue-700)",
                          background: "var(--blue-50)",
                          fontWeight: "700",
                        }}
                      >
                        CG
                      </span>
                      CMA CGM
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: "600",
                        color: "var(--ink)",
                      }}
                    >
                      $1,510
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)" }}>19d</div>
                    <div style={{ fontFamily: "var(--font-mono)" }}>
                      14 days
                    </div>
                    <div></div>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.4fr .95fr .55fr .7fr .55fr",
                      padding: "11px 12px",
                      gap: "8px",
                      alignItems: "center",
                      fontSize: "12.5px",
                      color: "var(--ink-2)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: "600",
                        color: "var(--ink)",
                      }}
                    >
                      <span
                        style={{
                          width: "22px",
                          height: "22px",
                          border: "1px solid var(--line)",
                          borderRadius: "5px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          color: "var(--blue-700)",
                          background: "var(--blue-50)",
                          fontWeight: "700",
                        }}
                      >
                        HL
                      </span>
                      Hapag-Lloyd
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: "600",
                        color: "var(--ink)",
                      }}
                    >
                      $1,565
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)" }}>20d</div>
                    <div style={{ fontFamily: "var(--font-mono)" }}>7 days</div>
                    <div></div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "12px",
                    border: "1px solid var(--amber-100)",
                    borderRadius: "10px",
                    padding: "10px 12px",
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                    background: "linear-gradient(180deg,var(--amber-50),#fff)",
                  }}
                >
                  <div
                    style={{
                      flex: "none",
                      width: "24px",
                      height: "24px",
                      borderRadius: "7px",
                      background:
                        "linear-gradient(135deg,var(--amber-500),var(--orange-500))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: "700",
                      fontSize: "11px",
                    }}
                  >
                    ◆
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--ink-2)",
                      lineHeight: "1.45",
                    }}
                  >
                    <b
                      style={{ color: "var(--orange-700)", fontWeight: "600" }}
                    >
                      Susea AI:
                    </b>{" "}
                    Maersk saves you <b style={{ color: "var(--ink)" }}>$145</b>{" "}
                    vs. your last booked rate on this lane and offers 4 more
                    free-time days than the average.
                  </div>
                </div>
              </div>

              <div
                data-su-hide-md
                style={{
                  position: "absolute",
                  inset: "0",
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-22px",
                    left: "-32px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    borderRadius: "13px",
                    background: "rgba(255,255,255,.94)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid var(--line)",
                    boxShadow: "var(--shadow-lg)",
                    animation: "suBob 6s ease-in-out infinite",
                    animationDelay: "-2s",
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "9px",
                      background: "var(--blue-50)",
                      color: "var(--blue-600)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <I n="zap" style={{ width: "16px", height: "16px" }} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: "700",
                        color: "var(--ink)",
                      }}
                    >
                      Quote ready · 47s
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--ink-3)",
                        marginTop: "1px",
                      }}
                    >
                      was 3–4 hours
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "-22px",
                    right: "-24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    borderRadius: "13px",
                    background: "rgba(255,255,255,.94)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid var(--line)",
                    boxShadow: "var(--shadow-lg)",
                    animation: "suBob 6s ease-in-out infinite",
                    animationDelay: "-1s",
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "9px",
                      background: "var(--good-50)",
                      color: "var(--good-600)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <I
                      n="trending-down"
                      style={{ width: "16px", height: "16px" }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: "700",
                        color: "var(--ink)",
                      }}
                    >
                      Saved $145 / TEU
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--ink-3)",
                        marginTop: "1px",
                      }}
                    >
                      vs. your last booking
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "56px 0",
          background: "var(--paper-2)",
          borderTop: "1px solid var(--line-soft)",
          borderBottom: "1px solid var(--line-soft)",
        }}
      >
        <div
          data-su-container
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}
        >
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <p
              style={{
                margin: "0",
                fontSize: "13px",
                color: "var(--ink-3)",
                fontWeight: "600",
                letterSpacing: ".04em",
                textTransform: "uppercase",
              }}
            >
              Trusted by 400+ importers, exporters &amp; sourcing teams · Live
              rates from 40+ carriers
            </p>
          </div>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              maskImage:
                "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
                width: "max-content",
                animation: "suSlide 60s linear infinite",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  height: "56px",
                  padding: "0 20px",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  background: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src="/assets/carriers/maersk.webp"
                  alt="Maersk"
                  style={{
                    width: "26px",
                    height: "26px",
                    objectFit: "contain",
                  }}
                />
                Maersk
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  height: "56px",
                  padding: "0 20px",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  background: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src="/assets/carriers/msc.webp"
                  alt="MSC"
                  style={{
                    width: "26px",
                    height: "26px",
                    objectFit: "contain",
                  }}
                />
                MSC
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  height: "56px",
                  padding: "0 20px",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  background: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src="/assets/carriers/cma-cgm.webp"
                  alt="CMA CGM"
                  style={{
                    width: "26px",
                    height: "26px",
                    objectFit: "contain",
                  }}
                />
                CMA CGM
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  height: "56px",
                  padding: "0 20px",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  background: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src="/assets/carriers/hapag-lloyd.jpg"
                  alt="Hapag-Lloyd"
                  style={{
                    width: "26px",
                    height: "26px",
                    objectFit: "contain",
                  }}
                />
                Hapag-Lloyd
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  height: "56px",
                  padding: "0 20px",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  background: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src="/assets/carriers/cosco.webp"
                  alt="COSCO"
                  style={{
                    width: "26px",
                    height: "26px",
                    objectFit: "contain",
                  }}
                />
                COSCO
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  height: "56px",
                  padding: "0 20px",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  background: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src="/assets/carriers/evergreen.webp"
                  alt="Evergreen"
                  style={{
                    width: "26px",
                    height: "26px",
                    objectFit: "contain",
                  }}
                />
                Evergreen
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  height: "56px",
                  padding: "0 20px",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  background: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src="/assets/carriers/hmm.webp"
                  alt="HMM"
                  style={{
                    width: "26px",
                    height: "26px",
                    objectFit: "contain",
                  }}
                />
                HMM
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  height: "56px",
                  padding: "0 20px",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  background: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src="/assets/carriers/zim.webp"
                  alt="ZIM"
                  style={{
                    width: "26px",
                    height: "26px",
                    objectFit: "contain",
                  }}
                />
                ZIM
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  height: "56px",
                  padding: "0 20px",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  background: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src="/assets/carriers/yangming.webp"
                  alt="Yang Ming"
                  style={{
                    width: "26px",
                    height: "26px",
                    objectFit: "contain",
                  }}
                />
                Yang Ming
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  height: "56px",
                  padding: "0 20px",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  background: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src="/assets/carriers/pil.webp"
                  alt="PIL"
                  style={{
                    width: "26px",
                    height: "26px",
                    objectFit: "contain",
                  }}
                />
                PIL
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  height: "56px",
                  padding: "0 20px",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  background: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src="/assets/carriers/wan-hai.webp"
                  alt="Wan Hai"
                  style={{
                    width: "26px",
                    height: "26px",
                    objectFit: "contain",
                  }}
                />
                Wan Hai
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  height: "56px",
                  padding: "0 20px",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  background: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src="/assets/carriers/maersk.webp"
                  alt="Maersk"
                  style={{
                    width: "26px",
                    height: "26px",
                    objectFit: "contain",
                  }}
                />
                Maersk
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  height: "56px",
                  padding: "0 20px",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  background: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src="/assets/carriers/msc.webp"
                  alt="MSC"
                  style={{
                    width: "26px",
                    height: "26px",
                    objectFit: "contain",
                  }}
                />
                MSC
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  height: "56px",
                  padding: "0 20px",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  background: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src="/assets/carriers/cma-cgm.webp"
                  alt="CMA CGM"
                  style={{
                    width: "26px",
                    height: "26px",
                    objectFit: "contain",
                  }}
                />
                CMA CGM
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  height: "56px",
                  padding: "0 20px",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  background: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src="/assets/carriers/hapag-lloyd.jpg"
                  alt="Hapag-Lloyd"
                  style={{
                    width: "26px",
                    height: "26px",
                    objectFit: "contain",
                  }}
                />
                Hapag-Lloyd
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  height: "56px",
                  padding: "0 20px",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  background: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src="/assets/carriers/cosco.webp"
                  alt="COSCO"
                  style={{
                    width: "26px",
                    height: "26px",
                    objectFit: "contain",
                  }}
                />
                COSCO
              </div>
            </div>
          </div>

          <div
            data-su-hero-stats
            data-su-cols="4"
            style={{
              marginTop: "40px",
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "14px",
            }}
          >
            <div
              style={{
                border: "1px solid var(--line)",
                borderRadius: "14px",
                padding: "22px",
                background: "#fff",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "38px",
                  fontWeight: "700",
                  letterSpacing: "-.03em",
                  lineHeight: "1",
                  color: "var(--ink)",
                }}
              >
                400
                <span
                  style={{
                    fontSize: "22px",
                    color: "var(--blue-600)",
                    marginLeft: "2px",
                  }}
                >
                  +
                </span>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "13px",
                  color: "var(--ink-2)",
                  lineHeight: "1.4",
                }}
              >
                Global shippers &amp; sourcing teams active on Susea
              </div>
            </div>
            <div
              style={{
                border: "1px solid var(--line)",
                borderRadius: "14px",
                padding: "22px",
                background: "#fff",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "38px",
                  fontWeight: "700",
                  letterSpacing: "-.03em",
                  lineHeight: "1",
                  color: "var(--ink)",
                }}
              >
                2.4M
                <span
                  style={{
                    fontSize: "22px",
                    color: "var(--blue-600)",
                    marginLeft: "2px",
                  }}
                >
                  +
                </span>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "13px",
                  color: "var(--ink-2)",
                  lineHeight: "1.4",
                }}
              >
                Freight quotations generated across ocean lanes
              </div>
            </div>
            <div
              style={{
                border: "1px solid var(--line)",
                borderRadius: "14px",
                padding: "22px",
                background: "#fff",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "38px",
                  fontWeight: "700",
                  letterSpacing: "-.03em",
                  lineHeight: "1",
                  color: "var(--ink)",
                }}
              >
                38K
                <span
                  style={{
                    fontSize: "22px",
                    color: "var(--blue-600)",
                    marginLeft: "2px",
                  }}
                >
                  +
                </span>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "13px",
                  color: "var(--ink-2)",
                  lineHeight: "1.4",
                }}
              >
                RFQs processed &amp; awarded through the platform
              </div>
            </div>
            <div
              style={{
                border: "1px solid var(--line)",
                borderRadius: "14px",
                padding: "22px",
                background: "#fff",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "38px",
                  fontWeight: "700",
                  letterSpacing: "-.03em",
                  lineHeight: "1",
                  color: "var(--ink)",
                }}
              >
                62
                <span
                  style={{
                    fontSize: "22px",
                    color: "var(--blue-600)",
                    marginLeft: "2px",
                  }}
                >
                  countries
                </span>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "13px",
                  color: "var(--ink-2)",
                  lineHeight: "1.4",
                }}
              >
                served across origin &amp; destination ports
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-su-section style={{ padding: "56px 0" }}>
        <div
          data-su-container
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}
        >
          <div
            style={{
              maxWidth: "820px",
              margin: "0 auto",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                padding: "6px 14px",
                border: "1px solid var(--line)",
                borderRadius: "999px",
                background: "#fff",
                color: "var(--bad-500)",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: ".04em",
                textTransform: "uppercase",
              }}
            >
              <i
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "999px",
                  background: "var(--bad-500)",
                  boxShadow: "0 0 0 3px var(--bad-50)",
                }}
              />
              The freight procurement problem
            </span>
            <h2
              data-su-h2
              style={{
                margin: "0",
                fontSize: "clamp(30px,4vw,50px)",
                lineHeight: "1.06",
                letterSpacing: "-.028em",
                fontWeight: "600",
                textWrap: "balance",
              }}
            >
              Sound familiar?{" "}
              <em style={{ fontStyle: "normal", color: "var(--blue-600)" }}>
                Every shipment feels like a scavenger hunt.
              </em>
            </h2>
            <p
              style={{
                margin: "0",
                color: "var(--ink-2)",
                fontSize: "18px",
                lineHeight: "1.55",
                maxWidth: "660px",
              }}
            >
              Between emailing forwarders, chasing rates on WhatsApp, and
              re-typing numbers into Excel, your team loses days on every single
              container.
            </p>
          </div>

          <div
            data-su-cols="3"
            data-su-pcards
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "14px",
            }}
          >
            <div
              style={{
                border: "1px solid var(--line)",
                background: "#fff",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "11px",
                  background: "var(--bad-50)",
                  color: "var(--bad-500)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <I n="mail" style={{ width: "20px", height: "20px" }} />
              </div>
              <h4
                style={{
                  margin: "0 0 6px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                Days waiting on freight quotes
              </h4>
              <p
                style={{
                  margin: "0",
                  fontSize: "13.5px",
                  color: "var(--ink-2)",
                  lineHeight: "1.5",
                }}
              >
                You email 6 forwarders, chase them by phone, and still don't
                have a comparable set of rates 48 hours later.
              </p>
            </div>
            <div
              style={{
                border: "1px solid var(--line)",
                background: "#fff",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "11px",
                  background: "var(--bad-50)",
                  color: "var(--bad-500)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <I n="file-x" style={{ width: "20px", height: "20px" }} />
              </div>
              <h4
                style={{
                  margin: "0 0 6px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                No price transparency
              </h4>
              <p
                style={{
                  margin: "0",
                  fontSize: "13.5px",
                  color: "var(--ink-2)",
                  lineHeight: "1.5",
                }}
              >
                Every quote is structured differently. Surcharges hidden in
                footnotes. Impossible to compare apples-to-apples.
              </p>
            </div>
            <div
              style={{
                border: "1px solid var(--line)",
                background: "#fff",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "11px",
                  background: "var(--bad-50)",
                  color: "var(--bad-500)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <I
                  n="message-circle-x"
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <h4
                style={{
                  margin: "0 0 6px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                WhatsApp &amp; Excel chaos
              </h4>
              <p
                style={{
                  margin: "0",
                  fontSize: "13.5px",
                  color: "var(--ink-2)",
                  lineHeight: "1.5",
                }}
              >
                Screenshots on WhatsApp. Rates copy-pasted into spreadsheets.
                Nobody knows which version is current.
              </p>
            </div>
            <div
              style={{
                border: "1px solid var(--line)",
                background: "#fff",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "11px",
                  background: "var(--bad-50)",
                  color: "var(--bad-500)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <I n="calendar-x" style={{ width: "20px", height: "20px" }} />
              </div>
              <h4
                style={{
                  margin: "0 0 6px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                Procurement delays
              </h4>
              <p
                style={{
                  margin: "0",
                  fontSize: "13.5px",
                  color: "var(--ink-2)",
                  lineHeight: "1.5",
                }}
              >
                Shipment plans slip. Buyer commits missed. Every delay in
                pricing pushes back production and delivery.
              </p>
            </div>
            <div
              style={{
                border: "1px solid var(--line)",
                background: "#fff",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "11px",
                  background: "var(--bad-50)",
                  color: "var(--bad-500)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <I n="eye-off" style={{ width: "20px", height: "20px" }} />
              </div>
              <h4
                style={{
                  margin: "0 0 6px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                Hidden logistics costs
              </h4>
              <p
                style={{
                  margin: "0",
                  fontSize: "13.5px",
                  color: "var(--ink-2)",
                  lineHeight: "1.5",
                }}
              >
                BAF, THC, ISPS, detention. Surprise line items eat into the
                margin you thought you'd locked in.
              </p>
            </div>
            <div
              style={{
                border: "1px solid var(--line)",
                background: "#fff",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "11px",
                  background: "var(--bad-50)",
                  color: "var(--bad-500)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <I n="repeat" style={{ width: "20px", height: "20px" }} />
              </div>
              <h4
                style={{
                  margin: "0 0 6px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                Manual RFQ on every lane
              </h4>
              <p
                style={{
                  margin: "0",
                  fontSize: "13.5px",
                  color: "var(--ink-2)",
                  lineHeight: "1.5",
                }}
              >
                Same shipment, same email template, same follow-ups; every
                single week. No structure, no history, no leverage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        data-su-section
        id="compare"
        style={{
          padding: "56px 0",
          background: "var(--paper-2)",
          borderTop: "1px solid var(--line-soft)",
          borderBottom: "1px solid var(--line-soft)",
        }}
      >
        <div
          data-su-container
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}
        >
          <div
            style={{
              maxWidth: "820px",
              margin: "0 auto",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                padding: "6px 14px",
                border: "1px solid var(--line)",
                borderRadius: "999px",
                background: "#fff",
                color: "var(--ink-3)",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: ".04em",
                textTransform: "uppercase",
              }}
            >
              <i
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "999px",
                  background: "var(--blue-500)",
                  boxShadow: "0 0 0 3px var(--blue-100)",
                }}
              />
              Your workflow, upgraded
            </span>
            <h2
              data-su-h2
              style={{
                margin: "0",
                fontSize: "clamp(30px,4vw,50px)",
                lineHeight: "1.06",
                letterSpacing: "-.028em",
                fontWeight: "600",
                textWrap: "balance",
              }}
            >
              The old way vs.{" "}
              <em style={{ fontStyle: "normal", color: "var(--blue-600)" }}>
                the Susea way
              </em>
            </h2>
            <p
              style={{
                margin: "0",
                color: "var(--ink-2)",
                fontSize: "18px",
                lineHeight: "1.55",
                maxWidth: "600px",
              }}
            >
              Same shipment. Same lane. Very different day.
            </p>
          </div>

          <div
            data-su-ba
            style={{
              border: "1px solid var(--line)",
              borderRadius: "20px",
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              background: "#fff",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div
              data-su-mobile-pad
              style={{ padding: "32px", position: "relative" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    letterSpacing: ".09em",
                    textTransform: "uppercase",
                    fontWeight: "700",
                    color: "var(--bad-600)",
                  }}
                >
                  Before Susea
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--ink-3)",
                    padding: "2px 8px",
                    background: "var(--bad-50)",
                    border: "1px solid #F6D6CF",
                    borderRadius: "999px",
                    color: "var(--bad-600)",
                    fontWeight: "600",
                  }}
                >
                  18–36 hrs
                </span>
              </div>
              <h3
                style={{
                  margin: "0 0 22px",
                  fontSize: "24px",
                  letterSpacing: "-.02em",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                Emails, WhatsApp, spreadsheets, prayer
              </h3>
              <ul
                style={{
                  margin: "0",
                  padding: "0",
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <li
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    fontSize: "14.5px",
                    color: "var(--ink-2)",
                    lineHeight: "1.45",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      background: "var(--bad-50)",
                      color: "var(--bad-500)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "13px",
                      marginTop: "1px",
                    }}
                  >
                    ✕
                  </span>
                  <span>
                    <b style={{ color: "var(--ink)" }}>Email 6–8 forwarders</b>{" "}
                    individually with the same cargo details
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    fontSize: "14.5px",
                    color: "var(--ink-2)",
                    lineHeight: "1.45",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      background: "var(--bad-50)",
                      color: "var(--bad-500)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "13px",
                      marginTop: "1px",
                    }}
                  >
                    ✕
                  </span>
                  <span>
                    <b style={{ color: "var(--ink)" }}>Chase quotes</b> across
                    WhatsApp, phone, follow-up emails for 2 days
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    fontSize: "14.5px",
                    color: "var(--ink-2)",
                    lineHeight: "1.45",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      background: "var(--bad-50)",
                      color: "var(--bad-500)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "13px",
                      marginTop: "1px",
                    }}
                  >
                    ✕
                  </span>
                  <span>
                    <b style={{ color: "var(--ink)" }}>Re-type numbers</b> into
                    Excel from 8 differently-formatted PDFs
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    fontSize: "14.5px",
                    color: "var(--ink-2)",
                    lineHeight: "1.45",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      background: "var(--bad-50)",
                      color: "var(--bad-500)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "13px",
                      marginTop: "1px",
                    }}
                  >
                    ✕
                  </span>
                  <span>
                    <b style={{ color: "var(--ink)" }}>Hunt surcharges</b>:
                    BAF, THC, ISPS, buried in email footers
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    fontSize: "14.5px",
                    color: "var(--ink-2)",
                    lineHeight: "1.45",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      background: "var(--bad-50)",
                      color: "var(--bad-500)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "13px",
                      marginTop: "1px",
                    }}
                  >
                    ✕
                  </span>
                  <span>
                    <b style={{ color: "var(--ink)" }}>Miss buyer commitment</b>{" "}
                    because pricing wasn't ready in time
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    fontSize: "14.5px",
                    color: "var(--ink-2)",
                    lineHeight: "1.45",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      background: "var(--bad-50)",
                      color: "var(--bad-500)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "13px",
                      marginTop: "1px",
                    }}
                  >
                    ✕
                  </span>
                  <span>
                    <b style={{ color: "var(--ink)" }}>
                      No history, no leverage
                    </b>{" "}
                    , every shipment starts from scratch
                  </span>
                </li>
              </ul>
            </div>

            <div
              data-su-mobile-pad
              style={{
                padding: "32px",
                background: "linear-gradient(180deg,var(--blue-50),#fff 80%)",
                borderLeft: "1px solid var(--line)",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    letterSpacing: ".09em",
                    textTransform: "uppercase",
                    fontWeight: "700",
                    color: "var(--blue-700)",
                  }}
                >
                  With Susea
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    padding: "2px 8px",
                    background: "#fff",
                    border: "1px solid var(--blue-100)",
                    borderRadius: "999px",
                    color: "var(--blue-700)",
                    fontWeight: "600",
                  }}
                >
                  under 5 min
                </span>
              </div>
              <h3
                style={{
                  margin: "0 0 22px",
                  fontSize: "24px",
                  letterSpacing: "-.02em",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                One platform, live rates, one RFQ
              </h3>
              <ul
                style={{
                  margin: "0",
                  padding: "0",
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <li
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    fontSize: "14.5px",
                    color: "var(--ink-2)",
                    lineHeight: "1.45",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      background: "var(--blue-100)",
                      color: "var(--blue-700)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "12px",
                      marginTop: "1px",
                    }}
                  >
                    ✓
                  </span>
                  <span>
                    <b style={{ color: "var(--ink)" }}>Instant rates</b> from
                    40+ carriers on any lane: one search
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    fontSize: "14.5px",
                    color: "var(--ink-2)",
                    lineHeight: "1.45",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      background: "var(--blue-100)",
                      color: "var(--blue-700)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "12px",
                      marginTop: "1px",
                    }}
                  >
                    ✓
                  </span>
                  <span>
                    <b style={{ color: "var(--ink)" }}>One RFQ</b> to your
                    preferred providers; they respond in the same structured
                    format
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    fontSize: "14.5px",
                    color: "var(--ink-2)",
                    lineHeight: "1.45",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      background: "var(--blue-100)",
                      color: "var(--blue-700)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "12px",
                      marginTop: "1px",
                    }}
                  >
                    ✓
                  </span>
                  <span>
                    <b style={{ color: "var(--ink)" }}>All-in pricing</b>:
                    every surcharge, calculated and displayed up-front
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    fontSize: "14.5px",
                    color: "var(--ink-2)",
                    lineHeight: "1.45",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      background: "var(--blue-100)",
                      color: "var(--blue-700)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "12px",
                      marginTop: "1px",
                    }}
                  >
                    ✓
                  </span>
                  <span>
                    <b style={{ color: "var(--ink)" }}>
                      Side-by-side comparison
                    </b>{" "}
                    : price, transit time, free time, validity
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    fontSize: "14.5px",
                    color: "var(--ink-2)",
                    lineHeight: "1.45",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      background: "var(--blue-100)",
                      color: "var(--blue-700)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "12px",
                      marginTop: "1px",
                    }}
                  >
                    ✓
                  </span>
                  <span>
                    <b style={{ color: "var(--ink)" }}>AI recommendations</b>:
                    best rate, fastest transit, best free time
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    fontSize: "14.5px",
                    color: "var(--ink-2)",
                    lineHeight: "1.45",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      background: "var(--blue-100)",
                      color: "var(--blue-700)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "12px",
                      marginTop: "1px",
                    }}
                  >
                    ✓
                  </span>
                  <span>
                    <b style={{ color: "var(--ink)" }}>
                      Rate &amp; RFQ history
                    </b>{" "}
                    : every shipment builds your leverage
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <a
              href="#demo"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                height: "48px",
                padding: "0 22px",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: "600",
                background: "var(--blue-600)",
                color: "#fff",
                boxShadow: "var(--shadow-blue)",
              }}
            >
              <span>See it live · 20-min demo</span>
              <I n="arrow-right" style={{ width: "16px", height: "16px" }} />
            </a>
          </div>
        </div>
      </section>

      <section data-su-section id="how" style={{ padding: "56px 0" }}>
        <div
          data-su-container
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}
        >
          <div
            style={{
              maxWidth: "820px",
              margin: "0 auto",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                padding: "6px 14px",
                border: "1px solid var(--line)",
                borderRadius: "999px",
                background: "#fff",
                color: "var(--ink-3)",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: ".04em",
                textTransform: "uppercase",
              }}
            >
              <i
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "999px",
                  background: "var(--blue-500)",
                  boxShadow: "0 0 0 3px var(--blue-100)",
                }}
              />
              How it works
            </span>
            <h2
              data-su-h2
              style={{
                margin: "0",
                fontSize: "clamp(30px,4vw,50px)",
                lineHeight: "1.06",
                letterSpacing: "-.028em",
                fontWeight: "600",
                textWrap: "balance",
              }}
            >
              From cargo brief to booked container,{" "}
              <em style={{ fontStyle: "normal", color: "var(--blue-600)" }}>
                in one afternoon
              </em>
            </h2>
          </div>

          <div
            data-su-cols="2"
            data-su-how
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "22px",
            }}
          >
            <div
              style={{
                position: "relative",
                border: "1px solid var(--line)",
                borderRadius: "20px",
                background: "#fff",
                padding: "32px",
                boxShadow: "var(--shadow-md)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  right: "0",
                  top: "0",
                  height: "3px",
                  background:
                    "linear-gradient(90deg,var(--blue-500),var(--blue-300))",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--blue-50)",
                    color: "var(--blue-600)",
                  }}
                >
                  <I n="zap" style={{ width: "22px", height: "22px" }} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      color: "var(--blue-700)",
                    }}
                  >
                    Pillar 1 · Instant rates
                  </div>
                  <h3
                    style={{
                      margin: "2px 0 0",
                      fontSize: "22px",
                      fontWeight: "600",
                      letterSpacing: "-.02em",
                      color: "var(--ink)",
                    }}
                  >
                    Rates in seconds, not days
                  </h3>
                </div>
              </div>
              <p
                style={{
                  margin: "0 0 22px",
                  color: "var(--ink-2)",
                  fontSize: "14.5px",
                  lineHeight: "1.55",
                }}
              >
                Search a lane, pick your container, get live rates from every
                major carrier, with all-in pricing and free-time built in.
              </p>
              <ol
                style={{
                  margin: "0",
                  padding: "0",
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  counterReset: "step",
                }}
              >
                <li
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: "var(--blue-50)",
                      color: "var(--blue-700)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                    }}
                  >
                    1
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: "14.5px",
                        fontWeight: "600",
                        color: "var(--ink)",
                      }}
                    >
                      Enter your lane &amp; cargo
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "var(--ink-3)",
                        marginTop: "2px",
                      }}
                    >
                      Origin, destination, container type. That's it.
                    </div>
                  </div>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: "var(--blue-50)",
                      color: "var(--blue-700)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                    }}
                  >
                    2
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: "14.5px",
                        fontWeight: "600",
                        color: "var(--ink)",
                      }}
                    >
                      See every carrier side-by-side
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "var(--ink-3)",
                        marginTop: "2px",
                      }}
                    >
                      All-in price, transit, free time, validity; no re-typing.
                    </div>
                  </div>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: "var(--blue-50)",
                      color: "var(--blue-700)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                    }}
                  >
                    3
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: "14.5px",
                        fontWeight: "600",
                        color: "var(--ink)",
                      }}
                    >
                      Book with one click or share the quote
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "var(--ink-3)",
                        marginTop: "2px",
                      }}
                    >
                      Send a branded PDF to your buyer or supplier in 30
                      seconds.
                    </div>
                  </div>
                </li>
              </ol>
              <div style={{ marginTop: "22px" }}>
                <a
                  href="#demo"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    height: "42px",
                    padding: "0 18px",
                    borderRadius: "11px",
                    fontSize: "14px",
                    fontWeight: "600",
                    background: "var(--blue-600)",
                    color: "#fff",
                    boxShadow: "var(--shadow-blue)",
                  }}
                >
                  Get instant rates
                  <I
                    n="arrow-right"
                    style={{ width: "15px", height: "15px" }}
                  />
                </a>
              </div>
            </div>

            <div
              style={{
                position: "relative",
                border: "1px solid var(--line)",
                borderRadius: "20px",
                background: "#fff",
                padding: "32px",
                boxShadow: "var(--shadow-md)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  right: "0",
                  top: "0",
                  height: "3px",
                  background:
                    "linear-gradient(90deg,var(--orange-500),var(--amber-500))",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--orange-50)",
                    color: "var(--orange-600)",
                  }}
                >
                  <I n="send" style={{ width: "22px", height: "22px" }} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      color: "var(--orange-700)",
                    }}
                  >
                    Pillar 2 · RFQ
                  </div>
                  <h3
                    style={{
                      margin: "2px 0 0",
                      fontSize: "22px",
                      fontWeight: "600",
                      letterSpacing: "-.02em",
                      color: "var(--ink)",
                    }}
                  >
                    One RFQ, all your providers
                  </h3>
                </div>
              </div>
              <p
                style={{
                  margin: "0 0 22px",
                  color: "var(--ink-2)",
                  fontSize: "14.5px",
                  lineHeight: "1.55",
                }}
              >
                Send one structured brief to every forwarder you work with.
                Compare responses in one view, negotiate, award, with full
                audit trail.
              </p>
              <ol
                style={{
                  margin: "0",
                  padding: "0",
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <li
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: "var(--orange-50)",
                      color: "var(--orange-700)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                    }}
                  >
                    1
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: "14.5px",
                        fontWeight: "600",
                        color: "var(--ink)",
                      }}
                    >
                      Draft one RFQ, once
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "var(--ink-3)",
                        marginTop: "2px",
                      }}
                    >
                      Structured brief: lanes, volumes, incoterms, service
                      level.
                    </div>
                  </div>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: "var(--orange-50)",
                      color: "var(--orange-700)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                    }}
                  >
                    2
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: "14.5px",
                        fontWeight: "600",
                        color: "var(--ink)",
                      }}
                    >
                      Send to your provider list
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "var(--ink-3)",
                        marginTop: "2px",
                      }}
                    >
                      Your forwarders + Susea's carrier network. One click.
                    </div>
                  </div>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: "var(--orange-50)",
                      color: "var(--orange-700)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                    }}
                  >
                    3
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: "14.5px",
                        fontWeight: "600",
                        color: "var(--ink)",
                      }}
                    >
                      Compare, negotiate, award
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "var(--ink-3)",
                        marginTop: "2px",
                      }}
                    >
                      Every response normalized. Award directly. Full history
                      for next time.
                    </div>
                  </div>
                </li>
              </ol>
              <div style={{ marginTop: "22px" }}>
                <a
                  href="#demo"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    height: "42px",
                    padding: "0 18px",
                    borderRadius: "11px",
                    fontSize: "14px",
                    fontWeight: "600",
                    background: "var(--orange-500)",
                    color: "#fff",
                    boxShadow: "var(--shadow-orange)",
                  }}
                >
                  Send your first RFQ
                  <I
                    n="arrow-right"
                    style={{ width: "15px", height: "15px" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-su-section
        id="preview"
        style={{
          padding: "56px 0",
          background: "var(--paper-2)",
          borderTop: "1px solid var(--line-soft)",
          borderBottom: "1px solid var(--line-soft)",
        }}
      >
        <div
          data-su-container
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}
        >
          <div
            style={{
              maxWidth: "820px",
              margin: "0 auto",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                padding: "6px 14px",
                border: "1px solid var(--line)",
                borderRadius: "999px",
                background: "#fff",
                color: "var(--ink-3)",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: ".04em",
                textTransform: "uppercase",
              }}
            >
              <i
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "999px",
                  background: "var(--orange-500)",
                  boxShadow: "0 0 0 3px var(--orange-100)",
                }}
              />
              Product preview
            </span>
            <h2
              data-su-h2
              style={{
                margin: "0",
                fontSize: "clamp(30px,4vw,50px)",
                lineHeight: "1.06",
                letterSpacing: "-.028em",
                fontWeight: "600",
                textWrap: "balance",
              }}
            >
              See what your procurement desk{" "}
              <em style={{ fontStyle: "normal", color: "var(--blue-600)" }}>
                looks like on Susea
              </em>
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "28px",
            }}
          >
            <div
              data-su-tabs
              style={{
                display: "inline-flex",
                gap: "6px",
                padding: "5px",
                border: "1px solid var(--line)",
                borderRadius: "14px",
                background: "#fff",
                boxShadow: "var(--shadow-xs)",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => setTab("rates")}
                style={tabStyle(tab === "rates", "var(--blue-600)")}
              >
                <I n="zap" style={{ width: "14px", height: "14px" }} />
                <span>Instant rates</span>
              </button>
              <button
                onClick={() => setTab("rfq")}
                style={tabStyle(tab === "rfq", "var(--orange-500)")}
              >
                <I n="send" style={{ width: "14px", height: "14px" }} />
                <span>RFQ workspace</span>
              </button>
              <button
                onClick={() => setTab("dash")}
                style={tabStyle(tab === "dash", "var(--blue-600)")}
              >
                <I
                  n="layout-dashboard"
                  style={{ width: "14px", height: "14px" }}
                />
                <span>Dashboard</span>
              </button>
            </div>
          </div>

          <div style={{ position: "relative" }}>{renderPreview()}</div>
        </div>
      </section>

      <section data-su-section id="features" style={{ padding: "56px 0" }}>
        <div
          data-su-container
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}
        >
          <div
            style={{
              maxWidth: "820px",
              margin: "0 auto",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                padding: "6px 14px",
                border: "1px solid var(--line)",
                borderRadius: "999px",
                background: "#fff",
                color: "var(--ink-3)",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: ".04em",
                textTransform: "uppercase",
              }}
            >
              <i
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "999px",
                  background: "var(--blue-500)",
                  boxShadow: "0 0 0 3px var(--blue-100)",
                }}
              />
              Built for procurement teams
            </span>
            <h2
              data-su-h2
              style={{
                margin: "0",
                fontSize: "clamp(30px,4vw,50px)",
                lineHeight: "1.06",
                letterSpacing: "-.028em",
                fontWeight: "600",
                textWrap: "balance",
              }}
            >
              Everything a sourcing team needs to{" "}
              <em style={{ fontStyle: "normal", color: "var(--blue-600)" }}>
                ship confidently
              </em>
            </h2>
          </div>

          {/* Desktop / tablet grid: cards mirror PROCUREMENT_FEATURES;
              keep both in sync if copy changes. Hidden ≤768px in favor of
              the mobile slider below. */}
          <div
            data-su-cols="4"
            data-su-proc-grid
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "14px",
            }}
          >
            <div
              style={{
                position: "relative",
                border: "1px solid var(--line)",
                background: "#fff",
                borderRadius: "16px",
                padding: "22px",
                minHeight: "190px",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "11px",
                  border: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--blue-50)",
                  color: "var(--blue-600)",
                  marginBottom: "14px",
                }}
              >
                <I n="search" style={{ width: "20px", height: "20px" }} />
              </div>
              <h4
                style={{
                  margin: "0 0 6px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                Live rates on any lane
              </h4>
              <p
                style={{
                  margin: "0",
                  fontSize: "13px",
                  color: "var(--ink-2)",
                  lineHeight: "1.5",
                }}
              >
                40+ carriers, updated continuously. FCL, LCL, air. Every major
                trade lane.
              </p>
            </div>
            <div
              style={{
                position: "relative",
                border: "1px solid var(--line)",
                background: "#fff",
                borderRadius: "16px",
                padding: "22px",
                minHeight: "190px",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "11px",
                  border: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--blue-50)",
                  color: "var(--blue-600)",
                  marginBottom: "14px",
                }}
              >
                <I n="scale" style={{ width: "20px", height: "20px" }} />
              </div>
              <h4
                style={{
                  margin: "0 0 6px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                Side-by-side comparison
              </h4>
              <p
                style={{
                  margin: "0",
                  fontSize: "13px",
                  color: "var(--ink-2)",
                  lineHeight: "1.5",
                }}
              >
                All-in price, transit time, free time, validity: apples to
                apples.
              </p>
            </div>
            <div
              style={{
                position: "relative",
                border: "1px solid var(--line)",
                background: "#fff",
                borderRadius: "16px",
                padding: "22px",
                minHeight: "190px",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "11px",
                  border: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--blue-50)",
                  color: "var(--blue-600)",
                  marginBottom: "14px",
                }}
              >
                <I n="send" style={{ width: "20px", height: "20px" }} />
              </div>
              <h4
                style={{
                  margin: "0 0 6px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                Multi-provider RFQ
              </h4>
              <p
                style={{
                  margin: "0",
                  fontSize: "13px",
                  color: "var(--ink-2)",
                  lineHeight: "1.5",
                }}
              >
                One structured brief → every forwarder responds in the same
                format.
              </p>
            </div>
            <div
              style={{
                position: "relative",
                border: "1px solid var(--line)",
                background: "#fff",
                borderRadius: "16px",
                padding: "22px",
                minHeight: "190px",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "11px",
                  border: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg,var(--amber-500),var(--orange-500))",
                  color: "#fff",
                  marginBottom: "14px",
                }}
              >
                <I n="sparkles" style={{ width: "20px", height: "20px" }} />
              </div>
              <h4
                style={{
                  margin: "0 0 6px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                AI recommendations
              </h4>
              <p
                style={{
                  margin: "0",
                  fontSize: "13px",
                  color: "var(--ink-2)",
                  lineHeight: "1.5",
                }}
              >
                "Best rate", "fastest transit", "best free time": surfaced
                automatically.
              </p>
            </div>
            <div
              style={{
                position: "relative",
                border: "1px solid var(--line)",
                background: "#fff",
                borderRadius: "16px",
                padding: "22px",
                minHeight: "190px",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "11px",
                  border: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--blue-50)",
                  color: "var(--blue-600)",
                  marginBottom: "14px",
                }}
              >
                <I n="file-text" style={{ width: "20px", height: "20px" }} />
              </div>
              <h4
                style={{
                  margin: "0 0 6px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                Branded quotations
              </h4>
              <p
                style={{
                  margin: "0",
                  fontSize: "13px",
                  color: "var(--ink-2)",
                  lineHeight: "1.5",
                }}
              >
                Customer-ready PDF quotes with your logo, generated in seconds.
              </p>
            </div>
            <div
              style={{
                position: "relative",
                border: "1px solid var(--line)",
                background: "#fff",
                borderRadius: "16px",
                padding: "22px",
                minHeight: "190px",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "11px",
                  border: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--blue-50)",
                  color: "var(--blue-600)",
                  marginBottom: "14px",
                }}
              >
                <I n="calculator" style={{ width: "20px", height: "20px" }} />
              </div>
              <h4
                style={{
                  margin: "0 0 6px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                Surcharges built-in
              </h4>
              <p
                style={{
                  margin: "0",
                  fontSize: "13px",
                  color: "var(--ink-2)",
                  lineHeight: "1.5",
                }}
              >
                BAF, THC, ISPS, LSS: calculated and audited. No margin leaks.
              </p>
            </div>
            <div
              style={{
                position: "relative",
                border: "1px solid var(--line)",
                background: "#fff",
                borderRadius: "16px",
                padding: "22px",
                minHeight: "190px",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "11px",
                  border: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--blue-50)",
                  color: "var(--blue-600)",
                  marginBottom: "14px",
                }}
              >
                <I n="history" style={{ width: "20px", height: "20px" }} />
              </div>
              <h4
                style={{
                  margin: "0 0 6px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                Rate &amp; RFQ history
              </h4>
              <p
                style={{
                  margin: "0",
                  fontSize: "13px",
                  color: "var(--ink-2)",
                  lineHeight: "1.5",
                }}
              >
                Every quote, every award: searchable. Real leverage on your
                next lane.
              </p>
            </div>
            <div
              style={{
                position: "relative",
                border: "1px solid var(--line)",
                background: "#fff",
                borderRadius: "16px",
                padding: "22px",
                minHeight: "190px",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "11px",
                  border: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--blue-50)",
                  color: "var(--blue-600)",
                  marginBottom: "14px",
                }}
              >
                <I n="users" style={{ width: "20px", height: "20px" }} />
              </div>
              <h4
                style={{
                  margin: "0 0 6px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "var(--ink)",
                }}
              >
                Team collaboration
              </h4>
              <p
                style={{
                  margin: "0",
                  fontSize: "13px",
                  color: "var(--ink-2)",
                  lineHeight: "1.5",
                }}
              >
                Buyers, ops, finance: everyone on the same shipment, same page.
              </p>
            </div>
          </div>

          {/* Mobile-only Embla slider (≤768px); isolated component so its
              state updates don't re-render this huge page (keeps it smooth) */}
          <ProcMobileSlider />
        </div>
      </section>

      <section
        data-su-section
        data-su-impact
        id="impact"
        style={{
          padding: "56px 0",
          background: "linear-gradient(180deg,var(--tint-blue),#fff 100%)",
          borderTop: "1px solid var(--line-soft)",
          borderBottom: "1px solid var(--line-soft)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0",
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(1100px 640px at 50% 50%,#000 30%,transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(1100px 640px at 50% 50%,#000 30%,transparent 72%)",
            pointerEvents: "none",
          }}
        ></div>
        <div
          data-su-container
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 32px",
            position: "relative",
          }}
        >
          <div
            style={{
              maxWidth: "820px",
              margin: "0 auto",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                padding: "6px 14px",
                border: "1px solid var(--line)",
                borderRadius: "999px",
                background: "#fff",
                color: "var(--ink-3)",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: ".04em",
                textTransform: "uppercase",
              }}
            >
              <i
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "999px",
                  background: "var(--blue-500)",
                  boxShadow: "0 0 0 3px var(--blue-100)",
                }}
              />
              Operational impact
            </span>
            <h2
              data-su-h2
              style={{
                margin: "0",
                fontSize: "clamp(30px,4vw,50px)",
                lineHeight: "1.06",
                letterSpacing: "-.028em",
                fontWeight: "600",
                textWrap: "balance",
              }}
            >
              What Susea customers save{" "}
              <em style={{ fontStyle: "normal", color: "var(--blue-600)" }}>
                every single month
              </em>
            </h2>
          </div>
          <div
            data-su-cols="4"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "14px",
            }}
          >
            <div
              data-su-metric
              style={{
                border: "1px solid var(--line)",
                borderRadius: "14px",
                padding: "26px",
                background: "#fff",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                data-su-metric-value
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "52px",
                  fontWeight: "700",
                  letterSpacing: "-.03em",
                  lineHeight: "1",
                  color: "var(--ink)",
                }}
              >
                42
                <span
                  data-su-metric-unit
                  style={{
                    fontSize: "22px",
                    color: "var(--blue-600)",
                    marginLeft: "2px",
                  }}
                >
                  hrs
                </span>
              </div>
              <div
                data-su-metric-label
                style={{
                  marginTop: "12px",
                  fontSize: "14px",
                  color: "var(--ink-2)",
                  lineHeight: "1.4",
                }}
              >
                saved per procurement person, every month
              </div>
            </div>
            <div
              data-su-metric
              style={{
                border: "1px solid var(--line)",
                borderRadius: "14px",
                padding: "26px",
                background: "#fff",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                data-su-metric-value
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "52px",
                  fontWeight: "700",
                  letterSpacing: "-.03em",
                  lineHeight: "1",
                  color: "var(--ink)",
                }}
              >
                90
                <span
                  data-su-metric-unit
                  style={{
                    fontSize: "22px",
                    color: "var(--blue-600)",
                    marginLeft: "2px",
                  }}
                >
                  %
                </span>
              </div>
              <div
                data-su-metric-label
                style={{
                  marginTop: "12px",
                  fontSize: "14px",
                  color: "var(--ink-2)",
                  lineHeight: "1.4",
                }}
              >
                faster quotation turnaround, on average
              </div>
            </div>
            <div
              data-su-metric
              style={{
                border: "1px solid var(--line)",
                borderRadius: "14px",
                padding: "26px",
                background: "#fff",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                data-su-metric-value
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "52px",
                  fontWeight: "700",
                  letterSpacing: "-.03em",
                  lineHeight: "1",
                  color: "var(--ink)",
                }}
              >
                $186
                <span
                  data-su-metric-unit
                  style={{
                    fontSize: "22px",
                    color: "var(--blue-600)",
                    marginLeft: "2px",
                  }}
                >
                  /TEU
                </span>
              </div>
              <div
                data-su-metric-label
                style={{
                  marginTop: "12px",
                  fontSize: "14px",
                  color: "var(--ink-2)",
                  lineHeight: "1.4",
                }}
              >
                average freight cost reduction on RFQ'd lanes
              </div>
            </div>
            <div
              data-su-metric
              style={{
                border: "1px solid var(--line)",
                borderRadius: "14px",
                padding: "26px",
                background: "#fff",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                data-su-metric-value
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "52px",
                  fontWeight: "700",
                  letterSpacing: "-.03em",
                  lineHeight: "1",
                  color: "var(--ink)",
                }}
              >
                3.4
                <span
                  data-su-metric-unit
                  style={{
                    fontSize: "22px",
                    color: "var(--blue-600)",
                    marginLeft: "2px",
                  }}
                >
                  ×
                </span>
              </div>
              <div
                data-su-metric-label
                style={{
                  marginTop: "12px",
                  fontSize: "14px",
                  color: "var(--ink-2)",
                  lineHeight: "1.4",
                }}
              >
                more shipments handled without adding headcount
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-su-section id="roi" style={{ padding: "56px 0" }}>
        <div
          data-su-container
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}
        >
          <div
            style={{
              maxWidth: "820px",
              margin: "0 auto",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                padding: "6px 14px",
                border: "1px solid var(--line)",
                borderRadius: "999px",
                background: "#fff",
                color: "var(--ink-3)",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: ".04em",
                textTransform: "uppercase",
              }}
            >
              <i
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "999px",
                  background: "var(--amber-500)",
                  boxShadow: "0 0 0 3px var(--amber-100)",
                }}
              />
              ROI calculator · try it
            </span>
            <h2
              data-su-h2
              style={{
                margin: "0",
                fontSize: "clamp(30px,4vw,50px)",
                lineHeight: "1.06",
                letterSpacing: "-.028em",
                fontWeight: "600",
                textWrap: "balance",
              }}
            >
              See what Susea is{" "}
              <em style={{ fontStyle: "normal", color: "var(--blue-600)" }}>
                worth to your business
              </em>
            </h2>
            <p
              style={{
                margin: "0",
                color: "var(--ink-2)",
                fontSize: "17px",
                lineHeight: "1.55",
                maxWidth: "640px",
              }}
            >
              Move the sliders. Numbers update live.
            </p>
          </div>

          <RoiCalculator />
        </div>
      </section>

      <section
        data-su-section
        style={{
          padding: "56px 0",
          background: "var(--paper-2)",
          borderTop: "1px solid var(--line-soft)",
          borderBottom: "1px solid var(--line-soft)",
        }}
      >
        <div
          data-su-container
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}
        >
          <div
            style={{
              maxWidth: "820px",
              margin: "0 auto",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                padding: "6px 14px",
                border: "1px solid var(--line)",
                borderRadius: "999px",
                background: "#fff",
                color: "var(--ink-3)",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: ".04em",
                textTransform: "uppercase",
              }}
            >
              <i
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "999px",
                  background: "var(--blue-500)",
                  boxShadow: "0 0 0 3px var(--blue-100)",
                }}
              />
              Loved by sourcing &amp; procurement teams
            </span>
            <h2
              data-su-h2
              style={{
                margin: "0",
                fontSize: "clamp(30px,4vw,50px)",
                lineHeight: "1.06",
                letterSpacing: "-.028em",
                fontWeight: "600",
                textWrap: "balance",
              }}
            >
              Loved by importers, exporters &amp; sourcing teams{" "}
              <em style={{ fontStyle: "normal", color: "var(--blue-600)" }}>
                who use it every day.
              </em>
            </h2>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            overflow: "hidden",
            maskImage:
              "linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)",
          }}
        >
          <div
            ref={testiRef}
            className="su-testi-track"
            style={{
              display: "flex",
              gap: "14px",
              width: "max-content",
              alignItems: "stretch",
              animation: "suSlide 90s linear infinite",
            }}
          >
            {renderTestimonials()}
          </div>
        </div>
      </section>

      <section
        data-su-section
        id="faq"
        style={{
          padding: "56px 0",
          background: "var(--paper-2)",
          borderTop: "1px solid var(--line-soft)",
          borderBottom: "1px solid var(--line-soft)",
        }}
      >
        <div
          data-su-container
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: "48px",
            }}
            data-su-cols="2"
            data-su-faq
          >
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "9px",
                  padding: "6px 14px",
                  border: "1px solid var(--line)",
                  borderRadius: "999px",
                  background: "#fff",
                  color: "var(--ink-3)",
                  fontSize: "12px",
                  fontWeight: "600",
                  letterSpacing: ".04em",
                  textTransform: "uppercase",
                }}
              >
                <i
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "999px",
                    background: "var(--blue-500)",
                    boxShadow: "0 0 0 3px var(--blue-100)",
                  }}
                />
                Straight answers
              </span>
              <h2
                data-su-h2
                style={{
                  margin: "20px 0 14px",
                  fontSize: "clamp(30px,3.6vw,44px)",
                  lineHeight: "1.08",
                  letterSpacing: "-.028em",
                  fontWeight: "600",
                }}
              >
                Common questions from buyers &amp; sourcing leads
              </h2>
              <p
                style={{
                  margin: "0",
                  color: "var(--ink-2)",
                  fontSize: "16px",
                  lineHeight: "1.55",
                  maxWidth: "400px",
                }}
              >
                We hear these a lot. If your question isn't here, ask us on the
                demo; the whole point is to make sure Susea actually fits your
                workflow.
              </p>
              <div style={{ marginTop: "22px" }}>
                <a
                  href="#demo"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    height: "44px",
                    padding: "0 18px",
                    borderRadius: "11px",
                    fontSize: "14px",
                    fontWeight: "600",
                    background: "var(--blue-600)",
                    color: "#fff",
                    boxShadow: "var(--shadow-blue)",
                  }}
                >
                  Talk to an expert
                  <I
                    n="arrow-right"
                    style={{ width: "15px", height: "15px" }}
                  />
                </a>
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {renderFaq()}
            </div>
          </div>
        </div>
      </section>

      <section
        data-su-section
        id="demo"
        style={{
          padding: "72px 0",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(700px 400px at 28% 70%, var(--blue-50), transparent 60%),radial-gradient(600px 360px at 82% 24%, var(--orange-50), transparent 60%),#fff",
        }}
      >
        <div
          data-su-container
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "0 32px",
            position: "relative",
          }}
        >
          <div
            data-su-mobile-pad-lg
            style={{
              border: "1px solid var(--line)",
              borderRadius: "24px",
              background: "#fff",
              padding: "52px",
              display: "grid",
              gridTemplateColumns: "1.05fr 1fr",
              gap: "36px",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
              boxShadow: "var(--shadow-xl)",
            }}
            data-su-demo-grid
          >
            <div
              style={{
                position: "absolute",
                left: "24px",
                right: "24px",
                top: "-1px",
                height: "2px",
                borderRadius: "2px",
                background:
                  "linear-gradient(90deg,transparent,var(--blue-500),var(--orange-500),var(--amber-500),transparent)",
              }}
            ></div>
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "9px",
                  padding: "6px 14px",
                  border: "1px solid var(--line)",
                  borderRadius: "999px",
                  background: "#fff",
                  color: "var(--ink-3)",
                  fontSize: "12px",
                  fontWeight: "600",
                  letterSpacing: ".04em",
                  textTransform: "uppercase",
                }}
              >
                <i
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "999px",
                    background: "var(--good-500)",
                  }}
                />
                Priority onboarding open · Cohort 03
              </span>
              <h2
                data-su-h2
                style={{
                  margin: "18px 0 14px",
                  fontSize: "clamp(32px,4vw,46px)",
                  lineHeight: "1.06",
                  letterSpacing: "-.03em",
                  fontWeight: "600",
                  textWrap: "balance",
                }}
              >
                Book a{" "}
                <em style={{ fontStyle: "normal", color: "var(--blue-600)" }}>
                  20-minute demo
                </em>{" "}
                : tailored to your lanes
              </h2>
              <p
                style={{
                  margin: "0 0 22px",
                  color: "var(--ink-2)",
                  fontSize: "16px",
                  lineHeight: "1.55",
                  maxWidth: "460px",
                }}
              >
                We'll walk you through Susea on your actual lanes. Bring one
                live shipment; we'll price it live and show your ROI in real
                numbers.
              </p>
              <ul
                style={{
                  margin: "0 0 26px",
                  padding: "0",
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <li
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    fontSize: "14.5px",
                    color: "var(--ink-2)",
                  }}
                >
                  <I
                    n="check-circle-2"
                    style={{
                      width: "18px",
                      height: "18px",
                      color: "var(--good-500)",
                      flex: "none",
                    }}
                  />
                  <span>Live pricing on your real lanes during the call</span>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    fontSize: "14.5px",
                    color: "var(--ink-2)",
                  }}
                >
                  <I
                    n="check-circle-2"
                    style={{
                      width: "18px",
                      height: "18px",
                      color: "var(--good-500)",
                      flex: "none",
                    }}
                  />
                  <span>Custom ROI worksheet after the call</span>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    fontSize: "14.5px",
                    color: "var(--ink-2)",
                  }}
                >
                  <I
                    n="check-circle-2"
                    style={{
                      width: "18px",
                      height: "18px",
                      color: "var(--good-500)",
                      flex: "none",
                    }}
                  />
                  <span>
                    Free 30-day pilot on your top lanes if there's a fit
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    fontSize: "14.5px",
                    color: "var(--ink-2)",
                  }}
                >
                  <I
                    n="check-circle-2"
                    style={{
                      width: "18px",
                      height: "18px",
                      color: "var(--good-500)",
                      flex: "none",
                    }}
                  />
                  <span>Priority onboarding: live in under 24 hours</span>
                </li>
              </ul>
              <div
                style={{
                  display: "flex",
                  gap: "22px",
                  alignItems: "center",
                  color: "var(--ink-2)",
                  fontSize: "13px",
                  flexWrap: "wrap",
                  paddingTop: "22px",
                  borderTop: "1px solid var(--line-soft)",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "22px",
                      color: "var(--ink)",
                      fontWeight: "700",
                    }}
                  >
                    400+
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      color: "var(--ink-4)",
                      marginTop: "2px",
                      fontWeight: "700",
                    }}
                  >
                    shippers
                  </div>
                </div>
                <div
                  style={{
                    width: "1px",
                    height: "36px",
                    background: "var(--line)",
                  }}
                ></div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "22px",
                      color: "var(--ink)",
                      fontWeight: "700",
                    }}
                  >
                    62
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      color: "var(--ink-4)",
                      marginTop: "2px",
                      fontWeight: "700",
                    }}
                  >
                    countries
                  </div>
                </div>
                <div
                  style={{
                    width: "1px",
                    height: "36px",
                    background: "var(--line)",
                  }}
                ></div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "22px",
                      color: "var(--ink)",
                      fontWeight: "700",
                    }}
                  >
                    4.9★
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      color: "var(--ink-4)",
                      marginTop: "2px",
                      fontWeight: "700",
                    }}
                  >
                    rated
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {formSubmitted && (
                <>
                  <div
                    style={{
                      border: "1px solid #C2E7D6",
                      background: "var(--good-50)",
                      borderRadius: "14px",
                      padding: "32px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "16px",
                        background: "var(--good-500)",
                        color: "#fff",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "14px",
                      }}
                    >
                      <I n="check" style={{ width: "28px", height: "28px" }} />
                    </div>
                    <h3
                      style={{
                        margin: "0 0 6px",
                        fontSize: "22px",
                        fontWeight: "600",
                        color: "var(--ink)",
                      }}
                    >
                      You're on the priority list.
                    </h3>
                    <p
                      style={{
                        margin: "0 0 18px",
                        color: "var(--ink-2)",
                        fontSize: "14.5px",
                        lineHeight: "1.5",
                      }}
                    >
                      A pricing specialist will reach out within 4 hours. In the
                      meantime, pick a slot that works for you.
                    </p>
                    <a
                      href="#"
                      onClick={openCalendly}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        height: "48px",
                        padding: "0 22px",
                        borderRadius: "12px",
                        fontSize: "15px",
                        fontWeight: "600",
                        background: "var(--blue-600)",
                        color: "#fff",
                        boxShadow: "var(--shadow-blue)",
                      }}
                    >
                      <I
                        n="calendar"
                        style={{ width: "16px", height: "16px" }}
                      />
                      Book a slot on Calendly
                    </a>
                  </div>
                </>
              )}
              {formOpen && (
                <>
                  <HubSpotForm />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "12px",
                      color: "var(--ink-3)",
                      marginTop: "12px",
                    }}
                  >
                    <I
                      n="shield-check"
                      style={{
                        width: "14px",
                        height: "14px",
                        color: "var(--good-500)",
                      }}
                    />
                    <span>
                      No spam. Your details are encrypted and never sold. Only
                      used to prep your demo.
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: "16px",
                      paddingTop: "16px",
                      borderTop: "1px solid var(--line-soft)",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                        color: "var(--ink-4)",
                      }}
                    >
                      Prefer to skip the form?
                    </span>
                    <a
                      href="#"
                      onClick={openCalendly}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 14px",
                        borderRadius: "999px",
                        fontSize: "12.5px",
                        fontWeight: "600",
                        background: "var(--blue-50)",
                        color: "var(--blue-700)",
                        border: "1px solid var(--blue-100)",
                      }}
                    >
                      <I n="calendar" style={{ width: "13px", height: "13px" }} />
                      Pick a Calendly slot
                    </a>
                    <a
                      href="mailto:info@alphabitssolutions.com"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 14px",
                        borderRadius: "999px",
                        fontSize: "12.5px",
                        fontWeight: "600",
                        background: "#fff",
                        color: "var(--ink)",
                        border: "1px solid var(--line)",
                      }}
                    >
                      <I n="mail" style={{ width: "13px", height: "13px" }} />
                      Email sales
                    </a>
                  </div>
                  {false && (
                  <form
                    onSubmit={submitForm}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <div
                      data-su-form-row
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "11px",
                            fontWeight: "700",
                            letterSpacing: ".06em",
                            textTransform: "uppercase",
                            color: "var(--ink-3)",
                          }}
                        >
                          Full name*
                        </label>
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm("name", e.target.value)}
                          placeholder="Jane Sourcing"
                          style={{
                            height: "44px",
                            padding: "0 14px",
                            background: "#fff",
                            border: "1px solid var(--line)",
                            borderRadius: "10px",
                            fontSize: "14px",
                            outline: "none",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "11px",
                            fontWeight: "700",
                            letterSpacing: ".06em",
                            textTransform: "uppercase",
                            color: "var(--ink-3)",
                          }}
                        >
                          Work email*
                        </label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm("email", e.target.value)}
                          placeholder="jane@company.com"
                          style={{
                            height: "44px",
                            padding: "0 14px",
                            background: "#fff",
                            border: "1px solid var(--line)",
                            borderRadius: "10px",
                            fontSize: "14px",
                            outline: "none",
                          }}
                        />
                      </div>
                    </div>
                    <div
                      data-su-form-row
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "11px",
                            fontWeight: "700",
                            letterSpacing: ".06em",
                            textTransform: "uppercase",
                            color: "var(--ink-3)",
                          }}
                        >
                          Company*
                        </label>
                        <input
                          required
                          type="text"
                          value={form.company}
                          onChange={(e) => setForm("company", e.target.value)}
                          placeholder="Company name"
                          style={{
                            height: "44px",
                            padding: "0 14px",
                            background: "#fff",
                            border: "1px solid var(--line)",
                            borderRadius: "10px",
                            fontSize: "14px",
                            outline: "none",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "11px",
                            fontWeight: "700",
                            letterSpacing: ".06em",
                            textTransform: "uppercase",
                            color: "var(--ink-3)",
                          }}
                        >
                          Your role
                        </label>
                        <select
                          value={form.role}
                          onChange={(e) => setForm("role", e.target.value)}
                          style={{
                            height: "44px",
                            padding: "0 14px",
                            background: "#fff",
                            border: "1px solid var(--line)",
                            borderRadius: "10px",
                            fontSize: "14px",
                            outline: "none",
                            appearance: "none",
                            backgroundImage:
                              "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 viewBox=%220 0 12 8%22><path fill=%22%236B7C96%22 d=%22M6 8L0 0h12z%22/></svg>')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 14px center",
                          }}
                        >
                          <option>Procurement / Sourcing</option>
                          <option>Operations / Logistics</option>
                          <option>Founder / CEO</option>
                          <option>Finance</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div
                      data-su-form-row
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "11px",
                            fontWeight: "700",
                            letterSpacing: ".06em",
                            textTransform: "uppercase",
                            color: "var(--ink-3)",
                          }}
                        >
                          Shipments / month
                        </label>
                        <select
                          value={form.volume}
                          onChange={(e) => setForm("volume", e.target.value)}
                          style={{
                            height: "44px",
                            padding: "0 14px",
                            background: "#fff",
                            border: "1px solid var(--line)",
                            borderRadius: "10px",
                            fontSize: "14px",
                            outline: "none",
                            appearance: "none",
                            backgroundImage:
                              "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 viewBox=%220 0 12 8%22><path fill=%22%236B7C96%22 d=%22M6 8L0 0h12z%22/></svg>')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 14px center",
                          }}
                        >
                          <option>&lt; 10</option>
                          <option>10–50</option>
                          <option>50–200</option>
                          <option>200+</option>
                        </select>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "11px",
                            fontWeight: "700",
                            letterSpacing: ".06em",
                            textTransform: "uppercase",
                            color: "var(--ink-3)",
                          }}
                        >
                          Primary lane
                        </label>
                        <input
                          type="text"
                          value={form.lane}
                          onChange={(e) => setForm("lane", e.target.value)}
                          placeholder="e.g. INNSA → AEJEA"
                          style={{
                            height: "44px",
                            padding: "0 14px",
                            background: "#fff",
                            border: "1px solid var(--line)",
                            borderRadius: "10px",
                            fontSize: "14px",
                            outline: "none",
                          }}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      style={{
                        marginTop: "6px",
                        height: "52px",
                        padding: "0 22px",
                        borderRadius: "12px",
                        fontSize: "15px",
                        fontWeight: "600",
                        background: "var(--blue-600)",
                        color: "#fff",
                        boxShadow: "var(--shadow-blue)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <span>Book my 20-min demo</span>
                      <I
                        n="arrow-right"
                        style={{ width: "16px", height: "16px" }}
                      />
                    </button>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "12px",
                        color: "var(--ink-3)",
                        marginTop: "4px",
                      }}
                    >
                      <I
                        n="shield-check"
                        style={{
                          width: "14px",
                          height: "14px",
                          color: "var(--good-500)",
                        }}
                      />
                      <span>
                        No spam. Your details are encrypted and never sold. Only
                        used to prep your demo.
                      </span>
                    </div>

                    <div
                      style={{
                        marginTop: "10px",
                        paddingTop: "16px",
                        borderTop: "1px solid var(--line-soft)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: "700",
                          letterSpacing: ".06em",
                          textTransform: "uppercase",
                          color: "var(--ink-4)",
                        }}
                      >
                        Prefer to skip the form?
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        <a
                          href="#"
                          onClick={openCalendly}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "8px 14px",
                            borderRadius: "999px",
                            fontSize: "12.5px",
                            fontWeight: "600",
                            background: "var(--blue-50)",
                            color: "var(--blue-700)",
                            border: "1px solid var(--blue-100)",
                          }}
                        >
                          <I
                            n="calendar"
                            style={{ width: "13px", height: "13px" }}
                          />
                          Pick a Calendly slot
                        </a>
                        <a
                          href="mailto:info@alphabitssolutions.com"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "8px 14px",
                            borderRadius: "999px",
                            fontSize: "12.5px",
                            fontWeight: "600",
                            background: "#fff",
                            color: "var(--ink)",
                            border: "1px solid var(--line)",
                          }}
                        >
                          <I
                            n="mail"
                            style={{ width: "13px", height: "13px" }}
                          />
                          Email sales
                        </a>
                        <a
                          href="#preview"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "8px 14px",
                            borderRadius: "999px",
                            fontSize: "12.5px",
                            fontWeight: "600",
                            background: "#fff",
                            color: "var(--ink)",
                            border: "1px solid var(--line)",
                          }}
                        >
                          <I
                            n="play"
                            style={{ width: "13px", height: "13px" }}
                          />
                          Watch 90s tour
                        </a>
                      </div>
                    </div>
                  </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="foot-grid">
            <div>
              <div className="logo">
                <img
                  src="/assets/susea-mark-black.png"
                  alt="Susea"
                  style={{ height: "26px", width: "auto" }}
                />
                <span>Susea</span>
              </div>
              <p className="foot-tag">
                Ocean freight pricing &amp; procurement, operated by AI. Built
                for the teams doing the actual buying.
              </p>
              <div className="soc">
                <a
                  href="https://www.linkedin.com/company/susea-ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.85"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/susea.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.85"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="mailto:info@alphabitssolutions.com"
                  aria-label="Email"
                >
                  <I n="mail" style={{ width: "14px", height: "14px" }} />
                </a>
              </div>
            </div>
            <div>
              <h6>Product</h6>
              <ul>
                <li><a href="#features">Instant rates</a></li>
                <li><a href="#features">RFQ workspace</a></li>
                <li><a href="#preview">Product tour</a></li>
                <li><a href="#roi">ROI calculator</a></li>
              </ul>
            </div>
            <div>
              <h6>Resources</h6>
              <ul>
                <li><a href="#">Ocean freight pricing guide</a></li>
                <li><a href="#">RFQ best-practices</a></li>
                <li><a href="#">AI in freight: 2026 report</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h6>Company</h6>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#demo">Book demo</a></li>
                <li><a href="mailto:info@alphabitssolutions.com">Contact sales</a></li>
                <li><a href="#">Privacy · Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <div>
              © 2026 Susea, Inc. · Made for the teams that ship the world.
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <i
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "999px",
                  background: "var(--good-500)",
                }}
              />
              All systems operational
            </div>
          </div>
        </div>
      </footer>

      <div
        data-su-sticky-cta
        style={{
          display: "none",
          position: "fixed",
          left: "12px",
          right: "12px",
          bottom: "12px",
          zIndex: "80",
          background: "#fff",
          border: "1px solid var(--line)",
          borderRadius: "16px",
          padding: "10px",
          boxShadow:
            "0 20px 50px -10px rgba(14,23,38,.28),0 4px 12px -4px rgba(14,23,38,.1)",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <div style={{ flex: "1", paddingLeft: "8px" }}>
          <div
            style={{
              fontSize: "13px",
              fontWeight: "700",
              color: "var(--ink)",
              lineHeight: "1.15",
            }}
          >
            Get instant freight rates
          </div>
          <div
            style={{
              fontSize: "11.5px",
              color: "var(--ink-3)",
              marginTop: "1px",
            }}
          >
            Live demo in 20 min · no card
          </div>
        </div>
        <a
          href="#demo"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            height: "42px",
            padding: "0 16px",
            borderRadius: "11px",
            fontSize: "13.5px",
            fontWeight: "700",
            background: "var(--blue-600)",
            color: "#fff",
            boxShadow: "var(--shadow-blue)",
          }}
        >
          Book demo
          <I n="arrow-right" style={{ width: "14px", height: "14px" }} />
        </a>
      </div>
    </div>
  );
}
