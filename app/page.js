"use client";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Carriers from "@/components/landing/Carriers";
import ProblemSolution from "@/components/landing/ProblemSolution";
// import Solution from '@/components/landing/Solution'
import TwoWaysToPrice from "@/components/landing/TwoWaysToPrice";
// import PricingTerminal from '@/components/landing/PricingTerminal'
import TestimonialsSlider from "@/components/landing/TestimonialsSlider";
import RFQSteps from "@/components/landing/RFQSteps";
import RFQAuction from "@/components/landing/RFQAuction";
import Features from "@/components/landing/Features";
import WhySusea from "@/components/landing/WhySusea";
import Waitlist from "@/components/landing/Waitlist";
import Footer from "@/components/landing/Footer";

function jumpTo(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: "smooth" });
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
      <Carriers />
      <ProblemSolution />
      {/* <Solution /> */}
      <TwoWaysToPrice
        onSpot={() => jumpTo("pricing-intel")}
        onRfq={() => jumpTo("rfq")}
      />
      {/* <PricingTerminal /> */}
      <TestimonialsSlider />
      <RFQSteps />
      <RFQAuction />
      <Features />
      <WhySusea />
      <Waitlist />
      <Footer />
    </>
  );
}
