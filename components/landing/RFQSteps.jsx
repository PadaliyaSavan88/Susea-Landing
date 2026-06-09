import Icon from '@/components/ui/Icon'

const STEPS = [
  ['1', 'rocket', 'Build & launch', 'Upload many lanes at once and float the RFQ to your own agents in a single click — spot or contract.'],
  ['2', 'gavel', 'Agents bid live', 'Invited agents bid in your chosen visibility mode — sealed, rank-only, best-price or open — and re-bid down to climb the ranking.'],
  ['3', 'sparkles', 'AI compares & ranks', 'Every bid is normalized and sanity-checked. AI recommends the best agent by cost, transit or schedule.'],
  ['4', 'shield-check', 'Approve & award', 'Route the winner through your approval matrix with documented justification — fully audit-ready.'],
  ['5', 'file-check-2', 'Contract & track', 'Awarded rates become digital contracts. Susea tracks utilization so negotiated savings actually land.'],
]

export default function RFQSteps() {
  return (
    <section className="sec" id="rfq-how">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow"><span className="dot"></span> How an RFQ works</span>
          <h2 className="h-section">Launch → bid → compare → award,<br />in days — not a month.</h2>
        </div>
        <div className="rfq-flow">
          {STEPS.map(([n, icon, t, d], i) => (
            <div className="rstep" key={i}>
              <div className="rn">{n}</div>
              <h4>{t}</h4>
              <p>{d}</p>
              <div className="ri"><Icon name={icon} size={22} /></div>
              {i < STEPS.length - 1 && <div className="conn"><Icon name="chevron-right" size={16} /></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
