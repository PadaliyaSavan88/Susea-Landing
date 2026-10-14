"use client";

import { Component } from "react";
import "./ocean-cta.css";

// Ocean CTA, "2b Lighthouse · Day cycle" variant. Ported from the Claude Design "Ocean CTA" export.
// The sky runs from dawn to night as the ship sails across. Colours are painted straight onto the
// DOM from a requestAnimationFrame loop (only while the section is on screen), not through state.
const WAVE = c => `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='40'%3E%3Cpath d='M0 20 Q50 0 100 20 T200 20 T300 20 T400 20 V40 H0Z' fill='${encodeURIComponent(c)}'/%3E%3C/svg%3E")`;
const wave = (c, bottom, dur, dir, z, op = 1) => ({ position: 'absolute', left: '-400px', right: '-400px', bottom: bottom + 'px', height: '40px', zIndex: z, opacity: op, backgroundImage: WAVE(c), backgroundRepeat: 'repeat-x', backgroundSize: '400px 40px', willChange: 'transform', animation: `wvl ${dur}s linear infinite` });
const STARS = Array.from({ length: 40 }, (_, i) => ({ position: 'absolute', left: ((i * 37) % 100) + '%', top: ((i * 53) % 55) + '%', width: (i % 3 ? 2 : 3) + 'px', height: (i % 3 ? 2 : 3) + 'px', borderRadius: '999px', background: '#fff', animation: `twinkle ${[2, 3, 5, 6][i % 4]}s ${(i % 7) * 0.4}s ease-in-out infinite` }));
const KF = [[5,'#1B2A55','#C0607A','#F59E0B',.6,.5,.8],[6.5,'#6FA8E8','#F2B58A','#FFD27A',.15,0,.1],[9,'#58B0F0','#A9DAF8','#E6F4FC',0,0,0],[13,'#3F9BEA','#8FCDF5','#DDF1FB',0,0,0],[16.5,'#58A8EA','#BFDDF5','#F7E3B8',0,0,0],[18.5,'#2A2F5C','#B4506A','#F59E0B',.7,.15,.5],[20,'#121D40','#3A3566','#8A4A6A',.95,.7,1],[22,'#070E1C','#0A1428','#13305C',1,1,1],[27,'#070E1C','#0A1428','#13305C',1,1,1],[29,'#1B2A55','#C0607A','#F59E0B',.6,.5,.8]];
const hx = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
const mix = (a, b, t) => { const x = hx(a), y = hx(b); return x.map((v, i) => Math.round(v + (y[i] - v) * t)); };
const rgb = a => 'rgb(' + a.join(',') + ')';
const lerp = (a, b, t) => a + (b - a) * t;
function atHour(h) {
  let i = 0; while (i < KF.length - 2 && h > KF[i + 1][0]) i++;
  const A = KF[i], B = KF[i + 1], t = Math.min(1, Math.max(0, (h - A[0]) / (B[0] - A[0])));
  return { top: rgb(mix(A[1], B[1], t)), mid: rgb(mix(A[2], B[2], t)), bot: rgb(mix(A[3], B[3], t)), dark: lerp(A[4], B[4], t), stars: lerp(A[5], B[5], t), lamp: lerp(A[6], B[6], t) };
}

function frame(hour) {
  const S = atHour(hour), d = S.dark, night = d > 0.5;
  const ts = (hour - 6) / 12, sunUp = ts > -0.14 && ts < 1.14;
  const horizon = 1 - Math.sin(Math.PI * Math.min(1, Math.max(0, ts)));
  const sunMid = rgb(mix('#FFD966', '#FF7A30', horizon));
  const tm = (hour - 18.5) / 9.5, moonUp = tm > -0.14 && tm < 1.14;
  const dk = Math.min(1, d * 1.1);
  const ink = mix('#0E1726', '#FFFFFF', d), ink2 = mix('#3B4A63', '#DCE3EF', d);
  const glass = rgb(mix('#C7D3E2', '#FFE29A', S.lamp));
  const gsh = S.lamp > 0.05 ? '0 0 ' + Math.round(40 * S.lamp) + 'px ' + Math.round(14 * S.lamp) + 'px rgba(255,203,107,' + (0.6 * S.lamp).toFixed(2) + ')' : 'none';
  const birds = [0, 1, 2, 3, 4].map(i => {
    const ph = hour - 6.5 - i * 0.45, on = ph > 0 && ph < 11.5;
    const x = -8 + (ph / 11.5) * 116, y = 14 + i * 7 + Math.sin(hour * 0.9 + i * 2) * 3 + (i % 2) * 4;
    const f = 0.35 + 0.65 * Math.abs(Math.sin(hour * 36 + i)), sc = 1 - i * 0.12, col = rgb(ink);
    const wing = a => ({ position: 'absolute', top: 0, width: '16px', height: '6px', borderTop: '2px solid ' + col, borderTopColor: col, borderRadius: '50% 50% 0 0', transformOrigin: a > 0 ? '0 100%' : '100% 100%', transform: 'scaleY(' + f.toFixed(2) + ') rotate(' + (a * -10) + 'deg)', [a > 0 ? 'left' : 'right']: '50%' });
    return { wrap: { position: 'absolute', left: x + '%', top: y + '%', width: '32px', height: '10px', zIndex: 2, pointerEvents: 'none', opacity: on && hour > 6.5 && hour < 18 ? 0.85 : 0, transform: 'scale(' + sc.toFixed(2) + ')' }, l: wing(-1), r: wing(1) };
  });
  return {
    birds,
    c: { h: rgb(ink), p: rgb(ink2), btn: night ? '#FFCB6B' : '#F07020', btnInk: night ? '#0E1726' : '#fff', btnSh: night ? '0 0 30px rgba(255,203,107,.35)' : '0 10px 24px rgba(240,112,32,.35)', bd: night ? 'rgba(255,255,255,.35)' : 'rgba(14,23,38,.3)', beamOp: S.lamp },
    eyebrow: night ? 'A GUIDING LIGHT FOR YOUR DESK' : 'CLEAR SKIES FOR YOUR DESK',
    sec: { position: 'relative', overflow: 'hidden', minHeight: '620px', padding: '80px 20px 200px', background: 'linear-gradient(180deg,' + S.top + ' 0%,' + S.mid + ' 60%,' + S.bot + ' 100%)' },
    sunStyle: { position: 'absolute', left: (10 + 80 * ts) + '%', top: (80 - 66 * Math.sin(Math.PI * ts)) + '%', width: '300px', height: '300px', marginLeft: '-150px', marginTop: '-150px', borderRadius: '999px', background: 'radial-gradient(circle,#FFF6C8 0 22%,' + sunMid + ' 40%,rgba(255,200,120,.3) 58%,rgba(255,200,120,0) 72%)', opacity: sunUp ? 1 : 0, pointerEvents: 'none' },
    moonStyle: { position: 'absolute', left: (10 + 80 * tm) + '%', top: (80 - 66 * Math.sin(Math.PI * tm)) + '%', width: '46px', height: '46px', marginLeft: '-23px', marginTop: '-23px', borderRadius: '999px', boxShadow: 'inset -13px -5px 0 0 #F4F1DC', filter: 'drop-shadow(0 0 12px rgba(225,232,255,.55))', opacity: moonUp ? 1 : 0, pointerEvents: 'none' },
    starsWrap: { position: 'absolute', inset: 0, opacity: S.stars, pointerEvents: 'none' },
    lamp: { width: '30px', height: '24px', borderRadius: '6px 6px 0 0', background: glass, boxShadow: gsh },
    sea: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '120px', background: 'linear-gradient(180deg,' + rgb(mix('#2F89CC', '#0E2348', dk)) + ',' + rgb(mix('#1B66A6', '#081428', dk)) + ')' },
    waveN: { ...wave(rgb(mix('#4AA3DE', '#12305E', dk)), 100, 10, -1, 1, .95), backgroundImage: WAVE(rgb(mix('#4AA3DE', '#12305E', dk))) },
    ebStyle: { fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '.16em', color: night ? '#FFCB6B' : '#B45309', marginBottom: '16px' }
  };
}

const CONTAINER_ROWS = [
  ['#2F6FD6', '#F59E0B', '#F07020', '#2F6FD6', '#F07020'],
  ['#F07020', '#2F6FD6', '#2F6FD6', '#F59E0B', '#4A82D9', '#F07020'],
];

export default class OceanCta extends Component {
  secEl = null; shipEl = null; raf = 0; vis = false; last = 0;
  setShip = el => { this.shipEl = el; };
  tick = t => {
    const s = this.secEl, sh = this.shipEl;
    if (s && sh && t - this.last > 30) {
      this.last = t;
      const sr = s.getBoundingClientRect(), r = sh.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (r.left - sr.left + 420) / (sr.width + 460)));
      this.paint(5 + 24 * p);
    }
    if (this.vis) this.raf = requestAnimationFrame(this.tick);
  };
  paint(h) {
    const s = this.secEl; if (!s) return;
    const F = frame(h), q = k => s.querySelector('[data-k="' + k + '"]');
    s.style.background = F.sec.background;
    const set = (k, st) => { const e = q(k); if (e) Object.assign(e.style, st); };
    set('sun', { left: F.sunStyle.left, top: F.sunStyle.top, background: F.sunStyle.background, opacity: F.sunStyle.opacity });
    set('moon', { left: F.moonStyle.left, top: F.moonStyle.top, opacity: F.moonStyle.opacity });
    set('stars', { opacity: F.starsWrap.opacity });
    set('lamp', { background: F.lamp.background, boxShadow: F.lamp.boxShadow });
    set('sea', { background: F.sea.background });
    set('wave', { backgroundImage: F.waveN.backgroundImage });
    set('beam', { opacity: F.c.beamOp });
    set('eb', { color: F.ebStyle.color });
    set('h', { color: F.c.h }); set('p', { color: F.c.p });
    set('b1', { background: F.c.btn, color: F.c.btnInk, boxShadow: F.c.btnSh });
    set('b2', { color: F.c.h, borderColor: F.c.bd });
    const eb = q('eb'); if (eb && eb.textContent !== F.eyebrow) eb.textContent = F.eyebrow;
    const ws = s.querySelectorAll('[data-k="bw"]');
    F.birds.forEach((b, i) => { const w = ws[i]; if (!w) return; Object.assign(w.style, { left: b.wrap.left, top: b.wrap.top, opacity: b.wrap.opacity, transform: b.wrap.transform }); Object.assign(w.children[0].style, { transform: b.l.transform, borderTopColor: b.l.borderTopColor }); Object.assign(w.children[1].style, { transform: b.r.transform, borderTopColor: b.r.borderTopColor }); });
  }
  setSec = el => { if (el === this.secEl) return; this.secEl = el; if (this.io) this.io.disconnect(); if (!el || typeof IntersectionObserver === 'undefined') return; this.io = new IntersectionObserver(es => es.forEach(e => { this.vis = e.isIntersecting; cancelAnimationFrame(this.raf); if (this.vis) this.raf = requestAnimationFrame(this.tick); }), { threshold: 0.05 }); this.io.observe(el); };
  componentWillUnmount() { this.vis = false; cancelAnimationFrame(this.raf); if (this.io) this.io.disconnect(); }

  render() {
    const {
      headline = "See Susea on your own numbers.",
      body = "Customers, quotes and pricing in one place, with follow-ups automated across email and WhatsApp.",
      primaryLabel, primaryHref, primaryNewTab = false,
      secondaryLabel, secondaryHref, secondaryNewTab = false,
    } = this.props;
    const F = frame(5);
    const ext = on => (on ? { target: "_blank", rel: "noopener noreferrer" } : {});
    return (
<section ref={this.setSec} className="ocean-cta" style={F.sec}>
  <div data-k="sun" style={F.sunStyle}></div>
  <div data-k="moon" style={F.moonStyle}></div>
  {F.birds.map((b, i) => (<div key={i} data-k="bw" style={b.wrap}><span style={b.l}></span><span style={b.r}></span></div>))}
  <div data-k="stars" style={F.starsWrap}>{STARS.map((s, i) => (<span key={i} style={s}></span>))}</div>

  <div data-k="beam" style={{ position: "absolute", left: "9%", bottom: "322px", width: "900px", height: "900px", marginLeft: "-450px", marginBottom: "-450px", pointerEvents: "none", zIndex: 2, opacity: F.c.beamOp }}>
    <div style={{ position: "absolute", left: "50%", top: "50%", width: "90px", height: "90px", margin: "-45px 0 0 -45px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,226,154,.7),rgba(255,226,154,0) 70%)" }}></div>
    <div style={{ position: "absolute", left: "50%", top: "50%", width: "1200px", height: "220px", marginTop: "-110px", transformOrigin: "0 50%", background: "linear-gradient(90deg,rgba(255,226,154,.55),rgba(255,226,154,0) 75%)", clipPath: "polygon(0 48%,100% 0,100% 100%,0 52%)", animation: "beam 6s ease-in-out infinite", willChange: "transform" }}></div>
  </div>
  <div style={{ position: "absolute", left: "9%", bottom: "120px", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
    <div data-k="lamp" style={F.lamp}></div>
    <div style={{ width: "44px", height: "10px", background: "#1B2A44" }}></div>
    <div style={{ width: "40px", height: "150px", background: "repeating-linear-gradient(180deg,#F5F7FA 0 30px,#B4283C 30px 60px)", clipPath: "polygon(18% 0,82% 0,100% 100%,0 100%)" }}></div>
    <div style={{ width: "110px", height: "30px", borderRadius: "50% 50% 0 0", background: "#14223C" }}></div>
  </div>
  <div data-k="sea" style={F.sea}></div>
  <div data-k="wave" style={F.waveN}></div>
  <div style={{ position: "absolute", left: "0", right: "0", bottom: "116px", height: "1px", zIndex: 1 }}>
    <div ref={this.setShip} style={{ position: "absolute", bottom: "-6px", left: "0", animation: "sail-across 30s linear infinite" }}>
      <div style={{ animation: "ship-bob 3s ease-in-out infinite", width: "380px", zoom: ".7" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", padding: "0 70px 0 34px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: "1" }}>
            {CONTAINER_ROWS.map((row, r) => (
              <div key={r} style={{ display: "flex", gap: "2px" }}>
                {row.map((c, i) => (<span key={i} style={{ flex: "1", height: "18px", background: c }}></span>))}
              </div>
            ))}
          </div>
          <div style={{ width: "34px", height: "58px", background: "#E6E8EC", borderRadius: "3px 3px 0 0", boxShadow: "inset 0 10px 0 #0E1726" }}></div>
        </div>
        <div style={{ height: "34px", background: "linear-gradient(180deg,#0E1726 0 60%,#B4283C 60%)", clipPath: "polygon(0 0,100% 0,94% 100%,4% 100%)" }}></div>
      </div>
    </div>
  </div>
  <div style={{ position: "relative", maxWidth: "1180px", margin: "0 auto", display: "flex", justifyContent: "flex-end" }}>
    <div style={{ maxWidth: "600px" }}>
      <div data-k="eb" style={F.ebStyle}>{F.eyebrow}</div>
      <h2 data-k="h" style={{ margin: "0 0 16px", fontSize: "clamp(32px,4.2vw,50px)", fontWeight: 600, letterSpacing: "-.03em", lineHeight: 1.05, textWrap: "balance", color: F.c.h }}>{headline}</h2>
      <p data-k="p" style={{ margin: "0 0 28px", fontSize: "17px", lineHeight: 1.6, textWrap: "pretty", color: F.c.p }}>{body}</p>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <a data-k="b1" href={primaryHref} {...ext(primaryNewTab)} style={{ display: "inline-flex", alignItems: "center", height: "52px", padding: "0 24px", borderRadius: "12px", background: F.c.btn, color: F.c.btnInk, fontWeight: 700, fontSize: "15px", boxShadow: F.c.btnSh, textDecoration: "none" }}>{primaryLabel}</a>
        {secondaryLabel ? (
          <a data-k="b2" href={secondaryHref} {...ext(secondaryNewTab)} style={{ display: "inline-flex", alignItems: "center", height: "52px", padding: "0 22px", borderRadius: "12px", border: "1px solid " + F.c.bd, color: F.c.h, fontWeight: 600, fontSize: "15px", textDecoration: "none" }}>{secondaryLabel}</a>
        ) : null}
      </div>
    </div>
  </div>
</section>
    );
  }
}
