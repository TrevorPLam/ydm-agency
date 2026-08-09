'use client';

import { useEffect } from 'react';
import { trackEvent } from '@ydm-agency/analytics';
import type { EducationLesson } from '@/lib/education-config';

interface EducationAnalyticsProps {
  eventType: 'lesson_view' | 'topic_view' | 'education_search' | 'lesson_filter';
  lesson?: EducationLesson;
  topic?: string;
  searchQuery?: string;
  filterLevel?: string;
}

export default function EducationAnalytics({
  eventType,
  lesson,
  topic,
  searchQuery,
  filterLevel,
}: EducationAnalyticsProps) {
  useEffect(() => {
    const properties: Record<string, any> = {
      event_category: 'education',
    };

    switch (eventType) {
      case 'lesson_view':
        if (lesson) {
          properties.lesson_slug = lesson.slug;
          properties.lesson_title = lesson.title;
          properties.lesson_topic = lesson.topic;
          properties.lesson_level = lesson.level;
          properties.lesson_read_time = lesson.readTime;
        }
        break;
      case 'topic_view':
        if (topic) {
          properties.topic = topic;
        }
        break;
      case 'education_search':
        if (searchQuery) {
          properties.search_query = searchQuery;
          properties.search_length = searchQuery.length;
        }
        break;
      case 'lesson_filter':
        if (filterLevel) {
          properties.filter_level = filterLevel;
        }
        break;
    }

    trackEvent({
      eventName: eventType,
      properties,
    });
  }, [eventType, lesson, topic, searchQuery, filterLevel]);

  return null;
}
