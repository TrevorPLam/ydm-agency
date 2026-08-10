/**
 * FILE: industries-config.ts
 * PURPOSE: Provides the INDUSTRIES_CONFIG record with per-industry landing page content (headlines, challenges, recommended services, FAQs, and meta) for the /services/industries routes.
 * ARCHITECTURE: Static typed data module keyed by industry slug; consumed by the industries hub and industry-specific landing pages.
 * KEY RULES: recommendedServices slugs must match SERVICE_LABELS keys; content must use the firm-level impersonal voice; FAQs must be answerable for FAQPage JSON-LD; meta titles/descriptions must be SEO-optimized.
 * DEPENDS ON: None (pure data); consumed by apps/firm-website/src/app/services/industries/**.
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
export interface IndustryConfig {
  slug: string;
  h1: string;
  subhead: string;
  problemSolution: string;
  commonChallenges: string[];
  recommendedServices: { service: string; reason: string }[];
  whoItsFor: string;
  industrySpecific: string;
  faqs: { q: string; a: string }[];
  finalCtaText: string;
  metaTitle: string;
  metaDescription: string;
}

export const INDUSTRIES_CONFIG: Record<string, IndustryConfig> = {
  'professional-services': {
    slug: 'professional-services',
    h1: 'Marketing for Law Firms, Accounting Practices, and Professional Services',
    subhead: 'Professional services businesses build trust through credential display, case study positioning, and referral-driven marketing systems — not generic lead generation.',
    problemSolution: 'Problem / Solution\n\nProfessional services rely on credentials, referrals, and reputation — but most marketing treats them like retail businesses. The fix: systems that display expertise, capture referral sources, and turn case studies into client acquisition.',
    commonChallenges: [
      'Websites that don\'t display credentials, certifications, or case studies prominently',
      'No system to track or capture referral sources — referrals happen, but they\'re not measurable or repeatable',
      'Generic "lead generation" that produces low-quality leads instead of qualified professional clients',
      'Content that sounds like every other firm instead of demonstrating actual expertise',
      'No clear way to showcase thought leadership or industry knowledge',
    ],
    recommendedServices: [
      { service: 'web-design', reason: 'Credential display, case study positioning, and professional presentation that builds trust before the first call.' },
      { service: 'seo', reason: 'Visibility for industry-specific queries and long-tail professional service terms that indicate intent.' },
      { service: 'analytics', reason: 'Track referral sources, measure content performance, and understand which marketing actually drives qualified professional clients.' },
      { service: 'content', reason: 'Thought leadership content, case study development, and industry-specific positioning that demonstrates expertise.' },
    ],
    whoItsFor: 'Law firms and solo practitioners. Accounting practices and tax professionals. Consulting firms and independent consultants. Any professional service where credentials, reputation, and referrals drive business.',
    industrySpecific: 'Professional services marketing is different because the sales cycle is longer, the stakes are higher, and trust is everything. A generic "contact us" form doesn\'t work when clients need to see credentials, read case studies, and understand expertise before they reach out. The focus is on demonstrating capability, not generating volume.',
    faqs: [
      {
        q: 'How is professional services marketing different from other industries?',
        a: 'Professional services have longer sales cycles, higher client lifetime value, and trust as the primary conversion factor. Marketing focuses on credential display, case study positioning, and referral systems rather than quick lead generation.',
      },
      {
        q: 'Do you handle compliance or regulatory considerations for professional services?',
        a: 'Marketing materials are designed to be accurate and professional, but specific regulatory compliance (bar association rules, SEC guidelines, etc.) is reviewed with you to ensure alignment with your industry requirements.',
      },
      {
        q: 'How do you track referrals when they often come through word-of-mouth?',
        a: 'Referral tracking systems are built that capture how clients heard about you — whether through a specific referral source, content piece, or other channel. This makes what\'s working measurable and repeatable.',
      },
      {
        q: 'Should a professional services firm use social media?',
        a: 'It depends on the firm and the audience. LinkedIn is often effective for B2B professional services, but the focus is on channels that actually reach qualified clients, not building a presence everywhere.',
      },
      {
        q: 'How long does it take to see results for professional services marketing?',
        a: 'Professional services marketing is a long game. SEO and content take 3-6 months to gain traction, but credential display and case study positioning can start building trust immediately. The focus is on sustainable growth, not quick wins.',
      },
    ],
    finalCtaText: 'Ready to build a professional services marketing system that demonstrates expertise and drives qualified inquiries?',
    metaTitle: 'Marketing for Law Firms, Accounting, and Professional Services | YDM Agency',
    metaDescription: 'Specialized marketing for professional services — credential display, case study positioning, and referral-driven systems. Not generic lead generation.',
  },
  'home-services': {
    slug: 'home-services',
    h1: 'Marketing for Plumbing, HVAC, Electrical, and Home Services Contractors',
    subhead: 'Home services contractors get found locally, handle emergency calls, and turn reviews into repeat business — not brand awareness campaigns.',
    problemSolution: 'Problem / Solution\n\nHome services businesses live or die by local visibility and emergency response, but most marketing treats them like national brands. The fix: local search dominance, emergency call systems, and review management that drives repeat business.',
    commonChallenges: [
      'Not showing up in local search for "plumber near me" or emergency service queries',
      'No system to handle emergency calls 24/7 — missed calls mean missed business',
      'Reviews exist but aren\'t actively managed or turned into a marketing asset',
      'Website doesn\'t clearly show service area, emergency availability, or response time',
      'No way to track which marketing channels actually drive service calls',
    ],
    recommendedServices: [
      { service: 'seo', reason: 'Local search dominance for emergency queries and service-area specific terms that drive immediate calls.' },
      { service: 'web-design', reason: 'Clear service area display, emergency call buttons, and mobile-first design for customers in urgent situations.' },
      { service: 'reputation', reason: 'Active review collection, response systems, and turning happy customers into a marketing asset that drives new business.' },
      { service: 'paid-ads', reason: 'Targeted local ads for emergency services and seasonal demand (HVAC in summer, plumbing in winter) that drive immediate calls.' },
    ],
    whoItsFor: 'Plumbing contractors. HVAC companies. Electricians. Any home services business where local visibility, emergency response, and reputation drive business.',
    industrySpecific: 'Home services marketing is different because customers often need immediate help, search locally, and decide based on reviews and availability. A beautiful brand story doesn\'t matter when someone has a burst pipe at 10pm. The focus is on being found, being available, and being trusted.',
    faqs: [
      {
        q: 'How do you handle emergency calls outside business hours?',
        a: 'Emergency call systems are set up — whether that\'s an after-hours answering service, call routing, or clear messaging about availability. The goal is ensuring emergency calls don\'t go unanswered.',
      },
      {
        q: 'Should a home services business use social media?',
        a: 'Social media can work for showcasing completed jobs and building local presence, but the priority is local search and review management. That\'s where customers actually look when they need emergency services.',
      },
      {
        q: 'How long does it take to show up in local search results?',
        a: 'Local SEO can start showing improvements in 1-3 months, but emergency service ads can drive calls immediately. The focus is on building sustainable local visibility while capturing immediate demand.',
      },
      {
        q: 'Do you handle review responses?',
        a: 'Review response systems are set up, and templates are provided for common scenarios. Whether responses are handled by you or automated depends on your preference and volume.',
      },
      {
        q: 'How do you track which marketing drives actual service calls?',
        a: 'Call tracking, form tracking, and local search analytics are set up to measure which channels actually drive phone calls and service requests — not just website visits.',
      },
    ],
    finalCtaText: 'Ready to build a home services marketing system that drives emergency calls and repeat business?',
    metaTitle: 'Marketing for Plumbing, HVAC, Electrical, and Home Services | YDM Agency',
    metaDescription: 'Specialized marketing for home services contractors — local search, emergency call systems, and review management. Not brand awareness campaigns.',
  },
  'solopreneurs': {
    slug: 'solopreneurs',
    h1: 'Marketing for Day Care, Salons, Tattoo Studios, and Solo-preneurs',
    subhead: 'Solo-preneurs and personal service businesses build local visibility and appointment systems that work while you focus on clients — not complex enterprise tools.',
    problemSolution: 'Problem / Solution\n\nSolo-preneurs need marketing that works while they\'re with clients, but most solutions are built for businesses with marketing teams. The fix: appointment systems, local visibility, and automated follow-up that doesn\'t require constant attention.',
    commonChallenges: [
      'No online booking system — appointments happen over phone or text, which is time-consuming',
      'Not showing up in local search for the specific service and area',
      'No automated follow-up or reminder system — no-shows and missed opportunities',
      'Marketing that requires daily management when you\'re busy with clients',
      'No way to showcase work, pricing, or availability without constant updates',
    ],
    recommendedServices: [
      { service: 'web-design', reason: 'Online booking integration, service menu display, and mobile-first design for customers booking on the go.' },
      { service: 'automation', reason: 'Automated appointment reminders, follow-up sequences, and no-show reduction that works while you\'re with clients.' },
      { service: 'seo', reason: 'Local search visibility for your specific service and area — customers finding you when they\'re ready to book.' },
      { service: 'analytics', reason: 'Track which marketing drives actual bookings, not just website visits, so you know where to focus your limited time.' },
    ],
    whoItsFor: 'Day care providers. Hair salons and barbershops. Nail salons and nail technicians. Tattoo studios and tattoo artists. Any solo-preneur or personal service business where appointments and local visibility drive business.',
    industrySpecific: 'Solo-preneur marketing is different because time is the limiting factor — you can\'t manage complex marketing systems when you\'re with clients all day. The focus is on set-and-forget systems: online booking, automated reminders, and local visibility that drive appointments without constant attention.',
    faqs: [
      {
        q: 'Do I need a complex CRM as a solo-preneur?',
        a: 'No. Simple automation for appointment reminders and follow-up is often enough. The goal is reducing no-shows and capturing rebookings, not managing a complex sales pipeline.',
      },
      {
        q: 'How long does it take to set up online booking?',
        a: 'Online booking integration can be set up in 1-2 weeks, depending on the system and your existing processes. The focus is on something that works for how you actually run your business.',
      },
      {
        q: 'Should a solo-preneur use social media?',
        a: 'Social media can work for showcasing work and building local presence, especially for visual businesses like salons and tattoo studios. But the priority is local search and booking systems that drive appointments.',
      },
      {
        q: 'How do you handle marketing when I\'m busy with clients?',
        a: 'Marketing systems are designed to be set-and-forget: automated reminders, local SEO that builds over time, and booking systems that work without daily management. You focus on clients; the system handles the rest.',
      },
      {
        q: 'What if I don\'t have time to create content or manage marketing?',
        a: 'Minimal-content approaches work for solo-preneurs. The focus is on systems that drive appointments — local search, booking integration, automated reminders — not content marketing that requires constant creation.',
      },
    ],
    finalCtaText: 'Ready to build a solo-preneur marketing system that drives appointments while you focus on clients?',
    metaTitle: 'Marketing for Day Care, Salons, Tattoo Studios, and Solo-preneurs | YDM Agency',
    metaDescription: 'Specialized marketing for solo-preneurs — online booking, local visibility, and automated follow-up. Not complex enterprise tools.',
  },
};
