'use client'
import { useState } from 'react'
import Icon from '@/components/ui/Icon'

export default function Waitlist() {
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: '', company: '', businessType: 'Freight forwarder', companySize: '1–10', teuVolume: '< 50 TEU'
  })

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setDone(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="waitlist" id="waitlist">
      <div className="container">
        <div className="wl-card">
          <div>
            <span className="eyebrow"><span className="dot"></span> Early access · Cohort 02</span>
            <h2 style={{ marginTop: 18 }}>Join the future of freight pricing.</h2>
            <p>Get early access to Susea and modernize your freight quotation workflows with AI-powered pricing intelligence. Limited spots — onboarding forwarders and logistics companies this quarter.</p>
            <div className="wl-tags">
              <span className="pill live"><i></i> 142 forwarders on the waitlist</span>
              <span className="pill blue">White-glove onboarding</span>
              <span className="pill orange">Lifetime founder pricing</span>
            </div>
            <div className="wl-stats">
              <div><div className="num">2.4M+</div><div className="cap">Quotes modeled</div></div>
              <div className="vr"></div>
              <div><div className="num">200+</div><div className="cap">Shipping lines</div></div>
              <div className="vr"></div>
              <div><div className="num">38</div><div className="cap">Trade lanes</div></div>
            </div>
          </div>
          <form className="wl-form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="field">
                <label>Work email</label>
                <input type="email" placeholder="you@forwarder.com" required value={form.email} onChange={set('email')} />
              </div>
              <div className="field">
                <label>Company name</label>
                <input type="text" placeholder="Acme Logistics" required value={form.company} onChange={set('company')} />
              </div>
            </div>
            <div className="row">
              <div className="field">
                <label>Business type</label>
                <select required value={form.businessType} onChange={set('businessType')}>
                  <option>Freight forwarder</option>
                  <option>NVOCC</option>
                  <option>Customs broker</option>
                  <option>EXIM business</option>
                  <option>Enterprise shipper</option>
                  <option>3PL / logistics company</option>
                </select>
              </div>
              <div className="field">
                <label>Company size</label>
                <select required value={form.companySize} onChange={set('companySize')}>
                  <option>1–10</option>
                  <option>11–50</option>
                  <option>51–200</option>
                  <option>201–1,000</option>
                  <option>1,000+</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label>Monthly shipment volume (TEU)</label>
              <select required value={form.teuVolume} onChange={set('teuVolume')}>
                <option>&lt; 50 TEU</option>
                <option>50–250 TEU</option>
                <option>250–1,000 TEU</option>
                <option>1,000–5,000 TEU</option>
                <option>5,000+ TEU</option>
              </select>
            </div>
            <button type="submit" className="btn btn-orange btn-lg" disabled={loading}>
              {loading ? 'Submitting…' : <>Request early access <Icon name="arrow-right" size={15} /></>}
            </button>
            <div className="wl-foot"><span className="dot"></span> Limited early access for freight forwarders &amp; logistics teams.</div>
            {done && (
              <div className="confirm">
                <Icon name="check" size={14} /> You&apos;re on the list. We&apos;ll be in touch within 48 hours.
              </div>
            )}
            {error && <div className="error-msg">{error}</div>}
          </form>
        </div>
      </div>
    </section>
  )
}
