/**
 * FILE: ServiceSubnav.tsx
 * PURPOSE: Provides the ServiceSubnav component — a tabbed sub-navigation bar for service spoke pages (overview, deliverables, process, faq).
 * ARCHITECTURE: Server component rendering a horizontally scrollable nav inside a Container; highlights the active section via aria-current and accent styling using cn().
 * KEY RULES: Must highlight the active section with aria-current="page"; must use the four canonical section keys; links must follow the /services/[slug]/<section> pattern.
 * DEPENDS ON: next/link, @ydm-agency/ui (Container), @ydm-agency/utils (cn).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
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

/**
 * WHAT IT DOES: Renders the service sub-navigation with links to the overview, deliverables, process, and FAQ sections, highlighting the active section.
 * @param {ServiceSubnavProps} props - Service slug and the active section key
 * @return {JSX.Element} - Rendered sub-navigation bar
 * SIDE EFFECTS: None (pure rendering component).
 * ASSUMES: slug corresponds to a valid service; active matches one of the four section keys.
 */
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
