import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  it('renders a button with the provided accessible name', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('fires onClick when clicked with userEvent', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Submit</Button>);
    const button = screen.getByRole('button', { name: 'Submit' });

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('prevents interaction when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );
    const button = screen.getByRole('button', { name: 'Disabled' });

    expect(button).toBeDisabled();
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders each variant without crashing', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button', { name: 'Primary' })).toBeInTheDocument();

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button', { name: 'Secondary' })).toBeInTheDocument();

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button', { name: 'Ghost' })).toBeInTheDocument();
  });

  it('renders each size without crashing', () => {
    const { rerender } = render(<Button size="default">Default</Button>);
    expect(screen.getByRole('button', { name: 'Default' })).toBeInTheDocument();

    rerender(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button', { name: 'Small' })).toBeInTheDocument();

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button', { name: 'Large' })).toBeInTheDocument();

    rerender(<Button size="icon" aria-label="Icon button" />);
    expect(screen.getByRole('button', { name: 'Icon button' })).toBeInTheDocument();
  });

  it('renders as a child element preserving its semantic role', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button asChild onClick={handleClick}>
        <a href="#test">Link button</a>
      </Button>
    );

    const link = screen.getByRole('link', { name: 'Link button' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#test');
    expect(screen.queryByRole('button', { name: 'Link button' })).not.toBeInTheDocument();

    await user.click(link);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies a custom className while keeping built-in styles', () => {
    render(<Button className="custom-extra-class">Styled</Button>);
    const button = screen.getByRole('button', { name: 'Styled' });
    expect(button).toHaveClass('custom-extra-class');
  });

  it('forwards refs and extra HTML attributes', () => {
    render(
      <Button name="submit" type="submit">
        Save
      </Button>
    );
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveAttribute('name', 'submit');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('has no accessibility violations across variants, sizes, and states', async () => {
    const { container } = render(
      <>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary" disabled>
          Secondary
        </Button>
        <Button variant="ghost" size="sm">
          Ghost
        </Button>
        <Button asChild>
          <a href="/test">Link</a>
        </Button>
      </>
    );

    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });
});
