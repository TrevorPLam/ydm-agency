/**
 * FILE: TopicContent.tsx
 * PURPOSE: Provides a client-side topic content component that renders a LessonFilter and the filtered list of lesson cards for a topic.
 * ARCHITECTURE: Client component using useState for the filtered lessons; renders LessonFilter and a list of lesson cards with safety/level badges; shows an empty state when no lessons match.
 * KEY RULES: Must use the firm-level impersonal voice; lesson cards must link to /education/[topic]/[slug]; must show an empty state when the filtered list is empty.
 * DEPENDS ON: react, next/link, @ydm-agency/ui (Card, Badge, Container), lucide-react, ../LessonFilter, @/lib/education-config (EducationLesson type).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Badge, Container } from '@ydm-agency/ui';
import { GraduationCap } from 'lucide-react';
import LessonFilter from '../LessonFilter';
import type { EducationLesson } from '@/lib/education-config';

interface TopicContentProps {
  lessons: EducationLesson[];
}

/**
 * WHAT IT DOES: Maps a lesson safety classification to a Badge variant for display.
 * @param {EducationLesson['safety']} safety - Lesson safety classification
 * @return {'default' | 'accent' | 'outline'} - Badge variant
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: safety is one of the configured safety values.
 */
function getSafetyBadgeVariant(safety: EducationLesson['safety']): 'default' | 'accent' | 'outline' {
  switch (safety) {
    case 'public-domain':
      return 'accent';
    case 'cite-creator':
      return 'outline';
    case 'extra-care':
      return 'default';
    default:
      return 'default';
  }
}

/**
 * WHAT IT DOES: Maps a lesson safety classification to a human-readable label for display.
 * @param {EducationLesson['safety']} safety - Lesson safety classification
 * @return {string} - Display label
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: safety is one of the configured safety values.
 */
function getSafetyLabel(safety: EducationLesson['safety']): string {
  switch (safety) {
    case 'public-domain':
      return 'Public Domain';
    case 'cite-creator':
      return 'Cite Creator';
    case 'extra-care':
      return 'Use Care';
    default:
      return 'Use Care';
  }
}

/**
 * WHAT IT DOES: Renders a LessonFilter and the filtered list of lesson cards for a topic, with an empty state when no lessons match.
 * @param {TopicContentProps} props - Full lessons list for the topic
 * @return {JSX.Element} - Rendered filterable lesson list
 * SIDE EFFECTS: Updates filteredLessons state when the filter changes.
 * ASSUMES: lessons is the full list for the topic; LessonFilter calls back with the filtered subset.
 */
export default function TopicContent({ lessons }: TopicContentProps) {
  const [filteredLessons, setFilteredLessons] = useState(lessons);

  return (
    <>
      {/* Lessons List */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl">
            <LessonFilter lessons={lessons} onFilteredLessons={setFilteredLessons} />
            
            {filteredLessons.length > 0 ? (
              <div className="space-y-6">
                {filteredLessons.map((lesson) => (
                  <Link
                    key={lesson.slug}
                    href={`/education/${lesson.topic.toLowerCase()}/${lesson.slug}`}
                    className="block group"
                  >
                    <Card className="p-6 transition-colors group-hover:border-accent">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline">{lesson.topic}</Badge>
                            <Badge variant="default">{lesson.level}</Badge>
                            <Badge variant={getSafetyBadgeVariant(lesson.safety)}>
                              {getSafetyLabel(lesson.safety)}
                            </Badge>
                          </div>
                          <h2 className="text-xl font-display font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                            {lesson.title}
                          </h2>
                          <p className="text-text-secondary text-sm leading-relaxed mb-4">
                            {lesson.summary}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-text-secondary">
                            <span>{lesson.readTime} read</span>
                            <span>•</span>
                            <span className="italic">{lesson.attribution}</span>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-accent/10 flex-shrink-0">
                          <GraduationCap className="w-6 h-6 text-accent" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-text-secondary text-lg">
                  No lessons available in this topic yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
