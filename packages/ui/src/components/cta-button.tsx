import { cn } from "../utils"
import { ButtonHTMLAttributes, forwardRef } from "react"
import { ArrowRight } from "lucide-react"

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  variant?: "primary" | "ghost"
  children: React.ReactNode
}

export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, href, variant = "primary", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0080FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50"
    
    const variantStyles = {
      primary: "bg-[#0080FF] text-white hover:bg-[#0080FF]/90 hover:shadow-[0_0_24px_rgba(0,128,255,0.4)] active:scale-[0.96]",
      ghost: "text-[#0080FF] hover:bg-[#0080FF]/10 hover:text-[#0080FF]/80"
    }

    const buttonContent = (
      <>
        {children}
        {variant === "primary" && <ArrowRight className="ml-2 h-4 w-4" />}
      </>
    )

    if (href) {
      return (
        <a
          href={href}
          className={cn(baseStyles, variantStyles[variant], "px-6 py-3 text-base", className)}
        >
          {buttonContent}
        </a>
      )
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], "px-6 py-3 text-base", className)}
        {...props}
      >
        {buttonContent}
      </button>
    )
  }
)

CTAButton.displayName = "CTAButton"
