import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './container';

describe('Container', () => {
	it('renders children correctly', () => {
		render(<Container>Test content</Container>);
		expect(screen.getByText('Test content')).toBeInTheDocument();
	});

	it('renders multiple children', () => {
		render(
			<Container>
				<div>First child</div>
				<div>Second child</div>
			</Container>
		);
		expect(screen.getByText('First child')).toBeInTheDocument();
		expect(screen.getByText('Second child')).toBeInTheDocument();
	});

	it('renders with different size props', () => {
		const { rerender } = render(<Container size="sm">Content</Container>);
		expect(screen.getByText('Content')).toBeInTheDocument();

		rerender(<Container size="md">Content</Container>);
		expect(screen.getByText('Content')).toBeInTheDocument();

		rerender(<Container size="lg">Content</Container>);
		expect(screen.getByText('Content')).toBeInTheDocument();

		rerender(<Container size="xl">Content</Container>);
		expect(screen.getByText('Content')).toBeInTheDocument();
	});

	it('renders with custom className', () => {
		render(<Container className="custom-class">Content</Container>);
		expect(screen.getByText('Content')).toBeInTheDocument();
	});

	it('renders as div element by default', () => {
		const { container } = render(<Container>Content</Container>);
		expect(container.firstChild?.tagName).toBe('DIV');
	});
});
