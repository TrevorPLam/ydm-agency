/**
 * FILE: PricingEstimator.tsx
 * PURPOSE: Provides the multi-step PricingEstimator client component that guides users through situation, services, business size, timeline, and extras selection to produce a ballpark investment estimate.
 * ARCHITECTURE: Client component with step state and EstimatorInputs state; computes estimates via calculateEstimate (memoized); tracks analytics events per step; builds a prefilled /contact href from the result.
 * KEY RULES: Must validate initialSituation/initialServices against known configs; must clear extras that no longer apply when services change; must track pricing_estimator_* analytics events; estimate must be presented as a ballpark range, not a binding quote.
 * DEPENDS ON: react, lucide-react, @ydm-agency/ui (Container, Button), @ydm-agency/analytics (trackEvent), @/lib/pricing-estimator, @/lib/service-comparison-config, ./pricing-estimator step components.
 * LAST UPDATED: 2026-08-10 Refactor into step components and remove React.FC
 */
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Container, Button } from '@ydm-agency/ui';
import { trackEvent } from '@ydm-agency/analytics';
import {
  type EstimatorInputs,
  type BusinessSize,
  type Timeline,
  ESTIMATOR_SERVICES,
  BUSINESS_SIZE_OPTIONS,
  TIMELINE_OPTIONS,
  getDefaultServicesForSituation,
  getRelevantExtras,
  calculateEstimate,
  getProjectTypeForContact,
  buildContactMessage,
} from '@/lib/pricing-estimator';
import { COMPARISON_SCENARIOS } from '@/lib/service-comparison-config';
import {
  ProgressBar,
  SituationStep,
  ServicesStep,
  BusinessSizeStep,
  TimelineStep,
  ExtrasStep,
  ResultStep,
} from './pricing-estimator';

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
export function PricingEstimator({ initialSituation, initialServices }: PricingEstimatorProps): React.JSX.Element {
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
    businessSize: 'small',
    timeline: 'standard',
    extras: [],
  }));

  const result = useMemo(() => calculateEstimate(inputs), [inputs]);
  const currentStep = STEPS[step];

  const hasStartedRef = useRef(false);
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackEvent({
      eventName: 'pricing_estimator_started',
      properties: {
        step: currentStep.id,
      },
    });
  }, [currentStep.id]);

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
        return <SituationStep value={inputs.situation} onChange={setSituation} />;
      case 'services':
        return <ServicesStep selected={inputs.services} onToggle={toggleService} />;
      case 'business-size':
        return (
          <BusinessSizeStep
            value={inputs.businessSize}
            onChange={(value: BusinessSize) => setInputs((prev) => ({ ...prev, businessSize: value }))}
          />
        );
      case 'timeline':
        return (
          <TimelineStep
            value={inputs.timeline}
            onChange={(value: Timeline) => setInputs((prev) => ({ ...prev, timeline: value }))}
          />
        );
      case 'extras':
        return <ExtrasStep relevantExtras={relevantExtras} selected={inputs.extras} onToggle={toggleExtra} />;
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
}
