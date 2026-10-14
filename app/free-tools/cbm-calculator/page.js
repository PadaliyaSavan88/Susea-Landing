import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";
import CbmCalculator from "@/components/free-tools/CbmCalculator";

const URL = "https://susea.ai/free-tools/cbm-calculator";

export const metadata = {
  title: "Free CBM Calculator: Cargo volume, FCL & LCL container calculator | Susea",
  description:
    "Free CBM calculator for freight. Enter cargo dimensions, weight and quantity to get total cubic metres, chargeable W/M for LCL and a container recommendation for FCL.",
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Susea",
    url: URL,
    title: "Free CBM & Cargo Calculator | Susea",
    description: "Calculate CBM, chargeable weight and container requirements. Free, no sign-up.",
  },
  twitter: { card: "summary" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Susea CBM & Cargo Calculator",
  url: URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "Susea", url: "https://susea.ai" },
};

export default function CbmCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Nav />
      <CbmCalculator />
      <Footer />
    </>
  );
}
