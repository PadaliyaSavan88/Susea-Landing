import Image from 'next/image'
import Link from 'next/link'
import Icon from '@/components/ui/Icon'

const COLS = [
  ['Platform', [
    { label: 'Pricing intelligence', href: '#' },
    { label: 'Quotation engine', href: '#' },
    { label: 'Tariff AI', href: '#' },
    { label: 'Carrier comparison', href: '#' },
  ]],
  ['Resources', [
    { label: 'Blog', href: '/blog' },
    { label: 'Freight surcharges explained', href: '/blog/ocean-freight-surcharges-explained' },
    { label: 'FCL vs LCL guide', href: '/blog/fcl-vs-lcl' },
    { label: 'AI in freight pricing', href: '/blog/ai-ocean-freight-pricing' },
  ]],
  ['Company', [
    { label: 'About', href: '#' },
    { label: 'Contact', href: 'mailto:hello@susea.app' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
  ]],
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
              <ul>{items.map((it, j) => (
                <li key={j}>
                  <Link href={it.href}>{it.label}</Link>
                </li>
              ))}</ul>
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <div>© 2026 AlphaBits Solutions. All rights reserved.</div>
          <div className="foot-legal-links">
            <Link href="/privacy">Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
