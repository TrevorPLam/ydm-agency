/**
 * FILE: Container.tsx
 * PURPOSE: Constrains content width and applies responsive horizontal padding.
 * ARCHITECTURE: Design-system layout utility centered with max-w-6xl and responsive padding.
 * KEY RULES: This package is an orphaned/broken fork of packages/ui and is excluded from the pnpm workspace; do not modify the duplicated blocks.
 * DEPENDS ON: @ydm-agency/utils (cn), React.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import React from 'react';
import { cn } from '@ydm-agency/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * WHAT IT DOES: Renders a centered, full-width container with responsive horizontal padding.
 * @param {ContainerProps} props – Container children, className, and extra div props.
 * @return {React.ReactElement} – The rendered container div.
 * SIDE EFFECTS: None.
 * ASSUMES: Tailwind CSS includes max-w-6xl and responsive padding utilities.
 */
export const Container: React.FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn('max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full', className)} {...props}>
      {children}
    </div>
  );
};

import React from 'react';
import { cn } from './cn';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * WHAT IT DOES: Renders a centered, full-width container with responsive horizontal padding.
 * @param {ContainerProps} props – Container children, className, and extra div props.
 * @return {React.ReactElement} – The rendered container div.
 * SIDE EFFECTS: None.
 * ASSUMES: Tailwind CSS includes max-w-6xl and responsive padding utilities.
 */
export const Container: React.FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn('max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full', className)} {...props}>
      {children}
    </div>
  );
};
