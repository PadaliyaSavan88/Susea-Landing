import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";
import FreeToolsHub from "@/components/free-tools/FreeToolsHub";

const URL = "https://susea.ai/free-tools";
const TITLE = "Free Logistics Tools for Shipping & Trade | Susea";

export const metadata = {
  title: TITLE,
  description:
    "Free CBM calculator and HSN code checker for importers, exporters and freight forwarders. Calculate cargo volume and container fit, and look up HS and India 8-digit codes.",
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Susea",
    url: URL,
    title: TITLE,
    description: "Calculate cargo volume and find HSN codes with Susea's free tools. No account needed.",
  },
  twitter: { card: "summary" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Free logistics tools for shipping and trade",
  url: URL,
  publisher: { "@type": "Organization", name: "Susea", url: "https://susea.ai" },
  hasPart: [
    { "@type": "WebApplication", name: "CBM & Cargo Calculator", url: "https://susea.ai/free-tools/cbm-calculator", applicationCategory: "BusinessApplication", operatingSystem: "Any", isAccessibleForFree: true },
    { "@type": "WebApplication", name: "HSN Code Checker", url: "https://susea.ai/free-tools/hsn-code-checker", applicationCategory: "BusinessApplication", operatingSystem: "Any", isAccessibleForFree: true },
  ],
};

export default function FreeToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Nav />
      <FreeToolsHub />
      <Footer />
    </>
  );
}
