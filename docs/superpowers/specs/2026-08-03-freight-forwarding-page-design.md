# Freight-Forwarding Landing Page — Design Spec

**Date:** 2026-08-03
**Status:** Approved (pending implementation)
**Author:** vrajesh.patadiya@alphabitssolutions.com

## Goal

Add a new standalone landing page at `/freight-forwarding` to the Susea marketing
site. This first pass is a **faithful 1:1 port** of the existing Meta Ads landing
page design (`Meta Ads Landing Page Review for Nvocc -/Susea Meta LP.dc.html`, a
"DC" design-tool export) into the site's Next.js architecture. Content refinement
happens in a later pass — this pass gets the page live and pixel-faithful.

## Non-Goals

- No navigation, `sitemap.js`, `robots.js`, or `layout.js` changes. The page is a
  standalone ad destination.
- No backend wiring. Forms and booking CTAs are **visual only** in this pass.
- No content rewriting. Copy, data, and design placeholders are ported verbatim.

## Architecture

Mirror the proven pattern in `app/spot-rate/page.js`. Each landing page is a single
large `"use client"` React component plus a co-located, page-scoped CSS file.

**Files (2 new):**

- `app/freight-forwarding/page.js` — full page as a `"use client"` component.
  Reuses the shared building blocks already used by spot-rate:
  - `I({ n, style })` — lucide-react icon helper (kebab-name → PascalCase lookup).
  - `lucide-react` for all icons.
  - `embla-carousel-react` for any horizontal sliders (e.g. testimonials/marquee)
    if the source uses them; otherwise CSS marquee as in the source.
  - `smoothScrollToId` / `smoothScrollToTop` from `@/lib/scroll` for in-page anchor
    links (nav, logo, CTAs).
  - All content data (automations, testimonials, FAQs, before/after tool lists,
    playbook bullets, stats, ROI assumptions, demo day/time slots) ported inline
    from the source HTML's `DCLogic` component, exactly as designed.
- `app/freight-forwarding/freight-forwarding.css` — all page styles, scoped under a
  `.freight-forwarding-page` wrapper class (mirroring `.spot-rate-page`) so nothing
  leaks globally. Consumes the shared design tokens defined in `app/globals.css`
  (`--paper`, `--ink`, `--blue-600`, `--good-500`, etc.) — i.e. the site's real
  brand system, which is identical to the tokens the source export references.

## Branding

- Nav uses **our real asset** `/assets/susea-mark-black.png` (same as spot-rate),
  not the source export's inline mark.
- Colors and typography come from the shared `globals.css` tokens automatically.
- All other design placeholders are preserved (see Placeholders below).

## Sections (ported in order)

1. Sticky beta bar (dismissible) — "4 slots left this month"
2. Nav — Susea mark + links (Product, Automations, ROI calculator, Customers, FAQ)
   + "Request beta access" / "Book a demo"
3. Hero — headline, subhead, dual CTA, trust checklist + animated quote card
   (Q-2416 / "AI drafted · 84s" / Susea-suggests / follow-up)
4. Trust logo marquee — "Trusted by beta forwarders across 8 countries"
5. "The hidden cost of manual work" — Monday-morning narrative + metric stats
6. Before / After — eleven browser tabs → one console (toggle/compare)
7. "The Susea difference" — Instant · Spot vs Structured · RFQ, two-column
8. Automations — 8-workflow grid (icon, id, title, body, trigger)
9. Product dashboard preview — live ops screen mock
10. **ROI calculator** — editable slider inputs, live-computed savings output
11. Beta stats strip — small real numbers (placeholder values)
12. Testimonials — beta partner quotes with metrics
13. Traditional vs Susea — comparison table
14. FAQ — accordion (objection handling)
15. Industry-shift stats — "be early" claims with sources
16. Playbook lead-magnet — "Ocean Freight Automation Playbook" + email capture
17. **Demo picker** — Calendly-style day/time grid ("This week · IST")
18. Beta-access form — name, work email, company, role, monthly quote volume
19. Footer — product/company/legal columns
20. **Exit-intent modal** — "Before you go / take the playbook"

## Interactive Behavior (all client-side, all functional)

- Exit-intent modal: triggers on `mouseleave` at top of viewport (`clientY <= 0`),
  fires once per session, dismissible.
- Sticky beta bar: dismissible.
- Mobile nav menu: open/close.
- FAQ accordion: single-open, animated max-height.
- ROI calculator: range sliders update state and recompute displayed savings live;
  slider track fill reflects value.
- Demo day/time picker: selectable day and time-slot state.
- Before/After: toggle/compare interaction as in source.

## Forms & CTAs — Visual Only

All inputs, hover states, accordions, sliders, and selections work. Submit buttons
and booking CTAs are **inert** (no network calls; may `console.log`). Real
endpoints (beta-access form, Calendly, playbook email) are wired in a later pass.

## Placeholders (kept as-is for later)

- `[placeholder logos — swap in real partners]` in the trust marquee.
- `[placeholder numbers — swap in production values before launch]` in the beta
  stats strip.
- Any other `{{ ... }}`-style design placeholders are rendered with the source's
  intended sample values, matching the export.

## Testing / Verification

- Page renders at `/freight-forwarding` with no console errors.
- All sections present and visually faithful to the source at desktop + mobile
  breakpoints (source defines breakpoints at 1180 / 900 / 520 px).
- Each interactive widget behaves as specified above.
- No global style leakage (styles scoped under `.freight-forwarding-page`).
- No network requests fire from any form or CTA.

## Out of Scope / Future Passes

- Content improvement and copy refinement.
- Filling placeholder logos and stats with real values.
- Wiring forms/CTAs to real endpoints (form API, Calendly, email capture).
- Adding the page to nav / sitemap / robots.
