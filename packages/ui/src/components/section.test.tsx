import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section } from './section';

describe('Section', () => {
	it('renders children correctly', () => {
		render(<Section>Test content</Section>);
		expect(screen.getByText('Test content')).toBeInTheDocument();
	});


	it('renders with muted variant', () => {
		render(<Section variant="muted">Content</Section>);
		expect(screen.getByText('Content')).toBeInTheDocument();
	});

	it('applies id attribute when provided', () => {
		const { container } = render(<Section id="test-section">Content</Section>);
		const section = container.firstChild as HTMLElement;
		expect(section.id).toBe('test-section');
	});

	it('does not apply id when not provided', () => {
		const { container } = render(<Section>Content</Section>);
		const section = container.firstChild as HTMLElement;
		expect(section.id).toBe('');
	});

	it('renders with custom className', () => {
		render(<Section className="custom-class">Content</Section>);
		expect(screen.getByText('Content')).toBeInTheDocument();
	});


	it('renders as section element', () => {
		const { container } = render(<Section>Content</Section>);
		expect(container.firstChild?.tagName).toBe('SECTION');
	});
});
