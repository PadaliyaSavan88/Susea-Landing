import Icon from '@/components/ui/Icon'

const ROWS = [
  { name: 'Spot Ocean Rates',         starter: true,  pro: true,  enterprise: true },
  { name: 'RFQ Auctions',             starter: true,  pro: true,  enterprise: true },
  { name: 'Quote Generator',          starter: true,  pro: true,  enterprise: true },
  { name: 'Carrier Management',       starter: true,  pro: true,  enterprise: true },
  { name: 'Priority Support',         starter: false, pro: true,  enterprise: true },
  { name: 'Analytics Dashboard',      starter: false, pro: false, enterprise: true },
  { name: 'Custom Workflows',         starter: false, pro: false, enterprise: true },
  { name: 'Unlimited Carrier Agents', starter: false, pro: false, enterprise: true },
  { name: 'Dedicated Manager',        starter: false, pro: false, enterprise: true },
  { name: 'Unlimited Usage',          starter: false, pro: false, enterprise: true },
]

export default function ComparisonTable() {
  return (
    <section className="sec tight band">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow"><span className="dot"></span> Plan comparison</span>
          <h2 className="h-section">Compare <em>plans</em></h2>
          <p className="lead">See exactly what each plan includes before you pick one.</p>
        </div>
        <div className="compare-wrap">
          <div className="compare-table">
            <div className="compare-row head">
              <div className="compare-feature">Features</div>
              <div className="compare-plan">Starter</div>
              <div className="compare-plan pro">Pro</div>
              <div className="compare-plan">Enterprise</div>
            </div>
            {ROWS.map((row) => (
              <div className="compare-row" key={row.name}>
                <div className="compare-feature">{row.name}</div>
                {[['Starter', row.starter], ['Pro', row.pro], ['Enterprise', row.enterprise]].map(([label, has]) => (
                  <div className="compare-cell" key={label}>
                    <span className={'compare-cell-label' + (label === 'Pro' ? ' pro' : '')}>{label}</span>
                    <span className={has ? 'ck-yes' : 'ck-no'}>
                      <Icon name={has ? 'check' : 'minus'} size={18} strokeWidth={2.5} />
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
