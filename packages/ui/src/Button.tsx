/**
 * FILE: Button.tsx
 * PURPOSE: Provides the Button component and its variant styles for the design system.
 * ARCHITECTURE: shadcn/ui-style button built on class-variance-authority (cva) for variant management and Radix Slot for asChild composition; forwards ref to the underlying button element.
 * KEY RULES: Must support primary/secondary/ghost variants and default/sm/lg/icon sizes; must forward refs; must merge caller className via cn() without losing variant classes.
 * DEPENDS ON: react, class-variance-authority, @radix-ui/react-slot, @ydm-agency/utils (cn).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@ydm-agency/utils';

/**
 * WHAT IT DOES: Defines the button's class variants (primary/secondary/ghost, default/sm/lg/icon sizes) with accessible focus-visible ring styles and disabled state handling.
 * @return {string} - Resolved class string for a given variant/size combination
 * SIDE EFFECTS: None (pure cva definition).
 * ASSUMES: Tailwind design-system tokens (accent, background, border, surface, text-primary, text-secondary) are configured.
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-background hover:bg-accent-hover hover:shadow-glow',
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
 * WHAT IT DOES: Renders a button element (or a Radix Slot-wrapped child when asChild is set) with resolved variant/size classes and forwarded ref.
 * @param {ButtonProps} props - Button attributes plus variant, size, asChild, and className overrides
 * @return {JSX.Element} - Rendered button or Slot element
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: When asChild is true, a single child element is provided to Slot.
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
