import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";
import HsnChecker from "@/components/free-tools/HsnChecker";

const URL = "https://susea.ai/free-tools/hsn-code-checker";

export const metadata = {
  title: "Free HSN Code Checker: Search HS codes by product or code | Susea",
  description:
    "Free HSN code checker for importers, exporters and freight forwarders. Search HS codes by product description or code and see the section, chapter, heading and subheading.",
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Susea",
    url: URL,
    title: "Free HSN Code Checker | Susea",
    description: "Search HS/HSN classifications by product or code. Free, no sign-up.",
  },
  twitter: { card: "summary" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Susea HSN Code Checker",
  url: URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "Susea", url: "https://susea.ai" },
};

export default function HsnCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Nav />
      <HsnChecker />
      <Footer />
    </>
  );
}
