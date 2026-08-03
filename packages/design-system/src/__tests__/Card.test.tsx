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
