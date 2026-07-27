'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import { Container } from './Container';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Demos', href: '/demos' },
  { label: 'Process', href: '/services/process' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export interface HeaderProps {
  brandName?: string;
}

export const Header: React.FC<HeaderProps> = ({ brandName = 'YDM Agency' }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-background font-extrabold text-sm shadow-md group-hover:bg-accent-hover transition-colors">
            Y
          </div>
          <span className="text-lg font-bold tracking-tight text-text-primary group-hover:text-accent transition-colors font-display">
            {brandName}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative ${
                  isActive
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-accent" />
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
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Dialog.Close asChild key={link.href}>
                        <Link
                          href={link.href}
                          className={`text-2xl font-medium transition-colors min-h-[44px] flex items-center ${
                            isActive
                              ? 'text-accent'
                              : 'text-text-secondary hover:text-text-primary'
                          }`}
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
