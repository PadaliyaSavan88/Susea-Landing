import Image from 'next/image'
import Icon from '@/components/ui/Icon'

const COLS = [
  ['Platform', ['Pricing intelligence', 'Quotation engine', 'Tariff AI', 'Carrier comparison']],
  ['Solutions', ['Freight forwarders', 'NVOCCs', 'Customs brokers', 'Enterprise shippers']],
  ['Company', ['About', 'Careers', 'Contact', 'Security']],
]

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div>
            <div className="logo">
              <Image src="/assets/susea-mark-black.png" alt="Susea" width={26} height={26} />
              <span>Susea</span>
            </div>
            <p className="foot-tag">Built for the future of global freight operations. The AI pricing layer for ocean freight forwarders.</p>
            <div className="soc">
              <a href="#" aria-label="LinkedIn"><Icon name="linkedin" size={14} /></a>
              <a href="mailto:hello@susea.app" aria-label="Email"><Icon name="mail" size={14} /></a>
              <a href="#" aria-label="X"><Icon name="twitter" size={14} /></a>
            </div>
          </div>
          {COLS.map(([h, items], i) => (
            <div key={i}>
              <h6>{h}</h6>
              <ul>{items.map((it, j) => <li key={j}><a href="#">{it}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <div>© 2026 Susea Technologies, Inc. All rights reserved.</div>
          <div className="mono">v0.7.2 · build 48217</div>
        </div>
      </div>
    </footer>
  )
}
