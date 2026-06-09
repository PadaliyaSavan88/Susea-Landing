'use client'
import Image from 'next/image'

export default function Nav({ onRequest }) {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a className="logo" href="#top">
          <Image src="/assets/susea-mark-black.png" alt="Susea" width={26} height={26} />
          <span>Susea</span>
        </a>
        <div className="nav-links">
          <a href="#two-ways">Overview</a>
          <a href="#pricing-intel">Spot pricing</a>
          <a href="#rfq">RFQ auction</a>
          <a href="#features">Features</a>
          <a href="#why">Why Susea</a>
        </div>
        <div className="nav-cta">
          <a className="btn btn-ghost" href="#">Sign in</a>
          <button className="btn btn-primary" onClick={onRequest}>Request access</button>
        </div>
      </div>
    </nav>
  )
}
