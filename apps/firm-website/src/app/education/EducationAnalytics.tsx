/**
 * FILE: EducationAnalytics.tsx
 * PURPOSE: Provides a client component that fires education analytics events (lesson_view, topic_view, education_search, lesson_filter) on mount via trackEvent.
 * ARCHITECTURE: Client component using a useEffect to call trackEvent with event_category 'education' and event-specific properties; renders nothing.
 * KEY RULES: Must render null; must only fire on mount (or when the relevant props change); must include event_category 'education' on every event.
 * DEPENDS ON: react, @ydm-agency/analytics (trackEvent), @/lib/education-config (EducationLesson type).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
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

/**
 * WHAT IT DOES: Fires an education analytics event on mount (and when props change) with event-specific properties, then renders nothing.
 * @param {EducationAnalyticsProps} props - Event type and optional lesson/topic/searchQuery/filterLevel context
 * @return {null} - Renders nothing
 * SIDE EFFECTS: Calls trackEvent on mount and when eventType/lesson/topic/searchQuery/filterLevel change.
 * ASSUMES: trackEvent is consent-gated by the analytics provider.
 */
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
