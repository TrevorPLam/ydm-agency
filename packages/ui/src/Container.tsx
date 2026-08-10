/**
 * FILE: Container.tsx
 * PURPOSE: Provides the Container component that constrains page content to the max-w-6xl (1152px) content width with responsive horizontal padding.
 * ARCHITECTURE: Presentational wrapper that centers content and applies responsive padding via Tailwind utilities, merging caller className with cn().
 * KEY RULES: Must enforce the max-w-6xl max content width per the design system; must apply responsive horizontal padding; must merge caller className without dropping base styles.
 * DEPENDS ON: react, @ydm-agency/utils (cn).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import React from 'react';
import { cn } from '@ydm-agency/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * WHAT IT DOES: Renders a centered, max-width content container with responsive horizontal padding.
 * @param {ContainerProps} props - Children content plus div attributes and className override
 * @return {JSX.Element} - Styled div container
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: Tailwind max-w-6xl and responsive px-* utilities are configured.
 */
export const Container: React.FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn('max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full', className)} {...props}>
      {children}
    </div>
  );
};
