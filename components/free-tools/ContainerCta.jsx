"use client";

import { useEffect, useRef, useState } from "react";
import { CALENDLY_URL } from "@/lib/booking";

// Container CTA. Ported from the Claude Design "Container CTA" export.
// variant "click" (1a, CBM page): a button opens the doors.
// variant "seal" (1b, HSN page): break the seal, then the doors swing open.
const PANELS = {
  click: ['#F07020', '#C85A12', '#F58A3C', '#B85210'],
  seal: ['#2F6FD6', '#2258B0', '#4A82D9', '#1C4A96'],
};

export default function ContainerCta({ variant = "click", headline = "Need more than a calculator? Meet Susea." }) {
  const isSeal = variant === "seal";
  const [open, setOpen] = useState(false);
  const [sealGone, setSealGone] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const breakSeal = () => { if (sealGone) return; setSealGone(true); timer.current = setTimeout(() => setOpen(true), 550); };
  const C = PANELS[isSeal ? "seal" : "click"];
  const amt = open ? 1 : 0;
  const panel = side => ({ position: 'absolute', inset: 0, background: `repeating-linear-gradient(90deg,${C[0]} 0 22px,${C[1]} 22px 26px,${C[2]} 26px 30px)`, borderRadius: side === 'l' ? '3px 0 0 3px' : '0 3px 3px 0', boxShadow: `inset ${side === 'l' ? -3 : 3}px 0 0 rgba(0,0,0,.35),inset 0 0 0 3px ${C[3]}` });
  const door = side => ({ position: 'absolute', top: 0, bottom: 0, width: '50%', [side]: 0, cursor: 'default', zIndex: 3, transformOrigin: side + ' center', transform: `rotateY(${(side === 'left' ? -108 : 108) * amt}deg)`, transition: 'transform 1.3s cubic-bezier(.6,.05,.25,1)', boxShadow: amt > 0.05 ? '0 0 40px rgba(0,0,0,.6)' : 'none' });
  const shown = amt > 0.55;
  const V = {
    headline,
    hint: isSeal
      ? (sealGone ? 'Seal broken. Doors opening.' : 'Sealed at origin. Break the seal to open it.')
      : (open ? 'Cargo cleared. Here\u2019s what\u2019s inside.' : 'Something is waiting inside. Open the doors to see it.'),
    leftStyle: door('left'), rightStyle: door('right'), panelL: panel('l'), panelR: panel('r'),
    boxCode: isSeal ? 'SUSU 314159 2' : 'SUSU 202610 4',
    boxType: isSeal ? '45R1 · REEFER · SET \u221218°C' : '45G1 · MAX GROSS 32,500 KG',
    ctaStyle: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px', opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateY(16px)', transition: 'opacity .6s .35s ease, transform .6s .35s ease', pointerEvents: shown ? 'auto' : 'none' },
    showOpenBtn: isSeal ? !sealGone : !open,
    openLabel: isSeal ? 'Break the seal' : 'Open the container',
    openBtn: isSeal ? breakSeal : () => setOpen(true),
    showSeal: isSeal,
    sealStyle: { position: 'absolute', top: 'calc(44% + 14px)', left: 'calc(24% - 8px)', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'transparent', padding: 0, transformOrigin: '50% 0', animation: sealGone ? 'seal-drop .6s ease-in forwards' : 'seal-swing 2.4s ease-in-out infinite', zIndex: 4 },
    breakSeal,
    showReset: isSeal ? sealGone : open,
    resetLabel: 'Close the doors',
    reset: () => { clearTimeout(timer.current); setOpen(false); setSealGone(false); },
  };
  return (
<section style={{ padding: "44px 20px 72px", background: "radial-gradient(1000px 420px at 50% 0%,rgba(74,130,217,.22),transparent 65%),linear-gradient(180deg,#0B1424 0%,#0E1726 100%)" }}>
  <div style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "28px" }}>
    <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: "700", letterSpacing: ".16em", color: "#FFCB6B" }}>BEYOND THE FREE TOOLS</div>
      <div style={{ fontSize: "19px", color: "rgba(255,255,255,.7)" }}>{V.hint}</div>
    </div>

    <div style={{ position: "relative", width: "100%", maxWidth: "1040px", aspectRatio: "1040/520", minHeight: "460px", borderRadius: "10px", padding: "18px 18px 22px", background: "linear-gradient(180deg,#22324F 0%,#1A2740 100%)", boxShadow: "0 40px 90px rgba(0,0,0,.55),inset 0 0 0 2px rgba(255,255,255,.06)" }}>
      <div style={{ position: "absolute", left: "18px", right: "18px", top: "6px", height: "6px", borderRadius: "3px", background: "repeating-linear-gradient(90deg,#2C3E60 0 18px,#1B2A44 18px 22px)" }}></div>
      <div style={{ position: "relative", width: "100%", height: "100%", perspective: "1800px", borderRadius: "4px", background: "#070D18" }}>
        <div style={{ position: "absolute", inset: "0", borderRadius: "4px", overflow: "hidden", background: "linear-gradient(180deg,#0C1628 0%,#101E36 100%)" }}>
          <div style={{ position: "absolute", inset: "0", background: "repeating-linear-gradient(90deg,rgba(255,255,255,.035) 0 18px,transparent 18px 26px)" }}></div>
          <div style={{ position: "absolute", left: "10%", right: "10%", top: "12%", bottom: "12%", border: "1px solid rgba(255,255,255,.07)" }}></div>
          <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "12%", background: "linear-gradient(180deg,#1A1408,#2A1E0C)", opacity: ".7" }}></div>
          <div style={V.ctaStyle}>
            <div style={{ maxWidth: "640px", textAlign: "center" }}>
              <h2 style={{ margin: "0 0 14px", fontSize: "clamp(34px,5vw,58px)", fontWeight: "600", letterSpacing: "-.03em", lineHeight: "1.06", color: "#fff", textWrap: "balance" }}>{V.headline}</h2>
              <p style={{ margin: "0 auto 26px", maxWidth: "620px", fontSize: "20px", lineHeight: "1.6", color: "rgba(255,255,255,.8)", textWrap: "pretty" }}>Susea helps freight-forwarding and logistics teams organise customer information, manage quotations, centralise pricing and automate follow-ups across email and WhatsApp, without replacing the systems you already use.</p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "52px", padding: "0 24px", borderRadius: "12px", background: "var(--orange-500)", color: "#fff", fontWeight: "600", fontSize: "15px", boxShadow: "0 10px 24px rgba(240,112,32,.35)" }}>Explore Susea →</a>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "52px", padding: "0 22px", borderRadius: "12px", border: "1px solid rgba(255,255,255,.28)", background: "rgba(255,255,255,.04)", color: "#fff", fontWeight: "600", fontSize: "15px" }}>Book a demo</a>
              </div>
            </div>
          </div>
        </div>

        <div style={V.leftStyle}>
          <div style={V.panelL}></div>
          <div style={{ position: "absolute", top: "0", bottom: "0", left: "30%", width: "8px", background: "linear-gradient(90deg,rgba(0,0,0,.35),#D9D9D9 40%,#7A7A7A)", borderRadius: "4px" }}></div>
          <div style={{ position: "absolute", top: "0", bottom: "0", left: "72%", width: "8px", background: "linear-gradient(90deg,rgba(0,0,0,.35),#D9D9D9 40%,#7A7A7A)", borderRadius: "4px" }}></div>
          <div style={{ position: "absolute", top: "8%", left: "8%", padding: "8px 10px", background: "rgba(14,23,38,.85)", borderRadius: "4px", fontFamily: "var(--font-mono)", color: "#fff", lineHeight: "1.35" }}><div style={{ fontSize: "15px", fontWeight: "700", letterSpacing: ".08em" }}>{V.boxCode}</div><div style={{ fontSize: "11px", opacity: ".75" }}>{V.boxType}</div></div>
          <div style={{ position: "absolute", bottom: "10%", left: "8%", width: "104px", borderRadius: "3px", background: "#C9CED6", boxShadow: "inset 0 0 0 2px #9AA2AE", fontFamily: "var(--font-mono)", fontSize: "8px", color: "#3A4250", padding: "6px", lineHeight: "1.4" }}>CSC SAFETY APPROVAL<br />IND / 2026<br />SUSEA · NEXT PORT</div>
        </div>
        <div style={V.rightStyle}>
          <div style={V.panelR}></div>
          <div style={{ position: "absolute", top: "0", bottom: "0", left: "24%", width: "8px", background: "linear-gradient(90deg,rgba(0,0,0,.35),#D9D9D9 40%,#7A7A7A)", borderRadius: "4px" }}></div>
          <div style={{ position: "absolute", top: "0", bottom: "0", left: "66%", width: "8px", background: "linear-gradient(90deg,rgba(0,0,0,.35),#D9D9D9 40%,#7A7A7A)", borderRadius: "4px" }}></div>
          <div style={{ position: "absolute", top: "44%", left: "calc(24% - 30px)", width: "68px", height: "16px", borderRadius: "8px", background: "linear-gradient(180deg,#E6E8EC,#8C939E)", boxShadow: "0 2px 4px rgba(0,0,0,.4)", transformOrigin: "12px 8px", animation: "handle-nudge 3.2s ease-in-out infinite" }}></div>
          <div style={{ position: "absolute", top: "44%", left: "calc(66% - 30px)", width: "68px", height: "16px", borderRadius: "8px", background: "linear-gradient(180deg,#E6E8EC,#8C939E)", boxShadow: "0 2px 4px rgba(0,0,0,.4)", transformOrigin: "12px 8px", animation: "handle-nudge 3.2s .4s ease-in-out infinite" }}></div>
          <div style={{ position: "absolute", top: "8%", right: "8%", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", fontFamily: "var(--font-mono)", color: "#fff", textAlign: "right" }}><span style={{ fontSize: "22px", fontWeight: "700" }}>Susea</span><span style={{ fontSize: "11px", opacity: ".85", letterSpacing: ".1em" }}>FREIGHT, ORGANISED</span></div>
          {V.showSeal ? (<>
            <button onClick={V.breakSeal} aria-label="Break the seal" style={V.sealStyle}>
              <span style={{ width: "26px", height: "26px", borderRadius: "999px", border: "5px solid #E5E7EB", borderBottomColor: "transparent" }}></span>
              <span style={{ marginTop: "-6px", width: "22px", height: "46px", borderRadius: "5px", background: "#FFCB6B", boxShadow: "inset 0 0 0 2px #E0A82E", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "8px", fontWeight: "700", color: "var(--ink)", writingMode: "vertical-rl" }}>SEAL 0042</span>
            </button>
          </>) : null}
        </div>

        {V.showOpenBtn ? (<>
          <button onClick={V.openBtn} style={{ position: "absolute", left: "50%", bottom: "-26px", transform: "translateX(-50%)", zIndex: "5", display: "inline-flex", alignItems: "center", gap: "10px", height: "52px", padding: "0 22px", borderRadius: "999px", background: "#FFCB6B", color: "var(--ink)", fontSize: "15px", fontWeight: "700", whiteSpace: "nowrap", boxShadow: "0 12px 30px rgba(0,0,0,.4)", animation: "hint-pulse 2s ease-out infinite" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 7.5-2" /></svg>
            <span>{V.openLabel}</span>
          </button>
        </>) : null}
      </div>
    </div>


    {V.showReset ? (<>
      <button onClick={V.reset} style={{ background: "transparent", color: "rgba(255,255,255,.55)", fontSize: "13px", fontWeight: "600" }}>{V.resetLabel}</button>
    </>) : null}
  </div>
</section>
  );
}
