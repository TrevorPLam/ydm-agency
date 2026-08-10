/**
 * FILE: Card.test.tsx
 * PURPOSE: Unit tests for the Card subcomponents.
 * ARCHITECTURE: packages/ui / composable card structure, className merging, interactive children, and a11y.
 * KEY RULES: color-contrast is disabled in the a11y check; custom classes are merged without replacing defaults.
 * DEPENDS ON: React, ./Card, ./Button, @testing-library/react, @testing-library/user-event, vitest, and jest-axe.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Card', () => {
  it('renders a card with header, title, description, content, and footer', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>Card content</CardContent>
        <CardFooter>Card footer</CardFooter>
      </Card>
    );

    expect(
      screen.getByRole('heading', { name: 'Card title' })
    ).toBeInTheDocument();
    expect(screen.getByText('Card description')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
    expect(screen.getByText('Card footer')).toBeInTheDocument();
  });

  it('forwards extra HTML attributes on the root element', () => {
    render(
      <Card role="region" aria-label="Project card">
        Card content
      </Card>
    );

    const card = screen.getByRole('region', { name: 'Project card' });
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent('Card content');
  });

  it('merges a custom className on the root element without replacing defaults', () => {
    render(
      <Card role="region" aria-label="Styled card" className="custom-card">
        Card content
      </Card>
    );

    const card = screen.getByRole('region', { name: 'Styled card' });
    expect(card).toHaveClass('custom-card');
  });

  it('merges a custom className on subcomponents without replacing defaults', () => {
    render(
      <Card>
        <CardHeader className="custom-header">
          <CardTitle className="custom-title">Card title</CardTitle>
          <CardDescription className="custom-description">
            Card description
          </CardDescription>
        </CardHeader>
        <CardContent className="custom-content">Card content</CardContent>
        <CardFooter className="custom-footer">Card footer</CardFooter>
      </Card>
    );

    const title = screen.getByRole('heading', { name: 'Card title' });
    expect(title).toHaveClass('custom-title');

    const description = screen.getByText('Card description');
    expect(description).toHaveClass('custom-description');

    const content = screen.getByText('Card content');
    expect(content).toHaveClass('custom-content');

    const footer = screen.getByText('Card footer');
    expect(footer).toHaveClass('custom-footer');
  });

  it('renders interactive children inside the footer', async () => {
    const handleClick = vi.fn();
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card title</CardTitle>
        </CardHeader>
        <CardContent>Card content</CardContent>
        <CardFooter>
          <Button onClick={handleClick}>Submit</Button>
        </CardFooter>
      </Card>
    );

    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has no accessibility violations across the full card structure', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Card title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>Card content</CardContent>
        <CardFooter>
          <a href="#action">Learn more</a>
        </CardFooter>
      </Card>
    );

    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });
});
