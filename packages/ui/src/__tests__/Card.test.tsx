/**
 * FILE: Card.test.tsx
 * PURPOSE: Unit tests for the Card component.
 * ARCHITECTURE: packages/ui / React Testing Library checks for children, base classes, and className merging.
 * KEY RULES: Extends jest-dom matchers inline; base class assertions depend on the design system tokens.
 * DEPENDS ON: React, ../Card, @testing-library/react, @testing-library/jest-dom/matchers, and vitest.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { Card } from '../Card';

expect.extend(matchers);

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toBeInTheDocument();
  });

  it('base classes include bg-surface border-border rounded-xl', () => {
    render(<Card>Test card</Card>);
    const card = screen.getByText('Test card');
    expect(card).toHaveClass('bg-surface');
    expect(card).toHaveClass('border-border');
    expect(card).toHaveClass('rounded-xl');
  });

  it('custom className is merged not replaced', () => {
    render(<Card className="custom-class">Test card</Card>);
    const card = screen.getByText('Test card');
    expect(card).toHaveClass('bg-surface');
    expect(card).toHaveClass('custom-class');
  });
});
