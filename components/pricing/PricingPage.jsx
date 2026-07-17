'use client'
import { useState } from 'react'
import Nav from '@/components/landing/Nav'
import Footer from '@/components/landing/Footer'
import BillingToggle from './BillingToggle'
import PricingCards from './PricingCards'
import TrustBar from './TrustBar'
import ComparisonTable from './ComparisonTable'
import PricingFaq from './PricingFaq'
import CtaBanner from './CtaBanner'

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  return (
    <>
      <Nav />
      <main>
        <section className="pricing-hero">
          <div className="grid-bg" />
          <div className="container pricing-hero-inner">
            <span className="eyebrow"><span className="dot"></span> Simple and transparent pricing</span>
            <h1 className="pricing-h1">Simple pricing for modern <em>freight forwarders</em>.</h1>
            <p className="lead">Everything you need to search Spot Rates, manage RFQs, and create quotations faster.</p>
            <BillingToggle annual={annual} onChange={setAnnual} />
          </div>
        </section>
        <section className="sec tight pricing-plans">
          <div className="container">
            <PricingCards annual={annual} />
            <TrustBar />
          </div>
        </section>
        <ComparisonTable />
        <PricingFaq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  )
}
