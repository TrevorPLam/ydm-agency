/**
 * FILE: ResultStep.tsx
 * PURPOSE: Renders the estimate result step of the pricing estimator.
 */
'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@ydm-agency/ui';
import { trackEvent } from '@ydm-agency/analytics';
import {
  type EstimatorInputs,
  type EstimateResult,
  BUSINESS_SIZE_OPTIONS,
  TIMELINE_OPTIONS,
  getRelevantExtras,
  formatPriceRange,
} from '@/lib/pricing-estimator';
import { SERVICE_LABELS } from '@/lib/service-labels';
import { COMPARISON_SCENARIOS } from '@/lib/service-comparison-config';

interface ResultStepProps {
  inputs: EstimatorInputs;
  result: EstimateResult;
  contactHref: string;
  onStartOver: () => void;
}

/**
 * WHAT IT DOES: Renders the estimate result, summary, and CTA, and fires the completed analytics event.
 * @param {ResultStepProps} props - Inputs, calculated result, contact href, and restart handler
 * @return {JSX.Element} - Rendered result step
 * SIDE EFFECTS: Tracks `pricing_estimator_completed` once when the result step mounts.
 */
export function ResultStep({ inputs, result, contactHref, onStartOver }: ResultStepProps): React.JSX.Element {
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (hasTrackedRef.current) return;
    hasTrackedRef.current = true;
    trackEvent({
      eventName: 'pricing_estimator_completed',
      properties: {
        situation: inputs.situation,
        services: inputs.services.join(','),
        businessSize: inputs.businessSize,
        timeline: inputs.timeline,
        extras: inputs.extras.join(','),
        oneTimeLow: result.oneTime?.low,
        oneTimeHigh: result.oneTime?.high,
        monthlyLow: result.monthly?.low,
        monthlyHigh: result.monthly?.high,
      },
    });
  }, [inputs, result]);

  const scenario = COMPARISON_SCENARIOS.find((s) => s.id === inputs.situation);

  return (
    <div className="space-y-8" aria-live="polite">
      <div className="text-center">
        <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
          Your ballpark estimate
        </h3>
        {scenario && (
          <p className="text-text-secondary mb-4">
            Suggested starting point: <span className="text-text-primary font-medium">{scenario.startingPoint}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {result.oneTime && (
          <div className="bg-surface border border-border rounded-xl p-6 text-center">
            <p className="text-sm text-text-secondary uppercase tracking-wide mb-2">One-time investment</p>
            <p className="text-3xl md:text-4xl font-display font-bold text-text-primary">
              {formatPriceRange(result.oneTime.low, result.oneTime.high)}
            </p>
          </div>
        )}
        {result.monthly && (
          <div className="bg-surface border border-border rounded-xl p-6 text-center">
            <p className="text-sm text-text-secondary uppercase tracking-wide mb-2">Monthly investment</p>
            <p className="text-3xl md:text-4xl font-display font-bold text-text-primary">
              {formatPriceRange(result.monthly.low, result.monthly.high)}
            </p>
          </div>
        )}
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <h4 className="text-lg font-display font-semibold text-text-primary mb-4">What drives this range</h4>
        <ul className="space-y-3 text-sm text-text-secondary">
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
            <span>
              <strong className="text-text-primary">Services selected:</strong>{' '}
              {inputs.services.map((slug) => SERVICE_LABELS[slug]).join(', ')}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
            <span>
              <strong className="text-text-primary">Business size:</strong>{' '}
              {BUSINESS_SIZE_OPTIONS.find((o) => o.value === inputs.businessSize)?.label}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
            <span>
              <strong className="text-text-primary">Timeline:</strong>{' '}
              {TIMELINE_OPTIONS.find((o) => o.value === inputs.timeline)?.label}
            </span>
          </li>
          {inputs.extras.length > 0 && (
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
              <span>
                <strong className="text-text-primary">Add-ons:</strong>{' '}
                {inputs.extras
                  .map((id) => getRelevantExtras(inputs.services).find((e) => e.id === id)?.label ?? id)
                  .join(', ')}
              </span>
            </li>
          )}
        </ul>
      </div>

      <div className="text-text-secondary text-sm space-y-2">
        <p>
          This is a ballpark range based on the selections above. A free project outline gives you a
          transparent, scoped estimate before any commitment.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-border">
        <Button variant="primary" size="lg" asChild className="w-full sm:w-auto">
          <Link
            href={contactHref}
            onClick={() =>
              trackEvent({
                eventName: 'pricing_estimator_cta_clicked',
                properties: { href: '/contact' },
              })
            }
            className="flex items-center justify-center gap-2"
          >
            Get a Free Project Outline
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={onStartOver}
          className="w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          Start over
        </Button>
      </div>
    </div>
  );
}
