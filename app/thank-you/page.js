import Image from "next/image";
import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "You're on the list | Susea",
  description:
    "You've joined the Susea private beta waitlist. We'll reach out as soon as your spot opens up.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="ty-page">
      <Nav />
      <main>
        <section className="ty-hero">
          <div className="container">
            <div className="ty-content">
              <Image
                src="/assets/susea-mark-black.png"
                alt="Susea"
                width={40}
                height={40}
              />
              <span className="eyebrow">
                <span className="dot"></span> Private beta · Cohort access
              </span>
              <h1 className="h-display">
                We appreciate your interest in Susea! You have been added to our
                list.
              </h1>
              <p className="lead">
                We&apos;re onboarding freight forwarders in cohorts. We&apos;ll
                reach out as soon as your spot opens up — keep an eye on your
                inbox.
              </p>
              <a href="/" className="btn btn-ghost btn-lg">
                ← Back to homepage
              </a>
              <div className="wl-stats">
                <div>
                  <div className="num">2.4M+</div>
                  <div className="cap">Quotes modeled</div>
                </div>
                <div className="vr"></div>
                <div>
                  <div className="num">200+</div>
                  <div className="cap">Shipping lines</div>
                </div>
                <div className="vr"></div>
                <div>
                  <div className="num">38</div>
                  <div className="cap">Trade lanes</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
