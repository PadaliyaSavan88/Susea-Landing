"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import Nav from "@/components/landing/Nav";
import TestimonialsSlider from "@/components/landing/TestimonialsSlider";
import Footer from "@/components/landing/Footer";
import Waitlist from "@/components/landing/Waitlist";
import { smoothScrollToId } from "@/lib/scroll";

/* ─── Auction data ─────────────────────────────────────────────────── */
const AGENTS_INIT = [
  { code: "MC", name: "Meridian Cargo", bid: 1492, transit: 8, onTime: 94 },
  { code: "BW", name: "BlueWave Shipping", bid: 1468, transit: 7, onTime: 98 },
  { code: "TL", name: "Trident Logistics", bid: 1455, transit: 9, onTime: 91 },
  { code: "CF", name: "Continental Freight", bid: 1510, transit: 8, onTime: 96 },
  { code: "AX", name: "Apex Forwarders", bid: 1430, transit: 8, onTime: 93 },
  { code: "HC", name: "Harbor & Co", bid: 1524, transit: 10, onTime: 89 },
];
const ROW_STEP = 64;
const AUCTION_MODES = [
  { id: "sealed", label: "Sealed bid", icon: "eye-off", short: "Vendors see nothing until the RFQ closes." },
  { id: "rank", label: "Rank-only", icon: "list-ordered", short: "Vendors see only their own rank — never prices.", rec: true },
  { id: "best", label: "Best price", icon: "badge-dollar-sign", short: "Vendors see the lowest price, not who quoted it." },
  { id: "open", label: "Open auction", icon: "eye", short: "Everyone sees all prices and rankings." },
];

function fmtTime(s) {
  const m = Math.floor(s / 60),
    ss = s % 60;
  return m + ":" + String(ss).padStart(2, "0");
}

/* ─── Live auction component ────────────────────────────────────────── */
function LiveAuction({ tickMs = 1150 }) {
  const reduceMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
  const [agents, setAgents] = useState(AGENTS_INIT);
  const [feed, setFeed] = useState([]);
  const [time, setTime] = useState(270);
  const [status, setStatus] = useState("idle");
  const [moves, setMoves] = useState({});
  const [mode, setMode] = useState("rank");
  const timer = useRef(null);
  const ticks = useRef(0);
  const sectionRef = useRef(null);
  const timeRef = useRef(270);

  const ranked = useMemo(() => [...agents].sort((a, b) => a.bid - b.bid), [agents]);
  const rankOf = useMemo(() => {
    const m = {};
    ranked.forEach((a, i) => (m[a.code] = i));
    return m;
  }, [ranked]);
  const leader = ranked[0];
  const rec = useMemo(() => {
    const top = ranked.slice(0, 3);
    return [...top].sort(
      (a, b) => a.bid - a.onTime * 6 - (b.bid - b.onTime * 6)
    )[0];
  }, [ranked]);

  const ME = "BW";
  const meAgent = agents.find((a) => a.code === ME);
  const meRank = rankOf[ME] + 1;
  const modeCfg = AUCTION_MODES.find((m) => m.id === mode);

  const stop = () => {
    clearInterval(timer.current);
    timer.current = null;
  };

  const runTick = () => {
    ticks.current += 1;
    timeRef.current = Math.max(0, timeRef.current - 11);
    setTime(timeRef.current);
    setAgents((prev) => {
      const sorted = [...prev].sort((a, b) => a.bid - b.bid);
      const pool = sorted.slice(1);
      const pick = pool[Math.floor(Math.random() * Math.min(4, pool.length))];
      const drop = 8 + Math.floor(Math.random() * 5) * 7;
      const newBid = pick.bid - drop;
      const willLead = newBid < sorted[0].bid;
      setMoves((m) => ({ ...m, [pick.code]: -drop }));
      setFeed((f) =>
        [
          {
            id: Math.random(),
            name: pick.name,
            bid: newBid,
            delta: -drop,
            lead: willLead,
            t: fmtTime(timeRef.current),
          },
          ...f,
        ].slice(0, 6)
      );
      return prev.map((a) => (a.code === pick.code ? { ...a, bid: newBid } : a));
    });
    if (ticks.current >= 11) {
      stop();
      setStatus("closed");
    }
  };

  const start = () => {
    if (status === "running") return;
    if (status === "closed") {
      setAgents(AGENTS_INIT);
      setFeed([]);
      setMoves({});
      setTime(270);
      timeRef.current = 270;
      ticks.current = 0;
    }
    setStatus("running");
    if (reduceMotion.current) {
      let a = AGENTS_INIT.map((x) => ({ ...x }));
      for (let i = 0; i < 11; i++) {
        const p = a.sort((x, y) => x.bid - y.bid)[1 + (i % 3)];
        p.bid -= 18;
      }
      setAgents(a);
      setStatus("closed");
      setTime(0);
      return;
    }
    timer.current = setInterval(runTick, tickMs);
  };

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && status === "idle") {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => () => stop(), []);

  return (
    <div className="auc-shell" ref={sectionRef}>
      <div className="auc-top">
        <div className="auc-id">
          <span className="rfqno">RFQ-2207</span>
          <span className="lane">Nhava Sheva → Jebel Ali · 40&apos; HC × 120</span>
          <span className="pill blue">8 agents invited</span>
        </div>
        <span className={"countdown" + (status === "closed" ? " closed" : "")}>
          {status !== "closed" && <span className="lvdot"></span>}
          {status === "closed" ? "Auction closed" : fmtTime(time) + " left"}
        </span>
      </div>

      <div className="auc-modes">
        <span className="ml">Bidder visibility</span>
        <div className="seg">
          {AUCTION_MODES.map((m) => (
            <button
              key={m.id}
              className={(mode === m.id ? "on" : "") + (m.rec ? " rec" : "")}
              onClick={() => setMode(m.id)}
            >
              <Icon name={m.icon} size={13} /> {m.label}
            </button>
          ))}
        </div>
        <span className="rechint">
          {modeCfg.short}
          {modeCfg.rec && <b> · recommended</b>}
        </span>
      </div>

      <div className="auc-body">
        <div className="auc-left">
          <div className="lb-meta">
            <span style={{ color: "var(--ink-3)" }}>
              <Icon name="eye" size={12} />{" "}
              <b style={{ color: "var(--ink)" }}>Buyer view</b> · full visibility
            </span>
            <span>
              Round ·{" "}
              <b>{Math.min(3, 1 + Math.floor(ticks.current / 4))} of 3</b>
            </span>
            <span>
              Lowest bid · <b>${leader.bid.toLocaleString()}</b>
            </span>
            <span>
              Spread ·{" "}
              <b>
                ${(ranked[ranked.length - 1].bid - leader.bid).toLocaleString()}
              </b>
            </span>
          </div>

          <div
            className="lb"
            style={{ position: "relative", height: agents.length * ROW_STEP - 8 }}
          >
            {agents.map((a) => {
              const r = rankOf[a.code];
              const mv = moves[a.code];
              const isLead = r === 0;
              return (
                <div
                  key={a.code}
                  className={"lb-row" + (isLead ? " lead" : "")}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    transform: `translateY(${r * ROW_STEP}px)`,
                    height: 56,
                  }}
                >
                  <div className="lb-rank">{r + 1}</div>
                  <div className="lb-agent">
                    <span className="av">{a.code}</span>
                    <span className="nm">{a.name}</span>
                  </div>
                  <div className="lb-bid">
                    ${a.bid.toLocaleString()} <span className="cur">USD</span>
                  </div>
                  <div className="lb-transit">
                    {a.transit}d · {a.onTime}%
                  </div>
                  <div
                    className={
                      "lb-move " +
                      (isLead && status === "closed"
                        ? "win"
                        : mv
                        ? "dn"
                        : "hold")
                    }
                  >
                    {isLead && status === "closed" ? (
                      <>
                        <Icon name="check" size={12} /> won
                      </>
                    ) : mv ? (
                      <>
                        <Icon name="arrow-down" size={11} /> ${Math.abs(mv)}
                      </>
                    ) : (
                      "—"
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="auc-controls">
            {status === "running" ? (
              <button
                className="btn btn-ghost"
                disabled
                style={{ opacity: 0.7 }}
              >
                <span
                  className="lvdot"
                  style={{ background: "var(--orange-500)" }}
                ></span>{" "}
                Auction live…
              </button>
            ) : (
              <button className="btn btn-orange" onClick={start}>
                <Icon
                  name={status === "closed" ? "rotate-ccw" : "play"}
                  size={14}
                />{" "}
                {status === "closed" ? "Replay auction" : "Run auction"}
              </button>
            )}
            <span className="auc-note">
              <Icon name="lock" size={13} /> Agents see only their own rank —
              never competitors&apos; prices.
            </span>
          </div>
        </div>

        <div className="auc-right">
          <div className="agent-view">
            <h5>
              <Icon name="user-round" size={13} /> Agent&apos;s view · BlueWave
              Shipping
            </h5>
            <div className="av-screen">
              {mode === "sealed" && (
                <div className="av-locked">
                  <div className="lk">
                    <Icon name="lock" size={18} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
                    Bid sealed
                  </div>
                  <div className="av-rank" style={{ marginTop: 2 }}>
                    <div className="sub">
                      Results reveal when the auction closes
                    </div>
                  </div>
                  <div className="av-mine">
                    <span>Your bid</span>
                    <b>${meAgent.bid.toLocaleString()}</b>
                  </div>
                </div>
              )}
              {mode === "rank" && (
                <>
                  <div className="av-rank">
                    <div className="big">
                      #<span>{meRank}</span>{" "}
                      <span style={{ color: "var(--ink-4)", fontSize: 18 }}>
                        / 8
                      </span>
                    </div>
                    <div className="sub">
                      {meRank === 1
                        ? "You're leading — hold or defend"
                        : "Lower your bid to climb the ranking"}
                    </div>
                  </div>
                  <div className="av-mine">
                    <span>Your bid</span>
                    <b>${meAgent.bid.toLocaleString()}</b>
                  </div>
                </>
              )}
              {mode === "best" && (
                <>
                  <div className="av-best">
                    <div className="sub" style={{ marginBottom: 4 }}>
                      Lowest bid so far
                    </div>
                    <div
                      className="big"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: 700,
                        fontSize: 30,
                        color: "var(--ink)",
                        letterSpacing: "-.02em",
                      }}
                    >
                      ${leader.bid.toLocaleString()}
                    </div>
                    <div className="sub" style={{ marginTop: 2 }}>
                      Quoted by — hidden
                    </div>
                  </div>
                  <div className="av-mine">
                    <span>Your bid · rank #{meRank}</span>
                    <b>${meAgent.bid.toLocaleString()}</b>
                  </div>
                </>
              )}
              {mode === "open" && (
                <div className="av-mini">
                  {ranked.slice(0, 5).map((a, i) => (
                    <div
                      className={"r" + (a.code === ME ? " me" : "")}
                      key={a.code}
                    >
                      <span>
                        {i + 1}. {a.code === ME ? "You" : a.name}
                      </span>
                      <span>${a.bid.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="auc-rec">
            <h5>
              <Icon name="sparkles" size={13} /> AI award recommendation
            </h5>
            <p>
              Award <b>{rec.name}</b> —{" "}
              {rankOf[rec.code] === 0
                ? "lowest bid"
                : `$${(rec.bid - leader.bid).toLocaleString()} above lead`}{" "}
              but best service blend: <b>{rec.onTime}% on-time</b>,{" "}
              <b>{rec.transit}-day</b> transit.{" "}
              {status === "closed"
                ? "Ready to route for approval."
                : "Updating as bids land…"}
            </p>
            <div className="rec-foot">
              <button
                className="btn btn-primary"
                disabled={status !== "closed"}
                style={{
                  height: 32,
                  fontSize: 12,
                  padding: "0 12px",
                  opacity: status === "closed" ? 1 : 0.55,
                }}
              >
                Award &amp; approve
              </button>
              <button
                className="btn btn-ghost"
                style={{ height: 32, fontSize: 12, padding: "0 12px" }}
              >
                Split award
              </button>
            </div>
          </div>

          <div className="feed-card">
            <h5>Live activity</h5>
            <div className="feed">
              {feed.length === 0 && (
                <div
                  className="feed-item"
                  style={{ color: "var(--ink-4)" }}
                >
                  <span
                    className="fdot"
                    style={{ background: "var(--ink-4)" }}
                  ></span>{" "}
                  Waiting for first bids…
                </div>
              )}
              {feed.map((f) => (
                <div className="feed-item" key={f.id}>
                  <span
                    className="fdot"
                    style={{
                      background: f.lead
                        ? "var(--orange-500)"
                        : "var(--good-500)",
                    }}
                  ></span>
                  <span>
                    <b>{f.name}</b>{" "}
                    {f.lead ? "took the lead at " : "lowered to "}
                    <span className="fmono">${f.bid.toLocaleString()}</span>
                  </span>
                  <time>{f.t}</time>
                </div>
              ))}
            </div>
          </div>

          <div className="auc-side">
            <h5>Approval matrix</h5>
            <div className="mtx">
              <div className="mtx-step done">
                <span className="dot">
                  <Icon name="check" size={10} />
                </span>
                <span>Auction completed</span>
              </div>
              <div className={"mtx-step " + (status === "closed" ? "active" : "")}>
                <span className="dot">2</span>
                <span>Pricing lead review</span>
              </div>
              <div className="mtx-step">
                <span className="dot">3</span>
                <span>Finance sign-off · &gt; $150k</span>
              </div>
              <div className="mtx-step">
                <span className="dot">4</span>
                <span>Contract issued · audit-logged</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Static data ────────────────────────────────────────────────────── */
const RFQ_STATS = [
  { v: "Up to 60%", l: "Lower freight cost via RFQ" },
  { v: "1–3 days", l: "From tender to award" },
  { v: "8+", l: "Agents competing in a single auction" },
];

const STEPS = [
  { n: "1", title: "Build & launch", desc: "Upload many lanes at once and float the RFQ to your own agents in a single click — spot or contract.", icon: "rocket" },
  { n: "2", title: "Agents bid live", desc: "Invited agents bid in your chosen visibility mode — sealed, rank-only, best-price or open — and re-bid down to climb the ranking.", icon: "gavel" },
  { n: "3", title: "AI compares & ranks", desc: "Every bid is normalized and sanity-checked. AI recommends the best agent by cost, transit or schedule.", icon: "sparkles" },
  { n: "4", title: "Approve & award", desc: "Route the winner through your approval matrix with documented justification — fully audit-ready.", icon: "shield-check" },
  { n: "5", title: "Contract & track", desc: "Awarded rates become digital contracts. Susea tracks utilization so negotiated savings actually land.", icon: "file-check-2" },
];

const VISIBILITY_MODES = [
  { label: "Sealed bid", desc: "Vendors see nothing until the RFQ closes — best when trust is still building." },
  { label: "Rank-only", desc: "Vendors see only their own rank, never competitors' prices — pushes agents to compete without full transparency." },
  { label: "Best price", desc: "Vendors see the lowest price, not who quoted it — creates real urgency to beat the leader." },
  { label: "Open auction", desc: "Everyone sees all prices and rankings — total transparency when that serves you." },
];

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function RFQPage() {
  return (
    <>
      {/* ── Nav ── */}
      <Nav onRequest={() => smoothScrollToId("waitlist")} />

      {/* ── Hero ── */}
      <header style={{ position: "relative", padding: "60px 0 40px", overflow: "hidden", background: "radial-gradient(900px 480px at 18% -6%, #eef4fd, transparent 62%), radial-gradient(720px 420px at 92% 4%, #fdf0e6, transparent 60%), linear-gradient(180deg, #eff5fe, #fff 70%)" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 22 }}>
            <span className="eyebrow orange">
              <span className="dot"></span> Procurement · RFQ auctions
            </span>
            <h1 style={{ margin: 0, maxWidth: 860, fontSize: "clamp(32px,3.8vw,56px)", lineHeight: 1.05, letterSpacing: "-0.035em", fontWeight: 600, textWrap: "pretty" }}>
              Make your agents <em style={{ fontStyle: "normal", color: "#2f6bd8" }}>compete</em>{" "}
              <br />for every shipment.
            </h1>
            <p className="lead" style={{ textAlign: "center", maxWidth: 640, margin: 0 }}>
              Invite your own forwarder and agent network to one live auction. Choose how much they see — sealed, rank-only, best-price or fully open. They bid down to win, and most of the negotiation is over before you step in.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <a href="/#waitlist" className="btn btn-primary btn-lg">Join the waitlist</a>
              <a href="#rfq" className="btn btn-ghost btn-lg">See the live auction</a>
            </div>
            {/* stat bar */}
            <div style={{ display: "flex", margin: "14px auto 0", maxWidth: 760, border: "1px solid #e3e9f2", borderRadius: 16, background: "#fff", boxShadow: "0 4px 12px -2px rgba(14,23,38,.08),0 2px 6px -2px rgba(14,23,38,.05)", overflow: "hidden", width: "100%" }}>
              {RFQ_STATS.map((s, i) => (
                <div key={i} style={{ flex: 1, padding: 20, textAlign: "center", borderLeft: i > 0 ? "1px solid #e3e9f2" : "none" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 28, color: "#0e1726", letterSpacing: "-.02em", lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 12.5, color: "#6b7c96", marginTop: 8, fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── Problem ── */}
      <section style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <span className="eyebrow orange"><span className="dot"></span> Why this exists</span>
          <h2 style={{ margin: 0, fontSize: "clamp(28px,3.6vw,42px)", lineHeight: 1.12, letterSpacing: "-.026em", fontWeight: 600 }}>
            Negotiating one agent at a time <br />is negotiating against yourself.
          </h2>
          <p style={{ margin: 0, color: "#41506a", fontSize: 16.5, lineHeight: 1.65, maxWidth: 640 }}>
            A phone call to Agent A. A follow-up email to Agent B. A WhatsApp voice note from Agent C, three days late. By the time you&apos;ve heard from everyone, the best price you got first has probably already changed. A tender that takes four to six weeks isn&apos;t a negotiation — it&apos;s an ambush of your own patience.
          </p>
        </div>
      </section>

      {/* ── Steps ── */}
      <section id="rfq-how" style={{ padding: "20px 0 60px" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16, marginBottom: 60 }}>
            <span className="eyebrow"><span className="dot"></span> How an RFQ works</span>
            <h2 style={{ margin: 0, maxWidth: 860, fontSize: "clamp(30px,4vw,50px)", lineHeight: 1.08, letterSpacing: "-.028em", fontWeight: 600 }}>
              Launch → bid → compare → award, <br />in days — not a month.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14 }} className="steps-grid">
            {STEPS.map((s) => (
              <div key={s.n} style={{ position: "relative", border: "1px solid #e3e9f2", background: "#fff", borderRadius: 14, padding: "20px 18px", boxShadow: "0 1px 2px rgba(14,23,38,.05)", display: "flex", flexDirection: "column", gap: 9, minHeight: 200 }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: "#fdf0e6", color: "#c2540f", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.n}</div>
                <h4 style={{ margin: "2px 0 0", fontSize: 14.5, fontWeight: 600, color: "#0e1726", letterSpacing: "-.01em", lineHeight: 1.25 }}>{s.title}</h4>
                <p style={{ margin: 0, fontSize: 12.5, color: "#41506a", lineHeight: 1.45 }}>{s.desc}</p>
                <div style={{ marginTop: "auto", color: "#e2611a" }}>
                  <Icon name={s.icon} size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bidder Visibility ── */}
      <section style={{ padding: "0 0 60px" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14, marginBottom: 36 }}>
            <span className="eyebrow"><span className="dot"></span> You choose how much they see</span>
            <h2 style={{ margin: 0, maxWidth: 700, fontSize: "clamp(26px,3.2vw,38px)", lineHeight: 1.15, letterSpacing: "-.024em", fontWeight: 600 }}>
              Sealed, rank-only, best-price, or fully open.
            </h2>
            <p style={{ margin: 0, color: "#41506a", fontSize: 15.5, lineHeight: 1.6, maxWidth: 660 }}>
              Every network is different. Choose sealed bids when trust is still building, rank-only when you want agents pushing each other without seeing prices, best-price to create real urgency, or fully open when total transparency serves you. Switch per auction — it&apos;s not a one-time setup decision.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }} className="rfq-visibility-grid">
            {VISIBILITY_MODES.map((m) => (
              <div key={m.label} style={{ border: "1px solid #e3e9f2", background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 2px rgba(14,23,38,.05)" }}>
                <h4 style={{ margin: "0 0 6px", fontSize: 14.5, fontWeight: 600, color: "#0e1726" }}>{m.label}</h4>
                <p style={{ margin: 0, fontSize: 12.5, color: "#41506a", lineHeight: 1.45 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Auction ── */}
      <section id="rfq" style={{ padding: "0 0 70px" }}>
        <div className="container">
          <LiveAuction />
        </div>
      </section>

      {/* ── After the gavel ── */}
      <section style={{ padding: "0 0 60px", background: "#f7f9fc", borderTop: "1px solid #edf1f7", borderBottom: "1px solid #edf1f7" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <span className="eyebrow orange"><span className="dot"></span> The tender doesn&apos;t end at award</span>
          <h2 style={{ margin: 0, fontSize: "clamp(26px,3.2vw,38px)", lineHeight: 1.15, letterSpacing: "-.024em", fontWeight: 600 }}>
            Chasing bids and writing justifications used to be manual too.
          </h2>
          <p style={{ margin: 0, color: "#41506a", fontSize: 16, lineHeight: 1.6, maxWidth: 660 }}>
            Susea&apos;s automation layer covers what happens around the auction, not just inside it — nudging agents who haven&apos;t bid yet, catching a bad bid before it reaches your award screen, drafting the justification memo your approval matrix needs, and flagging awarded lanes that are going underused. All human-approved, none of it retyped by hand.
          </p>
          <a href="/automations" style={{ color: "#2f6bd8", fontSize: 14.5, fontWeight: 600, marginTop: 4 }}>
            See all the automations →
          </a>
        </div>
      </section>

      <TestimonialsSlider />

      <Waitlist />
      <Footer />
    </>
  );
}
