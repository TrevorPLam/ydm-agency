/**
 * FILE: Button.tsx
 * PURPOSE: Renders a polymorphic button with size and variant classes.
 * ARCHITECTURE: Design-system UI component using class-variance-authority and Radix Slot for the asChild pattern.
 * KEY RULES: This package is an orphaned/broken fork of packages/ui and is excluded from the pnpm workspace; do not modify the duplicated blocks.
 * DEPENDS ON: class-variance-authority, @radix-ui/react-slot, @ydm-agency/utils (cn), React.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@ydm-agency/utils';

/**
 * WHAT IT DOES: Generates the Tailwind class string for a button variant and size.
 * @param {VariantProps<typeof buttonVariants>} props – Selected button variant and size.
 * @return {string} – A merged Tailwind class string.
 * SIDE EFFECTS: None.
 * ASSUMES: Tailwind CSS classes referenced in the variant object are present.
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-background hover:bg-accent-hover hover:shadow-[0_0_20px_rgba(74,228,168,0.3)]',
        secondary: 'border border-border text-text-primary hover:bg-surface hover:border-accent',
        ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * WHAT IT DOES: Renders a polymorphic button or slotted element with the selected variant and size.
 * @param {ButtonProps} props – Button props including variant, size, asChild, className, and ref.
 * @return {React.ReactElement | null} – The rendered button or child element.
 * SIDE EFFECTS: None.
 * ASSUMES: Used within a React client component tree; cn merges classes without conflicts.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from './cn';

/**
 * WHAT IT DOES: Generates the Tailwind class string for a button variant and size.
 * @param {VariantProps<typeof buttonVariants>} props – Selected button variant and size.
 * @return {string} – A merged Tailwind class string.
 * SIDE EFFECTS: None.
 * ASSUMES: Tailwind CSS classes referenced in the variant object are present.
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-background hover:bg-accent-hover',
        secondary: 'border border-border text-text-primary hover:bg-surface hover:border-accent',
        ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * WHAT IT DOES: Renders a polymorphic button or slotted element with the selected variant and size.
 * @param {ButtonProps} props – Button props including variant, size, asChild, className, and ref.
 * @return {React.ReactElement | null} – The rendered button or child element.
 * SIDE EFFECTS: None.
 * ASSUMES: Used within a React client component tree; cn merges classes without conflicts.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
