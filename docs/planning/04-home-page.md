# 4. Home Page — Blueprint
*(see `00-index.md` for `[STD-CTA]`, `[VOICE]`)*

**Goal:** Within seconds, communicate what YDM Agency offers, why it's different, and the next step — toward live proof (Demos) or low‑commitment conversation (Contact).

**Key decisions:** Primary CTA is "Explore Live Work" → `/demos` (not a single demo link, so visitors see multiple proofs). Secondary CTA "Get a Free Project Outline" → `/contact`. Services snapshot cards link directly to relevant spoke pages (not the hub). All copy uses `[VOICE]`.

**1. Hero**
- H1: "Your Business Deserves a Website and Marketing That Actually Work"
- Subhead: "Custom websites, search visibility, and marketing systems — built by a modern, AI‑augmented firm that moves fast, communicates directly, and doesn't charge agency overhead."
- Primary CTA: "Explore Live Work" → `/demos` · Secondary text link: "Get a Free Project Outline" → `/contact`
- Background: CSS‑only noise texture over dark base, no competing animated shapes, static/fast/high‑contrast.

**2. Services Snapshot** (3‑col desktop / 1‑col mobile)
| Card | Copy | Links to |
|------|------|----------|
| Build a Website That Converts | "Custom design and development, fast load speeds, mobile‑ready, and built to turn visitors into leads." | `/services/web-design` |
| Get Found on Google & Beyond | "SEO, local search optimization, and AI‑search readiness so customers can find you wherever they look." | `/services/seo` |
| Market Smarter, Not Harder | "Paid advertising, branding, copywriting, and automation — all managed with total transparency." | `/services/paid-ads` *(or broader hub section if Paid Ads deprioritized — launch decision pending)* |

**3. Featured Demo Showcase**
Static laptop‑frame mockup of strongest live demo (e.g. restaurant booking site). Caption: "A fully functional restaurant booking site — custom built, mobile‑responsive, and performance‑optimized. Not a template. Not a mockup." Link: "Explore Live Work" → `/demos`; small "View all live demos →" beneath. Image via `next/image`, lazy, WebP, explicit dimensions.

**4. Process Teaser** (3 icon steps, scroll fade‑up, opacity only)
1. **We talk.** Short call/questionnaire uncovers goals and success criteria.
2. **We build.** AI‑augmented development accelerates work; regular previews/dashboards.
3. **We deliver.** Performance‑tested, accessibility‑checked, fully deployed, ongoing support available.
Link: "Learn more about the process →" → `/services/process`

**5. Trust Banner** (bold centered strip, accent icons)
"No account managers. You talk directly to the person building your project." · "No templates. Every project is custom‑built with modern frameworks." · "No lock‑in contracts. Client relationships last because the results speak for themselves." · "AI‑augmented, human‑directed. Speed without sacrifice."

**6. Final CTA**
H2: "Ready for a website or marketing system that actually performs?" Subhead: "Describe what's not working — a clear path forward will be provided, free of charge." Primary: "Get a Free Project Outline" → `/contact`. Secondary link: "Explore all services" → `/services`.

**Trust Signals Embedded:** live demo mockup with path to multiple demos · process teaser · trust banner · CTA microcopy ("free of charge," "no commitment").

**Dev Notes:** Hero parseable <5s on mobile, headline+CTA visible without scroll · services cards use `Link` components for client‑side nav · device mockup is SVG frame + inner image, not heavy 3D · no auto‑play animation, respect `prefers-reduced-motion` · entire page statically generated, no dynamic data at launch.
