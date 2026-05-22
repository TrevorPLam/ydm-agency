import { cn } from "../utils";
import { ArrowRight } from "lucide-react";

interface PortfolioCardProps {
  title: string;
  description: string;
  metrics?: string;
  image?: string;
  href: string;
  className?: string;
}

export function PortfolioCard({ title, description, metrics, image, href, className }: PortfolioCardProps) {
  return (
    <a
      href={href}
      className={cn(
        "group block p-6 rounded-lg border bg-card hover:shadow-lg transition-all",
        className
      )}
    >
      {image && (
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          {metrics ? (
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{metrics}</div>
            </div>
          ) : null}
        </div>
      )}
      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center text-sm font-medium text-primary">
        View Project
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </a>
  );
}
