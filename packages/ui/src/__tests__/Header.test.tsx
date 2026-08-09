import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../Header';

let mockedPathname = '/';

vi.mock('next/navigation', () => ({
  usePathname: () => mockedPathname,
}));

const SERVICE_LINKS = [
  { label: 'Website Design & Development', href: '/services/web-design' },
  { label: 'SEO & AI Search Optimization', href: '/services/seo' },
  { label: 'Website Maintenance', href: '/services/maintenance' },
  { label: 'Compare Services', href: '/services/compare' },
  { label: 'Pricing', href: '/services/pricing' },
  { label: 'Free Marketing Audit', href: '/audit' },
];

const HEADER_PROPS = {
  brandName: 'YDM Agency',
  serviceLinks: SERVICE_LINKS,
};

describe('Header', () => {
  beforeEach(() => {
    mockedPathname = '/';
  });

  it('renders the brand link and main navigation', () => {
    render(<Header {...HEADER_PROPS} />);
    expect(screen.getByText('YDM Agency')).toBeInTheDocument();
    const mainNav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(mainNav).toBeInTheDocument();
    expect(within(mainNav).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(within(mainNav).getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });

  it('marks the current page with aria-current and visual indicator', () => {
    mockedPathname = '/about';
    render(<Header {...HEADER_PROPS} />);
    const mainNav = screen.getByRole('navigation', { name: 'Main navigation' });
    const aboutLink = within(mainNav).getByRole('link', { name: 'About' });
    expect(aboutLink).toHaveAttribute('aria-current', 'page');
  });

  it('marks parent scope for nested service pages', () => {
    mockedPathname = '/services/seo';
    render(<Header {...HEADER_PROPS} />);
    const mainNav = screen.getByRole('navigation', { name: 'Main navigation' });
    const servicesTrigger = within(mainNav).getByRole('button', { name: /Services/i });
    expect(servicesTrigger).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('opens the desktop services dropdown and lists all service links', async () => {
    render(<Header {...HEADER_PROPS} />);
    const mainNav = screen.getByRole('navigation', { name: 'Main navigation' });
    await userEvent.click(within(mainNav).getByRole('button', { name: /Services/i }));

    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
    expect(within(menu).getByRole('menuitem', { name: 'Services overview' })).toHaveAttribute('href', '/services');
    SERVICE_LINKS.forEach((link) => {
      expect(within(menu).getByRole('menuitem', { name: link.label })).toHaveAttribute('href', link.href);
    });
  });

  it('marks the active service inside the dropdown', async () => {
    mockedPathname = '/services/seo';
    render(<Header {...HEADER_PROPS} />);
    const mainNav = screen.getByRole('navigation', { name: 'Main navigation' });
    await userEvent.click(within(mainNav).getByRole('button', { name: /Services/i }));

    const menu = screen.getByRole('menu');
    const seoLink = within(menu).getByRole('menuitem', { name: 'SEO & AI Search Optimization' });
    expect(seoLink).toHaveAttribute('aria-current', 'page');
  });

  it('falls back to a flat Services link when no serviceLinks are provided', () => {
    render(<Header brandName="YDM Agency" />);
    const mainNav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(within(mainNav).getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services');
    expect(within(mainNav).queryByRole('button', { name: /Services/i })).not.toBeInTheDocument();
  });

  it('opens the mobile menu and expands the services section', async () => {
    render(<Header {...HEADER_PROPS} />);
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    const mobileNav = screen.getByRole('navigation', { name: 'Mobile navigation' });
    expect(mobileNav).toBeInTheDocument();

    const servicesToggle = within(mobileNav).getByRole('button', { name: /Services/i });
    expect(servicesToggle).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(servicesToggle);
    expect(servicesToggle).toHaveAttribute('aria-expanded', 'true');

    SERVICE_LINKS.forEach((link) => {
      expect(within(mobileNav).getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
    });
  });

  it('exposes skip-to-content link for keyboard users', () => {
    render(<Header {...HEADER_PROPS} />);
    const skipLink = screen.getByRole('link', { name: 'Skip to content' });
    expect(skipLink).toHaveAttribute('href', '#main-content');
    expect(skipLink).toHaveClass('sr-only');
  });
});
