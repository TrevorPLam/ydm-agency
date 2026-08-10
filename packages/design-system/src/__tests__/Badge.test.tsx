/**
 * FILE: Badge.test.tsx
 * PURPOSE: Unit tests for the Badge component variant classes.
 * ARCHITECTURE: Vitest + Testing Library tests asserting Tailwind class presence.
 * KEY RULES: This package is an orphaned/broken fork of packages/ui and is excluded from the pnpm workspace; do not modify logic.
 * DEPENDS ON: vitest, @testing-library/react, @testing-library/jest-dom, ../Badge.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { Badge } from '../Badge';

expect.extend(matchers);

describe('Badge', () => {
  it('default variant renders with bg-surface class', () => {
    render(<Badge>Default badge</Badge>);
    const badge = screen.getByText('Default badge');
    expect(badge).toHaveClass('bg-surface');
  });

  it('accent variant renders with bg-accent', () => {
    render(<Badge variant="accent">Accent badge</Badge>);
    const badge = screen.getByText('Accent badge');
    expect(badge).toHaveClass('bg-accent');
  });

  it('outline variant renders with border-accent', () => {
    render(<Badge variant="outline">Outline badge</Badge>);
    const badge = screen.getByText('Outline badge');
    expect(badge).toHaveClass('border-accent');
  });

  it('children content renders', () => {
    render(<Badge>Test content</Badge>);
    const badge = screen.getByText('Test content');
    expect(badge).toBeInTheDocument();
  });
});
