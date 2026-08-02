import Link from 'next/link';
import { Container } from '@ydm-agency/ui';
import { cn } from '@ydm-agency/utils';

interface ServiceSubnavProps {
  slug: string;
  active: 'overview' | 'deliverables' | 'process' | 'faq';
}

const ITEMS = [
  { key: 'overview' as const, label: 'Overview', href: (slug: string) => `/services/${slug}` },
  { key: 'deliverables' as const, label: 'What You Get', href: (slug: string) => `/services/${slug}/deliverables` },
  { key: 'process' as const, label: 'Process', href: (slug: string) => `/services/${slug}/process` },
  { key: 'faq' as const, label: 'FAQ', href: (slug: string) => `/services/${slug}/faq` },
];

export function ServiceSubnav({ slug, active }: ServiceSubnavProps) {
  return (
    <nav className="border-b border-border bg-surface" aria-label="Service sections">
      <Container>
        <div className="flex gap-6 md:gap-8 overflow-x-auto">
          {ITEMS.map((item) => {
            const isActive = item.key === active;
            return (
              <Link
                key={item.key}
                href={item.href(slug)}
                className={cn(
                  'whitespace-nowrap py-4 text-sm font-medium transition-colors border-b-2 -mb-px',
                  isActive
                    ? 'text-accent border-accent'
                    : 'text-text-secondary border-transparent hover:text-text-primary'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </Container>
    </nav>
  );
}
