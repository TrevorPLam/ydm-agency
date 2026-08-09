import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendEmail } from '../index';

const sendMock = vi.hoisted(() => vi.fn());

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: sendMock,
    },
  })),
}));

vi.mock('@react-email/render', () => ({
  render: vi.fn().mockResolvedValue('<html></html>'),
}));

describe('sendEmail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API_KEY = 'test-key';
  });

  it('returns success: true when both emails are accepted by Resend', async () => {
    sendMock
      .mockResolvedValueOnce({ data: { id: 'ack-123' }, error: null })
      .mockResolvedValueOnce({ data: { id: 'notif-123' }, error: null });

    const result = await sendEmail({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message',
    });

    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('returns success: false when Resend reports an error on the notification email', async () => {
    sendMock
      .mockResolvedValueOnce({ data: { id: 'ack-123' }, error: null })
      .mockResolvedValueOnce({
        data: null,
        error: { message: 'Invalid email address', name: 'validation_error' },
      });

    const result = await sendEmail({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message',
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('returns success: false when the acknowledgement email is rejected', async () => {
    sendMock
      .mockResolvedValueOnce({
        data: null,
        error: { message: 'Could not send email', name: 'internal_server_error' },
      })
      .mockResolvedValueOnce({ data: { id: 'notif-123' }, error: null });

    const result = await sendEmail({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message',
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('returns success: false when a network request is rejected', async () => {
    sendMock
      .mockResolvedValueOnce({ data: { id: 'ack-123' }, error: null })
      .mockRejectedValueOnce(new Error('Network error'));

    const result = await sendEmail({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message',
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('returns success: false when RESEND_API_KEY is not configured', async () => {
    process.env.RESEND_API_KEY = '';

    const result = await sendEmail({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message',
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe('RESEND_API_KEY not configured');
    expect(sendMock).not.toHaveBeenCalled();
  });
});
