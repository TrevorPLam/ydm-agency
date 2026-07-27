'use client';

import React from 'react';
import { Container } from './Container';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  popular?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export interface PricingProps {
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
  onSelectPlan?: (planName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({
  title,
  subtitle,
  plans,
  onSelectPlan,
}) => {
  return (
    <section id="pricing" className="py-20 bg-slate-950 text-white border-t border-slate-800">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative flex flex-col p-8 bg-slate-900 border ${
                plan.popular
                  ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-2xl scale-[1.02]'
                  : 'border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="accent">Most Popular</Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-400">{plan.description}</p>
              </div>

              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold text-white tracking-tight">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="ml-1 text-slate-400 text-sm">{plan.period}</span>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1 text-sm text-slate-300">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <span className="text-blue-400 font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.ctaHref ? (
                <a href={plan.ctaHref}>
                  <Button
                    variant={plan.popular ? 'primary' : 'secondary'}
                    className={`w-full py-2.5 font-semibold ${
                      !plan.popular && 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    {plan.ctaText || 'Get Started'}
                  </Button>
                </a>
              ) : (
                <Button
                  variant={plan.popular ? 'primary' : 'secondary'}
                  onClick={() => onSelectPlan && onSelectPlan(plan.name)}
                  className={`w-full py-2.5 font-semibold ${
                    !plan.popular && 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {plan.ctaText || 'Get Started'}
                </Button>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
