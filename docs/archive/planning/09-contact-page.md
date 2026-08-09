# 9. Contact Page — High‑Conversion, Low‑Friction
*(see `00-index.md` for `[RESPONSE-PROMISE]`)*

**Goal:** Convert motivated visitors by removing unnecessary friction. Single most critical conversion endpoint — every other page's CTA funnels here. Minimal form + optional Calendly + `[RESPONSE-PROMISE]`.

**Evidence‑Based Decisions:** No phone number (unanswered calls damage trust more than absence; if added later, routes to voicemail + SMS auto‑response) · fields reduced to essentials (fewer fields = less abandonment) · Project Type dropdown optional/broad to avoid friction when prospect is unsure · honeypot spam protection, no CAPTCHA · submit button uses concrete low‑commitment language ("Get Your Free Project Outline") · instant auto‑ack via Resend within seconds, personal follow‑up `[RESPONSE-PROMISE]` · GA4 event‑based tracking on in‑page success, no thank‑you URL · Calendly as secondary option.

**Page Copy**
- H1: "Let's Talk About Your Project"
- Subhead: "Fill out the form below and you'll receive a free project outline within 2 hours — no obligation, no pressure."

**Form Fields**
| Field | Required? | Type | Notes |
|-------|-----------|------|-------|
| Full Name | Yes | text | — |
| Email Address | Yes | email | — |
| What do you need help with? | Yes | textarea | Placeholder: "Briefly describe your goals, timeline, or any questions." |
| Project Type | No | dropdown | Options: "Select a category (optional)" / "Website & brand" / "Traffic & leads" / "Other / I'm not sure" |
| Honeypot | (bot trap) | hidden | Visually hidden, silently discards submission if filled |

Submit button: **"Get Your Free Project Outline"**
Microcopy below form: "Information submitted through this form is used only to respond to your inquiry. See the [Privacy Policy](/privacy) for details."

**Alt Contact Methods:** Direct email `contact@ydmagency.com` (mailto) · Calendly inline embed below form, lazy‑loaded, label "Prefer to pick a time? Use the calendar below — no back‑and‑forth needed."

**Response Promise Callout:** "Every message receives an instant confirmation email. A personal reply — not an automated script — follows within 2 hours on business days, usually faster."

**Post‑Submission Flow**
1. Client‑side validation (Zod) — empty required fields / invalid email caught pre‑submit.
2. Server Action: re‑validate server‑side → store lead in Supabase (immutable audit log) → send instant Resend auto‑ack (confirms receipt, sets 2‑hr expectation) → internal notification to `contact@ydmagency.com`.
3. In‑page success state replaces form: "Thanks — your message has been received. Check your inbox for a confirmation email. A personal reply will follow within 2 hours. If this is urgent, email contact@ydmagency.com directly."
4. GA4 `form_submission` event fires on success message appearance; marked key event, imported to Google Ads.
5. No page redirect — visitor stays on Contact page.

**Trust/Compliance:** Privacy policy linked beneath submit + footer · cookie consent handled site‑wide, no extra prompt here · Calendly loads only when scrolled into view · a11y: labeled inputs, `role="alert"` errors, keyboard‑navigable dropdown, `ring-2 ring-accent` focus.

**Technical Implementation:** React Hook Form + Zod, shadcn/ui `Input`/`Textarea`/`Select` · Server Action uses `@firm/forms` schemas · rate limiting via Upstash Redis (`@upstash/ratelimit`), 5 submissions/hr/IP · Resend template = React Email component in `@firm/email` · Supabase `leads` table: name, email, project_type (nullable), message, source (`website`), status (`new`), timestamp · honeypot silently discards on fill · Calendly via their React component, `next/dynamic`, `ssr: false`.

**Final CTA on Page:** Form submit button is the primary action; Calendly is secondary. No additional bottom CTA — success message closes the loop.
