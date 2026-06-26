'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Nav({ onRequest }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const h = (id) => isHome ? `#${id}` : `/#${id}`

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a className="logo" href={isHome ? '#top' : '/'}>
          <Image src="/assets/susea-mark-black.png" alt="Susea" width={26} height={26} />
          <span>Susea</span>
        </a>
        <div className="nav-links">
          <a href={h('two-ways')}>Overview</a>
          <a href={h('pricing-intel')}>Spot pricing</a>
          <a href={h('rfq')}>RFQ auction</a>
          <a href={h('features')}>Features</a>
          <a href={h('why')}>Why Susea</a>
        </div>
        <div className="nav-cta">
          <a className="btn btn-ghost" href="/signin">Sign in</a>
          <button className="btn btn-primary" onClick={onRequest}>Request access</button>
        </div>
      </div>
    </nav>
  )
}
