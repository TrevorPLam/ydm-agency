'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ydm-agency/ui';
import { contactFormSchema, type ContactFormInput } from './schemas';

export interface ContactFormProps {
  onSubmit: (data: ContactFormInput) => Promise<{ success: boolean; error?: string }>;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      projectType: undefined,
      message: '',
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
          Message received
        </h3>
        <p className="text-text-secondary max-w-md mx-auto">
          Expect a personal reply within 2 hours on business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
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
        {errors.name && (
          <p className="text-error text-sm mt-1">{errors.name.message}</p>
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
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-error text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-text-primary mb-2">
          Project Type (optional)
        </label>
        <select
          id="projectType"
          {...register('projectType')}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        >
          <option value="">Select a project type</option>
          <option value="website">Website</option>
          <option value="seo">SEO</option>
          <option value="marketing">Marketing</option>
          <option value="analytics">Analytics</option>
          <option value="other">Other</option>
        </select>
        {errors.projectType && (
          <p className="text-error text-sm mt-1">{errors.projectType.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
          placeholder="Tell us about your project..."
        />
        {errors.message && (
          <p className="text-error text-sm mt-1">{errors.message.message}</p>
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
        {isSubmitting || submitStatus === 'loading' ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
