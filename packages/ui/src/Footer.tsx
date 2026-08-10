/**
 * FILE: Footer.tsx
 * PURPOSE: Provides the site Footer component with brand, quick links, contact info, legal links, and a copyright bar.
 * ARCHITECTURE: Server component rendering a four-column responsive grid inside a Container; composes CookieSettingsButton for the cookie preferences entry point.
 * KEY RULES: Must use the firm email contact@ydmagency.com; must display the 2-hour response promise; must include a Cookie Settings control; must render a dynamic copyright year.
 * DEPENDS ON: next/link, ./Container, ./CookieSettingsButton.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import Link from 'next/link';
import { Container } from './Container';
import { CookieSettingsButton } from './CookieSettingsButton';

export interface FooterProps {
  brandName?: string;
}

/**
 * WHAT IT DOES: Renders the site footer with brand blurb, quick links, contact details, legal links, and a copyright bar showing the current year.
 * @param {FooterProps} props - Optional brandName (defaults to 'YDM Agency')
 * @return {JSX.Element} - Rendered footer element
 * SIDE EFFECTS: Reads the current year via new Date() at render time.
 * ASSUMES: Routes referenced in links exist in the app router.
 */
export const Footer = ({ brandName = 'YDM Agency' }: FooterProps) => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border py-12">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-text-primary font-semibold text-lg mb-3">{brandName}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Built by YDM Agency — direct, modern, no overhead.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="text-text-secondary hover:text-text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/services/compare" className="text-text-secondary hover:text-text-primary transition-colors">
                  Compare Services
                </Link>
              </li>
              <li>
                <Link href="/services/pricing" className="text-text-secondary hover:text-text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/audit" className="text-text-secondary hover:text-text-primary transition-colors">
                  Free Audit
                </Link>
              </li>
              <li>
                <Link href="/services/process" className="text-text-secondary hover:text-text-primary transition-colors">
                  Process
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-text-secondary hover:text-text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/education" className="text-text-secondary hover:text-text-primary transition-colors">
                  Education
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-secondary hover:text-text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:contact@ydmagency.com" className="text-text-secondary hover:text-text-primary transition-colors">
                  contact@ydmagency.com
                </a>
              </li>
              <li className="text-text-secondary text-xs mt-2">
                Personal reply within 2 hours on business days.
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-text-secondary hover:text-text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border text-xs text-text-secondary">
          <p>© {year} {brandName}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};
