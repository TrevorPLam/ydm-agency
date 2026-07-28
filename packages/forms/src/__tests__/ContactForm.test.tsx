import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ContactForm } from '../ContactForm';

describe('ContactForm', () => {
  it('renders all visible fields', () => {
    const mockOnSubmit = vi.fn().mockResolvedValue({ success: true });
    render(<ContactForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    const mockOnSubmit = vi.fn().mockResolvedValue({ success: true });
    render(<ContactForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /send/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name required/i)).toBeInTheDocument();
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      expect(screen.getByText(/message must be at least 20 characters/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('honeypot input exists in DOM but is not visible', () => {
    const mockOnSubmit = vi.fn().mockResolvedValue({ success: true });
    render(<ContactForm onSubmit={mockOnSubmit} />);

    const honeypot = screen.queryByRole('textbox', { name: /_honeypot/i }) || 
                     document.querySelector('input[name="_honeypot"]');
    
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveClass('hidden');
  });

  it('calls onSubmit with correct data on valid fill', async () => {
    const mockOnSubmit = vi.fn().mockResolvedValue({ success: true });
    render(<ContactForm onSubmit={mockOnSubmit} />);

    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/message/i), 'This is a message that is at least twenty characters long.');

    const submitButton = screen.getByRole('button', { name: /send/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        projectType: undefined,
        message: 'This is a message that is at least twenty characters long.',
        _honeypot: '',
      });
    });
  });

  it('shows success message after onSubmit resolves with success', async () => {
    const mockOnSubmit = vi.fn().mockResolvedValue({ success: true });
    render(<ContactForm onSubmit={mockOnSubmit} />);

    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/message/i), 'This is a message that is at least twenty characters long.');

    const submitButton = screen.getByRole('button', { name: /send/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/message received/i)).toBeInTheDocument();
      expect(screen.getByText(/personal reply within 2 hours/i)).toBeInTheDocument();
    });
  });
});
