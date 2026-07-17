import Icon from '@/components/ui/Icon'

export default function TrustBar() {
  return (
    <div className="trust-bar">
      <span className="trust-item"><Icon name="shield-check" size={16} /> No credit card required</span>
      <span className="trust-item"><Icon name="credit-card" size={16} /> Cancel anytime</span>
    </div>
  )
}
