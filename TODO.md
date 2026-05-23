# Task List

## Infrastructure Issues

- [x] **TASK-INFRA-005: Fix packages/ui test failure**
  Status: completed
  Related: packages/ui/src/components/stat-card.test.tsx
  Done: All tests in packages/ui pass
  Out: Changing test infrastructure
  Rules: Testing best practices, React Testing Library
  Pattern: Proper test selectors, unique element queries
  Anti: Ambiguous test queries, multiple element matches
  Depends: none
  Blocks: none

  - ✅ TASK-INFRA-005-1: packages/ui/src/components/stat-card.test.tsx - Fixed test by replacing ambiguous empty string query with specific test ID query (data-testid="stat-value")

- [x] **TASK-INFRA-001: Fix eslint-config typecheck error**
  Status: completed
  Related: packages/eslint-config/src/index.ts
  Done: typescript-eslint module is properly installed and typecheck passes
  Out: Changing eslint-config structure
  Rules: TypeScript strict mode, dependency management
  Pattern: Proper dependency installation
  Anti: Missing type declarations
  Depends: none
  Blocks: typecheck for all packages

  - ✅ TASK-INFRA-001-1: packages/eslint-config - Install typescript-eslint dependency or fix import in src/index.ts

- [x] **TASK-INFRA-003: Fix packages/ui typecheck errors**
  Status: completed
  Related: packages/ui/src/**/*.tsx, packages/ui/src/**/*.ts
  Done: All TypeScript errors in packages/ui are resolved
  Out: Refactoring beyond fixing type errors
  Rules: TypeScript strict mode, proper type definitions
  Pattern: Type-safe React components, proper imports
  Anti: any types, missing type declarations
  Depends: none
  Blocks: typecheck for all packages

- [x] **TASK-INFRA-004: Fix packages/utils typecheck errors**
  Status: completed
  Related: packages/utils/src/**/*.ts
  Done: All TypeScript errors in packages/utils are resolved
  Out: Refactoring beyond fixing type errors
  Rules: TypeScript strict mode, proper type definitions
  Pattern: Type-safe utility functions, proper imports
  Anti: any types, missing type declarations
  Depends: none
  Blocks: typecheck for all packages

- [x] **TASK-INFRA-002: Fix eslint command not found**
  Status: completed
  Related: packages/*/package.json
  Done: eslint is installed and lint command works across all packages
  Out: Changing lint infrastructure
  Rules: pnpm workspace management, dependency installation
  Pattern: Proper devDependencies setup
  Anti: Missing executables
  Depends: none
  Blocks: lint for all packages

  - ✅ TASK-INFRA-002-1: packages/* - Removed lint scripts from packages without eslint, updated root lint to use Biome

## Phase 1: Critical Fixes

- [x] **TASK-001: Fix Navigation Active State**
  Status: completed
  Related: apps/firm/site/components/navigation.tsx
  Done: Navigation uses usePathname() from next/navigation instead of window.location.pathname
  Out: Navigation refactoring beyond active state fix
  Rules: Next.js 16 App Router patterns, client component best practices
  Pattern: React hooks for routing, no direct DOM access
  Anti: window.location in client components, direct DOM manipulation
  Imports: usePathname from next/navigation
  Exports: Navigation component
  Depends: none
  Blocks: none

  - ✅ TASK-001-1: apps/firm/site/components/navigation.tsx - Replace window.location.pathname with usePathname() hook, import usePathname from next/navigation, remove typeof window check

- [x] **TASK-002: Implement Mobile Navigation**
  Status: completed
  Related: apps/firm/site/components/navigation.tsx
  Done: Mobile users can access all navigation links via hamburger menu drawer
  Out: Full mobile redesign beyond navigation
  Rules: Accessibility (ARIA), mobile-first responsive design, Next.js 16 patterns
  Pattern: Mobile drawer with backdrop, focus management, keyboard navigation
  Anti: Hidden navigation on mobile, inaccessible menus
  Imports: useState from react, Lucide icons
  Exports: Navigation component with mobile menu
  Depends: TASK-001
  Blocks: none

  - ✅ TASK-002-1: apps/firm/site/components/navigation.tsx - Add mobile menu button (hamburger) visible on screens < md, implement state for menu open/close
  - ✅ TASK-002-2: apps/firm/site/components/navigation.tsx - Create mobile drawer component with backdrop blur, slide-in animation, full-width on mobile
  - ✅ TASK-002-3: apps/firm/site/components/navigation.tsx - Add navigation links to mobile drawer with proper spacing and hover states
  - ✅ TASK-002-4: apps/firm/site/components/navigation.tsx - Implement ARIA attributes (aria-expanded, aria-controls, aria-label) for accessibility
  - ✅ TASK-002-5: apps/firm/site/components/navigation.tsx - Add focus management: trap focus in drawer when open, return focus to button when closed

- [x] **TASK-003: Add 3D Content Accessibility Fallback**
  Status: completed
  Related: apps/firm/site/components/hero-scene.tsx, apps/firm/site/components/hero-scene-wrapper.tsx
  Done: Users who cannot see 3D content get meaningful alternative
  Out: Complete 3D redesign, adding new 3D features
  Rules: WCAG 2.1 AA, progressive enhancement, graceful degradation
  Pattern: Loading states, error boundaries, fallback content
  Anti: No fallback for WebGL failures, inaccessible 3D content
  Imports: Suspense from react, error boundary pattern
  Exports: HeroSceneWrapper with fallback
  Depends: none
  Blocks: none

  - ✅ TASK-003-1: apps/firm/site/components/hero-scene-wrapper.tsx - Wrap Canvas in Suspense with loading indicator (progress bar or spinner)
  - ✅ TASK-003-2: apps/firm/site/components/hero-scene-wrapper.tsx - Add error boundary to catch Three.js failures, display fallback message
  - ✅ TASK-003-3: apps/firm/site/components/hero-scene-wrapper.tsx - Add aria-label to Canvas describing 3D content purpose
  - ✅ TASK-003-4: apps/firm/site/components/hero-scene-wrapper.tsx - Add prefers-reduced-motion check to disable animations when requested

- [x] **TASK-004: Replace Hardcoded Colors with CSS Variables**
  Status: completed
  Related: apps/firm/site/components/*.tsx, apps/firm/site/app/*.tsx
  Done: All components use CSS custom properties from globals.css
  Out: Complete color system redesign, adding new colors
  Rules: CSS custom properties, design tokens, theming support
  Pattern: Semantic color tokens, no hardcoded hex values
  Anti: Hardcoded #0080FF, #121212, #1E1E1E in components
  Imports: none (CSS variables)
  Exports: Updated components
  Depends: none
  Blocks: TASK-005, TASK-006, TASK-007

  - ✅ TASK-004-1: apps/firm/site/components/navigation.tsx - Already using CSS variables
  - ✅ TASK-004-2: apps/firm/site/components/hero-text.tsx - Already using CSS variables
  - ✅ TASK-004-3: apps/firm/site/app/page.tsx - Already using CSS variables
  - ✅ TASK-004-4: apps/firm/site/app/about/page.tsx - Replaced #0080FF with var(--accent)
  - ✅ TASK-004-5: apps/firm/site/app/services/page.tsx - Replaced #1E1E1E with var(--surface-3)
  - ✅ TASK-004-6: apps/firm/site/app/work/page.tsx - Replaced #1E1E1E with var(--surface-3)
  - ✅ TASK-004-7: apps/firm/site/app/contact/page.tsx - Replaced #1E1E1E with var(--surface-3)
  - ✅ TASK-004-8: apps/firm/site/app/blog/page.tsx - Replaced #1E1E1E with var(--surface-3)
  - ✅ TASK-004-9: apps/firm/site/app/faq/page.tsx - Replaced #1E1E1E with var(--surface-3)
  - ✅ TASK-004-10: apps/firm/site/components/marketing-partner-strip.tsx - Replaced #121212 and #0080FF with CSS variables
  - ✅ TASK-004-11: apps/firm/site/components/hero-scene-wrapper.tsx - Replaced #0a0a1a with var(--surface-1)

## Phase 2: Homepage Transformation

- [x] **TASK-005: Transform Hero to Oversized Typography**
  Status: completed
  Related: apps/firm/site/components/hero-text.tsx, apps/firm/site/app/page.tsx
  Done: Hero uses viewport-spanning type with clipping, no glass card backdrop
  Out: Complete hero redesign beyond typography changes
  Rules: 2026 typography trends, variable fonts, text clipping, CSS scroll-driven animations
  Pattern: Oversized type, text-overflow handling, fluid typography
  Anti: Centered text in glass card, standard hero layouts
  Imports: none (CSS changes)
  Exports: Updated HeroText component
  Depends: TASK-004
  Blocks: TASK-006

  - ✅ TASK-005-1: apps/firm/site/components/hero-text.tsx - Remove glass card backdrop (bg-[rgba(13,13,13,0.55)], backdrop-blur, border, shadow)
  - ✅ TASK-005-2: apps/firm/site/components/hero-text.tsx - Make headline span full viewport width with text-clip utility or overflow-hidden
  - ✅ TASK-005-3: apps/firm/site/components/hero-text.tsx - Split headline: "Web Design That Builds Your Business" (text-6xl lg:text-7xl), "—Without the Agency Nonsense" (text-2xl lg:text-3xl, accent color)
  - ✅ TASK-005-4: apps/firm/site/components/hero-text.tsx - Add variable font weight animation on scroll using CSS scroll-driven animations
  - ✅ TASK-005-5: apps/firm/site/components/hero-text.tsx - Move secondary CTA below fold or make it less prominent
  - ✅ TASK-005-6: apps/firm/site/app/globals.css - Add text-reveal animation keyframes if not present
  - ✅ TASK-005-7: apps/firm/site/app/globals.css - Add fluid typography utilities for responsive text scaling

- [x] **TASK-006: Transform Services Section to Bento Grid**
  Status: completed
  Related: apps/firm/site/app/page.tsx
  Done: Services section uses asymmetrical bento layout with varied tile sizes
  Out: Adding new services, changing service content
  Rules: Bento grid principles, CSS Grid, responsive breakpoints, micro-interactions
  Pattern: Asymmetrical grid, exaggerated corner rounding, varied tile sizes
  Anti: 3-column equal grids, predictable layouts
  Imports: none (CSS Grid)
  Exports: Updated page.tsx
  Depends: TASK-004, TASK-005
  Blocks: TASK-007

  - ✅ TASK-006-1: apps/firm/site/app/page.tsx - Replaced grid-cols-3 with CSS Grid bento layout using md:grid-cols-2 md:grid-rows-2
  - ✅ TASK-006-2: apps/firm/site/app/page.tsx - Made "Website as Growth Engine" span 2 columns, 2 rows (md:col-span-2 md:row-span-2)
  - ✅ TASK-006-3: apps/firm/site/app/page.tsx - Made "Digital Marketing Ecosystem" span 1 column, 2 rows (md:col-span-1 md:row-span-2)
  - ✅ TASK-006-4: apps/firm/site/app/page.tsx - Made "Analytics & Automation" span 1 column, 1 row (md:col-span-1 md:row-span-1)
  - ✅ TASK-006-5: apps/firm/site/app/page.tsx - Added stat tiles: "142% avg conversion" (1x1), "98% client retention" (1x1) with accent colors
  - ✅ TASK-006-6: apps/firm/site/app/page.tsx - Applied exaggerated corner rounding (rounded-2xl) to all tiles
  - ✅ TASK-006-7: apps/firm/site/app/page.tsx - Varied background opacities for depth (some bg-surface-2, some bg-surface-3)
  - ✅ TASK-006-8: apps/firm/site/app/page.tsx - Added micro-interactions: hover:scale-105, hover:border-accent, hover:shadow-lg
  - ✅ TASK-006-9: apps/firm/site/app/page.tsx - Ensured mobile responsiveness: stacks to single column on small screens

- [x] **TASK-007: Transform Portfolio Section to Enhanced Bento Grid**
  Status: completed
  Related: apps/firm/site/app/page.tsx
  Done: Portfolio section uses varied bento layout with featured tile and additional content tiles
  Out: Adding new case studies, changing portfolio content
  Rules: Bento grid principles, CSS Grid, responsive breakpoints, hover effects
  Pattern: Featured tile, varied sizes, image zoom effects
  Anti: 3-column equal grids, placeholder icons
  Imports: none (CSS Grid)
  Exports: Updated page.tsx
  Depends: TASK-004, TASK-006
  Blocks: TASK-008

  - ✅ TASK-007-1: apps/firm/site/app/page.tsx - Enhanced existing bento grid with more dramatic size variations (2x2, 1x1 tiles)
  - ✅ TASK-007-2: apps/firm/site/app/page.tsx - Made first case study (Law Firm) 2x2 featured tile with larger preview area (h-64)
  - ✅ TASK-007-3: apps/firm/site/app/page.tsx - Varied other case studies: Hair Salon and Tax Firm as 1x1 tiles
  - ✅ TASK-007-4: apps/firm/site/app/page.tsx - Added "Client Testimonial" tile (1x1) with quote and attribution
  - ✅ TASK-007-5: apps/firm/site/app/page.tsx - Added "Industry Recognition" tile (1x1) with awards/badges
  - ✅ TASK-007-6: apps/firm/site/app/page.tsx - Replaced Monitor icon placeholders with stylized mockups (gradient backgrounds, accent overlays, large typography)
  - ✅ TASK-007-7: apps/firm/site/app/page.tsx - Added hover effects: image zoom (scale-110), overlay with accent color, border glow
  - ✅ TASK-007-8: apps/firm/site/app/page.tsx - Added "featured" badge to first case study with accent color

- [x] **TASK-008: Transform How It Works to Scroll-Driven Storytelling**
  Status: completed
  Related: apps/firm/site/app/page.tsx, apps/firm/site/app/globals.css
  Done: Timeline uses scroll-driven animations with progress indicator
  Out: Changing process content, adding new steps
  Rules: CSS scroll-driven animations, Intersection Observer, sticky positioning
  Pattern: Scroll-linked animations, pinned elements, progress indicators
  Anti: Static linear timelines, no scroll feedback
  Imports: none (CSS animations)
  Exports: Updated page.tsx, globals.css
  Depends: TASK-004
  Blocks: none

  - ✅ TASK-008-1: apps/firm/site/app/globals.css - Added CSS scroll-driven animation support with @supports (animation-timeline: view()) and fallback
  - ✅ TASK-008-2: apps/firm/site/app/page.tsx - Made each timeline step pin to viewport with position: sticky and min-h-[50vh]
  - ✅ TASK-008-3: apps/firm/site/app/page.tsx - Added progress indicator "Step X of 3" with progress bar (hidden on mobile)
  - ✅ TASK-008-4: apps/firm/site/app/globals.css - Added parallax depth animation (parallax-depth keyframe, timeline-parallax class)
  - ✅ TASK-008-5: apps/firm/site/app/globals.css - Added reveal animations for step content (timeline-reveal keyframe, timeline-step class)
  - ✅ TASK-008-6: apps/firm/site/app/globals.css - Reduced motion support already present in existing @media (prefers-reduced-motion: reduce) rule

## Phase 3: Services Page Transformation

- [x] **TASK-009: Modernize Pricing Table**
  Status: completed
  Related: apps/firm/site/app/services/page.tsx
  Done: Pricing section has toggle, concise features, expandable details, FAQ
  Out: Changing pricing structure, adding new tiers
  Rules: SaaS pricing best practices, progressive disclosure, mobile-first
  Pattern: Monthly/annual toggle, concise feature lists, expandable details
  Anti: Long feature lists, no comparison, hidden pricing
  Imports: useState from react
  Exports: Updated services page
  Depends: TASK-004
  Blocks: TASK-010

  - ✅ TASK-009-1: apps/firm/site/app/services/page.tsx - Added monthly/annual pricing toggle with useState, shows "Save 20%" on annual option
  - ✅ TASK-009-2: apps/firm/site/app/services/page.tsx - Show 2-3 main features per tier, added "View all features" expandable button for each tier
  - ✅ TASK-009-3: apps/firm/site/app/services/page.tsx - Implemented expandable feature list with smooth height animation (max-h-96, opacity transition)
  - ✅ TASK-009-4: apps/firm/site/app/services/page.tsx - Moved FAQ accordion below pricing section within same section for better context
  - ✅ TASK-009-5: apps/firm/site/app/services/page.tsx - Added staggered layout: elevated middle tier with transform md:-translate-y-4
  - ✅ TASK-009-6: apps/firm/site/app/services/page.tsx - Ensured mobile responsiveness: tiers stack vertically on small screens (grid-cols-1 on mobile, md:grid-cols-3)

- [x] **TASK-010: Transform Core Web Design Section to Bento Grid**
  Status: completed
  Related: apps/firm/site/app/services/page.tsx
  Done: Core section uses bento layout with varied tile sizes
  Out: Changing core service content
  Rules: Bento grid principles, CSS Grid, visual hierarchy
  Pattern: Wide tiles, square tiles, horizontal timeline strip
  Anti: 2x2 equal grids, repetitive layouts
  Imports: none (CSS Grid)
  Exports: Updated services page
  Depends: TASK-004, TASK-009
  Blocks: TASK-011

  - ✅ TASK-010-1: apps/firm/site/app/services/page.tsx - Transformed 4 equal cards to bento layout
  - ✅ TASK-010-2: apps/firm/site/app/services/page.tsx - Made "Custom, Not Template-Driven" span 2 columns, 1 row (md:col-span-2)
  - ✅ TASK-010-3: apps/firm/site/app/services/page.tsx - Made other 3 cards 1x1 each
  - ✅ TASK-010-4: apps/firm/site/app/services/page.tsx - Transformed process timeline to horizontal bento strip (4 steps in row)
  - ✅ TASK-010-5: apps/firm/site/app/services/page.tsx - Made deliverables a checklist bento tile with accent checkmarks
  - ✅ TASK-010-6: apps/firm/site/app/services/page.tsx - Added exaggerated corner rounding (rounded-2xl) and varied background opacities (surface-2 and surface-3)

- [x] **TASK-011: Transform Modular Add-Ons to Enhanced Grid**
  Status: completed
  Related: apps/firm/site/app/services/page.tsx
  Done: Add-ons section uses varied bento layout with grouped services
  Out: Changing add-on services
  Rules: Bento grid principles, content grouping, visual hierarchy
  Pattern: Grouped services, varied tile sizes, hover reveals
  Anti: 8 equal cards, no grouping, repetitive layout
  Imports: none (CSS Grid)
  Exports: Updated services page
  Depends: TASK-004, TASK-010
  Blocks: none

  - ✅ TASK-011-1: apps/firm/site/app/services/page.tsx - Transformed 8 equal cards to varied bento layout using md:grid-cols-2 md:grid-rows-4
  - ✅ TASK-011-2: apps/firm/site/app/services/page.tsx - Grouped related services: Content Suite (Blog, Email), Analytics & Optimization (Analytics, CRO, SEO)
  - ✅ TASK-011-3: apps/firm/site/app/services/page.tsx - Used different tile sizes: 2x1 (Content Suite, Analytics), 1x1 (Brand, Social, CRM, PPC, SEO), 1x2 (Reputation)
  - ✅ TASK-011-4: apps/firm/site/app/services/page.tsx - Added hover states that reveal additional info with height transition (max-h-0 to max-h-16/20/32)
  - ✅ TASK-011-5: apps/firm/site/app/services/page.tsx - Added visual grouping with subtle background variations (surface-2 and surface-3 alternating)

## Phase 4: Work Page Enhancement

- [x] **TASK-012: Enhance Work Page Bento Layout**
  Status: completed
  Related: apps/firm/site/app/work/page.tsx
  Done: Project grid uses more dramatic bento variations with actual screenshots
  Out: Adding new projects, changing project content
  Rules: Bento grid principles, CSS Grid, image handling, hover effects
  Pattern: Dramatic size variations, featured badges, image zoom
  Anti: Placeholder icons, equal-sized cards, no hierarchy
  Imports: none (CSS Grid)
  Exports: Updated work page
  Depends: TASK-004
  Blocks: TASK-013

  - ✅ TASK-012-1: apps/firm/site/app/work/page.tsx - Enhanced bento with md:grid-cols-3 md:grid-rows-3 for more dramatic variations
  - ✅ TASK-012-2: apps/firm/site/app/work/page.tsx - Added varied tile sizes: 2x2 featured, 2x1 wide, 1x2 tall, 1x1 standard
  - ✅ TASK-012-3: apps/firm/site/app/work/page.tsx - Added featured badge to first project with accent color and shadow-[0_0_20px_rgba(0,128,255,0.5)] glow
  - ✅ TASK-012-4: apps/firm/site/app/work/page.tsx - Replaced Monitor icons with stylized mockups using gradient backgrounds and industry initials
  - ✅ TASK-012-5: apps/firm/site/app/work/page.tsx - Enhanced hover effects: scale-110 image zoom, overlay with project details slide-up (translate-y)
  - ✅ TASK-012-6: apps/firm/site/app/work/page.tsx - Added subtle parallax on scroll using timeline-parallax class from globals.css

- [x] **TASK-013: Modernize Filter Bar**
  Status: completed
  Related: apps/firm/site/app/work/page.tsx
  Done: Filter bar uses pill-shaped buttons with smooth transitions and result count
  Out: Changing filter functionality
  Rules: Modern button design, smooth transitions, sticky positioning
  Pattern: Pill buttons, active state glow, result indicators
  Anti: Basic rectangular buttons, no feedback
  Imports: none (CSS)
  Exports: Updated work page
  Depends: TASK-004
  Blocks: TASK-014

  - ✅ TASK-013-1: apps/firm/site/app/work/page.tsx - Transform filter buttons to pill-shaped (rounded-full)
  - ✅ TASK-013-2: apps/firm/site/app/work/page.tsx - Add smooth transitions for hover and active states (transition-all duration-300)
  - ✅ TASK-013-3: apps/firm/site/app/work/page.tsx - Enhance active state: accent color, subtle glow (shadow-[0_0_20px_rgba(0,128,255,0.3)])
  - ✅ TASK-013-4: apps/firm/site/app/work/page.tsx - Add sticky positioning to filter bar (sticky top-16 z-40)
  - ✅ TASK-013-5: apps/firm/site/app/work/page.tsx - Add result count indicator showing "X projects"

- [x] **TASK-014: Transform Featured Case Study to Immersive Layout**
  Status: completed
  Related: apps/firm/site/app/work/page.tsx
  Done: Featured case study uses full-width bento with multiple content tiles
  Out: Changing case study content
  Rules: Bento grid principles, immersive layouts, content hierarchy
  Pattern: Full-width bento, stat tiles, testimonial tiles
  Anti: Standard split layout, single column
  Imports: none (CSS Grid)
  Exports: Updated work page
  Depends: TASK-004, TASK-012
  Blocks: none

  - ✅ TASK-014-1: apps/firm/site/app/work/page.tsx - Transformed standard split layout to full-width bento using md:grid-cols-3 md:grid-rows-2
  - ✅ TASK-014-2: apps/firm/site/app/work/page.tsx - Added stat tiles as individual bento boxes (+142% Mobile Conversion, +85% Form Conversions, 5 First-Page Rankings)
  - ✅ TASK-014-3: apps/firm/site/app/work/page.tsx - Added testimonial tile with quote and attribution (Dr. Sarah Mitchell)
  - ✅ TASK-014-4: apps/firm/site/app/work/page.tsx - Added "key learnings" tile with bullet points and Sparkles icons
  - ✅ TASK-014-5: apps/firm/site/app/work/page.tsx - Made it feel like mini case study with varied tile sizes, hover effects, and visual hierarchy

## Phase 5: Contact Page Transformation

- [ ] **TASK-015: Modernize Contact Form**
  Status: pending
  Related: apps/firm/site/app/contact/page.tsx
  Done: Form has real-time validation, modern input design, progress indicator
  Out: Changing form fields, adding new fields
  Rules: Modern form design, real-time validation, progressive disclosure
  Pattern: Floating labels, validation feedback, progress indicators
  Anti: Basic inputs, no validation, static form
  Imports: useState from react
  Exports: Updated contact page
  Depends: TASK-004
  Blocks: TASK-016

  - TASK-015-1: apps/firm/site/app/contact/page.tsx - Add real-time validation feedback (green check for valid, red for invalid)
  - TASK-015-2: apps/firm/site/app/contact/page.tsx - Implement floating labels or modern input design (label moves up on focus)
  - TASK-015-3: apps/firm/site/app/contact/page.tsx - Add progress indicator showing form completion (e.g., "Step 1 of 3" or progress bar)
  - TASK-015-4: apps/firm/site/app/contact/page.tsx - Add "I read every message personally" reassurance near submit button
  - TASK-015-5: apps/firm/site/app/contact/page.tsx - Add "preferred contact method" toggle (email vs phone vs chat)

- [ ] **TASK-016: Transform Alternative Methods to Bento Layout**
  Status: pending
  Related: apps/firm/site/app/contact/page.tsx
  Done: Alternative methods use varied bento layout with availability indicators
  Out: Changing contact methods
  Rules: Bento grid principles, visual hierarchy, availability states
  Pattern: Wide tiles, square tiles, availability indicators
  Anti: 3 equal cards, no hierarchy
  Imports: none (CSS Grid)
  Exports: Updated contact page
  Depends: TASK-004, TASK-015
  Blocks: TASK-017

  - TASK-016-1: apps/firm/site/app/contact/page.tsx - Transform 3 equal cards to varied bento layout
  - TASK-016-2: apps/firm/site/app/contact/page.tsx - Make "Book a Call" span 2 columns, 1 row (md:col-span-2)
  - TASK-016-3: apps/firm/site/app/contact/page.tsx - Make "Email Direct" and "Live Chat" 1x1 each
  - TASK-016-4: apps/firm/site/app/contact/page.tsx - Add availability indicators (green dot for available, gray for offline)
  - TASK-016-5: apps/firm/site/app/contact/page.tsx - Add exaggerated corner rounding and varied background opacities

- [ ] **TASK-017: Transform What Happens Next to Visual Timeline**
  Status: pending
  Related: apps/firm/site/app/contact/page.tsx
  Done: Timeline uses scroll-driven animations with progress indicator and timeframes
  Out: Changing process steps
  Rules: Scroll-driven animations, visual timelines, progress indicators
  Pattern: Scroll-linked animations, milestone markers, timeframes
  Anti: Static linear list, no visual feedback
  Imports: none (CSS animations)
  Exports: Updated contact page
  Depends: TASK-004
  Blocks: none

  - TASK-017-1: apps/firm/site/app/contact/page.tsx - Transform linear list to visual timeline with connecting line
  - TASK-017-2: apps/firm/site/app/contact/page.tsx - Add scroll-driven animations for each step (reveal on scroll)
  - TASK-017-3: apps/firm/site/app/contact/page.tsx - Add progress indicator showing current step
  - TASK-017-4: apps/firm/site/app/contact/page.tsx - Make each step feel like milestone with larger numbered circles
  - TASK-017-5: apps/firm/site/app/contact/page.tsx - Add estimated timeframes to each step (e.g., "Within 24 hours")

## Phase 6: About Page Transformation

- [ ] **TASK-018: Transform About Header to Storytelling Design**
  Status: pending
  Related: apps/firm/site/app/about/page.tsx
  Done: Header uses oversized typography with scroll-triggered reveals
  Out: Changing header content
  Rules: Storytelling principles, oversized typography, scroll animations
  Pattern: Large type, text reveals, narrative flow
  Anti: Standard centered header, no animation
  Imports: none (CSS animations)
  Exports: Updated about page
  Depends: TASK-004
  Blocks: TASK-019

  - TASK-018-1: apps/firm/site/app/about/page.tsx - Make headline oversized (text-5xl lg:text-7xl) with text clipping
  - TASK-018-2: apps/firm/site/app/about/page.tsx - Add scroll-triggered text reveals using CSS scroll-driven animations
  - TASK-018-3: apps/firm/site/app/about/page.tsx - Consider adding timeline element showing journey (vertical line with milestones)
  - TASK-018-4: apps/firm/site/app/about/page.tsx - Remove standard centered layout, use asymmetrical positioning

- [ ] **TASK-019: Transform Problem Section to Asymmetrical Layout**
  Status: pending
  Related: apps/firm/site/app/about/page.tsx
  Done: Problem section uses bento layout with quote tile
  Out: Changing problem content
  Rules: Bento grid principles, asymmetrical layouts, visual hierarchy
  Pattern: Wide tiles, square tiles, quote tiles
  Anti: 3 equal cards, predictable layout
  Imports: none (CSS Grid)
  Exports: Updated about page
  Depends: TASK-004, TASK-018
  Blocks: TASK-020

  - TASK-019-1: apps/firm/site/app/about/page.tsx - Transform 3 equal cards to bento layout
  - TASK-019-2: apps/firm/site/app/about/page.tsx - Make "Average Trap" span 2 columns, 1 row (md:col-span-2)
  - TASK-019-3: apps/firm/site/app/about/page.tsx - Make "Vanity Metrics" and "Fragmented Accountability" 1x1 each
  - TASK-019-4: apps/firm/site/app/about/page.tsx - Add quote tile below with italic styling and accent border
  - TASK-019-5: apps/firm/site/app/about/page.tsx - Add exaggerated corner rounding and varied background opacities

- [ ] **TASK-020: Transform Commitments to Bento Grid**
  Status: pending
  Related: apps/firm/site/app/about/page.tsx
  Done: Commitments section uses varied bento layout with trust signals
  Out: Changing commitment content
  Rules: Bento grid principles, varied layouts, trust signals
  Pattern: Varied tile sizes, trust signal tiles, client logo tiles
  Anti: 2x2 equal grid, repetitive layout
  Imports: none (CSS Grid)
  Exports: Updated about page
  Depends: TASK-004, TASK-019
  Blocks: TASK-021

  - TASK-020-1: apps/firm/site/app/about/page.tsx - Transform 2x2 grid to varied bento layout
  - TASK-020-2: apps/firm/site/app/about/page.tsx - Use varied tile sizes: some 2x1, some 1x1
  - TASK-020-3: apps/firm/site/app/about/page.tsx - Add "trust signals" tile with certifications/badges (when available)
  - TASK-020-4: apps/firm/site/app/about/page.tsx - Add "client logos" tile placeholder (when available)
  - TASK-020-5: apps/firm/site/app/about/page.tsx - Add exaggerated corner rounding and varied background opacities

- [ ] **TASK-021: Enhance Founder Section with Personal Touch**
  Status: pending
  Related: apps/firm/site/app/about/page.tsx
  Done: Founder section has photo placeholder, handwritten accent, career timeline
  Out: Changing founder content
  Rules: Personal branding, handwritten accents, timeline elements
  Pattern: Photo frames, handwritten typography, career timeline
  Anti: Basic card layout, no personalization
  Imports: none (CSS)
  Exports: Updated about page
  Depends: TASK-004
  Blocks: none

  - TASK-021-1: apps/firm/site/app/about/page.tsx - Add photo placeholder with stylized frame (rounded corners, subtle shadow)
  - TASK-021-2: apps/firm/site/app/about/page.tsx - Add handwritten-style accent for "why I started" quote (different font family)
  - TASK-021-3: apps/firm/site/app/about/page.tsx - Add subtle timeline of career with milestone markers
  - TASK-021-4: apps/firm/site/app/about/page.tsx - Make it feel more personal with asymmetrical layout

## Phase 7: Lower Priority Pages

- [ ] **TASK-022: Transform Blog Page to Bento Layout**
  Status: pending
  Related: apps/firm/site/app/blog/page.tsx
  Done: Blog section uses bento layout with featured post and varied tile sizes
  Out: Changing blog content
  Rules: Bento grid principles, content hierarchy, featured posts
  Pattern: Featured large tile, varied smaller tiles, category badges
  Anti: 3 equal cards, no hierarchy, all posts identical
  Imports: none (CSS Grid)
  Exports: Updated blog page
  Depends: TASK-004
  Blocks: none

  - TASK-022-1: apps/firm/site/app/blog/page.tsx - Transform 3 equal cards to varied bento layout
  - TASK-022-2: apps/firm/site/app/blog/page.tsx - Make first post featured: 2x2 large tile with excerpt
  - TASK-022-3: apps/firm/site/app/blog/page.tsx - Make other posts varied sizes: some 1x1, some 1x2
  - TASK-022-4: apps/firm/site/app/blog/page.tsx - Add category badges with different accent colors
  - TASK-022-5: apps/firm/site/app/blog/page.tsx - Add reading time as visual element (clock icon with minutes)
  - TASK-022-6: apps/firm/site/app/blog/page.tsx - Remove "Coming Soon" dates or replace with actual content

- [ ] **TASK-023: Transform FAQ Page to Bento Layout**
  Status: pending
  Related: apps/firm/site/app/faq/page.tsx
  Done: FAQ categories use varied bento layout with question counts
  Out: Changing FAQ content
  Rules: Bento grid principles, varied layouts, visual hierarchy
  Pattern: Varied tile sizes, question counts, popular badges
  Anti: 2-column equal grid, no hierarchy
  Imports: none (CSS Grid)
  Exports: Updated FAQ page
  Depends: TASK-004
  Blocks: none

  - TASK-023-1: apps/firm/site/app/faq/page.tsx - Transform 2-column grid to varied bento layout
  - TASK-023-2: apps/firm/site/app/faq/page.tsx - Use varied tile sizes: some 2x1, some 1x1
  - TASK-023-3: apps/firm/site/app/faq/page.tsx - Add different accent colors per category
  - TASK-023-4: apps/firm/site/app/faq/page.tsx - Add question count indicator to each category
  - TASK-023-5: apps/firm/site/app/faq/page.tsx - Add "most popular" badge to key categories
