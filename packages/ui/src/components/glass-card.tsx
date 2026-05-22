import { cn } from "../utils"
import { HTMLAttributes } from "react"

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

export function GlassCard({ className, interactive = false, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        interactive ? "glass-card-interactive" : "glass-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
