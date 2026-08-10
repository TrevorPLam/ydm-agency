/**
 * FILE: compliance-lessons-new.ts
 * PURPOSE: Provides the expanded NEW_COMPLIANCE_LESSONS array of EducationLesson objects that extend the Compliance topic in the /education section.
 * ARCHITECTURE: Static typed data module exporting an EducationLesson array; aggregated into EDUCATION_LESSONS by education-config alongside the original COMPLIANCE_LESSONS.
 * KEY RULES: Each lesson must conform to the EducationLesson interface; slugs must be unique across both Compliance lesson files; topic must be 'Compliance'; attribution and safety fields must be set per the content sourcing policy.
 * DEPENDS ON: ./types (EducationLesson).
 * LAST UPDATED: 2026-08-09 Add code commentary headers
 */
import type { EducationLesson } from './types';

export const NEW_COMPLIANCE_LESSONS: EducationLesson[] = [
  {
    slug: 'copyright-fair-use-in-marketing',
    title: 'Copyright and Fair Use in Marketing: What You Can (and Cannot) Use',
    summary:
      'A plain-language walkthrough of when marketing content needs permission, how to find and attribute Creative Commons and public-domain assets correctly, and how the US fair-use test actually works.',
    topic: 'Compliance',
    level: 'Beginner',
    readTime: '9 min',
    attribution: 'Legal awareness content — not legal advice',
    safety: 'extra-care',
    learningOutcome:
      'evaluate whether an image, quote, or piece of music is safe to use in marketing content, and attribute licensed assets correctly.',
    metaTitle: 'Copyright and Fair Use in Marketing: What You Can (and Cannot) Use | YDM Agency',
    metaDescription:
      'Learn when marketing content needs copyright permission, how to source and credit Creative Commons or public-domain assets, and how US fair use works.',
    lastUpdated: '2026-01-05',
    sections: [
      {
        heading: 'The Default Rule: Assume It Is Protected',
        body: `Almost anything creative — a photo, a paragraph of text, a song, a video clip, a font, an illustration — is protected by copyright the moment it is created, whether or not it carries a copyright symbol. There is no requirement to register a work or add a "©" notice for protection to exist. That means the safest starting assumption for any marketing team is that a piece of content found online belongs to someone else and is not free to use just because it was easy to find or download.

This lesson is educational and general in nature. It is not legal advice, and copyright disputes can turn on details specific to a single image or a single use case. When real money or brand risk is on the line — a national ad campaign, a disputed image, a demand letter — a qualified intellectual property attorney should review the situation.

The good news is that most day-to-day marketing situations are easy to keep clean once a few habits are in place: know where an asset came from, know what license applies to it, and keep a record of that license.`,
      },
      {
        heading: 'Finding and Attributing Public Domain and CC0 Assets',
        body: `Public domain works have no copyright restriction at all, usually because the copyright has expired, was never claimed, or the creator dedicated the work to the public. CC0 ("Creative Commons Zero") is a license creators apply to voluntarily waive their rights, effectively putting a modern work into the public domain. Both can generally be used, modified, and used commercially without asking permission or crediting the source — though giving credit is still a courteous practice, and some sites ask for it as a matter of house style even when it is not legally required.

Common sources for CC0 or public-domain images include museum and library open-access collections, government agency photo libraries (many US federal government works are public domain because they were created by federal employees as part of their official duties), and stock sites that specifically label images as CC0. Always check the specific license on the specific asset — a site that hosts a mix of licenses is not a guarantee that every image on it is free to use.

Other Creative Commons licenses (CC BY, CC BY-SA, CC BY-NC, and so on) are not the same as CC0. Most of them require attribution, some prohibit commercial use, and some require that anything built from the work be shared under the same license. A reasonable practice is to keep a simple internal log — asset name, source URL, license type, date pulled, and the attribution line used — so the reasoning behind a choice can be reconstructed later if a question ever comes up.

A workable attribution format for CC-licensed work is: "[Title] by [Author], licensed under [License Name] via [Source]," with the license name linking to the license's official text on creativecommons.org.`,
      },
      {
        heading: 'The Fair Use Four-Factor Test',
        body: `Fair use is a US legal doctrine that allows limited use of copyrighted material without permission in certain circumstances, most often for commentary, criticism, news reporting, teaching, or parody. It is decided case by case, using four factors that courts weigh together rather than as a checklist where any one factor guarantees an outcome:

1. Purpose and character of the use — transformative uses (commentary, parody, criticism) lean toward fair use; using something purely to promote a product commercially leans away from it.
2. Nature of the copyrighted work — using factual or published material is more likely to be considered fair than using highly creative or unpublished material.
3. Amount and substantiality used — using a short excerpt is generally viewed more favorably than reproducing the "heart" of a work or the whole thing.
4. Effect on the market for the original — if the use could substitute for, or reduce demand for, the original work, that weighs against fair use.

For most agency and small-business marketing, fair use is a narrow and situational defense, not a broad license to reuse other people's content. Quoting a short excerpt of a review with attribution, or referencing a competitor's publicly stated pricing in a comparison post, is generally lower-risk. Repurposing someone else's photography, full articles, or copyrighted music as the centerpiece of a promotional post is higher-risk, and permission or a licensed alternative is the more conservative path.`,
      },
      {
        heading: 'Music and Video: A Higher-Risk Category',
        body: `Music deserves special caution because platforms actively scan for it and because licensing is often split between multiple rights holders (the composition and the specific recording can be owned by different parties). Using a popular song in a marketing video generally requires a license — either a direct sync license from the rights holder or a subscription to a royalty-free or "production music" library that grants commercial usage rights. Muting a song, using thirty seconds of it, or crediting the artist does not remove the licensing requirement.

Stock video and stock photo libraries typically offer tiered licenses (personal versus commercial, limited versus extended). Reading the specific license terms attached to a specific download — not just the general marketing copy on the site's homepage — is a habit worth building, since restrictions can vary by asset even within the same platform.

For screenshots of other companies' products, apps, or websites used in comparison content or reviews, this generally falls into a gray area that often leans on fair use for commentary purposes, but a link back to the source and factual, non-disparaging framing helps keep the use defensible.`,
      },
      {
        heading: 'A Practical Pre-Publish Checklist',
        body: `Before an image, quote, video clip, or piece of music goes into published marketing material, it helps to run through a short checklist:

- Where did this asset come from, and is that source documented somewhere retrievable?
- What license applies, and does that license permit commercial use?
- If attribution is required, is it included in the format the license specifies?
- If this is a quote or excerpt from someone else's writing, is it short, clearly attributed, and not the "heart" of their work?
- If this is music or video, is there a commercial sync or library license on file?
- Would the original creator be reasonably comfortable seeing this specific use, in this specific context?

That last question is not a legal standard, but it is often a useful gut check. As a general rule of thumb, when a use case does not fit clearly into a known license or a well-established fair-use pattern (commentary, parody, brief quotation), the more conservative move is to license the asset, use a different one, or ask permission directly before publishing.`,
      },
    ],
  },
  {
    slug: 'gdpr-ccpa-privacy-regulations-non-lawyer',
    title: 'GDPR, CCPA, and Privacy Regulations for the Non-Lawyer',
    summary:
      'An accessible overview of what small businesses generally need in place around cookie consent, data collection, and email marketing to stay aligned with GDPR and CCPA/CPRA expectations.',
    topic: 'Compliance',
    level: 'Beginner',
    readTime: '10 min',
    attribution: 'Legal and regulatory awareness — not legal advice',
    safety: 'extra-care',
    learningOutcome:
      'identify the baseline privacy practices small businesses commonly adopt to align with GDPR and CCPA/CPRA expectations around consent, data rights, and email marketing.',
    metaTitle: 'GDPR, CCPA, and Privacy Regulations for the Non-Lawyer | YDM Agency',
    metaDescription:
      'A practical, non-legal overview of GDPR and CCPA/CPRA basics for small businesses: cookie consent, data subject rights, and CAN-SPAM email rules.',
    lastUpdated: '2026-01-08',
    sections: [
      {
        heading: 'Why Privacy Law Matters Even for Small, Local Businesses',
        body: `It is a common assumption that privacy regulations like GDPR (the EU's General Data Protection Regulation) or CCPA/CPRA (California's Consumer Privacy Act, as amended by the California Privacy Rights Act) only apply to large tech companies. In practice, a small business can fall within scope simply by having a website that collects any visitor from the EU/UK or California, running email marketing, or using analytics and advertising cookies. Whether a specific business is legally obligated to comply depends on factors like revenue thresholds, volume of consumer data processed, and where visitors and customers are located — details that are worth confirming with an attorney for any business handling meaningful volumes of personal data.

This lesson gives a general, practical starting point. It is educational content, not a compliance audit or legal advice, and privacy law changes frequently as new state laws pass and enforcement guidance evolves. A privacy attorney or compliance consultant should be brought in for anything beyond a basic marketing website — especially for businesses handling sensitive data such as health, financial, or children's information.

The unifying theme across most modern privacy laws is the idea of informed consent and control: people should generally know what data is being collected about them, why, and have a reasonable way to access, correct, or delete it.`,
      },
      {
        heading: 'GDPR Basics: Consent, Lawful Basis, and Data Subject Rights',
        body: `GDPR applies to organizations that process personal data of people located in the EU/UK, regardless of where the business itself is based. Its core building blocks that a small business typically needs to think about include:

- Lawful basis for processing — consent, contract necessity, legal obligation, or legitimate interest are the most common bases marketing teams rely on. Marketing cookies and email lists generally rely on consent.
- Cookie consent — many EU-facing sites use a cookie banner that lets visitors accept or reject non-essential cookies (analytics, advertising, remarketing pixels) before those cookies load, rather than only after clicking "accept."
- Data subject rights — individuals generally have the right to access the data held about them, request corrections, request deletion ("right to be forgotten"), and object to certain processing, including direct marketing.
- Data minimization — collecting only the data actually needed for a stated purpose, rather than gathering everything a form could technically ask for.
- A privacy policy — a plain-language document describing what data is collected, why, how long it is kept, and how people can exercise their rights.

For a small marketing-driven website, common practical steps include a consent banner that blocks non-essential tracking scripts until consent is given, a published privacy policy, and a documented process for responding to a deletion or access request within a reasonable timeframe.`,
      },
      {
        heading: 'CCPA/CPRA Basics: California Residents\' Rights',
        body: `CCPA, as strengthened by CPRA, gives California residents rights over personal information collected by businesses that meet certain thresholds (for example, thresholds tied to annual revenue, the volume of consumers' or households' personal information bought, sold, or shared, or a meaningful share of revenue from selling or sharing personal information). Whether a specific small business meets those thresholds is a fact-specific question worth checking against the current statutory limits, since dollar and volume thresholds can be updated over time.

Where CCPA/CPRA applies, businesses generally need to provide:

- A "Do Not Sell or Share My Personal Information" link (or an equivalent centralized opt-out mechanism) if the business sells or shares personal data, including certain forms of ad-tracking that regulators may treat as a "sale" or "share" under the law's broad definitions.
- A published privacy notice describing categories of data collected, purposes, and retention practices.
- A process for consumers to submit requests to know, delete, or correct their personal information, and to opt out of having sensitive personal information used for certain purposes.
- Non-discrimination — a business generally cannot deny goods or services, or charge different prices, simply because someone exercised a privacy right.

Even businesses below the CCPA thresholds sometimes choose to adopt similar practices voluntarily, both because thresholds can be met unexpectedly as a business grows and because other states have passed similar comprehensive privacy laws with their own thresholds.`,
      },
      {
        heading: 'Cookie Consent Banners: What They Generally Need to Do',
        body: `A cookie consent banner is often the most visible piece of privacy compliance on a marketing website. As a general rule of thumb, a well-built banner:

- Clearly states that the site uses cookies and briefly why (analytics, advertising, functionality).
- Offers a genuine choice — an "accept" and a "reject" (or "manage preferences") option that are comparably easy to find and use, not a design where rejecting requires several extra clicks while accepting is a single button.
- Blocks non-essential cookies and tracking scripts from loading until consent is given, for visitors where consent-based rules apply.
- Links to a full privacy/cookie policy with more detail.
- Lets a visitor change their preference later, not just on first visit.

Consent-management platforms (many of which offer free or low-cost tiers for small sites) can automate much of this, including scanning a site for cookies and generating a compliant-style banner. That said, no plugin substitutes for actually knowing what data a business's own tools (CRM, analytics, ad pixels, email platform) collect and why.`,
      },
      {
        heading: 'Email Marketing: CAN-SPAM and Consent Norms',
        body: `In the US, the CAN-SPAM Act sets baseline rules for commercial email, regardless of whether the recipient opted in. Under CAN-SPAM, commercial emails generally need to:

- Use accurate, non-deceptive subject lines and "From" information.
- Identify the message as an advertisement where applicable.
- Include the sender's valid physical postal address.
- Provide a clear and easy way to opt out (commonly an unsubscribe link), and honor opt-out requests within the timeframe the law specifies.
- Avoid continuing to email someone after they have unsubscribed.

CAN-SPAM itself does not require opt-in consent before the first email the way GDPR generally does for EU/UK recipients — but many list-management best practices (and platforms like Mailchimp, Klaviyo, and others) encourage or require confirmed opt-in anyway, both for deliverability reasons and because a growing number of state and international laws require it for at least some categories of recipients. A workable general approach for a small business is: collect explicit opt-in for marketing emails, make unsubscribing simple and immediate, and keep a record of when and how each contact opted in.`,
      },
      {
        heading: 'A Starter Checklist',
        body: `For a small business marketing website, a reasonable starting checklist looks like:

- A published, plain-language privacy policy that is kept current.
- A cookie consent mechanism appropriate to the site's audience (especially important for EU/UK traffic).
- A documented process for responding to data access/deletion requests.
- Opt-in email collection with a visible unsubscribe link on every send.
- A "Do Not Sell or Share" mechanism if applicable under CCPA/CPRA thresholds.
- A internal list of every tool that touches customer data (CRM, email platform, analytics, ad pixels) and what each one collects.

None of this replaces a proper legal review, particularly once a business grows, handles sensitive categories of data, or expands into new states or countries. But having these basics in place is a reasonable, good-faith starting point for most small marketing-driven businesses.`,
      },
    ],
  },
  {
    slug: 'citing-frameworks-and-ideas-practical-guide',
    title: 'Properly Citing Frameworks and Ideas: A Practical Guide',
    summary:
      'How to credit other people\'s frameworks and ideas in blog posts, social content, and presentations — building authority through honest attribution instead of quietly borrowing someone else\'s work.',
    topic: 'Compliance',
    level: 'Beginner',
    readTime: '8 min',
    attribution: 'Attribution and originality guidance',
    safety: 'extra-care',
    learningOutcome:
      'give clear, appropriate credit when referencing someone else\'s framework or idea in marketing content, choosing the right level of citation for the format.',
    metaTitle: 'Properly Citing Frameworks and Ideas: A Practical Guide | YDM Agency',
    metaDescription:
      'A practical guide to crediting other people\'s frameworks and ideas in blog posts, social media, and presentations without plagiarizing or oversharing.',
    lastUpdated: '2026-01-10',
    sections: [
      {
        heading: 'Why Attribution Is Both an Ethics Issue and a Trust Issue',
        body: `Marketing content regularly references ideas that originated elsewhere — a growth framework popularized by a well-known operator, a concept coined in a book, a model developed by another agency or a research firm. Referencing these ideas is completely normal and often strengthens content, since it signals awareness of the wider field. The problem arises when content presents someone else's original framework or wording as if it were created in-house, without any credit.

This is separate from copyright or trademark law (covered in other lessons in this series) — a lot of attribution is really about honesty and professional norms rather than a strict legal requirement. That said, presenting someone else's proprietary framework as original work can create real legal exposure in some cases, so when in doubt about where the ethical norm ends and a legal risk begins, a quick check with an attorney familiar with IP is a reasonable step; nothing here should be read as a definitive legal conclusion for any specific framework.

Good attribution habits also tend to build authority rather than undermine it. Audiences generally trust content more, not less, when it is transparent about where an idea came from and adds a business's own perspective or application on top of it.`,
      },
      {
        heading: 'A Simple Framework for Deciding How Much Credit to Give',
        body: `A useful rule of thumb: the more specific and "branded" an idea is, the more explicit the credit should be. A few tiers:

1. Widely diffused general concepts (e.g., "the marketing funnel," "A/B testing," "customer lifetime value") — these have become part of the general vocabulary of the field and typically do not need a citation each time they are mentioned.
2. Named frameworks with a known originator (e.g., a specific named model developed by a specific author, consultant, or firm) — these generally warrant a named credit the first time they are introduced in a piece of content, even if used informally afterward.
3. Direct quotes or close paraphrases of someone else's specific wording — these generally warrant both a named credit and, where practical, a link back to the original source.
4. Proprietary, trademarked, or certification-based frameworks — these need the most care, both attribution and, in some cases, a trademark notice or a decision to avoid using the branded name at all in favor of a generic description (see the "Proprietary Frameworks" lesson for more detail on this category specifically).

When uncertain which tier something falls into, defaulting to more credit rather than less is the safer and more professional choice.`,
      },
      {
        heading: 'Citation Formulas for Blog Posts and Long-Form Content',
        body: `For written content, a simple, repeatable formula works well: "[Framework/idea name], developed by [person/organization], is a way of thinking about [what it does]." For example: "The Jobs to Be Done framework, popularized by Clayton Christensen, reframes a purchase decision around the underlying job a customer is hiring a product to do."

A few practical patterns for blog and article content:

- First mention of a named framework: full credit plus a hyperlink to an authoritative source (the originator's own writing, a well-regarded explainer, or the original book/paper).
- Later mentions in the same piece: the framework name alone is usually fine, since credit has already been established.
- Direct quotes: quotation marks, the person's name, and ideally a link to the original source, even for a short quote.
- Building on someone else's idea: it helps to explicitly separate "here is the original idea" from "here is how I'd apply or extend it," so readers can tell which parts are attributed and which are original commentary.

A hyperlink alone is often enough for a quick mention in a listicle or roundup. A fuller citation — name, organization, and context — is warranted when the framework is central to the piece's argument or when directly quoting specific wording.`,
      },
      {
        heading: 'Social Media and Presentations: Compressed Formats, Same Principles',
        body: `Short-form content makes full citations harder to fit, but the underlying principle does not change. A few adaptations:

- On social media, tagging the original creator's account (when known) alongside a text credit ("h/t," "credit to," or "as [name] describes it") is a normal and low-friction way to attribute an idea in a caption or post.
- For carousel or slide-based content that walks through someone else's framework, a source credit on the first slide and again on the final slide (with a link or handle) covers most of the format's real estate constraints.
- For conference talks, webinars, or client presentations, a citation directly on the slide where the framework is introduced — not just buried in a spoken aside — keeps the credit visible even if the audience only skims later.
- Screenshots of someone else's diagram or slide should generally be avoided in favor of recreating the concept in original visual language and crediting the source in the caption, both to reduce copyright exposure and to keep the visual style consistent with the rest of the content.

As a general practice, if a piece of content would feel misleading to the original creator if they saw it — implying the idea was invented in-house when it was not — that is a signal the attribution needs to be more prominent, not less.`,
      },
      {
        heading: 'Building Original Authority on Top of Borrowed Ideas',
        body: `The goal of good citation is not to avoid ever referencing outside ideas — it is to be transparent about which parts of the content are original and which are attributed, so the audience can trust both. In practice, the most credible marketing content usually does three things: names the source of a framework clearly, explains it accurately (rather than a garbled paraphrase), and then adds a genuinely original layer — an application to a specific industry, a worked example, a counterpoint, or a synthesis of multiple frameworks into something new.

That original layer is where a business or agency's actual expertise shows up, and it is the part that is unambiguously safe to present as their own. Treating attribution as a foundation to build on, rather than a formality to minimize, tends to produce both more trustworthy and more genuinely differentiated content over time.`,
      },
    ],
  },
  {
    slug: 'ftc-endorsement-testimonial-guidelines',
    title: 'FTC Endorsement and Testimonial Guidelines',
    summary:
      'How to use customer reviews, influencer partnerships, and case studies without running afoul of the FTC\'s Endorsement Guides — including disclosure requirements and what "clear and conspicuous" means in practice.',
    topic: 'Compliance',
    level: 'Intermediate',
    readTime: '10 min',
    attribution: 'Regulatory awareness — not legal advice',
    safety: 'extra-care',
    learningOutcome:
      'apply the FTC\'s core disclosure requirements when using testimonials, influencer content, or incentivized reviews in marketing.',
    metaTitle: 'FTC Endorsement and Testimonial Guidelines | YDM Agency',
    metaDescription:
      'A practical guide to the FTC Endorsement Guides (16 CFR Part 255): disclosure rules for reviews, influencer partnerships, and case studies.',
    lastUpdated: '2026-01-14',
    sections: [
      {
        heading: 'What the Endorsement Guides Cover',
        body: `The Federal Trade Commission's Endorsement Guides (16 CFR Part 255) explain how the FTC Act's ban on deceptive advertising applies when a business uses someone else's endorsement — a customer review, an influencer post, a testimonial video, or a case study — to promote a product or service. The Guides themselves are not a separate law with their own penalties; rather, they describe the FTC's interpretation of when an endorsement practice could be considered a deceptive or unfair trade practice under the broader FTC Act, which can carry real enforcement consequences.

The Guides were substantially revised in 2023, the first major update since 2009, to account for social media, influencer marketing, and online reviews. Updates included a clearer definition of "clear and conspicuous" disclosure, an expanded definition of "endorsement" (covering tags, some forms of engagement, and even AI-generated "virtual influencers"), and more explicit guidance on fake, incentivized, and suppressed reviews.

This lesson summarizes general principles; it does not cover every scenario the Guides or the FTC's separate rule on fake reviews and testimonials might apply to. A marketing or advertising attorney should review disclosure practices for any campaign involving influencers, paid partnerships, or review incentives at meaningful scale.`,
      },
      {
        heading: 'The Core Principle: Endorsements Must Reflect Honest Opinions',
        body: `The foundational rule behind the Guides is straightforward: an endorsement has to reflect the honest opinions, findings, beliefs, or experience of the endorser, and it cannot convey a claim the business itself couldn't legally make in its own advertising. A few practical implications:

- A business cannot ask a reviewer to say something they don't actually believe, or edit a review to remove genuine criticism while presenting it as unedited.
- If an endorser claims specific results ("I lost 20 pounds in a month using this"), the business generally needs to be able to substantiate that this is a typical result, or clearly and conspicuously disclose what results consumers can generally expect if the endorser's experience is not typical.
- Fake reviews, reviews written by employees or family members without disclosure, and reviews procured through incentives that distort what consumers really think are all treated as deceptive practices under the FTC's updated guidance.
- Suppressing or selectively removing negative reviews to create a misleadingly positive impression can also raise concerns under the Guides.`,
      },
      {
        heading: 'Material Connection Disclosures: The Practical Core',
        body: `The most common compliance issue for small businesses and agencies is failing to disclose a "material connection" between a business and an endorser — any relationship that might affect how much weight a reasonable consumer gives the endorsement, and that consumers would not otherwise expect. This includes:

- Payment (cash, commission, or a flat fee for a post).
- Free or discounted products or services given in exchange for a review or post.
- Family, business, or employment relationships between the endorser and the business.
- Early access to a product, or entry into a giveaway/sweepstakes tied to posting a review.

Where a material connection exists, it generally needs to be disclosed clearly and conspicuously, in a way an average consumer would actually notice and understand — not buried, and not assumed to be obvious just because "sponsored content" is common on a platform. Practical disclosure language that is widely used includes "#ad," "#sponsored," "Paid partnership with [Brand]," or a plain-language line like "I received this product for free in exchange for my honest review." Vague language like "#sp," "#collab," or "thanks [Brand]" without more context is generally considered too ambiguous to reliably satisfy the disclosure standard.`,
      },
      {
        heading: 'What "Clear and Conspicuous" Means in Practice',
        body: `The 2023 update to the Guides added an explicit definition of "clear and conspicuous," which is a useful practical checklist:

- The disclosure should be in the same language as the endorsement itself.
- For video, it should be in the video, not just in a description that many viewers never open, and it should stay on screen long enough to be read and understood — not flash by in a single frame.
- For audio (including audio-only platforms or podcasts), it should be read aloud, not just shown as on-screen text in a video version.
- It should not be contradicted or obscured by other elements on the screen or page.
- Platform-provided disclosure tools (e.g., a built-in "Paid Partnership" tag) can help, but the Guides note they may not always be sufficient on their own if a platform's tool is easy to miss, so pairing a platform tag with an in-caption or in-content disclosure is a more conservative approach.
- A disclosure placed only at the very end of a long caption, after a "see more" cutoff, generally does not meet the standard, since many viewers will not scroll to see it.

A reasonable operating rule: if a typical viewer skimming quickly would likely miss the disclosure, it probably is not clear and conspicuous enough.`,
      },
      {
        heading: 'Case Studies, Testimonials on a Website, and B2B Contexts',
        body: `The Guides are not limited to influencer marketing — they also apply to customer testimonials on a website, case study videos, and B2B reviews. A few practical points for these formats:

- If a case study describes atypical or best-case results, a disclosure of typical results (or a clear statement that individual results vary) is a reasonable practice, particularly for performance-based claims (revenue growth, conversion lift, cost savings).
- If a customer received a discount, free service, or other incentive in exchange for appearing in a case study or providing a testimonial, that connection is worth disclosing on the page where the testimonial appears.
- Editing a testimonial for length or clarity is normal, but altering its substance or removing caveats the customer included is not advisable.
- For employee-submitted reviews on third-party review platforms, disclosing the employment relationship is the safer path, since presenting an employee review as an independent customer review is a common enforcement target.`,
      },
      {
        heading: 'A Working Disclosure Checklist',
        body: `Before publishing content that includes an endorsement, reviewing this checklist helps catch the most common issues:

- Is there any payment, free product, discount, family/employment relationship, or other incentive connecting the endorser to the business? If yes, is it disclosed?
- Is the disclosure placed where a typical viewer will actually see or hear it, not buried?
- Does the disclosure use clear language ("#ad," "paid partnership," "I received this for free") rather than ambiguous shorthand?
- If specific results are claimed, are they typical, or is a "results may vary" disclosure included?
- Is the endorsement itself an honest reflection of the endorser's real experience, unedited in substance?
- For case studies and testimonials on owned properties (website, brochures), is any incentive behind the testimonial disclosed on the same page?

Building these checks into a standard content-review step for any influencer, review, or testimonial campaign is a practical way to reduce risk without needing legal sign-off on every individual post.`,
      },
    ],
  },
  {
    slug: 'trademark-basics-protecting-and-respecting-brands',
    title: 'Trademark Basics: Protecting Your Brand and Respecting Others',
    summary:
      'How to search existing trademarks before committing to a name, when and how to register a mark with the USPTO, and how to avoid accidentally infringing on someone else\'s brand in marketing copy.',
    topic: 'Compliance',
    level: 'Intermediate',
    readTime: '10 min',
    attribution: 'Trademark awareness — not legal advice',
    safety: 'extra-care',
    learningOutcome:
      'search for conflicting trademarks before launching a brand name, and recognize common ways marketing copy can unintentionally infringe on another company\'s mark.',
    metaTitle: 'Trademark Basics: Protecting Your Brand and Respecting Others | YDM Agency',
    metaDescription:
      'A practical introduction to trademark basics: how to search the USPTO database, when to register a mark, and how to avoid infringing on others in copy.',
    lastUpdated: '2026-01-18',
    sections: [
      {
        heading: 'What a Trademark Actually Protects',
        body: `A trademark protects a name, logo, slogan, or other identifier used in commerce to distinguish one business's goods or services from another's, in a specific category (or categories) of goods/services. It is a different form of protection than copyright, which covers creative works, or a patent, which covers inventions. In the US, trademark rights can arise simply through use in commerce ("common law" rights, generally limited to the geographic area of actual use), but federal registration with the United States Patent and Trademark Office (USPTO) generally provides stronger, nationwide protection and easier enforcement.

Trademark law is fact-heavy and jurisdiction-specific, and this lesson is a general orientation, not legal advice or a substitute for a trademark attorney — particularly before committing significant budget to a new brand name or filing an actual application. A likelihood-of-confusion analysis, which is central to trademark disputes, is a nuanced legal judgment that an attorney or the USPTO examining attorney ultimately applies, not something a business can fully self-certify.`,
      },
      {
        heading: 'Searching Before You Commit to a Name',
        body: `Before adopting a business name, product name, tagline, or logo, a reasonable practice is to search for existing marks that might conflict with it. A basic search process generally includes:

- USPTO's trademark search system (the successor to the older TESS tool is the USPTO's current online trademark search platform) to look for identical or similar registered and pending marks in relevant classes of goods/services.
- A general web and social media search for the proposed name in the same industry, since common-law rights can exist even without a federal registration.
- A domain name and social handle availability check, which is a practical (not legal) signal that a name may already be in active use elsewhere.
- State-level business entity and trademark registry searches, since some states maintain their own registries separate from the federal system.

A name does not need to be identical to an existing mark to create a conflict — marks that are similar in sound, appearance, or meaning, used for related goods or services, can still create a "likelihood of confusion" problem. This is why a preliminary self-search is a useful first filter, but a full clearance search performed by a trademark attorney is the more thorough option before a significant launch investment.`,
      },
      {
        heading: 'When and How to Register a Trademark',
        body: `Registering a trademark is generally worth considering once a name or logo is core to a business's identity and there is a genuine intent to use it commercially on an ongoing basis. The federal registration process, in general terms, involves:

1. Confirming the mark is used (or intended to be used, via an "intent to use" application) in commerce.
2. Identifying the correct class(es) of goods or services the mark will cover, since a registration only protects the mark within the classes it is registered under.
3. Filing the application with the USPTO, including a specimen showing the mark in actual commercial use (for use-based applications).
4. Responding to any "office actions" — formal correspondence from a USPTO examining attorney raising questions or objections about the application.
5. Publication for opposition, where third parties can formally challenge the registration.
6. Registration, followed by ongoing maintenance filings required to keep the registration active over time.

Many small businesses use a trademark attorney for this process, since office actions and classification decisions can be technical, and an improperly filed or narrowly classified application can leave real gaps in protection. The ® symbol may only be used once a mark is actually federally registered; the ™ symbol can be used to signal a claimed (but not necessarily registered) trademark at common law.`,
      },
      {
        heading: 'Avoiding Accidental Infringement in Marketing Copy',
        body: `Trademark issues in day-to-day marketing content usually come from a few recurring patterns:

- Using a competitor's brand name as a keyword or in ad copy in a way that could confuse consumers about who is advertising (comparative advertising that clearly and truthfully names a competitor for factual comparison is generally more defensible than using a competitor's name in a way that implies affiliation or endorsement).
- Using a well-known brand name generically to describe a category of product (e.g., referring to any adhesive bandage as a brand name that is actually trademarked) — this is a real risk to the trademark owner and something careful writers avoid by using the generic term instead.
- Creating a logo, tagline, or name that is confusingly similar to an existing mark in the same or an adjacent industry, even unintentionally.
- Using someone else's trademarked framework, tool, or certification name as if it were generic or as if the business were affiliated with or certified by that brand, when it is not.
- Modifying or recoloring a well-known logo for a joke or "inspired by" visual, which can raise both trademark and, in some cases, copyright concerns depending on how closely it tracks the original.

A general rule of thumb: using a competitor's or brand's name factually and accurately (e.g., "compared to [Competitor]") tends to be lower-risk than uses that could imply sponsorship, partnership, or endorsement that doesn't exist.`,
      },
      {
        heading: 'What to Do If a Conflict Comes Up',
        body: `If a search turns up a similar existing mark, or if a business receives a cease-and-desist letter over its own name or content, the reasonable first step is not to panic or to assume the worst — but also not to ignore it. A measured process generally looks like:

- Documenting the details: the date the letter or notice was received, the specific mark and classes involved, and how the business has actually been using its own name or content.
- Avoiding an immediate public response (on social media, for example) before understanding the actual legal position.
- Consulting a trademark attorney to assess the strength of the competing claim and the available options, which can range from a simple clarifying response, to a coexistence agreement, to a rebrand in more serious cases.

Trademark conflicts are common enough in business that receiving a letter is not automatically a sign of wrongdoing — but it is a situation where professional legal input, rather than a DIY response, is the more prudent path.`,
      },
    ],
  },
  {
    slug: 'accessibility-ada-websites-emails-pdfs',
    title: 'Accessibility (ADA) in Marketing: Websites, Emails, and PDFs',
    summary:
      'Practical accessibility checks for marketing materials — alt text, color contrast, keyboard navigation, accessible PDFs, and email accessibility — using WCAG 2.1/2.2 AA as the commonly referenced benchmark.',
    topic: 'Compliance',
    level: 'Intermediate',
    readTime: '9 min',
    attribution: 'Accessibility awareness — not legal advice',
    safety: 'extra-care',
    learningOutcome:
      'run practical accessibility checks on websites, PDFs, and marketing emails using free tools and the WCAG 2.1/2.2 AA benchmark.',
    metaTitle: 'Accessibility (ADA) in Marketing: Websites, Emails, and PDFs | YDM Agency',
    metaDescription:
      'A practical guide to marketing accessibility: alt text, contrast, keyboard navigation, accessible PDFs and emails, and free tools like WAVE and Lighthouse.',
    lastUpdated: '2026-01-21',
    sections: [
      {
        heading: 'Why Accessibility Is a Marketing Compliance Topic',
        body: `The Americans with Disabilities Act (ADA) does not, in its original text, name a specific technical standard for websites — it predates the modern web. In practice, though, the Department of Justice's guidance and a large and growing body of court decisions treat inaccessible websites, apps, and digital documents as a form of discrimination under the ADA's "places of public accommodation" framework (Title III, which covers private businesses open to the public), and both DOJ guidance and settled cases consistently point to the Web Content Accessibility Guidelines (WCAG) as the practical technical benchmark. A 2024 DOJ rule specifically adopted WCAG 2.1 Level AA as the required technical standard for state and local government websites and apps under Title II of the ADA; while that particular rule targets government entities rather than private businesses, it reinforces WCAG 2.1/2.2 AA as the standard regulators and courts commonly reference.

Because ADA Title III web-accessibility litigation and enforcement continues to evolve, and because specific legal obligations can depend on the type of business, its size, and its state, this lesson should be treated as general, practical guidance rather than legal advice about whether a specific website is ADA-compliant. An accessibility or ADA-focused attorney is worth consulting for a business that has received a demand letter or wants a formal compliance opinion.

WCAG is organized into three conformance levels (A, AA, AAA), with AA being the level most commonly targeted in practice as a reasonable, achievable standard for most commercial websites.`,
      },
      {
        heading: 'Website Basics: Alt Text, Contrast, and Keyboard Navigation',
        body: `A handful of checks cover a large share of common website accessibility issues:

- Alt text — every meaningful image should have descriptive alternative text so screen reader users understand what it shows; purely decorative images should be marked so screen readers skip them rather than reading a distracting filename.
- Color contrast — text needs sufficient contrast against its background; WCAG 2.1/2.2 AA generally calls for a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text, which rules out common low-contrast design choices like light gray text on a white background.
- Keyboard navigation — a site should be fully usable without a mouse: every interactive element (links, buttons, form fields, menus) should be reachable and operable using the Tab key and Enter/Space, with a visible focus indicator showing where keyboard focus currently is.
- Semantic structure — using real heading tags (H1, H2, H3) in a logical order, and real list/table markup rather than visually-styled but semantically meaningless divs, helps screen readers and other assistive technology interpret the page correctly.
- Form labels — every input field should have a properly associated label, not just placeholder text, since placeholder text disappears once a user starts typing and is not reliably read by all assistive technology.
- Video captions and transcripts — captions for video content and transcripts for audio content are widely expected accessibility features, not optional extras.`,
      },
      {
        heading: 'Accessible PDFs and Documents',
        body: `PDFs used in marketing — brochures, case studies, whitepapers, downloadable guides — are a commonly overlooked accessibility gap. A scanned image of a document, or a PDF exported without tagging, is generally unreadable by screen readers even though it looks like normal text. Practical steps for more accessible PDFs include:

- Exporting from a source document (Word, Google Docs, InDesign) using the application's built-in "tagged PDF" or accessibility export option, rather than flattening or scanning a document to an image.
- Using real heading styles in the source document before export, so the resulting PDF retains a logical structure.
- Adding alt text to images and charts within the document before exporting.
- Ensuring reading order is logical, particularly for multi-column layouts, which can otherwise be read out of order by screen readers.
- Providing a properly tagged title, and setting the document language, in the PDF's metadata.
- For particularly important documents, offering an accessible HTML version of the same content as an alternative to the PDF.`,
      },
      {
        heading: 'Email Accessibility',
        body: `Marketing emails have their own accessibility considerations, since a meaningful share of subscribers use screen readers or have low vision:

- Use real text rather than an image of text for key content, since screen readers cannot read text embedded in an image, and images may also be blocked by default in many email clients.
- Add alt text to all images used in email templates.
- Maintain sufficient color contrast in email templates, consistent with the same 4.5:1 (normal text) and 3:1 (large text) benchmarks used for the web.
- Use a single logical reading order and real heading structure in HTML emails, avoiding purely table-based layouts that scramble reading order for screen readers.
- Make links descriptive ("View the spring catalog" rather than "click here") so users navigating by a list of links can understand each one out of context.
- Keep font sizes reasonably large and avoid relying on color alone to convey meaning (e.g., "the red button" is not accessible guidance for a colorblind or low-vision reader).`,
      },
      {
        heading: 'Free Tools to Test Accessibility',
        body: `Several free tools make it practical to run basic accessibility checks without specialized training:

- WAVE (Web Accessibility Evaluation Tool) — a free browser extension and web tool that visually flags accessibility issues directly on a live page, including missing alt text and contrast problems.
- axe DevTools — a free browser extension (also available as an automated testing library for developers) that scans a page against WCAG success criteria and explains each flagged issue.
- Lighthouse — built into Chrome DevTools, Lighthouse includes an accessibility audit that scores a page and lists specific issues with links to remediation guidance.
- Built-in OS screen readers (VoiceOver on macOS/iOS, Narrator on Windows, TalkBack on Android) — actually navigating a site or email with a screen reader, even briefly, tends to surface issues automated tools miss.

None of these tools guarantee full legal compliance on their own — automated scans typically catch a meaningful share of common issues (often estimated informally by accessibility practitioners as a partial but not complete slice of WCAG success criteria) but cannot fully evaluate more subjective criteria, like whether alt text is actually descriptive rather than just present. Combining automated tools with a manual keyboard-navigation pass and, ideally, periodic review by someone experienced in accessibility testing is a more reliable approach than relying on any single tool alone.`,
      },
    ],
  },
  {
    slug: 'ip-clauses-agency-freelancer-contracts',
    title: 'Intellectual Property Clauses in Agency and Freelancer Contracts',
    summary:
      'What IP-ownership, work-for-hire, license-back, and usage-rights clauses to include in agency and freelancer contracts so ownership of the finished work is clear from the start, and how disputes are typically resolved.',
    topic: 'Compliance',
    level: 'Advanced',
    readTime: '11 min',
    attribution: 'Contract structure awareness — not legal advice',
    safety: 'extra-care',
    learningOutcome:
      'identify the IP-ownership, work-for-hire, and licensing clauses a services contract needs so ownership of deliverables is unambiguous.',
    metaTitle: 'IP Clauses in Agency and Freelancer Contracts | YDM Agency',
    metaDescription:
      'A guide to work-for-hire, IP-assignment, license-back, and usage-rights clauses that keep ownership of agency and freelancer deliverables clear.',
    lastUpdated: '2026-01-26',
    sections: [
      {
        heading: 'Why IP Ownership Needs to Be Explicit, Not Assumed',
        body: `A common and costly misunderstanding in client-agency and client-freelancer relationships is the assumption that paying for creative or technical work automatically means owning the intellectual property in it. Under US copyright law, the default rule is that the creator of a work owns the copyright in it unless one of two things happens: the work legally qualifies as a "work made for hire," or the creator formally assigns ownership in writing. Simply paying an invoice does not, by itself, transfer copyright ownership.

This matters in practice for logos, website code, copywriting, photography, video, and design work commissioned from freelancers or agencies — without a clear contractual clause, a client may end up with only an implied license to use the work in a limited way, not full ownership, even after paying in full.

This lesson describes commonly used contract structures at a general, educational level. Contract law and the specifics of "work made for hire" doctrine can vary by jurisdiction and by the category of work involved, so a business relying on these clauses for anything beyond routine, lower-stakes projects should have an attorney draft or review the actual contract language.`,
      },
      {
        heading: 'Work Made for Hire vs. Assignment: Two Different Legal Paths',
        body: `Under US copyright law, "work made for hire" status generally applies automatically to work created by an actual employee within the scope of their employment. For independent contractors and freelancers, work-for-hire status generally only applies if both (a) the work falls into one of a limited, specifically enumerated list of categories in the Copyright Act (which includes things like contributions to a collective work, translations, and certain other specific categories, but does not automatically include most website design, general marketing copy, or original photography), and (b) the parties sign a written agreement stating the work is made for hire before or at the time the work is created.

Because many typical agency deliverables (website builds, branding, marketing copy, video) do not clearly fall into the enumerated work-for-hire categories, many contracts instead use an "assignment" clause: the creator retains initial ownership by default but explicitly and irrevocably assigns all rights, title, and interest in the finished work to the client, usually upon full payment. Many attorneys view an assignment clause as the more reliable mechanism precisely because it does not depend on the deliverable qualifying under the narrow work-for-hire categories.

A well-drafted contract often includes both a "work made for hire to the extent permitted by law" clause and a fallback assignment clause, so that whichever legal path applies, ownership still ends up with the client as intended.`,
      },
      {
        heading: 'License-Back and Portfolio Rights',
        body: `Even when a client owns the final IP outright, agencies and freelancers commonly negotiate a license-back clause allowing them to display the work in their own portfolio, case studies, and marketing materials. This is typically structured as a limited, non-exclusive license — the creator can show and describe the work for their own promotional purposes, but does not retain any ownership or right to resell, relicense, or reuse the actual assets for another client.

Clients sometimes want limits on this, particularly for sensitive projects (unreleased products, confidential campaigns, competitors in the same space), which is where a confidentiality or NDA clause interacts with the license-back provision — for example, allowing portfolio use only after a product launch, or only with client approval, or excluding certain confidential details even after launch.

A related clause worth including is a "pre-existing materials" or "background IP" provision, clarifying that any tools, templates, code libraries, stock assets, or frameworks the freelancer or agency already owned before the project (and continues to use across multiple clients) remain their own property, licensed to the client for use within the deliverable rather than assigned outright. Without this distinction, a client might mistakenly believe they now own a template or code library the agency reuses across every client relationship.`,
      },
      {
        heading: 'Usage Rights, Scope, and Third-Party Materials',
        body: `Even under a full assignment, it is worth explicitly defining the scope of what is being delivered and licensed, particularly for:

- Stock assets — a freelancer or agency often licenses stock photos, fonts, or music under a license that permits use in the deliverable but does not permit unlimited resale or reuse outside the agreed project; the contract should clarify that the client receives the deliverable, not necessarily unrestricted ownership of every third-party licensed component within it.
- Source files vs. final files — contracts should specify whether editable source files (design files, uncompressed video, source code repositories) are included, since owning the final rendered asset is not the same as having the ability to edit it later.
- Revisions and derivative works after the engagement ends — clarifying whether the client can modify the work themselves, or hire someone else to modify it, without further involvement from the original creator.
- Named individual likenesses, voice, or trademarks used within the work — for example, a client's ownership of a video does not automatically include unlimited rights to reuse a freelance actor's likeness beyond what was agreed, which is typically governed by a separate model release rather than the main IP clause.`,
      },
      {
        heading: 'Handling Disputes and Practical Contract Habits',
        body: `Most IP disputes between clients and agencies/freelancers arise from ambiguity rather than bad faith — an assumption on one side that was never actually written down. A few practical habits reduce this risk:

- Tie IP transfer explicitly to full and final payment, so partial payment does not create a scenario where a client is using work they have not fully paid for and do not yet own.
- Put deliverables in writing with enough specificity (a statement of work or deliverables list) that "the work" being assigned is unambiguous.
- Address termination scenarios — what happens to IP in incomplete work if the engagement ends early, including whether a client can use partial deliverables and under what payment terms.
- Include a dispute-resolution clause (mediation, arbitration, or a specified jurisdiction for any lawsuit), which can meaningfully reduce the cost and time of resolving a disagreement compared to litigating from scratch.
- Revisit boilerplate contract templates periodically, since a template built for one type of engagement (say, a one-off logo project) may not adequately cover a different one (an ongoing retainer producing a large volume of code or content).

As a general rule of thumb, spending the time to get IP and usage-rights language right at the start of an engagement is far less costly than trying to resolve an ownership disagreement after the relationship has ended — and for any contract governing significant or ongoing work, having an attorney draft or review the IP clauses specifically is a reasonable investment rather than an unnecessary expense.`,
      },
    ],
  },
  {
    slug: 'marketing-compliance-regulated-industries',
    title: 'Navigating Marketing Compliance in Highly Regulated Industries',
    summary:
      'An overview of the extra safeguards marketing in finance, health and wellness, and alcohol typically requires — from FINRA/SEC-adjacent advertising rules to FTC health-claim substantiation and TTB alcohol labeling rules.',
    topic: 'Compliance',
    level: 'Advanced',
    readTime: '11 min',
    attribution: 'Regulated-industry awareness — not legal advice',
    safety: 'extra-care',
    learningOutcome:
      'recognize the industry-specific compliance considerations that apply when marketing financial, health/wellness, or alcohol-related products and know when specialized counsel is needed.',
    metaTitle: 'Navigating Marketing Compliance in Highly Regulated Industries | YDM Agency',
    metaDescription:
      'General awareness of extra marketing compliance safeguards in finance, health/wellness, and alcohol — FINRA-adjacent, FTC, HIPAA-adjacent, and TTB rules.',
    lastUpdated: '2026-02-20',
    sections: [
      {
        heading: 'Why Regulated Industries Need an Extra Layer of Review',
        body: `Most of the compliance topics covered elsewhere in this series (copyright, privacy, endorsements, accessibility, trademarks) apply broadly across industries. Certain sectors — financial services, health and wellness, and alcohol, among others such as cannabis, gambling, and firearms — carry additional, industry-specific advertising rules on top of those general baselines, often enforced by a dedicated regulator with its own advertising review process.

This lesson is an awareness-level overview meant to help a marketing team recognize when a project has crossed into regulated territory and needs specialized review — it is not a substitute for the compliance function or specialized legal/regulatory counsel that regulated businesses are generally expected to maintain. Financial services marketing, health claims, and alcohol advertising all carry meaningful enforcement risk (including regulatory fines, forced ad takedowns, and in some cases license consequences), so treating this lesson as a complete compliance program for a regulated client would be a mistake. The purpose here is to help a generalist marketer ask the right questions early, not to replace specialized expertise.`,
      },
      {
        heading: 'Financial Services: FINRA, SEC, and Truth-in-Advertising Basics',
        body: `Marketing for broker-dealers, investment advisers, and many other financial services firms is subject to oversight that goes beyond general FTC truth-in-advertising principles. Broker-dealer communications are generally subject to FINRA rules (notably its communications-with-the-public requirements), which commonly require:

- Balanced presentation of risks alongside potential benefits or returns — for example, avoiding advertising language that emphasizes upside while omitting or minimizing material risk disclosures.
- Fair, clear, and not misleading claims about performance, with specific rules around how historical or hypothetical performance can be presented.
- In many cases, principal review and approval of marketing materials before they are used, and recordkeeping requirements for communications.
- Restrictions or specific disclosure requirements around testimonials and endorsements in investment adviser marketing, which historically had its own dedicated (and more restrictive) framework before the SEC's marketing rule updates broadened what is permitted, subject to conditions.

Registered investment advisers are separately subject to SEC rules, including a marketing rule governing testimonials, endorsements, and performance advertising with its own specific conditions. Because these frameworks are detailed, technical, and carry serious regulatory consequences, marketing for broker-dealers, registered investment advisers, or other regulated financial entities is generally reviewed by compliance/legal staff experienced specifically in financial services advertising rules before publication — not by a general marketing team working from a general compliance checklist.`,
      },
      {
        heading: 'Health and Wellness: FTC Health Claims and HIPAA-Adjacent Privacy',
        body: `Health and wellness marketing intersects with two distinct regulatory concerns: truthful claims and patient/consumer privacy.

On the claims side, the FTC (and, for drugs and certain medical claims, the FDA) requires that health-related claims be truthful, not misleading, and backed by "competent and reliable scientific evidence" appropriate to the type of claim being made — a general rule of thumb is that the stronger or more specific the health claim (e.g., "cures," "prevents," "clinically proven to treat"), the stronger the scientific substantiation generally needs to be. Testimonials describing atypical health results generally need the same "results may vary" or typical-results disclosure discussed in the FTC Endorsement Guides lesson, and this area is one where FTC enforcement has historically been particularly active, especially for supplements, weight-loss products, and wellness devices.

On the privacy side, HIPAA itself directly applies to "covered entities" (health care providers, health plans, and certain clearinghouses) and their business associates, not to marketing agencies or businesses generally. That said, many health-adjacent businesses (wellness clinics, telehealth platforms, health apps) either are covered entities or handle data that is treated similarly to protected health information under state law or platform policies, even if HIPAA doesn't technically apply to every part of their marketing operation. A cautious general practice for any health-related marketing is to avoid using or exposing individually identifiable health information (patient names, specific conditions, treatment details, before/after photos of a specific patient) in marketing without clear, documented, informed consent, and to check with legal counsel whether HIPAA or a state equivalent actually applies to the specific business and specific use of data involved.`,
      },
      {
        heading: 'Alcohol Advertising: TTB and State-Level Rules',
        body: `Alcohol marketing in the US is regulated at both the federal and state level, which makes it one of the more fragmented compliance areas to navigate:

- At the federal level, the Alcohol and Tobacco Tax and Trade Bureau (TTB) regulates labeling and, to a more limited extent, advertising claims for beer, wine, and spirits — including rules around mandatory statements, prohibited claims (such as certain health or curative claims), and standards for how alcohol content and other required information must be presented.
- Individual states layer their own advertising and marketing restrictions on top of federal rules, and these vary meaningfully — common areas of state-level regulation include restrictions on advertising near schools, rules about depicting minors or targeting audiences that are substantially underage, restrictions on certain promotional practices (like some social media contests or "happy hour" promotions), and state-specific rules tied to the three-tier distribution system common in US alcohol regulation.
- Social media and influencer marketing for alcohol brands adds another layer: age-gating (restricting content visibility to users who indicate they are of legal drinking age) is a widely used practice, along with avoiding any implication that alcohol contributes to social, sexual, or professional success in ways that could be seen as encouraging irresponsible consumption.
- Because a single national campaign can cross into dozens of different state advertising regimes, alcohol brands and their agencies commonly maintain a dedicated regulatory/legal review step specifically for advertising content, separate from general marketing approval.`,
      },
      {
        heading: 'A General Awareness Checklist for Regulated Clients',
        body: `When a marketing engagement touches a regulated industry, a few general questions help identify where specialized review is needed, even without becoming an expert in the underlying regulation:

- Does this industry have a dedicated regulator with its own advertising rules (FINRA/SEC for financial services, TTB for alcohol, FDA for certain health claims, state insurance regulators for insurance marketing, and so on)?
- Does the client already have an internal or outside compliance function that reviews marketing materials before publication, and has that review step been built into the project timeline?
- Are any claims being made (performance, results, health outcomes, safety) that would need scientific, statistical, or regulatory substantiation if challenged?
- Is any individually identifiable sensitive data (financial account details, health information) being used in marketing materials, and if so, has consent and applicable privacy law been addressed?
- Does the campaign run across multiple states or countries, each of which might apply different industry-specific advertising rules?

Where the answer to any of these is uncertain, looping in the client's own compliance or legal function — or recommending they engage one — is the responsible move for a marketing team working in a regulated space. This lesson provides general orientation only; it is not a substitute for industry-specific legal or compliance counsel, which regulated businesses should treat as a standard, ongoing part of their marketing process rather than an occasional check.`,
      },
    ],
  },
];
