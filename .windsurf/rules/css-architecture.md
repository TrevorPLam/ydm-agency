---
trigger: glob
globs: apps/**/src/**/*.css, apps/**/src/**/*.tsx, packages/ui/src/**/*.tsx
---

<css_architecture>
- Start from theme variables in @theme, not random arbitrary values
- Think in utility classes first, only use custom CSS when Tailwind isn't the right tool
- Use arbitrary values as escape hatches, not as a second design system
- Extract real components for repeated patterns, not giant parent classes
- Keep class lists readable with tooling (clsx, class-variance-authority)
- Lean on Tailwind variants for states, themes, and responsive behavior
- Keep class names statically detectable for PurgeCSS/tree-shaking
- Understand Preflight before disabling it - it provides consistent resets
- Use @theme in Tailwind v4 for design tokens (colors, fonts, spacing, shadows)
- Promote repeated values to theme tokens instead of duplicating bracket syntax
- Don't use @apply everywhere - it reduces utility-first benefits
- Long class lists are not a smell if they're readable and toolable
- Use CSS modules or Tailwind for component-specific styles
- Keep custom CSS minimal and well-organized
- Use CSS-in-JS only when dynamic styling is truly needed
</css_architecture>
