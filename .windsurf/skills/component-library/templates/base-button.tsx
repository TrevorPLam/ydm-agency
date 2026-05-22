import { forwardRef } from 'react'
import { tokens } from './design-tokens'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        style={{
          backgroundColor: variant === 'primary' ? tokens.colors.primary : tokens.colors.neutral[100],
          padding: tokens.spacing[size],
          borderRadius: '0.375rem',
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}
