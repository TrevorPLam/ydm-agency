/**
 * FILE: ServiceIcon.tsx
 * PURPOSE: Renders the lucide icon mapped to a service slug, or null if no icon is mapped.
 * ARCHITECTURE: Pure rendering helper used by ServicesStep.
 * KEY RULES: SERVICE_ICONS maps known service slugs to lucide icon components.
 * DEPENDS ON: react, lucide-react.
 */
'use client';

import React from 'react';
import {
  Monitor,
  Search,
  BarChart3,
  Megaphone,
  Sparkles,
  PenTool,
  Zap,
  Star,
} from 'lucide-react';

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'web-design': Monitor,
  seo: Search,
  analytics: BarChart3,
  'paid-ads': Megaphone,
  branding: Sparkles,
  content: PenTool,
  automation: Zap,
  reputation: Star,
};

interface ServiceIconProps {
  slug: string;
  className?: string;
}

/**
 * WHAT IT DOES: Renders the icon for a given service slug, or null when unmapped.
 * @param {ServiceIconProps} props - Service slug and optional className
 * @return {JSX.Element | null} - Rendered icon, or null
 * SIDE EFFECTS: None.
 * ASSUMES: SERVICE_ICONS contains the expected slugs.
 */
export function ServiceIcon({ slug, className }: ServiceIconProps): React.JSX.Element | null {
  const Icon = SERVICE_ICONS[slug];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
}
