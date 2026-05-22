import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PortfolioCard } from './portfolio-card';

describe('PortfolioCard', () => {
	it('renders title, description, and link text correctly', () => {
		render(
			<PortfolioCard
				title="Project Title"
				description="Project description"
				href="/project"
			/>
		);
		expect(screen.getByText('Project Title')).toBeInTheDocument();
		expect(screen.getByText('Project description')).toBeInTheDocument();
		expect(screen.getByText('View Project')).toBeInTheDocument();
	});

	it('renders metrics when provided with image', () => {
		render(
			<PortfolioCard
				title="Project"
				description="Description"
				metrics="100%"
				image="placeholder"
				href="/project"
			/>
		);
		expect(screen.getByText('100%')).toBeInTheDocument();
	});

	it('does not render metrics when image not provided', () => {
		render(
			<PortfolioCard
				title="Project"
				description="Description"
				metrics="100%"
				href="/project"
			/>
		);
		expect(screen.queryByText('100%')).not.toBeInTheDocument();
	});

	it('does not render metrics when not provided', () => {
		render(
			<PortfolioCard
				title="Project"
				description="Description"
				image="placeholder"
				href="/project"
			/>
		);
		const metrics = screen.queryByText(/\d+/);
		expect(metrics).not.toBeInTheDocument();
	});

	it('renders as anchor element with correct href', () => {
		const { container } = render(
			<PortfolioCard
				title="Project"
				description="Description"
				href="/test-project"
			/>
		);
		const link = container.firstChild as HTMLAnchorElement;
		expect(link.tagName).toBe('A');
		expect(link.href).toContain('/test-project');
	});



	it('renders with custom className', () => {
		render(
			<PortfolioCard
				title="Project"
				description="Description"
				href="/project"
				className="custom-class"
			/>
		);
		expect(screen.getByText('Project')).toBeInTheDocument();
	});
});
