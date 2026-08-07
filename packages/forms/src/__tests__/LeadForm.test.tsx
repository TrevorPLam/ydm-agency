import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { LeadForm } from '../LeadForm';
import { trackEvent } from '@ydm-agency/analytics';

expect.extend(toHaveNoViolations);

vi.mock('@ydm-agency/analytics', () => ({
  trackEvent: vi.fn(),
}));

describe('LeadForm', () => {
  it('renders all visible fields', () => {
    render(<LeadForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/estimated budget/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project goals/i)).toBeInTheDocument();
  });

  it('shows validation errors when submitting an empty form', async () => {
    render(<LeadForm />);

    const submitButton = screen.getByRole('button', { name: /submit lead request/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it('calls trackEvent and onSubmitSuccess with correct data on valid fill', async () => {
    const onSubmitSuccess = vi.fn();
    render(<LeadForm onSubmitSuccess={onSubmitSuccess} />);

    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/work email/i), 'john@company.com');
    await userEvent.type(screen.getByLabelText(/company name/i), 'Acme Inc.');
    await userEvent.type(
      screen.getByLabelText(/project goals/i),
      'We need a full rebrand and website redesign.'
    );

    const submitButton = screen.getByRole('button', { name: /submit lead request/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmitSuccess).toHaveBeenCalledTimes(1);
    });

    expect(trackEvent).toHaveBeenCalledWith({
      eventName: 'lead_form_submitted',
      properties: {
        sourceApp: 'agency-main',
        budget: '$5,000 - $10,000',
      },
    });
  });

  it('shows success message after submission', async () => {
    render(<LeadForm />);

    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/work email/i), 'john@company.com');
    await userEvent.type(
      screen.getByLabelText(/project goals/i),
      'We need a full rebrand and website redesign.'
    );

    const submitButton = screen.getByRole('button', { name: /submit lead request/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
      expect(screen.getByText(/we have received your request/i)).toBeInTheDocument();
    });
  });

  it('reflects selected budget in trackEvent', async () => {
    const onSubmitSuccess = vi.fn();
    render(<LeadForm onSubmitSuccess={onSubmitSuccess} sourceApp="landing-page" />);

    await userEvent.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await userEvent.type(screen.getByLabelText(/work email/i), 'jane@company.com');
    await userEvent.selectOptions(screen.getByLabelText(/estimated budget/i), '$25,000+');
    await userEvent.type(
      screen.getByLabelText(/project goals/i),
      'We are scaling paid media and need help with strategy.'
    );

    const submitButton = screen.getByRole('button', { name: /submit lead request/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(trackEvent).toHaveBeenCalledWith({
        eventName: 'lead_form_submitted',
        properties: {
          sourceApp: 'landing-page',
          budget: '$25,000+',
        },
      });
    });
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<LeadForm />);

    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();
  });
});
