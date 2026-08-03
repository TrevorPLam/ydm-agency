import React from 'react';
import { cn } from './cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

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
