/**
 * FILE: Card.tsx
 * PURPOSE: Renders a themed surface card with a hover lift effect.
 * ARCHITECTURE: Design-system layout component applying Tailwind background, border, and shadow utilities.
 * KEY RULES: This package is an orphaned/broken fork of packages/ui and is excluded from the pnpm workspace; do not modify the duplicated blocks.
 * DEPENDS ON: @ydm-agency/utils (cn), React.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import React from 'react';
import { cn } from '@ydm-agency/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * WHAT IT DOES: Renders a themed surface card with a hover lift and merged className.
 * @param {CardProps} props – Card children, className, and extra div props.
 * @return {React.ReactElement} – The rendered card element.
 * SIDE EFFECTS: None.
 * ASSUMES: Tailwind CSS tokens bg-surface, border-border, and shadow utilities are configured.
 */
export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-surface border border-border rounded-xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

import React from 'react';
import { cn } from './cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * WHAT IT DOES: Renders a themed surface card with a hover lift and merged className.
 * @param {CardProps} props – Card children, className, and extra div props.
 * @return {React.ReactElement} – The rendered card element.
 * SIDE EFFECTS: None.
 * ASSUMES: Tailwind CSS tokens bg-surface, border-border, and shadow utilities are configured.
 */
export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-surface border border-border rounded-xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
