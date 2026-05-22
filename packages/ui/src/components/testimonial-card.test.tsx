import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TestimonialCard } from './testimonial-card';

describe('TestimonialCard', () => {
	it('renders quote, author, and role correctly', () => {
		render(
			<TestimonialCard
				quote="Great service"
				author="John Doe"
				role="Developer"
			/>
		);
		expect(screen.getByText(/Great service/)).toBeInTheDocument();
		expect(screen.getByText('John Doe')).toBeInTheDocument();
		expect(screen.getByText('Developer')).toBeInTheDocument();
	});

	it('renders company when provided', () => {
		render(
			<TestimonialCard
				quote="Quote"
				author="Author"
				role="Role"
				company="Acme Inc"
			/>
		);
		expect(screen.getByText(/at Acme Inc/)).toBeInTheDocument();
	});

	it('does not render company when not provided', () => {
		render(
			<TestimonialCard
				quote="Quote"
				author="Author"
				role="Role"
			/>
		);
		const company = screen.queryByText(/at/);
		expect(company).not.toBeInTheDocument();
	});

	it('wraps quote in blockquote with quotes', () => {
		const { container } = render(
			<TestimonialCard
				quote="Test quote"
				author="Author"
				role="Role"
			/>
		);
		const blockquote = container.querySelector('blockquote');
		expect(blockquote).toBeInTheDocument();
		expect(blockquote?.textContent).toContain('"Test quote"');
	});



	it('renders with custom className', () => {
		render(
			<TestimonialCard
				quote="Quote"
				author="Author"
				role="Role"
				className="custom-class"
			/>
		);
		expect(screen.getByText('Author')).toBeInTheDocument();
	});

	it('renders as div element', () => {
		const { container } = render(
			<TestimonialCard
				quote="Quote"
				author="Author"
				role="Role"
			/>
		);
		expect(container.firstChild?.tagName).toBe('DIV');
	});
});
