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
    a: "Yes. Upgrade from Starter to Pro at any time — you'll only be charged the prorated difference for the remainder of your billing cycle.",
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
    a: 'Yes, no long-term contracts. Cancel from account settings at any time — access continues until the end of your current billing period.',
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
