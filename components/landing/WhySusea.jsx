'use client'
import { useRef, useState, useEffect } from 'react'
import { useCountUp } from '@/lib/useCountUp'

export default function WhySusea() {
  const ref = useRef(null)
  const [run, setRun] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRun(true); io.disconnect() } }, { threshold: .25 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  const v90 = useCountUp(90, run), v60 = useCountUp(60, run), v120 = useCountUp(120, run), v3 = useCountUp(3, run)

  const before = [
    'Rates scattered across Excel & WhatsApp',
    'Agents negotiated one at a time, by phone',
    'Quotes re-typed by hand · margin guessed',
    'Tenders take 4–6 weeks to award',
    'Customers wait hours for a price',
    'Selection & savings impossible to audit',
  ]
  const after = [
    'Live rates from 120+ carriers on one surface',
    <>Your whole agent network competes in <b>one click</b></>,
    <>Branded customer quotes in <b>&lt; 90 seconds</b></>,
    <>Tenders awarded in <b>1–3 days</b>, audit-ready</>,
    'Quote and award from one operating system',
    'Every price, bid and award fully logged',
  ]

  return (
    <section className="sec" id="why" ref={ref}>
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow"><span className="dot"></span> Why Susea</span>
          <h2 className="h-section">Faster quotes. Tighter margins.<br />Smarter awards.</h2>
          <p className="lead">One operating system replaces the spreadsheets, the WhatsApp threads and the month-long tenders — for both instant pricing and competitive procurement.</p>
        </div>

        <div className="impact-grid">
          <div className="stat"><div className="v"><span className="mono">{v90}</span><span className="u">%</span></div><div className="l">Faster quotation creation across pricing desks running Susea.</div></div>
          <div className="stat"><div className="v"><span style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink-3)' }}>up to </span><span className="mono">{v60}</span><span className="u" style={{ color: 'var(--orange-600)' }}>%</span></div><div className="l">Lower freight cost once your agents compete in a live auction.</div></div>
          <div className="stat"><div className="v"><span className="mono">{v120}</span><span className="u">+</span></div><div className="l">Carrier rates compared on every quote, in one view.</div></div>
          <div className="stat"><div className="v"><span className="mono">{v3}</span><span className="u" style={{ color: 'var(--orange-600)' }}>d</span></div><div className="l">From launching a tender to a signed, audited award.</div></div>
        </div>

        <div className="ba">
          <div className="col">
            <h4 className="b">Before Susea</h4>
            <h3 style={{ color: 'var(--bad-600)' }}>Spreadsheets &amp; sequential calls</h3>
            <ul>{before.map((t, i) => <li key={i}><span className="b-ico">✕</span> {t}</li>)}</ul>
          </div>
          <div className="col after">
            <h4 className="a">After Susea</h4>
            <h3 style={{ color: 'var(--blue-700)' }}>One AI pricing &amp; procurement OS</h3>
            <ul>{after.map((t, i) => <li key={i}><span className="a-ico">✓</span> <span>{t}</span></li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}
