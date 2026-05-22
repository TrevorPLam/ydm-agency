import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from './stat-card';

describe('StatCard', () => {
	it('renders value and label correctly', () => {
		render(<StatCard value="100" label="Users" />);
		expect(screen.getByText('100')).toBeInTheDocument();
		expect(screen.getByText('Users')).toBeInTheDocument();
	});



	it('renders with custom className', () => {
		render(<StatCard value="100" label="Users" className="custom-class" />);
		expect(screen.getByText('100')).toBeInTheDocument();
	});

	it('handles empty string values', () => {
		render(<StatCard value="" label="Empty" />);
		expect(screen.getByText('Empty')).toBeInTheDocument();
		expect(screen.getByText('')).toBeInTheDocument();
	});

	it('handles numeric values converted to string', () => {
		render(<StatCard value={123} label="Number" />);
		expect(screen.getByText('123')).toBeInTheDocument();
	});

	it('renders as div element', () => {
		const { container } = render(<StatCard value="100" label="Users" />);
		expect(container.firstChild?.tagName).toBe('DIV');
	});
});
