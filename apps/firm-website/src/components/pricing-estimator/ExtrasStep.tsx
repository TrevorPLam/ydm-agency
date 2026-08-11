/**
 * FILE: ExtrasStep.tsx
 * PURPOSE: Renders the optional add-ons selection step of the pricing estimator.
 */
'use client';

import React from 'react';
import { cn } from '@ydm-agency/utils';
import { formatPriceRange, type EstimatorExtra } from '@/lib/pricing-estimator';

interface ExtrasStepProps {
  relevantExtras: EstimatorExtra[];
  selected: string[];
  onToggle: (id: string) => void;
}

/**
 * WHAT IT DOES: Renders a checkbox grid for selecting relevant add-ons.
 * @param {ExtrasStepProps} props - Relevant extras, selected ids, and toggle handler
 * @return {JSX.Element} - Rendered extras step
 * SIDE EFFECTS: None.
 */
export function ExtrasStep({ relevantExtras, selected, onToggle }: ExtrasStepProps): React.JSX.Element {
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
            selected={selected.includes(extra.id)}
            onToggle={() => onToggle(extra.id)}
          />
        ))}
      </div>
    </fieldset>
  );
}

interface ExtraOptionProps {
  extra: EstimatorExtra;
  selected: boolean;
  onToggle: () => void;
}

function ExtraOption({ extra, selected, onToggle }: ExtraOptionProps): React.JSX.Element {
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
