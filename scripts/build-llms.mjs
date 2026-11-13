import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

/*
 * Generates one public, AI-readable file from verified site content:
 *   public/llms.txt  — a single, self-contained business knowledge base that
 *                      opens with a quick-links index and then inlines the full
 *                      product, pricing, glossary and blog-FAQ detail.
 *
 * Business facts below are sourced from the live pages in app/ and components/.
 * Blog entries are read dynamically from content/blog/*.mdx frontmatter.
 * Keep this file as the single source of truth — public/llms.txt is build output
 * and must never be hand-edited (it is overwritten on every `npm run build`).
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const contentDir = path.join(root, "content/blog");

const SITE = "https://susea.ai";
const CONTACT_EMAIL = "getstarted@susea.ai";

// --- Blog -------------------------------------------------------------------

function loadPosts() {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { data } = matter(fs.readFileSync(path.join(contentDir, file), "utf8"));
      return { slug, url: `${SITE}/blog/${slug}`, ...data };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function groupByTopic(posts) {
  const groups = new Map();
  for (const p of posts) {
    const topic = p.topic || "Articles";
    if (!groups.has(topic)) groups.set(topic, []);
    groups.get(topic).push(p);
  }
  return [...groups.entries()];
}

// --- Shared business facts (verified from the site) -------------------------

const SUMMARY =
  "Susea is an AI pricing, quoting and procurement platform — a Freight Forwarding CRM — for ocean freight forwarders, NVOCCs and CHAs. It prices every customer inquiry directly from your own carrier rate sheets, compares 200+ carriers, runs live RFQ auctions with your agents, and drafts branded, customer-ready quotes in under 90 seconds. Every quote, re-price and follow-up is drafted for a human to approve — Susea never auto-sends and never changes your prices or margins on its own.";

const PRODUCTS = [
  {
    name: "Instant Rates",
    url: `${SITE}/instant-rates`,
    purpose:
      "Turn a cargo inquiry into a priced, branded, customer-ready quote in under 90 seconds.",
    points: [
      "Prices each inquiry from your own carrier rate sheets, not a public spot marketplace — your buy rates and margins stay confidential.",
      "Compares 200+ shipping lines, normalised into one side-by-side view of all-in cost, transit time and validity.",
      "AI Tariff Extraction reads carrier rates from PDF, Excel, email and forwarded WhatsApp messages and turns them into one comparable rate table.",
      "Surcharges (BAF, CAF, THC, LSS, ISPS) are modelled and applied automatically so the all-in price is right the first time.",
      "Live rate visibility: rates refresh frequently so you never quote off a stale sheet.",
      "You set margins, taxes, terms and rounding once; every quote follows them. A human approves before anything is sent.",
    ],
  },
  {
    name: "RFQ Auctions",
    url: `${SITE}/rfq`,
    purpose:
      "Float multi-lane RFQs to your own carrier agents, collect competitive bids, and award with a documented, audit-ready approval trail.",
    points: [
      "Upload many lanes at once and launch an RFQ to your invited agents in a single click.",
      "Agents bid live and can re-bid down to climb the ranking.",
      "Four visibility modes control how much bidders see: Sealed (nothing until close), Rank-only (their own rank, never competitors' prices), Best-price (the lowest price but not who quoted it), and Open (all prices and rankings).",
      "AI normalises and sanity-checks every bid and recommends the best agent by cost, transit or schedule.",
      "Route the winner through your approval matrix with documented justification.",
      "Awarded rates become digital contracts; Susea tracks utilisation so negotiated savings actually land.",
    ],
  },
  {
    name: "Automations",
    url: `${SITE}/automations`,
    purpose:
      "Five pricing-desk automations that draft routine work for a human to approve. AI drafts and routes; it never touches price or margin, and nothing is sent without a click. Every draft, approval and send is audit-ready by default.",
    points: [
      "Inquiry Intake — reads an inbound request, extracts cargo details and drafts an all-in rate from your rate sheets, ready for your tap.",
      "Rate Sheet Extraction — auto-parses carrier PDFs, XLS, emails and WhatsApp forwards into your rate table, with every option priced on arrival.",
      "Quote Follow-up — quotes with no reply after 48 hours get a personalised follow-up, drafted for you before validity expires.",
      "Expiry Re-price — lapsing quotes are caught, re-priced against current rates, and the re-send is drafted before the customer notices.",
      "RFQ Bid Chasing — agents who haven't bid are nudged with time-left and ranking context so the RFQ closes on time.",
    ],
  },
];

const FREE_TOOLS = [
  {
    name: "CBM & Cargo Calculator",
    url: `${SITE}/free-tools/cbm-calculator`,
    desc: "Enter cargo dimensions, weight and quantity to get total cubic metres (CBM), chargeable weight / measure (W/M) for LCL, and a container recommendation for FCL. Free, no sign-up; every calculation runs in your browser.",
  },
  {
    name: "HSN Code Checker",
    url: `${SITE}/free-tools/hsn-code-checker`,
    desc: "Search HS / HSN classifications by product description or code and see the section, chapter, heading and subheading, including India's 8-digit codes. Free, no sign-up; results are guidance to confirm against the official tariff or your customs broker.",
  },
];

const PLANS = [
  {
    name: "Starter",
    price: "$19 / month (or $15 / month billed annually)",
    for: "Small freight forwarders getting started.",
    features: [
      "50 RFQs / month",
      "50 Quotes / month",
      "Up to 20 Carrier Agents",
      "Instant Ocean Freight Rates",
      "RFQ Auctions",
      "Quote Generator",
    ],
  },
  {
    name: "Pro (Most Popular)",
    price: "$49 / month (or $35 / month billed annually)",
    for: "Growing freight teams with higher quote volumes.",
    features: [
      "150 RFQs / month",
      "150 Quotes / month",
      "Up to 50 Carrier Agents",
      "Instant Ocean Freight Rates, RFQ Auctions, Quote Generator",
      "Priority Support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom pricing — contact sales",
    for: "Large logistics companies with custom workflows and unlimited scale.",
    features: [
      "Unlimited RFQs and Quotes",
      "Unlimited Carrier Agents",
      "Analytics Dashboard",
      "Custom Workflows",
      "Dedicated Success Manager",
    ],
  },
];

const LINKS = {
  pricing: `${SITE}/pricing`,
  freeTools: `${SITE}/free-tools`,
  freightForwarding: `${SITE}/freight-forwarding`,
  blog: `${SITE}/blog`,
  privacy: `${SITE}/privacy`,
  terms: `${SITE}/terms`,
  linkedin: "https://www.linkedin.com/company/susea-ai/",
  instagram: "https://www.instagram.com/susea.ai",
  whatsapp: "https://wa.me/917048153127",
  demo: "https://calendly.com/darshit-alphabitssolutions/30min",
};

const GLOSSARY = [
  ["FCL", "Full Container Load — the shipper uses an entire container, priced per container."],
  ["LCL", "Less than Container Load — multiple shippers share one container, priced per revenue ton (1 ton or 1 CBM, whichever is greater)."],
  ["CBM", "Cubic metre — the volume cargo occupies; drives LCL pricing and container selection."],
  ["NVOCC", "Non-Vessel Operating Common Carrier — issues its own bills of lading without operating ships."],
  ["CHA", "Customs House Agent — handles customs clearance on behalf of importers/exporters."],
  ["HS / HSN code", "Harmonized System code for classifying traded goods; India uses 8-digit HSN codes (first 6 digits are the global HS code)."],
  ["BAF / CAF", "Bunker / Currency Adjustment Factor — fuel-cost and currency surcharges on ocean freight."],
  ["THC", "Terminal Handling Charge — port handling cost at origin or destination."],
  ["LSS / ISPS", "Low Sulphur Surcharge / International Ship and Port Facility Security charge."],
  ["GRI / PSS / EBS", "General Rate Increase / Peak Season Surcharge / Emergency Bunker Surcharge — carrier-announced rate changes."],
  ["Spot vs contract rate", "A spot rate is a short-validity market price; a contract rate is a negotiated rate fixed for a period."],
];

// --- llms.txt (single, comprehensive file with a quick-links index) ---------

function buildLlms(posts) {
  const out = [];
  const p = (...l) => out.push(...l, "");

  p("# Susea");
  p(`> ${SUMMARY}`);
  p(
    `Susea is in beta. Access is via waitlist and a founder-led onboarding on your live quotes. Contact: ${CONTACT_EMAIL}. Book a demo: ${LINKS.demo}.`,
  );

  // Quick-links index (the former short llms.txt, folded in near the top).
  p("## Quick links");
  p(
    ...PRODUCTS.map((prod) => `- [${prod.name}](${prod.url}): ${prod.purpose}`),
    `- [Freight Forwarding overview](${LINKS.freightForwarding}): How Susea replaces manual pricing-desk work end to end, with an ROI calculator based on your own numbers.`,
    `- [Pricing](${LINKS.pricing}): Starter $19/mo, Pro $49/mo (Most Popular), and custom Enterprise plans.`,
    ...FREE_TOOLS.map((t) => `- [${t.name}](${t.url}): ${t.desc.split(".")[0]}. Free, no sign-up.`),
    `- [Blog / knowledge base](${LINKS.blog})`,
    `- [Privacy Policy](${LINKS.privacy}) · [Terms of Use](${LINKS.terms})`,
  );

  p(
    "## About",
    "Susea (susea.ai) is a software platform for the ocean freight industry. It is built for freight forwarders, NVOCCs (Non-Vessel Operating Common Carriers) and CHAs (Customs House Agents) who run a pricing desk — the team that turns incoming cargo inquiries into priced customer quotes.",
    "",
    "The core idea: a forwarder's competitive edge is answering a customer first with an accurate, all-in price. Manually, that means reading carrier rate sheets, looking up surcharges, calculating landed cost in Excel and formatting an email — often 15–20 minutes per quote. Susea compresses that to under 90 seconds by pricing each inquiry directly from the forwarder's own rate sheets and drafting a branded quote for a human to approve.",
    "",
    "Product status: Susea is in beta, onboarding forwarders via a waitlist and a founder-led setup on the customer's live quotes.",
  );

  p("## Who it is for");
  p(
    "- Ocean freight forwarders running a pricing/quoting desk.",
    "- NVOCCs issuing their own bills of lading.",
    "- CHAs and logistics teams handling EXIM (export/import) shipments.",
    "- India EXIM forwarders and teams quoting major trade lanes (e.g. India–Europe, India–UAE).",
  );

  p("## Core principles");
  p(
    "- Human-approved: every draft waits for a click. Susea never auto-sends.",
    "- Pricing stays yours: AI drafts and routes work but never changes your price or margin.",
    "- Your rates, not a marketplace: pricing comes from the rate sheets you already receive, so buy rates and margins stay confidential.",
    "- Audit-ready: every draft, approval, award and send is logged by default.",
  );

  p("## Products and features");
  for (const prod of PRODUCTS) {
    p(`### ${prod.name} — ${prod.url}`);
    p(prod.purpose);
    p(...prod.points.map((pt) => `- ${pt}`));
  }

  p("### Instant Rates workflow");
  p(
    "1. Search — enter origin, destination, container type and cargo; Susea checks 200+ carriers at once.",
    "2. Compare — see all-in cost, transit time and validity side by side, with AI flagging cheaper or faster routings.",
    "3. Quote — Susea builds the full landed cost automatically (ocean freight, BAF, THC, documentation, your margin).",
    "4. Send — push a branded quote to the customer over WhatsApp or email with one-tap acceptance.",
    "5. Follow up — if the quote goes quiet or is about to expire, Susea drafts the nudge or re-price for your approval.",
  );

  p("## Free tools");
  for (const t of FREE_TOOLS) {
    p(`### ${t.name} — ${t.url}`);
    p(t.desc);
  }

  p("## Pricing");
  p(
    "Plans are billed monthly or annually (annual billing is discounted). Figures below are current as published on the pricing page; confirm live details at " +
      LINKS.pricing +
      ".",
  );
  for (const plan of PLANS) {
    p(`### ${plan.name} — ${plan.price}`, plan.for, ...plan.features.map((f) => `- ${f}`));
  }

  p("## Freight Forwarding overview");
  p(
    `${LINKS.freightForwarding} explains the manual pricing-desk problems Susea removes — requests scattered across inboxes, forgotten follow-ups, agents chased one at a time, bad bids reaching the award screen, and unread tariff sheets — and includes an ROI calculator that estimates annual savings from operator hours, quote-volume capacity and faster-response revenue lift based on your own numbers.`,
  );

  p("## Glossary");
  p(...GLOSSARY.map(([term, def]) => `- ${term}: ${def}`));

  p("## Knowledge base (blog)");
  p(
    `Susea publishes practical guides for freight pricing desks. Full index: ${LINKS.blog}. Each entry below links to the authoritative article.`,
  );
  for (const [topic, group] of groupByTopic(posts)) {
    p(`### ${topic}`);
    for (const post of group) {
      const meta = [post.author && `by ${post.author}`, post.date].filter(Boolean).join(", ");
      out.push(`#### ${post.title}`);
      out.push(`${post.url}${meta ? ` (${meta})` : ""}`);
      out.push(post.description);
      if (Array.isArray(post.faq) && post.faq.length) {
        out.push("", "FAQ:");
        for (const item of post.faq) {
          if (item && item.question && item.answer) {
            out.push(`- Q: ${item.question}`, `  A: ${item.answer}`);
          }
        }
      }
      out.push("");
    }
  }

  p("## Company and contact");
  p(
    `- Website: ${SITE}`,
    `- Email: ${CONTACT_EMAIL}`,
    `- WhatsApp: ${LINKS.whatsapp}`,
    `- Book a demo: ${LINKS.demo}`,
    `- LinkedIn: ${LINKS.linkedin}`,
    `- Instagram: ${LINKS.instagram}`,
    `- Privacy Policy: ${LINKS.privacy}`,
    `- Terms of Use: ${LINKS.terms}`,
  );

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}

// --- Write ------------------------------------------------------------------

const posts = loadPosts();
fs.writeFileSync(path.join(root, "public/llms.txt"), buildLlms(posts), "utf8");

// Remove the legacy second file if a previous build created it.
const legacyFull = path.join(root, "public/llms-full.txt");
if (fs.existsSync(legacyFull)) fs.rmSync(legacyFull);

console.log(`✓ llms.txt updated — ${posts.length} posts listed.`);
