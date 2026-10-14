"use client";

import { Component, Fragment, createRef } from "react";
import { CALENDLY_URL } from "@/lib/booking";
import ContainerCta from "@/components/free-tools/ContainerCta";

const pill = (bg, fg) => ({ fontSize: '11.5px', fontWeight: 600, padding: '3px 9px', borderRadius: '999px', background: bg, color: fg, whiteSpace: 'nowrap', flex: 'none' });
const stem = w => w.length < 4 ? w : /ies$/.test(w) ? w.slice(0, -3) + 'y' : /(s|x|z|ch|sh)es$/.test(w) ? w.slice(0, -2) : /[^s]s$/.test(w) ? w.slice(0, -1) : w;
const words = t => t.toLowerCase().split(/[^a-z0-9-]+/).filter(Boolean).map(stem);
const FAQS = [
  ['What is an HSN code?', 'HSN (Harmonized System of Nomenclature) is the international product classification maintained by the World Customs Organization. Customs authorities use it to identify goods, apply duties and compile trade statistics. In India the same codes appear on shipping bills, bills of entry and GST invoices.'],
  ['Is HSN the same as HS code?', 'Yes, at the 6-digit level. "HS code" is the international term; "HSN code" is how it is usually referred to in India. India extends the 6-digit HS code to 8 digits under ITC-HS for customs and foreign trade.'],
  ['Why do the last digits differ between countries?', 'Only the first six digits are harmonised. Each country adds its own national digits (India uses 8, the US and EU use 10), so the full code for the same product can differ between origin and destination.'],
  ['Where does this tool\u2019s data come from?', 'Sections, chapters, 4-digit headings and 6-digit subheadings follow the WCO Harmonized System 2022, extended with India\u2019s GST HSN master (21 sections, 98 chapters including India\u2019s Chapter 98, 1,235 headings, 5,626 subheadings, 13,131 8-digit tariff items). The tool shows codes and descriptions only, not duty or GST rates. Always confirm against the official CBIC tariff before filing.'],
  ['Can I rely on this for customs filing?', 'Use it to narrow down the right chapter and heading. Final classification depends on the product\u2019s exact composition and the official notes, so confirm the 8-digit tariff item with the CBIC customs tariff or your customs broker before filing.'],
  ['How do I find an HSN code by product name?', 'Describe the product by what it is made of and what it does, for example \u201ccotton knitted t-shirts\u201d rather than a brand or model name. Compare the top matches and open each one to check the heading and subheading wording.'],
  ['Can I search using a code I already have?', 'Yes. Switch to HSN code and enter 2 to 8 digits, with or without dots. You will see the matching chapter, heading, subheading or tariff item and where it sits in the hierarchy.'],
  ['How many digits does an HSN code have?', 'Two digits identify the chapter, four the heading and six the subheading, which is the internationally harmonised level. India adds two more for an 8-digit tariff item used in customs and foreign trade. On GST invoices, the number of digits required depends on your turnover.'],
  ['Can the same product be classified differently in different countries?', 'Yes. The first six digits are shared, but the national digits after them differ by country. Customs authorities can also interpret the same product differently, so check the importing country\u2019s tariff as well as your own.'],
  ['Does an HSN code determine the customs duty rate?', 'The code points to the tariff line, and the rate comes from that line plus any notifications, exemptions and trade-agreement preferences that apply to your origin. This checker does not show duty rates.'],
  ['Is the Susea HSN code checker free?', 'Yes. It is free to use, needs no account and runs in your browser.']
];

// The compact JSON in public/data is rebuilt into the shape the design's logic expects.
const expand = J => ({
  version: J.version,
  counts: J.counts,
  sections: J.sections.map(([id, title, from, to]) => ({ id, title, from, to })),
  chapters: J.chapters.map(([code, title, section]) => ({ code, n: +code, title, section })),
  headings: J.headings.map(([code, desc, kw, subs]) => ({ code, desc, kw, chapter: code.slice(0, 2), subs: subs.map(([code, desc, items]) => ({ code, desc, items: items.map(([code, desc]) => ({ code, desc })) })) }))
});

export default class HsnChecker extends Component {
  state = { D: null, mode: null, q: '', run: '', selKind: null, selCode: null, sec: null, copied: false, toast: '', faq: 0 };
  resultsRef = createRef();
  componentDidMount() {
    this._live = true;
    fetch('/data/hsn-2022.json').then(r => r.json()).then(J => { if (this._live) this.setState({ D: expand(J) }); }).catch(() => {});
  }
  componentWillUnmount() { this._live = false; clearTimeout(this._t); }
  flash(m) { this.setState({ toast: m }); clearTimeout(this._t); this._t = setTimeout(() => this.setState({ toast: '' }), 2200); }
  goResults() { setTimeout(() => { const el = this.resultsRef.current; if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' }); }, 30); }
  _index() {
    const D = this.state.D; if (this._ix && this._ix.D === D) return this._ix;
    const all = [];
    D.headings.forEach(h => { all.push({ kind: 'Heading', code: h.code, desc: h.desc, h, w: words(h.desc), kw: words(h.kw) });
      h.subs.forEach(s => { all.push({ kind: 'Subheading', code: s.code, desc: s.desc, h, s, w: words(s.desc), kw: [] });
        s.items.forEach(it => all.push({ kind: 'Tariff item', code: it.code, desc: it.desc, h, s, it, w: words(it.desc), kw: [] })); }); });
    return this._ix = { D, all };
  }
  search(raw) {
    const D = this.state.D, q = raw.trim();
    if (!q) return null;
    const { all } = this._index(), digits = q.replace(/[^\d]/g, '').slice(0, 8);
    if (/^[\d.\s]+$/.test(q) && digits.length) {
      const out = [];
      if (digits.length <= 2) D.chapters.forEach(c => { if (c.code.startsWith(digits)) out.push({ kind: 'Chapter', code: c.code, desc: c.title, ch: c }); });
      all.forEach(r => { const c = r.code.replace('.', ''); if (c.startsWith(digits) || (digits.startsWith(c) && digits.length > c.length)) out.push(r); });
      const exactLen = r => r.code.replace('.', '').length === Math.min(8, Math.max(2, digits.length + (digits.length % 2))) ? 0 : 1;
      out.sort((a, b) => exactLen(a) - exactLen(b) || a.code.localeCompare(b.code));
      const note = !out.length ? `No HS code starts with ${digits}. Check the digits or search by product.` : out.length > 40 ? `Showing the first 40 of ${out.length.toLocaleString('en-IN')} codes. Add more digits to narrow it down.` : '';
      return { rows: out.slice(0, 40), note };
    }
    const toks = words(q).filter(t => t.length >= 3);
    if (!toks.length) return { rows: [], note: '' };
    const scored = [], bonus = { Heading: 1.5, Subheading: 0.8, 'Tariff item': 0 };
    all.forEach(r => {
      let sc = 0, hit = 0; toks.forEach(t => { let g = 0; if (r.kw.includes(t)) g = 4; else if (r.w.includes(t)) g = 2; else if (t.length > 4 && r.w.some(k => k.length > 4 && (k.startsWith(t) || t.startsWith(k)))) g = 1; if (g) hit++; sc += g; });
      if (hit === toks.length || (toks.length > 2 && hit >= toks.length - 1)) scored.push({ ...r, sc: sc + bonus[r.kind] - r.w.length * 0.01 });
    });
    if (!scored.length) D.chapters.forEach(c => { const cw = words(c.title); let sc = 0; toks.forEach(k => { if (cw.includes(k)) sc += 1; }); if (sc) scored.push({ kind: 'Chapter', code: c.code, desc: c.title, ch: c, sc }); });
    return { rows: scored.sort((a, b) => b.sc - a.sc).slice(0, 20), note: '' };
  }
  renderVals() {
    const s = this.state, D = s.D, mode = s.mode || 'product';
    const faqs = FAQS.map(([q, a], i) => ({ q, a, open: s.faq === i, sign: s.faq === i ? '−' : '+', toggle: () => this.setState(st => ({ faq: st.faq === i ? -1 : i })) }));
    const faqV = {
      dList: FAQS.map(([q], i) => ({ q, n: String(i + 1).padStart(2, '0'), pick: () => this.setState({ faqD: i }), style: { display: 'flex', gap: '14px', alignItems: 'baseline', width: '100%', textAlign: 'left', padding: '14px 16px', borderRadius: '10px', fontSize: '15px', fontWeight: (this.state.faqD || 0) === i ? 600 : 500, lineHeight: 1.4, background: (this.state.faqD || 0) === i ? '#fff' : 'transparent', color: (this.state.faqD || 0) === i ? 'var(--ink)' : 'var(--ink-2)', boxShadow: (this.state.faqD || 0) === i ? 'var(--shadow-sm)' : 'none', border: '1px solid ' + ((this.state.faqD || 0) === i ? 'var(--line)' : 'transparent'), cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit' } })),
      dQ: FAQS[this.state.faqD || 0][0], dA: FAQS[this.state.faqD || 0][1], dN: String((this.state.faqD || 0) + 1).padStart(2, '0') + ' / ' + String(FAQS.length).padStart(2, '0'),
      dPrev: () => this.setState(st => ({ faqD: ((st.faqD || 0) + FAQS.length - 1) % FAQS.length })), dNext: () => this.setState(st => ({ faqD: ((st.faqD || 0) + 1) % FAQS.length }))
    };
    const base = { itemCount: D && D.counts ? D.counts.items.toLocaleString('en-IN') : '13,131', modes: [], examples: [], sections: [], list: { rows: [], title: 'Browse by section', sub: '', eyebrow: 'Browse the HS' }, d: { path: [], children: [] }, isBrowse: true, isList: false, dataVersion: 'HS 2022 · India 8-digit', placeholder: '', q: s.q, faqs, resultsRef: this.resultsRef };
    const set = (q, m) => { if (!this.state.D) return; const r = this.search(q); const f = r && r.rows[0]; this.setState({ q, run: q, mode: m || mode, sec: null, selKind: f ? (f.it ? 'item' : f.s ? 'sub' : f.h ? 'heading' : 'chapter') : null, selCode: f ? f.code : null, openRow: f ? f.code : null }); if (q.trim()) this.goResults(); };
    const ui = {
      modes: [['product', 'Product'], ['code', 'HSN code']].map(([k, l], i) => ({ label: l, pick: () => this.setState({ mode: k }), style: { display: 'flex', alignItems: 'center', padding: '0 16px', cursor: 'pointer', borderLeft: i ? '1px solid var(--line)' : 'none', background: mode === k ? 'var(--ink)' : '#fff', color: mode === k ? '#fff' : 'var(--ink-3)' } })),
      placeholder: mode === 'code' ? 'Enter a 2 to 8 digit code, e.g. 6907 or 3904.10' : 'Describe your product, e.g. vitrified floor tiles',
      hasQ: !!s.q, onQ: e => this.setState({ q: e.target.value }), onKey: e => { if (e.key === 'Enter') set(s.q); }, submit: () => set(s.q), clear: () => this.setState({ q: '', run: '', selKind: null, selCode: null }),
      examples: [['ceramic tiles', 'product'], ['guar gum', 'product'], ['PVC resin', 'product'], ['basmati rice', 'product'], ['cotton t-shirts', 'product'], ['6907', 'code'], ['8517.13', 'code']].map(([l, m]) => ({ label: l, font: m === 'code' ? 'var(--font-mono)' : 'inherit', pick: () => set(l, m) }))
    };
    if (!D) return { ...faqV, ...base, ...ui };
    const pad = n => String(n).padStart(2, '0'), secOf = id => D.sections.find(x => x.id === id), chOf = c => D.chapters.find(x => x.code === c);
    const sel = (kind, code) => this.setState(st => st.openRow === code ? { openRow: null, selKind: null, selCode: null } : { openRow: code, selKind: kind, selCode: code, copied: false });
    const goTo = (kind, code) => this.setState({ selKind: kind, selCode: code, copied: false });
    const rowStyle = on => ({ background: '#fff', border: on ? '1.5px solid var(--blue-500)' : '1px solid var(--line)', borderRadius: '16px', boxShadow: on ? 'var(--shadow-lg, 0 12px 32px rgba(14,23,38,.10))' : 'var(--shadow-xs)', overflow: 'hidden', transition: 'box-shadow .2s ease, border-color .2s ease' });
    const chev = on => ({ fontSize: '18px', color: 'var(--ink-3)', width: '20px', textAlign: 'center', flex: 'none', transform: on ? 'rotate(180deg)' : 'none', transition: 'transform .2s ease' });
    const res = s.run ? this.search(s.run) : null;
    let list = null;
    if (res) {
      list = { eyebrow: 'Search results', title: `${res.rows.length} ${res.rows.length === 1 ? 'match' : 'matches'} for “${s.run}”`, sub: mode === 'code' ? 'Matched by code prefix.' : 'Ranked by description and common product names.', note: res.note, empty: !res.rows.length,
        rows: res.rows.map(r => { const kind = r.it ? 'item' : r.s ? 'sub' : r.h ? 'heading' : 'chapter', c = chOf(r.h ? r.h.chapter : r.code); return {code: r.code, desc: r.desc, kind: r.kind, meta: kind === 'chapter' ? `Section ${c.section}` : `Chapter ${c.code} · ${c.title}`, pick: () => sel(kind, r.code), style: rowStyle(s.openRow === r.code), open: s.openRow === r.code, chev: chev(s.openRow === r.code), pill: r.kind === 'Chapter' ? pill('var(--paper-3)', 'var(--ink-2)') : r.kind === 'Tariff item' ? pill('var(--orange-50, #FFF4EC)', 'var(--orange-600, #C2410C)') : r.kind === 'Subheading' ? pill('var(--good-50)', 'var(--good-600)') : pill('var(--blue-50)', 'var(--blue-700)') }; }) };
    } else if (s.sec) {
      const sc = secOf(s.sec);
      list = { eyebrow: `Section ${sc.id} · Chapters ${pad(sc.from)}-${pad(sc.to)}`, title: sc.title, sub: 'Pick a chapter to see its headings.', rows: D.chapters.filter(c => c.section === sc.id).map(c => { const n = D.headings.filter(h => h.chapter === c.code).length; return { code: c.code, desc: c.title, meta: `${n} heading${n === 1 ? '' : 's'}`, kind: 'Chapter', pick: () => sel('chapter', c.code), style: rowStyle(s.openRow === c.code), open: s.openRow === c.code, chev: chev(s.openRow === c.code), pill: pill('var(--paper-3)', 'var(--ink-2)') }; }) };
    }
    let d = null;
    if (list && s.selKind) {
      let h = null, sub = null, item = null, ch;
      const sc8 = s.selCode.replace('.', '');
      if (s.selKind === 'chapter') ch = chOf(s.selCode);
      else { h = D.headings.find(x => x.code === sc8.slice(0, 4)); if (s.selKind !== 'heading') sub = h.subs.find(y => y.code.replace('.', '') === sc8.slice(0, 6)); if (s.selKind === 'item') item = sub.items.find(y => y.code === sc8); ch = chOf(h.chapter); }
      const sc = secOf(ch.section), pr = on => ({ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '6px 12px', border: '1px solid ' + (on ? 'var(--blue-300)' : 'var(--line)'), borderRadius: '999px', background: on ? 'var(--blue-50)' : 'var(--paper-2)', cursor: 'pointer', maxWidth: '100%' });
      const short = t => t.length > 42 ? t.slice(0, 40).replace(/[ ,;]+\S*$/, '') + '…' : t;
      const path = [{ level: 'Section', code: sc.id, title: sc.title, short: short(sc.title), pick: () => this.setState({ run: '', q: '', sec: sc.id, selKind: null }), style: pr(false) }, { level: 'Chapter', code: ch.code, title: ch.title, short: short(ch.title), pick: () => goTo('chapter', ch.code), style: pr(s.selKind === 'chapter') }];
      if (h) path.push({ level: 'Heading', code: h.code, title: h.desc, short: s.selKind === 'heading' ? '' : short(h.desc), pick: () => goTo('heading', h.code), style: pr(s.selKind === 'heading') });
      if (sub) path.push({ level: 'Subheading', code: sub.code, title: sub.desc, short: item ? short(sub.desc) : '', pick: () => goTo('sub', sub.code), style: pr(s.selKind === 'sub') });
      if (item) path.push({ level: 'Tariff item', code: item.code, title: item.desc, short: '', pick: () => {}, style: pr(true) });
      const cs = { display: 'flex', flexDirection: 'column', gap: '6px', padding: '14px 16px', border: '1px solid var(--line)', borderRadius: '12px', background: 'var(--paper-2)', cursor: 'pointer', transition: 'all .15s ease' };
      const children = s.selKind === 'chapter' ? D.headings.filter(x => x.chapter === ch.code).map(x => ({ code: x.code, desc: x.desc, pick: () => goTo('heading', x.code), style: cs })) : s.selKind === 'heading' ? h.subs.map(x => ({ code: x.code, desc: x.desc, pick: () => goTo('sub', x.code), style: cs })) : sub.items.filter(x => !item || x.code !== item.code).map(x => ({ code: x.code, desc: x.desc, pick: () => goTo('item', x.code), style: cs }));
      d = { kind: s.selKind === 'chapter' ? 'HS chapter' : s.selKind === 'item' ? 'India tariff item · 8-digit' : s.selKind === 'sub' ? 'HS subheading · 6-digit' : 'HS heading · 4-digit', code: item ? item.code : sub ? sub.code : h ? h.code : ch.code, desc: item ? item.desc : sub ? sub.desc : h ? h.desc : ch.title, path, children, hasChildren: children.length > 0, noChildren: !children.length && s.selKind !== 'item', childTitle: s.selKind === 'chapter' ? 'Headings in this chapter' : s.selKind === 'item' ? 'Other 8-digit codes under ' + sub.code : s.selKind === 'sub' ? '8-digit tariff items' : 'Subheadings', noChildrenText: s.selKind === 'chapter' ? 'This chapter is reserved and has no headings.' : 'India has no separate 8-digit split listed for this subheading. Check the official tariff before filing.' };
    }
    return {
      ...faqV,
      ...base,
      ...ui,
      sections: D.sections.map(x => ({ id: x.id, title: x.title, range: x.from === x.to ? pad(x.from) : `${pad(x.from)}-${pad(x.to)}`, pick: () => { this.setState({ sec: x.id, selKind: null, selCode: null, openRow: null }); this.goResults(); } })),
      list: list || { eyebrow: 'Browse the HS', title: 'Not sure what to search? Start from a section.', sub: '21 sections · 98 chapters of the Harmonized System.' },
      isBrowse: !list, isList: !!list,
      showBack: !!list, back: () => { this.setState({ run: '', q: '', sec: null, selKind: null, selCode: null }); this.goResults(); }, toBrowse: () => this.setState({ run: '', q: '', sec: null, selKind: null }),
      hasDetail: !!d, d: d || base.d, dataVersion: D.version,
      copyLabel: s.copied ? 'Copied ✓' : 'Copy code', copy: () => { const c = d && d.code; if (!c) return; const fb = () => { const ta = document.createElement('textarea'); ta.value = c; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;'; document.body.appendChild(ta); ta.focus(); ta.select(); ta.setSelectionRange(0, c.length); try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(ta); }; fb(); if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(c).catch(() => {}); this.setState({ copied: true }); this.flash(`${c} copied`); },
      toTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      toast: s.toast
    };
  }

  render() {
    const V = this.renderVals();
    return (
<main className="ft-page">
<section className="section" id="search" style={{ position: "relative", overflow: "hidden", padding: "44px 20px 44px", background: "linear-gradient(180deg,#EFF5FE 0%,#F7F9FC 60%,#fff 100%)" }}>
  <div className="hero-glow-a"></div>
  <div className="hero-glow-b"></div>
  <div className="hero-grid"></div>
  <div style={{ position: "relative", maxWidth: "880px", margin: "0 auto", textAlign: "center" }}>
    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 12px", borderRadius: "999px", background: "#fff", border: "1px solid var(--line)", boxShadow: "var(--shadow-xs)", marginBottom: "20px" }}>
      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--good-500)" }}></span>
      <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-2)" }}>Free tool · No sign-up</span>
    </div>
    <h1 className="hero-h1" style={{ fontWeight: "600", fontSize: "clamp(40px,5vw,60px)", lineHeight: "1.04", letterSpacing: "-.035em", margin: "0 0 18px", textWrap: "balance" }}>Find the right HSN code<br /><span style={{ background: "linear-gradient(120deg,var(--blue-600) 0%,var(--orange-500) 60%,var(--amber-500) 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>before the shipping bill does.</span></h1>
    <p style={{ fontSize: "18px", lineHeight: "1.6", color: "var(--ink-2)", margin: "0 auto 32px", maxWidth: "620px", textWrap: "pretty" }}>Search by product description or code. See the section, chapter, heading and subheading in one view. Free for importers, exporters and freight forwarders.</p>

    <div style={{ padding: "2px", borderRadius: "22px", background: "conic-gradient(from var(--bang),var(--blue-500) 0%,var(--blue-300) 20%,var(--orange-500) 45%,var(--amber-500) 60%,var(--blue-300) 80%,var(--blue-500) 100%)", animation: "border-spin 4s linear infinite", boxShadow: "var(--shadow-xl)", textAlign: "left" }}>
      <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", height: "52px", border: "1px solid var(--line)", borderRadius: "12px", background: "#fff", overflow: "hidden", fontSize: "14px", fontWeight: "600", flex: "none" }}>
            {(V.modes || []).map((m, mI) => (<Fragment key={mI}><div onClick={m.pick} style={m.style}>{m.label}</div></Fragment>
))}
          </div>
          <div style={{ flex: "1", minWidth: "240px", height: "52px", border: "1px solid var(--line-strong)", borderRadius: "12px", background: "var(--bg-sunken, #EEF3FA)", display: "flex", alignItems: "center", gap: "10px", padding: "0 14px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input value={V.q} onChange={V.onQ} onKeyDown={V.onKey} placeholder={V.placeholder} aria-label="Search HSN codes" style={{ border: "0", outline: "0", background: "transparent", font: "inherit", fontSize: "16px", flex: "1", minWidth: "0", color: "var(--ink)" }} />
            {V.hasQ ? (<><button className="ft-hsn-h1" onClick={V.clear} aria-label="Clear search" style={{ flex: "none", display: "flex", alignItems: "center", justifyContent: "center", width: "28px", height: "28px", borderRadius: "999px", background: "transparent", color: "var(--ink-3)", cursor: "pointer" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg></button></>) : null}
          </div>
          <button onClick={V.submit} style={{ display: "flex", alignItems: "center", gap: "8px", height: "52px", padding: "0 24px", borderRadius: "12px", background: "var(--blue-600)", color: "#fff", fontSize: "15px", fontWeight: "600", boxShadow: "var(--shadow-blue)", flex: "none" }}>Check HSN code <span aria-hidden="true">→</span></button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", fontSize: "13px" }}>
          <span style={{ color: "var(--ink-3)" }}>Popular:</span>
          {(V.examples || []).map((e, eI) => (<Fragment key={eI}><span className="ft-hsn-h2" onClick={e.pick} style={{ padding: "5px 11px", border: "1px solid var(--line)", borderRadius: "999px", background: "#fff", color: "var(--ink-2)", cursor: "pointer", fontFamily: e.font }}>{e.label}</span></Fragment>
))}
        </div>
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "center", marginTop: "22px" }}>
      <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", padding: "4px", borderRadius: "16px", background: "rgba(255,255,255,.85)", border: "1px solid var(--line)", boxShadow: "var(--shadow-md)", backdropFilter: "blur(6px)" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "6px 16px 6px 6px" }}><span style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: "30px", height: "30px", padding: "0 6px", borderRadius: "9px", background: "var(--blue-600)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "700" }}>₹0</span><span style={{ fontSize: "14px", fontWeight: "600", color: "var(--ink)", whiteSpace: "nowrap" }}>Free to use</span></span>
        <span style={{ width: "1px", alignSelf: "stretch", margin: "6px 0", background: "var(--line)" }}></span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "6px 16px 6px 6px" }}><span style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: "30px", height: "30px", padding: "0 6px", borderRadius: "9px", background: "var(--orange-500)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "700" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 7.5-2" /></svg></span><span style={{ fontSize: "14px", fontWeight: "600", color: "var(--ink)", whiteSpace: "nowrap" }}>No login required</span></span>
        <span style={{ width: "1px", alignSelf: "stretch", margin: "6px 0", background: "var(--line)" }}></span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "6px 16px 6px 6px" }}><span style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: "30px", height: "30px", padding: "0 6px", borderRadius: "9px", background: "var(--ink)", color: "var(--amber-500)", fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "700" }}>8</span><span style={{ fontSize: "12.5px", fontWeight: "600", color: "var(--ink)", whiteSpace: "nowrap", fontFamily: "var(--font-mono)" }}>{V.dataVersion}</span></span>
      </div>
    </div>

  </div>
</section>

<section className="section" id="results" ref={V.resultsRef} style={{ padding: "44px 20px", background: "#fff", scrollMarginTop: "72px" }}>
  <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
    <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
      <div style={{ flex: "1", minWidth: "260px" }}>
        <div className="ds-eyebrow" style={{ marginBottom: "12px" }}>{V.list.eyebrow}</div>
        <h2 className="ds-h2" style={{ margin: "0", textWrap: "balance" }}>{V.list.title}</h2>
        <p style={{ margin: "8px 0 0", fontSize: "15px", color: "var(--ink-3)" }}>{V.list.sub}</p>
      </div>
      {V.showBack ? (<><button onClick={V.back} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 16px", borderRadius: "10px", border: "1px solid var(--line-strong)", background: "#fff", fontSize: "14px", fontWeight: "600", color: "var(--ink)" }}>← All sections</button></>) : null}
    </div>

    {V.isBrowse ? (<>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,260px),1fr))", gap: "14px" }}>
        {(V.sections || []).map((x, xI) => (<Fragment key={xI}>
          <div className="ft-hsn-h3" onClick={x.pick} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "14px", boxShadow: "var(--shadow-sm)", padding: "18px", cursor: "pointer", display: "flex", flexDirection: "column", gap: "10px", transition: "all .2s ease" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", color: "var(--blue-700)", padding: "3px 8px", borderRadius: "6px", background: "var(--blue-50)" }}>Section {x.id}</span><span style={{ fontFamily: "var(--font-mono)", fontSize: "11.5px", color: "var(--ink-3)" }}>Ch. {x.range}</span></div>
            <div style={{ fontSize: "15px", fontWeight: "600", lineHeight: "1.4", textWrap: "pretty" }}>{x.title}</div>
          </div>
        </Fragment>
))}
      </div>
    </>) : null}

    {V.isList ? (<>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {V.list.note ? (<><div style={{ padding: "12px 18px", borderRadius: "12px", background: "var(--amber-50)", fontSize: "13.5px", color: "var(--ink-2)" }}>{V.list.note}</div></>) : null}
        {(V.list.rows || []).map((r, rI) => (<Fragment key={rI}>
          <div style={r.style}>
            <div className="ft-hsn-h4" onClick={r.pick} style={{ display: "flex", alignItems: "center", gap: "24px", padding: "22px 26px", cursor: "pointer" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "26px", fontWeight: "600", letterSpacing: "-.01em", minWidth: "120px", flex: "none" }}>{r.code}</span>
              <div style={{ minWidth: "0", flex: "1" }}><div style={{ fontSize: "16px", fontWeight: "500", lineHeight: "1.45", textWrap: "pretty" }}>{r.desc}</div><div style={{ fontSize: "13px", color: "var(--ink-3)", marginTop: "4px" }}>{r.meta}</div></div>
              <span style={r.pill}>{r.kind}</span>
              <span style={r.chev}>⌄</span>
            </div>
            {r.open ? (<>
              <div style={{ borderTop: "1px solid var(--line-soft)", padding: "20px 26px 24px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", flex: "1", minWidth: "0" }}>
                    {(V.d.path || []).map((p, pI) => (<Fragment key={pI}>
                      <div onClick={p.pick} style={p.style}><span style={{ fontSize: "10.5px", fontWeight: "700", letterSpacing: ".08em", color: "var(--ink-3)", textTransform: "uppercase" }}>{p.level}</span><span style={{ fontFamily: "var(--font-mono)", fontSize: "12.5px", fontWeight: "600" }}>{p.code}</span><span style={{ fontSize: "13px", color: "var(--ink-2)" }}>{p.short}</span></div>
                    </Fragment>
))}
                  </div>
                  <button onClick={V.copy} style={{ display: "flex", alignItems: "center", gap: "6px", height: "38px", padding: "0 16px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", fontSize: "13.5px", fontWeight: "600", boxShadow: "var(--shadow-sm)", flex: "none" }}>{V.copyLabel}</button>
                </div>
                {V.d.hasChildren ? (<>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: ".1em", color: "var(--ink-3)", textTransform: "uppercase", marginBottom: "10px" }}>{V.d.childTitle}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,260px),1fr))", gap: "10px" }}>
                      {(V.d.children || []).map((c, cI) => (<Fragment key={cI}><div className="ft-hsn-h5" onClick={c.pick} style={c.style}><span style={{ fontFamily: "var(--font-mono)", fontSize: "16px", fontWeight: "600" }}>{c.code}</span><span style={{ fontSize: "13.5px", color: "var(--ink-2)", lineHeight: "1.5" }}>{c.desc}</span></div></Fragment>
))}
                    </div>
                  </div>
                </>) : null}
                {V.d.noChildren ? (<><div style={{ fontSize: "13.5px", color: "var(--ink-3)", lineHeight: "1.5" }}>{V.d.noChildrenText}</div></>) : null}
              </div>
            </>) : null}
          </div>
        </Fragment>
))}
        {V.list.empty ? (<>
          <div style={{ padding: "48px 24px", textAlign: "center", background: "#fff", border: "1px solid var(--line)", borderRadius: "18px" }}>
            <div style={{ fontSize: "17px", fontWeight: "600" }}>No matching classification found</div>
            <div style={{ fontSize: "14px", color: "var(--ink-3)", margin: "6px auto 0", maxWidth: "380px", lineHeight: "1.55", textWrap: "pretty" }}>Try a more general product name (“tiles” rather than a brand) or browse the 21 HS sections.</div>
            <button onClick={V.toBrowse} style={{ marginTop: "16px", padding: "10px 16px", borderRadius: "10px", border: "1px solid var(--line-strong)", background: "#fff", fontSize: "14px", fontWeight: "600", color: "var(--ink)" }}>Browse by section</button>
          </div>
        </>) : null}
        <div style={{ padding: "14px 18px", borderRadius: "12px", background: "var(--amber-50)", fontSize: "13px", lineHeight: "1.55", color: "var(--ink-2)", marginTop: "4px" }}><b style={{ color: "var(--amber-600)" }}>Indicative classification.</b> HS codes are harmonised to 6 digits. Duty and GST rates are not shown. Verify with the CBIC customs tariff or a licensed customs broker before filing.</div>
      </div>
    </>) : null}
  </div>
</section>

<section className="section" style={{ padding: "44px 20px", background: "var(--paper-2)" }}>
  <div className="grid-1-md" style={{ maxWidth: "1440px", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,.9fr) minmax(0,1.1fr)", gap: "56px", alignItems: "center" }}>
    <div>
      <div className="ds-eyebrow" style={{ marginBottom: "14px" }}>Reading the code</div>
      <h2 className="ds-h2" style={{ margin: "0 0 14px", textWrap: "balance" }}>Six digits are global. The last two are yours.</h2>
      <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "var(--ink-2)", textWrap: "pretty" }}>The first six digits come from the WCO's Harmonized System and are identical in every member country. India's ITC-HS adds two more for customs duty and GST, so your buyer's country may use a different 8- or 10-digit line for the same product.</p>
    </div>
    <div className="digits" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "12px" }}>
      <div style={{ background: "#fff", border: "1.5px solid var(--blue-500)", borderRadius: "14px", padding: "22px 16px", boxShadow: "var(--shadow-sm)" }}><div style={{ fontFamily: "var(--font-mono)", fontSize: "40px", fontWeight: "600", color: "var(--blue-700)" }}>69</div><div style={{ fontSize: "14px", fontWeight: "600", marginTop: "8px" }}>Chapter</div><div style={{ fontSize: "12.5px", color: "var(--ink-3)", marginTop: "4px", lineHeight: "1.45" }}>Ceramic products</div></div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "14px", padding: "22px 16px", boxShadow: "var(--shadow-sm)" }}><div style={{ fontFamily: "var(--font-mono)", fontSize: "40px", fontWeight: "600" }}>07</div><div style={{ fontSize: "14px", fontWeight: "600", marginTop: "8px" }}>Heading</div><div style={{ fontSize: "12.5px", color: "var(--ink-3)", marginTop: "4px", lineHeight: "1.45" }}>Ceramic flags, paving and tiles</div></div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "14px", padding: "22px 16px", boxShadow: "var(--shadow-sm)" }}><div style={{ fontFamily: "var(--font-mono)", fontSize: "40px", fontWeight: "600" }}>21</div><div style={{ fontSize: "14px", fontWeight: "600", marginTop: "8px" }}>Subheading</div><div style={{ fontSize: "12.5px", color: "var(--ink-3)", marginTop: "4px", lineHeight: "1.45" }}>Water absorption ≤ 0.5%</div></div>
      <div style={{ background: "transparent", border: "1.5px dashed var(--line-strong)", borderRadius: "14px", padding: "22px 16px" }}><div style={{ fontFamily: "var(--font-mono)", fontSize: "40px", fontWeight: "600", color: "var(--ink-4)" }}>xx</div><div style={{ fontSize: "14px", fontWeight: "600", marginTop: "8px" }}>Tariff item</div><div style={{ fontSize: "12.5px", color: "var(--ink-3)", marginTop: "4px", lineHeight: "1.45" }}>National: set by each country</div></div>
    </div>
  </div>
</section>

<section className="section" style={{ padding: "44px 20px", background: "#fff" }}>
  <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
    <div style={{ marginBottom: "32px", maxWidth: "820px" }}>
      <div className="ds-eyebrow" style={{ marginBottom: "14px" }}>How to find an HSN code</div>
      <h2 className="ds-h2" style={{ margin: "0 0 14px", textWrap: "balance" }}>Search, compare, then verify.</h2>
      <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "var(--ink-2)", maxWidth: "720px", textWrap: "pretty" }}>A keyword match is a starting point, not a classification. Use the checker to narrow the field, then confirm the final code against the official tariff.</p>
    </div>
    <div className="grid-1-md" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "16px" }}>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: "700" }}>1</span>
        <h3 className="ds-h3" style={{ margin: "0" }}>Search by product or code</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Describe the product in plain words, such as “vitrified floor tiles”, or enter 2 to 8 digits to jump to a chapter, heading, subheading or tariff item.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: "700" }}>2</span>
        <h3 className="ds-h3" style={{ margin: "0" }}>Compare the matches</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Results are ranked by how closely the description fits. Open each one to see its section, chapter and heading.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: "700" }}>3</span>
        <h3 className="ds-h3" style={{ margin: "0" }}>Check material, function and use</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Classification turns on what the product is made of, what it does and how it is used, plus the section and chapter notes. Similar-looking goods can sit in different headings.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: "700" }}>4</span>
        <h3 className="ds-h3" style={{ margin: "0" }}>Verify before you file</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Confirm the 8-digit code against the CBIC customs tariff or the DGFT ITC-HS schedules, or with your customs broker, before it goes on a declaration.</p>
      </div>
    </div>
    <div style={{ marginTop: "24px" }}><a href="#search" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 18px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", boxShadow: "var(--shadow-blue)", fontWeight: "600", fontSize: "14px" }}>Search HSN codes ↑</a></div>
  </div>
</section>

<section className="section" style={{ padding: "44px 20px", background: "var(--paper-2)" }}>
  <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
    <div style={{ marginBottom: "32px", maxWidth: "820px" }}>
      <div className="ds-eyebrow" style={{ marginBottom: "14px" }}>Why it matters</div>
      <h2 className="ds-h2" style={{ margin: "0 0 14px", textWrap: "balance" }}>One code, several decisions downstream.</h2>
      <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "var(--ink-2)", maxWidth: "720px", textWrap: "pretty" }}>The HSN code on your invoice or shipping bill tells customs what the goods are. A lot follows from that one line.</p>
    </div>
    <div className="grid-1-md" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "16px" }}>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", color: "var(--blue-700)" }}>01</span>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Customs documentation</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Shipping bills, bills of entry and commercial invoices need consistent codes. A mismatch can trigger queries, holds or amendments.</p>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", color: "var(--blue-700)" }}>02</span>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Tariff treatment</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Duty rates, trade-agreement preferences and trade remedies are set by tariff line, so the code decides which rate applies.</p>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", color: "var(--orange-600, #C85A12)" }}>03</span>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Import and export policy</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>India’s ITC-HS schedules mark each line as free, restricted or prohibited. Some lines need a licence or authorisation.</p>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", color: "var(--orange-600, #C85A12)" }}>04</span>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Tax treatment</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>In India, GST rates are mapped to HSN codes, and GST invoices must show the code at the length your turnover requires.</p>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", color: "var(--amber-600)" }}>05</span>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Product-specific requirements</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Certain lines carry extra rules, such as standards certification, food safety clearance or plant quarantine checks.</p>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", color: "var(--ink-3)" }}>NOTE</span>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>What this checker does not do</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>It shows codes and descriptions only. It does not show duty or GST rates, and it does not confirm a classification for you.</p>
      </div>
    </div>
  </div>
</section>

<section className="section" style={{ padding: "44px 20px", background: "#fff", borderBottom: "1px solid var(--line-soft)" }}>
  <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
    <div style={{ marginBottom: "32px", maxWidth: "820px" }}>
      <div className="ds-eyebrow" style={{ marginBottom: "14px" }}>Who uses it</div>
      <h2 className="ds-h2" style={{ margin: "0", textWrap: "balance" }}>Built for the people who fill in the code box.</h2>
    </div>
    <div className="grid-1-md" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "16px" }}>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Importers</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Check the likely heading before asking a broker for a duty estimate, so the conversation starts from the right chapter.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Exporters</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Find the 8-digit ITC-HS line for the shipping bill and see how the 6-digit code will read in the buyer’s country.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Customs brokers and CHAs</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Look up a heading quickly when a client sends a vague product description, then confirm against the tariff.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Manufacturers</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Classify a new product line once and use the same code across invoices, shipping bills and GST returns.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Traders</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Keep a clean product master with one code per SKU, so documents match from one shipment to the next.</p>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "16px", padding: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.01em", color: "var(--ink)" }}>Freight and logistics teams</h3>
        <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Fill in a missing code while preparing shipment documents, without leaving the booking to search.</p>
      </div>
    </div>
  </div>
</section>

<section className="section" style={{ padding: "44px 20px", background: "#fff" }}>
  <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
    <div style={{ textAlign: "center", marginBottom: "32px" }}>
      <div className="ds-eyebrow" style={{ marginBottom: "14px" }}>More free tools</div>
      <h2 className="ds-h2" style={{ margin: "0", textWrap: "balance" }}>Classified the cargo? Now size it.</h2>
    </div>
    <div className="grid-1-md" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "20px" }}>
      <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", boxShadow: "var(--shadow-sm)", padding: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", padding: "3px 8px", borderRadius: "6px", background: "var(--orange-50)", color: "var(--orange-600, #C85A12)" }}>CBM</span><span style={{ fontSize: "12px", fontWeight: "600", color: "var(--ink-3)" }}>FCL · LCL</span></div>
        <h3 className="ds-h3" style={{ margin: "0" }}>CBM &amp; cargo calculator</h3>
        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Add your cargo items and get total volume, weight, chargeable W/M and a container recommendation with loading utilisation.</p>
        <a href="/free-tools/cbm-calculator" style={{ marginTop: "auto", alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 18px", borderRadius: "10px", background: "var(--blue-600)", color: "#fff", fontWeight: "600", fontSize: "14px", boxShadow: "var(--shadow-blue)" }}>Use free CBM calculator →</a>
      </div>
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "18px", padding: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "600", padding: "3px 8px", borderRadius: "6px", background: "var(--blue-50)", color: "var(--blue-700)" }}>HSN</span><span style={{ fontSize: "12px", fontWeight: "600", color: "var(--good-600)" }}>You're here</span></div>
        <h3 className="ds-h3" style={{ margin: "0" }}>HSN code checker</h3>
        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "var(--ink-2)", textWrap: "pretty" }}>Search by product or code and see the full HS hierarchy: section, chapter, heading and subheading.</p>
        <button onClick={V.toTop} style={{ marginTop: "auto", alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 18px", borderRadius: "10px", border: "1px solid var(--line-strong)", background: "#fff", color: "var(--ink)", fontWeight: "600", fontSize: "14px" }}>Search another code ↑</button>
      </div>
    </div>
  </div>
</section>

<section className="section" id="faq" style={{ padding: "44px 20px", background: "var(--paper-2)" }}>
  <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "720px" }}>
      <div className="ds-eyebrow" style={{ alignSelf: "flex-start" }}>HSN basics</div>
      <h2 className="ds-h2" style={{ margin: "0", textWrap: "balance" }}>Questions we hear from export desks.</h2>
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
<ContainerCta variant="seal" headline="Need more than an HSN lookup? Meet Susea." />
{V.toast ? (<><div style={{ position: "fixed", left: "50%", bottom: "28px", transform: "translateX(-50%)", padding: "10px 16px", background: "var(--ink)", color: "#fff", borderRadius: "12px", boxShadow: "var(--shadow-xl)", fontSize: "13.5px", zIndex: "60", whiteSpace: "nowrap" }}>✓ {V.toast}</div></>) : null}
</main>
    );
  }
}
