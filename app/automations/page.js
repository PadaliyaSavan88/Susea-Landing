"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Nav from "@/components/landing/Nav";
import Icon from "@/components/ui/Icon";
import TestimonialsSlider from "@/components/landing/TestimonialsSlider";
import Footer from "@/components/landing/Footer";
import Waitlist from "@/components/landing/Waitlist";

// ─── Workflow specs ────────────────────────────────────────────────────────────
const T = (label, sub) => ({ type: "trigger", label, sub });
const A = (label, sub) => ({ type: "ai", label, sub });
const H = (label, sub) => ({ type: "human", label, sub });
const O = (label) => ({ type: "output", label });
const D = (label) => ({ type: "decision", label });

const WORKFLOWS = [
  {
    title: "Inquiry intake",
    accent: "#2f6bd8",
    iconName: "message-square",
    sub: "Reads inbound requests and drops a priced, ready-to-send quote in your queue.",
    pre: [
      T("Message arrives", "WhatsApp / email"),
      A("Extracts details", "route, container, cargo, dates"),
      A("Matches profile & rules"),
      A("Drafts priced quote", "SQ-48217 · $1,882.40"),
      H("You approve or edit"),
      O("Quote sent"),
    ],
  },
  {
    title: "Tariff inbox watch",
    accent: "#0891b2",
    iconName: "mail-search",
    sub: "Keeps tariffs current from every inbound rate sheet, automatically.",
    pre: [
      T("Rate sheet / GRI arrives", "inbox + WhatsApp groups"),
      A("Reads & extracts rates"),
      A("Compares vs current tariff"),
      H("Review flagged changes"),
      O("Tariff database updated"),
    ],
  },
  {
    title: "Quote follow-up",
    accent: "#7c3aed",
    iconName: "clock",
    sub: "Drafts a nudge the moment a quote goes quiet.",
    pre: [T("Quote sent"), A("Tracks reply & expiry clock"), D("Reply received?")],
    branch: {
      a: { label: "Yes", nodes: [O("Follow-up cancelled")] },
      b: {
        label: "No · gone quiet",
        nodes: [A("Drafts follow-up"), H("You approve"), O("Nudge sent")],
      },
    },
  },
  {
    title: "Expiry re-price",
    accent: "#d98a00",
    iconName: "refresh-cw",
    sub: "Catches lapsing quotes and drafts the re-send before the customer notices.",
    pre: [
      T("Quote nears expiry", "still open"),
      A("Re-checks current rates"),
      A("Drafts updated price"),
      H("You approve"),
      O("Re-send goes out"),
    ],
  },
  {
    title: "Bid chasing",
    accent: "#059669",
    iconName: "search",
    sub: "Nudges agents who haven't bid, with time-left and ranking context.",
    pre: [
      T("RFQ open", "deadline approaching"),
      A("Detects agents with no bid"),
      A("Drafts nudge", "time-left + ranking"),
      H("You approve", "per settings"),
      O("Nudge sent to non-bidders"),
    ],
  },
  {
    title: "Bid QA",
    accent: "#dc2626",
    iconName: "shield-check",
    sub: "Flags bad bids before they reach your award screen.",
    pre: [T("Agent submits bid"), A("Checks surcharges, currency, transit"), D("Issues found?")],
    branch: {
      a: { label: "Clean", nodes: [O("Enters award screen")] },
      b: {
        label: "Issues",
        nodes: [A("Flags issues"), H("Review flag"), O("Clarification requested")],
      },
    },
  },
  {
    title: "Award justification",
    accent: "#1e5bc6",
    iconName: "file-text",
    sub: "Drafts the audit-ready rationale memo for every award.",
    pre: [
      T("You select winning bid"),
      A("Pulls cost, transit, reliability data"),
      A("Drafts rationale memo"),
      H("You review memo"),
      O("Memo attached to contract"),
    ],
  },
  {
    title: "Contract utilization alerts",
    accent: "#e2611a",
    iconName: "database",
    sub: "Flags awarded contracts running under-used before savings are lost.",
    pre: [
      T("Post-award", "ongoing tracking"),
      A("Compares shipped vs. contracted volume"),
      D("Below threshold?"),
      A("Flags volume gap"),
      H("You review"),
      O("Alert surfaced in dashboard"),
    ],
  },
];

const CLUSTERS = [
  { label: "Requests coming in", idxs: [0, 1] },
  { label: "Quotes going out", idxs: [2, 3] },
  { label: "Agents & awards", idxs: [4, 5, 6, 7] },
];

// ─── Workflow diagram ──────────────────────────────────────────────────────────
const NODE_W_MAX = 220;
const PAD = 16;
const COL_GAP = 16; // horizontal gap between the two branch columns

function nodeStyle(type, accent) {
  if (type === "trigger")
    return { border: accent, bg: "#fff", borderLeft: `4px solid ${accent}`, shadow: "0 4px 14px -6px rgba(0,0,0,.15)" };
  if (type === "ai")
    return { border: "#e3e9f2", bg: "#fff", shadow: "none", aiTag: true };
  if (type === "human")
    return { border: "#fbddc6", bg: "#fdf0e6", shadow: "0 4px 14px -6px rgba(240,112,32,.3)" };
  if (type === "decision")
    return { border: "#d2dbe8", bg: "#f7f9fc", dashed: true, shadow: "none" };
  // output
  return { border: "#e3e9f2", bg: "#f7f9fc", shadow: "none" };
}

function nodeIconName(type) {
  if (type === "human") return "check";
  if (type === "ai") return "sparkles";
  if (type === "output") return "arrow-right";
  return null;
}

function nodeIconColor(type, accent) {
  if (type === "trigger") return accent;
  if (type === "human") return "#c2540f";
  if (type === "ai") return "#f07020";
  return "#6b7c96";
}

// ─── Compact (mobile) workflow ─────────────────────────────────────────────────
// A flow-based layout: nodes are normal blocks in a flex column with a fixed
// gap, so every box is guaranteed clear space no matter how its text wraps.
// Branches render as two equal columns. Replaces the absolute-positioned SVG
// diagram on narrow screens where fixed slots caused boxes to touch/overlap.

function CompactNode({ n, spec, order }) {
  const s = nodeStyle(n.type, spec.accent);
  const iName = nodeIconName(n.type);
  const iColor = nodeIconColor(n.type, spec.accent);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        border: s.dashed ? `1px dashed ${s.border}` : `1px solid ${s.border}`,
        borderLeft: s.borderLeft || undefined,
        background: s.bg,
        borderRadius: 12,
        padding: "11px 12px",
        boxShadow: s.shadow || "0 1px 2px rgba(14,23,38,.05)",
        animation: "nodeIn .38s ease both",
        animationDelay: `${order * 80}ms`,
      }}
    >
      {s.aiTag && (
        <div
          style={{
            position: "absolute",
            top: -7,
            right: -7,
            width: 20,
            height: 20,
            borderRadius: 6,
            background: "linear-gradient(135deg,#f5a000,#f07020)",
            color: "#fff",
            fontSize: 8.5,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          AI
        </div>
      )}
      <div
        style={{
          flex: "none",
          width: 28,
          height: 28,
          borderRadius: 8,
          background: n.type === "trigger" ? spec.accent + "1a" : "#f7f9fc",
          color: iColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {n.type === "trigger" ? (
          <Icon name={spec.iconName} size={14} />
        ) : iName ? (
          <Icon name={iName} size={14} />
        ) : null}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: "#0e1726", lineHeight: 1.3 }}>{n.label}</div>
        {n.sub && (
          <div className="mono" style={{ fontSize: 10.5, color: "#9aa8be", marginTop: 2, lineHeight: 1.3 }}>
            {n.sub}
          </div>
        )}
      </div>
    </div>
  );
}

// Vertical connector between two stacked boxes — mirrors the big-screen
// diagram: the line draws in, then an accent dot travels down it on a loop.
// All connectors share one timeline (same begin + duration) so every dot
// starts together and, being equal length, stays perfectly in sync.
const DOT_BEGIN = "0.4s";
const DOT_DUR = "1.9s";
function VConn({ accent, height = 34 }) {
  const d = `M6 1 V ${height - 1}`;
  return (
    <div style={{ display: "flex", justifyContent: "center" }} aria-hidden="true">
      <svg width="12" height={height} style={{ overflow: "visible" }}>
        <path
          d={d}
          pathLength={1}
          stroke="#c7d0de"
          strokeWidth={1.8}
          fill="none"
          style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: "drawLine .45s ease forwards" }}
        />
        <circle r={3} fill={accent}>
          <animateMotion dur={DOT_DUR} begin={DOT_BEGIN} repeatCount="indefinite" path={d} />
        </circle>
      </svg>
    </div>
  );
}

// Fork from the decision box into the two branch columns: a centred stem, a
// horizontal split bar, and an animated drop-leg above each column (aligned to
// the ~25% / ~75% column centres). The legs are fixed-size SVGs so their dots
// stay round; the bar/stem are CSS lines. Dots share VConn's timeline.
function ForkConnector({ accent }) {
  const legH = 22;
  const d = `M6 1 V ${legH - 1}`;
  const leg = (leftPct) => (
    <svg width="12" height={legH} style={{ position: "absolute", top: 13, left: leftPct, transform: "translateX(-6px)", overflow: "visible" }}>
      <path
        d={d}
        pathLength={1}
        stroke="#c7d0de"
        strokeWidth={1.8}
        fill="none"
        style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: "drawLine .45s ease forwards" }}
      />
      <circle r={2.6} fill={accent}>
        <animateMotion dur={DOT_DUR} begin={DOT_BEGIN} repeatCount="indefinite" path={d} />
      </circle>
    </svg>
  );
  return (
    <div style={{ position: "relative", width: "100%", height: 13 + legH }} aria-hidden="true">
      <div style={{ position: "absolute", top: 0, left: "50%", width: 2, height: 14, marginLeft: -1, background: "#c7d0de" }} />
      <div style={{ position: "absolute", top: 13, left: "25%", width: "50%", height: 2, background: "#c7d0de" }} />
      {leg("25%")}
      {leg("75%")}
    </div>
  );
}

function CompactWorkflow({ spec, resetKey }) {
  const { accent } = spec;
  let order = 0;
  return (
    <div
      key={resetKey}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        padding: 14,
        borderRadius: 12,
        backgroundImage: "radial-gradient(circle, #e3e9f2 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      {spec.pre.map((n, i) => {
        const o = order++;
        return (
          <div key={i}>
            {i > 0 && <VConn accent={accent} />}
            <CompactNode n={n} spec={spec} order={o} />
          </div>
        );
      })}

      {spec.branch && (
        <>
          <ForkConnector accent={accent} />
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            {[spec.branch.a, spec.branch.b].map((br, bi) => (
              <div key={bi} style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
                <div
                  style={{
                    alignSelf: "center",
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: ".02em",
                    color: "#6b7c96",
                    background: "#fff",
                    border: "1px solid #e3e9f2",
                    borderRadius: 999,
                    padding: "3px 10px",
                    textAlign: "center",
                    maxWidth: "100%",
                  }}
                >
                  {br.label}
                </div>
                {br.nodes.map((n, i) => {
                  const o = order++;
                  return (
                    <div key={i}>
                      <VConn accent={accent} />
                      <CompactNode n={n} spec={spec} order={o} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function WorkflowDiagram({ spec, resetKey, compact }) {
  if (compact) return <CompactWorkflow spec={spec} resetKey={resetKey} />;
  return <SvgWorkflowDiagram spec={spec} resetKey={resetKey} />;
}

function SvgWorkflowDiagram({ spec, resetKey }) {
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ w: 320, h: 540 });

  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        setDims({
          w: containerRef.current.clientWidth,
          h: containerRef.current.clientHeight,
        });
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const hasBranch = !!spec.branch;
  // Node width shrinks to fit the container so branched flows (two side-by-side
  // columns) never overflow on narrow/mobile widths. Branch layout needs
  // 3·NODE_W + 48 of horizontal room (see preX/colA math below).
  const NODE_W = hasBranch
    ? Math.max(116, Math.min(NODE_W_MAX, Math.floor((dims.w - PAD * 2 - COL_GAP) / 2)))
    : Math.max(140, Math.min(NODE_W_MAX, dims.w - PAD * 2));
  const branchRows = hasBranch
    ? Math.max(spec.branch.a.nodes.length, spec.branch.b.nodes.length)
    : 0;
  const totalRows = spec.pre.length + branchRows;
  const usable = Math.max(dims.h - PAD * 2 - 14, 280);
  const GAP_Y = usable / totalRows;
  // Keep a real gap between stacked boxes: cap box height and let spacing grow,
  // so wrapped text on narrow screens never makes neighbours touch.
  const NODE_H = Math.max(40, Math.min(64, GAP_Y - 20));

  // Pre column is always centred; the branch pair below is centred as a unit.
  const preX = (dims.w - NODE_W) / 2;

  // Build node list
  const nodes = [];
  const connectors = [];
  let idx = 0;
  let prev = null;

  spec.pre.forEach((n) => {
    const node = { ...n, x: preX, y: PAD + idx * GAP_Y, idx, h: NODE_H };
    idx++;
    nodes.push(node);
    if (prev) connectors.push({ a: prev, b: node });
    prev = node;
  });

  if (hasBranch) {
    const startY = PAD + spec.pre.length * GAP_Y;
    const decisionNode = prev;
    const colA = (dims.w - NODE_W * 2 - COL_GAP) / 2;
    const colB = colA + NODE_W + COL_GAP;
    let bi = idx;
    let prevA = decisionNode;
    spec.branch.a.nodes.forEach((n, i) => {
      const node = { ...n, x: colA, y: startY + i * GAP_Y, idx: bi++, h: NODE_H };
      nodes.push(node);
      connectors.push({ a: prevA, b: node, label: i === 0 ? spec.branch.a.label : null });
      prevA = node;
    });
    let prevB = decisionNode;
    spec.branch.b.nodes.forEach((n, i) => {
      const node = { ...n, x: colB, y: startY + i * GAP_Y, idx: bi++, h: NODE_H };
      nodes.push(node);
      connectors.push({ a: prevB, b: node, label: i === 0 ? spec.branch.b.label : null });
      prevB = node;
    });
  }

  // SVG paths
  const paths = connectors.map((c, i) => {
    const x1 = c.a.x + NODE_W / 2;
    const y1 = c.a.y + c.a.h;
    const x2 = c.b.x + NODE_W / 2;
    const y2 = c.b.y;
    const cy = (y2 - y1) / 2;
    const d = `M ${x1} ${y1} C ${x1} ${y1 + cy}, ${x2} ${y2 - cy}, ${x2} ${y2}`;
    const delay = Math.max(0, c.b.idx * 90 - 30);
    return { d, delay, accent: spec.accent, label: c.label, labelX: (x1 + x2) / 2 - 24, labelY: (y1 + y2) / 2 - 10, idx: i };
  });

  return (
    <div
      ref={containerRef}
      style={{ flex: 1, position: "relative", overflow: "hidden", minHeight: 360, display: "flex", justifyContent: "center" }}
    >
      <div
        key={`${resetKey}`}
        style={{
          position: "relative",
          width: dims.w,
          height: dims.h,
          backgroundImage: "radial-gradient(circle, #e3e9f2 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          borderRadius: 12,
        }}
      >
        {/* SVG connectors */}
        <svg
          width={dims.w}
          height={dims.h}
          style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}
        >
          {paths.map((p) => (
            <g key={p.idx}>
              <path
                d={p.d}
                pathLength={1}
                stroke="#c7d0de"
                strokeWidth={1.8}
                fill="none"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animation: `drawLine .45s ease forwards`,
                  animationDelay: `${p.delay}ms`,
                }}
              />
              <circle r={3.2} fill={p.accent}>
                <animateMotion
                  dur="2.4s"
                  begin={`${p.delay + 460}ms`}
                  repeatCount="indefinite"
                  path={p.d}
                />
              </circle>
            </g>
          ))}
        </svg>

        {/* Branch labels */}
        {paths.filter((p) => p.label).map((p) => (
          <div
            key={`lbl-${p.idx}`}
            style={{
              position: "absolute",
              left: p.labelX,
              top: p.labelY,
              fontSize: 10,
              fontWeight: 700,
              color: "#6b7c96",
              background: "#fff",
              border: "1px solid #e3e9f2",
              borderRadius: 999,
              padding: "2px 8px",
              animation: "nodeIn .38s ease both",
              animationDelay: `${p.delay}ms`,
            }}
          >
            {p.label}
          </div>
        ))}

        {/* Nodes */}
        {nodes.map((n) => {
          const s = nodeStyle(n.type, spec.accent);
          const delay = n.idx * 90;
          const iName = nodeIconName(n.type);
          const iColor = nodeIconColor(n.type, spec.accent);
          return (
            <div
              key={n.idx}
              style={{
                position: "absolute",
                left: n.x,
                top: n.y,
                width: NODE_W,
                minHeight: n.h,
                border: s.dashed
                  ? `1px dashed ${s.border}`
                  : `1px solid ${s.border}`,
                borderLeft: s.borderLeft || undefined,
                background: s.bg,
                borderRadius: 12,
                padding: "10px 12px",
                boxShadow: s.shadow || "0 1px 2px rgba(14,23,38,.05)",
                display: "flex",
                flexDirection: "column",
                gap: 5,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                animation: "nodeIn .38s ease both",
                animationDelay: `${delay}ms`,
                position: "absolute",
              }}
            >
              {/* AI badge */}
              {s.aiTag && (
                <div
                  style={{
                    position: "absolute",
                    top: -7,
                    right: -7,
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    background: "linear-gradient(135deg,#f5a000,#f07020)",
                    color: "#fff",
                    fontSize: 8.5,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  AI
                </div>
              )}
              {/* icon */}
              <div
                style={{
                  flex: "none",
                  width: 26,
                  height: 26,
                  borderRadius: 7,
                  background:
                    n.type === "trigger"
                      ? spec.accent + "1a"
                      : "#f7f9fc",
                  color: iColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {n.type === "trigger" ? (
                  <Icon name={spec.iconName} size={13} />
                ) : iName ? (
                  <Icon name={iName} size={13} />
                ) : null}
              </div>
              {/* text */}
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "#0e1726", lineHeight: 1.3 }}>
                  {n.label}
                </div>
                {n.sub && (
                  <div
                    className="mono"
                    style={{ fontSize: 10.5, color: "#9aa8be", marginTop: 2, lineHeight: 1.3 }}
                  >
                    {n.sub}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
const TRUST_STRIP = [
  { icon: "shield-check", title: "Human-approved", desc: "Every draft waits for your click — no auto-send, ever." },
  { icon: "lock", title: "Pricing stays yours", desc: "AI drafts and routes — it never touches price or margin." },
  { icon: "file-text", title: "Fully logged", desc: "Every draft, approval and send is audit-ready by default." },
];

const BEFORE = [
  "Requests arrive as WhatsApp texts and emails someone has to read and retype",
  "Quotes expire silently — no one notices until the customer asks",
  "Agents get chased one at a time, by phone or message",
];
const AFTER = [
  "Inbound requests become priced, ready-to-approve drafts automatically",
  "Expiring quotes get flagged and re-priced before they lapse",
  "Every invited agent gets nudged automatically until they bid",
];

const STATS = [
  { v: "6.5h", l: "Saved chasing quotes & bids, per week", placeholder: true },
  { v: "32%", l: "Of quotes that would have expired silently, recovered", placeholder: true },
  { v: "0", l: "Auto-sends — every draft is human-approved", placeholder: false },
];

const QUEUE_ITEMS = [
  { icon: "message-square", title: "New inquiry via WhatsApp", sub: "Acme Exports · Nhava Sheva → Jebel Ali · priced at $1,882.40", tag: "Ready to send" },
  { icon: "clock", title: "Quote SQ-48311 expiring in 6h", sub: "Re-priced against today's tariff — draft ready", tag: "Ready to send" },
  { icon: "search", title: "3 agents haven't bid on RFQ-2207", sub: "Nudge drafted — time-left and ranking included", tag: "Ready to send" },
];

function jumpTo(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: "smooth" });
}

export default function AutomationsPage() {
  const [activeCap, setActiveCap] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [fading, setFading] = useState(false);
  const fadeTimer = useRef(null);

  const selectCap = useCallback(
    (i) => {
      if (i === activeCap) return;
      setFading(true);
      clearTimeout(fadeTimer.current);
      fadeTimer.current = setTimeout(() => {
        setActiveCap(i);
        setResetKey((k) => k + 1);
        setFading(false);
      }, 140);
    },
    [activeCap]
  );

  useEffect(() => () => clearTimeout(fadeTimer.current), []);

  return (
    <>
      <Nav onRequest={() => jumpTo("waitlist")} />

      {/* HERO */}
      <header
        style={{
          position: "relative",
          padding: "60px 0 40px",
          overflow: "hidden",
          background:
            "radial-gradient(900px 480px at 18% -6%, #eef4fd, transparent 62%), radial-gradient(720px 420px at 92% 4%, #fdf0e6, transparent 60%), linear-gradient(180deg, #eff5fe, #fff 70%)",
        }}
      >
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 22 }}>
            <span className="eyebrow orange">
              <span className="dot"></span> New capability · Automations
            </span>
            <h1
              style={{
                margin: 0,
                maxWidth: 900,
                fontSize: "clamp(32px,3.8vw,56px)",
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
                fontWeight: 600,
                textWrap: "pretty",
              }}
            >
              Nothing waits for a human
              <br />
              to remember it.
            </h1>
            <p className="lead" style={{ textAlign: "center", margin: "0 auto" }}>
              Susea already owns the price. Now it owns the conversation around it
              — the follow-ups, the chasing, the re-typing. The human still decides
              and approves everything; they just never have to be the one to
              remember to start it.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <a href="/#waitlist" className="btn btn-primary btn-lg">
                Join the waitlist
              </a>
              <a href="#capabilities" className="btn btn-ghost btn-lg">
                See the capabilities
              </a>
            </div>
          </div>

          {/* Trust strip */}
          <div
            style={{
              display: "flex",
              margin: "48px auto 0",
              maxWidth: 900,
              border: "1px solid #e3e9f2",
              borderRadius: 18,
              background: "#fff",
              boxShadow: "var(--shadow-md)",
              overflow: "hidden",
            }}
          >
            {TRUST_STRIP.map((t, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: 22,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  borderLeft: i > 0 ? "1px solid #e3e9f2" : "none",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    background: "var(--blue-50)",
                    color: "var(--blue-600)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name={t.icon} size={16} />
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>{t.title}</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.4 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* BEFORE / AFTER */}
      <section className="sec">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow"><span className="dot"></span> How it changes the day-to-day</span>
            <h2 className="h-section" style={{ margin: 0 }}>
              From remembering everything
              <br />
              to approving what matters.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }} className="auto-page-ba">
            <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 18, padding: 28, boxShadow: "var(--shadow-md)" }}>
              <span style={{ fontSize: 11, letterSpacing: ".09em", textTransform: "uppercase", fontWeight: 700, color: "var(--bad-600)" }}>Before</span>
              <h3 style={{ margin: "8px 0 16px", fontSize: 20, fontWeight: 600, letterSpacing: "-.02em" }}>A human has to remember</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {BEFORE.map((b, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.5 }}>
                    <span style={{ flex: "none", width: 19, height: 19, borderRadius: 5, background: "var(--bad-50)", color: "var(--bad-500)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 11, marginTop: 1 }}>✕</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 18, padding: 28, boxShadow: "var(--shadow-md)" }}>
              <span style={{ fontSize: 11, letterSpacing: ".09em", textTransform: "uppercase", fontWeight: 700, color: "var(--blue-700)" }}>After</span>
              <h3 style={{ margin: "8px 0 16px", fontSize: 20, fontWeight: 600, letterSpacing: "-.02em" }}>Susea already started it</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {AFTER.map((a, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.5 }}>
                    <span style={{ flex: "none", width: 19, height: 19, borderRadius: 5, background: "var(--blue-100)", color: "var(--blue-700)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 11, marginTop: 1 }}>✓</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="sec band">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow"><span className="dot"></span> Capabilities</span>
            <h2 className="h-section" style={{ margin: 0 }}>
              Eight jobs Susea now
              <br />
              does without being asked.
            </h2>
            <p className="lead">
              Every one of these drafts, extracts or routes. None of them touch
              the price or the margin math — that stays deterministic, and yours.
            </p>
          </div>

          <div className="wf-grid">
            {/* Left: cluster list */}
            <div className="wf-left">
              {CLUSTERS.map((cl) => (
                <div key={cl.label} style={{ flex: "none" }}>
                  <h5
                    style={{
                      margin: "0 0 10px",
                      fontSize: 11,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      color: "var(--ink-4)",
                    }}
                  >
                    {cl.label}
                  </h5>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {cl.idxs.map((i) => {
                      const wf = WORKFLOWS[i];
                      const active = activeCap === i;
                      return (
                        <div key={i}>
                          <button
                            onClick={() => selectCap(i)}
                            aria-expanded={active}
                            style={{
                              width: "100%",
                              textAlign: "left",
                              display: "flex",
                              gap: 12,
                              alignItems: "flex-start",
                              border: `1px solid ${active ? wf.accent : "var(--line)"}`,
                              background: active ? wf.accent + "0d" : "#fff",
                              borderRadius: 12,
                              padding: 13,
                              cursor: "pointer",
                              transition: "border-color .15s, background .15s",
                            }}
                          >
                            <div
                              style={{
                                flex: "none",
                                width: 32,
                                height: 32,
                                borderRadius: 9,
                                border: "1px solid var(--line)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "#fff",
                                color: active ? wf.accent : "var(--ink-3)",
                              }}
                            >
                              <Icon name={wf.iconName} size={15} />
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>{wf.title}</div>
                              <div style={{ fontSize: 12, color: "var(--ink-2)", lineHeight: 1.4, marginTop: 2 }}>{wf.sub}</div>
                            </div>
                          </button>

                          {/* Accordion: on mobile the active card expands its own
                              workflow diagram inline. Hidden on desktop (the shared
                              right-hand panel handles it there). */}
                          {active && (
                            <div className="wf-inline">
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, gap: 8 }}>
                                <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{wf.title}</h4>
                                <span style={{ fontSize: 11.5, color: "var(--ink-4)" }}>Workflow view · live</span>
                              </div>
                              <div style={{ opacity: fading ? 0 : 1, transition: "opacity .15s ease" }}>
                                <WorkflowDiagram spec={wf} resetKey={resetKey} compact />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: diagram */}
            <div
              className="wf-right"
              style={{
                minWidth: 0,
                border: "1px solid var(--line)",
                borderRadius: 18,
                background: "#fff",
                padding: 22,
                boxShadow: "var(--shadow-md)",
                display: "flex",
                flexDirection: "column",
                minHeight: 520,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>
                  {WORKFLOWS[activeCap].title}
                </h4>
                <span style={{ fontSize: 12, color: "var(--ink-4)" }}>Workflow view · live</span>
              </div>
              <div style={{ opacity: fading ? 0 : 1, transition: "opacity .15s ease", flex: 1, display: "flex" }}>
                <WorkflowDiagram spec={WORKFLOWS[activeCap]} resetKey={resetKey} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="sec">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }} className="auto-stats">
            {STATS.map((s) => (
              <div
                key={s.v}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 14,
                  padding: 24,
                  background: "#fff",
                  boxShadow: "var(--shadow-xs)",
                  position: "relative",
                }}
              >
                {s.placeholder && (
                  <span
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
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
                <div className="mono" style={{ fontSize: 46, fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1, color: "var(--ink)" }}>
                  {s.v}
                </div>
                <div style={{ marginTop: 10, fontSize: 13, color: "var(--ink-2)", lineHeight: 1.45 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 11.5, color: "var(--ink-4)", textAlign: "center" }}>
            Placeholder figures shown for illustration — swapped for real pilot data before launch.
          </p>
        </div>
      </section>

      {/* TRUST */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ paddingBottom: 28 }}>
            <span style={{ fontSize: 11, letterSpacing: ".09em", textTransform: "uppercase", fontWeight: 700, color: "var(--ink-3)" }}>Trust, by design</span>
            <h3 style={{ margin: "8px 0 18px", fontSize: 24, fontWeight: 600, letterSpacing: "-.02em" }}>You approve. It never sends itself.</h3>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "14px 32px",
                maxWidth: 960,
              }}
            >
              {[
                "Every AI draft is human-approved before anything sends — zero auto-sends.",
                "AI drafts, extracts and routes — it never touches the price or the margin math.",
                "Pricing stays deterministic, exactly as it is today.",
                "Every draft, approval and send is fully logged and audit-ready.",
              ].map((t, i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.5 }}>
                  <span style={{ flex: "none", width: 20, height: 20, borderRadius: 6, background: "var(--blue-50)", color: "var(--blue-600)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                    <Icon name="check" size={12} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Approval queue */}
          <div style={{ border: "1px solid var(--line)", borderRadius: 20, background: "#fff", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "16px 20px", borderBottom: "1px solid var(--line)", background: "linear-gradient(180deg,var(--orange-50),#fff)", flexWrap: "wrap" }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>Your approval queue</span>
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
                  borderBottom: i < QUEUE_ITEMS.length - 1 ? "1px solid var(--line-soft)" : 0,
                }}
              >
                <div className="aq-main" style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 0 }}>
                  <div style={{ flex: "none", width: 38, height: 38, borderRadius: 10, border: "1px solid var(--line)", background: "var(--paper-2)", color: "var(--ink-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={q.icon} size={16} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{q.title}</div>
                    <div style={{ fontSize: 12.5, color: "var(--ink-2)", marginTop: 2 }}>{q.sub}</div>
                  </div>
                </div>
                <span className="aq-tag" style={{ flex: "none", padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, border: "1px solid var(--orange-100)", color: "var(--orange-700)", background: "var(--orange-50)", whiteSpace: "nowrap" }}>
                  {q.tag}
                </span>
                <div className="aq-actions" style={{ flex: "none", display: "flex", gap: 6 }}>
                  <span className="aq-btn" style={{ height: 32, padding: "0 12px", fontSize: 12, borderRadius: 9, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", background: "var(--blue-600)", whiteSpace: "nowrap", fontWeight: 600 }}>
                    Approve &amp; send
                  </span>
                  <span className="aq-btn" style={{ height: 32, padding: "0 12px", fontSize: 12, borderRadius: 9, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--ink)", border: "1px solid var(--line)", background: "#fff", whiteSpace: "nowrap", fontWeight: 600 }}>
                    Edit
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12.5, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 8, marginTop: 16 }}>
            <Icon name="lock" size={13} />
            Nothing above ever reaches the customer without a click from you.
          </div>
        </div>
      </section>

      <TestimonialsSlider />
      <Waitlist />
      <Footer />
    </>
  );
}
