import { cn } from "../utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeader({ title, description, className, align = "center" }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-4 mb-16",
        align === "center" && "text-center",
        align === "left" && "text-left",
        align === "right" && "text-right",
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {description && (
        <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}
