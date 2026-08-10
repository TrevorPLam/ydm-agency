/**
 * FILE: Badge.tsx
 * PURPOSE: Renders a small, styled status badge with variant classes.
 * ARCHITECTURE: Design-system UI component using class-variance-authority and the cn utility for conditional class merging.
 * KEY RULES: This package is an orphaned/broken fork of packages/ui and is excluded from the pnpm workspace; do not modify the duplicated blocks.
 * DEPENDS ON: class-variance-authority, @ydm-agency/utils (cn), React.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ydm-agency/utils';

/**
 * WHAT IT DOES: Generates the Tailwind class string for a badge variant.
 * @param {VariantProps<typeof badgeVariants>} props – Selected badge variant.
 * @return {string} – A merged Tailwind class string.
 * SIDE EFFECTS: None.
 * ASSUMES: Tailwind CSS classes referenced in the variant object are present.
 */
const badgeVariants = cva(
  'text-xs font-medium px-2.5 py-0.5 rounded-full inline-flex items-center',
  {
    variants: {
      variant: {
        default: 'bg-surface border border-border text-text-secondary',
        accent: 'bg-accent text-background',
        outline: 'border border-accent text-accent bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

/**
 * WHAT IT DOES: Renders a small, styled badge using the selected CVA variant.
 * @param {BadgeProps} props – Badge children, variant, className, and extra span props.
 * @return {React.ReactElement} – The rendered badge element.
 * SIDE EFFECTS: None.
 * ASSUMES: Rendered within a React tree and the design-system Tailwind tokens are loaded.
 */
export const Badge: React.FC<BadgeProps> = ({ children, variant, className, ...props }) => {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
};

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './cn';

/**
 * WHAT IT DOES: Generates the Tailwind class string for a badge variant.
 * @param {VariantProps<typeof badgeVariants>} props – Selected badge variant.
 * @return {string} – A merged Tailwind class string.
 * SIDE EFFECTS: None.
 * ASSUMES: Tailwind CSS classes referenced in the variant object are present.
 */
const badgeVariants = cva(
  'text-xs font-medium px-2.5 py-0.5 rounded-full inline-flex items-center',
  {
    variants: {
      variant: {
        default: 'bg-surface border border-border text-text-secondary',
        accent: 'bg-accent text-background',
        outline: 'border border-accent text-accent bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

/**
 * WHAT IT DOES: Renders a small, styled badge using the selected CVA variant.
 * @param {BadgeProps} props – Badge children, variant, className, and extra span props.
 * @return {React.ReactElement} – The rendered badge element.
 * SIDE EFFECTS: None.
 * ASSUMES: Rendered within a React tree and the design-system Tailwind tokens are loaded.
 */
export const Badge: React.FC<BadgeProps> = ({ children, variant, className, ...props }) => {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
};
