'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ydm-agency/ui';
import { auditFormSchema, type AuditFormInput } from '@/lib/audit-schema';
import { submitAudit } from '@/app/audit/actions';

export function AuditForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuditFormInput>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      name: '',
      email: '',
      website: '',
      challenge: '',
      marketingState: 'unsure',
      _honeypot: '',
    },
  });

  const onSubmit = async (data: AuditFormInput) => {
    setSubmitStatus('loading');
    setErrorMessage(null);

    try {
      const result = await submitAudit(data);

      if (result.success) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Submission failed. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
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
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          placeholder="Your name"
        />
        {errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email *
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          placeholder="you@example.com"
        />
        {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-medium text-text-primary mb-2">
          Website URL *
        </label>
        <input
          id="website"
          type="text"
          {...register('website')}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          placeholder="example.com"
        />
        {errors.website && <p className="text-error text-sm mt-1">{errors.website.message}</p>}
      </div>

      <div>
        <label htmlFor="challenge" className="block text-sm font-medium text-text-primary mb-2">
          Biggest challenge *
        </label>
        <textarea
          id="challenge"
          rows={4}
          {...register('challenge')}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
          placeholder="Describe the biggest marketing challenge the business is facing..."
        />
        {errors.challenge && <p className="text-error text-sm mt-1">{errors.challenge.message}</p>}
      </div>

      <div>
        <label htmlFor="marketingState" className="block text-sm font-medium text-text-primary mb-2">
          Current marketing state *
        </label>
        <select
          id="marketingState"
          {...register('marketingState')}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        >
          <option value="no-website">No website yet</option>
          <option value="website-no-traffic">Website exists but gets little traffic</option>
          <option value="traffic-no-leads">Traffic exists but few leads</option>
          <option value="leads-now">Need leads quickly</option>
          <option value="automation-mess">Leads slip through the cracks</option>
          <option value="unsure">Not sure where to start</option>
        </select>
        {errors.marketingState && (
          <p className="text-error text-sm mt-1">{errors.marketingState.message}</p>
        )}
      </div>

      {/* Honeypot field - hidden from users but visible to bots */}
      <input
        type="text"
        {...register('_honeypot')}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {errorMessage && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
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
