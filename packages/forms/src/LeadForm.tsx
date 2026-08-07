'use client';

import React, { useState } from 'react';
import { Button, Card } from '@ydm-agency/ui';
import { trackEvent } from '@ydm-agency/analytics';
import { leadCaptureSchema, type LeadCaptureInput } from './schemas';

export interface LeadFormProps {
  title?: string;
  subtitle?: string;
  sourceApp?: string;
  onSubmitSuccess?: () => void;
}

export function LeadForm({
  title = 'Book Your Strategy Call',
  subtitle = 'Fill out the form below and we will get back to you within 24 hours.',
  sourceApp = 'agency-main',
  onSubmitSuccess,
}: LeadFormProps) {
  const [formData, setFormData] = useState<LeadCaptureInput>({
    fullName: '',
    email: '',
    companyName: '',
    budget: '$5,000 - $10,000',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = leadCaptureSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          formattedErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(formattedErrors);
      setIsSubmitting(false);
      return;
    }

    // Track analytics event
    trackEvent({
      eventName: 'lead_form_submitted',
      properties: {
        sourceApp,
        budget: formData.budget,
      },
    });

    setSubmitted(true);
    setIsSubmitting(false);

    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  if (submitted) {
    return (
      <Card className="p-8 text-center bg-emerald-50/50 border-emerald-200">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          We have received your request. A team member will review your details and be in touch shortly.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-8 max-w-xl mx-auto border-gray-200 shadow-sm">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            aria-invalid={errors.fullName ? 'true' : 'false'}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p id="fullName-error" className="text-xs text-red-500 mt-1" role="alert" aria-live="assertive">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Work Email *
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
            placeholder="john@company.com"
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-500 mt-1" role="alert" aria-live="assertive">
              {errors.email}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              aria-invalid={errors.companyName ? 'true' : 'false'}
              aria-describedby={errors.companyName ? 'companyName-error' : undefined}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
              placeholder="Acme Inc."
            />
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Budget
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 bg-white"
            >
              <option value="Under $5,000">Under $5,000</option>
              <option value="$5,000 - $10,000">$5,000 - $10,000</option>
              <option value="$10,000 - $25,000">$10,000 - $25,000</option>
              <option value="$25,000+">$25,000+</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Project Goals / Details *
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
            placeholder="Tell us about your project requirements or growth goals..."
          />
          {errors.message && (
            <p id="message-error" className="text-xs text-red-500 mt-1" role="alert" aria-live="assertive">
              {errors.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full py-3 text-base font-semibold shadow-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending Request...' : 'Submit Lead Request'}
        </Button>
      </form>
    </Card>
  );
}
