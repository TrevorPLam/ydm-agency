---
name: accessibility
description: Comprehensive accessibility guide covering WCAG 2.2 compliance, semantic HTML, ARIA patterns, keyboard navigation, focus management, and accessible forms for 2026 web applications
---

# Accessibility Guide

This skill provides comprehensive guidance for building accessible web applications that comply with WCAG 2.2 standards and work for all users, including those using assistive technologies.

## WCAG 2.2 Compliance

### Core Principles (POUR)

- **Perceivable**: Information must be presentable in ways users can perceive
- **Operable**: User interface components and navigation must be operable
- **Understandable**: Information and user interface operation must be understandable
- **Robust**: Content must be robust enough to be interpreted reliably by assistive technologies

### WCAG 2.2 New Success Criteria (Level AA)

- **2.4.11 Focus Not Obscured – Minimum**: When a component receives keyboard focus, at least a portion must remain visible
- **2.4.12 Focus Not Obscured – Enhanced** (AAA): No part of focus indicator may be hidden
- **2.4.13 Focus Appearance** (AAA): Focus indicators must have sufficient color contrast and size
- **2.5.7 Dragging Movements**: Provide alternative means (tapping/clicking) for drag operations
- **2.5.8 Target Size – Minimum**: Interactive targets must be at least 24×24 CSS pixels
- **3.2.6 Consistent Help**: Help options must be available consistently in the same relative place
- **3.3.7 Redundant Entry**: Information already entered must be made available to users
- **3.3.8 Accessible Authentication – Minimum**: Provide alternatives to cognitive tests or help mechanisms
- **3.3.9 Accessible Authentication – Enhanced** (AAA): No cognitive function tests or object recognition

## Semantic HTML

### Headings Structure

- Use proper heading hierarchy (h1 → h2 → h3)
- Never skip heading levels
- One h1 per page
- Headings should describe content sections

### Lists

- Use `<ul>` for unordered lists
- Use `<ol>` for ordered lists
- Use `<dl>`, `<dt>`, `<dd>` for definition lists
- Never use lists purely for layout

### Links

- Always use real `<a>` elements with href attributes
- Provide clear, descriptive link text (avoid "click here")
- Maintain visible focus styles
- Use aria-label only when link text is not descriptive enough

## ARIA Best Practices

### When to Use ARIA

- Use semantic HTML first
- ARIA is for when HTML cannot express the necessary semantics
- Keep ARIA state in sync with React state
- If a dropdown is open, aria-expanded must match

### Common ARIA Patterns

#### Tabs Pattern

```tsx
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1">
    Tab 1
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">
    Tab 2
  </button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  Panel 1 content
</div>
```

#### Modal/Dialog

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Dialog Title</h2>
  <p id="dialog-description">Dialog description</p>
</div>
```

## Keyboard Navigation

### Required Keyboard Support

- **Tab**: Move focus forward
- **Shift+Tab**: Move focus backward
- **Enter**: Activate buttons, links, submit forms
- **Space**: Toggle checkboxes, radio buttons, buttons
- **Esc**: Close modals, menus, exit focus traps

### Focus Management

- Ensure visible focus indicators
- Maintain focus order that matches visual order
- Implement focus traps for modals
- Return focus to trigger after closing modals
- Skip navigation links for keyboard users

## Accessible Forms

### Form Labels

- Every form input must have an associated label
- Use `<label for="input-id">` or aria-label/aria-labelledby
- Placeholder text is not a substitute for labels
- Provide clear error messages linked to inputs

### Form Validation

- Provide real-time validation feedback
- Use aria-invalid="true" for invalid fields
- Link error messages to inputs using aria-describedby
- Explain how to fix errors clearly

### Example Accessible Form

```tsx
<form>
  <div>
    <label htmlFor="email">Email address</label>
    <input
      id="email"
      type="email"
      required
      aria-invalid={errors.email ? 'true' : 'false'}
      aria-describedby={errors.email ? 'email-error' : undefined}
    />
    {errors.email && (
      <span id="email-error" role="alert">
        {errors.email}
      </span>
    )}
  </div>
</form>
```

## Images and Media

### Alternative Text

- Provide meaningful alt text for all images
- Use empty alt="" for decorative images
- Avoid images of text
- Test with screen readers

### Color Contrast

- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text (18pt+)
- Minimum 3:1 for UI components
- Don't rely on color alone to convey information

## Testing for Accessibility

### Manual Testing

1. **Keyboard Test**: Can you navigate the entire site using only Tab, Shift+Tab, Enter, Space, and Esc?
2. **Screen Reader Test**: Test with NVDA (Windows), VoiceOver (macOS), or TalkBack (Android)
3. **Zoom Test**: Test at 200% and 400% zoom levels

### Automated Testing

- Use Axe DevTools browser extension
- Integrate jest-axe or vite-axe for unit testing
- Run Lighthouse accessibility audits
- Use axe-core for CI integration

### Testing Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] All images have appropriate alt text
- [ ] Color contrast meets WCAG AA standards
- [ ] Form inputs have associated labels
- [ ] Error messages are clear and linked to inputs
- [ ] Dynamic content updates are announced (aria-live)
- [ ] Skip navigation link is present
- [ ] Page language is declared (lang attribute)
- [ ] Heading structure is logical

## Component Libraries

### Recommended Accessible Components

- Start with Radix UI or Shadcn UI components
- These libraries have accessibility built-in
- Custom components must meet the same standards
- Test all custom components thoroughly

## Resources

### Documentation

- [WCAG 2.2 Specification](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [React Accessibility Documentation](https://react.dev/learn/accessibility)

### Tools

- [Axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

### Testing

- [NVDA Screen Reader](https://www.nvaccess.org/)
- [VoiceOver (macOS)](https://www.apple.com/accessibility/voiceover/)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/)
