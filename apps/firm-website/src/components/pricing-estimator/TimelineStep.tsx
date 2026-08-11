/**
 * FILE: TimelineStep.tsx
 * PURPOSE: Renders the timeline selection step of the pricing estimator.
 */
'use client';

import React from 'react';
import { cn } from '@ydm-agency/utils';
import { TIMELINE_OPTIONS, type Timeline } from '@/lib/pricing-estimator';

interface TimelineStepProps {
  value: Timeline;
  onChange: (value: Timeline) => void;
}

/**
 * WHAT IT DOES: Renders a radio grid for selecting project timeline.
 * @param {TimelineStepProps} props - Current value and change handler
 * @return {JSX.Element} - Rendered timeline step
 * SIDE EFFECTS: None.
 */
export function TimelineStep({ value, onChange }: TimelineStepProps): React.JSX.Element {
  return (
    <fieldset className="space-y-4">
      <legend className="sr-only">Select your timeline</legend>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TIMELINE_OPTIONS.map((option) => (
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
              name="timeline"
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
