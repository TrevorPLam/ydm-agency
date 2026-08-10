/**
 * FILE: actions.ts
 * PURPOSE: Server action for handling contact form submissions with validation, rate limiting, Supabase storage, and Resend email integration.
 * ARCHITECTURE: Next.js Server Action that validates input, enforces rate limits, stores leads in Supabase, and sends transactional emails via Resend.
 * KEY RULES: Fail-closed for Supabase configuration; rate limit 5 submissions/hour per IP; non-blocking storage failure; test seam for E2E with RESEND_API_KEY='test'.
 * DEPENDS ON: @ydm-agency/forms (validation schema), @ydm-agency/email (Resend integration), @supabase/supabase-js (lead storage), @upstash/ratelimit (rate limiting).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
'use server';

import { headers } from 'next/headers';
import { sendEmail } from '@ydm-agency/email';
import { contactFormSchema, type ContactFormInput } from '@ydm-agency/forms';
import { createClient } from '@supabase/supabase-js';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

interface SubmitContactResult {
  success: boolean;
  error?: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : null;

const ratelimit = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, '1h'),
      analytics: true,
    })
  : null;

/**
 * WHAT IT DOES: Validates contact form input, enforces rate limits, stores lead data in Supabase, and sends acknowledgment/notification emails via Resend.
 * @param {ContactFormInput} data - Form submission data with name, email, projectType, message, and honeypot field
 * @return {SubmitContactResult} - Success status with optional error message
 * SIDE EFFECTS: Inserts record into Supabase 'leads' table, sends two emails via Resend API, logs errors to console.
 * ASSUMES: Supabase client is initialized (fail-closed if not), Upstash Redis is available for rate limiting (degraded if not).
 */
export async function submitContact(data: ContactFormInput): Promise<SubmitContactResult> {
  const parsed = contactFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues.map((issue) => issue.message).join(', '),
    };
  }

  if (ratelimit) {
    try {
      const headersList = await headers();
      const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';

      const { success } = await ratelimit.limit(ip);

      if (!success) {
        return {
          success: false,
          error: 'Too many submissions. Please try again later.',
        };
      }
    } catch (error) {
      console.error('Rate limiting error:', error);
      // WHY: Continue without rate limiting if there's an error to prevent service disruption when Redis is unavailable
    }
  }

  // WHY: Fail-closed for storage - if Supabase is not configured, do not silently no-op to prevent data loss
  if (!supabase) {
    return {
      success: false,
      error: 'Submission storage is not configured. Please try again later.',
    };
  }

  const { name, email, projectType, message } = parsed.data;

  // WHY: Map project type to human-readable label for email content
  const projectTypeLabels: Record<string, string> = {
    'website': 'Website & brand',
    'traffic-leads': 'Traffic & leads',
    'other': "Other / I'm not sure",
  };

  const projectTypeLabel = projectType ? projectTypeLabels[projectType] : 'Not specified';

  const emailMessage = [
    `Contact form submission from ${name} (${email}).`,
    `Project Type: ${projectTypeLabel}`,
    '',
    'Message:',
    message,
  ].join('\n');

  // WHY: Attempt to store the lead first, but do not block email on storage failure to ensure user receives acknowledgment even if database is down
  let storageError: string | null = null;
  try {
    const { error: supabaseError } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        project_type: projectType || null,
        message,
        source: 'website',
        status: 'new',
        created_at: new Date().toISOString(),
      });

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      storageError = 'Failed to store your information. Please try again.';
    }
  } catch (error) {
    console.error('Supabase insertion error:', error);
    storageError = 'Failed to store your information. Please try again.';
  }

  // WHY: Test seam for E2E runs - skip real Resend calls when RESEND_API_KEY is 'test' to avoid sending emails during testing
  if (process.env.RESEND_API_KEY === 'test') {
    return { success: true };
  }

  const result = await sendEmail({
    name,
    email,
    projectType: projectTypeLabel,
    message: emailMessage,
  });

  if (result.success) {
    if (storageError) {
      console.warn('Contact submission stored with storage failure:', storageError);
    }
    return { success: true };
  }

  return {
    success: false,
    error: result.error ?? 'Failed to submit your message. Please try again.',
  };
}
