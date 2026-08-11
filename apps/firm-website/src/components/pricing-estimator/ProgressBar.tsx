/**
 * FILE: ProgressBar.tsx
 * PURPOSE: Decorative progress bar for the pricing estimator wizard.
 * ARCHITECTURE: Pure presentational component.
 */
'use client';

import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

/**
 * WHAT IT DOES: Renders a progress bar showing the current step position out of the total steps.
 * @param {ProgressBarProps} props - Zero-based current step index and total step count
 * @return {JSX.Element} - Rendered progress bar (decorative, aria-hidden)
 * SIDE EFFECTS: None.
 * ASSUMES: current is zero-based and less than total.
 */
export function ProgressBar({ current, total }: ProgressBarProps): React.JSX.Element {
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
