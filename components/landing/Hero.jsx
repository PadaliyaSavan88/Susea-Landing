"use client";
import Icon from "@/components/ui/Icon";

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
            Price it. Win it. <em>Never chase it.</em>
          </h1>
          <p className="lead">
            Susea is the pricing &amp; procurement operating system for freight
            forwarders: instant spot rates, live agent auctions, and an AI
            layer that drafts, follows up and chases so nothing waits on someone
            to remember it. You approve everything; nothing sends on its own.
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
      </div>
    </header>
  );
}
