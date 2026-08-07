'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ydm-agency/ui';
import { trackEvent } from '@ydm-agency/analytics';
import { contactFormSchema, type ContactFormInput } from './schemas';

const PROJECT_TYPE_OPTIONS = [
  { value: '', label: 'Select a category (optional)' },
  { value: 'website', label: 'Website & brand' },
  { value: 'traffic-leads', label: 'Traffic & leads' },
  { value: 'other', label: "Other / I'm not sure" },
] as const;

export interface ContactFormProps {
  onSubmit: (data: ContactFormInput) => Promise<{ success: boolean; error?: string }>;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
  defaultValues?: Partial<ContactFormInput>;
}

export function ContactForm({
  onSubmit,
  submitLabel = 'Send Message',
  successTitle = 'Message received',
  successMessage = 'Expect a personal reply within 2 hours on business days.',
  defaultValues,
}: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      email: defaultValues?.email ?? '',
      projectType: defaultValues?.projectType,
      message: defaultValues?.message ?? '',
      _honeypot: '',
    },
  });

  const handleFormSubmit = async (data: ContactFormInput) => {
    setSubmitStatus('loading');
    setErrorMessage(null);

    try {
      const result = await onSubmit(data);

      if (result.success) {
        setSubmitStatus('success');
        trackEvent({
          eventName: 'form_submission',
          properties: {
            form: 'contact',
            projectType: data.projectType ?? 'none',
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
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <div className="w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
          ✓
        </div>
        <h3 className="text-2xl font-display font-semibold text-text-primary mb-2">
          {successTitle}
        </h3>
        <p className="text-text-secondary max-w-md mx-auto">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
          Full Name *
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
          Email Address *
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
        <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
          What do you need help with? *
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
          placeholder="Briefly describe your goals, timeline, or any questions."
        />
        {errors.message && (
          <p id="message-error" className="text-error text-sm mt-1" role="alert" aria-live="assertive">
            {errors.message.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-text-primary mb-2">
          Project Type (optional)
        </label>
        <select
          id="projectType"
          {...register('projectType')}
          aria-invalid={errors.projectType ? 'true' : 'false'}
          aria-describedby={errors.projectType ? 'projectType-error' : undefined}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        >
          {PROJECT_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p id="projectType-error" className="text-error text-sm mt-1" role="alert" aria-live="assertive">
            {errors.projectType.message}
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
        <div className="bg-error/10 border border-error/20 rounded-lg p-4" role="alert" aria-live="assertive">
          <p className="text-error text-sm">{errorMessage}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isSubmitting || submitStatus === 'loading'}
      >
        {isSubmitting || submitStatus === 'loading' ? 'Sending...' : submitLabel}
      </Button>
    </form>
  );
}
