# 12. Pre‑Launch QA Protocol & Soft Launch Execution

Solo‑developer launch ritual: pre‑flight check → quiet production go‑live → monitoring window → low‑pressure announcement.

### 12.1 Pre‑Launch QA (high‑risk items, in addition to the checklist in `11-tech-stack-implementation.md §11`)
1. **Contact form E2E:** empty fields → validation errors · invalid email → error · valid payload → success message, auto‑ack received (check spam), lead visible in Supabase, internal notification delivered.
2. **Consent/analytics:** incognito first visit → banner visible, no analytics requests · Reject → stays blocked · Accept → analytics fires next pageview · footer "Cookie Settings" reopens banner, preference changeable.
3. **Cross‑browser/responsive:** Chrome/Firefox/Safari at 320/768/1024/1440px, no horizontal scroll, ≥44px targets, hamburger works.
4. **SEO fundamentals:** `robots.txt` accessible, `sitemap.xml` lists all pages, unique title/description per page.
5. **Performance:** Lighthouse mobile ≥90 Perf / 100 A11y on Home, Services hub, Contact, About. WebPageTest from a distant location for realistic LCP.
6. **Security/spam:** honeypot test (fill it → no email/no DB write) · rate limit test (>5 submissions/hr → error returned).

### 12.2 Soft Launch Protocol
Rationale: go fully live at the public URL with zero promotion; act as sole visitor for a final real‑world test (email deliverability, SSL, DNS propagation, edge cases) before any audience sees it.

1. **Production deploy** — merge `main`, Vercel builds/deploys the main site.
2. **DNS/SSL verification** — confirm `yourdomain.com` resolves, lock icon present, no mixed content.
3. **Re‑run critical QA on live URL** — real contact submission from an external device/cellular data, verify both Resend emails (check spam), test Calendly booking if enabled, click through all main pages.
4. **Monitor 24–48 hrs** — keep analytics/error logging (Sentry if configured) open, spot‑check on real phone/different browsers, send a test email from a friend's account to confirm deliverability.
5. **Fix immediately** — any bug/typo/broken link/email glitch gets a patched deploy right away.

### 12.3 Post‑Launch Verification (before any announcement)
Real submission fires GA4 `form_submission`, visible in reports · WebPageTest from 2–3 global locations, LCP consistently <2.5s · `npx broken-link-checker` on the live domain → zero 404s · all UptimeRobot monitors active and receiving successful pings.

### 12.4 Announcement Strategy
Channels (start with 1–2): LinkedIn (personal story: self‑taught, AI‑augmented + link to site) · Twitter/X thread (process/service screenshots + site link) · Indie Hackers/Makerlog (solo builder communities, transparent share) · local business groups (Facebook/Nextdoor) if targeting local services.
Messaging: don't oversell, let the site and service detail prove capability · be transparent ("solo developer, AI‑accelerated, here's the process") · include direct site link · never claim to be an established agency — lean size is the advantage.

### 12.5 First‑Week Monitoring
Daily analytics check (unexpected traffic patterns, high bounce on key pages, zero‑traffic pages) · respond to all contact submissions within the promised 2 hours · maintain a simple bug log (Notion/text file) for visitor‑reported issues, fix and redeploy quickly.

### 12.6 AI‑Assisted QA (Optional)
Use Cursor/Windsurf to generate a Playwright test covering contact form, cookie consent, main page navigation · prompt an AI tool to review homepage screenshot at 320px for layout issues · set up Lighthouse CI with budget configs to auto‑audit every build.
