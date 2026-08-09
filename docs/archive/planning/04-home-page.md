# 4. Home Page — Blueprint
*(see `00-index.md` for `[STD-CTA]`, `[VOICE]`)*

**Goal:** Within seconds, communicate what YDM Agency offers, why it's different, and the next step — a low‑commitment conversation (Contact) or deeper service exploration (Services).

**Key decisions:** Primary CTA is "Get a Free Project Outline" → `/contact`. Secondary CTA "Explore Services" → `/services`. Services snapshot cards link directly to relevant spoke pages (not the hub). All copy uses `[VOICE]`.

**1. Hero**
- H1: "Your Business Deserves a Website and Marketing That Actually Work"
- Subhead: "Custom websites, search visibility, and marketing systems — built by a modern, AI‑augmented firm that moves fast, communicates directly, and doesn’t charge agency overhead."
- Primary CTA: "Get a Free Project Outline" → `/contact` · Secondary text link: "Explore Services" → `/services`
- Background: CSS‑only noise texture over dark base, no competing animated shapes, static/fast/high‑contrast.

**2. Services Snapshot** (3‑col desktop / 1‑col mobile)
| Card | Copy | Links to |
|------|------|----------|
| Build a Website That Converts | "Custom design and development, fast load speeds, mobile‑ready, and built to turn visitors into leads." | `/services/web-design` |
| Get Found on Google & Beyond | "SEO, local search optimization, and AI‑search readiness so customers can find you wherever they look." | `/services/seo` |
| Market Smarter, Not Harder | "Paid advertising, branding, copywriting, and automation — all managed with total transparency." | `/services/paid-ads` *(or broader hub section if Paid Ads deprioritized — launch decision pending)* |

**3. Process Teaser** (3 icon steps, scroll fade‑up, opacity only)
1. **We talk.** Short call/questionnaire uncovers goals and success criteria.
2. **We build.** AI‑augmented development accelerates work; regular previews/dashboards.
3. **We deliver.** Performance‑tested, accessibility‑checked, fully deployed, ongoing support available.
Link: "Learn more about the process →" → `/services/process`

**4. Trust Banner** (bold centered strip, accent icons)
"No account managers. You talk directly to the person building your project." · "No templates. Every project is custom‑built with modern frameworks." · "No lock‑in contracts. Client relationships last because the results speak for themselves." · "AI‑augmented, human‑directed. Speed without sacrifice."

**5. Final CTA**
H2: "Ready for a website or marketing system that actually performs?" Subhead: "Describe what's not working — a clear path forward will be provided, free of charge." Primary: "Get a Free Project Outline" → `/contact`. Secondary link: "Explore all services" → `/services`.

**Trust Signals Embedded:** process teaser · trust banner · CTA microcopy ("free of charge," "no commitment").

**Dev Notes:** Hero parseable <5s on mobile, headline+CTA visible without scroll · services cards use `Link` components for client‑side nav · no auto‑play animation, respect `prefers-reduced-motion` · entire page statically generated, no dynamic data at launch.
