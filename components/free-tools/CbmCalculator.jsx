"use client";

import { Component, Fragment, createRef } from "react";
import { CALENDLY_URL } from "@/lib/booking";
import ContainerCta from "@/components/free-tools/ContainerCta";

const TYPE_L = { box: 'Box', bigbag: 'Big bag', sack: 'Sack', barrel: 'Barrel', roll: 'Roll', pallet: 'Pallet', custom: 'Custom' };
const TYPE_P = { box: 'BOXES', bigbag: 'BIG BAGS', sack: 'SACKS', barrel: 'BARRELS', roll: 'ROLLS', pallet: 'PALLETS', custom: 'CUSTOM' };
const ORIENT = { box: 'Boxes can be turned on the floor; enable tilting if any side can face up.', custom: 'Custom cargo can be turned on the floor; enable tilting if any side can face up.', bigbag: 'Big bags are loaded upright, no tilting.', sack: 'Bags and sacks are loaded flat, no tilting.', barrel: 'Barrels are loaded standing upright.', roll: 'Rolls are loaded lying down along their length.', pallet: 'Pallets are loaded upright on their base.' };
const COLORS = ['#4A82D9', '#F07020', '#1F9D6B', '#F5A000', '#E5604D', '#3A4A63', '#8FB3EC'];
const CONTAINERS = [
  { code: '20GP', tare: 2300, name: "20' Standard", L: 5.90, W: 2.35, H: 2.39, cap: 33.2, max: 28200, door: '2.34 × 2.28' },
  { code: '40GP', tare: 3750, name: "40' Standard", L: 12.03, W: 2.35, H: 2.39, cap: 67.7, max: 26700, door: '2.34 × 2.28' },
  { code: '40HC', tare: 3900, name: "40' High cube", L: 12.03, W: 2.35, H: 2.69, cap: 76.3, max: 26500, door: '2.34 × 2.58' },
  { code: '45HC', tare: 4800, name: "45' High cube", L: 13.56, W: 2.35, H: 2.70, cap: 86.0, max: 27700, door: '2.34 × 2.58' },
  { code: '20RF', tare: 3000, name: "20' Reefer", L: 5.44, W: 2.29, H: 2.27, cap: 28.3, max: 27400, reefer: true, door: '2.29 × 2.26' },
  { code: '40RH', tare: 4600, name: "40' Reefer HC", L: 11.56, W: 2.29, H: 2.50, cap: 67.3, max: 29000, reefer: true, door: '2.29 × 2.50' }
];
const DIM = { mm: 0.001, cm: 0.01, m: 1, in: 0.0254 }, WT = { kg: 1, lb: 0.453592 };
const cyl = t => t === 'barrel' || t === 'roll';
const BLANK = c => ({ name: '', sku: '', type: 'box', color: c, l: '', w: '', h: '', wt: '', qty: '', rotation: 'allowed', tilt: false, stackable: true, useLayers: false, maxLayers: '', useStackH: false, maxStackH: '', useTop: false, maxTop: '', sl: '', sw: '', sh: '' });
const SAMPLE = () => [
  { id: 's1', name: 'Ceramic tiles carton', sku: 'CT-6060', type: 'box', l: 62, w: 62, h: 18, wt: 28, qty: 520, unit: 'cm', wu: 'kg', color: COLORS[0], stackable: true, maxLayers: 8, rotation: 'allowed' },
  { id: 's2', name: 'PVC resin', sku: 'PVC-K67', type: 'sack', l: 70, w: 45, h: 14, wt: 25, qty: 320, unit: 'cm', wu: 'kg', color: COLORS[1], stackable: true, maxLayers: null },
  { id: 's3', name: 'Guar gum', sku: 'GG-200', type: 'bigbag', l: 95, w: 95, h: 110, wt: 1000, qty: 8, unit: 'cm', wu: 'kg', color: COLORS[2], stackable: false, maxLayers: 1 }
];
const FAQS = [
  ['What is CBM?', 'CBM (cubic metre) is the standard unit for cargo volume in ocean freight. One CBM is a space 1 m × 1 m × 1 m. Forwarders use it to price LCL shipments and to plan how much container space your cargo needs.'],
  ['How do I calculate CBM from centimetres?', 'Multiply length × width × height in centimetres and divide by 1,000,000. Then multiply by the number of packages. For example, 50 × 40 × 30 cm = 0.06 CBM per carton; 100 cartons = 6 CBM.'],
  ['What is W/M in LCL shipping?', 'W/M (weight or measure) means you are charged on whichever is greater: total CBM, or total weight in metric tons (1,000 kg = 1 W/M). This calculator shows both and highlights which one applies.'],
  ['How accurate is the loading plan?', 'Packages are placed wall by wall from the front of the container, rotated on the floor for the best fit, and stacked up to each product\u2019s layer limit and the container payload. Real loading also depends on weight distribution, dunnage and carrier rules, so treat it as a planning estimate.'],
  ['Do I need to sign up?', 'No. The calculator is free and runs in your browser. Nothing you enter is stored or sent anywhere.'],
  ['How do I calculate CBM for multiple packages?', 'Work out the CBM of one package, multiply by the number of identical packages, then add the totals for each different package size. The calculator does this for every line you add and shows the shipment total.'],
  ['What is the difference between CBM and chargeable weight?', 'CBM is the space your cargo takes up. Chargeable weight is the figure a carrier or forwarder bills on, usually the higher of actual weight and a volume-based weight. For LCL ocean freight this is often W/M (1 CBM against 1,000 kg); air and courier use different volume conversions. The exact rule depends on the carrier, the service and your contract.'],
  ['Is CBM the same as gross weight?', 'No. CBM measures volume in cubic metres. Gross weight is the total mass of the goods plus packaging, in kilograms. Light, bulky cargo has high CBM and low weight; dense cargo is the opposite. You need both to plan a shipment.'],
  ['Can I use a CBM calculator for FCL shipments?', 'Yes. In FCL mode the calculator compares standard containers against your volume and payload, suggests how many you need, and shows a 3D loading plan. Treat it as a planning estimate and confirm with your carrier.'],
  ['Can I use a CBM calculator for LCL shipments?', 'Yes. In LCL mode it shows your total CBM, weight in metric tons and the W/M figure that consolidators commonly charge on.'],
  ['Does CBM alone determine freight charges?', 'No. Charges also depend on weight, route, carrier, service level, surcharges, origin and destination fees, and any minimums. CBM tells you how much space you need; your forwarder’s quote tells you what it costs.']
];
const pill = (bg, fg) => ({ fontSize: '11.5px', fontWeight: 600, padding: '3px 9px', borderRadius: '999px', background: bg, color: fg, whiteSpace: 'nowrap' });
const dotS = c => ({ width: '12px', height: '12px', borderRadius: '4px', background: c, flex: 'none' });
function unitDims(p) { const k = DIM[p.unit]; if (p.type === 'barrel') return [p.l * k, p.l * k, p.h * k]; if (p.type === 'roll') return [p.h * k, p.l * k, p.l * k]; return [p.l * k, p.w * k, p.h * k]; }
function pack(items, c, limit) {
  const us = items.map(p => { const [l0, w0, h0] = unitDims(p), k = DIM[p.unit], sp = p.spacing || [0, 0, 0], l = l0 + sp[0] * k, w = w0 + sp[1] * k, h = h0 + sp[2] * k, uw = p.wt * WT[p.wu];
    let lim = p.stackable === false ? 1 : 99; if (p.maxLayers) lim = Math.min(lim, p.maxLayers); if (p.maxStackH) lim = Math.min(lim, Math.max(1, Math.floor(p.maxStackH * k / h + 1e-9))); if (p.maxTop) lim = Math.min(lim, Math.floor(p.maxTop * WT[p.wu] / uw + 1e-9) + 1);
    let base = [[l, w, h]]; if (p.rotation !== 'fixed') base.push([w, l, h]); if (p.tilt && (p.type === 'box' || p.type === 'custom')) base = base.concat([[l, h, w], [h, l, w], [w, h, l], [h, w, l]]);
    return { p, l, w, h, uw, layers: lim, base }; }).sort((x, y) => y.l * y.w * y.h - x.l * x.w * x.h);
  const conts = []; let cur; const nc = () => { cur = { x: 0, wt: 0, vol: 0, boxes: [] }; conts.push(cur); }; nc();
  const rows = [];
  us.forEach(u => {
    const opts = u.base.map(([a, b, hh]) => { const across = Math.floor(c.W / b + 1e-9), up = Math.min(Math.floor(c.H / hh + 1e-9), u.layers), per = across * up; return { a, b, hh, across, up, per, score: a <= c.L + 1e-9 && per > 0 ? per / a : 0 }; }).sort((x, y) => y.score - x.score);
    const o = opts[0], row = { id: u.p.id, name: u.p.name, color: u.p.color, qty: u.p.qty, loaded: 0, reason: '' }; rows.push(row);
    if (!o.score) { row.reason = 'Exceeds container internal dimensions'; return; }
    if (u.uw > c.max) { row.reason = 'Single unit exceeds container payload'; return; }
    let rem = u.p.qty;
    while (rem > 0) {
      if (cur.x + o.a > c.L + 1e-9) { if (conts.length >= limit) { row.reason = 'Container limit reached'; break; } nc(); }
      let full = false;
      for (let j = 0; j < o.across && rem > 0 && !full; j++) for (let k = 0; k < o.up && rem > 0; k++) {
        if (cur.wt + u.uw > c.max) { full = true; break; }
        cur.boxes.push({ pid: u.p.id, color: u.p.color, cyl: u.p.type, x: cur.x, y: k * o.hh, z: j * o.b, a: o.a, b: o.b, h: o.hh });
        cur.wt += u.uw; cur.vol += u.l * u.w * u.h; rem--; row.loaded++;
      }
      if (full) { if (conts.length >= limit) { row.reason = 'Payload limit reached'; break; } nc(); continue; }
      cur.x += o.a;
    }
  });
  if (conts.length > 1 && !conts[conts.length - 1].boxes.length) conts.pop();
  return { conts, rows, all: rows.every(r => r.loaded >= r.qty) };
}

function previewGeom(f) {
  const num = v => Math.max(0, parseFloat(v) || 0), F = v => (+v).toFixed(1);
  const P = pts => 'M' + pts.map(p => F(p[0]) + ' ' + F(p[1])).join('L') + 'Z';
  const clamp3 = arr => { const m = Math.max(...arr); if (!m) return arr.map(() => 1); return arr.map(v => Math.max(v || m, m / 6)); };
  const lab = (x, y, text, anchor) => ({ text, style: { position: 'absolute', left: (x / 300 * 100) + '%', top: (y / 250 * 100) + '%', transform: anchor === 'end' ? 'translate(-100%,-50%)' : 'translate(-50%,-50%)', fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#5B6B85', whiteSpace: 'nowrap', pointerEvents: 'none', transition: 'left .25s ease, top .25s ease' } });
  const ln = (x1, y1, x2, y2) => ({ x1: F(x1), y1: F(y1), x2: F(x2), y2: F(y2), o: 1 });
  const none = { x1: 0, y1: 0, x2: 0, y2: 0, o: 0 }, noT = { text: '', style: { display: 'none' } };
  const t = f.type, z = v => v || 0;
  const AX = 72, AY = 28, AW = 196, AH = 160;
  if (t === 'box' || t === 'custom' || t === 'pallet') {
    const [L, W, H] = clamp3([num(f.l), num(f.w), num(f.h)]), c = 0.866, s = 0.5;
    const O = [0, 0], A = [L * c, -L * s], B = [-W * c, -W * s], C = [A[0] + B[0], A[1] + B[1]];
    const pts = [O, A, B, C].flatMap(p => [p, [p[0], p[1] - H]]);
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), bw = Math.max(...xs) - Math.min(...xs), bh = Math.max(...ys) - Math.min(...ys);
    const k = Math.min(AW / bw, AH / bh), ox = AX + (AW - bw * k) / 2 - Math.min(...xs) * k, oy = AY + (AH - bh * k) / 2 - Math.min(...ys) * k;
    const tr = p => [ox + p[0] * k, oy + p[1] * k], up = (p, h) => [p[0], p[1] - h];
    const base = t === 'pallet' ? H * 0.16 : 0;
    const top = [O, A, C, B].map(p => tr(up(p, H))), left = [O, B, up(B, H), up(O, H)].map(p => tr(up(p, 0)));
    const lf = [up(O, base), up(B, base), up(B, H), up(O, H)].map(tr), rf = [up(O, base), up(A, base), up(A, H), up(O, H)].map(tr);
    let p4 = '';
    if (base) { p4 = P([O, B, up(B, base), up(O, base)].map(tr)) + ' ' + P([O, A, up(A, base), up(O, base)].map(tr)); }
    const tO = tr(O), tA = tr(A), tB = tr(B), tBh = tr(up(B, H));
    const hx = tB[0] - 20, wl = ln(tB[0] - 7, tB[1] + 14, tO[0] - 4, tO[1] + 14), ll = ln(tO[0] + 4, tO[1] + 14, tA[0] + 7, tA[1] + 14);
    return { p1: P(top), p2: P(lf), p3: P(rf), p4, a: ln(hx, tBh[1], hx, tB[1]), b: wl, c: ll,
      ta: lab(hx - 10, (tBh[1] + tB[1]) / 2, z(f.h), 'end'), tb: lab((tB[0] + tO[0]) / 2 - 14, (tB[1] + tO[1]) / 2 + 34, 'W ' + z(f.w)), tc: lab((tO[0] + tA[0]) / 2 + 14, (tO[1] + tA[1]) / 2 + 34, 'L ' + z(f.l)) };
  }
  const fit = (w, h) => { const r = Math.min(5, Math.max(1 / 5, (w || 1) / (h || 1))); let ww = r, hh = 1; const k = Math.min(AW * 0.86 / ww, AH * 0.86 / hh); ww *= k; hh *= k; const x0 = AX + (AW - ww) / 2, y0 = AY + (AH - hh) / 2 + 6; return { x0, x1: x0 + ww, y0, y1: y0 + hh, w: ww, h: hh, cx: x0 + ww / 2 }; };
  if (t === 'sack' || t === 'bigbag') {
    const g = fit(num(f.l), num(f.h)), { x0, x1, y0, y1, w, h, cx } = g;
    let p1, p4;
    if (t === 'sack') { p1 = 'M' + F(x0 + 0.1 * w) + ' ' + F(y0 + 0.1 * h) + 'Q' + F(cx) + ' ' + F(y0 - 0.02 * h) + ' ' + F(x1 - 0.1 * w) + ' ' + F(y0 + 0.1 * h) + 'L' + F(x1) + ' ' + F(y1 - 0.07 * h) + 'Q' + F(cx) + ' ' + F(y1 + 0.07 * h) + ' ' + F(x0) + ' ' + F(y1 - 0.07 * h) + 'Z'; p4 = 'M' + F(cx - 0.08 * w) + ' ' + F(y0 + 0.05 * h) + 'L' + F(cx) + ' ' + F(y0 - 0.06 * h) + 'L' + F(cx + 0.08 * w) + ' ' + F(y0 + 0.05 * h); }
    else { const r = Math.min(10, w * 0.08); p1 = 'M' + F(x0 + r) + ' ' + F(y0) + 'H' + F(x1 - r) + 'Q' + F(x1) + ' ' + F(y0) + ' ' + F(x1) + ' ' + F(y0 + r) + 'V' + F(y1 - r) + 'Q' + F(x1) + ' ' + F(y1) + ' ' + F(x1 - r) + ' ' + F(y1) + 'H' + F(x0 + r) + 'Q' + F(x0) + ' ' + F(y1) + ' ' + F(x0) + ' ' + F(y1 - r) + 'V' + F(y0 + r) + 'Q' + F(x0) + ' ' + F(y0) + ' ' + F(x0 + r) + ' ' + F(y0) + 'Z'; const lh = Math.min(26, h * 0.18); p4 = 'M' + F(x0 + 0.18 * w) + ' ' + F(y0) + 'V' + F(y0 - lh) + 'H' + F(x0 + 0.36 * w) + 'V' + F(y0) + 'M' + F(x1 - 0.36 * w) + ' ' + F(y0) + 'V' + F(y0 - lh) + 'H' + F(x1 - 0.18 * w) + 'V' + F(y0); }
    return { p1, p2: '', p3: '', p4, a: ln(x0 - 20, y0, x0 - 20, y1), b: ln(x0, y1 + 20, x1, y1 + 20), c: none, ta: lab(x0 - 30, (y0 + y1) / 2, z(f.h), 'end'), tb: lab(cx, y1 + 40, 'L ' + z(f.l) + ' × W ' + z(f.w)), tc: noT };
  }
  if (t === 'barrel') {
    const g = fit(num(f.l), num(f.h) * 1.2), { x0, x1, w, cx } = g, ry = w * 0.15, y0 = g.y0 + ry, y1 = g.y1 - ry, rx = w / 2;
    const p1 = 'M' + F(x0) + ' ' + F(y0) + 'V' + F(y1) + 'A' + F(rx) + ' ' + F(ry) + ' 0 0 0 ' + F(x1) + ' ' + F(y1) + 'V' + F(y0) + 'Z';
    const p3 = 'M' + F(x0) + ' ' + F(y0) + 'A' + F(rx) + ' ' + F(ry) + ' 0 1 0 ' + F(x1) + ' ' + F(y0) + 'A' + F(rx) + ' ' + F(ry) + ' 0 1 0 ' + F(x0) + ' ' + F(y0) + 'Z';
    const m1 = y0 + (y1 - y0) / 3, m2 = y0 + (y1 - y0) * 2 / 3;
    const p4 = 'M' + F(x0) + ' ' + F(m1) + 'A' + F(rx) + ' ' + F(ry) + ' 0 0 0 ' + F(x1) + ' ' + F(m1) + 'M' + F(x0) + ' ' + F(m2) + 'A' + F(rx) + ' ' + F(ry) + ' 0 0 0 ' + F(x1) + ' ' + F(m2);
    return { p1, p2: '', p3, p4, a: ln(x0 - 20, y0, x0 - 20, y1 + ry), b: ln(x0, y1 + ry + 20, x1, y1 + ry + 20), c: none, ta: lab(x0 - 30, (y0 + y1) / 2, z(f.h), 'end'), tb: lab(cx, y1 + ry + 40, 'Ø ' + z(f.l)), tc: noT };
  }
  const g = fit(num(f.h) * 1.15, num(f.l)), D = g.h, rx = D * 0.26, x0 = g.x0 + rx, x1 = g.x1 - rx * 0.3, y0 = g.y0, y1 = g.y1, cy = (y0 + y1) / 2, ry = D / 2;
  const p1 = 'M' + F(x0) + ' ' + F(y0) + 'H' + F(x1) + 'A' + F(rx) + ' ' + F(ry) + ' 0 0 1 ' + F(x1) + ' ' + F(y1) + 'H' + F(x0) + 'Z';
  const p3 = 'M' + F(x0) + ' ' + F(y0) + 'A' + F(rx) + ' ' + F(ry) + ' 0 1 0 ' + F(x0) + ' ' + F(y1) + 'A' + F(rx) + ' ' + F(ry) + ' 0 1 0 ' + F(x0) + ' ' + F(y0) + 'Z';
  const cr = rx * 0.28, cry = ry * 0.26, p4 = 'M' + F(x0 - cr) + ' ' + F(cy) + 'A' + F(cr) + ' ' + F(cry) + ' 0 1 0 ' + F(x0 + cr) + ' ' + F(cy) + 'A' + F(cr) + ' ' + F(cry) + ' 0 1 0 ' + F(x0 - cr) + ' ' + F(cy) + 'Z';
  const lx = x0 - rx - 16;
  return { p1, p2: '', p3, p4, a: ln(lx, y0, lx, y1), b: ln(x0, y1 + 22, x1 + rx, y1 + 22), c: none, ta: lab(lx - 10, cy, 'Ø ' + z(f.l), 'end'), tb: lab((x0 + x1 + rx) / 2, y1 + 42, 'L ' + z(f.h)), tc: noT };
}

export default class CbmCalculator extends Component {
  state = { picking: false, pickCode: null, pickQty: 1, customC: null, cdraft: { L: '', W: '', H: '', max: '' }, calculated: false, qtyOverride: null, advOpen: false, mode: null, dimUnit: 'cm', wtUnit: 'kg', items: [], adding: false, f: BLANK(COLORS[0]), editingId: null, error: '', chosen: null, viewIdx: 0, faq: 0, toast: '' };
  viewRef = createRef();
  planRef = createRef(); panelRef = createRef(); seqRangeRef = createRef(); seqLabelRef = createRef();
  _applyFs(fs) { const p = this.panelRef.current, v = this.viewRef.current; if (!p) return;
    Object.assign(p.style, fs ? { position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', zIndex: '1000' } : { position: 'relative', top: '', left: '', right: '', bottom: '', zIndex: '' });
    if (v) v.style.height = fs ? 'calc(100vh - 60px)' : '460px'; document.body.style.overflow = fs ? 'hidden' : ''; this.setState({ fs }); setTimeout(() => this._fit(this.state.view || 'iso'), 60); }
  _onKey = e => { if (e.key === 'Escape' && this.state.fs) this._applyFs(false); };
  _onFs = () => {};
  _fit(view) {
    const g = this._g; if (!g || !g.c) return; const c = g.c, cam = g.camera, fov = { iso: 32, top: 18, side: 14, door: 14 }[view] || 32, v = fov * Math.PI / 360, hv = Math.atan(Math.tan(v) * cam.aspect);
    const dist = (w, h, m) => Math.max((h / 2) / Math.tan(v), (w / 2) / Math.tan(hv)) * (m || 1.25);
    const T = this.T, tgt = new T.Vector3(0, c.H / 2, 0); let pos;
    if (view === 'top') { const dd = c.H + dist(c.L, c.W, 1.2); pos = new T.Vector3(0, c.H / 2 + dd, dd * 0.02); }
    else if (view === 'side') { const dd = c.W / 2 + dist(c.L, c.H * 1.6, 1.15); pos = new T.Vector3(0, c.H / 2 + dd * 0.03, dd); }
    else if (view === 'door') { const dd = c.L / 2 + dist(c.W, c.H * 1.4, 2.4); tgt.set(0, c.H * 0.5, 0); pos = new T.Vector3(dd, c.H * 0.5 + dd * 0.025, 0); }
    else { const d = Math.max(c.L, 6); pos = new T.Vector3(d * 0.78, d * 0.52, d * 0.86); tgt.set(0, c.H * 0.4, 0); }
    if (g.controls) { g.controls.enableDamping = false; g.controls.update(); }
    const r = pos.distanceTo(tgt); if (g.controls) { g.controls.maxDistance = Math.max(r * 1.6, 8); g.controls.minDistance = r * 0.3; }
    g.camTo = { pos, tgt, fov };
  }
  _reveal(n) {
    const g = this._g; if (!g || !g.seq) return; const s = g.seq; s.shown = Math.max(0, Math.min(s.total, n)); const k = Math.floor(s.shown);
    s.meshes.forEach(m => { let cnt = 0; while (cnt < m.idx.length && m.idx[cnt] < k) cnt++; m.im.count = cnt; if (m.edges) m.edges.children.forEach((e, i) => { e.visible = i < cnt; }); });
    if (this.seqRangeRef.current) this.seqRangeRef.current.value = s.total ? Math.round(k / s.total * 1000) : 0;
    if (this.seqLabelRef.current) this.seqLabelRef.current.textContent = k.toLocaleString('en-IN') + ' / ' + s.total.toLocaleString('en-IN') + ' pkgs';
  }
  _setPlay(p) { const g = this._g; if (!g || !g.seq) return; if (p && g.seq.shown >= g.seq.total) this._reveal(0); g.seq.playing = p; if (this.state.playing !== p) this.setState({ playing: p }); }
  componentDidMount() { this._live = true; document.addEventListener('keydown', this._onKey); this._sync(); }
  componentDidUpdate() { this._sync(); }
  componentWillUnmount() { document.removeEventListener('keydown', this._onKey); document.body.style.overflow = ''; this._live = false; clearTimeout(this._t); this._dispose(); }
  flash(m) { this.setState({ toast: m }); clearTimeout(this._t); this._t = setTimeout(() => this.setState({ toast: '' }), 2200); }
  _dispose() { if (!this._g) return; cancelAnimationFrame(this._g.raf); this._g.ro && this._g.ro.disconnect(); this._g.controls && this._g.controls.dispose(); this._g.renderer.dispose(); this._g.renderer.domElement.remove(); this._g = null; this._key = null; }
  _sync() {
    const el = this.viewRef.current, T = this.T, plan = this._plan;
    // three.js is only downloaded once a loading plan is on screen.
    if (el && plan && !T && !this._loading) {
      this._loading = true;
      Promise.all([import('three'), import('three/examples/jsm/controls/OrbitControls.js')]).then(([three, oc]) => {
        three.ColorManagement.enabled = false;
        this.T = { ...three, OrbitControls: oc.OrbitControls };
        if (this._live) this._sync();
      }).catch(() => { this._loading = false; });
    }
    if (!el || !T || !plan) { if (!el && this._g) this._dispose(); return; }
    if (this._g && this._g.el !== el) this._dispose();
    if (!this._g) {
      const renderer = new T.WebGLRenderer({ antialias: true, alpha: true }); renderer.outputColorSpace = T.LinearSRGBColorSpace; renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      el.appendChild(renderer.domElement); renderer.domElement.style.display = 'block';
      const scene = new T.Scene(), camera = new T.PerspectiveCamera(32, 1, 0.1, 200);
      scene.add(new T.HemisphereLight(0xffffff, 0xC9D5E6, 0.95 * Math.PI)); const dl = new T.DirectionalLight(0xffffff, 0.75 * Math.PI); dl.position.set(6, 12, 8); scene.add(dl);
      const controls = T.OrbitControls ? new T.OrbitControls(camera, renderer.domElement) : null; if (controls) { controls.enableDamping = true; controls.dampingFactor = 0.08; controls.maxPolarAngle = Math.PI; }
      const root = new T.Group(); scene.add(root);
      const grid = new T.GridHelper(120, 120, 0xC9D3E2, 0xDCE3EE); grid.position.y = -0.03; grid.material.transparent = true; grid.material.opacity = 0.7; scene.add(grid);
      scene.fog = new T.Fog(0xEDF2F8, 70, 180);
      const g = this._g = { el, renderer, scene, camera, controls, root };
      const size = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h, false); renderer.domElement.style.width = w + 'px'; renderer.domElement.style.height = h + 'px'; camera.aspect = w / h; camera.updateProjectionMatrix(); };
      size(); g.ro = new ResizeObserver(size); g.ro.observe(el);
      if (controls) controls.addEventListener('start', () => { g.camTo = null; controls.enableDamping = true; });
      const loop = () => { g.raf = requestAnimationFrame(loop);
        if (g.camTo) { camera.position.lerp(g.camTo.pos, 0.14); if (controls) controls.target.lerp(g.camTo.tgt, 0.14); else camera.lookAt(g.camTo.tgt); if (g.camTo.fov && Math.abs(camera.fov - g.camTo.fov) > 0.05) { camera.fov += (g.camTo.fov - camera.fov) * 0.14; camera.updateProjectionMatrix(); }
        if (camera.position.distanceTo(g.camTo.pos) < 0.01) { camera.fov = g.camTo.fov || camera.fov; camera.updateProjectionMatrix(); camera.position.copy(g.camTo.pos); if (controls) { controls.target.copy(g.camTo.tgt); controls.enableDamping = true; } g.camTo = null; } }
        if (g.seq && g.seq.playing) { this._reveal(g.seq.shown + Math.max(0.25, g.seq.total / 420)); if (g.seq.shown >= g.seq.total) this._setPlay(false); }
        controls && controls.update(); renderer.render(scene, camera); }; loop();
    }
    if (this._key === plan.key) return; this._key = plan.key;
    const g = this._g, c = plan.c, k = plan.k;
    while (g.root.children.length) { const o = g.root.children.pop(); o.traverse && o.traverse(m => { m.geometry && m.geometry.dispose(); m.material && m.material.dispose && m.material.dispose(); }); }
    const shell = new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(c.L, c.H, c.W)), new T.LineBasicMaterial({ color: 0x6B7A93 })); shell.position.set(0, c.H / 2, 0); g.root.add(shell);
    const floor = new T.Mesh(new T.BoxGeometry(c.L, 0.02, c.W), new T.MeshStandardMaterial({ color: 0xD2DBE8, transparent: true, opacity: 0.55, depthWrite: false })); floor.position.y = -0.01; g.root.add(floor);
    const back = new T.Mesh(new T.PlaneGeometry(c.W, c.H), new T.MeshStandardMaterial({ color: 0xE3E9F2, transparent: true, opacity: 0.55, side: T.DoubleSide })); back.rotation.y = Math.PI / 2; back.position.set(-c.L / 2, c.H / 2, 0); g.root.add(back);
    const side = new T.Mesh(new T.PlaneGeometry(c.L, c.H), new T.MeshStandardMaterial({ color: 0xE3E9F2, transparent: true, opacity: 0.35, side: T.DoubleSide })); side.position.set(0, c.H / 2, -c.W / 2); g.root.add(side);
    g.c = c; const seq = { meshes: [], total: k ? k.boxes.length : 0, shown: 0, playing: false };
    const groups = {}; (k ? k.boxes : []).forEach((b, gi) => { b._i = gi; (groups[b.pid + b.a.toFixed(3)] = groups[b.pid + b.a.toFixed(3)] || []).push(b); });
    const m4 = new T.Matrix4(), q = new T.Quaternion(), s1 = new T.Vector3(1, 1, 1), qRoll = new T.Quaternion().setFromAxisAngle(new T.Vector3(0, 0, 1), Math.PI / 2), qRollZ = new T.Quaternion().setFromAxisAngle(new T.Vector3(1, 0, 0), Math.PI / 2);
    Object.values(groups).forEach(list => {
      const b0 = list[0], gap = 0.965; let geo, rot = q;
      if (b0.cyl === 'barrel') geo = new T.CylinderGeometry(b0.a / 2 * gap, b0.a / 2 * gap, b0.h * gap, 20);
      else if (b0.cyl === 'roll') { const alongX = b0.a >= b0.b; geo = new T.CylinderGeometry(b0.h / 2 * gap, b0.h / 2 * gap, (alongX ? b0.a : b0.b) * gap, 20); rot = alongX ? qRoll : qRollZ; }
      else geo = new T.BoxGeometry(b0.a * gap, b0.h * gap, b0.b * gap);
      const mat = new T.MeshStandardMaterial({ color: new T.Color(b0.color), roughness: 0.62, metalness: 0.02 });
      const im = new T.InstancedMesh(geo, mat, list.length);
      list.forEach((b, i) => { m4.compose(new T.Vector3(b.x + b.a / 2 - c.L / 2, b.y + b.h / 2, b.z + b.b / 2 - c.W / 2), rot, s1); im.setMatrixAt(i, m4); });
      g.root.add(im); const sm = { im, idx: list.map(b => b._i), edges: null }; seq.meshes.push(sm);
      if (b0.cyl !== 'barrel' && b0.cyl !== 'roll' && list.length < 1500) { const eg = new T.EdgesGeometry(new T.BoxGeometry(b0.a * gap, b0.h * gap, b0.b * gap)), em = new T.LineBasicMaterial({ color: new T.Color(b0.color).multiplyScalar(0.62) }); const grp = new T.Group(); list.forEach(b => { const ls = new T.LineSegments(eg, em); ls.position.set(b.x + b.a / 2 - c.L / 2, b.y + b.h / 2, b.z + b.b / 2 - c.W / 2); grp.add(ls); }); g.root.add(grp); sm.edges = grp; }
    });
    const d = Math.max(c.L, 6); g.camera.position.set(d * 0.78, d * 0.52, d * 0.86); if (g.controls) { g.controls.target.set(0, c.H * 0.4, 0); g.controls.update(); } else g.camera.lookAt(0, c.H * 0.4, 0);
    g.camera.fov = 32; g.camera.updateProjectionMatrix(); if (g.controls) { g.controls.maxDistance = Math.max(d * 1.9, c.L / 2 + 14); g.controls.minDistance = Math.max(3, c.L * 0.45); }
    g.seq = seq; this._reveal(0); this._setPlay(true); if ((this.state.view || 'iso') !== 'iso') this._fit(this.state.view);
  }
  renderVals() {
    const s = this.state, mode = s.mode || 'FCL';
    const n = v => Math.round(v).toLocaleString('en-IN'), items = s.items;
    const metrics = p => { const [l, w, h] = unitDims(p), v = l * w * h; return {v, tv: v * p.qty, tw: p.wt * WT[p.wu] * p.qty }; };
    const tot = items.reduce((a, p) => { const m = metrics(p); return { cbm: a.cbm + m.tv, wt: a.wt + m.tw, qty: a.qty + p.qty }; }, { cbm: 0, wt: 0, qty: 0 });
    const LIST = [...CONTAINERS, ...(s.customC ? [s.customC] : [])];
    const evals = items.length ? LIST.map(c => { const pk = pack(items, c, 20); return { c, pk, need: pk.all ? pk.conts.length : Infinity, bad: pk.rows.filter(r => r.reason === 'Exceeds container internal dimensions') }; }) : LIST.map(c => ({ c, pk: null, need: 0, bad: [] }));
    const dry = evals.filter(e => !e.c.reefer && !e.c.custom && isFinite(e.need) && e.need > 0);
    const rec = dry.filter(e => e.need === 1).sort((a, b) => a.c.cap - b.c.cap)[0] || dry.slice().sort((a, b) => a.need - b.need || b.c.cap - a.c.cap)[0];
    const selCode = s.chosen || (rec ? rec.c.code : '40HC'), sel = evals.find(e => e.c.code === selCode);
    const f = s.f, isCyl = cyl(f.type), du = s.dimUnit;
    const set = k => e => { const v = e.target.value; this.setState(st => ({ f: { ...st.f, [k]: v }, error: '' })); };
    const modeCard = (code, name, desc) => { const on = mode === code; return { code, name, desc, mark: on ? '✓' : '', pick: () => this.setState({ mode: code }), dot: { width: '22px', height: '22px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#fff', background: on ? 'var(--blue-600)' : '#fff', border: on ? 'none' : '1.5px solid var(--line-strong)', boxSizing: 'border-box' }, style: { padding: '16px 18px', borderRadius: '14px', cursor: 'pointer', background: on ? 'var(--blue-50)' : '#fff', border: on ? '1.5px solid var(--blue-500)' : '1px solid var(--line)', boxShadow: on ? 'var(--shadow-md)' : 'none', transition: 'all .15s' } }; };
    const num = x => parseFloat(x);
    const draft = { type: f.type, l: num(f.l) || 0, w: isCyl ? 0 : num(f.w) || 0, h: num(f.h) || 0, wt: num(f.wt) || 0, qty: parseInt(f.qty, 10) || 0, unit: du, wu: s.wtUnit };
    const dm = metrics(draft);
    const saveItem = () => {
      if (!f.name.trim()) return this.setState({ error: 'Add a product name.' });
      if (!(draft.l > 0) || !(isCyl || draft.w > 0) || !(draft.h > 0)) return this.setState({ error: 'Enter all dimensions (greater than 0).' });
      if (!(draft.wt > 0)) return this.setState({ error: 'Enter the weight per unit.' });
      if (!(draft.qty >= 1)) return this.setState({ error: 'Quantity must be at least 1.' });
      const pos = (use, v) => { const x = parseFloat(v); return use && x > 0 ? x : null; };
      const base = { ...draft, name: f.name.trim(), sku: f.sku.trim(), color: f.color, rotation: f.rotation, tilt: (f.type === 'box' || f.type === 'custom') && f.tilt, stackable: f.stackable, maxLayers: f.stackable ? pos(f.useLayers, f.maxLayers) : 1, maxStackH: f.stackable ? pos(f.useStackH, f.maxStackH) : null, maxTop: f.stackable ? pos(f.useTop, f.maxTop) : null, spacing: [num(f.sl) || 0, num(f.sw) || 0, num(f.sh) || 0] };
      if (s.editingId) { this.setState(st => ({ items: st.items.map(x => x.id === st.editingId ? { ...x, ...base } : x), editingId: null, adding: false, viewIdx: 0 })); this.flash(base.name + ' updated'); }
      else { this.setState(st => ({ items: [...st.items, { ...base, id: 'p' + Date.now() }], adding: false, viewIdx: 0 })); this.flash(base.name + ' added'); }
    };
    const tile = t => ({ pick: () => this.setState(st => ({ f: { ...st.f, type: t } })), style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '16px 4px 14px', borderRadius: '14px', cursor: 'pointer', textAlign: 'center', border: f.type === t ? '2px solid var(--blue-500)' : '1px solid var(--line)', background: f.type === t ? 'var(--blue-50)' : '#fff', color: f.type === t ? 'var(--blue-700)' : 'var(--ink)', boxShadow: f.type === t ? '0 0 0 4px rgba(74,130,217,.15)' : 'none', margin: f.type === t ? '0' : '1px', transition: 'all .15s' } });
    const chk = (useK, valK) => ({ toggle: () => this.setState(st => ({ f: { ...st.f, [useK]: !st.f[useK] } })), mark: f[useK] ? '✓' : '', box: { width: '22px', height: '22px', borderRadius: '6px', border: f[useK] ? 'none' : '1.5px solid var(--line-strong)', background: f[useK] ? 'var(--blue-600)' : '#fff', color: '#fff', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxSizing: 'border-box' }, value: f[valK], on: e => { const v = e.target.value; this.setState(st => ({ f: { ...st.f, [valK]: v, [useK]: v !== '' } })); } });
    const trk = on => ({ width: '42px', height: '24px', borderRadius: '999px', background: on ? 'var(--blue-600)' : 'var(--line-strong)', position: 'relative', cursor: 'pointer', flex: 'none', transition: 'background .15s' }), knb = on => ({ position: 'absolute', top: '3px', left: on ? '21px' : '3px', width: '18px', height: '18px', borderRadius: '999px', background: '#fff', boxShadow: '0 1px 3px rgba(14,23,38,.25)', transition: 'left .15s' });
    const isCustomBox = f.type === 'box' || f.type === 'custom';
    const used = items.map(p => p.color);
    const out = {
      modes: [modeCard('FCL', 'Full container load', 'See how many containers you need and how they load.'), modeCard('LCL', 'Less than container load', 'Get total CBM, weight and the chargeable W/M.')],
      dimUnit: du, wtUnit: s.wtUnit, dimUnitU: du.toUpperCase(), wtUnitU: s.wtUnit.toUpperCase(), onDimUnit: e => this.setState({ dimUnit: e.target.value }), onWtUnit: e => this.setState({ wtUnit: e.target.value }),
      adding: s.adding, stop: e => e.stopPropagation(),
      openAdd: () => { const free = COLORS.find(c => !used.includes(c)) || COLORS[items.length % COLORS.length]; this.setState({ adding: true, editingId: null, error: '', f: BLANK(free) }); },
      closeAdd: () => this.setState({ adding: false, editingId: null, error: '' }),
      f, on: { name: set('name'), sku: set('sku'), wt: set('wt'), qty: set('qty'), rotation: set('rotation') },
      g: previewGeom(f),
      tp: { box: tile('box'), pallet: tile('pallet'), sack: tile('sack'), bigbag: tile('bigbag'), barrel: tile('barrel'), roll: tile('roll'), custom: tile('custom') },
      adv: { layers: chk('useLayers', 'maxLayers'), stackH: chk('useStackH', 'maxStackH'), top: chk('useTop', 'maxTop') },
      advOpen: s.advOpen, toggleAdv: () => this.setState(st => ({ advOpen: !st.advOpen })), advChev: { fontSize: '18px', color: 'var(--ink-2)', transform: s.advOpen ? 'none' : 'rotate(-90deg)', transition: 'transform .15s', lineHeight: 1 },
      advSummary: 'Tilt: ' + (isCustomBox && f.tilt ? 'on' : 'off') + ' · Rotation: ' + (f.rotation === 'fixed' ? 'fixed' : 'allowed') + ' · Stacking: ' + (f.stackable ? 'allowed' : 'disabled'),
      orientNote: ORIENT[f.type], canTilt: isCustomBox, toggleTilt: () => this.setState(st => ({ f: { ...st.f, tilt: !st.f.tilt } })), tiltTrack: trk(f.tilt), tiltKnob: knb(f.tilt),
      rulesWrap: { display: 'flex', flexDirection: 'column', gap: '14px', opacity: f.stackable ? 1 : 0.45, pointerEvents: f.stackable ? 'auto' : 'none' },
      spacing: [['Length', 'sl'], ['Width', 'sw'], ['Height', 'sh']].map(([label, k]) => ({ label, value: f[k], on: set(k) })),
      swatches: COLORS.map(c => ({ hex: c, pick: () => this.setState(st => ({ f: { ...st.f, color: c } })), style: { width: '34px', height: '34px', borderRadius: '999px', background: c, cursor: 'pointer', boxShadow: f.color === c ? '0 0 0 3px #fff, 0 0 0 5px ' + c : 'none', transition: 'box-shadow .15s' } })),
      dimFields: (isCyl ? [['Diameter', 'l'], [f.type === 'roll' ? 'Length' : 'Height', 'h']] : [['Length', 'l'], ['Width', 'w'], ['Height', 'h']]).map(([lab, k]) => ({ label: lab, value: f[k], on: set(k) })),
      toggleStack: () => this.setState(st => ({ f: { ...st.f, stackable: !st.f.stackable } })), stackTrack: trk(!f.stackable), stackKnob: knb(!f.stackable),
      stackHint: f.stackable ? 'Units can be stacked on top of each other.' : 'Floor-loaded only, one layer.',
      pv: (() => { const dims = isCyl ? (f.type === 'roll' ? 'Ø ' + (f.l || 0) + ' × L ' + (f.h || 0) : 'Ø ' + (f.l || 0)) : 'L ' + (f.l || 0) + ' × W ' + (f.w || 0); const cell = i => ({ padding: '14px 18px', borderLeft: i ? '1px solid var(--line)' : 'none', minWidth: 0 });
        const z = v => v || 0; return { hT: z(f.h), lT: 'L ' + z(f.l), wT: 'W ' + z(f.w), lwT: 'L ' + z(f.l) + ' × W ' + z(f.w), dT: 'Ø ' + z(f.l), rlT: 'L ' + z(f.h), label: TYPE_P[f.type] + ' · ' + du.toUpperCase(), hLabel: f.type === 'roll' ? '' : 'H ' + (f.h || 0), foot: dims, isBox: f.type === 'box' || f.type === 'custom', isSack: f.type === 'sack', isBag: f.type === 'bigbag', isBarrel: f.type === 'barrel', isRoll: f.type === 'roll', isPallet: f.type === 'pallet',
          rows: [{ k: 'CBM / unit', v: dm.v.toFixed(4) }, { k: 'Total CBM', v: dm.tv.toFixed(3) }, { k: 'Total weight', v: n(dm.tw) + ' kg' }, { k: 'Quantity', v: n(draft.qty) }].map((r, i) => ({ ...r, cell: cell(i) })) }; })(),
      formTitle: s.editingId ? 'Edit product' : 'Add product', saveLabel: s.editingId ? 'Update product' : 'Add product', error: s.error, saveItem,
      empty: !items.length, hasItems: items.length > 0,
      loadSample: () => { this.setState({ items: SAMPLE(), chosen: null, viewIdx: 0 }); this.flash('Sample cargo loaded'); },
      askReset: () => { if (window.confirm('Clear all cargo items?')) this.setState({ items: [], chosen: null, viewIdx: 0 }); },
      rows: items.map((p, i) => { const m = metrics(p), fitsAny = mode === 'LCL' || evals.some(e => !e.c.reefer && e.pk && !e.pk.rows.find(r => r.id === p.id && r.reason === 'Exceeds container internal dimensions')); return { name: p.name, sku: p.sku || '', type: TYPE_L[p.type], dims: cyl(p.type) ? 'Ø' + p.l + ' × ' + p.h + ' ' + p.unit : p.l + ' × ' + p.w + ' × ' + p.h + ' ' + p.unit, wt: p.wt + ' ' + p.wu + '/unit', wtU: p.wt + ' ' + p.wu, qty: n(p.qty), cbm: m.tv.toFixed(3), total: n(m.tw) + ' kg', status: fitsAny ? 'Ready' : 'Too large', pill: fitsAny ? pill('var(--good-50)', 'var(--good-600)') : pill('var(--amber-50)', 'var(--amber-600)'), dot: { width: '14px', height: '14px', borderRadius: cyl(p.type) ? '999px' : '4px', background: p.color, flex: 'none' },
        edit: () => this.setState({ adding: true, editingId: p.id, dimUnit: p.unit, wtUnit: p.wu, error: '', f: { name: p.name, sku: p.sku || '', type: p.type, color: p.color, l: String(p.l), w: String(p.w || ''), h: String(p.h), wt: String(p.wt), qty: String(p.qty), rotation: p.rotation || 'allowed', tilt: !!p.tilt, stackable: p.stackable !== false, useLayers: p.stackable !== false && !!p.maxLayers, maxLayers: p.stackable !== false && p.maxLayers ? String(p.maxLayers) : '', useStackH: !!p.maxStackH, maxStackH: p.maxStackH ? String(p.maxStackH) : '', useTop: !!p.maxTop, maxTop: p.maxTop ? String(p.maxTop) : '', sl: p.spacing && p.spacing[0] ? String(p.spacing[0]) : '', sw: p.spacing && p.spacing[1] ? String(p.spacing[1]) : '', sh: p.spacing && p.spacing[2] ? String(p.spacing[2]) : '' } }),
        dup: () => this.setState(st => { const arr = [...st.items]; arr.splice(i + 1, 0, { ...p, id: 'p' + Date.now(), name: p.name + ' (copy)', color: COLORS.find(c => !st.items.some(x => x.color === c)) || p.color }); return { items: arr }; }),
        del: () => { this.setState(st => ({ items: st.items.filter(x => x.id !== p.id), viewIdx: 0 })); this.flash(p.name + ' removed'); } }; }),
      showFcl: mode === 'FCL' && items.length > 0, showLcl: mode === 'LCL' && items.length > 0, viewRef: this.viewRef,
      dList: FAQS.map(([q], i) => ({ q, n: String(i + 1).padStart(2, '0'), pick: () => this.setState({ faqD: i }), style: { display: 'flex', gap: '14px', alignItems: 'baseline', width: '100%', textAlign: 'left', padding: '14px 16px', borderRadius: '10px', fontSize: '15px', fontWeight: (this.state.faqD || 0) === i ? 600 : 500, lineHeight: 1.4, background: (this.state.faqD || 0) === i ? '#fff' : 'transparent', color: (this.state.faqD || 0) === i ? 'var(--ink)' : 'var(--ink-2)', boxShadow: (this.state.faqD || 0) === i ? 'var(--shadow-sm)' : 'none', border: '1px solid ' + ((this.state.faqD || 0) === i ? 'var(--line)' : 'transparent'), cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit' } })),
      dQ: FAQS[this.state.faqD || 0][0], dA: FAQS[this.state.faqD || 0][1], dN: String((this.state.faqD || 0) + 1).padStart(2, '0') + ' / ' + String(FAQS.length).padStart(2, '0'),
      dPrev: () => this.setState(st => ({ faqD: ((st.faqD || 0) + FAQS.length - 1) % FAQS.length })), dNext: () => this.setState(st => ({ faqD: ((st.faqD || 0) + 1) % FAQS.length })), 
      faqs: FAQS.map(([q, a], i) => ({ q, a, open: s.faq === i, sign: s.faq === i ? '−' : '+', toggle: () => this.setState(st => ({ faq: st.faq === i ? -1 : i })) })),
      refRows: CONTAINERS.map(c => ({ code: c.code, name: c.name, cap: c.cap + ' m³', max: n(c.max) + ' kg', door: c.door + ' m', dims: c.L.toFixed(2) + ' × ' + c.W.toFixed(2) + ' × ' + c.H.toFixed(2) + ' m' })),
      toast: s.toast
    };
    out.tt = { qty: n(tot.qty), cbm: tot.cbm.toFixed(3), wt: n(tot.wt) + ' kg' };
    const hi = { padding: '16px 18px', borderRadius: '14px', background: 'var(--blue-50)', border: '1.5px solid var(--blue-500)' }, lo = { padding: '16px 18px', borderRadius: '14px', background: '#fff', border: '1px solid var(--line)' };
    const mt = tot.wt / 1000, wm = Math.max(tot.cbm, mt), volWins = tot.cbm >= mt, lines = items.length + ' line' + (items.length === 1 ? '' : 's');
    out.totals = mode === 'FCL'
      ? [{ k: 'Total packages', v: n(tot.qty), sub: lines, box: lo }, { k: 'Total volume', v: tot.cbm.toFixed(2), sub: 'CBM', box: hi }, { k: 'Gross weight', v: n(tot.wt), sub: 'kg', box: lo }, { k: 'Recommended', v: rec ? rec.need + ' × ' + rec.c.code : '-', sub: rec ? rec.c.name : 'Check dimensions', box: { ...hi, background: 'var(--tint-blue, #EFF5FE)' } }]
      : [{ k: 'Total packages', v: n(tot.qty), sub: lines, box: lo }, { k: 'Total volume', v: tot.cbm.toFixed(2), sub: 'CBM', box: volWins ? hi : lo }, { k: 'Gross weight', v: mt.toFixed(2), sub: 'metric tons', box: volWins ? lo : hi }, { k: 'Chargeable', v: wm.toFixed(2), sub: 'W/M', box: { ...hi, background: 'var(--tint-blue, #EFF5FE)' } }];
    this._plan = null;
    if (out.showFcl && sel && sel.pk) {
      out.recTitle = rec ? rec.need + ' × ' + rec.c.name + (rec.need === 1 ? ' fits your cargo.' : ' carries your cargo.') : 'Some items don\u2019t fit a standard container.';
      out.recSub = rec ? (selCode === rec.c.code ? 'Here\u2019s how it loads. Click any container below to compare its loading plan.' : 'Showing ' + sel.c.name + '. Recommended is ' + rec.c.name + '.') : 'Items marked “Too large” exceed the internal dimensions of every dry container and may need open-top or flat-rack equipment.';
      const qty = s.qtyOverride || (isFinite(sel.need) ? sel.need : 1), pk = s.qtyOverride ? pack(items, sel.c, qty) : sel.pk, vi = Math.min(s.viewIdx, Math.max(0, pk.conts.length - 1)), k = pk.conts[vi], c = sel.c;
      const bar = (p, col) => ({ width: Math.min(100, p) + '%', height: '10px', borderRadius: '999px', background: col, transition: 'width .5s ease' });
      const vp = k ? k.vol / c.cap * 100 : 0, wp = k ? k.wt / c.max * 100 : 0;
      const inK = {}; (k ? k.boxes : []).forEach(b => { inK[b.pid] = (inK[b.pid] || 0) + 1; });
      out.plan = { code: c.code, title: c.name + ' · container ' + (vi + 1) + ' of ' + pk.conts.length,
        tabs: pk.conts.length > 1 ? pk.conts.map((_, i) => ({ label: '#' + (i + 1), pick: () => this.setState({ viewIdx: i }), style: { height: '30px', padding: '0 10px', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, border: '1px solid ' + (i === vi ? 'var(--blue-500)' : 'var(--line)'), background: i === vi ? 'var(--blue-50)' : '#fff', color: i === vi ? 'var(--blue-700)' : 'var(--ink-2)' } })) : [],
        vol: (k ? k.vol : 0).toFixed(1) + ' / ' + c.cap + ' m³ · ' + vp.toFixed(0) + '%', wt: n(k ? k.wt : 0) + ' / ' + n(c.max) + ' kg · ' + wp.toFixed(0) + '%', vBar: bar(vp, 'var(--blue-500)'), wBar: bar(wp, wp > 90 ? 'var(--amber-500)' : 'var(--ink-3)'),
        items: items.filter(p => inK[p.id]).map(p => ({ name: p.name, count: n(inK[p.id]) + ' units', dot: { width: '14px', height: '14px', borderRadius: cyl(p.type) ? '999px' : '4px', background: p.color, flex: 'none' } })),
        rows: pk.conts.length > 1 || !pk.all ? pk.rows.map(r => { const all = r.loaded >= r.qty; return { name: r.name + ' · all containers', count: n(r.loaded) + ' / ' + n(r.qty), status: all ? 'Loaded' : r.loaded ? 'Partial' : 'Not loaded', pill: all ? pill('var(--good-50)', 'var(--good-600)') : pill('var(--amber-50)', 'var(--amber-600)'), dot: dotS(r.color) }; }) : [],
        warnings: pk.rows.filter(r => r.loaded < r.qty).map(r => ({ title: n(r.qty - r.loaded) + ' × ' + r.name + ' not loaded', reason: r.reason })) };
      this._plan = { c, k, key: JSON.stringify([items, selCode, vi]) };
      out.compare = evals.map(e => { const on = e.c.code === selCode, isRec = rec && e.c.code === rec.c.code, fin = isFinite(e.need) && e.need > 0; const v2 = fin ? tot.cbm / (e.c.cap * e.need) * 100 : 0, w2 = fin ? tot.wt / (e.c.max * e.need) * 100 : 0; const status = !isFinite(e.need) ? (e.bad.length ? 'Doesn\u2019t fit' : 'Over 20 units') : isRec ? 'Recommended' : e.c.reefer ? 'Reefer' : e.need === 1 ? 'Suitable' : 'Needs ' + e.need; const pc = status === 'Recommended' ? pill('var(--good-50)', 'var(--good-600)') : status === 'Suitable' ? pill('var(--blue-50)', 'var(--blue-700)') : status === 'Reefer' || status.startsWith('Needs') ? pill('var(--paper-3)', 'var(--ink-2)') : pill('var(--amber-50)', 'var(--amber-600)'); const b2 = (p, col) => ({ width: Math.min(100, p) + '%', height: '8px', borderRadius: '999px', background: col, transition: 'width .5s ease' });
        return { code: e.c.code, name: e.c.name, status, pill: pc, n: fin ? e.need : '-', nLabel: fin ? (e.need === 1 ? 'container' : 'containers') : 'cargo doesn\u2019t fit', vPct: v2.toFixed(0) + '%', wPct: w2.toFixed(0) + '%', vBar: b2(v2, 'var(--blue-500)'), wBar: b2(w2, w2 > 90 ? 'var(--amber-500)' : 'var(--ink-3)'), cap: e.c.cap + ' m³', max: n(e.c.max) + ' kg', dims: e.c.L + '×' + e.c.W + '×' + e.c.H + ' m', warn: e.bad.length ? e.bad.map(b => b.name).join(', ') + ' exceed' + (e.bad.length === 1 ? 's' : '') + ' internal dimensions.' : '', pick: () => this.setState({ chosen: e.c.code, viewIdx: 0, qtyOverride: null }), maxN: n(e.c.max), row: { display: 'grid', gridTemplateColumns: 'minmax(170px,1.3fr) 80px 90px 60px minmax(0,1.25fr) minmax(0,1.25fr) 150px', gap: '0 12px', alignItems: 'center', height: '58px', padding: '0 20px', borderBottom: '1px solid var(--line-soft)', cursor: 'pointer', background: on ? 'var(--blue-50)' : '#fff' }, radio: { width: '18px', height: '18px', boxSizing: 'border-box', borderRadius: '999px', border: on ? '5px solid var(--blue-600)' : '1.5px solid var(--line-strong)', flex: 'none', background: '#fff' },
          card: { background: '#fff', border: on ? '1.5px solid var(--blue-500)' : '1px solid var(--line)', borderRadius: '18px', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '14px', cursor: 'pointer', boxShadow: on ? 'var(--shadow-xl)' : 'var(--shadow-sm)', transition: 'all .2s ease', opacity: isFinite(e.need) ? 1 : 0.75 } }; });
      const isRec = rec && rec.c.code === selCode;
      out.selCard = { kicker: isRec ? 'RECOMMENDED CONTAINER' : 'SELECTED CONTAINER', kickerStyle: { flex: 1, whiteSpace: 'nowrap', fontSize: '12.5px', fontWeight: 700, letterSpacing: '.1em', color: isRec ? 'var(--good-600)' : 'var(--blue-700)' }, showUseRec: !!rec && !isRec, useRec: () => this.setState({ chosen: null, qtyOverride: null, viewIdx: 0 }), name: c.name, cap: c.cap + ' m³', max: n(c.max) + ' kg', qty,
        note: !isFinite(sel.need) ? 'Some cargo doesn’t fit this container.' : s.qtyOverride && s.qtyOverride < sel.need ? 'Cargo needs ' + sel.need + '. Some items won’t be loaded.' : sel.need === 1 ? 'All cargo fits in one container.' : 'Cargo needs ' + sel.need + ' containers.', calcLabel: s.calculated ? 'Recalculate loading' : 'Calculate loading' };
      out.decQty = () => this.setState({ qtyOverride: Math.max(1, qty - 1), viewIdx: 0 }); out.incQty = () => this.setState({ qtyOverride: Math.min(20, qty + 1), viewIdx: 0 });
      out.calculate = () => { this.setState({ calculated: true }); setTimeout(() => { const el = this.planRef.current; if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: 'smooth' }); }, 60); };
    } else { out.compare = []; out.plan = { tabs: [], items: [], rows: [], warnings: [] }; out.selCard = {}; }
    out.calculated = s.calculated; out.planRef = this.planRef; out.panelRef = this.panelRef; out.seqRangeRef = this.seqRangeRef; out.seqLabelRef = this.seqLabelRef;
    { const cur = s.view || 'iso'; out.views = [['iso', '3D'], ['top', 'Top'], ['side', 'Side'], ['door', 'Door']].map(([id, label]) => ({ label, pick: () => { this.setState({ view: id }); this._fit(id); }, style: { height: '28px', padding: '0 12px', borderRadius: '7px', fontSize: '13px', fontWeight: 600, background: cur === id ? 'var(--blue-50)' : 'transparent', color: cur === id ? 'var(--blue-700)' : 'var(--ink-2)', boxShadow: cur === id ? 'inset 0 0 0 1px var(--blue-300)' : 'none' } })); }
    out.playLabel = s.playing ? '❚❚  Pause' : '▶  Play';
    out.togglePlay = () => this._setPlay(!(this._g && this._g.seq && this._g.seq.playing));
    out.scrub = e => { this._setPlay(false); const g = this._g; if (g && g.seq) this._reveal(Math.round(+e.target.value / 1000 * g.seq.total)); };
    out.fsLabel = s.fs ? 'Exit full screen' : '⤢  Full screen';
    out.toggleFs = () => this._applyFs(!s.fs);
    {
      const pc = s.pickCode || selCode, cd = s.cdraft, isC = pc === 'CUSTOM';
      const draftC = () => { const L = parseFloat(cd.L), W = parseFloat(cd.W), H = parseFloat(cd.H), mx2 = parseFloat(cd.max); return L > 0 && W > 0 && H > 0 && mx2 > 0 ? { code: 'CUSTOM', name: 'Custom container', L, W, H, cap: +(L * W * H).toFixed(1), max: mx2, custom: true, tare: 0, door: '-' } : null; };
      const cardsSrc = [...CONTAINERS, { code: 'CUSTOM', name: 'Custom container', custom: true }];
      out.pickCards = cardsSrc.map(c => { const on = pc === c.code; return { name: c.name, sub: c.custom ? (s.customC ? s.customC.cap + ' m³  ' + n(s.customC.max) + ' kg' : 'Your dimensions') : c.cap + ' m³  ' + n(c.max) + ' kg', custom: !!c.custom, std: !c.custom, reefer: !!c.reefer, isRec: !!rec && rec.c.code === c.code, pick: () => this.setState(st => { const ev = evals.find(e => e.c.code === c.code); return { pickCode: c.code, pickQty: ev && isFinite(ev.need) && ev.need > 0 ? ev.need : st.pickQty }; }),
        style: { display: 'flex', flexDirection: 'column', gap: '8px', padding: '18px 14px 16px', borderRadius: '16px', cursor: 'pointer', border: on ? '2px solid var(--blue-500)' : '1px solid var(--line)', background: on ? 'var(--blue-50)' : '#fff', boxShadow: on ? '0 0 0 4px rgba(74,130,217,.15)' : 'none', margin: on ? 0 : '1px', transition: 'all .15s' } }; });
      const pcC = isC ? (s.customC || { name: 'Custom container' }) : CONTAINERS.find(c => c.code === pc) || CONTAINERS[0];
      out.pd = { name: isC ? 'Custom container' : pcC.name, custom: isC, std: !isC,
        rows: isC ? [] : [{ k: 'Inside length', v: pcC.L.toFixed(3) + ' m' }, { k: 'Inside width', v: pcC.W.toFixed(3) + ' m' }, { k: 'Inside height', v: pcC.H.toFixed(3) + ' m' }, { k: 'Capacity', v: pcC.cap + ' m³' }, { k: 'Tare weight', v: n(pcC.tare) + ' kg' }, { k: 'Max payload', v: n(pcC.max) + ' kg' }],
        fields: [['Inside length', 'L', 'm'], ['Inside width', 'W', 'm'], ['Inside height', 'H', 'm'], ['Max payload', 'max', 'kg']].map(([label, k, unit]) => ({ label, unit, value: cd[k], on: e => { const v = e.target.value; this.setState(st => ({ cdraft: { ...st.cdraft, [k]: v } })); } })) };
      const pe = evals.find(e => e.c.code === pc);
      out.picking = s.picking; out.pickQty = s.pickQty;
      out.pickNote = isC && !draftC() && !s.customC ? 'Enter inside dimensions and payload.' : pe && items.length ? (isFinite(pe.need) ? 'Cargo needs about ' + pe.need + ' × ' + pe.c.name : 'Some cargo doesn’t fit this container.') : '';
      out.pickDec = () => this.setState(st => ({ pickQty: Math.max(1, st.pickQty - 1) })); out.pickInc = () => this.setState(st => ({ pickQty: Math.min(20, st.pickQty + 1) }));
      out.openPicker = () => this.setState({ picking: true, pickCode: selCode, pickQty: out.selCard && out.selCard.qty ? out.selCard.qty : 1, cdraft: s.customC ? { L: String(s.customC.L), W: String(s.customC.W), H: String(s.customC.H), max: String(s.customC.max) } : s.cdraft });
      out.closePicker = () => this.setState({ picking: false });
      out.confirmPick = () => { let custom = s.customC; if (isC) { custom = draftC(); if (!custom) { this.flash('Enter custom container dimensions'); return; } } const ev = !isC && evals.find(e => e.c.code === pc); const auto = ev && isFinite(ev.need) && ev.need === s.pickQty; this.setState({ picking: false, chosen: pc, customC: custom, qtyOverride: auto ? null : s.pickQty, viewIdx: 0 }); this.flash((isC ? 'Custom container' : pcC.name) + ' selected'); };
    }
    const mx = Math.max(tot.cbm, mt) || 1;
    out.lcl = { wm: wm.toFixed(2), note: (volWins ? 'Volume' : 'Weight') + ' decides your charge: ' + tot.cbm.toFixed(2) + ' CBM vs ' + mt.toFixed(2) + ' metric tons. ' + (volWins ? 'Your cargo is light for its size, so you pay for the space it takes.' : 'Your cargo is dense, so you pay on weight.'),
      bars: [{ k: 'Volume', v: tot.cbm.toFixed(2) + ' CBM', bar: { width: tot.cbm / mx * 100 + '%', height: '12px', borderRadius: '999px', background: volWins ? 'var(--blue-500)' : 'var(--line-strong)', transition: 'width .5s ease' } }, { k: 'Weight', v: mt.toFixed(2) + ' MT', bar: { width: mt / mx * 100 + '%', height: '12px', borderRadius: '999px', background: volWins ? 'var(--line-strong)' : 'var(--blue-500)', transition: 'width .5s ease' } }] };
    return out;
  }

  render() {
    const V = this.renderVals();
    return (
<main className="ft-page">
<section className="section" style={{ position: "relative", overflow: "hidden", padding: "44px 20px 44px", background: "linear-gradient(180deg,#EFF5FE 0%,#F7F9FC 55%,#fff 100%)" }}>
  <div className="hero-glow-a"></div>
  <div className="hero-glow-b"></div>
  <div className="hero-grid"></div>
  <div style={{ position: "relative", maxWidth: "1440px", margin: "0 auto" }}>
    <div style={{ maxWidth: "820px", margin: "0 auto 36px", textAlign: "center" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 12px", borderRadius: "999px", background: "#fff", border: "1px solid var(--line)", boxShadow: "var(--shadow-xs)", marginBottom: "20px" }}>
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--good-500)" }}></span>
        <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-2)" }}>Free tool · No sign-up</span>
      </div>
      <h1 className="hero-h1" style={{ fontWeight: "600", fontSize: "clamp(40px,5vw,60px)", lineHeight: "1.04", letterSpacing: "-.035em", margin: "0 0 18px", textWrap: "balance" }}>Know your CBM<br /><span style={{ background: "linear-gradient(120deg,var(--blue-600) 0%,var(--orange-500) 60%,var(--amber-500) 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>before you book the box.</span></h1>
      <p style={{ fontSize: "18px", lineHeight: "1.6", color: "var(--ink-2)", margin: "0 auto", maxWidth: "620px", textWrap: "pretty" }}>Add your cargo, get total cubic metres and weight, then see which container fits, or what you'll be charged as LCL.</p>
    </div>

    <div id="calculator" style={{ padding: "2px", borderRadius: "24px", background: "conic-gradient(from var(--bang),var(--blue-500) 0%,var(--blue-300) 20%,var(--orange-500) 45%,var(--amber-500) 60%,var(--blue-300) 80%,var(--blue-500) 100%)", animation: "border-spin 4s linear infinite", boxShadow: "var(--shadow-xl)" }}>
      <div style={{ background: "#fff", borderRadius: "22px" }}>
      <div className="calc-pad" style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "24px" }}>

        <div className="grid-1-md" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr) 230px", gap: "14px" }}>
          {(V.modes || []).map((m, mI) => (<Fragment key={mI}>
            <div onClick={m.pick} style={m.style}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ fontFamily: "var(--font-mono)", fontSize: "20px", fontWeight: "700" }}>{m.code}</span><span style={{ fontSize: "14px", fontWeight: "600", color: "var(--ink-2)", flex: "1" }}>{m.name}</span><span style={m.dot}>{m.mark}</span></div>
              <div style={{ fontSize: "13.5px", color: "var(--ink-3)", marginTop: "6px", lineHeight: "1.5" }}>{m.desc}</div>
            </div>
          </Fragment>
))}
          <div style={{ border: "1px solid var(--line)", borderRadius: "14px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", justifyContent: "center" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: ".1em", color: "var(--ink-3)" }}>UNITS</div>
            <div style={{ display: "flex", gap: "8px" }}>
              <select value={V.dimUnit} onChange={V.onDimUnit} aria-label="Dimension unit" style={{ flex: "1", height: "38px", border: "1px solid var(--line)", borderRadius: "9px", fontFamily: "var(--font-mono)", fontSize: "13px", background: "#fff", padding: "0 8px" }}><option value="cm">CM</option><option value="mm">MM</option><option value="m">M</option><option value="in">INCH</option></select>
              <select value={V.wtUnit} onChange={V.onWtUnit} aria-label="Weight unit" style={{ flex: "1", height: "38px", border: "1px solid var(--line)", borderRadius: "9px", fontFamily: "var(--font-mono)", fontSize: "13px", background: "#fff", padding: "0 8px" }}><option value="kg">KG</option><option value="lb">LB</option></select>
            </div>
          </div>
        </div>

        {V.empty ? (<>
          <div style={{ border: "1.5px dashed var(--line-strong)", borderRadius: "16px", padding: "36px 20px", textAlign: "center" }}>
            <div style={{ fontSize: "16px", fontWeight: "600" }}>No cargo items yet</div>
            <div style={{ fontSize: "14px", color: "var(--ink-3)", marginTop: "4px" }}>Add your first product, or try it with sample cargo.</div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginTop: "14px" }}><button onClick={V.openAdd} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid var(--blue-600)", background: "var(--blue-600)", color: "#fff", fontSize: "14px", fontWeight: "600", lineHeight: "1", boxShadow: "var(--shadow-blue)" }}><span style={{ flex: "none", display: "flex", alignItems: "center", justifyContent: "center", width: "20px", height: "20px", borderRadius: "999px", background: "rgba(255,255,255,.22)" }}><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"><path d="M6 2v8M2 6h8" /></svg></span><span>Add product</span></button><button onClick={V.loadSample} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid var(--line-strong)", background: "#fff", fontSize: "14px", fontWeight: "600", lineHeight: "1", color: "var(--ink)" }}>Load sample cargo</button></div>
          </div>
        </>) : null}

        {V.hasItems ? (<>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ border: "1px solid var(--line)", borderRadius: "16px", overflow: "hidden", background: "#fff" }}>
              <div style={{ overflowX: "auto" }}>
                <div style={{ minWidth: "780px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "minmax(120px,2fr) 60px minmax(100px,1.2fr) 66px 44px 64px 86px 76px 96px", gap: "0 8px", alignItems: "center", height: "46px", padding: "0 16px", background: "var(--paper-2)", borderBottom: "1px solid var(--line)", fontSize: "12px", fontWeight: "600", letterSpacing: ".08em", color: "var(--ink-3)", textTransform: "uppercase" }}><div>Product</div><div>Type</div><div>Dimensions</div><div style={{ textAlign: "right" }}>Wt / unit</div><div style={{ textAlign: "right" }}>Qty</div><div style={{ textAlign: "right" }}>CBM</div><div style={{ textAlign: "right" }}>Total wt</div><div style={{ paddingLeft: "10px" }}>Status</div><div></div></div>
                  {(V.rows || []).map((p, pI) => (<Fragment key={pI}>
                    <div style={{ display: "grid", gridTemplateColumns: "minmax(120px,2fr) 60px minmax(100px,1.2fr) 66px 44px 64px 86px 76px 96px", gap: "0 8px", alignItems: "center", minHeight: "66px", padding: "10px 16px", borderBottom: "1px solid var(--line-soft)", fontSize: "14.5px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: "0" }}><span style={p.dot}></span><div style={{ minWidth: "0" }}><div style={{ fontWeight: "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div></div></div>
                      <div style={{ color: "var(--ink-2)" }}>{p.type}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--ink-2)" }}>{p.dims}</div>
                      <div style={{ textAlign: "right", fontFamily: "var(--font-mono)" }}>{p.wtU}</div>
                      <div style={{ textAlign: "right", fontFamily: "var(--font-mono)" }}>{p.qty}</div>
                      <div style={{ textAlign: "right", fontFamily: "var(--font-mono)", fontWeight: "600" }}>{p.cbm}</div>
                      <div style={{ textAlign: "right", fontFamily: "var(--font-mono)" }}>{p.total}</div>
                      <div style={{ paddingLeft: "10px" }}><span style={p.pill}>{p.status}</span></div>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "2px" }}>
                        <button className="ft-cbm-h1" onClick={p.edit} title="Edit" aria-label="Edit" style={{ width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-3)" }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg></button>
                        <button className="ft-cbm-h1" onClick={p.dup} title="Duplicate" aria-label="Duplicate" style={{ width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-3)" }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="8" width="14" height="14" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg></button>
                        <button className="ft-cbm-h2" onClick={p.del} title="Remove" aria-label="Remove" style={{ width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-3)" }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg></button>
                      </div>
                    </div>
                  </Fragment>
))}
                  <div style={{ display: "grid", gridTemplateColumns: "minmax(120px,2fr) 60px minmax(100px,1.2fr) 66px 44px 64px 86px 76px 96px", gap: "0 8px", alignItems: "center", height: "54px", padding: "0 16px", background: "#FBFCFE", fontSize: "14.5px", fontWeight: "600" }}><div>Total</div><div></div><div></div><div></div><div style={{ textAlign: "right", fontFamily: "var(--font-mono)" }}>{V.tt.qty}</div><div style={{ textAlign: "right", fontFamily: "var(--font-mono)" }}>{V.tt.cbm}</div><div style={{ textAlign: "right", fontFamily: "var(--font-mono)" }}>{V.tt.wt}</div><div></div><div></div></div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              <button className="ft-cbm-h3" onClick={V.openAdd} style={{ flex: "1", minWidth: "220px", height: "54px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", border: "1.5px dashed var(--blue-500)", borderRadius: "14px", background: "var(--blue-50)", fontSize: "15.5px", fontWeight: "600", color: "var(--blue-700)", transition: "all .15s ease" }}><span style={{ flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "var(--blue-600)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"><path d="M6 2v8M2 6h8" /></svg></span><span>Add another product</span></button>
              <button onClick={V.askReset} style={{ height: "54px", padding: "0 16px", borderRadius: "14px", fontSize: "14px", fontWeight: "600", color: "var(--ink-3)" }}>Clear all</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: "12px" }}>
            {(V.totals || []).map((t, tI) => (<Fragment key={tI}><div style={t.box}><div style={{ fontSize: "12.5px", color: "var(--ink-3)" }}>{t.k}</div><div style={{ fontFamily: "var(--font-mono)", fontSize: "26px", fontWeight: "600", marginTop: "4px", letterSpacing: "-.01em" }}>{t.v}</div><div style={{ fontSize: "12px", color: "var(--ink-3)", marginTop: "2px" }}>{t.sub}</div></div></Fragment>
))}
          </div>
        </>) : null}
      </div>
      </div>
    </div>
  </div>
</section>

{V.showFcl ? (<>
<section className="section" style={{ padding: "44px 20px 44px", background: "#fff" }}>
  <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
    <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
      <div style={{ flex: "1", minWidth: "260px" }}>
        <div className="ds-eyebrow" style={{ marginBottom: "12px" }}>Container recommendation</div>
        <h2 className="ds-h2" style={{ margin: "0", textWrap: "balance" }}>{V.recTitle}</h2>
        <p style={{ margin: "8px 0 0", fontSize: "15px", color: "var(--ink-3)", maxWidth: "640px", textWrap: "pretty" }}>{V.recSub}</p>
      </div>
      <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 18px", borderRadius: "10px", border: "1px solid var(--blue-300)", color: "var(--blue-700)", fontWeight: "600", fontSize: "14px", background: "#fff" }}>Turn this into a quote in Susea →</a>
    </div>

    <div className="grid-1-lg" style={{ display: "grid", gridTemplateColumns: "minmax(0,2.2fr) minmax(0,1fr)", gap: "16px", alignItems: "stretch" }}>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", boxShadow: "var(--shadow-sm)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "16px 20px" }}><h3 style={{ margin: "0", fontSize: "18px", fontWeight: "600", flex: "1" }}>Container comparison</h3><span style={{ fontSize: "13.5px", color: "var(--ink-3)" }}>Click a row to select</span></div>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: "780px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(170px,1.3fr) 80px 90px 60px minmax(0,1.25fr) minmax(0,1.25fr) 150px", gap: "0 12px", alignItems: "center", height: "44px", padding: "0 20px", background: "var(--paper-2)", borderTop: "1px solid var(--line-soft)", borderBottom: "1px solid var(--line)", fontSize: "12px", fontWeight: "600", letterSpacing: ".08em", color: "var(--ink-3)", textTransform: "uppercase" }}><div>Container</div><div style={{ textAlign: "right" }}>Capacity</div><div style={{ textAlign: "right" }}>Payload</div><div style={{ textAlign: "right" }}>Units</div><div>Volume</div><div>Weight</div><div>Status</div></div>
            {(V.compare || []).map((c, cI) => (<Fragment key={cI}>
              <div className="ft-cbm-h4" onClick={c.pick} style={c.row}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "600", minWidth: "0", whiteSpace: "nowrap" }}><span style={c.radio}></span>{c.name}</div>
                <div style={{ textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "13.5px" }}>{c.cap}</div>
                <div style={{ textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "13.5px" }}>{c.maxN}</div>
                <div style={{ textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "15px", fontWeight: "600" }}>{c.n}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingLeft: "12px" }}><div style={{ flex: "1", height: "6px", borderRadius: "999px", background: "var(--paper-3)" }}><div style={c.vBar}></div></div><span style={{ fontFamily: "var(--font-mono)", fontSize: "12.5px", width: "40px", textAlign: "right" }}>{c.vPct}</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><div style={{ flex: "1", height: "6px", borderRadius: "999px", background: "var(--paper-3)" }}><div style={c.wBar}></div></div><span style={{ fontFamily: "var(--font-mono)", fontSize: "12.5px", width: "40px", textAlign: "right" }}>{c.wPct}</span></div>
                <div><span style={c.pill}>{c.status}</span></div>
              </div>
            </Fragment>
))}
          </div>
        </div>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", boxShadow: "var(--shadow-sm)", padding: "20px 22px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={V.selCard.kickerStyle}>{V.selCard.kicker}</span><button onClick={V.openPicker} style={{ fontSize: "14.5px", fontWeight: "600", color: "var(--blue-700)" }}>Select container</button></div>
        <div style={{ fontSize: "24px", fontWeight: "600", letterSpacing: "-.02em" }}>{V.selCard.name}</div>
        <div style={{ display: "flex", justifyContent: "center", padding: "6px 0" }}>
          <svg viewBox="0 0 320 150" width="100%" style={{ maxWidth: "300px" }} fill="none" stroke="#4A82D9" strokeWidth="1.6" strokeLinejoin="round"><path d="M10 40 236 6 316 26 90 64Z" fill="#E3EDFB" /><path d="M10 40 90 64V150L10 120Z" fill="#D6E4F9" /><path d="M90 64 316 26V110L90 150Z" fill="#C9DAF6" /><path d="M30 46V126M50 52V132M70 58V140" strokeWidth="1" opacity=".6" /><path d="M112 60V146M134 56V142M156 53V138M178 49V134M200 45V130M222 42V126M244 38V122M266 34V118M288 30V114M302 28V112" strokeWidth="1" opacity=".6" /></svg>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}><div><div style={{ fontSize: "14px", color: "var(--ink-3)" }}>Capacity</div><div style={{ fontFamily: "var(--font-mono)", fontSize: "15px", fontWeight: "600" }}>{V.selCard.cap}</div></div><div><div style={{ fontSize: "14px", color: "var(--ink-3)" }}>Payload</div><div style={{ fontFamily: "var(--font-mono)", fontSize: "15px", fontWeight: "600" }}>{V.selCard.max}</div></div></div>
        <div style={{ fontSize: "15px", color: "var(--ink-2)" }}>{V.selCard.note}</div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ fontSize: "15px", fontWeight: "600", flex: "1" }}>Containers</span><div style={{ display: "flex", alignItems: "center", height: "42px", border: "1px solid var(--line)", borderRadius: "10px", overflow: "hidden" }}><button onClick={V.decQty} aria-label="Fewer containers" style={{ width: "40px", height: "100%", fontSize: "18px", color: "var(--ink)" }}>−</button><span style={{ width: "48px", textAlign: "center", fontFamily: "var(--font-mono)", fontSize: "17px", fontWeight: "600", borderLeft: "1px solid var(--line)", borderRight: "1px solid var(--line)", lineHeight: "42px" }}>{V.selCard.qty}</span><button onClick={V.incQty} aria-label="More containers" style={{ width: "40px", height: "100%", fontSize: "18px", color: "var(--ink)" }}>+</button></div></div>
        <button onClick={V.calculate} style={{ marginTop: "auto", height: "48px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", fontSize: "15px", fontWeight: "600", boxShadow: "var(--shadow-blue)" }}>{V.selCard.calcLabel}</button>
      </div>
    </div>

    {V.calculated ? (<>
      <div ref={V.planRef} style={{ scrollMarginTop: "88px" }}>
    <div className="grid-1-md" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.75fr) minmax(0,1fr)", gap: "16px", marginTop: "24px" }}>
      <div style={{ border: "1px solid var(--line)", borderRadius: "18px", overflow: "hidden", boxShadow: "var(--shadow-md)", background: "#fff", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 18px", borderBottom: "1px solid var(--line-soft)", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", padding: "3px 8px", borderRadius: "6px", background: "var(--paper-2)", border: "1px solid var(--line)" }}>{V.plan.code}</span>
          <span style={{ fontSize: "15px", fontWeight: "600", flex: "1" }}>{V.plan.title}</span>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>{(V.plan.tabs || []).map((t, tI) => (<Fragment key={tI}><button onClick={t.pick} style={t.style}>{t.label}</button></Fragment>
))}</div>
        </div>
        <div ref={V.panelRef} style={{ position: "relative", background: "linear-gradient(180deg,#F7F9FC 0%,#EAF0F8 100%)", display: "flex", flexDirection: "column", flex: "1" }}>
          <div style={{ position: "absolute", top: "12px", left: "16px", right: "16px", display: "flex", alignItems: "center", gap: "8px", zIndex: "2", flexWrap: "wrap" }}>
            <div style={{ display: "flex", padding: "3px", gap: "2px", borderRadius: "10px", background: "#fff", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}>
              {(V.views || []).map((v, vI) => (<Fragment key={vI}><button onClick={v.pick} style={v.style}>{v.label}</button></Fragment>
))}
            </div>
            <div style={{ flex: "1" }}></div>
            <button onClick={V.toggleFs} title="Full screen" style={{ height: "34px", padding: "0 12px", borderRadius: "10px", background: "#fff", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)", fontSize: "13px", fontWeight: "600", color: "var(--ink-2)" }}>{V.fsLabel}</button>
          </div>
          <div style={{ position: "relative", flex: "1" }}>
            <div ref={V.viewRef} style={{ height: "460px", cursor: "grab" }}></div>
            <div style={{ position: "absolute", left: "16px", bottom: "12px", fontSize: "12px", color: "var(--ink-3)", pointerEvents: "none" }}>Drag to rotate · scroll to zoom</div>
            <div style={{ position: "absolute", right: "16px", bottom: "12px", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--ink-3)", pointerEvents: "none" }}>Door end ◂</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 18px", borderTop: "1px solid var(--line-soft)", background: "#fff" }}>
            <button onClick={V.togglePlay} style={{ height: "34px", minWidth: "104px", padding: "0 14px", borderRadius: "9px", background: "var(--blue-600)", color: "#fff", fontSize: "13px", fontWeight: "600", boxShadow: "var(--shadow-blue)" }}>{V.playLabel}</button>
            <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: ".1em", color: "var(--ink-3)", textTransform: "uppercase", whiteSpace: "nowrap" }}>Loading sequence</span>
            <input ref={V.seqRangeRef} type="range" min="0" max="1000" onInput={V.scrub} style={{ flex: "1", minWidth: "80px", accentColor: "var(--blue-600)" }} />
            <span ref={V.seqLabelRef} style={{ fontFamily: "var(--font-mono)", fontSize: "12.5px", fontWeight: "600", color: "var(--ink-2)", whiteSpace: "nowrap", minWidth: "120px", textAlign: "right" }}></span>
          </div>
        </div>
      </div>
      <div style={{ border: "1px solid var(--line)", borderRadius: "18px", background: "#fff", boxShadow: "var(--shadow-sm)", padding: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div><div style={{ display: "flex", fontSize: "13px", marginBottom: "6px" }}><span style={{ flex: "1", color: "var(--ink-2)", fontWeight: "500" }}>Volume used</span><span style={{ fontFamily: "var(--font-mono)", fontWeight: "600" }}>{V.plan.vol}</span></div><div style={{ height: "10px", borderRadius: "999px", background: "var(--paper-3)" }}><div style={V.plan.vBar}></div></div></div>
          <div><div style={{ display: "flex", fontSize: "13px", marginBottom: "6px" }}><span style={{ flex: "1", color: "var(--ink-2)", fontWeight: "500" }}>Payload used</span><span style={{ fontFamily: "var(--font-mono)", fontWeight: "600" }}>{V.plan.wt}</span></div><div style={{ height: "10px", borderRadius: "999px", background: "var(--paper-3)" }}><div style={V.plan.wBar}></div></div></div>
        </div>
        <div style={{ borderTop: "1px solid var(--line-soft)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: ".1em", color: "var(--ink-3)", textTransform: "uppercase", marginBottom: "2px" }}>In this container</div>
          {(V.plan.items || []).map((i, iI) => (<Fragment key={iI}><div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", border: "1px solid var(--line-soft)", borderRadius: "10px" }}><span style={i.dot}></span><span style={{ flex: "1", fontSize: "13.5px", fontWeight: "500", minWidth: "0" }}>{i.name}</span><span style={{ fontFamily: "var(--font-mono)", fontSize: "12.5px", fontWeight: "600" }}>{i.count}</span></div></Fragment>
))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {(V.plan.rows || []).map((r, rI) => (<Fragment key={rI}><div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12.5px" }}><span style={r.dot}></span><span style={{ flex: "1", color: "var(--ink-2)" }}>{r.name}</span><span style={{ fontFamily: "var(--font-mono)" }}>{r.count}</span><span style={r.pill}>{r.status}</span></div></Fragment>
))}
          {(V.plan.warnings || []).map((w, wI) => (<Fragment key={wI}><div style={{ padding: "10px 12px", borderRadius: "10px", background: "var(--amber-50)", fontSize: "12.5px", lineHeight: "1.5" }}><b style={{ color: "var(--amber-600)" }}>{w.title}</b><div style={{ color: "var(--ink-2)" }}>{w.reason}</div></div></Fragment>
))}
        </div>
      </div>
    </div>

      </div>
    </>) : null}
    <p style={{ margin: "18px 0 0", fontSize: "13px", color: "var(--ink-3)", lineHeight: "1.55", maxWidth: "820px" }}>Containers are filled wall by wall from the front, respecting each product's stacking limit and the payload. Dimensions are typical internal sizes, confirm with your carrier, as they vary by line and container age.</p>
  </div>
</section>
</>) : null}

{V.showLcl ? (<>
<section className="section" style={{ padding: "44px 20px 44px", background: "#fff" }}>
  <div className="grid-1-md" style={{ maxWidth: "1440px", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "40px", alignItems: "center" }}>
    <div>
      <div className="ds-eyebrow" style={{ marginBottom: "12px" }}>LCL chargeable</div>
      <h2 className="ds-h2" style={{ margin: "0 0 12px", textWrap: "balance" }}>You'll be charged on <span style={{ fontFamily: "var(--font-mono)", color: "var(--blue-700)" }}>{V.lcl.wm}</span> W/M.</h2>
      <p style={{ margin: "0 0 20px", fontSize: "16px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>{V.lcl.note}</p>
      <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 18px", borderRadius: "10px", border: "1px solid var(--blue-300)", color: "var(--blue-700)", fontWeight: "600", fontSize: "14px" }}>Turn this into a quote in Susea →</a>
    </div>
    <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", boxShadow: "var(--shadow-md)", padding: "24px", display: "flex", flexDirection: "column", gap: "18px" }}>
      {(V.lcl.bars || []).map((b, bI) => (<Fragment key={bI}><div><div style={{ display: "flex", fontSize: "14px", marginBottom: "8px" }}><span style={{ flex: "1", color: "var(--ink-2)", fontWeight: "500" }}>{b.k}</span><span style={{ fontFamily: "var(--font-mono)", fontWeight: "600" }}>{b.v}</span></div><div style={{ height: "12px", borderRadius: "999px", background: "var(--paper-3)" }}><div style={b.bar}></div></div></div></Fragment>
))}
      <div style={{ fontSize: "12.5px", color: "var(--ink-3)", borderTop: "1px solid var(--line-soft)", paddingTop: "12px" }}>1 W/M = 1 CBM or 1,000 kg, whichever is higher. Some consolidators apply a minimum of 1 W/M.</div>
    </div>
  </div>
</section>
</>) : null}

<section className="section" style={{ padding: "44px 20px", background: "var(--paper-2)" }}>
  <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
    <div style={{ textAlign: "center", marginBottom: "36px" }}>
      <div className="ds-eyebrow" style={{ marginBottom: "14px" }}>How it's calculated</div>
      <h2 className="ds-h2" style={{ margin: "0", textWrap: "balance" }}>Three numbers decide what you pay.</h2>
    </div>
    <div className="grid-1-md" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "16px" }}>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", boxShadow: "var(--shadow-sm)", padding: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", color: "var(--blue-700)" }}>01 · VOLUME</span>
        <h3 className="ds-h3" style={{ margin: "0" }}>CBM per item</h3>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", padding: "12px 14px", borderRadius: "10px", background: "var(--bg-sunken, #EEF3FA)" }}>L × W × H (cm) ÷ 1,000,000</div>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)" }}>A 62 × 62 × 18 cm carton is 0.069 CBM. Multiply by quantity for the line total. Drums and rolls are measured by their bounding box.</p>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", boxShadow: "var(--shadow-sm)", padding: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", color: "var(--orange-600, #C85A12)" }}>02 · LCL</span>
        <h3 className="ds-h3" style={{ margin: "0" }}>Weight or measure</h3>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", padding: "12px 14px", borderRadius: "10px", background: "var(--bg-sunken, #EEF3FA)" }}>max(CBM, kg ÷ 1,000)</div>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)" }}>Consolidators charge on whichever is higher, volume or metric tons. Dense cargo pays on weight; light cargo pays on space.</p>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", boxShadow: "var(--shadow-sm)", padding: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", color: "var(--amber-600)" }}>03 · FCL</span>
        <h3 className="ds-h3" style={{ margin: "0" }}>Space and payload</h3>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", padding: "12px 14px", borderRadius: "10px", background: "var(--bg-sunken, #EEF3FA)" }}>fits volume AND payload</div>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)" }}>A container must hold both your volume and your weight. Heavy cargo like tiles often fills the payload of a 20' long before it fills the space.</p>
      </div>
    </div>
    <div className="grid-1-md" style={{ marginTop: "16px", background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", boxShadow: "var(--shadow-sm)", padding: "24px", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)", gap: "24px", alignItems: "center" }}>
      <div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", color: "var(--blue-700)" }}>WORKED EXAMPLE</span>
        <h3 className="ds-h3" style={{ margin: "8px 0 8px" }}>10 cartons at 60 × 40 × 50 cm</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Working in metres? Multiply L × W × H and you have CBM directly. In centimetres, divide the result by 1,000,000 (100 × 100 × 100 cm in one cubic metre).</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "12px 14px", borderRadius: "10px", background: "var(--bg-sunken, #EEF3FA)" }}><span>60 × 40 × 50 cm</span><span>= 120,000 cm³</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "12px 14px", borderRadius: "10px", background: "var(--bg-sunken, #EEF3FA)" }}><span>120,000 ÷ 1,000,000</span><span>= 0.12 CBM per carton</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "12px 14px", borderRadius: "10px", background: "var(--blue-50)", color: "var(--blue-700)", fontWeight: "600" }}><span>0.12 × 10 cartons</span><span>= 1.2 CBM total</span></div>
      </div>
    </div>
  </div>
</section>

<section className="section" style={{ padding: "44px 20px", background: "#fff" }}>
  <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
    <div style={{ marginBottom: "32px", maxWidth: "820px" }}>
      <div className="ds-eyebrow" style={{ marginBottom: "14px" }}>Using the calculator</div>
      <h2 className="ds-h2" style={{ margin: "0", textWrap: "balance" }}>From carton sizes to a loading plan in six steps.</h2>
    </div>
    <div className="grid-1-md" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "16px" }}>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: "700" }}>1</span>
        <h3 className="ds-h3" style={{ margin: "0" }}>Choose FCL or LCL</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>FCL shows which containers fit your cargo and how it loads. LCL shows the volume and weight you are likely to be charged on.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: "700" }}>2</span>
        <h3 className="ds-h3" style={{ margin: "0" }}>Add a product</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Pick the package type: box, barrel, roll, sack, big bag, pallet or a custom shape. The preview redraws to match.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: "700" }}>3</span>
        <h3 className="ds-h3" style={{ margin: "0" }}>Enter dimensions and weight</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Use centimetres, millimetres, metres or inches, and kilograms or pounds. Dimension lines on the preview update as you type.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: "700" }}>4</span>
        <h3 className="ds-h3" style={{ margin: "0" }}>Set quantity and stacking</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Enter how many units you are shipping, and switch off stacking for goods that must stay floor-loaded.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: "700" }}>5</span>
        <h3 className="ds-h3" style={{ margin: "0" }}>Add the rest of the shipment</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Add, edit or duplicate lines for every product. Totals update with each change.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: "700" }}>6</span>
        <h3 className="ds-h3" style={{ margin: "0" }}>Review the result</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Check total packages, CBM and gross weight. In FCL, compare containers, adjust the count and open the 3D loading plan with top, side and door views.</p>
      </div>
    </div>
    <div style={{ marginTop: "24px" }}><a href="#calculator" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 18px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", boxShadow: "var(--shadow-blue)", fontWeight: "600", fontSize: "14px" }}>Calculate your cargo volume ↑</a></div>
  </div>
</section>

<section className="section" style={{ padding: "44px 20px", background: "var(--paper-2)" }}>
  <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
    <div style={{ marginBottom: "32px", maxWidth: "820px" }}>
      <div className="ds-eyebrow" style={{ marginBottom: "14px" }}>FCL vs LCL</div>
      <h2 className="ds-h2" style={{ margin: "0 0 14px", textWrap: "balance" }}>Your own container, or a share of one.</h2>
      <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "var(--ink-2)", maxWidth: "720px", textWrap: "pretty" }}>Cargo volume is one input when choosing between the two. Route, rates, cargo type, handling needs and service terms matter just as much, so use the numbers here to start the conversation with your forwarder, not to end it.</p>
    </div>
    <div className="grid-1-md" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "16px" }}>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", boxShadow: "var(--shadow-sm)", padding: "26px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", color: "var(--blue-700)" }}>FCL · FULL CONTAINER LOAD</span>
        <h3 className="ds-h3" style={{ margin: "0" }}>One shipper, one container</h3>
        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>The container is booked for your cargo alone. You pay per container, so the question is whether your volume and weight use enough of it to make sense against LCL.</p>
        <ul style={{ margin: "0", paddingLeft: "18px", fontSize: "14.5px", lineHeight: "1.75", color: "var(--ink-2)" }}><li>Usually priced per container, not per CBM</li><li>Packed and sealed for one consignee</li><li>Payload limits matter as much as space</li></ul>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", boxShadow: "var(--shadow-sm)", padding: "26px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", color: "var(--orange-600, #C85A12)" }}>LCL · LESS THAN CONTAINER LOAD</span>
        <h3 className="ds-h3" style={{ margin: "0" }}>Shared space, consolidated</h3>
        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Your cargo shares a container with other shipments, consolidated at a freight station. Charges are commonly based on W/M, the higher of CBM or metric tons, though terms vary.</p>
        <ul style={{ margin: "0", paddingLeft: "18px", fontSize: "14.5px", lineHeight: "1.75", color: "var(--ink-2)" }}><li>Often priced per W/M, sometimes with a minimum</li><li>Extra handling at origin and destination</li><li>Transit can be longer than FCL</li></ul>
      </div>
    </div>
    <p style={{ margin: "20px 0 0", fontSize: "14.5px", color: "var(--ink-2)" }}>Switch between <a href="#calculator">FCL and LCL at the top of the calculator</a> to see both results for the same cargo.</p>
  </div>
</section>

<section className="section" style={{ padding: "44px 20px", background: "#fff" }}>
  <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
    <div style={{ marginBottom: "24px" }}>
      <div className="ds-eyebrow" style={{ marginBottom: "14px" }}>Container reference</div>
      <h2 className="ds-h2" style={{ margin: "0", textWrap: "balance" }}>Typical internal sizes.</h2>
    </div>
    <div style={{ border: "1px solid var(--line)", borderRadius: "16px", overflow: "auto", boxShadow: "var(--shadow-sm)" }}>
      <div style={{ minWidth: "720px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.6fr) repeat(3,minmax(0,1fr)) minmax(0,1.4fr)", padding: "14px 20px", background: "var(--paper-2)", borderBottom: "1px solid var(--line)", fontSize: "11px", fontWeight: "700", letterSpacing: ".08em", color: "var(--ink-3)", textTransform: "uppercase" }}><div>Container</div><div style={{ textAlign: "right" }}>Capacity</div><div style={{ textAlign: "right" }}>Max payload</div><div style={{ textAlign: "right" }}>Door W × H</div><div style={{ paddingLeft: "24px" }}>Internal L × W × H</div></div>
        {(V.refRows || []).map((x, xI) => (<Fragment key={xI}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.6fr) repeat(3,minmax(0,1fr)) minmax(0,1.4fr)", padding: "14px 20px", borderBottom: "1px solid var(--line-soft)", fontSize: "14px", alignItems: "center" }}><div style={{ display: "flex", gap: "10px", alignItems: "center" }}><span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", padding: "2px 7px", borderRadius: "6px", border: "1px solid var(--line)" }}>{x.code}</span><span style={{ fontWeight: "500" }}>{x.name}</span></div><div style={{ textAlign: "right", fontFamily: "var(--font-mono)" }}>{x.cap}</div><div style={{ textAlign: "right", fontFamily: "var(--font-mono)" }}>{x.max}</div><div style={{ textAlign: "right", fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>{x.door}</div><div style={{ paddingLeft: "24px", fontFamily: "var(--font-mono)", color: "var(--ink-2)" }}>{x.dims}</div></div>
        </Fragment>
))}
      </div>
    </div>
  </div>
</section>

<section className="section" style={{ padding: "44px 20px", background: "#fff", borderTop: "1px solid var(--line-soft)" }}>
  <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
    <div style={{ marginBottom: "32px", maxWidth: "820px" }}>
      <div className="ds-eyebrow" style={{ marginBottom: "14px" }}>Space planning</div>
      <h2 className="ds-h2" style={{ margin: "0 0 14px", textWrap: "balance" }}>Why 33 CBM of cargo rarely fits in a 33 CBM container.</h2>
      <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "var(--ink-2)", maxWidth: "720px", textWrap: "pretty" }}>CBM measures geometric volume. Usable space is always less, because real cargo has to be packed, stacked, secured and kept within the payload. These are the factors that close the gap.</p>
    </div>
    <div className="grid-1-md" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "16px" }}>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Package dimensions</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Small differences per carton add up across hundreds of units, and the way cartons line up against the walls decides how much floor is lost.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Package quantity</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>A part-filled last row or layer leaves voids, even when the total CBM looks comfortable.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Weight</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Dense cargo like tiles, steel or liquids reaches the payload limit long before the space runs out.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Packaging and pallets</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Pallets add height and footprint and stop cartons from packing tightly. Include them in your dimensions.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Irregular shapes</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Drums, rolls and bags are measured by the box around them. The space between round items can’t be used.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Stacking limits</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Fragile or crushable goods may only go one or two layers high, which leaves the top of the container empty.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Container limits</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Internal size, door opening and maximum payload differ by container type, line and age.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Loading and securing</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Weight distribution, dunnage, lashing and forklift access all take space the formula doesn’t count.</p>
      </div>
    </div>
  </div>
</section>

<section className="section" style={{ padding: "44px 20px", background: "var(--paper-2)" }}>
  <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
    <div style={{ textAlign: "center", marginBottom: "32px" }}>
      <div className="ds-eyebrow" style={{ marginBottom: "14px" }}>More free tools</div>
      <h2 className="ds-h2" style={{ margin: "0", textWrap: "balance" }}>Sized the cargo? Now classify it.</h2>
    </div>
    <div className="grid-1-md" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "20px" }}>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", padding: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", padding: "3px 8px", borderRadius: "6px", background: "var(--orange-50)", color: "var(--orange-600, #C85A12)" }}>CBM</span><span style={{ fontSize: "12px", fontWeight: "600", color: "var(--good-600)" }}>You're here</span></div>
        <h3 className="ds-h3" style={{ margin: "0" }}>CBM &amp; cargo calculator</h3>
        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Total volume, weight, chargeable W/M and a container recommendation.</p>
        <a href="#calculator" style={{ marginTop: "auto", alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 18px", borderRadius: "10px", border: "1px solid var(--line-strong)", background: "#fff", color: "var(--ink)", fontWeight: "600", fontSize: "14px" }}>Back to calculator ↑</a>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", boxShadow: "var(--shadow-sm)", padding: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", padding: "3px 8px", borderRadius: "6px", background: "var(--blue-50)", color: "var(--blue-700)" }}>HSN</span><span style={{ fontSize: "12px", fontWeight: "600", color: "var(--ink-3)" }}>HS 2022</span></div>
        <h3 className="ds-h3" style={{ margin: "0" }}>HSN code checker</h3>
        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Search by product or code and see the section, chapter, heading and subheading in one view.</p>
        <a href="/free-tools/hsn-code-checker" style={{ marginTop: "auto", alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 18px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", fontWeight: "600", fontSize: "14px", boxShadow: "var(--shadow-blue)" }}>Check HSN code →</a>
      </div>
    </div>
  </div>
</section>

<section className="section" id="faq" style={{ padding: "44px 20px", background: "#fff" }}>
  <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "720px" }}>
      <div className="ds-eyebrow" style={{ alignSelf: "flex-start" }}>CBM basics</div>
      <h2 className="ds-h2" style={{ margin: "0", textWrap: "balance" }}>Questions we hear from shippers.</h2>
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
<ContainerCta />
{V.adding ? (<>
<div onClick={V.closeAdd} style={{ position: "fixed", inset: "0", zIndex: "70", background: "rgba(14,23,38,.45)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 16px", overflow: "auto" }}>
  <div role="dialog" aria-label={V.formTitle} onClick={V.stop} style={{ width: "100%", maxWidth: "1040px", background: "#fff", borderRadius: "20px", boxShadow: "var(--shadow-xl)", overflow: "hidden" }}>
    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "22px 28px", borderBottom: "1px solid var(--line-soft)" }}><div style={{ flex: "1" }}><h2 style={{ margin: "0", fontSize: "24px", fontWeight: "600", letterSpacing: "-.02em" }}>{V.formTitle}</h2><div style={{ fontSize: "15px", color: "var(--ink-3)", marginTop: "4px" }}>Define the cargo dimensions, weight and loading constraints.</div></div><button onClick={V.closeAdd} aria-label="Close" style={{ width: "36px", height: "36px", borderRadius: "9px", fontSize: "26px", lineHeight: "1", color: "var(--ink-2)" }}>×</button></div>
    <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <div style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "var(--ink-3)", marginBottom: "12px" }}>SELECT CARGO TYPE</div>
        <div className="types-grid" style={{ display: "grid", gridTemplateColumns: "repeat(7,minmax(0,1fr))", gap: "10px" }}>
            <div onClick={V.tp.box.pick} style={V.tp.box.style}><svg width="40" height="40" viewBox="0 0 40 40" fill="#DCE8FA" stroke="#6E9BE0" strokeWidth="1.2" strokeLinejoin="round"><path d="M20 6 34 13 20 20 6 13Z" /><path d="M6 13 20 20V34L6 27Z" fill="#C9DAF6" /><path d="M20 20 34 13V27L20 34Z" fill="#B8CEF2" /></svg><span style={{ fontSize: "14.5px", fontWeight: "600" }}>Box</span></div>
            <div onClick={V.tp.bigbag.pick} style={V.tp.bigbag.style}><svg width="40" height="40" viewBox="0 0 40 40" fill="#DCE8FA" stroke="#6E9BE0" strokeWidth="1.2" strokeLinejoin="round"><rect x="9" y="12" width="22" height="22" rx="3" /><path d="M13 12V7h4v5M23 12V7h4v5" fill="none" /></svg><span style={{ fontSize: "14.5px", fontWeight: "600" }}>Big bags</span></div>
            <div onClick={V.tp.sack.pick} style={V.tp.sack.style}><svg width="40" height="40" viewBox="0 0 40 40" fill="#DCE8FA" stroke="#6E9BE0" strokeWidth="1.2" strokeLinejoin="round"><path d="M14 10 20 6 26 10 30 30C27 34 13 34 10 30Z" /></svg><span style={{ fontSize: "14.5px", fontWeight: "600" }}>Sacks</span></div>
            <div onClick={V.tp.barrel.pick} style={V.tp.barrel.style}><svg width="40" height="40" viewBox="0 0 40 40" fill="#DCE8FA" stroke="#6E9BE0" strokeWidth="1.2" strokeLinejoin="round"><path d="M11 9v22c0 2 4 3 9 3s9-1 9-3V9" /><ellipse cx="20" cy="9" rx="9" ry="3" fill="#C9DAF6" /><path d="M11 20c0 2 4 3 9 3s9-1 9-3" fill="none" /></svg><span style={{ fontSize: "14.5px", fontWeight: "600" }}>Barrel</span></div>
            <div onClick={V.tp.roll.pick} style={V.tp.roll.style}><svg width="40" height="40" viewBox="0 0 40 40" fill="#DCE8FA" stroke="#6E9BE0" strokeWidth="1.2" strokeLinejoin="round"><path d="M10 13h20a5 7 0 0 1 0 14H10Z" /><ellipse cx="10" cy="20" rx="4" ry="7" fill="#C9DAF6" /><circle cx="10" cy="20" r="1.5" fill="#fff" /></svg><span style={{ fontSize: "14.5px", fontWeight: "600" }}>Roll</span></div>
            <div onClick={V.tp.pallet.pick} style={V.tp.pallet.style}><svg width="40" height="40" viewBox="0 0 40 40" fill="#DCE8FA" stroke="#6E9BE0" strokeWidth="1.2" strokeLinejoin="round"><path d="M20 10 34 16 20 22 6 16Z" /><path d="M6 16v3l14 6 14-6v-3" fill="none" /><path d="M9 20v4M20 25v4M31 20v4" fill="none" /></svg><span style={{ fontSize: "14.5px", fontWeight: "600" }}>Pallet</span></div>
            <div onClick={V.tp.custom.pick} style={V.tp.custom.style}><svg width="40" height="40" viewBox="0 0 40 40" fill="#DCE8FA" stroke="#6E9BE0" strokeWidth="1.2" strokeLinejoin="round"><path d="M20 6 34 13 20 20 6 13Z" fill="#E8EFFB" /><path d="M6 13 20 20V34L6 27Z" fill="#D3E1F7" /><path d="M20 20 34 13V27L20 34Z" fill="#C2D6F4" /></svg><span style={{ fontSize: "14.5px", fontWeight: "600" }}>Custom</span></div>
        </div>
      </div>
      <div className="grid-1-md" style={{ display: "grid", gridTemplateColumns: "minmax(0,.9fr) minmax(0,1.8fr)", gap: "24px" }}>
        <div style={{ background: "var(--blue-50)", border: "1px solid var(--blue-100, #D6E4F9)", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", minHeight: "300px" }}>
          <div style={{ fontSize: "12.5px", fontWeight: "700", letterSpacing: ".1em", color: "var(--blue-700)" }}>{V.pv.label}</div>
          <div style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", position: "relative" }}>
            
            <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", width: "100%", maxWidth: "320px", aspectRatio: "300/250", margin: "0 auto" }}>
                <svg viewBox="0 0 300 250" width="100%" height="100%" style={{ display: "block", overflow: "visible" }} stroke="#4A82D9" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"><path d={V.g.p1} fill="#E3EDFB" style={{ transition: "d .25s ease" }} /><path d={V.g.p2} fill="#F4F8FE" style={{ transition: "d .25s ease" }} /><path d={V.g.p3} fill="#C9DAF6" style={{ transition: "d .25s ease" }} /><path d={V.g.p4} fill="none" style={{ transition: "d .25s ease" }} /><g stroke="#9AA8BE" strokeWidth="1.2" fill="#9AA8BE"><line x1={V.g.a.x1} y1={V.g.a.y1} x2={V.g.a.x2} y2={V.g.a.y2} opacity={V.g.a.o} /><circle cx={V.g.a.x1} cy={V.g.a.y1} r="2.5" stroke="none" opacity={V.g.a.o} /><circle cx={V.g.a.x2} cy={V.g.a.y2} r="2.5" stroke="none" opacity={V.g.a.o} /><line x1={V.g.b.x1} y1={V.g.b.y1} x2={V.g.b.x2} y2={V.g.b.y2} opacity={V.g.b.o} /><circle cx={V.g.b.x1} cy={V.g.b.y1} r="2.5" stroke="none" opacity={V.g.b.o} /><circle cx={V.g.b.x2} cy={V.g.b.y2} r="2.5" stroke="none" opacity={V.g.b.o} /><line x1={V.g.c.x1} y1={V.g.c.y1} x2={V.g.c.x2} y2={V.g.c.y2} opacity={V.g.c.o} /><circle cx={V.g.c.x1} cy={V.g.c.y1} r="2.5" stroke="none" opacity={V.g.c.o} /><circle cx={V.g.c.x2} cy={V.g.c.y2} r="2.5" stroke="none" opacity={V.g.c.o} /></g></svg>
                <span style={V.g.ta.style}>{V.g.ta.text}</span><span style={V.g.tb.style}>{V.g.tb.text}</span><span style={V.g.tc.style}>{V.g.tc.text}</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", fontSize: "13.5px", color: "var(--ink-3)", marginTop: "6px" }}>Updates as you type.</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", minWidth: "0" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}><span style={{ fontSize: "14.5px", fontWeight: "600" }}>Product name <span style={{ color: "var(--bad-600)" }}>*</span></span><input value={V.f.name} onChange={V.on.name} placeholder="e.g. Ceramic tiles carton" style={{ height: "46px", border: "1px solid var(--line)", borderRadius: "10px", padding: "0 14px", fontSize: "15px", background: "#fff", width: "100%" }} /></label>
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}><span style={{ fontSize: "14.5px", fontWeight: "600", flex: "1" }}>Dimensions <span style={{ color: "var(--bad-600)" }}>*</span></span><select value={V.dimUnit} onChange={V.onDimUnit} aria-label="Dimension unit" style={{ height: "40px", border: "1px solid var(--line)", borderRadius: "9px", fontFamily: "var(--font-mono)", fontSize: "13.5px", background: "#fff", padding: "0 10px", minWidth: "90px" }}><option value="cm">cm</option><option value="mm">mm</option><option value="m">m</option><option value="in">in</option></select></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: "16px" }}>
              {(V.dimFields || []).map((d, dI) => (<Fragment key={dI}><label style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}><span style={{ fontSize: "14px", color: "var(--ink-3)" }}>{d.label}</span><div style={{ display: "flex", height: "48px", border: "1px solid var(--line)", borderRadius: "10px", background: "#fff", overflow: "hidden" }}><input type="number" min="0" value={d.value} onChange={d.on} placeholder="0" style={{ flex: "1", minWidth: "0", border: "0", padding: "0 14px", fontFamily: "var(--font-mono)", fontSize: "15px", background: "transparent" }} /><span style={{ display: "flex", alignItems: "center", padding: "0 12px", borderLeft: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: "12.5px", color: "var(--ink-3)", background: "var(--paper-2)" }}>{V.dimUnit}</span></div></label></Fragment>
))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "16px", alignItems: "end" }}>
            <label style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}><span style={{ fontSize: "14.5px", fontWeight: "600" }}>Weight / unit <span style={{ color: "var(--bad-600)" }}>*</span></span><div style={{ display: "flex", height: "48px", border: "1px solid var(--line)", borderRadius: "10px", background: "#fff", overflow: "hidden" }}><input type="number" min="0" value={V.f.wt} onChange={V.on.wt} placeholder="0" style={{ flex: "1", minWidth: "0", border: "0", padding: "0 14px", fontFamily: "var(--font-mono)", fontSize: "15px", background: "transparent" }} /><select value={V.wtUnit} onChange={V.onWtUnit} aria-label="Weight unit" style={{ border: "0", borderLeft: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: "13.5px", background: "#fff", padding: "0 8px" }}><option value="kg">kg</option><option value="lb">lb</option></select></div></label>
            <label style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}><span style={{ fontSize: "14.5px", fontWeight: "600" }}>Quantity <span style={{ color: "var(--bad-600)" }}>*</span></span><input type="number" min="1" value={V.f.qty} onChange={V.on.qty} placeholder="1" style={{ height: "46px", border: "1px solid var(--line)", borderRadius: "10px", padding: "0 14px", fontSize: "15px", background: "#fff", width: "100%", height: "48px", fontFamily: "var(--font-mono)" }} /></label>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}><span style={{ fontSize: "14.5px", fontWeight: "600" }}>Display colour</span><div style={{ display: "flex", gap: "8px", flexWrap: "wrap", minHeight: "48px", alignItems: "center" }}>{(V.swatches || []).map((c, cI) => (<Fragment key={cI}><div onClick={c.pick} title={c.hex} style={c.style}></div></Fragment>
))}</div></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", border: "1px solid var(--line)", borderRadius: "14px", overflow: "hidden" }}>
            {(V.pv.rows || []).map((r, rI) => (<Fragment key={rI}><div style={r.cell}><div style={{ fontSize: "13.5px", color: "var(--ink-3)" }}>{r.k}</div><div style={{ fontFamily: "var(--font-mono)", fontSize: "22px", fontWeight: "600", marginTop: "4px", whiteSpace: "nowrap" }}>{r.v}</div></div></Fragment>
))}
          </div>
        </div>
      </div>
      <div style={{ border: "1px solid var(--line)", borderRadius: "16px", overflow: "hidden" }}>
        <div onClick={V.toggleAdv} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 20px", background: "var(--paper-2)", cursor: "pointer", flexWrap: "wrap" }}>
          <span style={V.advChev}>⌄</span>
          <span style={{ fontSize: "16px", fontWeight: "600" }}>Advanced loading settings</span>
          <span style={{ fontSize: "14px", color: "var(--ink-3)" }}>{V.advSummary}</span>
        </div>
        {V.advOpen ? (<>
          <div className="grid-1-md" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.25fr) minmax(0,1fr)", borderTop: "1px solid var(--line)" }}>
            <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: "14px", borderRight: "1px solid var(--line-soft)" }}>
              <div style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "var(--ink-3)" }}>ORIENTATION &amp; ROTATION</div>
              <div style={{ padding: "12px 14px", borderRadius: "10px", background: "var(--paper-2)", fontSize: "14px", color: "var(--ink-2)", lineHeight: "1.45" }}>{V.orientNote}</div>
              {V.canTilt ? (<><div style={{ display: "flex", alignItems: "center", gap: "10px" }}><div onClick={V.toggleTilt} style={V.tiltTrack}><div style={V.tiltKnob}></div></div><span style={{ fontSize: "14px" }}>Allow tilting on side</span></div></>) : null}
              <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}><span style={{ fontSize: "14px", color: "var(--ink-3)" }}>Rotation on the floor</span><select value={V.f.rotation} onChange={V.on.rotation} style={{ height: "44px", border: "1px solid var(--line)", borderRadius: "10px", padding: "0 12px", fontSize: "14.5px", background: "#fff" }}><option value="allowed">Allowed · 90° turns</option><option value="fixed">Fixed · this side forward</option></select></label>
            </div>
            <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: "14px", borderRight: "1px solid var(--line-soft)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "var(--ink-3)", flex: "1" }}>STACKING RULES</span><div onClick={V.toggleStack} style={V.stackTrack}><div style={V.stackKnob}></div></div><span style={{ fontSize: "14px" }}>Disable stacking</span></div>
              <div style={V.rulesWrap}>
              <div style={{ display: "grid", gridTemplateColumns: "36px 22px minmax(0,1fr) 128px", gap: "10px", alignItems: "center" }}>
                <svg width="34" height="34" viewBox="0 0 34 34" fill="#DCE8FA" stroke="#4A82D9" strokeWidth="1.4" strokeLinejoin="round"><path d="M17 6 30 12 17 18 4 12Z" /><path d="M4 17l13 6 13-6M4 22l13 6 13-6" fill="none" /></svg>
                <div onClick={V.adv.layers.toggle} style={V.adv.layers.box}>{V.adv.layers.mark}</div>
                <div style={{ minWidth: "0" }}><div style={{ fontSize: "14.5px", fontWeight: "600" }}>Max layers</div><div style={{ fontSize: "12.5px", color: "var(--ink-3)", lineHeight: "1.35" }}>Units stacked on top of each other</div></div>
                <div style={{ display: "flex", height: "42px", border: "1px solid var(--line)", borderRadius: "9px", background: "#fff", overflow: "hidden", width: "100%" }}><input type="number" min="0" value={V.adv.layers.value} onChange={V.adv.layers.on} placeholder="0" style={{ flex: "1", minWidth: "0", border: "0", padding: "0 12px", fontFamily: "var(--font-mono)", fontSize: "14px", background: "transparent" }} /><span style={{ display: "flex", alignItems: "center", padding: "0 10px", borderLeft: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--ink-3)", background: "var(--paper-2)" }}>layers</span></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "36px 22px minmax(0,1fr) 128px", gap: "10px", alignItems: "center" }}>
                <svg width="34" height="34" viewBox="0 0 34 34" fill="#DCE8FA" stroke="#4A82D9" strokeWidth="1.4" strokeLinejoin="round"><rect x="10" y="6" width="16" height="22" /><path d="M5 6v22" fill="none" /></svg>
                <div onClick={V.adv.stackH.toggle} style={V.adv.stackH.box}>{V.adv.stackH.mark}</div>
                <div style={{ minWidth: "0" }}><div style={{ fontSize: "14.5px", fontWeight: "600" }}>Max stack height</div><div style={{ fontSize: "12.5px", color: "var(--ink-3)", lineHeight: "1.35" }}>Total height of a stack</div></div>
                <div style={{ display: "flex", height: "42px", border: "1px solid var(--line)", borderRadius: "9px", background: "#fff", overflow: "hidden", width: "100%" }}><input type="number" min="0" value={V.adv.stackH.value} onChange={V.adv.stackH.on} placeholder="0" style={{ flex: "1", minWidth: "0", border: "0", padding: "0 12px", fontFamily: "var(--font-mono)", fontSize: "14px", background: "transparent" }} /><span style={{ display: "flex", alignItems: "center", padding: "0 10px", borderLeft: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--ink-3)", background: "var(--paper-2)" }}>{V.dimUnit}</span></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "36px 22px minmax(0,1fr) 128px", gap: "10px", alignItems: "center" }}>
                <svg width="34" height="34" viewBox="0 0 34 34" fill="#DCE8FA" stroke="#4A82D9" strokeWidth="1.4" strokeLinejoin="round"><path d="M4 26h26l-4-12H8Z" /><path d="M14 14l3-6 3 6" fill="none" /></svg>
                <div onClick={V.adv.top.toggle} style={V.adv.top.box}>{V.adv.top.mark}</div>
                <div style={{ minWidth: "0" }}><div style={{ fontSize: "14.5px", fontWeight: "600" }}>Max weight on top</div><div style={{ fontSize: "12.5px", color: "var(--ink-3)", lineHeight: "1.35" }}>Load this product can carry</div></div>
                <div style={{ display: "flex", height: "42px", border: "1px solid var(--line)", borderRadius: "9px", background: "#fff", overflow: "hidden", width: "100%" }}><input type="number" min="0" value={V.adv.top.value} onChange={V.adv.top.on} placeholder="0" style={{ flex: "1", minWidth: "0", border: "0", padding: "0 12px", fontFamily: "var(--font-mono)", fontSize: "14px", background: "transparent" }} /><span style={{ display: "flex", alignItems: "center", padding: "0 10px", borderLeft: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--ink-3)", background: "var(--paper-2)" }}>{V.wtUnit}</span></div>
              </div>
              </div>
            </div>
            <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "var(--ink-3)" }}>CARGO SPACING</div>
              <div style={{ fontSize: "14px", color: "var(--ink-3)", lineHeight: "1.45" }}>Clearance kept around each unit while loading.</div>
              {(V.spacing || []).map((s, sI) => (<Fragment key={sI}><div style={{ display: "grid", gridTemplateColumns: "70px minmax(0,1fr)", gap: "12px", alignItems: "center" }}><span style={{ fontSize: "14.5px" }}>{s.label}</span><div style={{ display: "flex", height: "42px", border: "1px solid var(--line)", borderRadius: "9px", background: "#fff", overflow: "hidden", width: "100%" }}><input type="number" min="0" value={s.value} onChange={s.on} placeholder="0" style={{ flex: "1", minWidth: "0", border: "0", padding: "0 12px", fontFamily: "var(--font-mono)", fontSize: "14px", background: "transparent" }} /><span style={{ display: "flex", alignItems: "center", padding: "0 10px", borderLeft: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--ink-3)", background: "var(--paper-2)" }}>{V.dimUnit}</span></div></div></Fragment>
))}
            </div>
          </div>
        </>) : null}
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 28px", borderTop: "1px solid var(--line-soft)", background: "var(--paper-2)", flexWrap: "wrap" }}>
      <div style={{ flex: "1", fontSize: "13.5px", color: "var(--bad-600)", fontWeight: "500", minWidth: "160px" }}>{V.error}</div>
      <button onClick={V.closeAdd} style={{ height: "46px", padding: "0 20px", borderRadius: "10px", fontSize: "15px", fontWeight: "500", color: "var(--ink-2)" }}>Cancel</button>
      <button onClick={V.saveItem} style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "46px", padding: "0 22px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", fontSize: "15px", fontWeight: "600", boxShadow: "var(--shadow-blue)" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>{V.saveLabel}</button>
    </div>
  </div>
</div>
</>) : null}
{V.picking ? (<>
<div onClick={V.closePicker} style={{ position: "fixed", inset: "0", zIndex: "70", background: "rgba(14,23,38,.45)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 16px", overflow: "auto" }}>
  <div role="dialog" aria-label="Select container" onClick={V.stop} style={{ width: "100%", maxWidth: "1040px", background: "#fff", borderRadius: "20px", boxShadow: "var(--shadow-xl)", overflow: "hidden" }}>
    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "22px 28px", borderBottom: "1px solid var(--line-soft)" }}><div style={{ flex: "1" }}><h2 style={{ margin: "0", fontSize: "24px", fontWeight: "600", letterSpacing: "-.02em" }}>Select container</h2><div style={{ fontSize: "15px", color: "var(--ink-3)", marginTop: "4px" }}>Internal dimensions and payload are used for the loading calculation.</div></div><button onClick={V.closePicker} aria-label="Close" style={{ width: "36px", height: "36px", borderRadius: "9px", fontSize: "26px", lineHeight: "1", color: "var(--ink-2)" }}>×</button></div>
    <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,200px),1fr))", gap: "16px" }}>
        {(V.pickCards || []).map((c, cI) => (<Fragment key={cI}>
          <div onClick={c.pick} style={c.style}>
            <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
              {c.custom ? (<><svg viewBox="0 0 280 130" width="200" fill="none" stroke="#4A82D9" strokeWidth="1.5" strokeLinejoin="round" style={{ maxWidth: "100%" }}><path d="M8 30 208 2 272 20" strokeDasharray="5 4" /><path d="M8 30 72 54 272 20" fill="none" /><path d="M72 54V128L8 104V30Z" fill="#EEF4FD" /><path d="M72 54 272 20V94L72 128Z" fill="#C9DAF6" /><path d="M28 37V111M48 44V118" strokeWidth=".9" opacity=".6" /><path d="M92 51V125M112 47V121M132 44V118M152 41V115M172 37V111M192 34V108M212 30V104M232 27V101M252 24V97" strokeWidth=".9" opacity=".6" /></svg></>) : null}
              {c.std ? (<><svg viewBox="0 0 280 130" width="200" fill="none" stroke="#4A82D9" strokeWidth="1.5" strokeLinejoin="round" style={{ maxWidth: "100%" }}><path d="M8 30 208 2 272 20 72 54Z" fill="#E3EDFB" /><path d="M72 54V128L8 104V30Z" fill="#EEF4FD" /><path d="M72 54 272 20V94L72 128Z" fill="#C9DAF6" /><path d="M28 37V111M48 44V118" strokeWidth=".9" opacity=".6" /><path d="M92 51V125M112 47V121M132 44V118M152 41V115M172 37V111M192 34V108M212 30V104M232 27V101M252 24V97" strokeWidth=".9" opacity=".6" /></svg></>) : null}
              {c.reefer ? (<><span style={{ position: "absolute", left: "56%", top: "46%", fontSize: "16px", color: "#2F6BD8" }}>❄</span></>) : null}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}><span style={{ fontSize: "16px", fontWeight: "600" }}>{c.name}</span>{c.isRec ? (<><span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: ".06em", color: "var(--good-600)", background: "var(--good-50)", padding: "2px 7px", borderRadius: "999px" }}>RECOMMENDED</span></>) : null}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--ink-3)", textAlign: "center" }}>{c.sub}</div>
          </div>
        </Fragment>
))}
      </div>
      <div className="grid-1-md" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "24px", alignItems: "center", padding: "24px", borderRadius: "16px", background: "var(--blue-50)", border: "1px solid var(--blue-100, #D6E4F9)" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {V.pd.custom ? (<><svg viewBox="0 0 280 130" width="380" fill="none" stroke="#4A82D9" strokeWidth="1.5" strokeLinejoin="round" style={{ maxWidth: "100%" }}><path d="M8 30 208 2 272 20" strokeDasharray="5 4" /><path d="M8 30 72 54 272 20" fill="none" /><path d="M72 54V128L8 104V30Z" fill="#EEF4FD" /><path d="M72 54 272 20V94L72 128Z" fill="#C9DAF6" /><path d="M28 37V111M48 44V118" strokeWidth=".9" opacity=".6" /><path d="M92 51V125M112 47V121M132 44V118M152 41V115M172 37V111M192 34V108M212 30V104M232 27V101M252 24V97" strokeWidth=".9" opacity=".6" /></svg></>) : null}
          {V.pd.std ? (<><svg viewBox="0 0 280 130" width="380" fill="none" stroke="#4A82D9" strokeWidth="1.5" strokeLinejoin="round" style={{ maxWidth: "100%" }}><path d="M8 30 208 2 272 20 72 54Z" fill="#E3EDFB" /><path d="M72 54V128L8 104V30Z" fill="#EEF4FD" /><path d="M72 54 272 20V94L72 128Z" fill="#C9DAF6" /><path d="M28 37V111M48 44V118" strokeWidth=".9" opacity=".6" /><path d="M92 51V125M112 47V121M132 44V118M152 41V115M172 37V111M192 34V108M212 30V104M232 27V101M252 24V97" strokeWidth=".9" opacity=".6" /></svg></>) : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ fontSize: "21px", fontWeight: "600", color: "var(--blue-700)" }}>{V.pd.name}</div>
          {V.pd.std ? (<><div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 22px", fontSize: "15px" }}>{(V.pd.rows || []).map((r, rI) => (<Fragment key={rI}><span style={{ color: "var(--ink-3)" }}>{r.k}</span><span style={{ fontFamily: "var(--font-mono)", fontWeight: "600" }}>{r.v}</span></Fragment>
))}</div></>) : null}
          {V.pd.custom ? (<><div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "12px" }}>{(V.pd.fields || []).map((x, xI) => (<Fragment key={xI}><label style={{ display: "flex", flexDirection: "column", gap: "6px" }}><span style={{ fontSize: "13.5px", color: "var(--ink-3)" }}>{x.label}</span><div style={{ display: "flex", height: "44px", border: "1px solid var(--line)", borderRadius: "10px", background: "#fff", overflow: "hidden" }}><input type="number" min="0" value={x.value} onChange={x.on} placeholder="0" style={{ flex: "1", minWidth: "0", border: "0", padding: "0 12px", fontFamily: "var(--font-mono)", fontSize: "14.5px", background: "transparent" }} /><span style={{ display: "flex", alignItems: "center", padding: "0 10px", borderLeft: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--ink-3)", background: "var(--paper-2)" }}>{x.unit}</span></div></label></Fragment>
))}</div></>) : null}
        </div>
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 28px", borderTop: "1px solid var(--line-soft)", flexWrap: "wrap" }}>
      <span style={{ fontSize: "15px", fontWeight: "600" }}>Number of containers</span>
      <div style={{ display: "flex", alignItems: "center", height: "44px", border: "1px solid var(--line)", borderRadius: "10px", overflow: "hidden" }}><button onClick={V.pickDec} aria-label="Fewer" style={{ width: "42px", height: "100%", fontSize: "18px", color: "var(--ink)" }}>−</button><span style={{ width: "52px", textAlign: "center", fontFamily: "var(--font-mono)", fontSize: "17px", fontWeight: "600", borderLeft: "1px solid var(--line)", borderRight: "1px solid var(--line)", lineHeight: "44px" }}>{V.pickQty}</span><button onClick={V.pickInc} aria-label="More" style={{ width: "42px", height: "100%", fontSize: "18px", color: "var(--ink)" }}>+</button></div>
      <span style={{ fontSize: "14.5px", color: "var(--ink-3)", flex: "1", minWidth: "180px" }}>{V.pickNote}</span>
      <button onClick={V.closePicker} style={{ height: "46px", padding: "0 20px", borderRadius: "10px", fontSize: "15px", fontWeight: "500", color: "var(--ink-2)" }}>Cancel</button>
      <button onClick={V.confirmPick} style={{ height: "46px", padding: "0 22px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", fontSize: "15px", fontWeight: "600", boxShadow: "var(--shadow-blue)" }}>Select container</button>
    </div>
  </div>
</div>
</>) : null}
{V.toast ? (<><div style={{ position: "fixed", left: "50%", bottom: "28px", transform: "translateX(-50%)", padding: "10px 16px", background: "var(--ink)", color: "#fff", borderRadius: "12px", boxShadow: "var(--shadow-xl)", fontSize: "13.5px", zIndex: "80", whiteSpace: "nowrap" }}>✓ {V.toast}</div></>) : null}
</main>
    );
  }
}
