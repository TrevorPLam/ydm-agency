import { Resend } from 'resend';
import { render } from '@react-email/render';
import { AcknowledgmentEmail } from './AcknowledgmentEmail';
import { NotificationEmail } from './NotificationEmail';

export interface SendEmailOptions {
  name: string;
  email: string;
  projectType?: string;
  message: string;
}

export interface SendEmailResult {
  success: boolean;
  error?: string;
}

const FROM_ADDRESS = 'YDM Agency <noreply@ydmagency.com>';
const TO_ADDRESS = 'contact@ydmagency.com';

export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const resend = new Resend(process.env.RESEND_API_KEY);

  if (!process.env.RESEND_API_KEY) {
    return { success: false, error: 'RESEND_API_KEY not configured' };
  }

  try {
    const ackEmailHtml = await render(
      AcknowledgmentEmail({ name: options.name })
    );

    const notifEmailHtml = await render(
      NotificationEmail({
        name: options.name,
        email: options.email,
        projectType: options.projectType,
        message: options.message,
      })
    );

    const ackSubject = 'Got your message — YDM Agency';
    const notifSubject = `New Contact: ${options.name} — ${options.projectType ?? 'General'}`;

    const results = await Promise.allSettled([
      resend.emails.send({
        from: FROM_ADDRESS,
        to: options.email,
        subject: ackSubject,
        html: ackEmailHtml,
      }),
      resend.emails.send({
        from: FROM_ADDRESS,
        to: TO_ADDRESS,
        subject: notifSubject,
        html: notifEmailHtml,
      }),
    ]);

    // Log any failures but don't block success
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Email ${index === 0 ? 'acknowledgment' : 'notification'} failed:`, result.reason);
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: 'Failed to send emails' };
  }
}

export { AcknowledgmentEmail, NotificationEmail };
