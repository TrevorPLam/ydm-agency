/**
 * FILE: Features.tsx
 * PURPOSE: Provides the Features component for rendering a responsive grid of feature cards with optional icons.
 * ARCHITECTURE: Presentational server component composing Container and Card; maps a FeatureItem array into a 1/2/3-column responsive grid.
 * KEY RULES: Must render optional icons when provided; must use a responsive grid (1 col mobile, 2 col tablet, 3 col desktop).
 * DEPENDS ON: react, ./Container, ./Card.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import React from 'react';
import { Container } from './Container';
import { Card } from './Card';

export interface FeatureItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface FeaturesProps {
  title: string;
  subtitle?: string;
  features: FeatureItem[];
}

/**
 * WHAT IT DOES: Renders a features section with a centered heading/subtitle and a responsive grid of feature cards.
 * @param {FeaturesProps} props - Section title, optional subtitle, and array of FeatureItem objects
 * @return {JSX.Element} - Rendered features section
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: FeatureItem icons are valid React nodes when provided.
 */
export const Features: React.FC<FeaturesProps> = ({
  title,
  subtitle,
  features,
}) => {
  return (
    <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="bg-slate-800/60 border-slate-700/60 p-8 hover:border-blue-500/50 transition-all duration-300 shadow-xl"
            >
              {feature.icon && (
                <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center mb-6 font-bold text-xl">
                  {feature.icon}
                </div>
              )}
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
