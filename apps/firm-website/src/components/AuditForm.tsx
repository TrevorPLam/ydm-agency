/**
 * FILE: AuditForm.tsx
 * PURPOSE: Provides the AuditForm client component for the free marketing audit request, with react-hook-form validation, a honeypot, Server Action submission, and accessible success/error states.
 * ARCHITECTURE: Client component using react-hook-form with a zodResolver backed by auditFormSchema; submits via the submitAudit Server Action; tracks a form_submission analytics event on success; manages idle/loading/success/error status with focus management.
 * KEY RULES: Must validate via auditFormSchema (Zod); must include a hidden honeypot field for bot detection; must track form_submission on success; must move focus to the success/error region for accessibility.
 * DEPENDS ON: react, react-hook-form, @hookform/resolvers/zod, @ydm-agency/ui (Button), @ydm-agency/analytics (trackEvent), @/lib/audit-schema, @/app/audit/actions (submitAudit).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ydm-agency/ui';
import { trackEvent } from '@ydm-agency/analytics';
import { auditFormSchema, type AuditFormInput } from '@/lib/audit-schema';
import { submitAudit } from '@/app/audit/actions';

const MARKETING_STATE_OPTIONS = [
  { value: 'no-website', label: 'No website yet' },
  { value: 'website-no-traffic', label: 'Website exists but gets little traffic' },
  { value: 'traffic-no-leads', label: 'Traffic exists but few leads' },
  { value: 'leads-now', label: 'Need leads quickly' },
  { value: 'automation-mess', label: 'Leads slip through the cracks' },
  { value: 'unsure', label: 'Not sure where to start' },
] as const;

/**
 * WHAT IT DOES: Renders the audit request form with validated fields (name, email, website, challenge, marketing state) and a honeypot, submitting via the submitAudit Server Action and showing accessible success/error states.
 * @return {JSX.Element} - Rendered audit form or success confirmation
 * SIDE EFFECTS: Submits form data via submitAudit Server Action; tracks a form_submission analytics event on success; manages submit status and focus on status change.
 * ASSUMES: submitAudit returns { success: boolean; error?: string }; trackEvent is consent-gated by the analytics provider.
 */
export function AuditForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuditFormInput>({
    resolver: zodResolver(auditFormSchema),
    shouldFocusError: true,
    defaultValues: {
      name: '',
      email: '',
      website: '',
      challenge: '',
      marketingState: 'unsure',
      _honeypot: '',
    },
  });

  useEffect(() => {
    if (submitStatus === 'error' && errorRef.current) {
      errorRef.current.focus();
    } else if (submitStatus === 'success' && successRef.current) {
      successRef.current.focus();
    }
  }, [submitStatus]);

  const onSubmit = async (data: AuditFormInput) => {
    setSubmitStatus('loading');
    setErrorMessage(null);

    try {
      const result = await submitAudit(data);

      if (result.success) {
        setSubmitStatus('success');
        trackEvent({
          eventName: 'form_submission',
          properties: {
            form: 'audit',
            marketingState: data.marketingState,
          },
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Submission failed. Please try again.');
      }
    } catch (_error) {
      setSubmitStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="bg-surface border border-border rounded-xl p-8 text-center focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <div className="w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
          ✓
        </div>
        <h3 className="text-2xl font-display font-semibold text-text-primary mb-2">
          Audit request received
        </h3>
        <p className="text-text-secondary max-w-md mx-auto">
          Expect a confirmation and the audit next steps within 2 hours on business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
          Name *
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          placeholder="Your name"
        />
        {errors.name && (
          <p id="name-error" className="text-error text-sm mt-1" role="alert" aria-live="assertive">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email *
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p id="email-error" className="text-error text-sm mt-1" role="alert" aria-live="assertive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-medium text-text-primary mb-2">
          Website URL *
        </label>
        <input
          id="website"
          type="text"
          {...register('website')}
          aria-invalid={errors.website ? 'true' : 'false'}
          aria-describedby={errors.website ? 'website-error' : undefined}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          placeholder="example.com"
        />
        {errors.website && (
          <p id="website-error" className="text-error text-sm mt-1" role="alert" aria-live="assertive">
            {errors.website.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="challenge" className="block text-sm font-medium text-text-primary mb-2">
          Biggest challenge *
        </label>
        <textarea
          id="challenge"
          rows={4}
          {...register('challenge')}
          aria-invalid={errors.challenge ? 'true' : 'false'}
          aria-describedby={errors.challenge ? 'challenge-error' : undefined}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
          placeholder="Describe the biggest marketing challenge the business is facing..."
        />
        {errors.challenge && (
          <p id="challenge-error" className="text-error text-sm mt-1" role="alert" aria-live="assertive">
            {errors.challenge.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="marketingState" className="block text-sm font-medium text-text-primary mb-2">
          Current marketing state *
        </label>
        <select
          id="marketingState"
          {...register('marketingState')}
          aria-invalid={errors.marketingState ? 'true' : 'false'}
          aria-describedby={errors.marketingState ? 'marketingState-error' : undefined}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        >
          {MARKETING_STATE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.marketingState && (
          <p id="marketingState-error" className="text-error text-sm mt-1" role="alert" aria-live="assertive">
            {errors.marketingState.message}
          </p>
        )}
      </div>

      {/* Honeypot field - hidden from users but visible to bots */}
      <input
        type="text"
        {...register('_honeypot')}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        role="presentation"
        aria-hidden="true"
      />

      {errorMessage && (
        <div
          ref={errorRef}
          tabIndex={-1}
          className="bg-error/10 border border-error/20 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-error"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <p className="text-error text-sm">{errorMessage}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isSubmitting || submitStatus === 'loading'}
      >
        {isSubmitting || submitStatus === 'loading' ? 'Sending...' : 'Request Free Audit'}
      </Button>
    </form>
  );
}
