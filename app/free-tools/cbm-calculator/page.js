import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";
import FaqSection from "@/components/landing/FaqSection";
import CbmCalculator from "@/components/free-tools/CbmCalculator";

const FAQS = [
  { q: "What is CBM and why does it matter in freight?", a: "CBM (cubic metre) is the volume your cargo occupies. Freight is often charged on volume, so CBM drives LCL pricing, container selection and whether a shipment will physically fit." },
  { q: "How do I calculate CBM by hand?", a: "Multiply length × width × height of one package. In metres that gives CBM directly; in centimetres, divide the result by 1,000,000. Multiply by quantity, then add up every line." },
  { q: "What units can I enter in this calculator?", a: "Enter dimensions in centimetres or metres and weight in kilograms. The calculator converts everything and shows total CBM, chargeable weight and a container suggestion." },
  { q: "What is chargeable weight, or weight/measure (W/M)?", a: "Carriers charge on whichever is greater: actual weight or volumetric weight. For LCL ocean freight, 1 CBM is typically treated as 1,000 kg, so a light, bulky shipment is billed on its volume." },
  { q: "How does CBM help me choose between LCL and FCL?", a: "Below roughly 15 CBM, LCL (sharing a container) is usually cheaper; above that, a full container (FCL) often wins on per-CBM cost. The break-even depends on lane, rates and cargo, so treat it as a guide." },
  { q: "How many CBM fit in a 20ft or 40ft container?", a: "As a working rule: a 20ft holds about 28–33 CBM of usable space, a 40ft about 58–67 CBM, and a 40ft high-cube about 68–76 CBM. Real capacity is lower once you account for packing and pallets." },
  { q: "Can I calculate CBM for several products at once?", a: "Yes. Add a line per product, each with its own dimensions, weight and quantity. The calculator totals the whole shipment for you." },
  { q: "Is volumetric weight the same as CBM?", a: "No, but they are related. CBM is pure volume; volumetric (or chargeable) weight converts that volume into a weight using a carrier factor so it can be compared with actual weight." },
  { q: "Why is my LCL quote higher than my CBM suggests?", a: "LCL has minimum charges (often a 1 CBM / 1,000 kg minimum) plus port, documentation and handling fees. A small shipment can therefore cost more per CBM than a larger one." },
  { q: "Is the CBM calculator free and private?", a: "Yes. It is free with no sign-up, and every calculation runs in your browser; nothing you enter is sent to or stored on our servers." },
];

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
      <FaqSection
        eyebrow="CBM calculator FAQ"
        heading="Cargo volume, answered."
        items={FAQS}
      />
      <Footer />
    </>
  );
}
