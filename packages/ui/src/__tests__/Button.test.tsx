import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { Button } from '../Button';

expect.extend(matchers);

describe('Button', () => {
  it('primary variant contains bg-accent class', () => {
    render(<Button variant="primary">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-accent');
  });

  it('secondary variant contains border-border class', () => {
    render(<Button variant="secondary">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-border');
  });

  it('ghost variant renders without border or background', () => {
    render(<Button variant="ghost">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('border');
    expect(button).not.toHaveClass('bg-');
  });

  it('asChild renders the child element tag not button', () => {
    render(
      <Button asChild>
        <a href="/test">Link button</a>
      </Button>
    );
    const link = screen.getByRole('link');
    const button = screen.queryByRole('button');
    expect(link).toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });

  it('disabled sets pointer-events-none and opacity-50', () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass(/disabled:pointer-events-none/);
    expect(button).toHaveClass(/disabled:opacity-50/);
  });
});
