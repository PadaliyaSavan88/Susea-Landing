import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";
import FaqSection from "@/components/landing/FaqSection";
import HsnChecker from "@/components/free-tools/HsnChecker";

const FAQS = [
  { q: "What is an HSN code?", a: "HSN (Harmonized System of Nomenclature) is the international system for classifying traded goods. Customs authorities worldwide use it to identify products, apply duties and compile trade statistics." },
  { q: "How many digits is an HSN code in India?", a: "India uses 8-digit HSN codes. The first six digits are the global HS code shared by every country; India adds two more digits for its own customs and GST classification." },
  { q: "What is the difference between an HS code and an HSN code?", a: "They are the same system. 'HS code' usually refers to the 6-digit international code; 'HSN code' is the term commonly used in India, often at 8 digits." },
  { q: "How do I find the HSN code for my product?", a: "Type a plain description focused on the material and use of the product into the checker, compare the matches, then confirm the final code against the official tariff or with your customs broker." },
  { q: "Why does the HSN code matter for customs and GST?", a: "It determines the duty rate, GST rate and any import/export restrictions that apply to your goods. The right code keeps clearance smooth and your filings compliant." },
  { q: "What happens if I use the wrong HSN code?", a: "An incorrect code can mean the wrong duty or GST, delayed clearance, penalties, or a re-assessment by customs. When in doubt, verify with a licensed broker before filing." },
  { q: "Can one product have more than one possible HSN code?", a: "Sometimes. Composition, processing and intended use can push a product into different headings. Read the matches carefully and pick the one that best fits the General Rules of Interpretation." },
  { q: "Are HSN codes the same in every country?", a: "The first six digits are harmonized globally, so they match everywhere. Beyond six digits, each country adds its own sub-classifications, so the full code can differ by country." },
  { q: "Where do the extra Indian digits come from?", a: "They are national sub-headings maintained under India's Customs Tariff and GST schedules, giving finer product distinctions than the shared 6-digit level." },
  { q: "Is this HSN checker free to use?", a: "Yes. It is free with no sign-up and runs in your browser. Treat the results as guidance and confirm the final code with the official tariff or your customs broker." },
];

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
      <FaqSection
        eyebrow="HSN code FAQ"
        heading="HSN codes, answered."
        items={FAQS}
      />
      <Footer />
    </>
  );
}
