# 3. Site Architecture, Navigation & Contact Strategy
*(see `00-index.md` for `[STD-CTA]`, `[RESPONSE-PROMISE]`, `[CROSSLINK]`)*

**Sitemap (Launch)**
| Page | Slug | Core Job |
|------|------|----------|
| Home | `/` | Value prop, showcase demos, drive to Demos/Contact |
| Services Hub | `/services` | Overview of 9 service categories, routes to spokes |
| Service Spokes | `/services/{slug}` | Deep detail per service |
| Demos | `/demos` | Primary trust builder — live clickable demo subdomains |
| Process Hub | `/services/process` | Universal client lifecycle |
| Process Spokes | `/services/{slug}/process` | Per‑service phase breakdown |
| About | `/about` | Founder story, philosophy, team‑size clarity |
| Contact | `/contact` | Form + Calendly |
| Privacy | `/privacy` | Legal, linked from footer/contact form |
| (Future) Blog | `/blog` | Deferred |

Demo sites live on separate subdomains (`{demo}.yourdomain.com`) — external resources, not main‑site pages.

**Navigation**
- Desktop: fixed `bg-background/80 backdrop-blur-md`, logo→`/` left, right links in persuasion order: Services, Demos, Process, About, Contact.
- Mobile: hamburger → full‑screen `bg-background` overlay, slide‑in right, ≥44px touch targets, accent left‑border on active link, prominent close.
- Footer (site‑wide): quick links (Services|Demos|Process|About|Contact) · `contact@ydmagency.com` + `[RESPONSE-PROMISE]` · legal (Privacy Policy, Cookie Settings re‑opens consent banner) · tagline "Built by YDM Agency — direct, modern, no overhead."

**Main Site ↔ Demo Subdomain Cross‑linking**
Every demo subdomain: consistent minimal header/footer "← Back to YDM Agency" link. Demos page opens demo links in a **new tab** (keeps agency site backgrounded, avoids dead ends).

**User Flow Mapping**
- **Problem‑aware:** Home (hero validates pain) → "Explore Live Work" → Demos → relevant demo → Contact.
- **Solution‑aware:** Services/Process (solo+AI framed as superior) → internal CTAs to Process/Demos → Contact.
- **Brand‑aware:** About/Demos (story + proof) → CTA to Demos → Contact.
- **Product‑aware:** Contact directly → form/Calendly → instant ack → reply <2hrs.

**IA Principles**
No dead ends (every page has ≥1 logical next step) · flat hierarchy (main pages at root, spokes one level under `/services/`) · demo subdomains are external, linked from Demos page + featured spots · clean descriptive slugs for SEO.

**Contact Strategy (Evidence‑Based)**
- Channels: contact form + Calendly. **No phone number at launch** (evidence: unanswered calls erode trust more than absence). If added later: routes to voicemail + immediate SMS auto‑response.
- Form fields — Required: Full Name, Email, "What do you need help with?" (free‑text). Optional: Project Type dropdown ("Website & brand" / "Traffic & leads" / "Other / I'm not sure") — kept optional to avoid friction when visitor is uncertain about categorization.
- All fields labeled; optional fields marked "(optional)". Spam prevention: hidden honeypot, no CAPTCHA.
- Response promise: `[RESPONSE-PROMISE]`, sent via Resend.
- Post‑submission: in‑page success message replaces form (same response‑time language); no redirect, visitor stays on page.
- Calendly: embedded inline on Contact, lazy‑loaded, label "Prefer to pick a time? Use the calendar below — no back‑and‑forth needed."

**Conversion Tracking (GA4)**
Event `form_submission` fires on in‑page success message appearance; marked as key event, imported into Google Ads. No thank‑you page URL needed — event‑based tracking is equally accurate with less UX friction.

**Internal CTA Language** — `[STD-CTA]` site‑wide for primary buttons; microcopy beneath clarifies next step. Secondary text links may use softer variants ("Learn more about the process") but never compete visually with primary CTA.

**Build & Priority Note**
Nav is presented in user‑facing order, but **actual dev build order** is: Services (hub+spokes) → Demos → Process → About → Contact → Home. Foundational content must exist before Home synthesizes it.
