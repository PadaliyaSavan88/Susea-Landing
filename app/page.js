"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Script from "next/script";
import useEmblaCarousel from "embla-carousel-react";
import { smoothScrollToId, smoothScrollToTop } from "@/lib/scroll";
import Footer from "@/components/landing/Footer";
import WhySusea from "@/components/landing/WhySusea";
import { PARTNER_LOGOS } from "@/components/landing/TestimonialsSlider";
import "./freight-forwarding/freight-forwarding.css";

/* ============================================================
   Faithful 1:1 port of the Meta Ads landing page ("DC" export).
   Content, data and layout mirror the source. Forms/CTAs are
   visual-only in this pass (they don't submit anywhere).
   ============================================================ */

/* ---- Calendly booking config ----
   Flip USE_CALENDLY_EMBED to false to fall back to the custom mock grid,
   whose day/time cells then open CALENDLY_URL in a new tab instead. ---- */
const CALENDLY_URL = "https://calendly.com/darshit-alphabitssolutions/30min";
const USE_CALENDLY_EMBED = true;

/* ---- Calendly inline embed: loads widget.js and mounts the scheduler. ---- */
function CalendlyEmbed({ url }) {
  const mounted = useRef(false);
  const init = () => {
    if (typeof window === "undefined" || mounted.current) return;
    const parent = document.getElementById("calendly-inline");
    if (window.Calendly && parent) {
      mounted.current = true;
      window.Calendly.initInlineWidget({ url, parentElement: parent });
    }
  };
  useEffect(() => {
    init();
  }, []); // in case the script was already cached/loaded
  return (
    <>
      <div
        id="calendly-inline"
        style={{
          minWidth: "320px",
          width: "100%",
          height: "820px",
          maxWidth: "1080px",
          margin: "0 auto",
          borderRadius: "20px",
          overflow: "hidden",
          background: "#fff",
          boxShadow: "var(--shadow-xl)",
        }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={init}
      />
    </>
  );
}

/* ---- HubSpot beta-access form (same portal/form as the main landing page). ---- */
const HS_PORTAL_ID = "246430647";
const HS_REGION = "na2";
const HS_FORM_ID = "e8384cae-33eb-484b-8cae-63985955f33d";

function HubSpotForm() {
  return (
    <>
      <div
        className="hs-form-frame"
        data-region={HS_REGION}
        data-form-id={HS_FORM_ID}
        data-portal-id={HS_PORTAL_ID}
      />
      <Script
        src={`https://js-${HS_REGION}.hsforms.net/forms/embed/${HS_PORTAL_ID}.js`}
        strategy="afterInteractive"
      />
    </>
  );
}

/* ---- Hover helper: reproduces the source's inline `style-hover`. ---- */
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

/* ---- Playbook lead-magnet form: posts to /api/playbook, emails the PDF ----
   Shared by the lead-magnet section and the exit-intent modal. Handles its own
   loading/success/error state and includes a honeypot field for basic bot defense. */
function PlaybookForm({
  source,
  buttonLabel = "Get the playbook",
  wrapperStyle,
}) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot; real users leave this blank
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/playbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          padding: "14px 16px",
          borderRadius: "10px",
          background: "rgba(46,107,216,.08)",
          border: "1px solid rgba(46,107,216,.25)",
          animation: "ffFadeUp .3s ease",
          ...wrapperStyle,
        }}
      >
        <span style={{ fontSize: "18px", lineHeight: 1.2 }}>✉️</span>
        <div
          style={{ fontSize: "14px", color: "var(--ink-2)", lineHeight: 1.5 }}
        >
          Check your inbox: the playbook is on its way to{" "}
          <strong style={{ color: "var(--ink)" }}>{email}</strong>. It may take
          a minute (and check spam just in case).
        </div>
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      <form
        onSubmit={submit}
        style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
      >
        <input
          type="email"
          placeholder="ops@yourcompany.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          style={{
            flex: 1,
            minWidth: "200px",
            padding: "13px 16px",
            borderRadius: "10px",
            border: `1px solid ${status === "error" ? "#D92D20" : "var(--line-strong)"}`,
            background: "#fff",
          }}
        />
        {/* Honeypot: hidden from real users, catches naive bots */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            opacity: 0,
          }}
        />
        <Hover
          as="button"
          type="submit"
          disabled={status === "loading"}
          base={{
            padding: "13px 20px",
            borderRadius: "10px",
            background: "var(--ink)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "14px",
            opacity: status === "loading" ? 0.7 : 1,
            cursor: status === "loading" ? "wait" : "pointer",
          }}
          hover={{ background: "var(--blue-700)" }}
        >
          {status === "loading" ? "Sending…" : buttonLabel}
        </Hover>
      </form>
      {status === "error" && (
        <div style={{ fontSize: "12.5px", color: "#D92D20", marginTop: "8px" }}>
          {error}
        </div>
      )}
    </div>
  );
}

/* ---- ROI math (ported verbatim from the source component) ---- */
const RATES = { USD: 1, INR: 83, EUR: 0.92 };
const SYM = { USD: "$", INR: "₹", EUR: "€" };

function fmtCurrency(n, currency) {
  return Math.round(n * RATES[currency]).toLocaleString();
}

function computeROI(s) {
  const { quotesPerDay, teamSize, hoursPerDay, currency } = s;
  const workingDays = 22;
  const hourlyCost = 28;
  const marginPerQuote = 42;
  const hoursSavedPerOp = Math.round(hoursPerDay * workingDays * 0.75);
  const productivity = Math.min(85, Math.round(30 + quotesPerDay / 3));
  const moreQuotes = Math.round((hoursSavedPerOp * teamSize) / 0.3);
  const annualLaborSavings = hoursSavedPerOp * teamSize * 12 * hourlyCost;
  const annualRevenueLift = Math.round(moreQuotes * marginPerQuote * 12 * 0.15);
  const annual = annualLaborSavings + annualRevenueLift;
  const revLiftMonthly = Math.round(annualRevenueLift / 12);
  return {
    hoursSaved: hoursSavedPerOp,
    productivity,
    moreQuotes,
    annualSavings: fmtCurrency(annual, currency),
    revenueLift: fmtCurrency(revLiftMonthly, currency),
    currency: SYM[currency],
  };
}

const ROI_INPUTS = [
  {
    key: "quotesPerDay",
    label: "Quotations per day",
    min: 1,
    max: 100,
    step: 1,
    unit: "",
  },
  {
    key: "teamSize",
    label: "Team on the pricing desk",
    min: 1,
    max: 20,
    step: 1,
    unit: "",
  },
  {
    key: "hoursPerDay",
    label: "Hours spent quoting / day / operator",
    min: 1,
    max: 10,
    step: 0.5,
    unit: " hrs",
  },
  {
    key: "shipmentsPerMonth",
    label: "Shipments handled / month",
    min: 20,
    max: 2000,
    step: 20,
    unit: "",
  },
  {
    key: "rfqsPerMonth",
    label: "RFQs processed / month",
    min: 0,
    max: 200,
    step: 5,
    unit: "",
  },
];

/* ---- Content data (ported from the source) ---- */
// Beta partner marks, same as the testimonials section on /rfq.
const TRUST_LOGOS = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

const PAINS = [
  {
    n: "01",
    title: "The pricing sheet lives on version 14",
    body: 'Every operator has a "final_v3_actualfinal.xlsx" on their desktop. When the GRI hits, nobody knows whose sheet is right.',
  },
  {
    n: "02",
    title: "RFQs come in five channels",
    body: "Email, WhatsApp, portal, phone, walk-in. Whoever sees it first \”owns\” it, until they don't.",
  },
  {
    n: "03",
    title: "Follow-ups happen when someone remembers",
    body: "Quote sent Tuesday. Customer went quiet. On Friday afternoon, a rep might chase it. Might not.",
  },
  {
    n: "04",
    title: "Surcharges are guessed",
    body: "BAF, CAF, LSS, ISPS, THC. The operator eyeballs. Sometimes the margin evaporates in the surcharge line.",
  },
  {
    n: "05",
    title:
      "The customer who asked three forwarders picks whoever answered first",
    body: "You lost the deal at hour four. You never knew.",
  },
  {
    n: "06",
    title: "Scaling means hiring; nothing else works",
    body: "Double the volume, double the desk. The tools don't leverage anyone.",
  },
];

const BEFORE_ITEMS = [
  { tool: "Outlook", what: "RFQs buried in threads" },
  { tool: "WhatsApp", what: "Rates from three agents" },
  { tool: "Excel v14", what: "Tariffs, out of date" },
  { tool: "Carrier portals", what: "×4 logins, ×4 UIs" },
  { tool: "Word", what: "Quote template, retyped" },
  { tool: "Sticky note", what: '"Follow up Thu"' },
  { tool: "Calculator", what: "Surcharges, by hand" },
];
const AFTER_ITEMS = [
  { tool: "Susea inbox", what: "RFQs classified, drafted, awaiting approval" },
  { tool: "Susea rates", what: "One live tariff surface, every carrier" },
  { tool: "AI drafts", what: "Approve or edit in one screen" },
  { tool: "Auto follow-up", what: "Cadences that recover quiet quotes" },
  { tool: "RFQ auction", what: "Multi-carrier, live, side-by-side" },
  { tool: "Deterministic math", what: "Your surcharges, your rules" },
  { tool: "Audit log", what: "Every draft, every approver, every change" },
];

const AUTOMATIONS = [
  {
    id: "a-01",
    icon: "◆",
    tint: "var(--blue-50)",
    color: "var(--blue-700)",
    title: "AI quotation drafting",
    body: "Inbound RFQ parsed, cargo details extracted, all-in rate drafted from your live tariffs.",
    trigger: "new RFQ · any channel",
  },
  {
    id: "a-02",
    icon: "↺",
    tint: "var(--orange-50)",
    color: "var(--orange-700)",
    title: "Silent-quote recovery",
    body: "Quotes with no reply after 48h get a personalised follow-up before validity expires.",
    trigger: "quote · silent 48h",
  },
  {
    id: "a-03",
    icon: "$",
    tint: "var(--amber-50)",
    color: "var(--amber-600)",
    title: "Rate & GRI alerts",
    body: "Lane surcharge changes ping the operator with impacted open quotes flagged.",
    trigger: "carrier rate change",
  },
  {
    id: "a-04",
    icon: "⇄",
    tint: "var(--blue-50)",
    color: "var(--blue-700)",
    title: "RFQ broadcast",
    body: "Send a lane to your carrier network with one click; responses come back to one table.",
    trigger: "RFQ · broadcast",
  },
  {
    id: "a-05",
    icon: "✓",
    tint: "var(--good-50)",
    color: "var(--good-600)",
    title: "Auto-approval routing",
    body: "Quotes above margin threshold auto-approve; below-threshold route to a named approver.",
    trigger: "quote · draft ready",
  },
  {
    id: "a-06",
    icon: "⌘",
    tint: "var(--orange-50)",
    color: "var(--orange-700)",
    title: "Tariff intake",
    body: "Carrier PDFs, XLS, emails, WhatsApp forwards, auto-parsed into your rate table.",
    trigger: "tariff · new file",
  },
  {
    id: "a-07",
    icon: "⋯",
    tint: "var(--amber-50)",
    color: "var(--amber-600)",
    title: "Award & contract handoff",
    body: "When a customer awards, contract terms flow into spot pricing automatically.",
    trigger: "RFQ · awarded",
  },
  {
    id: "a-08",
    icon: "⚑",
    tint: "var(--blue-50)",
    color: "var(--blue-700)",
    title: "Margin leak detection",
    body: "Nightly sweep flags quotes where surcharge drift ate more than 1.5% of margin.",
    trigger: "nightly · 02:00",
  },
];

const DASH_ROWS = [
  {
    id: "Q-2416",
    lane: "INNSA→NLRTM",
    price: "$1,420",
    delta: "▼ 4.2%",
    dcolor: "var(--good-500)",
    status: "Ready",
    stint: "var(--good-50)",
    scolor: "var(--good-600)",
  },
  {
    id: "Q-2415",
    lane: "AEJEA→CNSHA",
    price: "$2,180",
    delta: "▲ 1.1%",
    dcolor: "var(--bad-500)",
    status: "Draft",
    stint: "var(--blue-50)",
    scolor: "var(--blue-700)",
  },
  {
    id: "Q-2414",
    lane: "USLAX→INNSA",
    price: "$3,050",
    delta: "-",
    dcolor: "var(--ink-3)",
    status: "Sent",
    stint: "var(--paper-3)",
    scolor: "var(--ink-2)",
  },
  {
    id: "Q-2413",
    lane: "SGSIN→NLRTM",
    price: "$1,890",
    delta: "▼ 2.4%",
    dcolor: "var(--good-500)",
    status: "Won",
    stint: "var(--good-50)",
    scolor: "var(--good-600)",
  },
  {
    id: "Q-2412",
    lane: "CNSHA→USLAX",
    price: "$2,410",
    delta: "▲ 3.8%",
    dcolor: "var(--bad-500)",
    status: "Chasing",
    stint: "var(--amber-50)",
    scolor: "var(--amber-600)",
  },
];

const STATS_TOP = [
  {
    big: "90%",
    label: "Faster quotation creation",
    tint: "var(--blue-50)",
    color: "var(--blue-600)",
    icon: "↑",
  },
  {
    big: "32%",
    label: "Quotes recovered before expiring",
    tint: "var(--amber-50)",
    color: "var(--amber-600)",
    icon: "↺",
  },
  {
    big: "400+",
    label: "Quotes drafted by Susea · last 30d",
    tint: "var(--orange-50)",
    color: "var(--orange-600)",
    icon: "◆",
  },
  {
    big: "6",
    label: "Beta forwarders live in production",
    tint: "var(--good-50)",
    color: "var(--good-500)",
    icon: "●",
  },
];
const STATS_ROW = [
  {
    big: "18→90",
    unit: "min → sec",
    label: "Time to send a customer-ready quote",
  },
  { big: "8", unit: "countries", label: "Beta customers on three continents" },
  {
    big: "12+",
    unit: "RFQs / week",
    label: "Multi-carrier auctions run by the cohort",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Susea took my Monday back. My team was starting the week eight quotes behind. Now we open the console and everything's already drafted, just waiting for us to read and send.",
    metric: "−14 hrs / week",
    metricLabel: "time on the pricing desk",
    metricColor: "var(--good-500)",
    name: "Priya S.",
    title: "Head of Operations, Meridian Freight (India)",
    initials: "PS",
    avatarA: "#4A82D9",
    avatarB: "#8FB3EC",
  },
  {
    quote:
      "The follow-up automation alone paid for the whole quarter. We were losing quotes to silence; Susea chases them with copy that actually sounds like us.",
    metric: "+21%",
    metricLabel: "win rate on quoted RFQs",
    metricColor: "var(--blue-700)",
    name: "Ahmed K.",
    title: "Founder, Sable NVOCC (UAE)",
    initials: "AK",
    avatarA: "#F07020",
    avatarB: "#F5A000",
  },
  {
    quote:
      "We're a five-person shop competing with 200-person forwarders on ocean pricing. Susea is how we quote as fast as they do without adding headcount.",
    metric: "3× quotes",
    metricLabel: "per operator, no hires",
    metricColor: "var(--orange-600)",
    name: "Marta L.",
    title: "Commercial Lead, BluePort Logistics (NL)",
    initials: "ML",
    avatarA: "#F5A000",
    avatarB: "#F07020",
  },
];

const COMPARE_ROWS = [
  {
    cap: "Time to send a quote",
    trad: "15–30 min · switching between five tools",
    susea: "< 90s · one screen, human approval",
  },
  {
    cap: "Manual work per quote",
    trad: "Retype cargo details, look up rate, calculate surcharges, format email",
    susea: "Review the draft. Adjust if needed. Approve. Send.",
  },
  {
    cap: "RFQ management",
    trad: "Excel with a tab per carrier · email back and forth · lost threads",
    susea: "One table · every carrier response · live status · one-click award",
  },
  {
    cap: "Automation",
    trad: "None; every step is a person",
    susea: "8 workflows out of the box · every trigger auditable, editable",
  },
  {
    cap: "Follow-ups",
    trad: "When someone remembers · often too late",
    susea: "Auto-cadence · silent quotes chased before validity expires",
  },
  {
    cap: "Visibility",
    trad: '"Where\'s Q-2416?": check three inboxes',
    susea: "Live dashboard · every quote, every version, every touch logged",
  },
  {
    cap: "Team collaboration",
    trad: "Forward the thread, hope they see it",
    susea: "Shared workspace · assign, comment, approve inline",
  },
  {
    cap: "Productivity per operator",
    trad: "15–20 quotes / day at peak, burnout at 30",
    susea: "60+ quotes / day with the desk still at 5pm sharp",
  },
  {
    cap: "Scaling to 2×",
    trad: "Hire another operator",
    susea: "Turn on a second lane in the same afternoon",
  },
];

const INSIGHTS = [
  {
    stat: "68%",
    claim:
      "of logistics execs say manual quotation is their #1 operational bottleneck.",
    source: "Freightwaves logistics ops survey, 2024",
    tint: "var(--blue-50)",
    color: "var(--blue-700)",
  },
  {
    stat: "3.2×",
    claim:
      "faster response time correlates with a 3.2× uplift in RFQ win rate.",
    source: "McKinsey · freight forwarding digital shift",
    tint: "var(--amber-50)",
    color: "var(--amber-600)",
  },
  {
    stat: "$1.6T",
    claim: "in global freight spend is still priced on spreadsheets and email.",
    source: "Statista · global freight forwarding 2025",
    tint: "var(--orange-50)",
    color: "var(--orange-600)",
  },
];

const DAYS = [
  {
    day: "Mon",
    date: "4",
    slots: "3 open",
    bg: "#fff",
    border: "var(--line)",
    textColor: "var(--ink)",
  },
  {
    day: "Tue",
    date: "5",
    slots: "Full",
    bg: "var(--paper-3)",
    border: "var(--line-soft)",
    textColor: "var(--ink-4)",
  },
  {
    day: "Wed",
    date: "6",
    slots: "4 open",
    bg: "#fff",
    border: "var(--line)",
    textColor: "var(--ink)",
  },
  {
    day: "Thu",
    date: "7",
    slots: "2 open",
    bg: "var(--blue-50)",
    border: "var(--blue-500)",
    textColor: "var(--blue-700)",
  },
  {
    day: "Fri",
    date: "8",
    slots: "5 open",
    bg: "#fff",
    border: "var(--line)",
    textColor: "var(--ink)",
  },
];
const SLOTS = ["10:00", "11:30", "14:00", "16:30"];

const FAQ_DATA = [
  {
    q: "How long does implementation take?",
    a: "The beta cohort onboards in 3–5 business days. A founder walks your ops lead through connecting carriers, importing your tariff sheet, and setting up your first two automations. You send real quotes from day one.",
  },
  {
    q: "Will this fit our existing workflow, or do we rip stuff out?",
    a: "Nothing to rip out. Susea sits alongside your CRM, email, and WhatsApp; it reads inbound RFQs, generates the quote, and hands off to whatever you already use downstream. Most beta customers still use their existing accounting and shipment tracking tools.",
  },
  {
    q: "How does the team learn to use it?",
    a: "One 45-minute onboarding session per team, plus a shared Slack/WhatsApp channel with the founding team. Your operators are drafting live quotes by end of day one. There is no certification to pass.",
  },
  {
    q: "Is our tariff data secure?",
    a: "Yes, your data lives in a single-tenant, EU/US region of your choice. TLS 1.3 in transit, AES-256 at rest, SOC 2 Type II underway. We do not train on your rates. You can delete your workspace at any time and we return the data.",
  },
  {
    q: "Which carriers and integrations are supported?",
    a: "Most major carriers (MSC, Maersk, CMA CGM, Hapag-Lloyd, COSCO, Evergreen, HMM, ONE, ZIM, Yang Ming, and 14+ more). We ingest their tariffs from PDF, XLS, email, and WhatsApp forwards. CRM: HubSpot, Salesforce, Pipedrive. Email: Outlook, Gmail. Accounting: Zoho, QuickBooks. Missing yours? We build it during onboarding.",
  },
  {
    q: "What is beta pricing? Does it get more expensive later?",
    a: "Beta customers lock in founding-cohort pricing for 24 months from signup. No surprise increases. When we exit beta, standard pricing applies to new customers, not to you.",
  },
  {
    q: "What kind of support do we get?",
    a: "A shared channel with the founding team. Median first response under 30 minutes during business hours. Every customer has a named founder as their point of contact for the first 90 days.",
  },
];

/* Small reusable style atom from the source. */
const checkDot = {
  width: "22px",
  height: "22px",
  borderRadius: "50%",
  background: "var(--good-50)",
  color: "var(--good-600)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "13px",
  fontWeight: 700,
  flexShrink: 0,
};

/* Single source of truth for an automation card; rendered both in the
   desktop grid and in the ≤768px Embla slider so the two never drift. */
function renderAutomationCard(a, flat = false) {
  const cardBase = {
    background: "#fff",
    border: "1px solid var(--line)",
    borderRadius: "14px",
    padding: "22px",
    position: "relative",
    transition: "transform .2s,box-shadow .2s",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  };
  const body = (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: `linear-gradient(135deg,${a.tint} 0%,#fff 100%)`,
            color: a.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: 700,
            border: "1px solid var(--line-soft)",
          }}
        >
          {a.icon}
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--ink-4)",
            fontWeight: 600,
            padding: "3px 7px",
            borderRadius: "6px",
            background: "var(--paper-2)",
          }}
        >
          {a.id}
        </div>
      </div>
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: "16px",
          color: "var(--ink)",
          marginBottom: "8px",
          letterSpacing: "-.01em",
          lineHeight: 1.3,
        }}
      >
        {a.title}
      </div>
      <div
        style={{
          fontSize: "13.5px",
          color: "var(--ink-2)",
          lineHeight: 1.5,
          marginBottom: "16px",
        }}
      >
        {a.body}
      </div>
      <div
        style={{
          marginTop: "auto",
          paddingTop: "14px",
          borderTop: "1px dashed var(--line)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--ink-3)",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--good-500)",
            boxShadow: "0 0 0 3px rgba(31,157,107,.15)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          trigger → {a.trigger}
        </span>
      </div>
    </>
  );
  // ≤768px slider (flat): no hover lift; the translateY was being clipped by
  // the slide's overflow. Desktop grid keeps the interactive hover.
  if (flat) {
    return (
      <div key={a.id} style={cardBase}>
        {body}
      </div>
    );
  }
  return (
    <Hover
      key={a.id}
      base={cardBase}
      hover={{
        transform: "translateY(-4px)",
        boxShadow: "var(--shadow-lg)",
        borderColor: "var(--blue-300)",
      }}
    >
      {body}
    </Hover>
  );
}

function renderTestimonialCard(t) {
  return (
    <div
      className="testi-card"
      key={t.name}
      style={{
        background: "#fff",
        border: "1px solid var(--line)",
        borderRadius: "16px",
        padding: "28px",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        className="testi-mark"
        style={{
          fontSize: "36px",
          color: "var(--amber-500)",
          lineHeight: 1,
          marginBottom: "14px",
        }}
      >
        &ldquo;
      </div>
      <p
        className="testi-quote"
        style={{
          fontSize: "16px",
          lineHeight: 1.55,
          color: "var(--ink)",
          margin: "0 0 20px",
          flex: 1,
        }}
      >
        {t.quote}
      </p>
      <div
        className="testi-metric"
        style={{
          padding: "14px",
          borderRadius: "12px",
          background: "var(--paper-2)",
          border: "1px solid var(--line-soft)",
          marginBottom: "18px",
        }}
      >
        <div
          className="ds-mono testi-metric-num"
          style={{ fontSize: "28px", fontWeight: 700, color: t.metricColor }}
        >
          {t.metric}
        </div>
        <div
          className="testi-metric-label"
          style={{
            fontSize: "12.5px",
            color: "var(--ink-3)",
            marginTop: "2px",
          }}
        >
          {t.metricLabel}
        </div>
      </div>
      <div
        className="testi-author"
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          paddingTop: "16px",
          borderTop: "1px solid var(--line-soft)",
        }}
      >
        <div
          className="testi-avatar"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: `linear-gradient(135deg,${t.avatarA},${t.avatarB})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: "14px",
          }}
        >
          {t.initials}
        </div>
        <div>
          <div
            className="testi-name"
            style={{ fontWeight: 600, fontSize: "14px", color: "var(--ink)" }}
          >
            {t.name}
          </div>
          <div
            className="testi-title"
            style={{ fontSize: "12.5px", color: "var(--ink-3)" }}
          >
            {t.title}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Chevron glyphs for the slider nav (this page has no shared icon component). */
function Chevron({ dir }) {
  const d = dir === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6";
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

/* ≤768px swipe slider for the automation cards; mirrors the spot-rate /
   main-page Features slider. Isolated so Embla's drag/select state re-renders
   only the slider, not the large page tree (keeps the swipe smooth). */
function AutomationsSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
  });
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
          {AUTOMATIONS.map((a) => (
            <div className="feat-slide" key={a.id}>
              {renderAutomationCard(a, true)}
            </div>
          ))}
        </div>
      </div>
      <div className="feat-nav">
        <button
          className="feat-nav-btn"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label="Previous automation"
        >
          <Chevron dir="left" />
        </button>
        <span className="feat-nav-count">
          {index + 1} / {AUTOMATIONS.length}
        </span>
        <button
          className="feat-nav-btn"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label="Next automation"
        >
          <Chevron dir="right" />
        </button>
      </div>
    </div>
  );
}

/* ≤768px auto-scrolling marquee for the testimonial cards; reuses the page's
   .marquee / .marquee-track band (same as "Trusted by beta forwarders"). The
   array is doubled so ffSlideAcross loops seamlessly. Desktop keeps the grid. */
function TestimonialsMarquee() {
  return (
    <div className="testi-marquee marquee">
      <div className="marquee-track">
        {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
          <div className="testi-marquee-item" key={`${t.name}-${i}`}>
            {renderTestimonialCard(t)}
          </div>
        ))}
      </div>
    </div>
  );
}

// Isolated so a slider drag re-renders only the calculator, not the whole page
// (keeps the range sliders lag-free while dragging); matches spot-rate's RoiCalculator.
function RoiCalculator() {
  const [currency, setCurrency] = useState("USD");
  const [roiState, setRoiState] = useState({
    quotesPerDay: 20,
    teamSize: 3,
    hoursPerDay: 4,
    shipmentsPerMonth: 200,
    rfqsPerMonth: 30,
  });
  const roi = computeROI({ ...roiState, currency });
  const rangePct = (v, min, max) => `${((v - min) / (max - min)) * 100}%`;
  const jump = (id) => (e) => {
    e.preventDefault();
    smoothScrollToId(id);
  };

  return (
    <section
      id="roi"
      className="section"
      style={{
        padding: "72px 20px",
        background: "linear-gradient(180deg,#EFF5FE 0%,#FEF6E4 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg,transparent,var(--line-strong),transparent)",
        }}
      />
      <div
        style={{ maxWidth: "1180px", margin: "0 auto", position: "relative" }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            className="ds-eyebrow"
            style={{ color: "var(--blue-600)", marginBottom: "14px" }}
          >
            ROI calculator · your numbers, honest math
          </div>
          <h2
            className="ds-h2"
            style={{ margin: "0 0 16px", textWrap: "balance" }}
          >
            What Susea saves your team this year.
          </h2>
          <p
            className="ds-lead"
            style={{ maxWidth: "640px", margin: "0 auto" }}
          >
            Conservative assumptions, editable inputs. We're not selling 10x;
            we're showing real hours back on the desk.
          </p>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            boxShadow: "var(--shadow-xl)",
            border: "1px solid var(--line)",
            overflow: "hidden",
          }}
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr" }}
            className="grid-2-md"
          >
            {/* Inputs */}
            <div
              style={{
                padding: "40px",
                borderRight: "1px solid var(--line-soft)",
                background: "#fff",
              }}
              className="roi-side"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <h3 className="ds-h3" style={{ margin: 0 }}>
                  Your ops today
                </h3>
                <div
                  style={{
                    display: "inline-flex",
                    background: "var(--paper-2)",
                    border: "1px solid var(--line)",
                    borderRadius: "10px",
                    padding: "2px",
                  }}
                >
                  {["USD", "INR", "EUR"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 600,
                        background:
                          currency === c ? "var(--blue-600)" : "transparent",
                        color: currency === c ? "#fff" : "var(--ink-2)",
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "22px",
                }}
              >
                {ROI_INPUTS.map((i) => (
                  <div key={i.key}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: "8px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "13.5px",
                          fontWeight: 600,
                          color: "var(--ink)",
                        }}
                      >
                        {i.label}
                      </label>
                      <span
                        className="ds-mono"
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "var(--blue-700)",
                        }}
                      >
                        {roiState[i.key]}
                        {i.unit}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={i.min}
                      max={i.max}
                      step={i.step}
                      value={roiState[i.key]}
                      onChange={(e) =>
                        setRoiState((s) => ({
                          ...s,
                          [i.key]: Number(e.target.value),
                        }))
                      }
                      style={{ "--r": rangePct(roiState[i.key], i.min, i.max) }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "4px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--ink-4)",
                      }}
                    >
                      <span>{i.min}</span>
                      <span>{i.max}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outputs */}
            <div
              style={{
                padding: "40px",
                background: "linear-gradient(180deg,#F7FAFE 0%,#FEF6E4 100%)",
              }}
              className="roi-side"
            >
              <h3 className="ds-h3" style={{ margin: "0 0 20px" }}>
                With Susea, you'd get back:
              </h3>

              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "14px",
                  padding: "24px",
                  marginBottom: "16px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background:
                      "linear-gradient(90deg,var(--blue-500),var(--orange-500),var(--amber-500))",
                  }}
                />
                <div
                  className="ds-eyebrow"
                  style={{ color: "var(--ink-3)", marginBottom: "8px" }}
                >
                  Estimated annual cost savings
                </div>
                <div
                  className="ds-mono ff-roi-total"
                  style={{
                    fontSize: "56px",
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: "-.03em",
                    color: "var(--ink)",
                    transition: "opacity .2s",
                  }}
                >
                  {roi.currency}
                  {roi.annualSavings}
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "13.5px",
                    color: "var(--ink-3)",
                  }}
                >
                  Based on operator hours, quote volume &amp; response-time
                  revenue lift.
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: "12px",
                    padding: "16px",
                  }}
                >
                  <div
                    className="ds-mono"
                    style={{
                      fontSize: "26px",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    {roi.hoursSaved}
                    <span
                      style={{
                        fontSize: "14px",
                        color: "var(--ink-3)",
                        fontWeight: 500,
                      }}
                    >
                      {" "}
                      hrs
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--ink-3)",
                      marginTop: "2px",
                    }}
                  >
                    Saved per operator / month
                  </div>
                </div>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: "12px",
                    padding: "16px",
                  }}
                >
                  <div
                    className="ds-mono"
                    style={{
                      fontSize: "26px",
                      fontWeight: 600,
                      color: "var(--good-500)",
                    }}
                  >
                    +{roi.productivity}%
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--ink-3)",
                      marginTop: "2px",
                    }}
                  >
                    Productivity gain
                  </div>
                </div>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: "12px",
                    padding: "16px",
                  }}
                >
                  <div
                    className="ds-mono"
                    style={{
                      fontSize: "26px",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    +{roi.moreQuotes}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--ink-3)",
                      marginTop: "2px",
                    }}
                  >
                    Extra quotes / month capacity
                  </div>
                </div>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: "12px",
                    padding: "16px",
                  }}
                >
                  <div
                    className="ds-mono"
                    style={{
                      fontSize: "26px",
                      fontWeight: 600,
                      color: "var(--orange-600)",
                    }}
                  >
                    {roi.currency}
                    {roi.revenueLift}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--ink-3)",
                      marginTop: "2px",
                    }}
                  >
                    Revenue lift · faster response
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "var(--ink)",
                  color: "#fff",
                  borderRadius: "14px",
                  padding: "20px 22px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "15px",
                      marginBottom: "2px",
                    }}
                  >
                    See this on your own numbers.
                  </div>
                  <div
                    style={{ fontSize: "13px", color: "rgba(255,255,255,.7)" }}
                  >
                    A founder walks you through a 20-minute setup on your live
                    quotes.
                  </div>
                </div>
                <Hover
                  as="a"
                  href="#waitlist"
                  onClick={jump("waitlist")}
                  base={{
                    padding: "12px 18px",
                    borderRadius: "10px",
                    background: "var(--orange-500)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "var(--shadow-orange)",
                  }}
                  hover={{
                    background: "var(--orange-600)",
                    transform: "translateY(-1px)",
                  }}
                >
                  Request beta access →
                </Hover>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              flexWrap: "wrap",
              gap: "8px",
              alignItems: "center",
              padding: "12px 16px",
              borderRadius: "12px",
              background: "#fff",
              border: "1px solid var(--amber-100)",
              boxShadow: "var(--shadow-xs)",
            }}
          >
            <span
              style={{
                fontSize: "10.5px",
                fontWeight: 700,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "var(--amber-600)",
                padding: "3px 8px",
                borderRadius: "999px",
                background: "var(--amber-50)",
              }}
            >
              Assumptions
            </span>
            {[
              ["$28/hr", " operator loaded cost"],
              ["3.5%", " avg. margin per quote"],
              ["22", " working days"],
            ].map(([b, t]) => (
              <span
                key={b}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12.5px",
                  color: "var(--ink-2)",
                  padding: "3px 10px",
                  borderRadius: "8px",
                  background: "var(--paper-2)",
                  border: "1px solid var(--line-soft)",
                }}
              >
                <strong style={{ color: "var(--ink)" }}>{b}</strong>
                {t}
              </span>
            ))}
            <span
              style={{
                fontSize: "11px",
                color: "var(--ink-3)",
                fontStyle: "italic",
              }}
            >
              deliberately on the conservative side.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FreightForwardingPage() {
  const [barVisible, setBarVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [openPain, setOpenPain] = useState(0); // mobile-only accordion for pain cards

  // Exit-intent: fires once when the pointer leaves the top of the viewport.
  useEffect(() => {
    let fired = false;
    const onLeave = (e) => {
      if (fired) return;
      if (e.clientY <= 0) {
        fired = true;
        setExitOpen(true);
      }
    };
    document.addEventListener("mouseleave", onLeave);
    return () => document.removeEventListener("mouseleave", onLeave);
  }, []);

  const jump = (id) => (e) => {
    e.preventDefault();
    smoothScrollToId(id);
  };
  const toTop = (e) => {
    e.preventDefault();
    smoothScrollToTop();
  };
  const inert = (e) => e.preventDefault(); // visual-only forms/CTAs
  const openCalendly = (e) => {
    e.preventDefault();
    window.open(CALENDLY_URL, "_blank", "noopener");
  };

  return (
    <div className="freight-forwarding-page">
      {/* ============ 1+2. STICKY HEADER STACK (announcement bar + nav) ============
         Both live in one sticky wrapper so the nav always sits BELOW the bar
         instead of pinning to the same top:0 and sliding behind it. When the
         bar is dismissed, only the nav remains, still sticky. */}
      <div style={{ position: "sticky", top: 0, zIndex: 60 }}>
        {/* ---- Announcement bar ---- */}
        {barVisible && (
          <div
            style={{
              background:
                "linear-gradient(90deg,#0E1726 0%,#1a2540 55%,#2F6BD8 100%)",
              color: "#fff",
              fontFamily: "var(--font-sans)",
            }}
          >
            <div
              style={{
                maxWidth: "1280px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "9px 16px",
                fontSize: "13.5px",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: "rgba(245,160,0,.18)",
                  color: "#FFCB6B",
                  fontWeight: 600,
                  fontSize: "11px",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  border: "1px solid rgba(245,160,0,.35)",
                  flexShrink: 0,
                }}
              >
                <span
                  className="live-dot"
                  style={{
                    background: "#F5A000",
                    boxShadow: "0 0 0 4px rgba(245,160,0,.25)",
                  }}
                />
                Beta · live
              </span>
              <span style={{ opacity: 0.95 }} className="sticky-bar-text">
                <strong style={{ color: "#fff" }}>4 slots</strong> this month:
                the founding team personally onboards every customer.
              </span>
              <span
                style={{ opacity: 0.95, fontSize: "12.5px" }}
                className="show-md-only mobile-sm-text"
              >
                <strong style={{ color: "#fff" }}>4 slots</strong> left this
                month.
              </span>
              <a
                href="#booking"
                onClick={jump("booking")}
                style={{
                  marginLeft: "auto",
                  color: "#fff",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  borderBottom: "1px solid rgba(255,255,255,.4)",
                  paddingBottom: "2px",
                  fontSize: "13px",
                  flexShrink: 0,
                }}
              >
                Book <span aria-hidden="true">→</span>
              </a>
              <button
                onClick={() => setBarVisible(false)}
                aria-label="Dismiss"
                style={{
                  color: "rgba(255,255,255,.7)",
                  fontSize: "20px",
                  lineHeight: 1,
                  padding: "0 4px",
                  flexShrink: 0,
                }}
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* ---- Nav ---- */}
        <header
          data-su-nav
          style={{
            background: "rgba(255,255,255,.78)",
            backdropFilter: "blur(14px) saturate(140%)",
            WebkitBackdropFilter: "blur(14px) saturate(140%)",
            borderBottom: "1px solid var(--line-soft)",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              gap: "24px",
              padding: "14px 20px",
            }}
          >
            <div style={{ display: "flex" }}>
              <a
                href="#top"
                onClick={toTop}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img
                  src="/assets/susea-mark-black.png"
                  alt="Susea"
                  style={{ height: "28px", width: "auto" }}
                />
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "20px",
                    letterSpacing: "-.02em",
                    color: "var(--ink)",
                  }}
                >
                  Susea
                </span>
              </a>
            </div>
            <nav
              style={{
                flex: 1,
                display: "flex",
                gap: "22px",
                justifyContent: "center",
              }}
              className="hide-md"
            >
              <Hover
                as="a"
                href="/rfq"
                base={{
                  fontSize: "14px",
                  color: "var(--ink-2)",
                  fontWeight: 500,
                }}
                hover={{ color: "var(--ink)" }}
              >
                RFQ
              </Hover>
              <Hover
                as="a"
                href="/automations"
                base={{
                  fontSize: "14px",
                  color: "var(--ink-2)",
                  fontWeight: 500,
                }}
                hover={{ color: "var(--ink)" }}
              >
                Automations
              </Hover>
              <Hover
                as="a"
                href="/pricing"
                base={{
                  fontSize: "14px",
                  color: "var(--ink-2)",
                  fontWeight: 500,
                }}
                hover={{ color: "var(--ink)" }}
              >
                Pricing
              </Hover>
              <Hover
                as="a"
                href="#roi"
                onClick={jump("roi")}
                base={{
                  fontSize: "14px",
                  color: "var(--ink-2)",
                  fontWeight: 500,
                }}
                hover={{ color: "var(--ink)" }}
              >
                ROI calculator
              </Hover>
              <Hover
                as="a"
                href="#why-susea"
                onClick={jump("why-susea")}
                base={{
                  fontSize: "14px",
                  color: "var(--ink-2)",
                  fontWeight: 500,
                }}
                hover={{ color: "var(--ink)" }}
              >
                Why Susea
              </Hover>
              <Hover
                as="a"
                href="#faq"
                onClick={jump("faq")}
                base={{
                  fontSize: "14px",
                  color: "var(--ink-2)",
                  fontWeight: 500,
                }}
                hover={{ color: "var(--ink)" }}
              >
                FAQ
              </Hover>
            </nav>
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Hover
                as="a"
                href="#waitlist"
                onClick={jump("waitlist")}
                className="hide-md"
                base={{
                  fontSize: "14px",
                  color: "var(--ink)",
                  fontWeight: 600,
                  padding: "9px 14px",
                  borderRadius: "10px",
                  border: "1px solid var(--line-strong)",
                  background: "#fff",
                }}
                hover={{ background: "var(--paper-2)" }}
              >
                Request beta access
              </Hover>
              <Hover
                as="a"
                href="#booking"
                onClick={jump("booking")}
                base={{
                  fontSize: "14px",
                  color: "#fff",
                  fontWeight: 600,
                  padding: "10px 16px",
                  borderRadius: "10px",
                  background: "var(--blue-600)",
                  boxShadow: "var(--shadow-blue)",
                }}
                hover={{
                  background: "var(--blue-700)",
                  transform: "translateY(-1px)",
                }}
              >
                Book a demo
              </Hover>
              <button
                type="button"
                className="ff-hamburger"
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
                {menuOpen ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.85"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.85"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div
              className="ff-mobile-menu"
              style={{
                borderTop: "1px solid var(--line-soft)",
                background: "rgba(255,255,255,.98)",
                backdropFilter: "saturate(140%) blur(14px)",
                WebkitBackdropFilter: "saturate(140%) blur(14px)",
                padding: "10px 20px 18px",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                animation: "ffFadeUp .18s ease-out",
              }}
            >
              {[
                ["/rfq", "RFQ"],
                ["/automations", "Automations"],
                ["/pricing", "Pricing"],
                ["#roi", "ROI calculator"],
                ["#why-susea", "Why Susea"],
                ["#faq", "FAQ"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="ff-menu-link"
                  onClick={(e) => {
                    setMenuOpen(false);
                    if (href.startsWith("#")) jump(href.slice(1))(e);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 14px",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    borderRadius: "12px",
                  }}
                >
                  <span>{label}</span>
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.85"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </header>
      </div>

      <div id="top" />

      {/* ============ 3. HERO ============ */}
      <section
        className="section"
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "56px 20px 72px",
          background:
            "linear-gradient(180deg,#EFF5FE 0%,#F7F9FC 60%,#fff 100%)",
        }}
      >
        <div className="hero-glow-a" />
        <div className="hero-glow-b" />
        <div className="hero-grid" />

        <div
          style={{
            position: "relative",
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.05fr .95fr",
            gap: "56px",
            alignItems: "center",
          }}
          className="grid-2-md"
        >
          <div className="fade-up">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 12px",
                borderRadius: "999px",
                background: "#fff",
                border: "1px solid var(--line)",
                boxShadow: "var(--shadow-xs)",
                marginBottom: "20px",
              }}
            >
              <span className="live-dot" />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "var(--ink-2)",
                }}
              >
                Beta cohort · priority onboarding
              </span>
            </div>
            <h1
              className="hero-h1"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "clamp(40px,5.4vw,68px)",
                lineHeight: 1.02,
                letterSpacing: "-.035em",
                color: "var(--ink)",
                margin: "0 0 20px",
                textWrap: "balance",
              }}
            >
              Your ops team stops chasing rates.
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(120deg,var(--blue-600) 0%,var(--orange-500) 60%,var(--amber-500) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Susea handles the quote.
              </span>
            </h1>
            <p
              style={{
                fontSize: "19px",
                lineHeight: 1.55,
                color: "var(--ink-2)",
                margin: "0 0 32px",
                maxWidth: "580px",
                textWrap: "pretty",
              }}
            >
              The AI operating system for modern freight forwarders. Turn RFQs,
              WhatsApp threads and carrier PDFs into customer-ready quotes in{" "}
              <strong
                style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}
              >
                &lt; 90 seconds
              </strong>
              , while your pricing math stays deterministic and yours.
            </p>
            <div
              className="hero-cta-row"
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "28px",
              }}
            >
              <Hover
                as="a"
                href="#booking"
                onClick={jump("booking")}
                className="hero-cta"
                base={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "15px 24px",
                  borderRadius: "12px",
                  background: "var(--blue-600)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "16px",
                  boxShadow: "var(--shadow-blue)",
                }}
                hover={{
                  background: "var(--blue-700)",
                  transform: "translateY(-2px)",
                }}
              >
                Book a live demo{" "}
                <span aria-hidden="true" className="hero-cta-arrow">
                  →
                </span>
              </Hover>
              <Hover
                as="a"
                href="#waitlist"
                onClick={jump("waitlist")}
                className="hero-cta"
                base={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "15px 22px",
                  borderRadius: "12px",
                  background: "#fff",
                  color: "var(--ink)",
                  fontWeight: 600,
                  fontSize: "16px",
                  border: "1px solid var(--line-strong)",
                }}
                hover={{
                  background: "var(--paper-2)",
                  borderColor: "var(--blue-500)",
                }}
              >
                Request beta access
              </Hover>
            </div>
            <div
              style={{
                display: "flex",
                gap: "18px",
                flexWrap: "wrap",
                fontSize: "13px",
                color: "var(--ink-3)",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ color: "var(--good-500)", fontWeight: 700 }}>
                  ✓
                </span>{" "}
                20-minute call with a founder
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ color: "var(--good-500)", fontWeight: 700 }}>
                  ✓
                </span>{" "}
                Beta pricing locked in
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ color: "var(--good-500)", fontWeight: 700 }}>
                  ✓
                </span>{" "}
                Works with your existing carriers
              </span>
            </div>
          </div>

          {/* Hero quotation card mockup */}
          <div style={{ position: "relative" }} className="hero-card-wrap">
            <div
              className="hero-ai-chip"
              style={{
                position: "absolute",
                top: "-18px",
                left: "-16px",
                padding: "8px 12px",
                borderRadius: "999px",
                background: "#fff",
                border: "1px solid var(--line)",
                boxShadow: "var(--shadow-md)",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--ink-2)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                zIndex: 3,
                animation: "ffBob 6s ease-in-out infinite",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "var(--amber-50)",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--amber-600)",
                }}
              >
                ◆
              </span>
              AI drafted · 84s
            </div>
            <div
              style={{
                borderRadius: "20px",
                background: "#fff",
                border: "1px solid var(--line)",
                boxShadow: "var(--shadow-xl)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "4px",
                  background:
                    "linear-gradient(90deg,var(--blue-500) 0%,var(--orange-500) 55%,var(--amber-500) 100%)",
                }}
              />
              <div
                style={{
                  padding: "18px 22px",
                  borderBottom: "1px solid var(--line-soft)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span
                  className="mock-dots"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#F26D64",
                    }}
                  />
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#F5C144",
                    }}
                  />
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#4BC17D",
                    }}
                  />
                </span>
                <span
                  className="mock-url"
                  style={{
                    marginLeft: "10px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    color: "var(--ink-3)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  susea.app / quotes / Q-2416
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "3px 9px",
                    borderRadius: "999px",
                    background: "var(--good-50)",
                    color: "var(--good-600)",
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  Ready to send
                </span>
              </div>
              <div style={{ padding: "22px 24px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                        color: "var(--ink-3)",
                        marginBottom: "6px",
                      }}
                    >
                      Quotation Q-2416
                    </div>
                    <div
                      className="mock-title"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "22px",
                        fontWeight: 600,
                        letterSpacing: "-.02em",
                      }}
                    >
                      Acme Textiles: INNSA → NLRTM
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "var(--ink-3)",
                        marginTop: "4px",
                      }}
                    >
                      2 × 40'HC · Cotton yarn · Sailing 12 Aug
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--ink-3)",
                        textTransform: "uppercase",
                        letterSpacing: ".08em",
                      }}
                    >
                      All-in / cntr
                    </div>
                    <div
                      className="ds-mono mock-price"
                      style={{
                        fontSize: "26px",
                        fontWeight: 600,
                        color: "var(--ink)",
                      }}
                    >
                      $1,420
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        color: "var(--good-500)",
                        marginTop: "2px",
                      }}
                    >
                      ▼ 4.2% vs last quote
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: "8px",
                    margin: "16px 0 12px",
                  }}
                >
                  {[
                    ["Carrier", "MSC", false],
                    ["Transit", "21 days", true],
                    ["Validity", "14 Aug", true],
                  ].map(([k, v, mono]) => (
                    <div
                      key={k}
                      style={{
                        border: "1px solid var(--line)",
                        borderRadius: "10px",
                        padding: "10px 12px",
                        background: "var(--paper-2)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "10px",
                          color: "var(--ink-3)",
                          textTransform: "uppercase",
                          letterSpacing: ".08em",
                          fontWeight: 700,
                        }}
                      >
                        {k}
                      </div>
                      <div
                        className={mono ? "ds-mono" : undefined}
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "var(--ink)",
                          marginTop: "2px",
                        }}
                      >
                        {v}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    borderTop: "1px solid var(--line-soft)",
                    paddingTop: "14px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      color: "var(--ink-3)",
                      marginBottom: "10px",
                    }}
                  >
                    Line items
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "12.5px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Ocean freight</span>
                      <span>$980</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>BAF · bunker</span>
                      <span>$210</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>THC origin</span>
                      <span>$140</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "var(--ink-3)",
                      }}
                    >
                      <span>ISPS · LSS</span>
                      <span>$90</span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "16px",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(90deg,#FDF6EB 0%,#FEF0DE 100%)",
                    border: "1px solid #F7D9A8",
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: "#fff",
                      border: "1px solid #F0C77E",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--amber-600)",
                      fontSize: "14px",
                      flexShrink: 0,
                    }}
                  >
                    ◆
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "12.5px",
                        fontWeight: 700,
                        color: "#8A5A0B",
                        marginBottom: "2px",
                      }}
                    >
                      Susea suggests
                    </div>
                    <div
                      style={{
                        fontSize: "12.5px",
                        color: "#8A5A0B",
                        lineHeight: 1.4,
                      }}
                    >
                      Rate on this lane rose ▲ 3.8% yesterday. Send in the next
                      4h; validity expires 14 Aug.
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
                  <Hover
                    as="button"
                    onClick={inert}
                    base={{
                      flex: 1,
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: "var(--orange-500)",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "14px",
                      boxShadow: "var(--shadow-orange)",
                    }}
                    hover={{ background: "var(--orange-600)" }}
                  >
                    Send to customer
                  </Hover>
                  <button
                    onClick={inert}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: "#fff",
                      color: "var(--ink)",
                      fontWeight: 600,
                      fontSize: "14px",
                      border: "1px solid var(--line-strong)",
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                left: "-90px",
                bottom: "24px",
                padding: "10px 14px",
                borderRadius: "14px",
                background: "#fff",
                border: "1px solid var(--line)",
                boxShadow: "var(--shadow-lg)",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                animation: "ffBob 6s ease-in-out infinite",
                animationDelay: "-3s",
                zIndex: 3,
              }}
              className="hide-lg"
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "var(--blue-50)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--blue-600)",
                  fontSize: "16px",
                }}
              >
                ⏱
              </div>
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    color: "var(--ink-3)",
                  }}
                >
                  Follow-up sent
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    color: "var(--ink)",
                    fontWeight: 600,
                  }}
                >
                  Q-2416 · +2h no reply
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. TRUST STRIP ============ */}
      <section
        style={{
          padding: "32px 20px 48px",
          background: "#fff",
          borderBottom: "1px solid var(--line-soft)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              textAlign: "center",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
              marginBottom: "24px",
            }}
          >
            Trusted by beta forwarders across 8 countries
          </div>
          <div className="marquee">
            <div className="marquee-track">
              {TRUST_LOGOS.map((logo, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "44px",
                    padding: "0 24px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: ".02em",
                    color: "var(--ink-3)",
                    border: "1px solid var(--line)",
                    borderRadius: "10px",
                    background: "#fff",
                    whiteSpace: "nowrap",
                    minWidth: "180px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      marginRight: "10px",
                      flexShrink: 0,
                    }}
                  >
                    {logo.logo}
                  </span>
                  {logo.company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. PAIN POINTS ============ */}
      <section
        className="section"
        style={{ padding: "72px 20px", background: "var(--paper-2)" }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              className="ds-eyebrow"
              style={{ color: "var(--orange-500)", marginBottom: "14px" }}
            >
              The hidden cost of manual work
            </div>
            <h2
              className="ds-h2"
              style={{
                margin: "0 0 16px",
                textWrap: "balance",
                maxWidth: "820px",
                marginInline: "auto",
              }}
            >
              A Monday morning on the pricing desk shouldn't look like this.
            </h2>
            <p
              className="ds-lead"
              style={{ maxWidth: "640px", margin: "0 auto" }}
            >
              You know the shape of the day. Susea knows it too; that's why it
              exists.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr .9fr",
              gap: "40px",
              alignItems: "stretch",
            }}
            className="grid-2-md"
          >
            <div
              className="pain-narrative-card"
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: "18px",
                padding: "36px 40px",
                boxShadow: "var(--shadow-sm)",
                position: "relative",
              }}
            >
              <div
                className="ds-eyebrow"
                style={{ color: "var(--ink-3)", marginBottom: "16px" }}
              >
                08:42 · Monday
              </div>
              <div
                className="pain-narrative"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "22px",
                  lineHeight: 1.5,
                  letterSpacing: "-.01em",
                  color: "var(--ink)",
                  textWrap: "pretty",
                }}
              >
                Your operator opens Outlook.{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(180deg,transparent 60%,var(--amber-50) 60%)",
                  }}
                >
                  47 unread RFQs
                </span>
                , three of them from Friday. WhatsApp: a carrier just posted{" "}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--orange-600)",
                    fontWeight: 600,
                  }}
                >
                  GRI ▲ $150
                </span>{" "}
                on INNSA–NLRTM. Excel opens next; the tariff sheet is on version
                14. By 11am they've built{" "}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--ink)",
                    fontWeight: 600,
                  }}
                >
                  6 quotes
                </span>
                . Two customers already awarded to whoever answered first.
              </div>
              <div
                style={{
                  marginTop: "24px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--line-soft)",
                  display: "flex",
                  gap: "24px",
                  flexWrap: "wrap",
                }}
              >
                {[
                  ["18 min", "Avg. per quote today"],
                  ["32%", "Quotes that will expire silently"],
                  ["0", "Automated follow-ups sent"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <div
                      className="ds-mono pain-stat-num"
                      style={{
                        fontSize: "28px",
                        fontWeight: 600,
                        color: "var(--bad-500)",
                      }}
                    >
                      {v}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--ink-3)",
                        textTransform: "uppercase",
                        letterSpacing: ".08em",
                        fontWeight: 600,
                        marginTop: "2px",
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "12px",
              }}
            >
              {PAINS.map((p, i) => (
                <div
                  key={p.n}
                  onClick={() => setOpenPain(openPain === i ? null : i)}
                  className={"pain-card" + (openPain === i ? " open" : "")}
                  style={{
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: "14px",
                    padding: "16px 18px",
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "var(--bad-50)",
                      color: "var(--bad-600)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      fontSize: "13px",
                      flexShrink: 0,
                    }}
                  >
                    {p.n}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 600,
                        fontSize: "15px",
                        color: "var(--ink)",
                        marginBottom: "3px",
                      }}
                    >
                      {p.title}
                    </div>
                    <div
                      className="pain-body"
                      style={{
                        fontSize: "14px",
                        color: "var(--ink-2)",
                        lineHeight: 1.5,
                      }}
                    >
                      {p.body}
                    </div>
                  </div>
                  <span className="pain-chevron" aria-hidden="true">
                    ⌄
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6. BEFORE / AFTER ============ */}
      <section
        className="section"
        style={{ padding: "72px 20px", background: "#fff" }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div className="ds-eyebrow" style={{ marginBottom: "14px" }}>
              Before Susea · After Susea
            </div>
            <h2
              className="ds-h2"
              style={{
                margin: "0 0 16px",
                textWrap: "balance",
                maxWidth: "820px",
                marginInline: "auto",
              }}
            >
              One surface replaces eleven windows.
            </h2>
            <p
              className="ds-lead"
              style={{ maxWidth: "640px", margin: "0 auto" }}
            >
              Your team keeps the judgement. Susea removes the switching.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              gap: "32px",
              alignItems: "stretch",
            }}
            className="ba-grid"
          >
            {/* BEFORE */}
            <div
              className="ba-card"
              style={{
                borderRadius: "18px",
                padding: "36px 32px",
                background: "linear-gradient(180deg,#FCEDEA 0%,#fff 90%)",
                border: "1px solid #F3CAC2",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="ba-badge"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "5px 12px",
                  borderRadius: "999px",
                  background: "#fff",
                  border: "1px solid #F3CAC2",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "var(--bad-600)",
                  marginBottom: "20px",
                }}
              >
                Before
              </div>
              <h3
                className="ba-h3"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "24px",
                  letterSpacing: "-.02em",
                  color: "var(--ink)",
                  margin: "0 0 20px",
                }}
              >
                Eleven browser tabs and a Monday panic
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  flex: 1,
                }}
              >
                {BEFORE_ITEMS.map((b) => (
                  <div
                    key={b.tool}
                    className="ba-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: "#fff",
                      border: "1px solid var(--line)",
                      fontSize: "14px",
                      color: "var(--ink-2)",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "var(--bad-500)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      className="ba-tool"
                      style={{
                        fontWeight: 500,
                        color: "var(--ink)",
                        flexShrink: 0,
                        minWidth: "120px",
                      }}
                    >
                      {b.tool}
                    </span>
                    <span style={{ color: "var(--ink-3)" }}>{b.what}</span>
                  </div>
                ))}
              </div>
              <div
                className="ba-result"
                style={{
                  marginTop: "24px",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: "#fff",
                  border: "1px dashed var(--bad-500)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  color: "var(--bad-600)",
                }}
              >
                Result: 18 min per quote · quotes go quiet · margin leaks at
                every handoff
              </div>
            </div>

            {/* Arrow */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px",
              }}
              className="hide-md"
            >
              <div
                style={{
                  width: "2px",
                  height: "60px",
                  background:
                    "linear-gradient(180deg,transparent,var(--line-strong))",
                }}
              />
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "#fff",
                  border: "1px solid var(--line)",
                  boxShadow: "var(--shadow-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--blue-600)",
                  fontSize: "22px",
                  fontWeight: 700,
                }}
              >
                →
              </div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                }}
              >
                Susea
              </div>
              <div
                style={{
                  width: "2px",
                  height: "60px",
                  background:
                    "linear-gradient(180deg,var(--line-strong),transparent)",
                }}
              />
            </div>

            {/* AFTER */}
            <div
              className="ba-card"
              style={{
                borderRadius: "18px",
                padding: "36px 32px",
                background: "linear-gradient(180deg,#EEF4FD 0%,#fff 90%)",
                border: "1px solid #C7D8F5",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="ba-badge"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "5px 12px",
                  borderRadius: "999px",
                  background: "#fff",
                  border: "1px solid #C7D8F5",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "var(--blue-700)",
                  marginBottom: "20px",
                }}
              >
                After · with Susea
              </div>
              <h3
                className="ba-h3"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "24px",
                  letterSpacing: "-.02em",
                  color: "var(--ink)",
                  margin: "0 0 20px",
                }}
              >
                One console. Humans still approve, Susea does the rest.
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  flex: 1,
                }}
              >
                {AFTER_ITEMS.map((a) => (
                  <div
                    key={a.tool}
                    className="ba-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: "#fff",
                      border: "1px solid var(--line)",
                      fontSize: "14px",
                      color: "var(--ink-2)",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "var(--good-500)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      className="ba-tool"
                      style={{
                        fontWeight: 500,
                        color: "var(--ink)",
                        flexShrink: 0,
                        minWidth: "120px",
                      }}
                    >
                      {a.tool}
                    </span>
                    <span style={{ color: "var(--ink-3)" }}>{a.what}</span>
                  </div>
                ))}
              </div>
              <div
                className="ba-result"
                style={{
                  marginTop: "24px",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: "#fff",
                  border: "1px solid var(--good-500)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  color: "var(--good-600)",
                }}
              >
                Result: &lt; 90s per quote · auto follow-ups · 32% of quotes
                recovered before expiring
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7. TWO-WAY PRICING ============ */}
      <section
        id="product"
        className="section"
        style={{ padding: "72px 20px", background: "var(--paper-2)" }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              className="ds-eyebrow"
              style={{ color: "var(--blue-600)", marginBottom: "14px" }}
            >
              The Susea difference
            </div>
            <h2
              className="ds-h2"
              style={{
                margin: "0 0 16px",
                textWrap: "balance",
                maxWidth: "820px",
                marginInline: "auto",
              }}
            >
              Two ways to price. One automation layer underneath.
            </h2>
            <p
              className="ds-lead"
              style={{ maxWidth: "680px", margin: "0 auto" }}
            >
              Instant quotes for the customer who's asking three forwarders
              right now. Structured RFQs for the enterprise contract sitting on
              your desk. Both feed the same operations engine.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
            className="grid-2-md diff-split"
          >
            {[
              {
                accent: "var(--blue-500)",
                tint: "var(--blue-50)",
                fg: "var(--blue-700)",
                tag: "Instant · Spot",
                h: "Send a quote in the time it takes to sip coffee.",
                p: "Cargo details in → AI drafts an all-in rate → your operator approves → customer has it in Gmail. 90 seconds, deterministic pricing, your margins.",
                stats: [
                  ["< 90s", "From RFQ to sent quote"],
                  ["14+", "Carriers compared per lane"],
                ],
              },
              {
                accent: "var(--orange-500)",
                tint: "var(--orange-50)",
                fg: "var(--orange-700)",
                tag: "Structured · RFQ",
                h: "Multi-carrier RFQs that don't live in your inbox.",
                p: "Broadcast a lane to your carrier network. Track responses live. Award on total-landed cost, not on who replied first. Contracted rates flow back into instant quoting.",
                stats: [
                  ["1 view", "All carriers, side by side"],
                  ["Auto", "Award & contract handoff"],
                ],
              },
            ].map((c) => (
              <div
                key={c.tag}
                className="diff-card"
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "18px",
                  padding: "36px",
                  boxShadow: "var(--shadow-sm)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: c.accent,
                  }}
                />
                <div
                  className="diff-tag"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "5px 12px",
                    borderRadius: "999px",
                    background: c.tint,
                    color: c.fg,
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  {c.tag}
                </div>
                <h3 className="ds-h3" style={{ margin: "0 0 12px" }}>
                  {c.h}
                </h3>
                <p className="ds-body" style={{ margin: "0 0 24px" }}>
                  {c.p}
                </p>
                <div
                  className="diff-stats"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  {c.stats.map(([v, l]) => (
                    <div
                      key={l}
                      style={{
                        padding: "14px 16px",
                        borderRadius: "12px",
                        background: "var(--paper-2)",
                        border: "1px solid var(--line-soft)",
                      }}
                    >
                      <div
                        className="ds-mono"
                        style={{
                          fontSize: "22px",
                          fontWeight: 600,
                          color: "var(--ink)",
                        }}
                      >
                        {v}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "var(--ink-3)",
                          marginTop: "2px",
                        }}
                      >
                        {l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 8. AUTOMATIONS ============ */}
      <section
        id="automations"
        className="section"
        style={{
          padding: "72px 20px",
          background: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "-100px",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle,rgba(240,112,32,.10),transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              className="ds-eyebrow"
              style={{ color: "var(--orange-500)", marginBottom: "14px" }}
            >
              Automations · 8 workflows out of the box
            </div>
            <h2
              className="ds-h2"
              style={{
                margin: "0 0 16px",
                textWrap: "balance",
                maxWidth: "820px",
                marginInline: "auto",
              }}
            >
              The things a great pricing analyst does, running while they sleep.
            </h2>
            <p
              className="ds-lead"
              style={{ maxWidth: "680px", margin: "0 auto" }}
            >
              Every automation is a template: auditable, editable, and always
              human-approved before a customer sees anything.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,minmax(0,1fr))",
              gap: "16px",
            }}
            className="grid-4-md auto-grid"
          >
            {AUTOMATIONS.map((a) => renderAutomationCard(a))}
          </div>

          {/* ≤768px: grid hidden, swipe slider shown (see freight-forwarding.css) */}
          <AutomationsSlider />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "48px",
            }}
          >
            <Hover
              as="a"
              href="https://susea.ai/automations"
              target="_blank"
              rel="noopener"
              base={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "18px 34px",
                borderRadius: "14px",
                background: "var(--orange-500)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "17px",
                letterSpacing: "-.01em",
                boxShadow: "0 8px 24px -6px rgba(240,112,32,.45)",
              }}
              hover={{
                background: "var(--orange-600)",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 32px -6px rgba(240,112,32,.55)",
              }}
            >
              See how it works
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "22px",
                  height: "22px",
                  fontWeight: 400,
                  fontSize: "20px",
                }}
              >
                →
              </span>
            </Hover>
          </div>
        </div>
      </section>

      {/* ============ 10. PRODUCT PREVIEW ============ */}
      <section
        className="section"
        style={{ padding: "72px 20px", background: "#fff" }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: ".9fr 1.1fr",
              gap: "56px",
              alignItems: "center",
            }}
            className="grid-2-md"
          >
            <div className="pp-copy">
              <div
                className="ds-eyebrow"
                style={{ color: "var(--blue-600)", marginBottom: "14px" }}
              >
                See the product first
              </div>
              <h2
                className="ds-h2"
                style={{ margin: "0 0 20px", textWrap: "balance" }}
              >
                The dashboard your team lives in.
              </h2>
              <p
                className="ds-lead"
                style={{ margin: "0 0 24px", maxWidth: "520px" }}
              >
                Every pending RFQ, every draft, every expiring quote: one
                screen, live status. No more "wait, did we send that?"
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {[
                  "Live pricing terminal: spot vs. contract, side by side",
                  "AI drafts with a diff view: you see exactly what Susea changed",
                  "Every carrier response, every version, every follow-up: logged",
                  "Works alongside your CRM, email, and WhatsApp; nothing to rip out",
                ].map((t) => (
                  <li
                    key={t}
                    style={{
                      display: "flex",
                      gap: "12px",
                      fontSize: "15px",
                      color: "var(--ink-2)",
                    }}
                  >
                    <span style={checkDot}>✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Hover
                  as="a"
                  href="#booking"
                  onClick={jump("booking")}
                  base={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "14px 20px",
                    borderRadius: "12px",
                    background: "var(--blue-600)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "15px",
                    boxShadow: "var(--shadow-blue)",
                  }}
                  hover={{ background: "var(--blue-700)" }}
                >
                  Watch the 60-second tour <span>▸</span>
                </Hover>
              </div>
            </div>

            {/* Dashboard mock */}
            <div
              className="pp-mock"
              style={{
                borderRadius: "18px",
                background: "#fff",
                border: "1px solid var(--line)",
                boxShadow: "var(--shadow-xl)",
              }}
            >
              <div
                style={{
                  height: "3px",
                  background:
                    "linear-gradient(90deg,var(--blue-500) 0%,var(--orange-500) 55%,var(--amber-500) 100%)",
                  borderRadius: "18px 18px 0 0",
                }}
              />
              <div
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid var(--line-soft)",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <img
                  src="/assets/susea-mark-black.png"
                  alt=""
                  style={{ height: "18px" }}
                />
                <span style={{ fontWeight: 700, fontSize: "14px" }}>
                  Susea · Ops
                </span>
                <div
                  style={{ marginLeft: "auto", display: "flex", gap: "8px" }}
                >
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "999px",
                      background: "var(--good-50)",
                      color: "var(--good-600)",
                      fontSize: "11px",
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span className="live-dot" />
                    Live
                  </span>
                </div>
              </div>
              <div
                className="pp-mock-grid"
                style={{ display: "grid", gridTemplateColumns: "180px 1fr" }}
              >
                <div
                  className="pp-mock-side"
                  style={{
                    background: "var(--paper-2)",
                    borderRight: "1px solid var(--line-soft)",
                    padding: "16px 12px",
                    fontSize: "13px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <div
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: "#fff",
                      color: "var(--ink)",
                      fontWeight: 600,
                      display: "flex",
                      justifyContent: "space-between",
                      boxShadow: "var(--shadow-xs)",
                    }}
                  >
                    Quotes{" "}
                    <span
                      className="ds-mono"
                      style={{ color: "var(--blue-600)" }}
                    >
                      28
                    </span>
                  </div>
                  {[
                    ["RFQs", "6"],
                    ["Contracts", "14"],
                    ["Tariffs", "231"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      style={{
                        padding: "8px 12px",
                        color: "var(--ink-2)",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {k}{" "}
                      <span
                        className="ds-mono"
                        style={{ color: "var(--ink-3)" }}
                      >
                        {v}
                      </span>
                    </div>
                  ))}
                  <div
                    className="pp-mock-auto-label"
                    style={{
                      marginTop: "12px",
                      padding: "8px 12px",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      color: "var(--ink-4)",
                    }}
                  >
                    Automations
                  </div>
                  <div
                    className="pp-mock-auto"
                    style={{
                      padding: "6px 12px",
                      color: "var(--ink-2)",
                      fontSize: "12.5px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span className="live-dot" />
                    Follow-ups · on
                  </div>
                  <div
                    className="pp-mock-auto"
                    style={{
                      padding: "6px 12px",
                      color: "var(--ink-2)",
                      fontSize: "12.5px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span className="live-dot" />
                    Rate alerts · on
                  </div>
                </div>
                <div className="pp-mock-main" style={{ padding: "12px 16px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      className="pp-mock-title"
                      style={{ fontWeight: 600, fontSize: "14px" }}
                    >
                      Active quotes
                    </div>
                    <div
                      className="pp-mock-sub"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--ink-3)",
                      }}
                    >
                      28 · 4 expire
                    </div>
                  </div>
                  <div
                    className="pp-mock-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 72px 60px 70px",
                      gap: "8px",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      color: "var(--ink-4)",
                      paddingBottom: "8px",
                      borderBottom: "1px solid var(--line-soft)",
                    }}
                  >
                    <div>Lane</div>
                    <div>All-in</div>
                    <div>Δ</div>
                    <div>Status</div>
                  </div>
                  {DASH_ROWS.map((r) => (
                    <div
                      key={r.id}
                      className="pp-mock-row pp-mock-drow"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 72px 60px 70px",
                        gap: "8px",
                        padding: "9px 0",
                        borderBottom: "1px solid var(--line-soft)",
                        fontSize: "12.5px",
                        alignItems: "center",
                        minWidth: 0,
                      }}
                    >
                      <div
                        className="pp-mock-lane"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--ink)",
                          fontWeight: 500,
                          fontSize: "11.5px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          minWidth: 0,
                        }}
                      >
                        {r.lane}
                      </div>
                      <div
                        className="ds-mono"
                        style={{ color: "var(--ink)", fontWeight: 600 }}
                      >
                        {r.price}
                      </div>
                      <div
                        className="ds-mono"
                        style={{ color: r.dcolor, fontWeight: 600 }}
                      >
                        {r.delta}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <span
                          style={{
                            padding: "2px 6px",
                            borderRadius: "999px",
                            background: r.stint,
                            color: r.scolor,
                            fontSize: "9.5px",
                            fontWeight: 700,
                            letterSpacing: ".04em",
                            textTransform: "uppercase",
                            whiteSpace: "nowrap",
                            display: "inline-block",
                          }}
                        >
                          {r.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 11. ROI CALCULATOR ============ */}
      <RoiCalculator />

      {/* ============ 12. KPI STATS ============ */}
      <section
        className="section"
        style={{ padding: "64px 20px", background: "#fff" }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div className="ds-eyebrow" style={{ marginBottom: "14px" }}>
              Beta cohort · in production today
            </div>
            <h2
              className="ds-h2"
              style={{ margin: "0 0 12px", textWrap: "balance" }}
            >
              Small numbers, real customers.
            </h2>
            <p
              className="ds-lead"
              style={{ maxWidth: "560px", margin: "0 auto" }}
            >
              We'd rather be honest about our size than inflate a stat strip.
              Everything below is a real beta metric.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "16px",
              marginBottom: "20px",
            }}
            className="grid-4-md kpi-hero-grid"
          >
            {STATS_TOP.map((s) => (
              <div
                key={s.label}
                style={{
                  background: `linear-gradient(180deg,#fff 0%,${s.tint} 100%)`,
                  border: "1px solid var(--line)",
                  borderRadius: "16px",
                  padding: "28px 24px",
                  textAlign: "left",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  className="ds-mono"
                  style={{
                    fontSize: "48px",
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: "-.03em",
                    color: "var(--ink)",
                  }}
                >
                  {s.big}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "var(--ink-2)",
                    fontWeight: 500,
                    marginTop: "10px",
                    lineHeight: 1.4,
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    fontSize: "20px",
                    color: s.color,
                    fontWeight: 700,
                  }}
                >
                  {s.icon}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "16px",
            }}
            className="grid-3-md kpi-row-grid"
          >
            {STATS_ROW.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: "14px",
                  padding: "20px 22px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "10px",
                  }}
                >
                  <div
                    className="ds-mono"
                    style={{
                      fontSize: "32px",
                      fontWeight: 700,
                      color: "var(--blue-700)",
                    }}
                  >
                    {s.big}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "var(--ink-3)",
                      fontWeight: 500,
                    }}
                  >
                    {s.unit}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "var(--ink-2)",
                    marginTop: "8px",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 13. TESTIMONIALS ============ */}
      <section
        id="customers"
        className="section"
        style={{
          padding: "72px 20px",
          background: "linear-gradient(180deg,#FEF6E4 0%,#FFF8EC 100%)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              className="ds-eyebrow"
              style={{ color: "var(--amber-600)", marginBottom: "14px" }}
            >
              Beta partners · in their words
            </div>
            <h2
              className="ds-h2"
              style={{ margin: "0 0 12px", textWrap: "balance" }}
            >
              The people running the actual pricing desk.
            </h2>
            <p
              className="ds-lead"
              style={{ maxWidth: "600px", margin: "0 auto" }}
            >
              Cohort quotes, anonymized where the customer preferred. Numbers
              are real.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "20px",
            }}
            className="grid-3-md testi-grid"
          >
            {TESTIMONIALS.map((t) => renderTestimonialCard(t))}
          </div>
          <TestimonialsMarquee />
        </div>
      </section>

      {/* ============ 14. COMPETITOR COMPARISON ============ */}
      <section
        className="section"
        style={{ padding: "72px 20px", background: "#fff" }}
      >
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div className="ds-eyebrow" style={{ marginBottom: "14px" }}>
              Traditional workflow vs Susea
            </div>
            <h2
              className="ds-h2"
              style={{ margin: "0 0 16px", textWrap: "balance" }}
            >
              This isn't about ripping out software.
            </h2>
            <p
              className="ds-lead"
              style={{ maxWidth: "640px", margin: "0 auto" }}
            >
              It's about ripping out the swivel-chair between systems. Compare
              the way your desk runs today.
            </p>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <table
              className="comp-table"
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead style={{ background: "var(--paper-2)" }}>
                <tr>
                  <th style={{ width: "32%" }}>Capability</th>
                  <th style={{ width: "34%" }}>Traditional process</th>
                  <th style={{ width: "34%", color: "var(--blue-700)" }}>
                    With Susea
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((r) => (
                  <tr key={r.cap}>
                    <td style={{ fontWeight: 600, color: "var(--ink)" }}>
                      {r.cap}
                    </td>
                    <td style={{ color: "var(--ink-2)", fontSize: "14px" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            background: "var(--bad-50)",
                            color: "var(--bad-600)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: "2px",
                          }}
                        >
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          >
                            <path d="M1 1l6 6M7 1l-6 6" />
                          </svg>
                        </span>
                        <span>{r.trad}</span>
                      </div>
                    </td>
                    <td style={{ color: "var(--ink)", fontSize: "14px" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            background: "var(--good-50)",
                            color: "var(--good-600)",
                            fontSize: "11px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: "2px",
                            fontWeight: 700,
                          }}
                        >
                          ✓
                        </span>
                        <span>{r.susea}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <Hover
              as="a"
              href="#booking"
              onClick={jump("booking")}
              base={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 22px",
                borderRadius: "12px",
                background: "var(--blue-600)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "15px",
                boxShadow: "var(--shadow-blue)",
              }}
              hover={{ background: "var(--blue-700)" }}
            >
              See Susea in action <span>→</span>
            </Hover>
          </div>
        </div>
      </section>

      {/* ============ Why Susea ============ */}
      <div id="why-susea">
        <WhySusea />
      </div>

      {/* ============ 17. FAQ ============ */}
      <section
        id="faq"
        className="section"
        style={{ padding: "72px 20px", background: "var(--paper-2)" }}
      >
        <div style={{ maxWidth: "920px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div className="ds-eyebrow" style={{ marginBottom: "14px" }}>
              Objection handling · straight answers
            </div>
            <h2
              className="ds-h2"
              style={{ margin: "0 0 12px", textWrap: "balance" }}
            >
              The questions every ops manager asks us.
            </h2>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {FAQ_DATA.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.q}
                  style={{
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: "14px",
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    style={{
                      width: "100%",
                      padding: "20px 24px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textAlign: "left",
                      background: "none",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "var(--ink)",
                        letterSpacing: "-.01em",
                      }}
                    >
                      {f.q}
                    </span>
                    <span
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: "var(--paper-2)",
                        color: "var(--ink-2)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "transform .2s",
                        transform: open ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      >
                        <path d="M6 1v10M1 6h10" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`accordion-body${open ? " open" : ""}`}
                    style={{ padding: "0 24px" }}
                  >
                    <div
                      style={{
                        padding: "0 0 20px",
                        fontSize: "15px",
                        lineHeight: 1.6,
                        color: "var(--ink-2)",
                      }}
                    >
                      {f.a}
                      <div style={{ marginTop: "14px" }}>
                        <a
                          href="#booking"
                          onClick={jump("booking")}
                          style={{
                            fontWeight: 600,
                            color: "var(--blue-700)",
                            display: "inline-flex",
                            gap: "6px",
                            alignItems: "center",
                          }}
                        >
                          Book a demo to see this live <span>→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 18. INDUSTRY INSIGHTS ============ */}
      <section
        className="section"
        style={{ padding: "64px 20px", background: "#fff" }}
      >
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div
              className="ds-eyebrow"
              style={{ color: "var(--amber-600)", marginBottom: "14px" }}
            >
              Industry shift · be early
            </div>
            <h2
              className="ds-h2"
              style={{ margin: "0 0 12px", textWrap: "balance" }}
            >
              This move isn't happening in five years.
            </h2>
            <p
              className="ds-lead"
              style={{ maxWidth: "600px", margin: "0 auto" }}
            >
              The forwarders who quote in seconds are already winning contracts
              from the ones who quote in hours.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "16px",
            }}
            className="grid-3-md insights-grid"
          >
            {INSIGHTS.map((i) => (
              <div
                className="insight-card"
                key={i.stat}
                style={{
                  background: `linear-gradient(180deg,#fff 0%,${i.tint} 100%)`,
                  border: "1px solid var(--line)",
                  borderRadius: "16px",
                  padding: "32px 28px",
                }}
              >
                <div
                  className="ds-mono insight-stat"
                  style={{
                    fontSize: "44px",
                    fontWeight: 700,
                    color: i.color,
                    lineHeight: 1,
                    letterSpacing: "-.02em",
                    marginBottom: "14px",
                  }}
                >
                  {i.stat}
                </div>
                <div className="insight-text">
                  <div
                    className="insight-claim"
                    style={{
                      fontSize: "15px",
                      color: "var(--ink)",
                      fontWeight: 500,
                      lineHeight: 1.4,
                      marginBottom: "12px",
                    }}
                  >
                    {i.claim}
                  </div>
                  <div
                    className="insight-source"
                    style={{
                      fontSize: "12px",
                      color: "var(--ink-3)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {i.source}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 19. LEAD MAGNET ============ */}
      <section
        className="section"
        style={{
          padding: "64px 20px",
          background: "linear-gradient(180deg,#fff 0%,#EEF4FD 100%)",
        }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: "20px",
              padding: "48px",
              boxShadow: "var(--shadow-lg)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "48px",
              alignItems: "center",
            }}
            className="grid-2-md"
          >
            <div>
              <div
                className="ds-eyebrow"
                style={{ color: "var(--orange-500)", marginBottom: "14px" }}
              >
                Free guide · 24 pages
              </div>
              <h2 className="ds-h3" style={{ margin: "0 0 16px" }}>
                The Ocean Freight Automation Playbook: 12 workflows you can
                steal.
              </h2>
              <p className="ds-body" style={{ margin: "0 0 24px" }}>
                The exact automations our beta customers turned on in week one,
                with the trigger logic, edge cases, and the "don't do this" list
                from watching six forwarders roll them out.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {[
                  "Follow-up cadences that recover 32% of quiet quotes",
                  "RFQ intake templates for WhatsApp & email",
                  "GRI / BAF surcharge alerting logic",
                ].map((t) => (
                  <li
                    key={t}
                    style={{
                      display: "flex",
                      gap: "10px",
                      fontSize: "14px",
                      color: "var(--ink-2)",
                    }}
                  >
                    <span style={{ color: "var(--good-500)", fontWeight: 700 }}>
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <PlaybookForm
                source="freight-page"
                buttonLabel="Get the playbook"
              />
              <div
                style={{
                  fontSize: "11.5px",
                  color: "var(--ink-3)",
                  marginTop: "10px",
                }}
              >
                One email. No sequence. Unsubscribe with one click.
              </div>
            </div>
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "280px",
                  height: "360px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg,#0E1726 0%,#1a2540 100%)",
                  boxShadow: "var(--shadow-xl)",
                  position: "relative",
                  overflow: "hidden",
                  transform: "rotate(-3deg)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background:
                      "linear-gradient(90deg,var(--blue-500),var(--orange-500),var(--amber-500))",
                  }}
                />
                <div style={{ padding: "32px 24px", color: "#fff" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,.5)",
                      marginBottom: "16px",
                    }}
                  >
                    Susea · playbook 01
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: "22px",
                      lineHeight: 1.2,
                      letterSpacing: "-.02em",
                    }}
                  >
                    The Ocean Freight Automation Playbook
                  </div>
                  <div
                    style={{
                      marginTop: "12px",
                      fontSize: "13px",
                      color: "rgba(255,255,255,.6)",
                      lineHeight: 1.5,
                    }}
                  >
                    12 workflows for the forwarders who ship before their
                    competitors reply.
                  </div>
                  <div
                    style={{
                      marginTop: "80px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      color: "rgba(255,255,255,.35)",
                      letterSpacing: ".08em",
                    }}
                  >
                    SUSEA.AI · 2026
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 20. FINAL CTA + CALENDLY ============ */}
      <section
        id="booking"
        className="section final-cta"
        style={{
          padding: "72px 20px",
          background: "linear-gradient(180deg,var(--ink) 0%,#1a2540 100%)",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(74,130,217,.25),transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            position: "relative",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "999px",
              background: "rgba(245,160,0,.15)",
              color: "#F5A000",
              border: "1px solid rgba(245,160,0,.3)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            <span
              className="live-dot"
              style={{
                background: "#F5A000",
                boxShadow: "0 0 0 4px rgba(245,160,0,.25)",
              }}
            />
            4 onboarding slots left this month
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "clamp(38px,4.6vw,60px)",
              lineHeight: 1.05,
              letterSpacing: "-.035em",
              margin: "0 0 20px",
              textWrap: "balance",
              color: "#fff",
            }}
          >
            Talk to a founder.
            <br />
            <span
              style={{
                background:
                  "linear-gradient(120deg,var(--blue-500),var(--amber-500))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              See Susea running on your own numbers.
            </span>
          </h2>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.55,
              color: "rgba(255,255,255,.75)",
              margin: "0 auto 40px",
              maxWidth: "640px",
            }}
          >
            20 minutes. We come with your carrier list, your lanes, and a live
            draft of what Susea would look like on your desk by Friday.
          </p>

          {/* Calendly booking: live embed, or the custom mock grid as a fallback */}
          {USE_CALENDLY_EMBED ? (
            <CalendlyEmbed url={CALENDLY_URL} />
          ) : (
            <div
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "32px",
                boxShadow: "var(--shadow-xl)",
                color: "var(--ink)",
                textAlign: "left",
                maxWidth: "820px",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid var(--line-soft)",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      color: "var(--ink-3)",
                      marginBottom: "4px",
                    }}
                  >
                    Calendly · 20 min · Google Meet
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      letterSpacing: "-.02em",
                    }}
                  >
                    Susea demo with a founder
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--ink-3)",
                      textTransform: "uppercase",
                      letterSpacing: ".08em",
                    }}
                  >
                    This week · IST
                  </div>
                </div>
              </div>
              <div
                className="day-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5,1fr)",
                  gap: "8px",
                  marginBottom: "20px",
                }}
              >
                {DAYS.map((d) => (
                  <Hover
                    key={d.day}
                    as="button"
                    onClick={openCalendly}
                    base={{
                      background: d.bg,
                      border: `1px solid ${d.border}`,
                      borderRadius: "10px",
                      padding: "12px",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "transform .15s",
                      width: "100%",
                      font: "inherit",
                    }}
                    hover={{
                      transform: "translateY(-2px)",
                      borderColor: "var(--blue-500)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                        color: "var(--ink-3)",
                      }}
                    >
                      {d.day}
                    </div>
                    <div
                      className="ds-mono"
                      style={{
                        fontSize: "20px",
                        fontWeight: 600,
                        color: d.textColor,
                        marginTop: "2px",
                      }}
                    >
                      {d.date}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--ink-3)",
                        marginTop: "4px",
                      }}
                    >
                      {d.slots}
                    </div>
                  </Hover>
                ))}
              </div>
              <div
                className="slot-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: "8px",
                }}
              >
                {SLOTS.map((time) => (
                  <Hover
                    key={time}
                    as="button"
                    onClick={openCalendly}
                    base={{
                      padding: "14px",
                      borderRadius: "10px",
                      border: "1px solid var(--line-strong)",
                      background: "#fff",
                      color: "var(--ink)",
                      fontWeight: 600,
                      fontSize: "14px",
                      fontFamily: "var(--font-mono)",
                    }}
                    hover={{
                      background: "var(--blue-600)",
                      color: "#fff",
                      borderColor: "var(--blue-600)",
                    }}
                  >
                    {time}
                  </Hover>
                ))}
              </div>
              <div
                style={{
                  marginTop: "20px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--line-soft)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div style={{ fontSize: "13px", color: "var(--ink-3)" }}>
                  Don't see a time?{" "}
                  <a
                    href="#waitlist"
                    onClick={jump("waitlist")}
                    style={{ fontWeight: 600 }}
                  >
                    Request beta access
                  </a>{" "}
                  and we'll book you.
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--ink-4)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  calendly.com/susea/demo
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============ 21. FALLBACK WAITLIST FORM ============ */}
      <section
        id="waitlist"
        className="section"
        style={{ padding: "64px 20px", background: "#fff" }}
      >
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              className="ds-eyebrow"
              style={{ color: "var(--orange-500)", marginBottom: "14px" }}
            >
              Not ready for a call?
            </div>
            <h2
              className="ds-h2"
              style={{ margin: "0 0 12px", textWrap: "balance" }}
            >
              Request beta access.
            </h2>
            <p
              className="ds-lead"
              style={{ maxWidth: "520px", margin: "0 auto" }}
            >
              Short form · we route it to sales within 24 hours · priority
              onboarding for cohort members.
            </p>
          </div>
          <div
            style={{
              background: "var(--paper-2)",
              border: "1px solid var(--line)",
              borderRadius: "20px",
              padding: "32px",
            }}
          >
            <HubSpotForm />
            <div
              style={{
                marginTop: "20px",
                paddingTop: "20px",
                borderTop: "1px solid var(--line)",
                fontSize: "12.5px",
                color: "var(--ink-3)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                className="live-dot"
                style={{ background: "var(--orange-500)" }}
              />
              SSL-secured · GDPR-compliant · we never share your data.
            </div>
          </div>
        </div>
      </section>

      {/* ============ 22. FOOTER (shared site footer, matches all pages) ============ */}
      <Footer />

      {/* ============ 23. STICKY MOBILE BOTTOM CTA ============ */}
      <div
        className="show-md-only"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 55,
          padding: "12px 16px",
          background: "rgba(255,255,255,.95)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderTop: "1px solid var(--line)",
          display: "flex",
          gap: "8px",
        }}
      >
        <a
          href="#waitlist"
          onClick={jump("waitlist")}
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "10px",
            background: "#fff",
            color: "var(--ink)",
            fontWeight: 600,
            fontSize: "14px",
            border: "1px solid var(--line-strong)",
            textAlign: "center",
          }}
        >
          Beta access
        </a>
        <a
          href="#booking"
          onClick={jump("booking")}
          style={{
            flex: 1.2,
            padding: "14px",
            borderRadius: "10px",
            background: "var(--blue-600)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "14px",
            boxShadow: "var(--shadow-blue)",
            textAlign: "center",
          }}
        >
          Book a demo →
        </a>
      </div>

      {/* ============ 24. EXIT INTENT MODAL ============ */}
      {exitOpen && (
        <div
          onClick={() => setExitOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(14,23,38,.55)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "ffFadeUp .3s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "520px",
              width: "100%",
              background: "#fff",
              borderRadius: "20px",
              boxShadow: "var(--shadow-xl)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <button
              onClick={() => setExitOpen(false)}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "var(--paper-2)",
                color: "var(--ink-2)",
                fontSize: "18px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              ×
            </button>
            <div
              style={{
                height: "4px",
                background:
                  "linear-gradient(90deg,var(--blue-500),var(--orange-500),var(--amber-500))",
              }}
            />
            <div style={{ padding: "32px" }}>
              <div
                className="ds-eyebrow"
                style={{ color: "var(--orange-500)", marginBottom: "10px" }}
              >
                Before you go
              </div>
              <h3 className="ds-h3" style={{ margin: "0 0 12px" }}>
                Take the playbook with you.
              </h3>
              <p className="ds-body" style={{ margin: "0 0 20px" }}>
                The Ocean Freight Automation Playbook: 12 workflows our beta
                forwarders turned on in week one. No sales sequence.
              </p>
              <PlaybookForm
                source="exit-intent"
                buttonLabel="Email me the guide"
                wrapperStyle={{ marginBottom: "12px" }}
              />
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--ink-3)",
                  textAlign: "center",
                  paddingTop: "12px",
                  borderTop: "1px solid var(--line-soft)",
                  marginTop: "12px",
                }}
              >
                Not ready to talk?{" "}
                <button
                  onClick={() => {
                    setExitOpen(false);
                    setTimeout(() => smoothScrollToId("waitlist"), 100);
                  }}
                  style={{
                    color: "var(--blue-700)",
                    fontWeight: 600,
                    textDecoration: "underline",
                  }}
                >
                  Just email me beta launch updates
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
