import type { EducationLesson } from './types';

export const NEW_SEO_LESSONS: EducationLesson[] = [
  {
    slug: 'how-search-engines-work-crawling-indexing-ranking',
    title: 'How Search Engines Actually Work (Crawling, Indexing, Ranking)',
    summary:
      'Before optimizing a page, it helps to understand the pipeline it has to pass through. This lesson breaks down the three-stage process search engines use — crawling, indexing, and ranking — and explains why a page can exist, be perfectly written, and still never show up in results.',
    topic: 'SEO',
    level: 'Beginner',
    readTime: '9 min',
    attribution: 'Based on Google Search Central documentation',
    safety: 'public-domain',
    learningOutcome:
      "explain the difference between crawling, indexing, and ranking, and use that model to diagnose why a specific page is not appearing in search results.",
    metaTitle: 'How Search Engines Actually Work (Crawling, Indexing, Ranking) | YDM Agency',
    metaDescription:
      'A plain-language breakdown of crawling, indexing, and ranking — the three-stage process that determines whether a page ever shows up in Google.',
    lastUpdated: '2026-01-05',
    sections: [
      {
        heading: 'Three Separate Problems, Not One',
        body: `New site owners tend to treat "getting found on Google" as a single switch to flip. In reality, a page has to clear three separate, sequential hurdles: it has to be crawled, it has to be indexed, and only then does it compete to be ranked. A failure at any one stage means the page will not appear in search results, and the fix for each stage is completely different.

This matters because most "why am I not ranking" questions are actually "why am I not indexed" questions, and most "why am I not indexed" questions are actually "why can't Google crawl this" questions. Working backward through the pipeline, in order, is the fastest way to diagnose a visibility problem.`,
      },
      {
        heading: 'Stage One: Crawling',
        body: `Crawling is the discovery stage. Automated programs called crawlers (Google's is called Googlebot) find URLs by following links from pages they already know about, by reading XML sitemaps submitted through Search Console, and by following redirects from other known URLs.

A page cannot move to the next stage if it cannot be found or if it is actively blocked. Common crawl blockers include a robots.txt file that disallows the path, a page with no internal links pointing to it (an "orphan" page), a server that returns errors or times out when the crawler requests it, and login walls or paywalls that prevent access entirely.

Crawling is not guaranteed or unlimited. Google allocates a "crawl budget" to each site based on its size and how reliably its server responds. Sites with thousands of low-value or duplicate URLs can waste crawl budget on pages that do not matter, which delays discovery of the pages that do.`,
      },
      {
        heading: 'Stage Two: Indexing',
        body: `Once a page is crawled, Google decides whether to add it to the index — the enormous database of pages eligible to appear in search results. Being crawled does not guarantee being indexed. Google evaluates the page's content, checks for duplication against other pages (including other pages on the same site), and looks at signals like the canonical tag to decide which version of a page, if any, to keep.

Pages commonly get crawled but not indexed for a few reasons: the content is thin or near-duplicate of another page, a noindex meta tag or header is present (sometimes left over from a staging environment by accident), or the page's canonical tag points to a different URL.

Search Console's URL Inspection tool will show the exact status of any URL: whether it was crawled, whether it is indexed, and if not, the specific reason Google gives. This is the single most useful diagnostic tool for this stage, and it should be the first stop before assuming a ranking problem.`,
      },
      {
        heading: 'Stage Three: Ranking',
        body: `Only indexed pages are eligible to be ranked, and ranking is where competition happens. When someone runs a search, Google's ranking systems evaluate every indexed page that could plausibly be relevant and order them using hundreds of signals, broadly grouped into relevance (does the page match the meaning of the query), quality and expertise, usability (page speed, mobile-friendliness, safe browsing), and context (location, language, and search history).

This is also the stage most SEO advice actually targets: content quality, keyword usage, backlinks, page experience, and structured data all influence ranking, not crawling or indexing. Applying ranking-stage fixes to a page that is not even indexed yet will not help, which is why diagnosing in order matters.`,
      },
      {
        heading: 'A Simple Diagnostic Order',
        body: `When a page is not showing up for a search where it should, work through the pipeline in this order.

First, confirm the page is not blocked. Check robots.txt, check for a noindex tag, and check that it returns a normal 200 status code rather than an error or redirect.

Second, check indexing status in Search Console's URL Inspection tool. If it says "Discovered, currently not indexed" or "Crawled, currently not indexed," the problem is content quality, duplication, or a canonical conflict, not a ranking problem.

Third, if the page is indexed and still not visible for a target search, only then look at ranking factors: does the content actually answer the query, does the page load quickly, is it linked to from other relevant pages, and does a genuinely stronger competing page already occupy that spot.

Working in this order prevents wasted effort, such as rewriting a page's content five times when the actual problem was a stray noindex tag left in the page's HTML.`,
      },
    ],
  },
  {
    slug: 'keyword-research-without-paid-tools',
    title: 'Keyword Research Without Paid Tools',
    summary:
      'Paid keyword tools are convenient, not required. This lesson shows how to find the terms real customers type into Google using only free, publicly available sources: autocomplete, "People Also Ask," Google Trends, and Search Console.',
    topic: 'SEO',
    level: 'Beginner',
    readTime: '9 min',
    attribution: 'Established SEO research practices',
    safety: 'public-domain',
    learningOutcome:
      "build a working list of customer-relevant keywords using only free tools already available in a browser.",
    metaTitle: 'Keyword Research Without Paid Tools | YDM Agency',
    metaDescription:
      'Find the search terms real customers use with free tools only: Google autocomplete, People Also Ask, Google Trends, and Search Console.',
    lastUpdated: '2026-01-08',
    sections: [
      {
        heading: 'Why Free Sources Are Often Enough',
        body: `Paid platforms like Ahrefs and Semrush are valuable for competitive analysis and search volume estimates at scale, but a small business does not usually need volume estimates to make a good decision about what to write. It needs to know the actual words customers use, and Google itself is the best source for that, because it is built from real queries.

The goal of this lesson is not a spreadsheet of thousands of keywords with volume numbers. It is a short, high-confidence list of the phrases actual customers type when they have the problem the business solves, organized by the intent behind each phrase.`,
      },
      {
        heading: 'Mining Google Autocomplete',
        body: `Autocomplete suggestions appear as soon as a partial query is typed into the Google search box, and they are drawn directly from real search patterns. To use this systematically, type a seed term — a core service or product, such as "emergency plumber" — and record every suggestion that appears.

Then extend the seed term by adding a letter or word before or after it: "emergency plumber a," "emergency plumber b," and so on through the alphabet, as well as "why emergency plumber," "how emergency plumber," and "emergency plumber near." This "alphabet soup" method surfaces long-tail phrases that would never show up in a simple tool export, because autocomplete adapts to the exact characters typed.

Doing this in an incognito or private browsing window reduces the influence of personal search history on the suggestions, giving a more representative view of what a typical searcher would see.`,
      },
      {
        heading: 'Reading "People Also Ask" and Related Searches',
        body: `Running an actual search for a seed term surfaces two more free sources directly on the results page. The "People Also Ask" box lists related questions, and clicking on any of them expands more related questions underneath it — the list keeps growing the more boxes are clicked. This is one of the fastest ways to build a list of the actual questions customers have, which map well to blog posts and FAQ content.

At the bottom of the results page, "Related searches" and "People also search for" list additional phrases connected to the original query. These often reveal adjacent services, comparison terms ("X vs Y"), or qualifiers (a specific location, price range, or brand) that are worth targeting with their own content.`,
      },
      {
        heading: 'Using Google Trends for Direction, Not Volume',
        body: `Google Trends does not provide exact search volume, but it shows relative interest over time on a scale of 0 to 100, which is useful for two things: comparing two or more phrases to see which one is searched more often, and spotting seasonality, so content and offers can be timed to when demand actually rises.

For a local business, Trends can also be filtered by region, which shows whether a term is more relevant in some service areas than others. This is a directional tool, not a precise one — use it to break ties between similar phrases, not to calculate expected traffic.`,
      },
      {
        heading: 'Mining Data the Site Already Has',
        body: `Once a site has any search history, Google Search Console becomes a free keyword research tool in its own right, and it has an advantage no external tool has: it shows queries the site is already appearing for, including many the owner never intentionally targeted.

In the Performance report, sort by impressions to see which queries are already showing the site, even at a low position. Terms with meaningful impressions but a low ranking position are strong candidates for a dedicated page or a content update, because Google already considers the page somewhat relevant — it usually just needs to be stronger.

Other free sources worth checking: the site's own internal search bar (if it has one) for what visitors search for once they arrive, competitor sites' navigation and page titles for the service names they use, and forums or community sites like Reddit or industry-specific groups where customers describe problems in their own words.`,
      },
      {
        heading: 'Organizing the List by Intent',
        body: `Once phrases are collected, sort them into three buckets before writing anything.

Informational: the searcher wants an answer or explanation ("how often should gutters be cleaned"). These map to blog posts and guides.

Commercial investigation: the searcher is comparing options ("best gutter guards for pine trees," "gutter cleaning cost"). These map to comparison pages, pricing pages, or buyer's guides.

Transactional: the searcher is ready to act ("gutter cleaning near me," "book gutter cleaning"). These map to service pages and location pages with a clear call to action.

A keyword list without this sorting tends to produce content that is technically on-topic but does not match what the searcher actually wanted at that moment, which hurts click-through rate and conversion even if the page ranks.`,
      },
    ],
  },
  {
    slug: 'writing-titles-and-meta-descriptions-that-get-clicks',
    title: 'Writing Page Titles and Meta Descriptions That Get Clicks',
    summary:
      'A title tag and meta description do a job rankings alone cannot: they persuade someone to click. This lesson gives a repeatable formula for both, along with the length guidance needed to avoid truncation in search results.',
    topic: 'SEO',
    level: 'Beginner',
    readTime: '8 min',
    attribution: 'Based on Google Search Central documentation',
    safety: 'public-domain',
    learningOutcome:
      "write title tags and meta descriptions that stay within safe length limits and give searchers a clear reason to click.",
    metaTitle: 'Writing Page Titles and Meta Descriptions That Get Clicks | YDM Agency',
    metaDescription:
      'A repeatable formula for title tags and meta descriptions, plus the character-length guidance needed to avoid truncation in Google search results.',
    lastUpdated: '2026-01-10',
    sections: [
      {
        heading: 'Two Different Jobs',
        body: `The title tag and meta description are HTML elements that Google frequently — though not always — uses to build the blue link and snippet shown in search results. They are read by a human deciding whether to click, not just by a crawler deciding how to rank the page, so they need to be written for persuasion as much as for accuracy.

Google does sometimes rewrite a title or description automatically if it judges the original a poor match for the query or if it is missing, duplicated across pages, or stuffed with keywords. Writing a strong, accurate, unique version for every page reduces how often this happens, though it does not guarantee Google will always use it exactly as written.`,
      },
      {
        heading: 'Title Tag Length and Structure',
        body: `Google displays titles based on available pixel width rather than a fixed character count, so there is no single hard number, but a practical working limit is around 50 to 60 characters. Titles longer than that are frequently truncated with an ellipsis, and wide characters (capital letters, "w," "m") count for more space than narrow ones.

A dependable structure: Primary Keyword or Benefit — Secondary Detail | Brand Name. For example, "Emergency Plumbing Repair in Austin | 24/7 Same-Day Service — Acme Plumbing." Put the most important, differentiating information first, since that is what survives if the title is truncated on a smaller screen.

Every page on a site should have a unique title. Duplicate titles across many pages (a common problem on e-commerce category pages or paginated blogs) make it harder for Google to tell the pages apart and harder for a searcher to tell which result to click.`,
      },
      {
        heading: 'Meta Description Length and Structure',
        body: `The meta description does not directly influence rankings, but it strongly influences click-through rate, which is the metric that actually drives traffic. A safe working length is roughly 150 to 160 characters; results can display more on some devices, but content beyond that range risks being cut off with an ellipsis.

A useful structure: state the specific value or outcome, add a differentiator (speed, price, guarantee, credential), and close with a soft call to action such as "Get a free quote" or "Book online in minutes." Avoid restating the title word-for-word — the description should add new information, not repeat what is already visible in the headline above it.

Google is more likely to use a manually written description when it closely and specifically matches the searcher's query. Vague, generic descriptions ("Welcome to our website, we offer the best service in town") are the ones most often replaced automatically with a snippet pulled from the page body.`,
      },
      {
        heading: 'A Repeatable Writing Formula',
        body: `For most business pages, this formula produces a strong first draft in a few minutes.

Title: [Primary service or product] + [key qualifier: location, speed, price, or audience] + [Brand]

Description: [Who this is for] + [what they get, specifically] + [proof point or differentiator] + [call to action]

Example for a local landscaping page:
Title: Landscape Design in Denver | Free On-Site Consultation — Greenline Landscaping
Description: Denver homeowners get a custom landscape design plan in one visit. Licensed, insured, and locally owned since 2011. Schedule a free consultation today.

This produces a title and description that are specific to the page, differentiated from competitors, and long enough to be informative without risking truncation.`,
      },
      {
        heading: 'Common Mistakes to Avoid',
        body: `Keyword stuffing the title ("Plumber Austin Plumbing Austin TX Plumbers Near Me") reads as spam to a human and can trigger Google to rewrite it, which defeats the purpose of writing it carefully in the first place.

Using the exact same title or description template across dozens of near-identical pages (common with location pages) makes every page look interchangeable and gives a searcher no reason to prefer one over another.

Writing the description as a vague mission statement instead of a specific benefit tied to the query the page is meant to answer.

Ignoring mobile display. Most searches happen on a phone, where the visible snippet is shorter than on desktop. Front-load the most important words in both the title and the description.`,
      },
    ],
  },
  {
    slug: 'on-page-seo-10-point-checklist',
    title: 'On-Page SEO: The 10-Point Checklist for Any Page',
    summary:
      'On-page SEO is the set of choices made on a single page that affect how well it can be understood and ranked. This lesson provides a concrete, ten-item checklist that can be run against any page on a site in under fifteen minutes.',
    topic: 'SEO',
    level: 'Intermediate',
    readTime: '10 min',
    attribution: 'Established SEO best practices',
    safety: 'public-domain',
    learningOutcome:
      "run a ten-point on-page audit against any page and identify specific, fixable gaps in its structure and content.",
    metaTitle: 'On-Page SEO: The 10-Point Checklist for Any Page | YDM Agency',
    metaDescription:
      'A concrete, ten-item on-page SEO checklist covering headers, internal links, image alt text, URL structure, and content depth for any page.',
    lastUpdated: '2026-01-13',
    sections: [
      {
        heading: 'What On-Page SEO Covers',
        body: `On-page SEO refers to everything under direct control on an individual page: its HTML structure, its content, its internal links, and its metadata. It is distinct from technical SEO (site-wide crawlability and performance) and off-page SEO (backlinks and external reputation), though all three interact.

The checklist below can be applied to a single page in about ten to fifteen minutes and is a good habit to run before publishing anything new, and periodically against older pages that are underperforming.`,
      },
      {
        heading: 'The 10-Point Checklist',
        body: `1. One H1 tag that describes the page's main topic and includes the primary keyword naturally, without stuffing.

2. A logical heading hierarchy (H2s for major sections, H3s for subsections) that would make sense read on its own as an outline, with no skipped levels.

3. A unique title tag under roughly 60 characters that includes the primary keyword near the beginning.

4. A unique meta description under roughly 160 characters that states a specific benefit and includes a call to action.

5. A clean, readable URL that reflects the page's topic in a few words, uses hyphens rather than underscores, and avoids unnecessary parameters or deep folder nesting.

6. Descriptive alt text on every meaningful image, written for someone who cannot see the image, not stuffed with keywords.

7. At least two to three internal links to other relevant pages on the site, using descriptive anchor text rather than "click here."

8. At least one internal link pointing to this page from another relevant, already-indexed page, so it is not an orphan.

9. Content depth that fully answers the query's intent — covering the subtopics a reader would reasonably expect, not padded with filler to hit a word count.

10. A single, clear primary keyword focus per page, with related terms and synonyms used naturally throughout rather than one term repeated mechanically.`,
      },
      {
        heading: 'Why Each Item Matters',
        body: `Items 1 through 4 (H1, heading hierarchy, title, and description) help both search engines and readers quickly understand what the page is about and whether it matches what they were looking for before they commit to reading further.

Items 5 and 6 (URL and alt text) affect accessibility and how well non-text and structural elements of the page can be understood by both assistive technology and search engines.

Items 7 and 8 (internal linking) affect discoverability and how authority flows through the site. A page with no internal links pointing to it is harder for both crawlers and users to find, no matter how good its content is.

Items 9 and 10 (content depth and keyword focus) affect relevance. A page that mentions a topic in passing will rarely outrank one that treats the topic thoroughly, and a page targeting too many unrelated ideas at once dilutes its relevance for all of them.`,
      },
      {
        heading: 'Running the Audit in Practice',
        body: `Open the page in a browser and view its source code, or use a browser extension that displays the heading structure and meta tags directly. Go down the checklist in order, marking each item pass or fail, and note the specific fix next to any failure rather than a vague "needs work."

For content depth (item 9), compare the page against two or three top-ranking competitors for the same query. List the subtopics they cover that this page does not, and treat gaps as a prioritized to-do list rather than a reason to pad the page with unrelated content.

Re-run the checklist after any significant content update, and keep a simple spreadsheet tracking which pages have been audited and when, so older pages do not get permanently skipped in favor of newer ones.`,
      },
      {
        heading: 'Common Failure Points',
        body: `Multiple H1 tags on one page, often introduced by a page builder or theme that auto-generates a hero heading in addition to the content heading.

Meta descriptions left blank, which forces Google to auto-generate a snippet from body text that may not include a clear call to action.

Generic anchor text like "learn more" used for every internal link, which wastes an opportunity to signal what the linked page is about.

Thin pages that exist mainly to target a keyword variant with only a paragraph or two of unique content — these are strong candidates for consolidation into a single, more thorough page rather than being left to compete weakly on their own.`,
      },
    ],
  },
  {
    slug: 'local-seo-for-brick-and-mortar-and-service-area-businesses',
    title: 'Local SEO for Brick-and-Mortar and Service-Area Businesses',
    summary:
      'Local search results are governed by a different set of signals than organic web results. This lesson covers optimizing a Google Business Profile, building consistent local citations, and managing reviews the right way.',
    topic: 'SEO',
    level: 'Intermediate',
    readTime: '10 min',
    attribution: 'Based on Google Business Profile documentation',
    safety: 'public-domain',
    learningOutcome:
      "optimize a Google Business Profile, build consistent local citations, and set up a compliant review-generation process.",
    metaTitle: 'Local SEO for Brick-and-Mortar and Service-Area Businesses | YDM Agency',
    metaDescription:
      'Learn to optimize a Google Business Profile, build local citations, and manage reviews properly to improve visibility in local search results.',
    lastUpdated: '2026-01-16',
    sections: [
      {
        heading: 'How Local Ranking Differs from Organic Ranking',
        body: `When a search has clear local intent — either because it includes a location or because Google infers the searcher wants a nearby result, such as "plumber" searched from a phone — Google typically shows a map pack of three local results above or alongside the standard organic listings. Ranking here depends heavily on three factors Google has described publicly: relevance (how well the business matches the search), distance (how close the business is to the searcher or the specified location), and prominence (how well-known and well-reviewed the business is, both online and off).

This means a business can rank well organically but still perform poorly in the map pack, or vice versa, because the map pack draws more heavily on signals like the Google Business Profile, review volume and quality, and citation consistency than on classic on-page factors.`,
      },
      {
        heading: 'Fully Building Out a Google Business Profile',
        body: `The Google Business Profile (the free listing that powers map pack results, formerly called Google My Business) is the single highest-leverage local SEO asset available, and most businesses only fill out a fraction of it.

Claim and verify the profile if this has not already been done — Google typically verifies by postcard, phone, email, or video depending on the business type. Once verified, complete every available field: primary and secondary business categories (choose the most specific accurate categories, not just the broadest one), full service list, complete and accurate business hours including holiday hours, a written business description, and service areas if the business travels to customers rather than operating from a storefront.

Add photos regularly — of the location, team, and completed work — since profiles with more photos tend to get more engagement, and keep the profile active by posting updates, responding to questions in the Q&A section, and keeping information current whenever hours or services change.`,
      },
      {
        heading: 'Building Consistent Citations',
        body: `A citation is any online mention of the business's name, address, and phone number (commonly abbreviated NAP), whether or not it includes a link. Data aggregators and directory sites feed local search algorithms, and inconsistency across them — a suite number missing in one listing, an old phone number in another, "St." versus "Street" — can undermine trust in the business's identity.

Start with the primary platforms: Google Business Profile, Bing Places, Apple Maps (via Apple Business Connect), and any major industry-specific directories relevant to the business (for example, home service marketplaces, healthcare directories, or legal directories). Then expand to general directories.

Pick one exact format for the business name, address, and phone number and use it identically everywhere. Audit existing listings periodically for drift, since old citations from a previous address or a defunct phone number can linger indefinitely if nobody corrects them.`,
      },
      {
        heading: 'Managing Reviews the Right Way',
        body: `Review volume, recency, and average rating are all factored into local prominence, and reviews also directly influence a potential customer's decision to click or call. The process for generating them needs to stay within Google's policies, which prohibit review-gating (asking only satisfied customers to leave a review while filtering out unhappy ones) and incentivized reviews (offering a discount or gift in exchange for a review).

A compliant process: ask every customer, not a filtered subset, ideally right after a positive interaction such as a completed job or purchase. Make it easy with a direct link to the review form. If a negative review appears, respond professionally and specifically, without arguing publicly — a thoughtful response is often read by future customers as a sign of accountability.

Never write or purchase fake reviews, and never offer compensation for reviews. Both violate Google's policies and can result in profile suspension, in addition to being a poor reflection on the business if discovered by customers.`,
      },
      {
        heading: 'Location Pages for Multi-Location or Service-Area Businesses',
        body: `A business with multiple physical locations, or one that serves a defined multi-city area without a public storefront in each one, benefits from a dedicated page per location or service area, rather than a single generic "areas we serve" page listing every city in a bullet list.

Each location page should include unique content specific to that area: the actual service area boundaries, any location-specific details (a local team member, a specific job example, local landmarks used for directions), the local phone number if one exists, and an embedded map. Thin pages that are identical except for a swapped city name are a common cause of pages competing against each other or being seen as low-value duplicates.

Link each location page from a central locations or service-area hub page, and make sure each one is also linked from the main navigation or footer so it is not orphaned and difficult to discover.`,
      },
    ],
  },
  {
    slug: '30-minute-seo-audit-of-your-own-site',
    title: 'How to Perform a 30-Minute SEO Audit of Your Own Site',
    summary:
      'A useful SEO audit does not require an agency or a paid platform. This lesson walks through a repeatable, time-boxed process using only free tools: Search Console, PageSpeed Insights, and the free crawl limit of Screaming Frog.',
    topic: 'SEO',
    level: 'Intermediate',
    readTime: '10 min',
    attribution: 'Established SEO auditing practices',
    safety: 'public-domain',
    learningOutcome:
      "run a structured 30-minute SEO audit of a site using only free tools and produce a prioritized list of issues to fix.",
    metaTitle: 'How to Perform a 30-Minute SEO Audit of Your Own Site | YDM Agency',
    metaDescription:
      'A repeatable, time-boxed SEO audit process using only free tools: Google Search Console, PageSpeed Insights, and Screaming Frog\'s free crawl mode.',
    lastUpdated: '2026-01-20',
    sections: [
      {
        heading: 'The Tools and the Time Box',
        body: `This audit uses three free tools: Google Search Console (for how Google currently sees the site), PageSpeed Insights, which runs on the Lighthouse engine (for performance and Core Web Vitals), and Screaming Frog SEO Spider in its free mode, which crawls up to 500 URLs at no cost — enough for most small business sites in a single pass.

Thirty minutes is not enough to fix anything; it is enough to produce an accurate, prioritized list of what is broken, which is usually the harder part. Set a timer for each section below and move on even if a section is not perfectly finished — the goal is coverage, not depth, on the first pass.`,
      },
      {
        heading: 'Minutes 0-10: Search Console Health Check',
        body: `Open the Pages report under Indexing. This shows how many pages are indexed versus excluded, and lists the specific reasons for exclusion (noindex tags, duplicate content, crawl anomalies, redirects, and so on). Note the top two or three exclusion reasons affecting the most URLs.

Open the Performance report, expand the date range to the last three or six months, and sort pages by impressions. Look for pages with high impressions but low clicks (a title and description problem) and pages with an average position between roughly 8 and 20 (a proximity-to-page-one problem, often fixable with content or internal linking improvements).

Check Core Web Vitals under Experience for any pages flagged "Poor" or "Needs Improvement," and check Security & Manual Actions to rule out any active penalty, which would explain a sudden broad traffic drop unrelated to normal optimization work.`,
      },
      {
        heading: 'Minutes 10-18: Performance and Core Web Vitals',
        body: `Run the homepage and two or three key inner pages (a main service or product page, and the highest-traffic blog post) through PageSpeed Insights. Record the mobile score first, since mobile is the default indexing and ranking basis for most sites, then the desktop score.

Focus on the three Core Web Vitals: Largest Contentful Paint (how quickly the main content loads), Interaction to Next Paint (how quickly the page responds to interaction), and Cumulative Layout Shift (how much visible content jumps around while loading). Note any metric outside Google's "Good" threshold and read the specific diagnostic suggestions the report lists underneath — usually image sizing, render-blocking scripts, or server response time.

These numbers will not be fixed in this audit, but recording them creates a baseline. A follow-up audit that shows the same problems six months later means the fix was never implemented, which is valuable information on its own.`,
      },
      {
        heading: 'Minutes 18-26: A Free Screaming Frog Crawl',
        body: `Install Screaming Frog SEO Spider and run it against the site's homepage in default mode without a license key, which allows a crawl of up to 500 URLs. Once the crawl finishes, check these tabs in order.

Response Codes: filter for anything other than 200 (success) or an intentional 301 redirect, looking specifically for 404s and server errors, and note any that are still linked to internally.

Page Titles and Meta Description: filter for "Missing," "Duplicate," "Over [length] Characters," and "Below [length] Characters" to find gaps quickly across the whole site at once rather than page by page.

Headings (H1): filter for "Missing" and "Multiple" to find pages with no H1 or more than one, both of which weaken the page's topical clarity.

Images: filter for missing alt text across the whole crawl in one view.

For a 500-URL crawl, this whole review can realistically be done in under ten minutes because the filters do the sorting automatically.`,
      },
      {
        heading: 'Minutes 26-30: Prioritize and Write It Down',
        body: `Combine findings from all three tools into a single short list, ranked by two questions: how many pages or how much traffic does this affect, and how quickly can it realistically be fixed.

A useful triage order: fix indexing blockers first (noindex tags on pages that should be indexed, broken canonical tags), then fix broken links and error pages, then fix missing or duplicate titles and meta descriptions on the highest-traffic pages, then address Core Web Vitals issues, which usually require more developer time.

Save this list with a date attached. Re-running this same 30-minute process quarterly, using the same tools and the same order, turns it into a trend line rather than a one-time snapshot, which makes it far easier to tell whether the site is actually improving.`,
      },
    ],
  },
  {
    slug: 'diagnosing-and-recovering-from-algorithm-updates',
    title: 'Diagnosing and Recovering from Algorithm Updates and Traffic Drops',
    summary:
      'A sudden traffic drop is alarming but rarely mysterious once investigated methodically. This lesson covers how to use Search Console and date-range segmentation to distinguish an algorithm update from a technical issue, a link problem, or a SERP feature change — and what recovery actually looks like.',
    topic: 'SEO',
    level: 'Advanced',
    readTime: '11 min',
    attribution: 'Based on Google Search Central documentation',
    safety: 'public-domain',
    learningOutcome:
      "diagnose the root cause of a traffic drop by segmenting Search Console data and checking it against confirmed update timelines, technical changes, and content quality.",
    metaTitle: 'Diagnosing and Recovering from Algorithm Updates and Traffic Drops | YDM Agency',
    metaDescription:
      'A methodical process for diagnosing traffic drops: date-range segmentation in Search Console, root-cause analysis, and what real recovery looks like.',
    lastUpdated: '2026-01-24',
    sections: [
      {
        heading: 'Rule Out the Boring Explanations First',
        body: `Before investigating an algorithm update, rule out simpler and far more common causes, because they are easier to fix and easier to confirm. Check whether the drop correlates with a site migration, redesign, URL structure change, or CMS change. Check whether tracking itself broke — a missing analytics tag or a Search Console property change can look exactly like a traffic drop without one having actually occurred.

Check for seasonality by comparing the same period against the prior year rather than only the prior month, since many businesses have predictable seasonal search patterns that are easy to mistake for a decline. Check Security & Manual Actions in Search Console to rule out a manual penalty, which is a distinct issue from an algorithmic ranking change and is reported explicitly by Google when it applies.

Only once these are ruled out is it worth treating the drop as an algorithmic or quality-related ranking change.`,
      },
      {
        heading: 'Segmenting the Drop by Date, Page, and Query',
        body: `In Search Console's Performance report, set the date range to cover well before and after the suspected drop and use the compare feature to view two periods side by side. A sudden, sitewide cliff on a specific date is the signature of a broad algorithm update or a significant technical error; a gradual decline over weeks looks more like a content quality or competitive erosion issue.

Segment by page to see whether the drop is concentrated on specific templates or sections (for example, only blog content, or only one product category) or spread evenly across the whole site. A concentrated drop points to a specific content or template issue; a broad, even drop across unrelated page types points more strongly toward a sitewide technical or trust issue.

Segment by query to see whether the site lost visibility for its previous ranking terms specifically, or whether it is still ranking for those terms but a new SERP feature (an AI-generated overview, a expanded "People Also Ask," or a new set of local pack results) is now displacing organic clicks even though the ranking position itself did not change.`,
      },
      {
        heading: 'Checking Against Confirmed Update Timelines',
        body: `Google announces and confirms major search algorithm updates (core updates, spam updates, and occasionally system-specific updates such as the helpful content system) through its Search Central Blog and the Search Status Dashboard, which lists rollout start and end dates. Cross-reference the exact date of the drop against these confirmed windows before assuming an update caused it — correlation with an announced update rollout window is meaningful evidence, but a drop that started well before or well after any confirmed rollout points elsewhere.

Core updates, specifically, are broad relevance re-evaluations rather than penalties targeting an individual site. Google's own guidance states there is nothing to "fix" in the sense of a violation to correct; instead, the guidance is to honestly assess content quality, expertise, and usefulness relative to what is now ranking above it, since the update rewards different pages, not necessarily worse ones.`,
      },
      {
        heading: 'Root-Cause Categories to Check',
        body: `Content quality: compare pages that lost rankings against the pages now outranking them. Look specifically for depth, originality, and evidence of first-hand expertise — content that is thin, generic, unattributed, or heavily derivative of other pages is the most common casualty of quality-focused updates.

Technical issues: re-check crawlability and indexing status for the affected pages specifically, since a template change, a plugin update, or a migration can silently introduce noindex tags, broken canonical tags, or blocked resources on exactly the pages that dropped.

Link changes: check whether a significant number of referring domains were lost (a partner site restructuring, an expired sponsorship, a directory going offline) using Search Console's Links report, since backlinks remain a meaningful trust and relevance signal.

SERP feature changes: confirm whether the ranking position for target queries actually declined, or whether the query now surfaces a new feature above traditional organic results that is absorbing clicks that used to go to the site, which is a visibility problem distinct from a ranking problem and requires a different response, such as targeting the structured content format that feature tends to pull from.`,
      },
      {
        heading: 'What Real Recovery Looks Like',
        body: `Recovery from a broad core update is rarely a quick fix and is not guaranteed on any fixed timeline; Google has stated that meaningful, substantive improvements to content quality may not be reflected until a subsequent core update evaluates the site again. This is different from a technical fix, where reversing a mistaken noindex tag or restoring a broken redirect can show recovery within days to weeks once the pages are recrawled.

Prioritize the affected pages by traffic and business value, and for each one, honestly assess whether it currently represents the most helpful, complete answer available for its target query, not just whether it once ranked well. Rewriting for genuine depth and first-hand expertise is a stronger long-term investment than minor tweaks aimed narrowly at an algorithm.

Track progress using the same segmented Search Console view used for diagnosis, and be patient with the timeline. A pattern of many small, defensive changes made in a panic is far less effective than a smaller number of substantive improvements made deliberately.`,
      },
    ],
  },
  {
    slug: 'advanced-internal-linking-strategies-for-larger-sites',
    title: 'Advanced Internal Linking Strategies for Larger Sites',
    summary:
      'As a site grows past a few dozen pages, internal linking stops being an afterthought and becomes an architecture decision. This lesson covers topic clusters, hub-and-spoke linking, and content siloing — all achievable without a developer.',
    topic: 'SEO',
    level: 'Advanced',
    readTime: '10 min',
    attribution: 'Established SEO information-architecture practices',
    safety: 'public-domain',
    learningOutcome:
      "design a hub-and-spoke topic cluster structure and apply consistent internal linking rules across a larger site without developer involvement.",
    metaTitle: 'Advanced Internal Linking Strategies for Larger Sites | YDM Agency',
    metaDescription:
      'Learn topic clusters, hub-and-spoke linking, and content siloing principles for larger websites — no developer required.',
    lastUpdated: '2026-01-28',
    sections: [
      {
        heading: 'Why Internal Linking Matters More at Scale',
        body: `On a small site with a dozen pages, a visitor and a crawler can find everything through the main navigation alone. Past a few dozen pages, that stops being true. Content becomes buried, related pages stop reinforcing each other, and the site's most important pages compete for authority with pages that barely matter.

Internal links do three jobs at once: they help crawlers discover pages that are not in the primary navigation, they distribute ranking authority from well-linked pages toward newer or weaker ones, and they help both readers and search engines understand which pages are topically related to each other. A large site with weak internal linking behaves, in practice, like a collection of disconnected small sites rather than one authoritative one.`,
      },
      {
        heading: 'The Hub-and-Spoke (Topic Cluster) Model',
        body: `The topic cluster model, popularized in content marketing circles and widely adopted across SEO practice, organizes content around a central "pillar" or "hub" page that broadly covers a topic, surrounded by narrower "spoke" pages that each go deep on one subtopic. Every spoke links back to the hub, and the hub links out to every spoke, typically through a table of contents or a related-articles section.

For example, a hub page titled "Complete Guide to Commercial HVAC Maintenance" would link out to spoke pages such as "How Often to Replace Commercial HVAC Filters," "Signs Your Rooftop Unit Needs Repair," and "Commercial HVAC Maintenance Contract Costs." Each spoke also links back to the hub and, where relevant, sideways to other closely related spokes.

This structure concentrates topical authority: Google can see, through the link pattern alone, that the hub page is the canonical entry point for the topic and that the spokes are all part of the same coherent body of content, which tends to strengthen how the whole cluster ranks compared with the same content published as unconnected, standalone pages.`,
      },
      {
        heading: 'Content Siloing',
        body: `Siloing takes the cluster concept further by also organizing the site's URL structure and navigation to reinforce topic boundaries — for example, keeping all HVAC-related content under /hvac/ and all plumbing-related content under /plumbing/, with cross-links between the two categories used sparingly and only when genuinely relevant.

The intent is to make the topical boundaries obvious both to a human scanning the URL or navigation and to a crawler following the link graph. A silo that mixes unrelated topics freely — linking a plumbing repair page to a landscaping tip out of sheer navigational convenience — dilutes the clarity of both silos.

Siloing does not require a site rebuild. It can usually be implemented with careful category and tag structure in an existing CMS, consistent URL slugs, and disciplined manual linking, without any code changes.`,
      },
      {
        heading: 'Practical Linking Rules for a Larger Site',
        body: `A few concrete rules keep a cluster structure from decaying as content is added over time.

Every new page must link to its hub, and the hub must be updated to link to the new page, within the same publishing session — this is the rule most often skipped once a site has dozens of contributors or a high publishing cadence.

Use descriptive, varied anchor text tied to the destination page's topic, not the same generic phrase repeated everywhere.

Set a rough minimum, such as three to five contextual internal links per new piece of content, pointing to genuinely relevant existing pages, not links added purely to hit a quota.

Periodically audit orphan pages (pages with no internal links pointing to them) using a crawler like Screaming Frog, and either link them into an appropriate cluster or consider whether they should exist at all.

Keep click depth in mind: important pages should be reachable within two or three clicks from the homepage. Pages buried six or seven clicks deep are both harder for users to find and typically crawled less frequently.`,
      },
      {
        heading: 'Maintaining the Structure Over Time',
        body: `Clusters degrade naturally as a site grows unless someone owns the structure. New content gets published without being linked into the right cluster, old hub pages go stale while their spokes keep multiplying, and categories drift apart from the original plan.

A practical maintenance habit: review each hub page quarterly, confirm it still accurately represents and links to every current spoke, update its own content to reflect anything that has changed, and consolidate or redirect any spokes that have become redundant with each other. Treat the hub page itself as a living document, not a one-time publish.

For very large sites, a simple spreadsheet mapping every hub to its spokes — with a column for last-reviewed date — is often more effective than trying to hold the whole structure in memory, especially once a site has more than fifty or so pages spread across multiple clusters.`,
      },
    ],
  },
  {
    slug: 'programmatic-seo-fundamentals-for-product-based-businesses',
    title: 'Programmatic SEO Fundamentals for Product-Based Businesses',
    summary:
      'Programmatic SEO generates many similar pages at scale from a template and a dataset — location pages, product variant pages, or comparison pages. This lesson covers when it works, how to keep it useful rather than spammy, and the real risk of running afoul of Google\'s scaled content policies.',
    topic: 'SEO',
    level: 'Advanced',
    readTime: '11 min',
    attribution: "Based on Google's spam policies for Google Search",
    safety: 'extra-care',
    learningOutcome:
      "decide when a programmatic page template is genuinely useful versus thin, and build one that stays within Google's guidance on scaled content.",
    metaTitle: 'Programmatic SEO Fundamentals for Product-Based Businesses | YDM Agency',
    metaDescription:
      "Learn when and how to generate landing pages at scale (like location x service pages) without violating Google's scaled content abuse policy.",
    lastUpdated: '2026-02-05',
    sections: [
      {
        heading: 'What Programmatic SEO Actually Is',
        body: `Programmatic SEO is the practice of using a page template combined with a structured dataset to generate a large number of similar pages automatically, rather than writing each one by hand. Common examples include a service business generating one page per city it serves crossed with each service it offers ("water heater repair in [city]"), an e-commerce store generating one page per product attribute combination, or a software company generating comparison pages ("[Product] vs [Competitor]").

Done well, this approach can produce genuinely useful pages at a scale no team could write manually, because each page answers a real, narrow, distinct question a searcher might have. Done poorly, it produces a large number of near-identical pages with only a swapped variable and no real added value, which is precisely the pattern Google's spam policies are designed to catch.`,
      },
      {
        heading: 'The Real Risk: Scaled Content Abuse',
        body: `Google's spam policies for Google Search explicitly define "scaled content abuse" as generating many pages — with or without AI — where the primary purpose is to manipulate search rankings rather than to help users, regardless of the method used to produce them. This policy update was clarified specifically because mass page generation, including AI-assisted generation, had become common enough to warrant explicit guidance rather than being addressed only under general thin-content rules.

The determining factor Google describes is not the production method itself; templated or automated generation is not inherently against policy. The determining factor is whether the resulting pages provide genuine, differentiated value to a person searching, or whether they exist mainly to capture search traffic across many keyword variations with negligible unique substance behind each one.

Sites found to violate this policy can be removed from search results entirely, not merely have individual pages demoted, which makes this a genuinely higher-stakes decision than most on-page choices and worth treating with real caution before building a programmatic system at scale.`,
      },
      {
        heading: 'What Separates Useful Pages from Thin Ones',
        body: `A useful location-times-service page includes information that is genuinely specific to that combination: actual service availability confirmed for that area, a local phone number or team member, region-specific pricing or considerations (permit requirements, climate factors, typical local property types), and unique supporting content such as a locally relevant example or testimonial, not just the city name swapped into an otherwise identical paragraph.

A thin version of the same page swaps only the city name into a fixed template, has no verifiably real content difference from its siblings beyond that variable, may reference services not actually offered in that area, and provides no reason a searcher from that city would trust the page over a generic one.

A reasonable self-test: if the variable text were blanked out, would this page still contain something specific and useful that a hundred sibling pages do not also contain? If the honest answer is no, the page is a strong candidate for consolidation into a single higher-quality page or an "areas we serve" section rather than being generated as a standalone URL.`,
      },
      {
        heading: 'A Safer Build Process',
        body: `Start with a dataset that is genuinely accurate for every row before generating anything — confirm real service availability, real pricing ranges, and real local details for each location or variant, rather than treating the dataset as inherently valid.

Build the template with clearly marked variable and fixed sections, and set a minimum bar for how much of the page must be genuinely unique per entry (a specific paragraph of local or variant-specific detail, not just an inserted noun) before a page is allowed to publish.

Launch a small pilot batch — a few dozen pages — and monitor them in Search Console before scaling to hundreds or thousands. Check indexing rates specifically; a large percentage of a batch landing in "Crawled, currently not indexed" is a strong early signal that Google is treating the pages as low-value, and it is far cheaper to catch that at a pilot scale than after generating the full dataset.

Maintain the pages over time rather than treating them as a one-time export. Outdated pricing, defunct locations, or discontinued variants left live indefinitely erode trust in the whole batch, not just the individual stale page.`,
      },
      {
        heading: 'When Not to Use This Approach at All',
        body: `Programmatic generation is a poor fit when the underlying data cannot support genuine differentiation — for example, a business that does not actually have meaningfully different information, pricing, or availability across the locations or variants it would otherwise template into separate pages.

It is also a poor fit as a shortcut to avoid the harder work of building fewer, stronger pages. If a business serves five real, distinct service areas well, five well-built location pages will typically outperform fifty thin, auto-generated ones, both in search results and in conversion, because depth and specificity are themselves ranking and trust signals.

When in doubt, the safer default for a small or mid-sized business is a smaller number of thoroughly built pages, with programmatic generation reserved for cases with a genuinely large, genuinely differentiated dataset — a marketplace with thousands of real distinct products, for instance — rather than as a default tactic for padding a site's page count.`,
      },
    ],
  },
];
