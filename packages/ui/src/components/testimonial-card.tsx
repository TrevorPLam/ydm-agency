import { cn } from "../utils";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company?: string;
  className?: string;
}

export function TestimonialCard({ quote, author, role, company, className }: TestimonialCardProps) {
  return (
    <div className={cn("p-6 rounded-lg border bg-card", className)}>
      <blockquote className="mb-4 text-muted-foreground">"{quote}"</blockquote>
      <div>
        <div className="font-semibold">{author}</div>
        <div className="text-sm text-muted-foreground">
          {role}
          {company && <span> at {company}</span>}
        </div>
      </div>
    </div>
  );
}
