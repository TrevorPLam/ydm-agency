import { cn } from "../utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "muted" | "hero-gradient" | "dark" | "gradient";
}

export function Section({ children, className, id, variant = "default" }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-32 px-4 sm:px-6 lg:px-8",
        variant === "muted" && "bg-muted/50",
        variant === "hero-gradient" && "bg-gradient-to-b from-black to-[var(--accent)]/20",
        variant === "dark" && "bg-black",
        variant === "gradient" && "bg-gradient-to-b from-black to-[var(--accent)]/20",
        className
      )}
    >
      <div className="container mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
