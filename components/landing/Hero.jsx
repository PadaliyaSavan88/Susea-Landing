"use client";
import Icon from "@/components/ui/Icon";

function FloatChip({ pos, ico, icon, title, sub }) {
  return (
    <div className={"float-chip " + pos}>
      <div className={"ico " + ico}>
        <Icon name={icon} size={16} />
      </div>
      <div>
        <div>{title}</div>
        <small>{sub}</small>
      </div>
    </div>
  );
}

function HeroDashboard() {
  const carriers = [
    {
      logo: "/assets/carriers/maersk.webp",
      n: "Maersk",
      price: "$1,420",
      t: "7d",
      best: true,
    },
    {
      logo: "/assets/carriers/hapag-lloyd.jpg",
      n: "Hapag-Lloyd",
      price: "$1,475",
      t: "8d",
      delta: "−$30",
      valid: "Nov 30",
    },
    {
      logo: "/assets/carriers/msc.webp",
      n: "MSC",
      price: "$1,510",
      t: "9d",
      delta: "+$45",
      down: true,
      valid: "Dec 04",
    },
    {
      logo: "/assets/carriers/cosco.webp",
      n: "Cosco",
      price: "$1,540",
      t: "10d",
      valid: "Dec 02",
    },
    {
      logo: "/assets/carriers/cma-cgm.webp",
      n: "CMA CGM",
      price: "$1,612",
      t: "8d",
      valid: "Nov 28",
    },
  ];
  return (
    <div className="hero-stage">
      <div className="hero-shell">
        <div className="hero-bar">
          <div className="dots">
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div className="urlbar">
            <span className="mono">susea.app/pricing/quote/SQ-48217</span>
          </div>
          <span className="pill live">
            <i></i> Live rates · 200 carriers
          </span>
        </div>
        <div className="hero-grid">
          <div className="panel">
            <h4>
              Rate search <span className="sub">FCL</span>
            </h4>
            <div className="search-row">
              <div className="field">
                <span className="flbl">Origin</span>
                <span className="val">Nhava Sheva</span>
                <span
                  className="mono"
                  style={{ fontSize: 11, color: "var(--ink-4)" }}
                >
                  INNSA
                </span>
              </div>
              <div className="swap">
                <Icon name="arrow-left-right" size={13} />
              </div>
              <div className="field">
                <span className="flbl">Destination</span>
                <span className="val">Jebel Ali</span>
                <span
                  className="mono"
                  style={{ fontSize: 11, color: "var(--ink-4)" }}
                >
                  AEJEA
                </span>
              </div>
            </div>
            <div className="search-row" style={{ marginTop: 8 }}>
              <div className="field">
                <span className="flbl">Container</span>
                <span className="val">40&apos; HC</span>
              </div>
              <div className="field">
                <span className="flbl">Cargo</span>
                <span className="val">General · 22T</span>
              </div>
            </div>
            <div className="ai-suggest">
              <div className="ico">AI</div>
              <div className="t">
                Re-routing via <b>Mundra → Jebel Ali</b> saves <b>$184</b> and 2
                days transit. Try alternate?
              </div>
            </div>
          </div>

          <div className="panel center">
            <h4>
              Carrier comparison <span className="pill blue">5 carriers</span>
            </h4>
            <div className="ctable">
              <div className="th">
                <div>Carrier</div>
                <div>All-in</div>
                <div>Transit</div>
                <div>Validity</div>
              </div>
              {carriers.map((c, i) => (
                <div className={"tr" + (c.best ? " best" : "")} key={i}>
                  <div className="carrier">
                    <img src={c.logo} alt={c.n} className="carrier-logo" />
                    {c.n}
                  </div>
                  <div className="mono num">
                    {c.price}{" "}
                    {c.delta && (
                      <span className={"delta" + (c.down ? " down" : "")}>
                        {c.delta}
                      </span>
                    )}
                  </div>
                  <div className="mono num">{c.t}</div>
                  <div>
                    {c.best ? (
                      <span className="pill blue">Best</span>
                    ) : (
                      <span
                        className="mono"
                        style={{ color: "var(--ink-3)", fontSize: 11 }}
                      >
                        {c.valid}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
                marginTop: 12,
                fontSize: 11,
                color: "var(--ink-4)",
              }}
            >
              <span className="mono">Updated 38s ago</span>
              <span className="mono">via 4 tariff sources</span>
            </div>
          </div>

          <div className="panel">
            <div className="quote-head">
              <h4>Quote draft</h4>
              <span className="pill orange">Auto-generated</span>
            </div>
            <div className="quote-id mono" style={{ marginTop: 4 }}>
              SQ-48217 · Acme Exports Pvt Ltd
            </div>
            <div style={{ marginTop: 12 }}>
              <div className="qline">
                <span>Ocean freight</span>
                <b className="mono">$1,420.00</b>
              </div>
              <div className="qline">
                <span>BAF</span>
                <b className="mono">$84.00</b>
              </div>
              <div className="qline">
                <span>THC origin</span>
                <b className="mono">$62.00</b>
              </div>
              <div className="qline">
                <span>THC destination</span>
                <b className="mono">$78.00</b>
              </div>
              <div className="qline">
                <span>Documentation</span>
                <b className="mono">$35.00</b>
              </div>
              <div className="qline">
                <span style={{ color: "var(--good-600)" }}>Margin (12%)</span>
                <b className="mono" style={{ color: "var(--good-600)" }}>
                  +$203.40
                </b>
              </div>
            </div>
            <div className="qtotal">
              <div>
                <div className="l">Total all-in</div>
                <div
                  className="mono"
                  style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 2 }}
                >
                  USD · valid 7 days
                </div>
              </div>
              <div className="v mono">
                <span>$</span>1,882
                <span style={{ fontSize: 18, color: "var(--ink-3)" }}>.40</span>
              </div>
            </div>
            <div className="qfoot">
              <button className="btn btn-orange">Send to customer</button>
              <button className="btn btn-ghost">Edit</button>
            </div>
          </div>
        </div>
      </div>

      <div className="floats">
        <FloatChip
          pos="f1"
          ico="blue"
          icon="zap"
          title="90% Faster Quotations"
          sub="Avg time: 18 min → 90s"
        />
        <FloatChip
          pos="f2"
          ico="amber"
          icon="file-scan"
          title="AI Tariff Extraction"
          sub="PDF · XLS · Email · WhatsApp"
        />
        <FloatChip
          pos="f3"
          ico="orange"
          icon="layers"
          title="Multi-Carrier Pricing"
          sub="200+ shipping lines aggregated"
        />
        <FloatChip
          pos="f4"
          ico="good"
          icon="radio"
          title="Live Rate Visibility"
          sub="Updated every 60s"
        />
      </div>
    </div>
  );
}

export default function Hero({ onRequest, onTour }) {
  return (
    <header className="hero" id="top">
      <div className="grid-bg"></div>
      <div className="container">
        <div className="hero-top">
          <span className="eyebrow">
            <span className="dot"></span> AI Pricing &amp; Procurement
            Infrastructure · Now in private beta
          </span>
          <h1 className="h-display">
            Get an <em>instant</em> rate — or make
            <br />
            your agents <em>compete</em> for it.
          </h1>
          <p className="lead">
            Susea is the pricing &amp; quotation operating system for freight
            forwarders. Get instant spot rates across carriers — or run a live
            RFQ to your own agents. Quote customers and award tenders in one
            platform.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary btn-lg" onClick={onRequest}>
              Join the waitlist <Icon name="arrow-right" size={15} />
            </button>
            <a
              className="btn btn-ghost btn-lg"
              href="#two-ways"
              onClick={onTour}
            >
              <Icon name="play" size={14} /> See both ways to price
            </a>
          </div>
          <div className="hero-trust">
            <span>Built for FCL · LCL · NVOCC</span>
            <span className="sep"></span>
            <span>Spot rates &amp; live RFQ auctions</span>
            <span className="sep"></span>
            <span>Designed with 40+ forwarders</span>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hs">
            <div className="hsv mono">
              90<span className="u">%</span>
            </div>
            <div className="hsl">Faster quotations</div>
          </div>
          <div className="hs">
            <div className="hsv mono">
              200<span className="u">+</span>
            </div>
            <div className="hsl">Carriers compared</div>
          </div>
          <div className="hs">
            <div className="hsv mono">
              <span className="pre">up to </span>60<span className="u">%</span>
            </div>
            <div className="hsl">Lower freight cost via RFQ</div>
          </div>
          <div className="hs">
            <div className="hsv mono">
              1–3<span className="u">d</span>
            </div>
            <div className="hsl">From tender to award</div>
          </div>
        </div>
        <HeroDashboard />
      </div>
    </header>
  );
}
