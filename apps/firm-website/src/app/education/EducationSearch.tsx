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

export default function EducationSearch({ showResults = true, compact = false }: EducationSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLessons, setFilteredLessons] = useState(EDUCATION_LESSONS);
  const [isPending, startTransition] = useTransition();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0 && !hasSearched) {
      setHasSearched(true);
      trackEvent({
        eventName: 'education_search',
        properties: {
          event_category: 'education',
          search_query: query,
          search_length: query.length,
        },
      });
    }
    startTransition(async () => {
      const results = await searchLessons(query);
      setFilteredLessons(results);
    });
  };

  return (
    <>
      <div className={`relative ${compact ? 'max-w-lg' : 'max-w-2xl'} mx-auto`}>
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
        <input
          type="text"
          placeholder="Search lessons and topics..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Search Results */}
      {searchQuery && (
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