import Link from 'next/link';
import { Container } from '@ydm-agency/ui';
import { constructMetadata } from '@ydm-agency/seo';
import { ContactForm } from '@ydm-agency/forms';
import { submitContact } from './actions';
import { CalendlyWidget } from '@/components/CalendlyWidget';

const VALID_PROJECT_TYPES = ['website', 'traffic-leads', 'other'] as const;

function getSearchParam(params: Record<string, string | string[] | undefined>, key: string): string | undefined {
  const value = params[key];
  if (Array.isArray(value)) return value[0];
  return value;
}

export async function generateMetadata() {
  return constructMetadata({
    title: 'Contact | YDM Agency',
    description:
      'Get a free project outline within 2 hours. Fill out the form or schedule a time — no obligation, no pressure.',
  });
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const rawProjectType = getSearchParam(params, 'projectType');
  const rawMessage = getSearchParam(params, 'message');

  const projectType = VALID_PROJECT_TYPES.includes(rawProjectType as (typeof VALID_PROJECT_TYPES)[number])
    ? (rawProjectType as (typeof VALID_PROJECT_TYPES)[number])
    : undefined;
  const message = rawMessage ? decodeURIComponent(rawMessage) : undefined;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-24 md:py-32">
        <Container>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            Let&apos;s Talk About Your Project
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            Fill out the form below and you&apos;ll receive a free project outline within 2 hours — no obligation,
            no pressure.
          </p>
        </Container>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-24 bg-surface border-y border-border">
        <Container>
          <div className="max-w-2xl mx-auto">
            <ContactForm
              onSubmit={submitContact}
              submitLabel="Get Your Free Project Outline"
              successTitle="Thanks — your message has been received"
              successMessage="Check your inbox for a confirmation email. A personal reply will follow within 2 hours. If this is urgent, email contact@ydmagency.com directly."
              defaultValues={{
                projectType,
                message,
              }}
            />
            <p className="text-text-secondary text-center mt-6 text-xs">
              Information submitted through this form is used only to respond to your inquiry. See the{' '}
              <Link href="/privacy" className="text-accent hover:text-accent-hover underline underline-offset-4">
                Privacy Policy
              </Link>{' '}
              for details.
            </p>
          </div>
        </Container>
      </section>

      {/* Response Promise */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="bg-surface border border-border rounded-xl p-8">
              <h2 className="text-2xl font-display font-semibold text-text-primary mb-4">
                Response Promise
              </h2>
              <p className="text-text-secondary">
                Every message receives an instant confirmation email. A personal reply — not an automated script —
                follows within 2 hours on business days, usually faster.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Alternative Contact Methods */}
      <section className="py-16 md:py-24 bg-surface border-y border-border">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-display font-semibold text-text-primary mb-8 text-center">
              Alternative Contact Methods
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-background border border-border rounded-xl p-6">
                <h3 className="text-lg font-display font-semibold text-text-primary mb-3">
                  Direct Email
                </h3>
                <a
                  href="mailto:contact@ydmagency.com"
                  className="text-accent hover:text-accent-hover underline underline-offset-4"
                >
                  contact@ydmagency.com
                </a>
                <p className="text-text-secondary text-sm mt-2">
                  For general inquiries and project discussions.
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <h3 className="text-lg font-display font-semibold text-text-primary mb-4 text-center">
                Prefer to pick a time?
              </h3>
              <p className="text-text-secondary text-center mb-6">
                Use the calendar below — no back-and-forth needed.
              </p>
              <CalendlyWidget />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
