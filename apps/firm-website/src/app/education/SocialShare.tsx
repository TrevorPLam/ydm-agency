/**
 * FILE: SocialShare.tsx
 * PURPOSE: Provides a client-side social share component with Twitter, LinkedIn, and copy-link actions, tracking lesson_share and lesson_share_link_copy analytics events.
 * ARCHITECTURE: Client component using useState for the copied state; builds Twitter/LinkedIn share URLs from the title and url; copies the link to the clipboard and tracks analytics events.
 * KEY RULES: Must open share links in a new tab with rel="noopener noreferrer"; must track lesson_share on platform clicks and lesson_share_link_copy on copy; must reset the copied state after 2 seconds.
 * DEPENDS ON: react, lucide-react, @ydm-agency/analytics (trackEvent).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
'use client';

import { useState } from 'react';
import { Twitter, Linkedin, Link2, Check } from 'lucide-react';
import { trackEvent } from '@ydm-agency/analytics';

interface SocialShareProps {
  title: string;
  url: string;
}

/**
 * WHAT IT DOES: Renders social share buttons (Twitter, LinkedIn, copy link) and tracks share analytics events on interaction.
 * @param {SocialShareProps} props - Lesson title and canonical URL to share
 * @return {JSX.Element} - Rendered social share bar
 * SIDE EFFECTS: Opens share URLs in new tabs; copies the URL to the clipboard on copy; tracks lesson_share and lesson_share_link_copy analytics events.
 * ASSUMES: navigator.clipboard is available in the user's browser.
 */
export default function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      trackEvent({
        eventName: 'lesson_share_link_copy',
        properties: {
          event_category: 'education',
          lesson_title: title,
          lesson_url: url,
        },
      });
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (platform: string) => {
    trackEvent({
      eventName: 'lesson_share',
      properties: {
        event_category: 'education',
        share_platform: platform,
        lesson_title: title,
        lesson_url: url,
      },
    });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-text-secondary mr-2">Share:</span>
      
      <a
        href={shareUrls.twitter}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleShare('twitter')}
        className="p-2 rounded-lg bg-surface hover:bg-surface/80 text-text-secondary hover:text-text-primary transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      
      <a
        href={shareUrls.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleShare('linkedin')}
        className="p-2 rounded-lg bg-surface hover:bg-surface/80 text-text-secondary hover:text-text-primary transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      
      <button
        onClick={handleCopyLink}
        className="p-2 rounded-lg bg-surface hover:bg-surface/80 text-text-secondary hover:text-text-primary transition-colors"
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="w-4 h-4 text-accent" />
        ) : (
          <Link2 className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
