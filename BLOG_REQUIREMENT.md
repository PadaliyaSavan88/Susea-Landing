# Blog Deployment Checklist: SEO, AEO, & GEO

## 1. Frontmatter Requirements
- [ ] **Title:** Under 60 characters. Includes a primary keyword.
- [ ] **Description:** Under 155 characters. Summarizes the technical "Problem/Solution."
- [ ] **Keywords:** Comma-separated list of 5-8 specific technical terms.
- [ ] **Topic:** Categorize the post (e.g., AI Engineering, Web Development).
- [ ] **Author:** Full name of the post author (used in Article JSON-LD).
- [ ] **Date:** Publish date in ISO 8601 format (e.g., `2026-06-04`).
- [ ] **DateModified:** Last modified date in ISO 8601. Update every time content changes — search engines use this for freshness signals.
- [ ] **Image / ImageName:** Featured image URL and alt text / caption. Used in `og:image`, Article JSON-LD, and Twitter card.
- [ ] **FAQ Array:** At least 3 question/answer pairs using `question` and `answer` keys. Each answer must also appear as visible text in the article body (see No Hidden Content rule).

## 2. Content & Structure (AEO/GEO Rules)
- [ ] **The "50-Word Summary":** Does the first paragraph provide a direct answer to the main topic? No generic intros — open with the problem and why it matters.
- [ ] **Heading Hierarchy:** Only one H1 (the title). Use H2s for sections and H3s for sub-sections / answer-box questions.
- [ ] **Semantic Code Blocks:** Every code block is typed (e.g., ` ```typescript `) and explained immediately after with context on *why* that pattern is used.
- [ ] **Comparison Table:** Include at least one Markdown table comparing options, tools, or trade-offs. AI models parse structured tables well and surface them in generative answers.
- [ ] **Blockquote Callouts:** Use `>` blockquotes for prerequisite links and contextual tips (e.g., "New to X? Start with [Y]"). Keep them short — one to two sentences.
- [ ] **Next-Step Conclusion:** End with a paragraph that links to 2+ related posts or the product page, framing the "what to do next."

## 3. Machine-Readability (Technical)
- [ ] **Image Alt Text:** All images have descriptive alt text containing keywords. Never use empty `alt=""` unless the image is purely decorative.
- [ ] **JSON-LD Check — Article:** The `Article` schema includes `headline`, `description`, `datePublished`, `dateModified`, `author` (individual Person, not just Organization), `image`, and `url`.
- [ ] **JSON-LD Check — FAQPage:** The `FAQPage` schema mirrors the visible FAQ text on the page exactly.
- [ ] **llms.txt Update:** Run `npm run build` — the build script automatically adds the new post URL and description to `/public/llms.txt`.

## 4. Automation & Visuals
- [ ] **OG Image API:** Verify `/api/og?title=[Title]` generates a correct 1200×630 image before publishing.
- [ ] **Build Script:** `npm run build` runs `build:llms` first, then Next.js build. Confirm output shows `✓ llms.txt updated`.

## 5. Keyword Management: Do's & Don'ts

### ✅ The "DO" List
- [ ] **Target Semantic Entities:** Instead of repeating a keyword, include related terms (e.g., for "Next.js": "Server Components," "Edge Runtime," "Vercel") to help AI models map your expertise graph.
- [ ] **Use High-Intent Modifiers:** Include words like "Production-ready," "Enterprise," "Scalable," or "Optimized" to attract global professional traffic.
- [ ] **The "Answer Box" Format:** Structure at least one section as: H3 question → 1-2 sentence direct answer → detailed code/explanation below.
- [ ] **Internal Contextual Links:** Link to related posts and the product/pillar page throughout the article — not just in the conclusion. Aim for 3+ internal links total.

### ❌ The "DON'T" List
- [ ] **No Keyword Stuffing:** Avoid repeating the same phrase more than 3-4 times. AI models penalize "keyword soup."
- [ ] **Avoid Generic Intros:** Remove fluff like "In this blog post, we will look at…" Jump straight to the technical problem.
- [ ] **No Hidden Content:** FAQ answers in `JSON-LD` must also appear word-for-word (or near-equivalent) as visible text on the page. Search engines flag mismatches.
- [ ] **Don't Forget the 'Why':** Don't just provide code — explain the architectural trade-offs and constraints to satisfy GEO (Generative Engine) requirements.
