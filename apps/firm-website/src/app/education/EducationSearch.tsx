/**
 * FILE: EducationSearch.tsx
 * PURPOSE: Provides a client-side education search box that debounces queries and calls the searchLessons Server Action.
 * ARCHITECTURE: Client component using useState/useTransition and useEffect; debounces input by 300ms; tracks an education_search analytics event on each debounced non-empty query; renders matching lesson cards when showResults is true.
 * KEY RULES: Must only call searchLessons after a 300ms debounce; must track education_search after debounce for non-empty queries; must provide a11y labels and semantic search role; must link results to /education/[topic]/[slug].
 * DEPENDS ON: react, next/link, lucide-react, @ydm-agency/ui (Card, Badge), @ydm-agency/analytics (trackEvent), @/lib/education-config, ./search-actions (searchLessons).
 * LAST UPDATED: 2026-08-09 Fix prop usage, debounce, a11y, and analytics
 */
'use client';

import { Search, GraduationCap } from 'lucide-react';
import { EDUCATION_LESSONS } from '@/lib/education-config';
import { useState, useTransition, useEffect } from 'react';
import Link from 'next/link';
import { Card, Badge } from '@ydm-agency/ui';
import { searchLessons } from './search-actions';
import { trackEvent } from '@ydm-agency/analytics';

interface EducationSearchProps {
  showResults?: boolean;
  compact?: boolean;
}

/**
 * WHAT IT DOES: Renders a debounced education search input with optional results list, calling the searchLessons Server Action.
 * @param {EducationSearchProps} props - showResults (default true) and compact (default false) display options
 * @return {JSX.Element} - Rendered search form and optional results list
 * SIDE EFFECTS: Calls searchLessons Server Action after 300ms debounce; tracks an education_search analytics event on each non-empty debounced query.
 * ASSUMES: searchLessons returns EducationLesson[] matching the query.
 */
export default function EducationSearch({ showResults = true, compact = false }: EducationSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLessons, setFilteredLessons] = useState(EDUCATION_LESSONS);
  const [isPending, startTransition] = useTransition();

  // WHY: Debounce the server action and analytics by 300ms so we don't search or track on every keystroke
  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmed = searchQuery.trim();
      if (trimmed.length > 0) {
        trackEvent({
          eventName: 'education_search',
          properties: {
            event_category: 'education',
            search_query: trimmed,
            search_length: trimmed.length,
          },
        });
      }

      startTransition(async () => {
        const results = await searchLessons(searchQuery);
        setFilteredLessons(results);
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery, startTransition]);

  return (
    <>
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className={`relative ${compact ? 'max-w-lg' : 'max-w-2xl'} mx-auto`}
      >
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
        <input
          id="education-search"
          type="search"
          aria-label="Search lessons and topics"
          placeholder="Search lessons and topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors"
        />
      </form>

      {/* Search Results */}
      {showResults && searchQuery && (
        <div className="mt-12">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-2">
              Search Results
            </h2>
            <p className="text-text-secondary">
              Found {filteredLessons.length} lessons matching &quot;{searchQuery}&quot;
            </p>
          </div>

          {isPending ? (
            <div className="text-center py-12">
              <p className="text-text-secondary text-lg">Searching...</p>
            </div>
          ) : filteredLessons.length > 0 ? (
            <div className="space-y-4">
              {filteredLessons.map((lesson) => (
                <Link
                  key={lesson.slug}
                  href={`/education/${lesson.topic.toLowerCase()}/${lesson.slug}`}
                  className="block group"
                >
                  <Card className="p-6 transition-colors group-hover:border-accent">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{lesson.topic}</Badge>
                          <Badge variant="default">{lesson.level}</Badge>
                        </div>
                        <h3 className="text-lg font-display font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                          {lesson.title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed mb-3">
                          {lesson.summary}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-text-secondary">
                          <span>{lesson.readTime} read</span>
                          <span>•</span>
                          <span className="italic">{lesson.attribution}</span>
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-surface">
                        <GraduationCap className="w-5 h-5 text-text-secondary" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary text-lg">
                No lessons found matching your search. Try different keywords or browse topics below.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
