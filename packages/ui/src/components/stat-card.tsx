import { cn } from "../utils";

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className="text-3xl md:text-4xl font-bold text-primary mb-2" data-testid="stat-value">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
