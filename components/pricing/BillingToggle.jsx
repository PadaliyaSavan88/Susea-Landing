'use client'

export default function BillingToggle({ annual, onChange }) {
  return (
    <div className="billing-toggle" role="tablist" aria-label="Billing period">
      <span className={'billing-pill' + (annual ? ' annual' : '')} aria-hidden="true" />
      <button
        type="button"
        role="tab"
        aria-selected={!annual}
        className={'billing-opt' + (annual ? '' : ' active')}
        onClick={() => onChange(false)}
      >
        Monthly
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={annual}
        className={'billing-opt' + (annual ? ' active' : '')}
        onClick={() => onChange(true)}
      >
        Annually <span className="save">(Save 15%)</span>
      </button>
    </div>
  )
}
