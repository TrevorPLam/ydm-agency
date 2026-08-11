/**
 * FILE: BusinessSizeStep.tsx
 * PURPOSE: Renders the business size selection step of the pricing estimator.
 */
'use client';

import React from 'react';
import { cn } from '@ydm-agency/utils';
import { BUSINESS_SIZE_OPTIONS, type BusinessSize } from '@/lib/pricing-estimator';

interface BusinessSizeStepProps {
  value: BusinessSize;
  onChange: (value: BusinessSize) => void;
}

/**
 * WHAT IT DOES: Renders a radio grid for selecting business size.
 * @param {BusinessSizeStepProps} props - Current value and change handler
 * @return {JSX.Element} - Rendered business size step
 * SIDE EFFECTS: None.
 */
export function BusinessSizeStep({ value, onChange }: BusinessSizeStepProps): React.JSX.Element {
  return (
    <fieldset className="space-y-4">
      <legend className="sr-only">Select your business size</legend>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BUSINESS_SIZE_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={cn(
              'block rounded-xl border p-5 cursor-pointer transition-all focus-within:ring-2 focus-within:ring-accent',
              value === option.value
                ? 'border-accent ring-2 ring-accent bg-surface'
                : 'border-border bg-surface hover:border-text-secondary'
            )}
          >
            <input
              type="radio"
              name="businessSize"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
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
}
