import { Resend, type CreateEmailResponse } from 'resend';
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

    const results = await Promise.allSettled<CreateEmailResponse>([
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

    const failures: string[] = [];

    results.forEach((result, index) => {
      const label = index === 0 ? 'acknowledgment' : 'notification';

      if (result.status === 'rejected') {
        const message = result.reason instanceof Error ? result.reason.message : String(result.reason);
        console.error(`Email ${label} failed:`, message);
        failures.push(label);
      } else if (result.value.error) {
        const resendError = result.value.error;
        const message = typeof resendError === 'string' ? resendError : resendError.message;
        console.error(`Email ${label} Resend error:`, message);
        failures.push(label);
      }
    });

    if (failures.length > 0) {
      return { success: false, error: 'Failed to send emails. Please try again.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: 'Failed to send emails' };
  }
}

export { AcknowledgmentEmail, NotificationEmail };
