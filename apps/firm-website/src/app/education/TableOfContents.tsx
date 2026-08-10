/**
 * FILE: TableOfContents.tsx
 * PURPOSE: Provides a client-side table of contents for lesson pages with desktop sticky navigation and a mobile off-canvas fallback.
 * ARCHITECTURE: Client component using useState/useEffect; observes #section-<index> elements with an IntersectionObserver and highlights the active section; desktop TOC is a sticky aside on xl+ screens; mobile TOC is an off-canvas panel triggered by a floating button below xl.
 * KEY RULES: Must clean up the IntersectionObserver on unmount; must use the section-${index} id convention to match the lesson page's section ids; must use anchor links for in-page navigation; must provide a mobile fallback; must expose aria-current and aria-label for accessibility.
 * DEPENDS ON: react, lucide-react (List).
 * LAST UPDATED: 2026-08-09 Convert to anchors, add ARIA, add mobile off-canvas
 */
'use client';

import { useState, useEffect } from 'react';
import { List } from 'lucide-react';

interface TableOfContentsProps {
  sections: Array<{ heading: string }>;
}

/**
 * WHAT IT DOES: Renders a table of contents with anchor links, active-section tracking, and a mobile off-canvas fallback.
 * @param {TableOfContentsProps} props - Array of lesson sections with headings
 * @return {JSX.Element} - Rendered TOC for desktop and mobile
 * SIDE EFFECTS: Creates and disconnects an IntersectionObserver; scrolls to sections on click.
 * ASSUMES: The lesson page renders section elements with id="section-<index>".
 */
export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach((_, index) => {
      const element = document.getElementById(`section-${index}`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((_, index) => {
        const element = document.getElementById(`section-${index}`);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sections]);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile off-canvas trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open table of contents"
        className="fixed bottom-4 right-4 z-40 xl:hidden flex items-center gap-2 px-4 py-2 bg-accent text-background rounded-full shadow-lg"
      >
        <List className="w-4 h-4" />
        <span className="text-sm font-medium">Contents</span>
      </button>

      {/* Mobile off-canvas panel */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-background/80 z-40 xl:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed right-0 top-0 bottom-0 w-80 max-w-[80vw] bg-surface border-l border-border z-50 p-6 overflow-y-auto xl:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Table of contents"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                Contents
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close table of contents"
                className="text-2xl text-text-secondary hover:text-text-primary leading-none"
              >
                ×
              </button>
            </div>
            <TableOfContentsNav
              sections={sections}
              activeSection={activeSection}
              onSelect={scrollToSection}
            />
          </div>
        </>
      )}

      {/* Desktop sticky aside */}
      <aside className="hidden xl:block w-64 border-l border-border pl-8 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <List className="w-4 h-4 text-text-secondary" />
          <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
            Contents
          </h3>
        </div>
        <TableOfContentsNav
          sections={sections}
          activeSection={activeSection}
          onSelect={scrollToSection}
        />
      </aside>
    </>
  );
}

interface TableOfContentsNavProps {
  sections: Array<{ heading: string }>;
  activeSection: string;
  onSelect: (index: number) => void;
}

/**
 * WHAT IT DOES: Renders the shared <nav> list of anchor links for the table of contents.
 * @param {TableOfContentsNavProps} props - Sections, active section id, and click handler
 * @return {JSX.Element} - Rendered <nav> with anchor links
 * SIDE EFFECTS: Calls onSelect and prevents default anchor navigation on click.
 * ASSUMES: Anchor hrefs match the section-${index} id convention.
 */
function TableOfContentsNav({ sections, activeSection, onSelect }: TableOfContentsNavProps) {
  return (
    <nav aria-label="Table of contents" className="space-y-2">
      {sections.map((section, index) => {
        const isActive = activeSection === `section-${index}`;
        return (
          <a
            key={index}
            href={`#section-${index}`}
            onClick={(e) => {
              e.preventDefault();
              onSelect(index);
            }}
            aria-current={isActive ? 'true' : undefined}
            className={`block w-full text-left py-2 px-3 rounded-md text-sm transition-colors ${
              isActive
                ? 'bg-accent/10 text-accent font-medium'
                : 'text-text-secondary hover:bg-surface hover:text-text-primary'
            }`}
          >
            {section.heading}
          </a>
        );
      })}
    </nav>
  );
}
