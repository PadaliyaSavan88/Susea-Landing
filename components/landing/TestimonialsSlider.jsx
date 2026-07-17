'use client'
import { useEffect, useRef } from 'react'

const LOGOS = {
  meridian: (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="18" height="9" rx="2" fill="#2f6bd8" opacity="0.3" />
      <rect x="12" y="18" width="18" height="9" rx="2" fill="#2f6bd8" />
    </svg>
  ),
  bluewave: (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
      <path d="M3 22 C7 13 13 13 16 18 C19 23 25 23 29 14" stroke="#0891b2" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M3 27 C7 18 13 18 16 23 C19 28 25 28 29 19" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
    </svg>
  ),
  trident: (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
      {/* Shield outline */}
      <path d="M16 3 L27 7 L27 17 Q27 24 16 29 Q5 24 5 17 L5 7 Z" stroke="#7c3aed" strokeWidth="1.8" fill="#7c3aed" fillOpacity="0.08" strokeLinejoin="round" />
      {/* Trident inside shield */}
      <line x1="16" y1="13" x2="16" y2="23" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
      <line x1="11" y1="11" x2="11" y2="16" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
      <line x1="21" y1="11" x2="21" y2="16" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 11 Q16 7 22 11" stroke="#7c3aed" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  ),
  apex: (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="26" height="26" rx="5" stroke="#059669" strokeWidth="2" />
      <polyline points="10,23 16,9 22,23" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  harbor: (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
      {/* Ship's wheel — hub */}
      <circle cx="16" cy="16" r="3.5" stroke="#f07020" strokeWidth="2" />
      {/* Outer rim */}
      <circle cx="16" cy="16" r="11" stroke="#f07020" strokeWidth="1.8" />
      {/* 6 spokes */}
      <line x1="16" y1="5" x2="16" y2="12.5" stroke="#f07020" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="16" y1="19.5" x2="16" y2="27" stroke="#f07020" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="5" y1="16" x2="12.5" y2="16" stroke="#f07020" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="19.5" y1="16" x2="27" y2="16" stroke="#f07020" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="7.8" y1="7.8" x2="13.3" y2="13.3" stroke="#f07020" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="18.7" y1="18.7" x2="24.2" y2="24.2" stroke="#f07020" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="24.2" y1="7.8" x2="18.7" y2="13.3" stroke="#f07020" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="13.3" y1="18.7" x2="7.8" y2="24.2" stroke="#f07020" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  continental: (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="12" stroke="#dc2626" strokeWidth="2" />
      <ellipse cx="16" cy="16" rx="5" ry="12" stroke="#dc2626" strokeWidth="1.5" opacity="0.45" />
      <line x1="4" y1="16" x2="28" y2="16" stroke="#dc2626" strokeWidth="1.5" opacity="0.45" />
      <line x1="6" y1="10" x2="26" y2="10" stroke="#dc2626" strokeWidth="1" opacity="0.3" />
      <line x1="6" y1="22" x2="26" y2="22" stroke="#dc2626" strokeWidth="1" opacity="0.3" />
    </svg>
  ),
}

const TESTIMONIALS = [
  {
    logo: LOGOS.meridian,
    company: 'Meridian Freight Solutions',
    name: 'Arjun Mehta',
    title: 'Head of Pricing',
    quote: 'Before Susea, our pricing desk was copy-pasting rates from four different WhatsApp groups into Excel every morning. Now we get a live comparison across 200+ carriers before the first coffee. Quotation time went from 20 minutes to under 90 seconds. That\'s not an exaggeration.',
  },
  {
    logo: LOGOS.bluewave,
    company: 'BlueWave Logistics',
    name: 'Priya Nair',
    title: 'Commercial Director',
    quote: 'The tariff extraction alone saved us hours every week. We were drowning in PDF rate sheets from agents. Susea just reads them and normalises everything automatically. The surcharge automation is something we didn\'t know we needed until we had it.',
  },
  {
    logo: LOGOS.trident,
    company: 'Trident Global Forwarding',
    name: 'Daniel Osei',
    title: 'Operations Manager',
    quote: 'We ran our first RFQ auction in under 10 minutes. Invited 12 agents, had competitive bids within the hour, awarded the lane the same day. That used to take us three weeks of back-and-forth emails. The audit trail alone has made our compliance team very happy.',
  },
  {
    logo: LOGOS.apex,
    company: 'Apex Trade Partners',
    name: 'Sarah Lindqvist',
    title: 'CEO',
    quote: 'As a smaller forwarder, we couldn\'t afford to lose margin on every quote. Susea\'s margin analytics showed us exactly where we were leaking, per lane, per customer. We tightened our pricing model within the first two weeks and it showed immediately on the bottom line.',
  },
  {
    logo: LOGOS.harbor,
    company: 'Harbor & Co Freight',
    name: 'Mohammed Al-Rashidi',
    title: 'Pricing Lead',
    quote: 'The WhatsApp quote sharing is genuinely a game changer for our market. Customers expect instant responses. Now we send a branded, fully calculated quote directly on WhatsApp in seconds, with a one-tap acceptance. Our conversion rate on quotes has gone up noticeably.',
  },
  {
    logo: LOGOS.continental,
    company: 'Continental Cargo Group',
    name: 'Elena Vasquez',
    title: 'Head of Procurement',
    quote: 'We were the ones pushing hardest for the RFQ feature and the Susea team actually built what we asked for. Sealed bid mode, approval matrix, digital contracts. It covers the full procurement workflow. Nothing else in this space comes close to what they\'ve shipped in beta.',
  },
]

function TestiCard({ logo, company, name, title, quote }) {
  return (
    <div className="tcard">
      <div className="tcard-header">
        <div className="tcard-logo">{logo}</div>
        <div className="tcard-co">{company}</div>
      </div>
      <p className="tcard-quote">{quote}</p>
      <div className="tcard-reviewer">
        <span className="tcard-name">{name}</span>
        <span className="tcard-sep">·</span>
        <span className="tcard-title">{title}</span>
      </div>
    </div>
  )
}

const DURATION = 45 // seconds, must match CSS animation-duration

export default function TestimonialsSlider() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS]
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    track.style.cursor = 'grab'

    let dragging = false
    let startX = 0
    let startOffset = 0

    // positive modulo helper
    const mod = (a, b) => ((a % b) + b) % b

    function getTranslateX() {
      const m = new DOMMatrix(window.getComputedStyle(track).transform)
      return m.m41
    }

    function clientX(e) {
      return e.touches ? e.touches[0].clientX : e.clientX
    }

    function changedClientX(e) {
      return e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    }

    function pause(x) {
      track.style.animation = 'none'
      track.style.transform = `translateX(${x}px)`
    }

    function resume(x) {
      // track.offsetWidth is the full 12-card strip; half = one loop length in px
      const loopPx = track.offsetWidth * 0.5
      const pos = -(mod(-x, loopPx))           // normalise to [-loopPx, 0]
      const delay = -((Math.abs(pos) / loopPx) * DURATION)
      track.style.transform = ''
      track.style.animation = `slide ${DURATION}s ${delay}s linear infinite`
    }

    function onStart(e) {
      dragging = true
      startX = clientX(e)
      startOffset = getTranslateX()
      pause(startOffset)
      track.style.cursor = 'grabbing'
      track.style.userSelect = 'none'
    }

    function onMove(e) {
      if (!dragging) return
      track.style.transform = `translateX(${startOffset + clientX(e) - startX}px)`
    }

    function onEnd(e) {
      if (!dragging) return
      dragging = false
      resume(startOffset + changedClientX(e) - startX)
      track.style.cursor = 'grab'
      track.style.userSelect = ''
    }

    track.addEventListener('mousedown', onStart)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onEnd)
    track.addEventListener('touchstart', onStart, { passive: true })
    track.addEventListener('touchmove', onMove, { passive: true })
    track.addEventListener('touchend', onEnd)

    return () => {
      track.removeEventListener('mousedown', onStart)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onEnd)
      track.removeEventListener('touchstart', onStart)
      track.removeEventListener('touchmove', onMove)
      track.removeEventListener('touchend', onEnd)
    }
  }, [])

  return (
    <section className="sec testi-sec" id="testimonials">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow"><span className="dot"></span> Trusted by beta partners</span>
          <h2 className="h-section">Built with the forwarders<br />who use it every day.</h2>
          <p className="lead">Our beta cohort shaped every feature. Here&rsquo;s what they said.</p>
        </div>
      </div>
      <div className="marquee testi-marquee">
        <div className="track testi-track" ref={trackRef}>
          {doubled.map((t, i) => (
            <TestiCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  )
}
