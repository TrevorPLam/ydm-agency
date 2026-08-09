'use client';

import { useState } from 'react';
import { Badge } from '@ydm-agency/ui';
import { Filter, X } from 'lucide-react';
import type { EducationLesson } from '@/lib/education-config';
import { trackEvent } from '@ydm-agency/analytics';

interface LessonFilterProps {
  lessons: EducationLesson[];
  onFilteredLessons: (lessons: EducationLesson[]) => void;
}

export default function LessonFilter({ lessons, onFilteredLessons }: LessonFilterProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'] as const;

  const handleFilterChange = (level: string) => {
    setSelectedLevel(level);
    
    // Track filter change
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
      <div className="flex flex-wrap gap-2">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => handleFilterChange(level)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              selectedLevel === level
                ? 'bg-accent text-background'
                : 'bg-surface text-text-secondary hover:bg-surface/80 hover:text-text-primary'
            }`}
          >
            {level === 'all' ? 'All Levels' : level}
          </button>
        ))}
      </div>
      {selectedLevel !== 'all' && (
        <button
          onClick={clearFilter}
          className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <X className="w-4 h-4" />
          Clear filter
        </button>
      )}
    </div>
  );
}
