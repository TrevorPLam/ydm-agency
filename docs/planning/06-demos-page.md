# 6. Demos (Portfolio) Page
*(see `00-index.md` for `[STD-CTA]`)*

**Goal:** Primary trust‑building tool. With no client case studies/testimonials at launch, replaces social proof with multiple live, interactive, fully functional subdomain projects. Answers: *"Can this person actually build something that works and looks professional?"*

**Why Critical:** A single featured demo on Home is insufficient — visitors evaluate a range of work, and one broken/irrelevant demo loses them. Multiple demos with context show breadth, technical range, consistency. Each framed as self‑initiated but built to client‑grade standard, not an academic exercise.

**1. Page Header**
- H1: "Live Demos, Real Code. See What's Possible."
- Subhead: "Every project below is a fully functional, custom‑built website or application — deployed, interactive, and ready for you to explore. No mockups. No templates."
- Note: "These are self‑initiated projects built to the same standard as client work. The same process and attention to detail go into every engagement."

**2. Demo Grid** (2‑col desktop / 1‑col mobile). Each card: device‑framed screenshot (static, `next/image`) · project name · type · one‑line description tying demo to a business problem · tech/capability tags ("Responsive design," "Form handling," "SEO optimised," "Performance tested," etc.) · "View Live Site →" (opens subdomain, new tab).

**3. Launch Demo Library**
| Demo | Type | Proves |
|------|------|--------|
| Coastal Café | Restaurant Marketing Site | Form handling, mobile responsiveness, local business focus, Google Maps integration |
| Apex SaaS | SaaS Landing Page | Product marketing, modern dark aesthetics, waitlist CTA, scroll animations |
| Vanguard Plumbing | Local Service Business | Trust signals (badges/reviews), service area map, instant quote request form |
| Nova Storefront | Simple E‑commerce Storefront | Product grid, cart functionality, headless CMS integration, product search/filtering |

Each is an independent Next.js app in the monorepo, deployed to a dedicated subdomain (e.g. `restaurant.yourdomain.com`), sharing the "← Back to YDM Agency" link.

**4. Transparency Note**
> "These demos are self‑initiated, not client work — but the same process, modern tools, and quality standards are applied to every real project. As client sites go live, they'll be featured here alongside these examples."
Converts a perceived weakness (no portfolio) into a strength (initiative, transparency, readiness).

**5. Final CTA**
H: "Ready for your own high‑performing site?" → `[STD-CTA]`

**Trust Signals:** live clickable links (ultimate proof) · technical tags show range without overclaiming · honest self‑initiated admission builds ethical credibility · multiple business types signal versatility.

**Cross‑linking:** reachable from primary nav, Home ("Explore Live Work" + "View all live demos"), footer. On‑page links to Contact/Services/Process. Subdomains open new tab + carry "← Back to YDM Agency."

**Performance/Tech:** screenshots via `next/image`, lazy, WebP · device frames simple SVG/CSS, no heavy 3D/tilt at launch (if added later: desktop‑only, `prefers-reduced-motion`‑respecting, CSS transforms) · page statically generated; subdomain links external, don't affect main‑site perf budget.

**Monitoring:** all demo links tested immediately pre‑launch + periodically after (a broken demo destroys trust instantly). UptimeRobot (free tier) covers all demo subdomains.
