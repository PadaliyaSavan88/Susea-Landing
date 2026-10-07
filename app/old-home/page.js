"use client";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import PricingDashboard from "@/components/landing/PricingDashboard";
import Carriers from "@/components/landing/Carriers";
import ProblemSolution from "@/components/landing/ProblemSolution";
import TwoWaysToPrice from "@/components/landing/TwoWaysToPrice";
import Automations from "@/components/landing/Automations";
import TestimonialsSlider from "@/components/landing/TestimonialsSlider";
import Features from "@/components/landing/Features";
import WhySusea from "@/components/landing/WhySusea";
import Waitlist from "@/components/landing/Waitlist";
import Footer from "@/components/landing/Footer";
import { smoothScrollToId } from "@/lib/scroll";

function jumpTo(id) {
  smoothScrollToId(id);
}

function CtaBridge({ onRequest }) {
  return (
    <section style={{ padding: "22px 0 8px" }}>
      <div className="container">
        <div
          style={{
            border: "1px solid var(--line)",
            background: "var(--paper-2)",
            borderRadius: 14,
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "var(--ink)",
              letterSpacing: "-.005em",
            }}
          >
            Ready to stop chasing rates and requests?
          </div>
          <button
            onClick={onRequest}
            className="btn btn-primary"
            style={{ whiteSpace: "nowrap" }}
          >
            Join the waitlist
          </button>
        </div>
      </div>
    </section>
  );
}

function CtaMidpage({ onRequest }) {
  return (
    <section
      style={{
        padding: "60px 0",
        background: "linear-gradient(180deg,#fdf0e6 0%,#fff8f0 100%)",
        borderBottom: "1px solid var(--line-soft)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 14,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              padding: "6px 14px",
              border: "1px solid var(--orange-100)",
              borderRadius: 999,
              background: "#fff",
              color: "var(--orange-700)",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "var(--orange-500)",
                boxShadow: "0 0 0 3px var(--orange-100)",
                display: "inline-block",
              }}
            ></span>
            Beta cohort 02 · Onboarding now
          </span>
          <h2
            className="h-section"
            style={{ maxWidth: 820, margin: 0 }}
          >
            See what nothing-waits-for-a-human looks like on your desks.
          </h2>
          <p
            style={{
              margin: 0,
              color: "var(--ink-2)",
              fontSize: 16.5,
              lineHeight: 1.55,
              maxWidth: 600,
            }}
          >
            Join the beta cohort. Onboarding starts small, one lane at a time,
            with our team in the loop.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            <button
              onClick={onRequest}
              className="btn btn-orange btn-lg"
            >
              Request access
            </button>
            <a
              href="mailto:info@alphabitssolutions.com?subject=Susea%20demo%20request"
              className="btn btn-ghost btn-lg"
            >
              Book a 20-min demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


export default function Home() {
  return (
    <>
      <Nav onRequest={() => jumpTo("waitlist")} />
      <Hero
        onRequest={() => jumpTo("waitlist")}
        onTour={(e) => {
          e?.preventDefault();
          jumpTo("two-ways");
        }}
      />
      <PricingDashboard />
      <Carriers />
      <ProblemSolution />
      <CtaBridge onRequest={() => jumpTo("waitlist")} />
      <TwoWaysToPrice
        onSpot={() => jumpTo("pricing-intel")}
        onRfq={() => jumpTo("rfq")}
      />
      <Automations />
      <CtaMidpage onRequest={() => jumpTo("waitlist")} />
      <TestimonialsSlider />
      <Features />
      <WhySusea />
      <Waitlist />
      <Footer />
    </>
  );
}
