# YDM Agency — Planning Doc Index

Modular replacement for the original single‑file `planning.md`. Same information, reorganized to avoid repetition and keep future edits scoped to one small file instead of the whole doc. Nothing was cut for content — only de‑duplicated, tabled, or shortened where prose repeated itself.

## File Map
| File | Contents |
|------|----------|
| `01-strategy-positioning.md` | Business context, positioning, trust‑gap strategy, target audience, funnel logic, copy principles |
| `02-design-system.md` | Color/type tokens, spacing, component theming, motion rules, imagery, a11y contrast rules |
| `03-sitemap-ia-navigation.md` | Sitemap, nav design, footer, cross‑linking rules, user‑flow mapping, contact‑channel strategy, GA4 tracking |
| `04-home-page.md` | Home page blueprint |
| `05-services-copy.md` | Services hub + all 9 spoke pages (tabled) |
| `06-demos-page.md` | Demos (portfolio) page spec |
| `07-process-copy.md` | Process hub + all 9 service‑specific process pages (tabled) |
| `08-about-page.md` | About page copy |
| `09-contact-page.md` | Contact page spec + lead‑capture pipeline |
| `10-privacy-policy.md` | Full privacy policy (verbatim legal text) |
| `11-tech-stack-implementation.md` | Stack, monorepo structure, perf/a11y/security budgets, testing, quality gates |
| `12-launch-protocol.md` | Pre‑launch QA, soft launch, announcement, post‑launch monitoring |

## Shared Constants (referenced by shorthand elsewhere — do not restate in full)

**`[STD-CTA]`** — Primary site‑wide CTA:
- Button: **"Get a Free Project Outline"** → `/contact`
- Alt phrasing (used interchangeably in select spots): "Schedule a 15‑Min Discovery Call"
- Microcopy under button: "No commitment — we'll review your needs and send ideas."
- Contact page's own submit button uses a variant: **"Get Your Free Project Outline"**

**`[VOICE]`** — Impersonal, firm‑level voice rule (applies to ALL copy sitewide):
Use "YDM Agency" and passive constructions. Never "we / us / our team." E.g. "Work is handled directly by the professional assigned to your project," not "We handle your project."

**`[SELECT-CLIENTS]`** — Disclaimer used on Paid Advertising, CRM & Automation, and Reputation Management (hub cards, spoke pages, process pages):
"This service is available for select clients; the exact phases, tools, and timelines may be adapted based on the partnership approach used. Typically delivered in partnership with specialist tools/platforms to ensure quality and reliability."

**`[CROSSLINK]`** — Cross‑linking rule (applies to every service spoke and process page):
Links back to its hub, sideways to 2–3 complementary spokes/processes, and forward to `/contact`. Every page reachable within two clicks from any point. No dead ends.

**`[RESPONSE-PROMISE]`** — Response‑time commitment (used site‑wide: footer, contact page, About, process pages):
"Instant auto‑acknowledgment on submission; personal reply within 2 hours on business days." No phone number displayed at launch (evidence: unanswered calls erode trust more than absence).

---
*Original source document (`planning.md`, monolithic, 12 sections) is preserved for reference but should be considered superseded by this modular set going forward. Two known artifacts were removed during this pass: a duplicated Section 11, and a leftover meta‑commentary paragraph accidentally left in the source between sections — both were generation artifacts, not content.*
