/**
 * FILE: PricingEstimator.tsx
 * PURPOSE: Provides the multi-step PricingEstimator client component that guides users through situation, services, business size, timeline, and extras selection to produce a ballpark investment estimate.
 * ARCHITECTURE: Client component with step state and EstimatorInputs state; computes estimates via calculateEstimate (memoized); tracks analytics events per step; builds a prefilled /contact href from the result.
 * KEY RULES: Must validate initialSituation/initialServices against known configs; must clear extras that no longer apply when services change; must track pricing_estimator_* analytics events; estimate must be presented as a ballpark range, not a binding quote.
 * DEPENDS ON: react, next/link, lucide-react, @ydm-agency/ui (Container, Button), @ydm-agency/utils (cn), @ydm-agency/analytics (trackEvent), @/lib/pricing-estimator, @/lib/service-labels, @/lib/service-comparison-config.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Monitor,
  Search,
  BarChart3,
  Megaphone,
  Sparkles,
  PenTool,
  Zap,
  Star,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import { Container, Button } from '@ydm-agency/ui';
import { cn } from '@ydm-agency/utils';
import { trackEvent } from '@ydm-agency/analytics';
import {
  type EstimatorInputs,
  type EstimatorService,
  type EstimatorExtra,
  type BusinessSize,
  type Timeline,
  BUSINESS_SIZE_OPTIONS,
  TIMELINE_OPTIONS,
  ESTIMATOR_SERVICES,
  getDefaultServicesForSituation,
  getRelevantExtras,
  calculateEstimate,
  formatPriceRange,
  getProjectTypeForContact,
  buildContactMessage,
} from '@/lib/pricing-estimator';
import { SERVICE_LABELS } from '@/lib/service-labels';
import { COMPARISON_SCENARIOS } from '@/lib/service-comparison-config';

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'web-design': Monitor,
  seo: Search,
  analytics: BarChart3,
  'paid-ads': Megaphone,
  branding: Sparkles,
  content: PenTool,
  automation: Zap,
  reputation: Star,
};

type StepId = 'situation' | 'services' | 'business-size' | 'timeline' | 'extras' | 'result';

interface Step {
  id: StepId;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    id: 'situation',
    title: 'Current situation',
    description: 'Pick the option that best matches where the business is right now.',
  },
  {
    id: 'services',
    title: 'Services',
    description: 'Confirm or adjust the services you want an estimate for.',
  },
  {
    id: 'business-size',
    title: 'Business size',
    description: 'Scope affects the investment more than headcount alone.',
  },
  {
    id: 'timeline',
    title: 'Timeline',
    description: 'Flexible timing can reduce cost; rush work adds urgency.',
  },
  {
    id: 'extras',
    title: 'Add-ons',
    description: 'Optional extras that often come up during scoping.',
  },
  {
    id: 'result',
    title: 'Your estimate',
    description: 'This is a ballpark range, not a binding quote.',
  },
];

/**
 * WHAT IT DOES: Renders the lucide icon mapped to a service slug, or null if no icon is mapped.
 * @param {{ slug: string; className?: string }} props - Service slug and optional className for the icon
 * @return {JSX.Element | null} - Rendered icon, or null
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: SERVICE_ICONS maps known service slugs to lucide icon components.
 */
function ServiceIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = SERVICE_ICONS[slug];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
}

/**
 * WHAT IT DOES: Renders a progress bar showing the current step position out of the total steps.
 * @param {{ current: number; total: number }} props - Zero-based current step index and total step count
 * @return {JSX.Element} - Rendered progress bar (decorative, aria-hidden)
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: current is zero-based and less than total.
 */
function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = ((current + 1) / total) * 100;
  return (
    <div className="w-full h-1 bg-surface rounded-full overflow-hidden" aria-hidden="true">
      <div
        className="h-full bg-accent transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export interface PricingEstimatorProps {
  initialSituation?: string;
  initialServices?: string[];
}

/**
 * WHAT IT DOES: Renders the multi-step pricing estimator wizard, managing step navigation, input state, estimate calculation, analytics tracking, and a prefilled contact CTA.
 * @param {PricingEstimatorProps} props - Optional initialSituation and initialServices to prefill the wizard from query params
 * @return {JSX.Element} - Rendered estimator wizard with step content, progress bar, and navigation controls
 * SIDE EFFECTS: Tracks pricing_estimator_* analytics events on step changes and start; updates inputs state on user interaction; computes a memoized estimate and contact href.
 * ASSUMES: initialSituation/initialServices (when provided) are validated against COMPARISON_SCENARIOS and ESTIMATOR_SERVICES; falls back to defaults otherwise.
 */
export const PricingEstimator: React.FC<PricingEstimatorProps> = ({
  initialSituation,
  initialServices,
}) => {
  const initialSituationId =
    initialSituation && COMPARISON_SCENARIOS.some((s) => s.id === initialSituation)
      ? initialSituation
      : COMPARISON_SCENARIOS[0].id;

  const initialServiceSlugs =
    initialServices && initialServices.length > 0
      ? initialServices.filter((slug) => ESTIMATOR_SERVICES.some((s) => s.slug === slug))
      : getDefaultServicesForSituation(initialSituationId);

  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState<EstimatorInputs>(() => ({
    situation: initialSituationId,
    services: initialServiceSlugs,
    businessSize: 'small' as BusinessSize,
    timeline: 'standard' as Timeline,
    extras: [],
  }));

  const result = useMemo(() => calculateEstimate(inputs), [inputs]);
  const currentStep = STEPS[step];

  useEffect(() => {
    trackEvent({
      eventName: 'pricing_estimator_started',
      properties: {
        step: currentStep.id,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      const nextStep = step + 1;
      setStep(nextStep);
      trackEvent({
        eventName: 'pricing_estimator_step_changed',
        properties: {
          from: STEPS[step].id,
          to: STEPS[nextStep].id,
        },
      });
    }
  };

  const handleBack = () => {
    if (step > 0) {
      const prevStep = step - 1;
      setStep(prevStep);
      trackEvent({
        eventName: 'pricing_estimator_step_changed',
        properties: {
          from: STEPS[step].id,
          to: STEPS[prevStep].id,
        },
      });
    }
  };

  const handleStartOver = () => {
    setStep(0);
    setInputs({
      situation: COMPARISON_SCENARIOS[0].id,
      services: getDefaultServicesForSituation(COMPARISON_SCENARIOS[0].id),
      businessSize: 'small',
      timeline: 'standard',
      extras: [],
    });
    trackEvent({
      eventName: 'pricing_estimator_restarted',
      properties: {
        step: STEPS[0].id,
      },
    });
  };

  const canProceed = useMemo(() => {
    switch (currentStep.id) {
      case 'situation':
        return !!inputs.situation;
      case 'services':
        return inputs.services.length > 0;
      case 'business-size':
        return !!inputs.businessSize;
      case 'timeline':
        return !!inputs.timeline;
      case 'extras':
        return true;
      default:
        return false;
    }
  }, [currentStep.id, inputs]);

  const relevantExtras = useMemo(() => getRelevantExtras(inputs.services), [inputs.services]);

  const contactHref = useMemo(() => {
    const projectType = getProjectTypeForContact(inputs.services);
    const message = buildContactMessage(inputs, result);
    const params = new URLSearchParams();
    if (projectType) params.set('projectType', projectType);
    params.set('message', message);
    return `/contact?${params.toString()}`;
  }, [inputs, result]);

  const setSituation = (situationId: string) => {
    setInputs((prev) => ({
      ...prev,
      situation: situationId,
      services: getDefaultServicesForSituation(situationId),
    }));
  };

  const toggleService = (slug: string) => {
    setInputs((prev) => {
      const has = prev.services.includes(slug);
      const services = has ? prev.services.filter((s) => s !== slug) : [...prev.services, slug];
      // WHY: Clear extras that no longer apply when services change so the estimate only includes add-ons relevant to the selected services.
      const stillRelevant = new Set(getRelevantExtras(services).map((e) => e.id));
      const extras = prev.extras.filter((id) => stillRelevant.has(id));
      return { ...prev, services, extras };
    });
  };

  const toggleExtra = (id: string) => {
    setInputs((prev) => {
      const has = prev.extras.includes(id);
      return {
        ...prev,
        extras: has ? prev.extras.filter((e) => e !== id) : [...prev.extras, id],
      };
    });
  };

  const renderStep = () => {
    switch (currentStep.id) {
      case 'situation':
        return (
          <fieldset className="space-y-4">
            <legend className="sr-only">Select your current situation</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COMPARISON_SCENARIOS.map((scenario) => (
                <label
                  key={scenario.id}
                  className={cn(
                    'block rounded-xl border p-5 cursor-pointer transition-all focus-within:ring-2 focus-within:ring-accent',
                    inputs.situation === scenario.id
                      ? 'border-accent ring-2 ring-accent bg-surface'
                      : 'border-border bg-surface hover:border-text-secondary'
                  )}
                >
                  <input
                    type="radio"
                    name="situation"
                    value={scenario.id}
                    checked={inputs.situation === scenario.id}
                    onChange={() => setSituation(scenario.id)}
                    className="sr-only"
                  />
                  <span className="block font-display font-semibold text-text-primary mb-2">
                    {scenario.title}
                  </span>
                  <span className="block text-sm text-text-secondary leading-relaxed">
                    {scenario.description}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        );

      case 'services':
        return (
          <fieldset className="space-y-4">
            <legend className="sr-only">Select the services you want to estimate</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ESTIMATOR_SERVICES.map((service) => (
                <ServiceOption
                  key={service.slug}
                  service={service}
                  selected={inputs.services.includes(service.slug)}
                  onToggle={() => toggleService(service.slug)}
                />
              ))}
            </div>
            {inputs.services.length === 0 && (
              <p className="text-error text-sm" role="alert">
                Select at least one service to continue.
              </p>
            )}
          </fieldset>
        );

      case 'business-size':
        return (
          <fieldset className="space-y-4">
            <legend className="sr-only">Select your business size</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {BUSINESS_SIZE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    'block rounded-xl border p-5 cursor-pointer transition-all focus-within:ring-2 focus-within:ring-accent',
                    inputs.businessSize === option.value
                      ? 'border-accent ring-2 ring-accent bg-surface'
                      : 'border-border bg-surface hover:border-text-secondary'
                  )}
                >
                  <input
                    type="radio"
                    name="businessSize"
                    value={option.value}
                    checked={inputs.businessSize === option.value}
                    onChange={() => setInputs((prev) => ({ ...prev, businessSize: option.value }))}
                    className="sr-only"
                  />
                  <span className="block font-display font-semibold text-text-primary mb-2">
                    {option.label}
                  </span>
                  <span className="block text-sm text-text-secondary leading-relaxed">
                    {option.description}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        );

      case 'timeline':
        return (
          <fieldset className="space-y-4">
            <legend className="sr-only">Select your timeline</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TIMELINE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    'block rounded-xl border p-5 cursor-pointer transition-all focus-within:ring-2 focus-within:ring-accent',
                    inputs.timeline === option.value
                      ? 'border-accent ring-2 ring-accent bg-surface'
                      : 'border-border bg-surface hover:border-text-secondary'
                  )}
                >
                  <input
                    type="radio"
                    name="timeline"
                    value={option.value}
                    checked={inputs.timeline === option.value}
                    onChange={() => setInputs((prev) => ({ ...prev, timeline: option.value }))}
                    className="sr-only"
                  />
                  <span className="block font-display font-semibold text-text-primary mb-2">
                    {option.label}
                  </span>
                  <span className="block text-sm text-text-secondary leading-relaxed">
                    {option.description}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        );

      case 'extras':
        if (relevantExtras.length === 0) {
          return (
            <div className="text-text-secondary text-center py-8">
              <p className="text-lg mb-2">No common add-ons for the selected services.</p>
              <p className="text-sm">You can still get a ballpark estimate and ask about extras on the call.</p>
            </div>
          );
        }
        return (
          <fieldset className="space-y-4">
            <legend className="sr-only">Select optional add-ons</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relevantExtras.map((extra) => (
                <ExtraOption
                  key={extra.id}
                  extra={extra}
                  selected={inputs.extras.includes(extra.id)}
                  onToggle={() => toggleExtra(extra.id)}
                />
              ))}
            </div>
          </fieldset>
        );

      case 'result':
        return (
          <ResultStep
            inputs={inputs}
            result={result}
            contactHref={contactHref}
            onStartOver={handleStartOver}
          />
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-surface border-y border-border" aria-labelledby="estimator-title">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center md:text-left">
            <h2 id="estimator-title" className="text-3xl font-display font-bold text-text-primary mb-3">
              Estimate Your Project
            </h2>
            <p className="text-text-secondary text-lg">
              Answer a few quick questions and get a realistic ballpark range — no email required.
            </p>
          </div>

          <div
            className="bg-background border border-border rounded-xl p-6 md:p-8"
            role="region"
            aria-label="Pricing estimator"
          >
            {currentStep.id !== 'result' && (
              <div className="mb-8">
                <div className="flex items-center justify-between text-sm text-text-secondary mb-3">
                  <span aria-live="polite">Step {step + 1} of {STEPS.length - 1}</span>
                  <span>{currentStep.title}</span>
                </div>
                <ProgressBar current={step} total={STEPS.length - 1} />
                <p className="mt-4 text-text-secondary">{currentStep.description}</p>
              </div>
            )}

            {renderStep()}

            {currentStep.id !== 'result' && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  disabled={step === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  Back
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

function ServiceOption({
  service,
  selected,
  onToggle,
}: {
  service: EstimatorService;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      className={cn(
        'block rounded-xl border p-5 cursor-pointer transition-all focus-within:ring-2 focus-within:ring-accent',
        selected
          ? 'border-accent ring-2 ring-accent bg-surface'
          : 'border-border bg-surface hover:border-text-secondary'
      )}
    >
      <input
        type="checkbox"
        value={service.slug}
        checked={selected}
        onChange={onToggle}
        className="sr-only"
      />
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
          <ServiceIcon slug={service.slug} className="w-5 h-5 text-accent" />
        </div>
        <div>
          <span className="block font-display font-semibold text-text-primary mb-1">
            {service.title}
          </span>
          <span className="block text-sm text-text-secondary leading-relaxed">
            {service.description}
          </span>
        </div>
      </div>
    </label>
  );
}

function ExtraOption({
  extra,
  selected,
  onToggle,
}: {
  extra: EstimatorExtra;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      className={cn(
        'block rounded-xl border p-5 cursor-pointer transition-all focus-within:ring-2 focus-within:ring-accent',
        selected
          ? 'border-accent ring-2 ring-accent bg-surface'
          : 'border-border bg-surface hover:border-text-secondary'
      )}
    >
      <input
        type="checkbox"
        value={extra.id}
        checked={selected}
        onChange={onToggle}
        className="sr-only"
      />
      <span className="block font-display font-semibold text-text-primary mb-1">
        {extra.label}
      </span>
      <span className="block text-sm text-text-secondary leading-relaxed">
        {extra.description}
      </span>
      <span className="block text-sm text-accent mt-2">
        {formatPriceRange(extra.costLow, extra.costHigh)}
        {extra.isMonthly ? ' / month' : ' one-time'}
      </span>
    </label>
  );
}

function ResultStep({
  inputs,
  result,
  contactHref,
  onStartOver,
}: {
  inputs: EstimatorInputs;
  result: ReturnType<typeof calculateEstimate>;
  contactHref: string;
  onStartOver: () => void;
}) {
  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
