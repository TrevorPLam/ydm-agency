/**
 * FILE: Card.tsx
 * PURPOSE: Provides the Card component family (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter) for structured content panels.
 * ARCHITECTURE: Composable presentational components following the shadcn/ui Card pattern; each sub-component renders a semantic element with design-system classes merged via cn().
 * KEY RULES: Must preserve spread props onto the underlying DOM element; must merge caller className via cn() without dropping base styles; CardTitle renders an h3, CardDescription renders a p.
 * DEPENDS ON: react, @ydm-agency/utils (cn).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import React from 'react';
import { cn } from '@ydm-agency/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * WHAT IT DOES: Renders the outer card container with surface background, border, rounded corners, and hover lift/shadow effect.
 * @param {CardProps} props - Children content plus div attributes and className override
 * @return {JSX.Element} - Styled div card container
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: Tailwind surface/border/accent tokens are configured.
 */
export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-surface border border-border rounded-xl text-text-primary transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * WHAT IT DOES: Renders the card header region with vertical flex layout and padding.
 * @param {CardHeaderProps} props - Children content plus div attributes and className override
 * @return {JSX.Element} - Styled div header container
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: None.
 */
export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('flex flex-col gap-2 p-6', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

/**
 * WHAT IT DOES: Renders the card title as an h3 heading with display font and primary text color.
 * @param {CardTitleProps} props - Children content plus heading attributes and className override
 * @return {JSX.Element} - Styled h3 title element
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: The Clash Display font variable (--font-display) is applied by an ancestor.
 */
export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3
      className={cn(
        'text-xl font-semibold leading-tight tracking-tight font-display text-text-primary',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

/**
 * WHAT IT DOES: Renders the card description as a paragraph with secondary text color and small font size.
 * @param {CardDescriptionProps} props - Children content plus paragraph attributes and className override
 * @return {JSX.Element} - Styled p description element
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: None.
 */
export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={cn('text-sm text-text-secondary', className)}
      {...props}
    >
      {children}
    </p>
  );
};

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * WHAT IT DOES: Renders the card body content region with padding (no top padding to sit flush under the header).
 * @param {CardContentProps} props - Children content plus div attributes and className override
 * @return {JSX.Element} - Styled div content container
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: None.
 */
export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * WHAT IT DOES: Renders the card footer region with horizontal flex layout and padding (no top padding).
 * @param {CardFooterProps} props - Children content plus div attributes and className override
 * @return {JSX.Element} - Styled div footer container
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: None.
 */
export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  );
};
