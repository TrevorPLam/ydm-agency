/**
 * FILE: actions.test.ts
 * PURPOSE: Unit test the audit form Server Action.
 * ARCHITECTURE: Vitest test suite in the audit route; mocks Supabase, Upstash rate limiting, Redis, email sending, and Next.js headers.
 * KEY RULES: Keep mock environment variables consistent with actions.ts; do not rely on real network calls.
 * DEPENDS ON: ./actions, vitest, @supabase/supabase-js, @upstash/ratelimit, @upstash/redis, @ydm-agency/email, next/headers
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

const insertFn = vi.hoisted(() => vi.fn());
const ratelimitFn = vi.hoisted(() => vi.fn());
const sendEmailFn = vi.hoisted(() => vi.fn());
const headersFn = vi.hoisted(() => vi.fn());

vi.hoisted(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';
  process.env.UPSTASH_REDIS_REST_URL = 'https://example.upstash.io';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token';
});

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      insert: insertFn,
    })),
  })),
}));

vi.mock('@upstash/ratelimit', () => {
  const slidingWindow = vi.fn();
  const Ratelimit = Object.assign(vi.fn(() => ({ limit: ratelimitFn })), {
    slidingWindow,
  });
  return { Ratelimit, slidingWindow };
});

vi.mock('@upstash/redis', () => ({
  Redis: { fromEnv: vi.fn() },
}));

vi.mock('@ydm-agency/email', () => ({
  sendEmail: sendEmailFn,
}));

vi.mock('next/headers', () => ({
  headers: headersFn,
}));

import { submitAudit } from './actions';

const validInput = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  website: 'https://example.com',
  challenge: 'Traffic is low and conversions are even lower than expected.',
  marketingState: 'traffic-no-leads' as const,
  _honeypot: '' as const,
};

describe('submitAudit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    insertFn.mockReset();
    insertFn.mockResolvedValue({ error: null });
    ratelimitFn.mockReset();
    ratelimitFn.mockResolvedValue({ success: true });
    sendEmailFn.mockReset();
    sendEmailFn.mockResolvedValue({ success: true });
    headersFn.mockReset();
    headersFn.mockResolvedValue(new Headers());
  });

  it('returns validation errors for invalid data', async () => {
    const result = await submitAudit({
      name: 'J',
      email: 'not-an-email',
      website: 'invalid',
      challenge: 'short',
      marketingState: 'traffic-no-leads',
      _honeypot: '' as const,
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/name/i);
    expect(result.error).toMatch(/email/i);
    expect(result.error).toMatch(/website/i);
    expect(result.error).toMatch(/challenge/i);
    expect(insertFn).not.toHaveBeenCalled();
    expect(sendEmailFn).not.toHaveBeenCalled();
  });

  it('returns rate limit error when limit is exceeded', async () => {
    ratelimitFn.mockResolvedValue({ success: false });

    const result = await submitAudit(validInput);

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/too many submissions/i);
    expect(insertFn).not.toHaveBeenCalled();
    expect(sendEmailFn).not.toHaveBeenCalled();
  });

  it('returns error when Supabase is not configured', async () => {
    const prevUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const prevKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    vi.resetModules();
    const { submitAudit: submitAuditNoSupabase } = await import('./actions');

    const result = await submitAuditNoSupabase(validInput);

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/not configured/i);
    expect(insertFn).not.toHaveBeenCalled();
    expect(sendEmailFn).not.toHaveBeenCalled();

    process.env.NEXT_PUBLIC_SUPABASE_URL = prevUrl;
    process.env.SUPABASE_SERVICE_ROLE_KEY = prevKey;
  });

  it('still sends email when Supabase insert fails', async () => {
    insertFn.mockResolvedValue({ error: { message: 'Database error' } });

    const result = await submitAudit(validInput);

    expect(result.success).toBe(true);
    expect(insertFn).toHaveBeenCalled();
    expect(sendEmailFn).toHaveBeenCalled();
  });

  it('still sends email when Supabase insert throws', async () => {
    insertFn.mockRejectedValue(new Error('Connection refused'));

    const result = await submitAudit(validInput);

    expect(result.success).toBe(true);
    expect(insertFn).toHaveBeenCalled();
    expect(sendEmailFn).toHaveBeenCalled();
  });

  it('returns error when sendEmail fails', async () => {
    sendEmailFn.mockResolvedValue({ success: false, error: 'Resend API error' });

    const result = await submitAudit(validInput);

    expect(result.success).toBe(false);
    expect(result.error).toBe('Resend API error');
    expect(sendEmailFn).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'jane@example.com',
      projectType: 'Free Marketing Audit',
      message: expect.stringContaining('Free marketing audit request from Jane Doe'),
    });
  });

  it('returns success when storage and email succeed', async () => {
    const result = await submitAudit(validInput);

    expect(result.success).toBe(true);
    expect(insertFn).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'jane@example.com',
      project_type: 'Free Marketing Audit',
      message: expect.stringContaining('Free marketing audit request from Jane Doe'),
      source: 'audit',
      status: 'new',
      created_at: expect.any(String),
    });
    expect(sendEmailFn).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'jane@example.com',
      projectType: 'Free Marketing Audit',
      message: expect.stringContaining('Current marketing state: Traffic exists but few leads'),
    });
  });

  it('maps marketing state to a human-readable label', async () => {
    const result = await submitAudit({
      ...validInput,
      marketingState: 'automation-mess',
    });

    expect(result.success).toBe(true);
    expect(sendEmailFn).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining('Current marketing state: Leads slip through the cracks'),
      })
    );
  });
});
