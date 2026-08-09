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

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Initialize Upstash rate limiter
const ratelimit = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, '1h'), // 5 submissions per hour
      analytics: true,
    })
  : null;

export async function submitContact(data: ContactFormInput): Promise<SubmitContactResult> {
  // Server-side validation
  const parsed = contactFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues.map((issue) => issue.message).join(', '),
    };
  }

  // Rate limiting
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
      // Continue without rate limiting if there's an error
    }
  }

  const { name, email, projectType, message } = parsed.data;

  // Store lead in Supabase
  if (supabase) {
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
        return {
          success: false,
          error: 'Failed to store your information. Please try again.',
        };
      }
    } catch (error) {
      console.error('Supabase insertion error:', error);
      return {
        success: false,
        error: 'Failed to store your information. Please try again.',
      };
    }
  }

  // Map project type to label for email
  const projectTypeLabels: Record<string, string> = {
    'website': 'Website & brand',
    'traffic-leads': 'Traffic & leads',
    'other': "Other / I'm not sure",
  };

  const projectTypeLabel = projectType ? projectTypeLabels[projectType] : 'Not specified';

  // Send emails via Resend
  const emailMessage = [
    `Contact form submission from ${name} (${email}).`,
    `Project Type: ${projectTypeLabel}`,
    '',
    'Message:',
    message,
  ].join('\n');

  // Test seam for E2E runs: skip real Resend calls when RESEND_API_KEY is 'test'.
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
    return { success: true };
  }

  return {
    success: false,
    error: result.error ?? 'Failed to submit your message. Please try again.',
  };
}
