import Icon from '@/components/ui/Icon'

const FEATURES = [
  ['zap', 'AI quotation engine', 'Generate branded, customer-ready quotes in under 90 seconds — per lane, per container, per customer.'],
  ['layout-grid', 'Multi-carrier pricing', 'Live rates from 14+ shipping lines, normalized into one comparable surface.'],
  ['git-compare-arrows', 'Spot rate comparison', 'Side-by-side spot vs. contract pricing with transit, free-time and validity deltas.'],
  ['file-scan', 'Tariff AI extraction', 'Drop any PDF, XLS or forwarded WhatsApp rate — Susea reads it like a pricing analyst.'],
  ['badge-dollar-sign', 'Surcharge automation', 'BAF · CAF · THC · LSS · ISPS — modeled, applied and enforced on every booking.'],
  ['gavel', 'RFQ & reverse auctions', 'Float multi-lane tenders to your own agents and let them compete live to win.'],
  ['send', 'WhatsApp & email quote sharing', 'Send branded spot quotes straight to your customers over WhatsApp or email — with read receipts and one-tap acceptance.'],
  ['messages-square', 'RFQ over WhatsApp & email', 'Invite agents and push live bid requests and updates on the channels they already use — no new login required.'],
  ['file-check-2', 'Contracts & utilization', 'Awarded rates become digital contracts — with utilization tracked so negotiated savings actually land.'],
  ['trending-up', 'Margin & profit insights', 'Per-quote, per-customer, per-lane margin analytics — engineered, not guessed.'],
  ['database', 'Carrier rate management', 'One source of truth for every carrier contract, GRI and surcharge update.'],
  ['radar', 'Shipment visibility', 'Live container tracking with ETA prediction and exception alerts.'],
]

export default function Features() {
  return (
    <section className="sec band" id="features">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow"><span className="dot"></span> Features</span>
          <h2 className="h-section">A complete pricing &amp; procurement<br />stack for freight forwarders.</h2>
          <p className="lead">Everything a modern pricing desk needs — quotation, comparison, extraction, surcharge automation, competitive RFQs and visibility — in one operating system.</p>
        </div>
        <div className="features-grid">
          {FEATURES.map(([icon, t, d], i) => (
            <div className="feat" key={i}>
              <div className="fico"><Icon name={icon} size={19} /></div>
              <h4>{t}</h4>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
