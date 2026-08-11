/**
 * FILE: ServicesStep.tsx
 * PURPOSE: Renders the services selection step of the pricing estimator.
 */
'use client';

import React from 'react';
import { cn } from '@ydm-agency/utils';
import { ESTIMATOR_SERVICES, type EstimatorService } from '@/lib/pricing-estimator';
import { ServiceIcon } from './ServiceIcon';

interface ServicesStepProps {
  selected: string[];
  onToggle: (slug: string) => void;
}

/**
 * WHAT IT DOES: Renders a checkbox grid for selecting estimator services.
 * @param {ServicesStepProps} props - Selected service slugs and toggle handler
 * @return {JSX.Element} - Rendered services step
 * SIDE EFFECTS: None.
 */
export function ServicesStep({ selected, onToggle }: ServicesStepProps): React.JSX.Element {
  return (
    <fieldset className="space-y-4">
      <legend className="sr-only">Select the services you want to estimate</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ESTIMATOR_SERVICES.map((service) => (
          <ServiceOption
            key={service.slug}
            service={service}
            selected={selected.includes(service.slug)}
            onToggle={() => onToggle(service.slug)}
          />
        ))}
      </div>
      {selected.length === 0 && (
        <p className="text-error text-sm" role="alert">
          Select at least one service to continue.
        </p>
      )}
    </fieldset>
  );
}

interface ServiceOptionProps {
  service: EstimatorService;
  selected: boolean;
  onToggle: () => void;
}

function ServiceOption({ service, selected, onToggle }: ServiceOptionProps): React.JSX.Element {
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
