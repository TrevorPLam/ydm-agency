import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeatureCard } from './feature-card';
import { LucideIcon } from 'lucide-react';

// Mock LucideIcon for testing
const MockIcon: LucideIcon = () => (
	<svg data-testid="mock-icon" width={24} height={24}>
		<circle cx={12} cy={12} r={10} />
	</svg>
);

describe('FeatureCard', () => {
	it('renders title and description correctly', () => {
		render(
			<FeatureCard
				icon={MockIcon}
				title="Feature Title"
				description="Feature description"
			/>
		);
		expect(screen.getByText('Feature Title')).toBeInTheDocument();
		expect(screen.getByText('Feature description')).toBeInTheDocument();
	});

	it('renders icon component', () => {
		render(
			<FeatureCard
				icon={MockIcon}
				title="Feature"
				description="Description"
			/>
		);
		expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
	});

	it('renders with custom className', () => {
		render(
			<FeatureCard
				icon={MockIcon}
				title="Feature"
				description="Description"
				className="custom-class"
			/>
		);
		expect(screen.getByText('Feature')).toBeInTheDocument();
	});

	it('renders as div element', () => {
		const { container } = render(
			<FeatureCard
				icon={MockIcon}
				title="Feature"
				description="Description"
			/>
		);
		expect(container.firstChild?.tagName).toBe('DIV');
	});
});
