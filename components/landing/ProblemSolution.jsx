import Image from 'next/image'
import Icon from '@/components/ui/Icon'

export default function ProblemSolution() {
  const chaos = [
    ['📧 maersk_rates_q4.xlsx', 'r span2 tilt'], ['WhatsApp · CMA agent', 'y span2'], ['tariff_msc_oct.pdf', 't span2 tilt2'],
    ['Re: Updated GRI Nov 1st — pls quote', 'r span3'], ['india_uae_rates_FINAL_v6.xlsx', 't span3 tilt'],
    ['surcharge_baf.png', 'y span2'], ['portal: hapag.com', 'span2 t'], ['missed booking', 'span2 r tilt2'],
    ['scan_005.jpg', 'span2 t tilt'], ['Customer chasing quote · 4h', 'span3 y'], ['manual margin calc', 'span3 t tilt2'],
  ]
  const problems = [
    'Rates scattered across Excel sheets', 'Manual quotation workflows',
    'WhatsApp & email tariff dependency', 'Slow customer response times',
    'Complex surcharge calculations', 'Carrier pricing fragmentation',
    'Multiple disconnected portals', 'Rate validity tracking issues',
  ]
  return (
    <section className="sec" id="problem">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow orange"><span className="dot"></span> The pricing problem</span>
          <h2 className="h-section">Freight pricing is still run<br />on screenshots and spreadsheets.</h2>
          <p className="lead">Tariffs arrive over WhatsApp. Surcharges live in your inbox. Quotes get re-typed into Excel. Customers wait. Margins leak.</p>
        </div>
        <div className="split">
          <div className="panel-lg min">
            <span className="tag red">Before · The chaos</span>
            <h3 style={{ marginTop: 8 }}>Pricing fragmented across 9 places</h3>
            <p style={{ color: 'var(--ink-2)', fontSize: 14, margin: '6px 0 0', lineHeight: 1.5 }}>A typical FCL quote touches inboxes, chats, three Excel sheets and a printed tariff. Nothing reconciles.</p>
            <div className="chaos" aria-hidden="true">
              {chaos.map(([t, cls], i) => <div className={'ch ' + cls} key={i}>{t}</div>)}
            </div>
          </div>
          <div className="panel-lg min">
            <span className="tag blue">After · Susea command center</span>
            <h3 style={{ marginTop: 8 }}>One AI-powered pricing layer</h3>
            <p style={{ color: 'var(--ink-2)', fontSize: 14, margin: '6px 0 0', lineHeight: 1.5 }}>All tariffs ingested, all surcharges normalized, all carriers comparable, all quotes generated — automatically.</p>
            <div className="problems-list">
              {problems.map((p, i) => <div className="pr" key={i}><span className="x">✕</span>{p}</div>)}
            </div>
            <div className="sol-banner">
              <div className="badge">
                <Image src="/assets/susea-mark-black.png" alt="" width={30} height={30} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Susea consolidates 1 inbox + 6 tariffs + 14 carriers</div>
                <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 2 }}>…into a single live pricing surface your ops team actually trusts.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
