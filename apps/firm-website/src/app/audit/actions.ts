'use server';

import { headers } from 'next/headers';
import { sendEmail } from '@ydm-agency/email';
import { auditFormSchema, type AuditFormInput } from '@/lib/audit-schema';
import { createClient } from '@supabase/supabase-js';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

interface SubmitAuditResult {
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
      limiter: Ratelimit.slidingWindow(5, '1h'), // 5 submissions per hour
      analytics: true,
    })
  : null;

const marketingStateLabels: Record<string, string> = {
  'no-website': 'No website yet',
  'website-no-traffic': 'Website exists but gets little traffic',
  'traffic-no-leads': 'Traffic exists but few leads',
  'leads-now': 'Need leads quickly',
  'automation-mess': 'Leads slip through the cracks',
  'unsure': 'Not sure where to start',
};

export async function submitAudit(data: AuditFormInput): Promise<SubmitAuditResult> {
  const parsed = auditFormSchema.safeParse(data);

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
      // Continue without rate limiting if there is an error
    }
  }

  // Fail-closed for storage: if Supabase is not configured, do not silently no-op.
  if (!supabase) {
    return {
      success: false,
      error: 'Submission storage is not configured. Please try again later.',
    };
  }

  const { name, email, website, challenge, marketingState } = parsed.data;
  const marketingStateLabel = marketingStateLabels[marketingState] ?? marketingState;

  const message = [
    `Free marketing audit request from ${name} (${email}).`,
    `Website: ${website}`,
    `Biggest challenge: ${challenge}`,
    `Current marketing state: ${marketingStateLabel}`,
    'A structured audit will be delivered with findings and recommended next steps.',
  ].join('\n\n');

  // Attempt to store the lead first, but do not block email on storage failure.
  let storageError: string | null = null;
  try {
    const { error: supabaseError } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        project_type: 'Free Marketing Audit',
        message,
        source: 'audit',
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

  // Test seam for E2E runs: skip real Resend calls when RESEND_API_KEY is 'test'.
  if (process.env.RESEND_API_KEY === 'test') {
    return { success: true };
  }

  const result = await sendEmail({
    name,
    email,
    projectType: 'Free Marketing Audit',
    message,
  });

  if (result.success) {
    if (storageError) {
      console.warn('Audit submission stored with storage failure:', storageError);
    }
    return { success: true };
  }

  return {
    success: false,
    error: result.error ?? 'Failed to submit the audit request. Please try again.',
  };
}
