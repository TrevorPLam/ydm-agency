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

import { submitContact } from './actions';

const validInput = {
  name: 'John Doe',
  email: 'john@example.com',
  projectType: 'website' as const,
  message: 'This is a detailed project message.',
  _honeypot: '' as const,
};

describe('submitContact', () => {
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
    const result = await submitContact({
      name: 'J',
      email: 'not-an-email',
      projectType: 'website',
      message: 'short',
      _honeypot: '' as const,
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/name/i);
    expect(result.error).toMatch(/email/i);
    expect(result.error).toMatch(/message/i);
    expect(insertFn).not.toHaveBeenCalled();
    expect(sendEmailFn).not.toHaveBeenCalled();
  });

  it('returns rate limit error when limit is exceeded', async () => {
    ratelimitFn.mockResolvedValue({ success: false });

    const result = await submitContact(validInput);

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
    const { submitContact: submitContactNoSupabase } = await import('./actions');

    const result = await submitContactNoSupabase(validInput);

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/not configured/i);
    expect(insertFn).not.toHaveBeenCalled();
    expect(sendEmailFn).not.toHaveBeenCalled();

    process.env.NEXT_PUBLIC_SUPABASE_URL = prevUrl;
    process.env.SUPABASE_SERVICE_ROLE_KEY = prevKey;
  });

  it('still sends email when Supabase insert fails', async () => {
    insertFn.mockResolvedValue({ error: { message: 'Database error' } });

    const result = await submitContact(validInput);

    expect(result.success).toBe(true);
    expect(insertFn).toHaveBeenCalled();
    expect(sendEmailFn).toHaveBeenCalled();
  });

  it('still sends email when Supabase insert throws', async () => {
    insertFn.mockRejectedValue(new Error('Connection refused'));

    const result = await submitContact(validInput);

    expect(result.success).toBe(true);
    expect(insertFn).toHaveBeenCalled();
    expect(sendEmailFn).toHaveBeenCalled();
  });

  it('returns error when sendEmail fails', async () => {
    sendEmailFn.mockResolvedValue({ success: false, error: 'Resend API error' });

    const result = await submitContact(validInput);

    expect(result.success).toBe(false);
    expect(result.error).toBe('Resend API error');
    expect(insertFn).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      project_type: 'website',
      message: 'This is a detailed project message.',
      source: 'website',
      status: 'new',
      created_at: expect.any(String),
    });
  });

  it('returns success when storage and email succeed', async () => {
    const result = await submitContact(validInput);

    expect(result.success).toBe(true);
    expect(insertFn).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      project_type: 'website',
      message: 'This is a detailed project message.',
      source: 'website',
      status: 'new',
      created_at: expect.any(String),
    });
    expect(sendEmailFn).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      projectType: 'Website & brand',
      message: expect.stringContaining('Contact form submission from John Doe'),
    });
  });

  it('uses "Not specified" project type label when projectType is omitted', async () => {
    const result = await submitContact({
      ...validInput,
      projectType: undefined,
    });

    expect(result.success).toBe(true);
    expect(insertFn).toHaveBeenCalledWith(
      expect.objectContaining({
        project_type: null,
      })
    );
    expect(sendEmailFn).toHaveBeenCalledWith(
      expect.objectContaining({
        projectType: 'Not specified',
      })
    );
  });
});
