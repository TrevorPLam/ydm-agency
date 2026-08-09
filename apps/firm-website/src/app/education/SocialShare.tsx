'use client';

import { useState } from 'react';
import { Twitter, Linkedin, Link2, Check } from 'lucide-react';
import { trackEvent } from '@ydm-agency/analytics';

interface SocialShareProps {
  title: string;
  url: string;
}

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
