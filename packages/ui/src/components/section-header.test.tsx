import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionHeader } from './section-header';

describe('SectionHeader', () => {
	it('renders title correctly', () => {
		render(<SectionHeader title="Test Title" />);
		expect(screen.getByText('Test Title')).toBeInTheDocument();
	});

	it('renders description when provided', () => {
		render(
			<SectionHeader title="Title" description="Test description" />
		);
		expect(screen.getByText('Test description')).toBeInTheDocument();
	});

	it('does not render description when not provided', () => {
		render(<SectionHeader title="Title" />);
		const description = screen.queryByText(/description/);
		expect(description).not.toBeInTheDocument();
	});


	it('renders with left align', () => {
		render(<SectionHeader title="Title" align="left" />);
		expect(screen.getByText('Title')).toBeInTheDocument();
	});

	it('renders with right align', () => {
		render(<SectionHeader title="Title" align="right" />);
		expect(screen.getByText('Title')).toBeInTheDocument();
	});

	it('renders with custom className', () => {
		render(<SectionHeader title="Title" className="custom-class" />);
		expect(screen.getByText('Title')).toBeInTheDocument();
	});



	it('renders as div element', () => {
		const { container } = render(<SectionHeader title="Title" />);
		expect(container.firstChild?.tagName).toBe('DIV');
	});
});
