'use client'
import { useEffect, useRef, useState } from 'react'
import Icon from '@/components/ui/Icon'

export default function TwoWaysToPrice({ onSpot, onRfq }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect() } }, { threshold: .2 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <section className="sec" id="two-ways">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow"><span className="dot"></span> One platform · two ways to price</span>
          <h2 className="h-section">Get an instant rate — or make <br />your agents compete for it.</h2>
          <p className="lead">Susea is the only ocean-freight OS that does both. Grab a live spot rate when you need a price now, or run a structured RFQ to your own agent network when the volume is worth a negotiation.</p>
        </div>

        <div className={'two-ways' + (inView ? ' in' : '')} ref={ref}>
          <div className="way spot">
            <div className="way-ico"><Icon name="zap" size={22} /></div>
            <span className="kicker">Spot pricing</span>
            <h3>Instant rates</h3>
            <p>Compare live rates across 200+ carriers and send a branded customer quote in under 90 seconds — no negotiation needed.</p>
            <ul className="way-list">
              <li><span className="ck"><Icon name="check" size={12} /></span> Live multi-carrier rate comparison</li>
              <li><span className="ck"><Icon name="check" size={12} /></span> AI tariff extraction &amp; surcharge automation</li>
              <li><span className="ck"><Icon name="check" size={12} /></span> Customer-ready quote in seconds</li>
            </ul>
            <div className="when"><Icon name="clock" size={14} /> <span>Best when you need a price <b>right now</b></span></div>
            <div className="way-cta"><button className="btn btn-primary" onClick={onSpot}>See live pricing <Icon name="arrow-right" size={14} /></button></div>
          </div>

          <div className="way rfq">
            <div className="way-ico"><Icon name="gavel" size={22} /></div>
            <span className="kicker">Procurement</span>
            <h3>Run an RFQ</h3>
            <p>Float a multi-lane tender to your own forwarders and agents, let them compete in a live reverse auction, and award the best — all audit-ready.</p>
            <ul className="way-list">
              <li><span className="ck"><Icon name="check" size={12} /></span> Launch to your whole agent network in one click</li>
              <li><span className="ck"><Icon name="check" size={12} /></span> Live reverse auction with real-time ranking</li>
              <li><span className="ck"><Icon name="check" size={12} /></span> AI recommendation, approval matrix &amp; contracts</li>
            </ul>
            <div className="when"><Icon name="trending-down" size={14} /> <span>Best when volume justifies a <b>negotiation</b></span></div>
            <div className="way-cta"><button className="btn btn-orange" onClick={onRfq}>See the live auction <Icon name="arrow-right" size={14} /></button></div>
          </div>
        </div>

        <div className="ways-bridge"><span className="ln"></span><span>Same tariffs, same carriers, same quote engine — <b>one source of truth</b></span><span className="ln"></span></div>
      </div>
    </section>
  )
}
