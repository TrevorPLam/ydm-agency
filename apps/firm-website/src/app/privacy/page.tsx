/**
 * FILE: page.tsx
 * PURPOSE: Renders the /privacy privacy policy page describing data collection, usage, third-party services, cookies, user rights, retention, security, and contact details.
 * ARCHITECTURE: Server component with a static metadata export via constructMetadata; renders long-form legal copy in a prose-styled article.
 * KEY RULES: Must reflect actual data flows (Vercel, Resend, Calendly, Supabase); must describe the single essential consent cookie and analytics opt-in; must provide a contact email for privacy requests.
 * DEPENDS ON: @ydm-agency/seo (constructMetadata).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import { constructMetadata } from '@ydm-agency/seo';

export const metadata = constructMetadata({
  title: 'Privacy Policy | YDM Agency',
  description: 'How YDM Agency collects, uses, and protects your information.',
});

/**
 * WHAT IT DOES: Renders the privacy policy page with sections for introduction, data collection, usage, third-party services, cookies, user rights, retention, security, changes, and contact.
 * @return {JSX.Element} - Rendered privacy policy page
 * SIDE EFFECTS: None (server-side rendering).
 * ASSUMES: The listed third-party services match the actual production stack.
 */
export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-text-primary">
      <article className="prose prose-invert prose-headings:font-display max-w-3xl mx-auto py-16 px-4">
        <h1>Privacy Policy</h1>
        <p className="text-text-secondary">Last Updated: 2026</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            YDM Agency (&quot;the firm,&quot; &quot;we,&quot; &quot;us&quot;) operates this website. This policy explains what information is collected when you visit the site, how that information is used, and your rights regarding your personal data. By using this website, you agree to the terms described here.
          </p>
        </section>

        <section>
          <h2>2. What Information Is Collected</h2>
          <h3>Information You Provide Directly</h3>
          <ul>
            <li>When you fill out the contact form: your name, email address, an optional project type selection, and any message you include.</li>
            <li>When you email us directly at <a href="mailto:contact@ydmagency.com">contact@ydmagency.com</a>: your email address and any content you choose to share.</li>
          </ul>
          <h3>Information Collected Automatically</h3>
          <ul>
            <li><strong>Anonymous usage data:</strong> pages visited, time spent on the site, referring website, browser type, and device type. This information is aggregated and does not identify you personally.</li>
            <li><strong>Cookie data:</strong> a single functional cookie stores your analytics consent preference (accepted or declined). No advertising cookies, no social media tracking pixels, and no cross‑site trackers are used.</li>
          </ul>
        </section>

        <section>
          <h2>3. How Information Is Used</h2>
          <p>
            <strong>Contact form and email data</strong> is used solely to respond to your inquiry, discuss your project, and provide the services you request. Upon submission, an immediate automated confirmation email is sent to acknowledge receipt; a personal reply follows within 2 hours on business days. This data is never sold, rented, or shared with third parties for marketing purposes.
          </p>
          <p>
            <strong>Anonymous usage data</strong> is used to understand how visitors interact with the site — which pages are most useful, where improvements can be made, and whether performance issues exist.
          </p>
        </section>

        <section>
          <h2>4. Third‑Party Services</h2>
          <p>A small number of trusted third‑party services are used to operate this website:</p>
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Purpose</th>
                <th>Data Shared</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vercel</td>
                <td>Website hosting and performance analytics</td>
                <td>Anonymous page view data, device type, browser</td>
              </tr>
              <tr>
                <td>Resend</td>
                <td>Email delivery for contact form submissions and auto‑acknowledgments</td>
                <td>Name, email address, and message content</td>
              </tr>
              <tr>
                <td>Calendly (optional)</td>
                <td>Appointment scheduling</td>
                <td>Name and email address (only if you book a call)</td>
              </tr>
              <tr>
                <td>Supabase</td>
                <td>Secure storage of contact form submissions</td>
                <td>Name, email, project type, message, timestamp</td>
              </tr>
            </tbody>
          </table>
          <p>Each of these providers has its own privacy policy and data processing agreements in place. No data is shared with any other third party unless required by law.</p>
        </section>

        <section>
          <h2>5. Cookies & Tracking</h2>
          <p>
            This website uses a single essential cookie to remember your analytics consent preference. No other cookies are set until you explicitly accept analytics tracking via the cookie consent banner.
          </p>
          <ul>
            <li><strong>Essential cookie:</strong> stores whether you have accepted or declined analytics tracking. This cookie is required for the site to respect your choice and contains no personal data.</li>
            <li><strong>Analytics cookies:</strong> only loaded if you explicitly accept analytics tracking. These cookies collect anonymous usage data as described above. You can change your preference at any time by clicking &quot;Cookie Settings&quot; in the footer.</li>
          </ul>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul>
            <li><strong>Right to access:</strong> request a copy of any personal data held about you.</li>
            <li><strong>Right to correct:</strong> ask for inaccurate data to be updated.</li>
            <li><strong>Right to delete:</strong> request that your personal data be deleted.</li>
            <li><strong>Right to opt out:</strong> refuse or withdraw consent for non‑essential cookies at any time.</li>
          </ul>
          <p>To exercise any of these rights, email <a href="mailto:contact@ydmagency.com">contact@ydmagency.com</a> with the subject line &quot;Privacy Request.&quot; A response will be provided within 30 days.</p>
        </section>

        <section>
          <h2>7. Data Retention</h2>
          <ul>
            <li><strong>Contact form submissions</strong> are stored for up to 2 years for reference on past projects, then deleted.</li>
            <li><strong>Anonymous usage data</strong> is retained indefinitely in aggregated form — it cannot be traced back to an individual.</li>
          </ul>
        </section>

        <section>
          <h2>8. Security</h2>
          <p>
            Reasonable technical and organisational measures are taken to protect your data. However, no method of transmission over the internet is 100% secure. While commercially acceptable means are used to protect personal data, absolute security cannot be guaranteed.
          </p>
        </section>

        <section>
          <h2>9. Changes to This Policy</h2>
          <p>
            This policy may be updated from time to time. The &quot;Last Updated&quot; date at the top of the page will reflect any changes. Continued use of the site after changes are posted constitutes acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>For questions about this policy or to exercise your data rights:</p>
          <p><strong>Email:</strong> <a href="mailto:contact@ydmagency.com">contact@ydmagency.com</a></p>
        </section>
      </article>
    </main>
  );
}
