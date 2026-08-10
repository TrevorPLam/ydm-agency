/**
 * FILE: LessonFilter.tsx
 * PURPOSE: Provides a client-side level filter (All/Beginner/Intermediate/Advanced) for lesson lists, calling back with the filtered list and tracking a lesson_filter analytics event.
 * ARCHITECTURE: Client component using useState for the selected level; calls onFilteredLessons with the filtered list and tracks a lesson_filter analytics event on change.
 * KEY RULES: Must track a lesson_filter analytics event on every filter change; must provide a clear-filter control; must support an 'all' option that returns the full list; must use the shared Button component and expose ARIA pressed/radiogroup state.
 * DEPENDS ON: react, @ydm-agency/ui (Button), lucide-react, @ydm-agency/analytics (trackEvent), @/lib/education-config (EducationLesson type).
 * LAST UPDATED: 2026-08-09 Fix a11y and remove unused Badge import
 */
'use client';

import { useState } from 'react';
import { Button } from '@ydm-agency/ui';
import { Filter, X } from 'lucide-react';
import type { EducationLesson } from '@/lib/education-config';
import { trackEvent } from '@ydm-agency/analytics';

interface LessonFilterProps {
  lessons: EducationLesson[];
  onFilteredLessons: (lessons: EducationLesson[]) => void;
}

/**
 * WHAT IT DOES: Renders a level filter bar (All/Beginner/Intermediate/Advanced) and calls onFilteredLessons with the filtered list, tracking a lesson_filter analytics event on change.
 * @param {LessonFilterProps} props - Full lessons list and an onFilteredLessons callback
 * @return {JSX.Element} - Rendered filter bar with optional clear-filter control
 * SIDE EFFECTS: Calls onFilteredLessons with the filtered list; tracks a lesson_filter analytics event on change.
 * ASSUMES: lesson.level matches one of the canonical level labels.
 */
export default function LessonFilter({ lessons, onFilteredLessons }: LessonFilterProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'] as const;

  const handleFilterChange = (level: string) => {
    setSelectedLevel(level);

    trackEvent({
      eventName: 'lesson_filter',
      properties: {
        event_category: 'education',
        filter_level: level,
      },
    });

    if (level === 'all') {
      onFilteredLessons(lessons);
    } else {
      onFilteredLessons(lessons.filter(lesson => lesson.level === level));
    }
  };

  const clearFilter = () => {
    setSelectedLevel('all');
    onFilteredLessons(lessons);
  };

  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-text-secondary" />
        <span className="text-sm font-medium text-text-primary">Filter by level:</span>
      </div>
      <div
        role="radiogroup"
        aria-label="Filter by level"
        className="flex flex-wrap gap-2"
      >
        {levels.map((level) => {
          const isActive = selectedLevel === level;
          const label = level === 'all' ? 'All Levels' : level;
          return (
            <Button
              key={level}
              type="button"
              variant={isActive ? 'primary' : 'ghost'}
              size="sm"
              aria-pressed={isActive}
              onClick={() => handleFilterChange(level)}
              className={`h-auto py-1.5 text-sm ${
                isActive
                  ? 'hover:shadow-none'
                  : 'bg-surface text-text-secondary hover:bg-surface/80 hover:text-text-primary'
              }`}
            >
              {label}
            </Button>
          );
        })}
      </div>
      {selectedLevel !== 'all' && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={clearFilter}
          className="h-auto px-0 gap-1 justify-start text-text-secondary hover:text-text-primary"
        >
          <X className="w-4 h-4" />
          Clear filter
        </Button>
      )}
    </div>
  );
}
