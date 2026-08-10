/**
 * FILE: Pricing.tsx
 * PURPOSE: Provides the Pricing component for rendering a responsive grid of pricing plan cards with optional "Most Popular" highlighting and CTA buttons.
 * ARCHITECTURE: Client component composing Container, Card, Button (asChild with Link or onClick handler), and Badge; maps a PricingPlan array into a three-column grid.
 * KEY RULES: Must highlight popular plans with a badge and ring; must render a Link CTA when ctaHref is provided, otherwise an onClick button; must call onSelectPlan for button CTAs.
 * DEPENDS ON: react, next/link, ./Container, ./Card, ./Button, ./Badge.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
'use client';

import React from 'react';
import Link from 'next/link';
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

/**
 * WHAT IT DOES: Renders a pricing section with a centered heading/subtitle and a responsive grid of plan cards, each with optional popular highlighting and a CTA.
 * @param {PricingProps} props - Section title, optional subtitle, plans array, and optional onSelectPlan callback for button CTAs
 * @return {JSX.Element} - Rendered pricing section
 * SIDE EFFECTS: Invokes onSelectPlan when a plan's button CTA is clicked (only when no ctaHref is provided).
 * ASSUMES: onSelectPlan is provided when plans use button CTAs; ctaHref values are valid internal routes when provided.
 */
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
                <Button
                  asChild
                  variant={plan.popular ? 'primary' : 'secondary'}
                  className={`w-full py-2.5 font-semibold ${
                    !plan.popular && 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <Link href={plan.ctaHref}>
                    {plan.ctaText || 'Get Started'}
                  </Link>
                </Button>
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
