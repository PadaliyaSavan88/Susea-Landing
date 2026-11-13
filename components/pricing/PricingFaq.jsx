'use client'
import { useState } from 'react'
import Icon from '@/components/ui/Icon'

const FAQS = [
  {
    q: 'How does the free trial work?',
    a: "Your 14-day free trial gives you full access to your plan's features with no credit card required. At the end of the trial you can subscribe or your account will be paused.",
  },
  {
    q: 'Can I upgrade anytime?',
    a: "Yes. Upgrade from Starter to Pro at any time; you'll only be charged the prorated difference for the remainder of your billing cycle.",
  },
  {
    q: 'Do unused RFQs roll over?',
    a: 'RFQ and Quote limits reset at the start of each billing month. Unused credits do not roll over, but you can upgrade your plan if you need more capacity.',
  },
  {
    q: 'Can I invite my own carrier agents?',
    a: "Yes. You can invite your preferred carrier agents directly into Susea to participate in your RFQ auctions, up to your plan's carrier agent limit.",
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes, no long-term contracts. Cancel from account settings at any time; access continues until the end of your current billing period.',
  },
  {
    q: 'What is founding-cohort pricing?',
    a: 'Beta customers lock in founding-cohort pricing for 12 months from signup, with no surprise increases. When we exit beta, standard pricing applies to new customers, not to you.',
  },
  {
    q: 'Is there a discount for paying annually?',
    a: 'Yes. Annual billing is priced lower than paying month to month; you can see the exact per-seat figures by toggling the billing switch at the top of this page.',
  },
  {
    q: 'What counts as an RFQ versus a quote?',
    a: 'A quote is a priced offer you send to a customer. An RFQ is a request you float to your own carrier agents to source buy rates. Each has its own monthly allowance on Starter and Pro, and both are unlimited on Enterprise.',
  },
  {
    q: 'Do you charge per carrier agent I invite?',
    a: 'No. Inviting your carrier agents to bid on your RFQs is included; each plan simply has a cap on how many agents you can have active at once. Enterprise is unlimited.',
  },
  {
    q: 'What payment methods and currencies do you support?',
    a: 'We accept all major cards, and can invoice annually for Pro and Enterprise. If you need a specific currency or purchase-order process, raise it during onboarding and we will set it up.',
  },
]

export default function PricingFaq() {
  const [open, setOpen] = useState(null)
  return (
    <section className="sec tight pricing-faq">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow"><span className="dot"></span> FAQ</span>
          <h2 className="h-section">Frequently asked <em>questions</em></h2>
        </div>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <div className={'faq-item' + (open === i ? ' open' : '')} key={item.q}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {item.q}
                <span className="faq-chev"><Icon name="chevron-down" size={18} /></span>
              </button>
              <div className="faq-a"><p>{item.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
