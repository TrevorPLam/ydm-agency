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
