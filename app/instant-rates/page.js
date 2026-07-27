"use client";
import Nav from "@/components/landing/Nav";
import Carriers from "@/components/landing/Carriers";
import Icon from "@/components/ui/Icon";
import PricingDashboard from "@/components/landing/PricingDashboard";
import TestimonialsSlider from "@/components/landing/TestimonialsSlider";
import Footer from "@/components/landing/Footer";
import Waitlist from "@/components/landing/Waitlist";

function jumpTo(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: "smooth" });
}

const QUOTE_STATS = [
  { v: "90%", l: "Faster quotation creation" },
  { v: "200+", l: "Carriers compared on every search" },
  { v: "<90s", l: "From search to sent quote" },
];

const STEPS = [
  { n: "1", title: "Search", desc: "Enter origin, destination, container type and cargo. Susea checks 200+ carriers at once, no separate portals." },
  { n: "2", title: "Compare", desc: "See all-in cost, transit time and validity side by side, with AI flagging a cheaper or faster routing where one exists." },
  { n: "3", title: "Quote", desc: "Susea builds the full landed cost automatically — ocean freight, BAF, THC, documentation, your margin — no manual calculation." },
  { n: "4", title: "Send", desc: "Push a branded quote straight to the customer over WhatsApp or email, with one-tap acceptance." },
  { n: "5", title: "Follow up, automatically", desc: "If the quote goes quiet or is about to expire, Susea drafts the nudge or the re-price for your approval — you never have to remember it." },
];

const FEATURES = [
  { icon: "file-scan", title: "AI Tariff Extraction", desc: "Drop any PDF, XLS, or forwarded WhatsApp rate sheet. Susea reads it like a pricing analyst." },
  { icon: "layout-grid", title: "Multi-Carrier Pricing", desc: "200+ shipping lines, normalized into one comparable view." },
  { icon: "refresh-cw", title: "Live Rate Visibility", desc: "Rates refresh every 60 seconds — never quote off a stale sheet." },
  { icon: "clock", title: "Quotes that don't need re-checking", desc: "Once sent, Susea watches the clock — flagging expiring quotes and drafting the re-price before the customer has to ask." },
];

export default function InstantRatesPage() {
  return (
    <>
      <Nav onRequest={() => jumpTo("waitlist")} />

      {/* HERO */}
      <header
        style={{
          position: "relative",
          padding: "60px 0 40px",
          overflow: "hidden",
          background:
            "radial-gradient(900px 480px at 18% -6%, #eef4fd, transparent 62%), radial-gradient(720px 420px at 92% 4%, #fdf0e6, transparent 60%), linear-gradient(180deg, #eff5fe, #fff 70%)",
        }}
      >
        <div className="container">
          <div id="rates" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 22 }}>
            <span className="eyebrow">
              <span className="dot"></span> Spot pricing · Instant rates
            </span>
            <h1
              style={{
                margin: 0,
                maxWidth: 820,
                fontSize: "clamp(32px,3.8vw,56px)",
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
                fontWeight: 600,
                textWrap: "pretty",
              }}
            >
              A rate in 90 seconds.{" "}
              <br />
              Not 90 minutes.
            </h1>
            <p className="lead" style={{ textAlign: "center", margin: "0 auto" }}>
              Compare live rates across 200+ carriers and send a branded,
              customer-ready quote before your competitor has finished checking
              their inbox.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <a href="/#waitlist" className="btn btn-primary btn-lg">
                Join the waitlist
              </a>
              <a href="#rates" className="btn btn-ghost btn-lg">
                See how it works
              </a>
            </div>

            {/* Stats bar */}
            <div
              style={{
                display: "flex",
                margin: "14px auto 0",
                maxWidth: 760,
                border: "1px solid #e3e9f2",
                borderRadius: 16,
                background: "#fff",
                boxShadow: "0 4px 12px -2px rgba(14,23,38,.08),0 2px 6px -2px rgba(14,23,38,.05)",
                overflow: "hidden",
                width: "100%",
              }}
            >
              {QUOTE_STATS.map((s, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    padding: 20,
                    textAlign: "center",
                    borderLeft: i > 0 ? "1px solid #e3e9f2" : "none",
                  }}
                >
                  <div className="mono" style={{ fontWeight: 700, fontSize: 28, color: "#0e1726", letterSpacing: "-.02em", lineHeight: 1 }}>
                    {s.v}
                  </div>
                  <div style={{ fontSize: 12.5, color: "#6b7c96", marginTop: 8, fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <PricingDashboard />
        </div>
      </header>

      {/* PROBLEM */}
      <section className="sec">
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <span className="eyebrow orange"><span className="dot"></span> Why this exists</span>
          <h2 className="h-section" style={{ margin: 0 }}>
            A customer messages you.{" "}
            <br />
            The clock starts.
          </h2>
          <p className="lead" style={{ textAlign: "center" }}>
            By the time you&rsquo;ve checked three tariff sheets, called an
            agent to confirm a surcharge, and typed the numbers into Excel, your
            customer has already asked someone else. Speed isn&rsquo;t a
            nice-to-have in spot pricing — it&rsquo;s the whole pitch.
          </p>
        </div>
      </section>

      {/* STEPS */}
      <section className="sec" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow"><span className="dot"></span> How it works</span>
            <h2 className="h-section" style={{ margin: 0 }}>
              Search → compare → quote → send,{" "}
              <br />
              in one screen.
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5,1fr)",
              gap: 14,
            }}
            className="steps-grid"
          >
            {STEPS.map((st) => (
              <div
                key={st.n}
                style={{
                  position: "relative",
                  border: "1px solid var(--line)",
                  background: "#fff",
                  borderRadius: 14,
                  padding: "20px 18px",
                  boxShadow: "var(--shadow-xs)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                  minHeight: 190,
                }}
              >
                <div
                  className="mono"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 9,
                    background: "var(--blue-50)",
                    color: "var(--blue-700)",
                    fontWeight: 700,
                    fontSize: 13,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {st.n}
                </div>
                <h4 style={{ margin: "2px 0 0", fontSize: 14.5, fontWeight: 600, color: "var(--ink)", letterSpacing: "-.01em", lineHeight: 1.25 }}>
                  {st.title}
                </h4>
                <p style={{ margin: 0, fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.45 }}>{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARRIERS */}
      <Carriers />

      {/* FEATURE HIGHLIGHTS */}
      <section className="sec">
        <div className="container">
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}
            className="feat-highlights"
          >
            {FEATURES.map((f) => (
              <div
                key={f.title}
                style={{
                  border: "1px solid var(--line)",
                  background: "#fff",
                  borderRadius: 16,
                  padding: 22,
                  minHeight: 170,
                  boxShadow: "var(--shadow-xs)",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 11,
                    border: "1px solid var(--line)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--blue-50)",
                    color: "var(--blue-600)",
                    marginBottom: 16,
                  }}
                >
                  <Icon name={f.icon} size={20} />
                </div>
                <h4 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 600, color: "var(--ink)", letterSpacing: "-.01em" }}>
                  {f.title}
                </h4>
                <p style={{ margin: 0, fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSlider />

      <Waitlist />
      <Footer />
    </>
  );
}
