'use client'
import { useState, useMemo, useRef, useEffect } from 'react'
import Icon from '@/components/ui/Icon'

const AGENTS_INIT = [
  { code: 'MC', name: 'Meridian Cargo', bid: 1492, transit: 8, onTime: 94 },
  { code: 'BW', name: 'BlueWave Shipping', bid: 1468, transit: 7, onTime: 98 },
  { code: 'TL', name: 'Trident Logistics', bid: 1455, transit: 9, onTime: 91 },
  { code: 'CF', name: 'Continental Freight', bid: 1510, transit: 8, onTime: 96 },
  { code: 'AX', name: 'Apex Forwarders', bid: 1430, transit: 8, onTime: 93 },
  { code: 'HC', name: 'Harbor & Co', bid: 1524, transit: 10, onTime: 89 },
]
const ROW_STEP = 64
const AUCTION_MODES = [
  { id: 'sealed', label: 'Sealed bid', icon: 'eye-off', short: 'Vendors see nothing until the RFQ closes.' },
  { id: 'rank', label: 'Rank-only', icon: 'list-ordered', short: 'Vendors see only their own rank — never prices.', rec: true },
  { id: 'best', label: 'Best price', icon: 'badge-dollar-sign', short: 'Vendors see the lowest price, not who quoted it.' },
  { id: 'open', label: 'Open auction', icon: 'eye', short: 'Everyone sees all prices and rankings.' },
]

function fmtTime(s) {
  const m = Math.floor(s / 60), ss = s % 60
  return m + ':' + String(ss).padStart(2, '0')
}

export default function RFQAuction({ tickMs = 1150 }) {
  const reduceMotion = useRef(typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  const [agents, setAgents] = useState(AGENTS_INIT)
  const [feed, setFeed] = useState([])
  const [time, setTime] = useState(270)
  const [status, setStatus] = useState('idle')
  const [moves, setMoves] = useState({})
  const [mode, setMode] = useState('rank')
  const timer = useRef(null)
  const ticks = useRef(0)
  const sectionRef = useRef(null)
  const timeRef = useRef(270)

  const ranked = useMemo(() => [...agents].sort((a, b) => a.bid - b.bid), [agents])
  const rankOf = useMemo(() => { const m = {}; ranked.forEach((a, i) => (m[a.code] = i)); return m }, [ranked])
  const leader = ranked[0]
  const rec = useMemo(() => {
    const top = ranked.slice(0, 3)
    return [...top].sort((a, b) => (a.bid - a.onTime * 6) - (b.bid - b.onTime * 6))[0]
  }, [ranked])

  const ME = 'BW'
  const meAgent = agents.find(a => a.code === ME)
  const meRank = rankOf[ME] + 1
  const modeCfg = AUCTION_MODES.find(m => m.id === mode)

  const stop = () => { clearInterval(timer.current); timer.current = null }

  const runTick = () => {
    ticks.current += 1
    timeRef.current = Math.max(0, timeRef.current - 11)
    setTime(timeRef.current)
    setAgents(prev => {
      const sorted = [...prev].sort((a, b) => a.bid - b.bid)
      const pool = sorted.slice(1)
      const pick = pool[Math.floor(Math.random() * Math.min(4, pool.length))]
      const drop = 8 + Math.floor(Math.random() * 5) * 7
      const newBid = pick.bid - drop
      const willLead = newBid < sorted[0].bid
      setMoves(m => ({ ...m, [pick.code]: -drop }))
      setFeed(f => [{ id: Math.random(), name: pick.name, bid: newBid, delta: -drop, lead: willLead, t: fmtTime(timeRef.current) }, ...f].slice(0, 6))
      return prev.map(a => a.code === pick.code ? { ...a, bid: newBid } : a)
    })
    if (ticks.current >= 11) { stop(); setStatus('closed') }
  }

  const start = () => {
    if (status === 'running') return
    if (status === 'closed') {
      setAgents(AGENTS_INIT); setFeed([]); setMoves({}); setTime(270); timeRef.current = 270; ticks.current = 0
    }
    setStatus('running')
    if (reduceMotion.current) {
      let a = AGENTS_INIT.map(x => ({ ...x }))
      for (let i = 0; i < 11; i++) { const p = a.sort((x, y) => x.bid - y.bid)[1 + (i % 3)]; p.bid -= 18 }
      setAgents(a); setStatus('closed'); setTime(0); return
    }
    timer.current = setInterval(runTick, tickMs)
  }

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && status === 'idle') { start(); io.disconnect() }
    }, { threshold: 0.35 })
    if (sectionRef.current) io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])
  useEffect(() => () => stop(), [])

  return (
    <section className="sec" id="rfq" ref={sectionRef}>
      <div className="container">
        <div className="sec-head left">
          <span className="eyebrow orange"><span className="dot"></span> Live reverse auction</span>
          <h2 className="h-section">Make your agents <em>compete</em> <br />for every shipment.</h2>
          <p className="lead">Invite your own forwarder and agent network to one live auction. Choose how much they see — sealed, rank-only, best-price or fully open. They bid down to win, and most of the negotiation is over before you step in.</p>
        </div>

        <div className="auc-shell">
          <div className="auc-top">
            <div className="auc-id">
              <span className="rfqno">RFQ-2207</span>
              <span className="lane">Nhava Sheva → Jebel Ali · 40&apos; HC × 120</span>
              <span className="pill blue">8 agents invited</span>
            </div>
            <span className={'countdown' + (status === 'closed' ? ' closed' : '')}>
              {status !== 'closed' && <span className="lvdot"></span>}
              {status === 'closed' ? 'Auction closed' : fmtTime(time) + ' left'}
            </span>
          </div>

          <div className="auc-modes">
            <span className="ml">Bidder visibility</span>
            <div className="seg">
              {AUCTION_MODES.map(m => (
                <button key={m.id} className={(mode === m.id ? 'on' : '') + (m.rec ? ' rec' : '')} onClick={() => setMode(m.id)}>
                  <Icon name={m.icon} size={13} /> {m.label}
                </button>
              ))}
            </div>
            <span className="rechint">{modeCfg.short}{modeCfg.rec && <b>· recommended</b>}</span>
          </div>

          <div className="auc-body">
            <div className="auc-left">
              <div className="lb-meta">
                <span style={{ color: 'var(--ink-3)' }}><Icon name="eye" size={12} /> <b style={{ color: 'var(--ink)' }}>Buyer view</b> · full visibility</span>
                <span>Round · <b>{Math.min(3, 1 + Math.floor(ticks.current / 4))} of 3</b></span>
                <span>Lowest bid · <b>${leader.bid.toLocaleString()}</b></span>
                <span>Spread · <b>${(ranked[ranked.length - 1].bid - leader.bid).toLocaleString()}</b></span>
              </div>

              <div className="lb" style={{ position: 'relative', height: agents.length * ROW_STEP - 8 }}>
                {agents.map(a => {
                  const r = rankOf[a.code]
                  const mv = moves[a.code]
                  const isLead = r === 0
                  return (
                    <div key={a.code} className={'lb-row' + (isLead ? ' lead' : '')}
                      style={{ position: 'absolute', left: 0, right: 0, top: 0, transform: `translateY(${r * ROW_STEP}px)`, height: 56 }}>
                      <div className="lb-rank">{r + 1}</div>
                      <div className="lb-agent"><span className="av">{a.code}</span><span className="nm">{a.name}</span></div>
                      <div className="lb-bid">${a.bid.toLocaleString()} <span className="cur">USD</span></div>
                      <div className="lb-transit">{a.transit}d · {a.onTime}%</div>
                      <div className={'lb-move ' + (isLead && status === 'closed' ? 'win' : mv ? 'dn' : 'hold')}>
                        {isLead && status === 'closed' ? <><Icon name="check" size={12} /> won</>
                          : mv ? <><Icon name="arrow-down" size={11} /> ${Math.abs(mv)}</>
                            : '—'}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="auc-controls">
                {status === 'running'
                  ? <button className="btn btn-ghost" disabled style={{ opacity: .7 }}><span className="lvdot" style={{ background: 'var(--orange-500)' }}></span> Auction live…</button>
                  : <button className="btn btn-orange" onClick={start}><Icon name={status === 'closed' ? 'rotate-ccw' : 'play'} size={14} /> {status === 'closed' ? 'Replay auction' : 'Run auction'}</button>}
                <span className="auc-note"><Icon name="lock" size={13} /> Agents see only their own rank — never competitors&apos; prices.</span>
              </div>
            </div>

            <div className="auc-right">
              <div className="agent-view">
                <h5><Icon name="user-round" size={13} /> Agent&apos;s view · BlueWave Shipping</h5>
                <div className="av-screen">
                  {mode === 'sealed' && (
                    <div className="av-locked">
                      <div className="lk"><Icon name="lock" size={18} /></div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Bid sealed</div>
                      <div className="av-rank" style={{ marginTop: 2 }}><div className="sub">Results reveal when the auction closes</div></div>
                      <div className="av-mine"><span>Your bid</span><b>${meAgent.bid.toLocaleString()}</b></div>
                    </div>
                  )}
                  {mode === 'rank' && (
                    <>
                      <div className="av-rank">
                        <div className="big">#<span>{meRank}</span> <span style={{ color: 'var(--ink-4)', fontSize: 18 }}>/ 8</span></div>
                        <div className="sub">{meRank === 1 ? "You're leading — hold or defend" : 'Lower your bid to climb the ranking'}</div>
                      </div>
                      <div className="av-mine"><span>Your bid</span><b>${meAgent.bid.toLocaleString()}</b></div>
                    </>
                  )}
                  {mode === 'best' && (
                    <>
                      <div className="av-best">
                        <div className="sub" style={{ marginBottom: 4 }}>Lowest bid so far</div>
                        <div className="big" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 30, color: 'var(--ink)', letterSpacing: '-.02em' }}>${leader.bid.toLocaleString()}</div>
                        <div className="sub" style={{ marginTop: 2 }}>Quoted by — hidden</div>
                      </div>
                      <div className="av-mine"><span>Your bid · rank #{meRank}</span><b>${meAgent.bid.toLocaleString()}</b></div>
                    </>
                  )}
                  {mode === 'open' && (
                    <div className="av-mini">
                      {ranked.slice(0, 5).map((a, i) => (
                        <div className={'r' + (a.code === ME ? ' me' : '')} key={a.code}>
                          <span>{i + 1}. {a.code === ME ? 'You' : a.name}</span><span>${a.bid.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="auc-rec">
                <h5><Icon name="sparkles" size={13} /> AI award recommendation</h5>
                <p>Award <b>{rec.name}</b> — {rankOf[rec.code] === 0 ? 'lowest bid' : `$${(rec.bid - leader.bid).toLocaleString()} above lead`} but best service blend: <b>{rec.onTime}% on-time</b>, <b>{rec.transit}-day</b> transit. {status === 'closed' ? 'Ready to route for approval.' : 'Updating as bids land…'}</p>
                <div className="rec-foot">
                  <button className="btn btn-primary" disabled={status !== 'closed'} style={{ height: 32, fontSize: 12, padding: '0 12px', opacity: status === 'closed' ? 1 : .55 }}>Award &amp; approve</button>
                  <button className="btn btn-ghost" style={{ height: 32, fontSize: 12, padding: '0 12px' }}>Split award</button>
                </div>
              </div>

              <div className="feed-card">
                <h5>Live activity</h5>
                <div className="feed">
                  {feed.length === 0 && <div className="feed-item" style={{ color: 'var(--ink-4)' }}><span className="fdot" style={{ background: 'var(--ink-4)' }}></span> Waiting for first bids…</div>}
                  {feed.map(f => (
                    <div className="feed-item" key={f.id}>
                      <span className="fdot" style={{ background: f.lead ? 'var(--orange-500)' : 'var(--good-500)' }}></span>
                      <span><b>{f.name}</b> {f.lead ? 'took the lead at ' : 'lowered to '}<span className="fmono">${f.bid.toLocaleString()}</span></span>
                      <time>{f.t}</time>
                    </div>
                  ))}
                </div>
              </div>

              <div className="auc-side">
                <h5>Approval matrix</h5>
                <div className="mtx">
                  <div className="mtx-step done"><span className="dot"><Icon name="check" size={10} /></span><span>Auction completed</span></div>
                  <div className={'mtx-step ' + (status === 'closed' ? 'active' : '')}><span className="dot">2</span><span>Pricing lead review</span></div>
                  <div className="mtx-step"><span className="dot">3</span><span>Finance sign-off · &gt; $150k</span></div>
                  <div className="mtx-step"><span className="dot">4</span><span>Contract issued · audit-logged</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
