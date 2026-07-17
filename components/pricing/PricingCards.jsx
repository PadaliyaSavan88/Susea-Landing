'use client'
import { useEffect, useRef, useState } from 'react'
import Icon from '@/components/ui/Icon'

const PLANS = [
  {
    id: 'starter',
    badge: 'Starter',
    monthlyPrice: 19,
    annuallyPrice: 15,
    description: 'Perfect for small freight forwarders getting started.',
    cta: 'Start Free Trial',
    ctaHref: '/#waitlist',
    ctaClass: 'btn-soft',
    features: [
      '50 RFQs / month',
      '50 Quotes / month',
      'Up to 20 Carrier Agents',
      'Spot Ocean Freight Rates',
      'RFQ Auctions',
      'Quote Generator',
    ],
  },
  {
    id: 'pro',
    badge: 'Most Popular',
    monthlyPrice: 49,
    annuallyPrice: 35,
    description: 'Built for growing freight teams with higher quote volumes.',
    cta: 'Start Free Trial',
    ctaHref: '/#waitlist',
    ctaClass: 'btn-primary',
    features: [
      '150 RFQs / month',
      '150 Quotes / month',
      'Up to 50 Carrier Agents',
      'Spot Ocean Freight Rates',
      'RFQ Auctions',
      'Quote Generator',
      'Priority Support',
    ],
  },
  {
    id: 'enterprise',
    badge: 'Enterprise',
    contact: true,
    description: 'For large logistics companies with custom workflows and unlimited scale.',
    cta: 'Talk to Sales',
    ctaHref: 'mailto:hello@susea.ai',
    ctaClass: 'btn-orange',
    features: [
      'Unlimited RFQs',
      'Unlimited Quotes',
      'Unlimited Carrier Agents',
      'Analytics Dashboard',
      'Custom Workflows',
      'Dedicated Success Manager',
    ],
  },
]

function PriceBlock({ plan, annual }) {
  if (plan.contact) {
    return (
      <div className="plan-price">
        <div className="plan-contact">Contact Us</div>
        <p className="plan-price-note">Custom pricing for your team</p>
      </div>
    )
  }
  return (
    <div className="plan-price" key={annual ? 'annual' : 'monthly'}>
      <div className="plan-price-row">
        <span className="plan-amount">${annual ? plan.annuallyPrice : plan.monthlyPrice}</span>
        <span className="plan-per">/month</span>
        {annual && <span className="plan-old">${plan.monthlyPrice}</span>}
      </div>
      {annual && <p className="plan-billed">billed annually</p>}
    </div>
  )
}

export default function PricingCards({ annual }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect() } }, { threshold: .2 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div className={'plan-grid' + (inView ? ' in' : '')} ref={ref}>
      {PLANS.map((plan) => (
        <article key={plan.id} className={`plan-card ${plan.id}`}>
          <span className="plan-badge">{plan.badge}</span>
          <PriceBlock plan={plan} annual={annual} />
          <p className="plan-desc">{plan.description}</p>
          <div className="plan-divider" aria-hidden="true" />
          <ul className="plan-features">
            {plan.features.map((f) => (
              <li key={f}>
                <span className="plan-check"><Icon name="check" size={16} strokeWidth={2.5} /></span>
                {f}
              </li>
            ))}
          </ul>
          <a className={`btn btn-lg plan-cta ${plan.ctaClass}`} href={plan.ctaHref}>{plan.cta}</a>
        </article>
      ))}
    </div>
  )
}
