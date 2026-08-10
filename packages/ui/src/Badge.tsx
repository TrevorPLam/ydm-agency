/**
 * FILE: Badge.tsx
 * PURPOSE: Provides the Badge component for small status/category labels with variant styling.
 * ARCHITECTURE: shadcn/ui-style badge built on class-variance-authority (cva) for variant management; renders a span with merged variant and caller classes.
 * KEY RULES: Must support default/accent/outline variants; must merge caller className via cn() without losing variant classes; must render as an inline-flex span.
 * DEPENDS ON: react, class-variance-authority, @ydm-agency/utils (cn).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ydm-agency/utils';

/**
 * WHAT IT DOES: Defines the badge's class variants (default/accent/outline) with shared pill-shaped base styles.
 * @return {string} - Resolved class string for a given variant
 * SIDE EFFECTS: None (pure cva definition).
 * ASSUMES: Tailwind design-system tokens (surface, border, accent, background, text-secondary) are configured.
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
 * WHAT IT DOES: Renders a span badge with the resolved variant classes and caller overrides.
 * @param {BadgeProps} props - Children content, variant, plus span attributes and className override
 * @return {JSX.Element} - Styled span badge element
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: None.
 */
export const Badge: React.FC<BadgeProps> = ({ children, variant, className, ...props }) => {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
};
