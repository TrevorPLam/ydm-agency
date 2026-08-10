/**
 * FILE: TableOfContents.tsx
 * PURPOSE: Provides a client-side sticky table of contents that tracks the active section via IntersectionObserver and supports smooth-scroll navigation.
 * ARCHITECTURE: Client component using useState/useEffect; observes #section-<index> elements with an IntersectionObserver and highlights the active section; renders a sticky aside on xl+ screens.
 * KEY RULES: Must clean up the IntersectionObserver on unmount; must use the section-${index} id convention to match the lesson page's section ids; must smooth-scroll on click.
 * DEPENDS ON: react, lucide-react (List).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
'use client';

import { useState, useEffect } from 'react';
import { List } from 'lucide-react';

interface TableOfContentsProps {
  sections: Array<{ heading: string }>;
}

/**
 * WHAT IT DOES: Renders a sticky table of contents that highlights the active section via IntersectionObserver and smooth-scrolls to sections on click.
 * @param {TableOfContentsProps} props - Array of lesson sections with headings
 * @return {JSX.Element} - Rendered sticky table of contents (xl+ only)
 * SIDE EFFECTS: Creates and disconnects an IntersectionObserver; calls scrollIntoView on click.
 * ASSUMES: The lesson page renders section elements with id="section-<index>".
 */
export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('');

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
    }
  };

  return (
    <aside className="hidden xl:block w-64 border-l border-border pl-8 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <List className="w-4 h-4 text-text-secondary" />
        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
          Contents
        </h3>
      </div>
      <nav className="space-y-2">
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`block w-full text-left py-2 px-3 rounded-md text-sm transition-colors ${
              activeSection === `section-${index}`
                ? 'bg-accent/10 text-accent font-medium'
                : 'text-text-secondary hover:bg-surface hover:text-text-primary'
            }`}
          >
            {section.heading}
          </button>
        ))}
      </nav>
    </aside>
  );
}
