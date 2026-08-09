# 2. Visual Design System & Evidence‑Based UI Constraints

**Design Principles**
Accessibility‑first (WCAG 2.2 AA contrast/semantics/keyboard by default) · Performance as identity (every visual element judged on LCP/CLS/INP impact) · Authentic clarity (real photos, clean grids, legible type over trends) · Adaptive dark‑mode‑primary with accessible light toggle · Differentiation through restraint (avoid "glassy neon" template; strong typography, sharp layouts, occasional neo‑brutalist accents).

**Color Tokens — Dark Mode (Primary)**
| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#0A0A0B` | Full‑page heroes, main body |
| `surface` | `#161618` | Cards, nav, footer, modals |
| `text-primary` | `#F5F5F6` | Body copy, headings |
| `text-secondary` | `#A1A1A9` | Captions, meta, secondary links |
| `accent` | `#4AE4A8` | Primary buttons, active nav, focus rings, key icons |
| `accent-hover` | `#38C990` | Hover state for accent elements |
| `border` | `#2A2A2E` | Card borders, inputs, dividers |
| `error` | `#F87171` | Validation errors only |
| `success` | `#4AE4A8` | Confirmation indicators |

**Light Mode** — invert surface/background roles, keep mint accent; `text-primary` → `#0A0A0B`, backgrounds light grays. Full token mapping TBD at implementation.

**Typography**
- Headings: Clash Display (variable, Latin subset), weight 600–700, letter‑spacing `-0.02em` on large headlines.
- Body: Inter Variable, weights 400/500/600.
- Loading: self‑hosted `next/font`, `font-display: swap`, preloaded for LCP.
- Kinetic type: hero phrases only, ≤5 words, triggers once, disabled under `prefers-reduced-motion`.

**Spacing/Layout**
Max width `max-w-6xl` (1152px) · section padding `py-24 md:py-32` (major) / `py-16 md:py-24` (minor) · card gaps `gap-6`/`gap-8` · container padding `px-4 sm:px-6 lg:px-8`.

**Component Theming** *(shadcn/ui + Tailwind tokens, Radix a11y preserved)*
- **Buttons:** Primary `bg-accent text-background`, `hover:bg-accent-hover`, soft glow `box-shadow: 0 0 20px rgba(74,228,168,0.3)`. Secondary `border-border text-text-primary`, `hover:bg-surface hover:border-accent`. All: `focus-visible:ring-2 ring-accent`.
- **Cards:** `bg-surface border-border rounded-xl`, hover lift `y:-4` + `shadow-2xl shadow-accent/10`.
- **Glass surfaces:** secondary informational cards only, `backdrop-blur-md` + opaque gradient overlay, must pass 4.5:1 text contrast. Never on nav, primary CTAs, or form inputs.
- **Form inputs:** `bg-background border-border rounded-lg`, focus `ring-2 ring-accent`; optional fields marked "(optional)".
- **Navigation:** Desktop fixed `bg-background/80 backdrop-blur-md` (only nav gets blur exception). Mobile full‑screen slide‑in overlay, large touch targets.

**Animation & Motion**
- Only `transform`/`opacity` animated — no layout‑triggering properties.
- Scroll reveals: `opacity 0→1, y 30→0`, duration ≤0.4s, stagger ≤0.1s. Applied to hero, portfolio cards, process teaser only; service pages stay static.
- Micro‑interactions: hover scale `1.02` (150ms ease), card lift `y:-4`. Functional feedback (spinners, success checks) always present; decorative glow secondary.
- Reduced motion: disabled globally via Framer Motion `useReducedMotion()` / `MotionConfig reducedMotion="user"` + CSS `prefers-reduced-motion`.
- Perf: Framer Motion lazy‑loaded via `LazyMotion`; heavy bg animation capped 30fps mobile, loads after critical content.

**Imagery**
Founder photo: real, well‑lit, no stock. Sample mockups: static SVG/CSS device frames, no WebGL tilt unless reduced‑motion‑gated + desktop‑only. Background: CSS‑only noise texture over hero (not animated gradient); optional low‑frequency floating shapes, pure CSS, off‑main‑thread.

**Accessibility & Contrast**
Text:background ≥4.5:1 (AA); large text (≥24px) ≥3:1 · `focus-visible` rings on every interactive element + skip‑to‑content link · color never sole conveyor of info (paired with icons/underlines) · OS high‑contrast mode auto‑replaces glass surfaces with solid `surface` · automated testing via axe‑core + Lighthouse, manual keyboard flow on critical pages.

**Dark/Light Toggle**
`next-themes`, `attribute="class"`, defaults dark, preference persisted. Light mode keeps nav/CTAs high‑contrast even as body content lightens.

**Differentiation Note**
Avoid homogenized glassmorphism via structural distinctiveness: generous whitespace, sharp grid lines, oversized heading contrast, selective brutalism (hard borders, monospace tech tags). Motion/translucency are seasoning, not the meal.
