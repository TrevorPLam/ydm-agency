# 12. Pre‑Launch QA Protocol & Soft Launch Execution

Solo‑developer launch ritual: pre‑flight check → quiet production go‑live → monitoring window → low‑pressure announcement.

### 12.1 Pre‑Launch QA (high‑risk items, in addition to the checklist in `11-tech-stack-implementation.md §11`)
1. **Contact form E2E:** empty fields → validation errors · invalid email → error · valid payload → success message, auto‑ack received (check spam), lead visible in Supabase, internal notification delivered.
2. **Consent/analytics:** incognito first visit → banner visible, no analytics requests · Reject → stays blocked · Accept → analytics fires next pageview · footer "Cookie Settings" reopens banner, preference changeable.
3. **Demo subdomains:** no console errors · "← Back to YDM Agency" present/functional · any forms/buttons on demos work.
4. **Cross‑browser/responsive:** Chrome/Firefox/Safari at 320/768/1024/1440px, no horizontal scroll, ≥44px targets, hamburger works.
5. **SEO fundamentals:** `robots.txt` accessible, `sitemap.xml` lists all pages, unique title/description per page.
6. **Performance:** Lighthouse mobile ≥90 Perf / 100 A11y on Home, Services hub, Demos, Contact, About. WebPageTest from a distant location for realistic LCP.
7. **Security/spam:** honeypot test (fill it → no email/no DB write) · rate limit test (>5 submissions/hr → error returned).

### 12.2 Soft Launch Protocol
Rationale: go fully live at the public URL with zero promotion; act as sole visitor for a final real‑world test (email deliverability, SSL, DNS propagation, edge cases) before any audience sees it.

1. **Production deploy** — merge `main`, Vercel builds/deploys `main-site` + all demo apps to production subdomains.
2. **DNS/SSL verification** — confirm `yourdomain.com` resolves, lock icon present, no mixed content; repeat per demo subdomain.
3. **Re‑run critical QA on live URL** — real contact submission from an external device/cellular data, verify both Resend emails (check spam), test Calendly booking if enabled, click through every demo from the Demos page.
4. **Monitor 24–48 hrs** — keep analytics/error logging (Sentry if configured) open, spot‑check on real phone/different browsers, send a test email from a friend's account to confirm deliverability.
5. **Fix immediately** — any bug/typo/broken link/email glitch gets a patched deploy right away.

### 12.3 Post‑Launch Verification (before any announcement)
Real submission fires GA4 `form_submission`, visible in reports · WebPageTest from 2–3 global locations, LCP consistently <2.5s · `npx broken-link-checker` on the live domain → zero 404s · all UptimeRobot monitors active and receiving successful pings.

### 12.4 Announcement Strategy
Channels (start with 1–2): LinkedIn (personal story: self‑taught, AI‑augmented + link to site/one demo) · Twitter/X thread (demo screenshots + Demos page link) · Indie Hackers/Makerlog (solo builder communities, transparent share) · local business groups (Facebook/Nextdoor) if targeting local services.
Messaging: don't oversell, let demos prove capability · be transparent ("solo developer, AI‑accelerated, here's the proof") · include direct Demos link + one specific demo · never claim to be an established agency — lean size is the advantage.

### 12.5 First‑Week Monitoring
Daily analytics check (unexpected traffic patterns, high bounce on key pages, zero‑traffic pages) · respond to all contact submissions within the promised 2 hours · maintain a simple bug log (Notion/text file) for visitor‑reported issues, fix and redeploy quickly.

### 12.6 AI‑Assisted QA (Optional)
Use Cursor/Windsurf to generate a Playwright test covering contact form, cookie consent, demo links · prompt an AI tool to review homepage screenshot at 320px for layout issues · set up Lighthouse CI with budget configs to auto‑audit every build.
