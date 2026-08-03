import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './cn';

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

export const Badge: React.FC<BadgeProps> = ({ children, variant, className, ...props }) => {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
};
