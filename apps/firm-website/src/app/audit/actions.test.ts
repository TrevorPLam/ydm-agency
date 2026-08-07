import { describe, it, expect, vi, beforeEach } from 'vitest';

const sendEmailFn = vi.hoisted(() => vi.fn());

vi.mock('@ydm-agency/email', () => ({
  sendEmail: sendEmailFn,
}));

import { submitAudit } from './actions';

const validInput = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  website: 'https://example.com',
  challenge: 'Traffic is low and conversions are even lower than expected.',
  marketingState: 'traffic-no-leads' as const,
  _honeypot: '',
};

describe('submitAudit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sendEmailFn.mockReset();
    sendEmailFn.mockResolvedValue({ success: true });
  });

  it('returns validation errors for invalid data', async () => {
    const result = await submitAudit({
      name: 'J',
      email: 'not-an-email',
      website: 'invalid',
      challenge: 'short',
      marketingState: 'traffic-no-leads',
      _honeypot: '',
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/name/i);
    expect(result.error).toMatch(/email/i);
    expect(result.error).toMatch(/website/i);
    expect(result.error).toMatch(/challenge/i);
    expect(sendEmailFn).not.toHaveBeenCalled();
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

  it('returns success when sendEmail succeeds', async () => {
    const result = await submitAudit(validInput);

    expect(result.success).toBe(true);
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
