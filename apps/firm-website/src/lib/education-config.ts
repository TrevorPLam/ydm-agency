export interface EducationLessonSection {
  heading: string;
  body: string;
}

export interface EducationLesson {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  attribution: string;
  safety: 'public-domain' | 'cite-creator' | 'extra-care';
  metaTitle: string;
  metaDescription: string;
  sections: EducationLessonSection[];
  lastUpdated?: string;
}

export interface EducationTopic {
  slug: string;
  name: string;
  description: string;
  icon: string;
  order: number;
}

export const EDUCATION_TOPICS: EducationTopic[] = [
  {
    slug: 'seo',
    name: 'SEO',
    description: 'Search engine optimization fundamentals and technical implementation',
    icon: 'Search',
    order: 1,
  },
  {
    slug: 'conversion',
    name: 'Conversion',
    description: 'Conversion rate optimization and landing page best practices',
    icon: 'Target',
    order: 2,
  },
  {
    slug: 'foundations',
    name: 'Foundations',
    description: 'Core marketing principles and frameworks that form the foundation of effective strategy',
    icon: 'BookOpen',
    order: 3,
  },
  {
    slug: 'strategy',
    name: 'Strategy',
    description: 'Strategic frameworks and models for marketing planning and execution',
    icon: 'Lightbulb',
    order: 4,
  },
  {
    slug: 'compliance',
    name: 'Compliance',
    description: 'Legal and ethical considerations in marketing, including attribution and intellectual property',
    icon: 'Shield',
    order: 5,
  },
];

// Helper function to get lessons by topic
export function getLessonsByTopic(topicSlug: string): EducationLesson[] {
  return EDUCATION_LESSONS.filter((lesson) => lesson.topic.toLowerCase() === topicSlug.toLowerCase());
}

// Helper function to get all unique topics from lessons
export function getTopicsFromLessons(): string[] {
  const topics = new Set(EDUCATION_LESSONS.map((lesson) => lesson.topic));
  return Array.from(topics).sort();
}

// Helper function to get topic metadata
export function getTopicBySlug(slug: string): EducationTopic | undefined {
  return EDUCATION_TOPICS.find((topic) => topic.slug === slug);
}

export const EDUCATION_LESSONS: EducationLesson[] = [
  {
    slug: 'google-search-console-performance-report',
    title: 'How to Read a Google Search Console Performance Report',
    summary:
      'Search Console is the most direct source of truth for how a site appears in Google. This guide explains the four core metrics — impressions, clicks, CTR, and average position — and how to turn them into action.',
    topic: 'SEO',
    level: 'Beginner',
    readTime: '8 min',
    attribution: 'Based on Google Search Console documentation',
    safety: 'public-domain',
    metaTitle: 'How to Read a Google Search Console Performance Report | YDM Agency',
    metaDescription:
      'A beginner-friendly guide to Google Search Console metrics: impressions, clicks, CTR, and average position — and how to turn them into SEO action.',
    lastUpdated: '2024-01-15',
    sections: [
      {
        heading: 'What Search Console Measures',
        body: `Google Search Console is a free tool that shows how a site appears in Google Search. Unlike analytics platforms that track what happens after a visitor arrives, Search Console tracks what happens before the click: how often a page is shown, whether it is clicked, and where it ranks.

The Performance report is the most-used view. It answers the core question: is the site being seen, and is it being chosen?`,
      },
      {
        heading: 'The Four Core Metrics',
        body: `Impressions
An impression is counted whenever a page appears in a search result, even if the user does not scroll to it. High impressions mean the page is in Google's index and is being considered for relevant queries. Impressions alone do not measure traffic; they measure visibility.

Clicks
A click is counted when a user selects a search result and lands on the site. Clicks are the bridge between visibility and traffic. A page with high impressions but low clicks is being seen but not chosen.

CTR (Click-Through Rate)
CTR is the percentage of impressions that result in a click. It is calculated by dividing clicks by impressions. A high CTR usually means the title and description are relevant and compelling. A low CTR with high impressions often signals that the result does not match searcher intent or is being outranked by stronger results.

Average Position
This is the mean ranking position of the page across all queries. It is an average, so a single page can rank position 2 for one keyword and position 42 for another and show an average of 22. Use it as a directional signal, not an exact rank.`,
      },
      {
        heading: 'How to Filter and Compare',
        body: `The Performance report can be filtered by query, page, country, device, search appearance, and date. Each filter reveals a different story.

Start with queries. Look for terms with high impressions but low CTR. These are opportunities: the page is relevant, but the snippet is not winning the click. Rewriting the title tag or meta description can improve CTR without changing rankings.

Then look at pages. Sort by impressions to find the site's biggest visibility sources. Sort by clicks to find the biggest traffic sources. Pages with high impressions and low clicks are the fastest wins.

Use the compare mode to measure the impact of a change. Compare two date ranges before and after a content update or technical fix to see if clicks, impressions, or CTR moved.`,
      },
      {
        heading: 'Turning Data Into Action',
        body: `High impressions + low CTR = the page ranks but the snippet is weak. Improve the title and description.

Low impressions + high CTR = the snippet is effective but the page does not rank for many queries. Expand the content or build authority.

High impressions + high CTR = the page is working. Protect it and consider adjacent keywords.

Average position between 8 and 15 is a common opportunity zone. These pages are on the edge of page one. A content refresh, better internal linking, or stronger meta tags can push them into the top results and multiply traffic.

Set a regular rhythm: review the Performance report weekly, filter by page and query, and focus on the biggest gaps between visibility and clicks.`,
      },
      {
        heading: 'Common Mistakes to Avoid',
        body: `Do not treat average position as a single rank for a single keyword. It is an average.

Do not panic over short-term swings. Search Console data is delayed and can fluctuate day to day. Look at trends over weeks and months.

Do not ignore the query filter. The overall report blends every keyword. The real insight lives in the query and page combinations.

Do not confuse Search Console with Google Analytics. Search Console measures search appearance and clicks. Analytics measures on-site behavior. Both are needed for a complete picture.`,
      },
    ],
  },
  {
    slug: 'conversion-rate-optimization-guide',
    title: "A Beginner's Guide to Conversion Rate Optimization",
    summary:
      'Traffic without conversions is expensive noise. This lesson covers the fundamentals of conversion rate optimization: measurement, landing-page structure, friction reduction, and testing discipline for small business sites.',
    topic: 'Conversion',
    level: 'Beginner',
    readTime: '10 min',
    attribution: 'Established industry practices',
    safety: 'public-domain',
    metaTitle: "A Beginner's Guide to Conversion Rate Optimization | YDM Agency",
    metaDescription:
      'Learn the fundamentals of conversion rate optimization: measurement, landing page structure, friction reduction, and testing discipline for small businesses.',
    lastUpdated: '2024-01-20',
    sections: [
      {
        heading: 'What CRO Is and Why It Matters',
        body: `Conversion rate optimization is the practice of increasing the percentage of visitors who take a desired action. That action might be a purchase, a form submission, a phone call, a newsletter sign-up, or any other business goal.

A site that attracts 1,000 visitors and converts 1% earns 10 conversions. A site that converts 3% earns 30 conversions from the same traffic. CRO makes existing traffic more valuable, which is usually cheaper than buying more traffic.`,
      },
      {
        heading: 'Measurement: Establish the Baseline',
        body: `Before changing anything, define the conversion rate. Choose one primary conversion per page or campaign. Then calculate:

Conversion rate = conversions / visitors

Track this over a meaningful window. A few days of data is not enough. Use at least a few weeks, or until the sample size is statistically useful.

Also track the conversion value. Not every conversion is equal. A lead form may be worth more than an email sign-up. Weight the numbers by business value when deciding where to focus.`,
      },
      {
        heading: 'Landing Page Structure',
        body: `A strong landing page has a clear promise, a single primary action, and enough proof to support the promise.

The headline should match the source that brought the visitor. If an ad promises a free project outline, the landing page headline should say the same. Mismatches kill conversion.

The primary call to action should be above the fold and repeated throughout the page for long-form content. Buttons should be specific: "Get a Free Project Outline" converts better than "Submit."

Proof can include client results, process clarity, guarantees, or social proof. YDM Agency does not use testimonials at launch, so process transparency and clear outcomes become the trust signals.`,
      },
      {
        heading: 'Friction Reduction',
        body: `Friction is anything that makes the next step harder. Common sources include long forms, unnecessary fields, slow load times, unclear next steps, and distracting navigation.

Audit each form. Remove fields that are not required. Use progress indicators for multi-step forms. Pre-fill information when possible.

Check mobile experience. Most small business traffic is mobile. Buttons should be easy to tap, text should be readable without zooming, and forms should not require excessive scrolling.

Reduce cognitive load. Too many choices, too much text, or too many competing actions dilute attention. Each page should guide the visitor toward one clear decision.`,
      },
      {
        heading: 'Testing Discipline',
        body: `CRO without testing is guesswork. The two most common approaches are A/B testing and before-and-after analysis.

A/B testing shows two versions of a page to different visitor segments and measures which converts better. It requires enough traffic to reach significance. Small sites may not have the volume for reliable A/B tests.

Before-and-after analysis compares conversion rate before and after a change. Control for external factors like seasonality, ad spend, and traffic source mix. A single change at a time makes the result easier to interpret.

Document every test, hypothesis, result, and decision. Over time this becomes a conversion playbook for the business.`,
      },
      {
        heading: 'Quick Wins for Small Business Sites',
        body: `Start with the highest-traffic pages. Improving a page that receives 50% of traffic has more impact than improving a page that receives 1%.

Fix the biggest leaks first. A broken form, a missing call to action, or a slow mobile page can destroy conversion with a single fix.

Match messaging to intent. Use the words visitors used to find the page. Search Console and ad keywords are good sources for this language.

Test one change at a time and measure for at least two weeks. Patience and discipline convert more visitors than random redesigns.`,
      },
    ],
  },
  {
    slug: 'technical-seo-checklist-small-business',
    title: 'Technical SEO Checklist for Small Business Websites',
    summary:
      'Small sites often lose rankings to technical issues that are easy to fix. This checklist covers crawling, indexing, Core Web Vitals, structured data, and local SEO signals that matter most for smaller budgets.',
    topic: 'SEO',
    level: 'Intermediate',
    readTime: '12 min',
    attribution: 'Established SEO best practices',
    safety: 'public-domain',
    metaTitle: 'Technical SEO Checklist for Small Business Websites | YDM Agency',
    metaDescription:
      'A practical technical SEO checklist for small business sites: crawling, indexing, Core Web Vitals, structured data, and local SEO signals.',
    lastUpdated: '2024-01-18',
    sections: [
      {
        heading: 'Crawling and Indexing',
        body: `Google must be able to crawl and index a page before it can rank. Start with the basics.

Check the robots.txt file. It should not block important pages or resources. It should block admin areas, staging environments, and low-value parameters.

Review the XML sitemap. It should list canonical, indexable pages and be submitted in Search Console. Remove redirects, 404s, and no-indexed pages.

Fix crawl errors. Use Search Console's Coverage report to find pages excluded from indexing. Common causes include noindex tags, canonical errors, 4xx/5xx status codes, and orphan pages.

Improve internal linking. Every important page should be reachable within a few clicks from the homepage. Use descriptive anchor text. Avoid navigation that depends on JavaScript without fallback links.`,
      },
      {
        heading: 'Core Web Vitals and Performance',
        body: `Core Web Vitals measure loading, interactivity, and visual stability. They affect user experience and rankings.

Largest Contentful Paint (LCP) should occur within 2.5 seconds of page load. Optimize images, use a fast host, and eliminate render-blocking resources.

First Input Delay (FID) measures interactivity. Reduce JavaScript execution time and break long tasks. In practice, this often means deferring non-critical scripts.

Cumulative Layout Shift (CLS) measures visual stability. Size images and embeds with explicit dimensions, and avoid injecting content above existing content as it loads.

Use PageSpeed Insights and Search Console's Core Web Vitals report to identify problem pages and measure improvements.`,
      },
      {
        heading: 'Structured Data',
        body: `Structured data helps search engines understand the content and can enable rich results. Small businesses should focus on the markup that directly applies.

LocalBusiness markup identifies the business name, address, phone, and service area. It supports local pack visibility and knowledge panels.

Organization markup is useful for brand searches and is often placed on the homepage.

BreadcrumbList markup improves breadcrumb display in search results.

FAQ and HowTo markup can expand search results, but use them only where the content genuinely qualifies. Misuse can lead to manual actions.

Validate all structured data with Google's Rich Results Test before publishing.`,
      },
      {
        heading: 'Local SEO Signals',
        body: `Small businesses with a physical location or service area must reinforce local signals.

Create or claim the Google Business Profile. Keep the name, address, phone, hours, and categories consistent with the website.

Use local schema markup with the same NAP (Name, Address, Phone) as the Google Business Profile.

Build location pages only when they make sense. A single page for every town without unique value can look thin. Better pages include specific service details, local context, and proof of work in that area.

Earn local citations and links from relevant directories, chambers of commerce, and community sites. Consistency across listings matters more than quantity.`,
      },
      {
        heading: 'On-Page Technical Basics',
        body: `Every page should have a unique, descriptive title tag under 60 characters and a meta description under 160 characters.

Use one H1 per page and a logical heading hierarchy. Headings should describe the content, not just format it.

Implement canonical tags to prevent duplicate content issues. Common duplicates come from pagination, query parameters, and print-friendly URLs.

Keep URLs short, descriptive, and static. Avoid unnecessary parameters and session IDs.

Use HTTPS sitewide. It is a baseline expectation and a minor ranking signal.`,
      },
      {
        heading: 'Maintenance Habits',
        body: `Technical SEO is not a one-time task. Run a monthly check using Search Console and a crawling tool.

Watch for new coverage errors, sudden drops in clicks, and Core Web Vitals regressions after updates.

Review redirects after any site change. Broken redirect chains and loops waste crawl budget and confuse users.

Keep plugins, themes, and the CMS updated. Security issues and performance regressions often come from outdated software.

Document the technical SEO baseline. When problems appear, a documented baseline makes diagnosis much faster.`,
      },
    ],
  },
  {
    slug: 'public-domain-marketing-ux-principles',
    title: 'Public Domain Marketing & UX Principles',
    summary:
      "A guide to foundational principles that can be taught freely: Hick's Law, Fitts's Law, Gestalt principles, the inverted pyramid, F-pattern and Z-pattern reading, the 5-second test, FAB, the SUCCESs model, and Lauterborn's 4Cs.",
    topic: 'Foundations',
    level: 'Beginner',
    readTime: '10 min',
    attribution: 'Public domain concepts — originators noted for credibility',
    safety: 'public-domain',
    metaTitle: 'Public Domain Marketing & UX Principles | YDM Agency',
    metaDescription:
      'A guide to public-domain marketing and UX principles that can be taught freely, with origins and practical application notes.',
    lastUpdated: '2024-01-22',
    sections: [
      {
        heading: 'What Public Domain Means for Marketers',
        body: `Public-domain concepts are ideas that no single person or company owns. They come from academic research, journalism, sales training, or common observation. Marketers can explain and apply them freely without asking permission or paying licensing fees.

That freedom comes with a responsibility: be accurate, name the originator when known, and add original value. Passing off a century-old principle as a proprietary invention damages credibility. Treating a public-domain idea as a generic platitude wastes the reader's time.

This lesson covers the most useful public-domain principles for web design, copywriting, and marketing strategy.`,
      },
      {
        heading: 'The Public Domain Frameworks',
        body: `Hick's Law
Named after psychologist William Edmund Hick, this principle says that decision time grows as the number of choices grows. Use it to simplify navigation, pricing tiers, and form fields.

Fitts's Law
Named after psychologist Paul Fitts, this principle describes how the time to reach a target depends on its size and distance. Larger, closer buttons and links convert better.

Gestalt Principles
Originating in early 20th-century psychology through the work of Max Wertheimer, Kurt Koffka, and Wolfgang Köhler, these principles explain how people perceive groups and patterns. Proximity, similarity, and continuity shape how users scan a page.

Inverted Pyramid
This journalistic convention places the most important information first and adds detail below. It works for web copy because readers often scan and leave quickly.

F-Pattern and Z-Pattern
These patterns come from published eye-tracking studies, especially from the Nielsen Norman Group. The F-pattern shows how readers scan text-heavy pages; the Z-pattern describes how eyes move across simpler, visually driven layouts.

Cialdini's 7 Principles
Robert Cialdini's academic and popular work covers reciprocity, commitment, social proof, authority, liking, scarcity, and unity. Cialdini teaches these openly. Name him and avoid claiming the model as your own.

The 5-Second Test / Clarity Principle
This generic UX method tests whether a page communicates its purpose within five seconds. It is a quick way to find clarity problems.

FAB (Features, Advantages, Benefits)
This classic sales-training concept turns product details into customer outcomes. It is so widely taught that the original source is untraceable.

SUCCESs Model
From Chip and Dan Heath's book Made to Stick, this model describes ideas that are Simple, Unexpected, Concrete, Credible, Emotional, and Stories. Cite the book when using it.

Lauterborn's 4Cs
Robert Lauterborn published the 4Cs (Consumer, Cost, Convenience, Communication) in 1990 as a customer-centered alternative to the 4Ps. Citing the original article or author is good practice.`,
      },
      {
        heading: 'How to Apply These Principles',
        body: `Use these principles to explain design and copy decisions, not to decorate slides. A marketer should be able to connect a choice to a problem the principle solves.

For example, when reducing a form from ten fields to four, cite Hick's Law. When moving a call-to-action button closer to the preceding paragraph, cite Fitts's Law. When rewriting a headline to lead with the customer benefit, mention the inverted pyramid.

Always add a specific example. Generic definitions can be found anywhere. The value is in showing how the principle applies to a real business or page.`,
      },
      {
        heading: 'Attribution Best Practices',
        body: `Name the originator when one is known. "Hick's Law, named after psychologist William Edmund Hick" is enough to show awareness.

Link to a primary source when possible. For Cialdini, that might be his book or academic profile. For the SUCCESs Model, link to the book or the authors' site.

Add your own commentary. Summarize the principle, then explain when to use it, when to ignore it, and how it interacts with other principles. Original analysis turns a definition into a useful resource.

Do not invent sources. If the origin is unclear, say so. Do not claim public-domain principles as proprietary methods.`,
      },
      {
        heading: 'What to Avoid',
        body: `Avoid copying descriptions word for word from another site, even for public-domain ideas. Paraphrase and add value.

Avoid presenting a well-known principle as a secret framework. Audiences recognize generic advice dressed up as proprietary IP.

Avoid over-relying on jargon. The goal is to make the concept useful, not to impress the reader with terminology.

Avoid mixing principles carelessly. Hick's Law and Fitts's Law are related but not interchangeable. Use each principle for the problem it actually solves.`,
      },
    ],
  },
  {
    slug: 'named-frameworks-proper-attribution',
    title: 'Named Frameworks and Proper Attribution',
    summary:
      "A guide to widely taught models that require clear attribution: Cialdini's 7 principles, BJ Fogg's Behavior Model, Avinash Kaushik's See-Think-Do-Care, John Jantsch's Marketing Hourglass, Dave Chaffey's RACE, Russell Brunson's Hook-Story-Offer, and Ray Edwards' PASTOR.",
    topic: 'Strategy',
    level: 'Intermediate',
    readTime: '12 min',
    attribution: 'Cite the creator in every reference',
    safety: 'cite-creator',
    metaTitle: 'Named Frameworks and Proper Attribution | YDM Agency',
    metaDescription:
      'A guide to widely taught named marketing frameworks and how to attribute them correctly, with creators and source links.',
    lastUpdated: '2024-01-25',
    sections: [
      {
        heading: 'Why Named Frameworks Need Credit',
        body: `A named framework is strongly associated with a specific person, firm, or consulting practice. The creator usually encourages educational sharing, but expects the name to stay attached. Failing to credit can look like plagiarism, even when the framework is widely known.

Correct attribution does two things. It protects the publisher legally and reputationally, and it builds credibility. A page that says "According to BJ Fogg's Behavior Model..." is more trustworthy than a page that presents the same idea without a source.

The rule is simple: name the originator every time.`,
      },
      {
        heading: 'The Named Frameworks',
        body: `Fogg Behavior Model (B=MAT)
Created by Dr. BJ Fogg at the Stanford Behavior Design Lab. The model states that behavior happens when Motivation, Ability, and a Prompt come together at the same moment. Fogg encourages people to use the model. Cite it as "BJ Fogg's Behavior Model" and consider linking to behaviormodel.org.

See-Think-Do-Care
Created by Avinash Kaushik, Digital Marketing Evangelist at Google. The framework maps content to audience intent: See (largest audience), Think (potential customers), Do (ready to buy), and Care (existing customers). Kaushik shares it freely for educational use. Link to kaushik.net.

Marketing Hourglass
Created by John Jantsch of Duct Tape Marketing. The hourglass extends the traditional funnel to include know, like, trust, try, buy, repeat, and refer. Reference it as "John Jantsch's Marketing Hourglass."

RACE Framework
Created by Dave Chaffey of Smart Insights. RACE stands for Reach, Act, Convert, and Engage. It is a cornerstone of Smart Insights training. Cite "Dave Chaffey's RACE framework" and link to smartinsights.com.

Hook-Story-Offer
Associated with Russell Brunson and ClickFunnels. The framework structures sales messaging around a hook that grabs attention, a story that builds connection, and an offer that creates desire. Attribute it as "Russell Brunson's Hook-Story-Offer."

PASTOR
Often credited to copywriter Ray Edwards. PASTOR stands for Problem, Amplify, Solution, Testimony, Offer, and Response. It is not trademarked but is closely linked to Edwards' teachings. Use "Ray Edwards' PASTOR framework."`,
      },
      {
        heading: 'How to Phrase Attribution',
        body: `Attribution should appear near the first mention of the framework. A simple formula works:

"According to [Creator]'s [Framework], [short explanation]."

For example: "According to BJ Fogg's Behavior Model, behavior requires motivation, ability, and a prompt to occur simultaneously."

Repeat the attribution when the framework is referenced again if the section is long. In a short article, once near the first mention is enough.

Do not use generic phrases like "a popular model says" when the model has a named creator. That weakens attribution and looks evasive.`,
      },
      {
        heading: 'Linking to Primary Sources',
        body: `Links to primary sources show good internet citizenship and help SEO. They also reduce confusion about who created the framework.

For academic or consulting frameworks, link to the creator's official site or a primary publication. For example:

BJ Fogg: behaviormodel.org
Avinash Kaushik: kaushik.net
John Jantsch: ducttapemarketing.com
Dave Chaffey / Smart Insights: smartinsights.com
Russell Brunson: clickfunnels.com
Ray Edwards: rayedwards.com

Use nofollow on links if the site has a policy of not passing authority, but the link itself still serves the reader. Avoid affiliate or tracking parameters that could change the nature of the citation.`,
      },
      {
        heading: 'Common Attribution Mistakes',
        body: `The most common mistake is presenting the framework as a generic idea. "The behavior model says..." is not enough. "BJ Fogg's Behavior Model says..." is.

Another mistake is using the creator's name once in the introduction and then implying the framework belongs to the publisher. The name should stay attached throughout.

A third mistake is misrepresenting the framework. If the summary omits a key element or changes the meaning, the attribution becomes misleading. Summarize accurately, then add commentary.

Finally, avoid implying endorsement. "YDM Agency uses BJ Fogg's Behavior Model" is fine. "BJ Fogg recommends YDM Agency" is not, unless it is true and documented.`,
      },
      {
        heading: 'How to Add Original Value',
        body: `Attribution is the starting point. The real value comes from application. After explaining the framework, show how it applies to a specific business, industry, or campaign.

For example, apply the RACE framework to a local service business. In the Reach phase, use local SEO and paid search. In the Act phase, drive visitors to a clear landing page. In the Convert phase, simplify the quote request form. In the Engage phase, follow up with email.

This transforms the framework from a definition into a usable case study. It also strengthens the publisher's fair-use position by adding commentary and original examples.`,
      },
    ],
  },
  {
    slug: 'proprietary-frameworks-safe-sharing',
    title: 'Proprietary Frameworks: How to Share Safely',
    summary:
      "A guide to handling frameworks that are core IP for training companies: SOSTAC®, Widerfunnel's LIFT Model, MECLABS conversion heuristic, and DigitalMarketer's Customer Value Journey. Includes trademark symbols, source links, and fair-use boundaries.",
    topic: 'Compliance',
    level: 'Advanced',
    readTime: '10 min',
    attribution: 'Trademark and copyright awareness required',
    safety: 'extra-care',
    metaTitle: 'Proprietary Frameworks: How to Share Safely | YDM Agency',
    metaDescription:
      'A guide to safely sharing proprietary marketing frameworks, including trademark notices, source links, and fair-use boundaries.',
    lastUpdated: '2024-01-28',
    sections: [
      {
        heading: 'What Makes a Framework Proprietary',
        body: `Proprietary frameworks are core intellectual property for consulting or training companies. They may be trademarked, copyrighted, or closely tied to paid courses, certifications, and licensing. Sharing them without care can lead to takedown requests, legal issues, or reputational damage.

That does not mean they cannot be discussed. Educational commentary, teaching, and critique are generally protected under fair-use principles in the United States and fair-dealing principles in other jurisdictions. The key is to avoid implying endorsement, reselling materials, or copying proprietary training assets.

This lesson covers four common proprietary frameworks and how to discuss them safely.`,
      },
      {
        heading: 'The Proprietary Frameworks',
        body: `SOSTAC®
SOSTAC® is a registered trademark of PR Smith. The name stands for Situation, Objectives, Strategy, Tactics, Action, and Control. Use the ® symbol on first mention and include a notice such as "SOSTAC® is a registered trademark of PR Smith." Smith provides free planning templates on his site and often allows educational use with proper attribution, but check the official guidelines before publishing.

LIFT Model
Owned by Widerfunnel, a conversion optimization agency. The model identifies six factors that affect conversion: Value Proposition, Clarity, Relevance, Distraction, Urgency, and Anxiety. Widerfunnel has published extensively about it. Present it as "Widerfunnel's LIFT Model" and do not claim to offer LIFT certification.

MECLABS Conversion Heuristic
Created by the MECLABS Institute, parent of MarketingExperiments. The formula (C = 4m + 3v + 2(i-f) - a) is part of their published research and courses. Clearly credit MECLABS and link to meclabs.com. Do not present the formula as a proprietary method of the publisher.

Customer Value Journey
Associated with DigitalMarketer. The eight-stage journey is a central part of DigitalMarketer's paid training. High-level overviews have been published, but detailed diagrams and certification materials are protected. Stick to high-level explanation and cite DigitalMarketer. Avoid selling it as a Customer Value Journey masterclass.`,
      },
      {
        heading: 'Trademark Symbols and Legal Notices',
        body: `For registered trademarks, use the ® symbol on first use in the article. After the first mention, the regular name is usually sufficient.

For unregistered but proprietary names, a courtesy notice helps. "LIFT Model is a proprietary framework of Widerfunnel" is a safe opening line.

Do not alter the spelling or add generic markers that could confuse ownership. SOSTAC® should not become "SOSTAC method" without the mark unless the source does so.

Place the legal notice near the first mention, not hidden in a footer. Visible attribution reduces risk and shows respect for the creator's IP.`,
      },
      {
        heading: 'Fair Use Boundaries',
        body: `Fair use protects commentary, criticism, teaching, scholarship, and research. For a marketing article, this means explaining the framework, adding original analysis, and using the framework as a reference point.

What crosses the line:

Reproducing a proprietary diagram, workbook, or slide deck in full.
Selling a course or template that copies the framework's structure.
Implying the publisher is certified, endorsed, or affiliated with the framework owner.
Using the framework name in ads in a way that suggests official approval.

What stays safe:

A high-level summary in your own words.
A link to the framework owner's official site.
Original examples or critiques.
A clear statement that the framework belongs to the owner.`,
      },
      {
        heading: 'When to Ask Permission',
        body: `If the planned use goes beyond a short educational explanation, permission is the safest path. This includes creating videos, downloadable templates, or paid training based on the framework.

Smaller framework owners are often responsive to a short, polite email. PR Smith, for example, has been described as approachable for courtesy requests. A brief note explaining the planned article and how attribution will be handled can turn a gray area into a clear green light.

Keep records of any permissions. A saved email or written agreement is valuable if a dispute ever arises.`,
      },
      {
        heading: 'Safe Sharing Checklist',
        body: `Before publishing a page about a proprietary framework, run through this list:

Name the owner in the first mention.
Use trademark symbols where required.
Link to the primary source.
Explain the framework in your own words.
Add original commentary, examples, or comparisons.
Do not reproduce protected diagrams or training materials.
Do not claim certification or endorsement.
Do not resell the framework as a course or template.
When in doubt, ask for permission.

Following these rules keeps educational content on the right side of trademark and copyright law while still providing value to readers.`,
      },
    ],
  },
];
