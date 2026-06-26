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
    { label: 'Contact', href: 'mailto:info@alphabitssolutions.com' },
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
              <a href="https://www.linkedin.com/company/susea-ai/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.instagram.com/susea.ai" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="mailto:info@alphabitssolutions.com" aria-label="Email"><Icon name="mail" size={14} /></a>
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
