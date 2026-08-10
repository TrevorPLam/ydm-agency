/**
 * FILE: Header.tsx
 * PURPOSE: Provides the site Header component with a skip link, brand logo, desktop navigation (including a Services dropdown), and a mobile slide-out menu.
 * ARCHITECTURE: Client component using usePathname for active-link highlighting, Radix DropdownMenu for the desktop Services menu, and Radix Dialog for the mobile menu; composes Container and ThemeToggle.
 * KEY RULES: Must include a skip-to-content link for accessibility; must highlight active links via aria-current; must render the Services dropdown when serviceLinks is provided; must support a mobile menu via Radix Dialog.
 * DEPENDS ON: react, next/link, next/navigation, @radix-ui/react-dialog, @radix-ui/react-dropdown-menu, lucide-react, ./Container, ./ThemeToggle.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Container } from './Container';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Process', href: '/services/process' },
  { label: 'Blog', href: '/blog' },
  { label: 'Education', href: '/education' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export interface HeaderServiceLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  brandName?: string;
  serviceLinks?: HeaderServiceLink[];
}

/**
 * WHAT IT DOES: Determines whether a nav link is active by exact match or prefix match (excluding the home route).
 * @param {string} pathname - Current route pathname
 * @param {string} href - Link href to test
 * @return {boolean} - True if the link should be marked active
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: pathname is a normalized absolute path.
 */
function isActiveLink(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  if (href === '/') return false;
  return pathname.startsWith(`${href}/`);
}

/**
 * WHAT IT DOES: Determines whether the current route is within the services section (exact /services or any /services/* sub-path).
 * @param {string} pathname - Current route pathname
 * @return {boolean} - True if the route is within the services section
 * SIDE EFFECTS: None (pure function).
 * ASSUMES: pathname is a normalized absolute path.
 */
function isServiceActive(pathname: string): boolean {
  return pathname === '/services' || pathname.startsWith('/services/');
}

/**
 * WHAT IT DOES: Renders the fixed site header with skip link, brand, desktop nav (with optional Services dropdown), theme toggle, and a mobile slide-out menu.
 * @param {HeaderProps} props - Optional brandName and serviceLinks for the Services dropdown
 * @return {JSX.Element} - Rendered header with desktop and mobile navigation
 * SIDE EFFECTS: Reads current pathname via usePathname; manages mobile menu and mobile services accordion open state.
 * ASSUMES: usePathname is available within a Next.js client component context.
 */
export const Header: React.FC<HeaderProps> = ({ brandName = 'YDM Agency', serviceLinks }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(isServiceActive(pathname));

  const desktopLinkBase =
    'text-sm font-medium transition-colors relative focus-visible:ring-2 focus-visible:ring-accent rounded';

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-accent text-background px-4 py-2 rounded"
      >
        Skip to content
      </a>
      <header className="fixed top-0 inset-x-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <Container className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-background font-extrabold text-sm shadow-md group-hover:bg-accent-hover transition-colors">
              Y
            </div>
            <span className="text-lg font-bold tracking-tight text-text-primary group-hover:text-accent transition-colors font-display">
              {brandName}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <Link
              href="/"
              className={`${desktopLinkBase} ${
                isActiveLink(pathname, '/') ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
              }`}
              aria-current={isActiveLink(pathname, '/') ? 'page' : undefined}
            >
              Home
              {isActiveLink(pathname, '/') && (
                <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-accent" aria-hidden="true" />
              )}
            </Link>

            {serviceLinks ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button
                    className={`${desktopLinkBase} inline-flex items-center gap-1 ${
                      isServiceActive(pathname)
                        ? 'text-accent'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    aria-haspopup="menu"
                  >
                    Services
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    {isServiceActive(pathname) && (
                      <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-accent" aria-hidden="true" />
                    )}
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="w-[360px] max-h-[70vh] overflow-y-auto bg-surface border border-border rounded-lg shadow-lg p-2 z-50"
                    sideOffset={8}
                    align="start"
                    avoidCollisions
                  >
                    <DropdownMenu.Item asChild>
                      <Link
                        href="/services"
                        className={`block px-3 py-2 text-sm font-medium rounded outline-none focus-visible:ring-2 focus-visible:ring-accent data-[highlighted]:bg-accent/10 ${
                          isActiveLink(pathname, '/services')
                            ? 'text-accent bg-accent/10'
                            : 'text-text-secondary'
                        }`}
                        aria-current={isActiveLink(pathname, '/services') ? 'page' : undefined}
                      >
                        Services overview
                      </Link>
                    </DropdownMenu.Item>
                    <div className="border-t border-border my-1" role="separator" aria-orientation="horizontal" />
                    {serviceLinks.filter(link => link.href === '/services/industries').map((link) => (
                      <DropdownMenu.Item key={link.href} asChild>
                        <Link
                          href={link.href}
                          className={`block px-3 py-2 text-sm font-medium rounded outline-none focus-visible:ring-2 focus-visible:ring-accent data-[highlighted]:bg-accent/10 ${
                            isActiveLink(pathname, link.href)
                              ? 'text-accent bg-accent/10'
                              : 'text-text-secondary'
                          }`}
                          aria-current={isActiveLink(pathname, link.href) ? 'page' : undefined}
                        >
                          {link.label}
                        </Link>
                      </DropdownMenu.Item>
                    ))}
                    <div className="border-t border-border my-1" role="separator" aria-orientation="horizontal" />
                    {serviceLinks.filter(link => link.href !== '/services/industries').map((link) => (
                      <DropdownMenu.Item key={link.href} asChild>
                        <Link
                          href={link.href}
                          className={`block px-3 py-2 text-sm font-medium rounded outline-none focus-visible:ring-2 focus-visible:ring-accent data-[highlighted]:bg-accent/10 ${
                            isActiveLink(pathname, link.href)
                              ? 'text-accent bg-accent/10'
                              : 'text-text-secondary'
                          }`}
                          aria-current={isActiveLink(pathname, link.href) ? 'page' : undefined}
                        >
                          {link.label}
                        </Link>
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            ) : (
              <Link
                href="/services"
                className={`${desktopLinkBase} ${
                  isActiveLink(pathname, '/services')
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                aria-current={isActiveLink(pathname, '/services') ? 'page' : undefined}
              >
                Services
                {isActiveLink(pathname, '/services') && (
                  <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-accent" aria-hidden="true" />
                )}
              </Link>
            )}

            {NAV_LINKS.map((link) => {
              const isActive = isActiveLink(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${desktopLinkBase} ${
                    isActive ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-accent" aria-hidden="true" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <Dialog.Trigger asChild>
                <button
                  className="md:hidden p-2 text-text-secondary hover:text-text-primary focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />
                <Dialog.Content className="fixed inset-0 z-50 bg-background p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xl font-bold text-text-primary font-display">
                      {brandName}
                    </span>
                    <Dialog.Close asChild>
                      <button
                        className="p-2 text-text-secondary hover:text-text-primary focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
                        aria-label="Close menu"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </Dialog.Close>
                  </div>
                  <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
                    <Dialog.Close asChild>
                      <Link
                        href="/"
                        className={`text-2xl font-medium transition-colors min-h-[44px] flex items-center pl-3 border-l-2 ${
                          isActiveLink(pathname, '/')
                            ? 'text-accent border-accent'
                            : 'text-text-secondary border-transparent hover:text-text-primary'
                        }`}
                        aria-current={isActiveLink(pathname, '/') ? 'page' : undefined}
                      >
                        Home
                      </Link>
                    </Dialog.Close>

                    {serviceLinks ? (
                      <div className="flex flex-col gap-3">
                        <button
                          onClick={() => setMobileServicesOpen((open) => !open)}
                          className={`text-2xl font-medium transition-colors min-h-[44px] flex items-center justify-between w-full pl-3 border-l-2 text-left ${
                            isServiceActive(pathname)
                              ? 'text-accent border-accent'
                              : 'text-text-secondary border-transparent hover:text-text-primary'
                          }`}
                          aria-expanded={mobileServicesOpen}
                          aria-controls="mobile-services-list"
                        >
                          <span>Services</span>
                          <ChevronDown
                            className={`h-6 w-6 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                            aria-hidden="true"
                          />
                        </button>
                        {mobileServicesOpen && (
                          <div id="mobile-services-list" className="flex flex-col gap-3 pl-4">
                            <Dialog.Close asChild>
                              <Link
                                href="/services"
                                className={`text-lg font-medium transition-colors min-h-[44px] flex items-center pl-3 border-l-2 ${
                                  isActiveLink(pathname, '/services')
                                    ? 'text-accent border-accent'
                                    : 'text-text-secondary border-transparent hover:text-text-primary'
                                }`}
                                aria-current={isActiveLink(pathname, '/services') ? 'page' : undefined}
                              >
                                Services overview
                              </Link>
                            </Dialog.Close>
                            {serviceLinks.filter(link => link.href === '/services/industries').map((link) => (
                              <Dialog.Close asChild key={link.href}>
                                <Link
                                  href={link.href}
                                  className={`text-lg font-medium transition-colors min-h-[44px] flex items-center pl-3 border-l-2 ${
                                    isActiveLink(pathname, link.href)
                                      ? 'text-accent border-accent'
                                      : 'text-text-secondary border-transparent hover:text-text-primary'
                                  }`}
                                  aria-current={isActiveLink(pathname, link.href) ? 'page' : undefined}
                                >
                                  {link.label}
                                </Link>
                              </Dialog.Close>
                            ))}
                            <div className="border-l-2 border-border my-1" role="separator" aria-orientation="horizontal" />
                            {serviceLinks.filter(link => link.href !== '/services/industries').map((link) => (
                              <Dialog.Close asChild key={link.href}>
                                <Link
                                  href={link.href}
                                  className={`text-lg font-medium transition-colors min-h-[44px] flex items-center pl-3 border-l-2 ${
                                    isActiveLink(pathname, link.href)
                                      ? 'text-accent border-accent'
                                      : 'text-text-secondary border-transparent hover:text-text-primary'
                                  }`}
                                  aria-current={isActiveLink(pathname, link.href) ? 'page' : undefined}
                                >
                                  {link.label}
                                </Link>
                              </Dialog.Close>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Dialog.Close asChild>
                        <Link
                          href="/services"
                          className={`text-2xl font-medium transition-colors min-h-[44px] flex items-center pl-3 border-l-2 ${
                            isActiveLink(pathname, '/services')
                              ? 'text-accent border-accent'
                              : 'text-text-secondary border-transparent hover:text-text-primary'
                          }`}
                          aria-current={isActiveLink(pathname, '/services') ? 'page' : undefined}
                        >
                          Services
                        </Link>
                      </Dialog.Close>
                    )}

                    {NAV_LINKS.map((link) => {
                      const isActive = isActiveLink(pathname, link.href);
                      return (
                        <Dialog.Close asChild key={link.href}>
                          <Link
                            href={link.href}
                            className={`text-2xl font-medium transition-colors min-h-[44px] flex items-center pl-3 border-l-2 ${
                              isActive
                                ? 'text-accent border-accent'
                                : 'text-text-secondary border-transparent hover:text-text-primary'
                            }`}
                            aria-current={isActive ? 'page' : undefined}
                          >
                            {link.label}
                          </Link>
                        </Dialog.Close>
                      );
                    })}
                  </nav>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </Container>
      </header>
    </>
  );
};
