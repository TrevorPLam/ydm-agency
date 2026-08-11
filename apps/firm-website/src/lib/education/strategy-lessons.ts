/**
 * FILE: strategy-lessons.ts
 * PURPOSE: Provides the complete STRATEGY_LESSONS array of EducationLesson objects for the Strategy topic in the /education section.
 * ARCHITECTURE: Static typed data module exporting an EducationLesson array; aggregated into EDUCATION_LESSONS by education-config.
 * KEY RULES: Each lesson must conform to the EducationLesson interface; slugs must be unique within the Strategy topic; topic must be 'Strategy'; attribution and safety fields must be set per the content sourcing policy.
 * DEPENDS ON: ./types (EducationLesson).
 * LAST UPDATED: 2026-08-10 Merged strategy-lessons-new.ts into this canonical file.
 */
import type { EducationLesson } from './types';

export const STRATEGY_LESSONS: EducationLesson[] = [
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
    learningOutcome:
      'correctly attribute widely taught marketing frameworks to their creators and apply at least one to a real campaign without misrepresenting its origin.',
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
    slug: 'smart-marketing-goals-connected-to-revenue',
    title: 'How to Set SMART Marketing Goals That Connect to Revenue',
    summary:
      'A step-by-step method for turning vague marketing wishes into SMART goals that tie directly to revenue, using the framework George T. Doran first published in 1981. Includes a worksheet for translating goals into weekly activities.',
    topic: 'Strategy',
    level: 'Beginner',
    readTime: '9 min',
    attribution: 'SMART goals framework — George T. Doran, Management Review, 1981',
    safety: 'cite-creator',
    learningOutcome:
      'write marketing goals that meet every SMART criterion and trace a clear line from each goal to a specific revenue outcome, instead of tracking vanity metrics.',
    metaTitle: 'How to Set SMART Marketing Goals That Connect to Revenue | YDM Agency',
    metaDescription:
      'Learn the SMART goals framework (George T. Doran, 1981) and use a practical worksheet to set marketing goals tied to real revenue outcomes.',
    lastUpdated: '2026-01-05',
    sections: [
      {
        heading: 'Where SMART Goals Actually Come From',
        body: `The acronym SMART is often tossed around in marketing meetings as if it were common wisdom that always existed. It has a real, traceable origin: George T. Doran, a consultant and former director of corporate planning at Washington Water Power Company, published an article titled "There's a S.M.A.R.T. Way to Write Management's Goals and Objectives" in the November 1981 issue of Management Review.

Doran's original version defined the letters as Specific, Measurable, Assignable, Realistic, and Time-related. Over the following decades, other writers and trainers adapted the acronym, most commonly swapping in "Achievable" for "Assignable" and "Relevant" for "Realistic." Both versions are in wide use today, and neither is more "official" than the other — but the framework itself traces back to Doran's 1981 article, and it's worth citing him when you teach it, rather than presenting it as folk wisdom with no author.

For a small business, the value of SMART isn't the acronym itself. It's the discipline of forcing every goal through five filters before you commit time and budget to it.`,
      },
      {
        heading: 'Why Marketing Goals Drift Toward Vanity Metrics',
        body: `Left unchecked, marketing goals tend to gravitate toward numbers that are easy to measure and easy to feel good about: followers, likes, impressions, website visits, email opens. These numbers aren't meaningless, but they aren't outcomes either. A business can double its follower count and still not sell one more unit.

This drift happens because vanity metrics are readily available inside every platform's dashboard, while revenue-linked metrics usually require connecting two or three different systems: your ad platform, your website analytics, and your point-of-sale or CRM data. It's genuinely more work to track "marketing-attributed revenue" than "impressions." SMART goals fix this by requiring you to name the specific, measurable outcome up front — which forces the revenue conversation before you pick a metric, not after.`,
      },
      {
        heading: 'The Five Filters, Applied to a Real Marketing Goal',
        body: `Take a vague starting point: "We want more people to know about us." Run it through each filter.

Specific: Instead of "more people," name who and where. "New customers in our home-delivery radius who haven't ordered in the last 12 months."

Measurable: Attach a number and a source of truth. "50 first-time orders from that group, tracked in our point-of-sale system by a unique promo code."

Achievable (or Assignable): Check this against your actual capacity — ad budget, staff time to fulfill orders, and inventory. A goal of 50 orders from a $300 ad budget in a town of 8,000 people is a different conversation than the same goal with a $3,000 budget.

Relevant (or Realistic): Ask whether this goal, if hit, actually moves the business forward this quarter, or whether it's a distraction from a bigger priority like retaining existing customers.

Time-related: Put a hard deadline on it. "By the end of Q2," not "eventually" or "this year" with no checkpoint.

The result: "Generate 50 first-time orders from lapsed customers in our delivery radius by June 30, using a tracked promo code, within a $1,200 ad budget." That's a goal you can plan a campaign around and know clearly whether you hit it.`,
      },
      {
        heading: 'The Revenue Connection Worksheet',
        body: `Use this four-column worksheet for every marketing goal before you approve a budget for it:

Column 1 — Marketing activity: What you're actually going to do (e.g., "run a spring promotion email series").

Column 2 — Immediate metric: The thing the activity directly produces (e.g., "email click-through rate," "landing page visits").

Column 3 — Business outcome: The metric that actually matters to the bank account (e.g., "number of bookings," "average order value," "repeat purchase rate").

Column 4 — Connection test: Write one sentence explaining exactly how column 2 causes column 3 to move. If you can't write that sentence without hand-waving, the activity likely needs a clearer call to action, better targeting, or should be cut from the plan.

Doing this exercise on paper — even roughly — catches a large share of marketing spend that would otherwise go toward activities that produce column 2 numbers with no real link to column 3.`,
      },
      {
        heading: 'Reviewing Goals Without Punishing Honesty',
        body: `A SMART goal that isn't reviewed is just a sentence you wrote once. Set a recurring check-in — monthly is usually right for a small business — where you look at each active goal and mark it on track, at risk, or missed, using the measurable criterion you defined up front.

When a goal is missed, resist the urge to quietly lower the bar or blame the metric. Instead, ask two questions: was the goal itself unrealistic given the resources assigned to it, or did the execution fall short of a reasonable plan? The answer changes what you do next quarter — either you adjust future goals to match real capacity, or you keep the goal and fix the execution. Treating a missed goal as useful information, rather than a failure to hide, is what makes the SMART process worth repeating quarter after quarter.`,
      },
    ],
  },
  {
    slug: 'who-why-win-framework-campaign-planning',
    title: 'The "Who, Why, Win" Framework for Campaign Planning',
    summary:
      'A simple one-page brief — Who is this for, Why does it matter to them, and what does Winning look like — that small businesses can fill out before starting any campaign or promotion. This is a lightweight planning heuristic, not a proprietary or widely published model.',
    topic: 'Strategy',
    level: 'Beginner',
    readTime: '7 min',
    attribution: 'Generic planning heuristic — not attributed to a single named source',
    safety: 'public-domain',
    learningOutcome:
      'fill out a one-page "Who, Why, Win" brief before launching any campaign or promotion, so the plan starts from the audience and the outcome instead of the tactic.',
    metaTitle: 'The "Who, Why, Win" Framework for Campaign Planning | YDM Agency',
    metaDescription:
      'Use the simple Who, Why, Win one-page brief to plan any small-business campaign or promotion before you spend a dollar on it.',
    lastUpdated: '2026-01-08',
    sections: [
      {
        heading: 'A Simple Fix for a Common Planning Mistake',
        body: `A common way small-business campaigns start is backward: someone decides on the tactic first — "let's do a Facebook ad," "let's send an email blast," "let's run a discount" — and only afterward tries to figure out who it's for and what it's supposed to accomplish. The tactic gets built, the audience and goal get bolted on as an afterthought, and the results are usually mediocre.

"Who, Why, Win" is a plain-language way to force the opposite order. It's not a trademarked model or an academic framework with a named originator — it's a simple mnemonic worth naming honestly as a lightweight planning heuristic. Its only job is to make you answer three questions on one page before you touch a design tool, an ad platform, or an email template.`,
      },
      {
        heading: 'Who: Naming the Actual Audience',
        body: `"Who" means naming a specific group of real people, not "everyone" or "our customers." Write down enough detail that you could picture one actual person in that group: their situation, what they already know about you, and what stage of the buying process they're in.

For example, "past customers who bought once over a year ago and never came back" is a usable "Who." "People in our city" is not — it's too broad to guide any decision about wording, channel, or offer. If your campaign has more than one distinct audience, write a separate Who, Why, and Win for each — don't try to force two audiences into one brief.`,
      },
      {
        heading: 'Why: The Audience\'s Reason, Not Yours',
        body: `"Why" answers why this matters to the person in the "Who" box — not why it matters to your business. "We need more revenue this quarter" is a real business reason, but it belongs in an internal planning document, not in this box. This box should capture something like "they moved and haven't found a new go-to spot for this service" or "they're price-sensitive right now and haven't seen a reason to switch back."

Getting this right shapes almost everything downstream: your message, your offer, and your channel. A campaign built around the business's reason ("we have excess inventory") tends to produce generic, self-focused messaging. A campaign built around the audience's reason tends to produce messaging that sounds like it understands the reader.`,
      },
      {
        heading: 'Win: Defining Success Before You Launch',
        body: `"Win" is a specific, observable outcome that tells you the campaign worked. It should be concrete enough that two different people looking at the results would agree on whether it happened: a number of bookings, a number of redeemed codes, a specific increase in repeat visits within a defined window.

Writing the "Win" before launch also prevents a common failure mode: retroactively deciding what counts as success based on whatever number looks good after the campaign runs. If you didn't write down "40 redemptions" beforehand, it's tempting to call 12 redemptions a win because "at least people saw it." Committing to the number in advance keeps the evaluation honest.`,
      },
      {
        heading: 'The One-Page Brief Template',
        body: `Put these on a single page, filled in before any creative work begins:

Campaign name and dates:

Who: [specific audience, described in enough detail to picture one real person]

Why (their reason, not ours): [what's true in their life or business that makes this relevant to them right now]

Win (specific and measurable): [the exact number or outcome that means this worked]

Budget and channel: [what you're spending and where]

One sentence connecting Who + Why to the message: [how the campaign's core message speaks directly to the audience's reason]

Keep the completed briefs in a shared folder. Over a year, they become a useful record of what audiences and reasons you've already tried, which prevents repeating the same campaign angle on the same audience without realizing it.`,
      },
    ],
  },
  {
    slug: 'competitive-intelligence-without-being-creepy',
    title: 'Competitive Intelligence Without Being Creepy',
    summary:
      'How to research competitors ethically using only public information — their website, public social posts, published reviews, and free-tier SEO tools — without impersonation, deception, or scraping data you have no right to.',
    topic: 'Strategy',
    level: 'Intermediate',
    readTime: '10 min',
    attribution: 'General ethical research practice — no single named framework',
    safety: 'public-domain',
    learningOutcome:
      'build a clear picture of a competitor\'s positioning, content strategy, and offers using only public, ethically gathered information.',
    metaTitle: 'Competitive Intelligence Without Being Creepy | YDM Agency',
    metaDescription:
      'A practical, ethical guide to researching competitor positioning, content, and offers using only public sources — no deception, no scraping.',
    lastUpdated: '2026-01-11',
    sections: [
      {
        heading: 'Where the Ethical Line Actually Sits',
        body: `Competitive research is a normal, legitimate part of running a business — every company sizes up its competitors. The line that matters is between using information a competitor has made public and obtaining information through deception, impersonation, or unauthorized access.

Reading a competitor's website, their public Instagram posts, their Google Business Profile reviews, or a press release they issued is fair game — they published it for the public to see. Creating a fake customer account to pump a competitor employee for internal pricing strategy, scraping a password-protected customer portal, or misrepresenting yourself to a competitor's staff to extract non-public information crosses into unethical territory, and in some cases legal territory. If you wouldn't be comfortable telling the competitor exactly how you got a piece of information, that's usually a sign you're on the wrong side of the line.`,
      },
      {
        heading: 'What to Learn From a Competitor\'s Website',
        body: `Start with the site itself, read as a customer would. Note the specific language they use to describe what they do — the exact phrases, not just the general idea. Note what they lead with on the homepage: price, speed, quality, convenience, or something else. That's usually their intended positioning, whether or not it's working.

Check their pricing page or service pages for what's included and excluded, and compare that directly to your own offer. Look at their calls to action: what are they actually asking a visitor to do, and how many steps does it take? A competitor with a confusing five-step booking process is telling you something useful about a gap you might be able to close more simply.`,
      },
      {
        heading: 'Reading Public Social Channels and Reviews',
        body: `A competitor's public social media accounts show you what they choose to promote and, more usefully, what their audience responds to — public like and comment counts are a rough but real signal of what content lands. Note the format and frequency, not just the content: are they posting daily short videos, weekly written updates, or occasional promotions? That tells you about their production capacity and the type of content their audience expects from businesses like yours.

Public reviews on Google, Yelp, or industry-specific platforms are one of the most useful and most underused sources. Read the negative reviews closely — they tell you exactly what that competitor's customers wish were different, which is often a direct opportunity for your own positioning. Read the positive reviews too, since they reveal what customers value enough to write about unprompted, which is a stronger signal than anything the competitor says about itself.`,
      },
      {
        heading: 'Using Free-Tier SEO and Ad Transparency Tools',
        body: `Several tools offer free tiers that surface public data without requiring any account access into the competitor's systems: free versions of SEO tools can show roughly what keywords a competitor's site ranks for and what other sites link to them. Meta's Ad Library and Google's Ads Transparency Center let you see any active ads a competitor is running publicly — this is information the platforms themselves make available to anyone, not a workaround.

These tools give you directional signals, not exact numbers — free tiers are intentionally limited and estimates can be rough. Use them to spot patterns (which pages a competitor invests in, what kind of ad creative they're running, how long a campaign has been active) rather than to make precise financial estimates about their spend.`,
      },
      {
        heading: 'Turning Research Into a Usable Competitive Snapshot',
        body: `Organize what you find into a simple one-page snapshot per competitor: their stated positioning, their pricing structure, their content cadence and format, their most common customer complaint (from reviews), and their most common customer praise. Update it quarterly rather than obsessively — competitive positions don't usually shift week to week for small local or regional businesses.

Use the snapshot to find gaps, not to copy. The goal of competitive intelligence is to identify what an audience wants that isn't being served well by anyone nearby, not to reproduce a competitor's exact offer with a different logo.`,
      },
    ],
  },
  {
    slug: 'annual-marketing-calendar-that-you-stick-to',
    title: 'How to Build an Annual Marketing Calendar (and Actually Stick to It)',
    summary:
      'A practical template for building a 12-month marketing calendar that balances seasonal trends, product or service launches, and the realistic content-creation bandwidth of a small team, so the plan survives past January.',
    topic: 'Strategy',
    level: 'Intermediate',
    readTime: '11 min',
    attribution: 'General marketing planning practice — no single named framework',
    safety: 'public-domain',
    learningOutcome:
      'build a realistic annual marketing calendar that accounts for seasonal demand, planned launches, and actual team capacity, rather than an aspirational list that falls apart by February.',
    metaTitle: 'How to Build an Annual Marketing Calendar (and Actually Stick to It) | YDM Agency',
    metaDescription:
      'A step-by-step template for building a 12-month marketing calendar that balances seasonality, launches, and real team bandwidth for small businesses.',
    lastUpdated: '2026-01-14',
    sections: [
      {
        heading: 'Why Most Annual Calendars Fail by February',
        body: `The typical annual marketing calendar is built in an optimistic afternoon in December, packed with a post for every day and a campaign for every month, and quietly abandoned by the second week of February once the day-to-day business gets busy again. The problem usually isn't the ideas — it's that the calendar was built around what would be nice to do, not around who is actually going to do it and how many hours they realistically have.

A calendar that survives the year is built in the opposite order: capacity first, then seasonal anchors, then launches, and only then specific content ideas layered on top.`,
      },
      {
        heading: 'Step 1: Audit Real Capacity Before Anything Else',
        body: `Before placing a single item on the calendar, write down who does marketing work and how many hours per week they genuinely have for it — not the hours they're scheduled for, but the hours left after everything else on their plate. For most small businesses, this number is smaller than owners expect, often just a few hours a week spread across one or two people.

Multiply that weekly capacity by 48 (accounting for a few weeks of holidays and slow periods) to get a rough annual hour budget. Every item you add to the calendar later should be checked against this budget. If the plan requires more hours than exist, something has to come off the calendar or move to a lower-effort format — this is the step that most calendars skip, and it's the reason they collapse.`,
      },
      {
        heading: 'Step 2: Map Seasonal Demand Honestly',
        body: `Look at your own historical sales data, if you have it, month by month for the last two to three years. This is more reliable than generic "best time to post" advice, because your seasonality is specific to your business, location, and customer base. A landscaping company and a tax preparer have almost opposite calendars even though both are "seasonal."

Mark your genuinely high-demand months, your genuinely slow months, and anything predictable in between (back-to-school, holidays relevant to your customer base, local events). Your marketing effort should generally increase just before a high-demand period, not during it — by the time demand peaks, most of the decision-making that marketing influences has already happened.`,
      },
      {
        heading: 'Step 3: Place Launches and Major Campaigns First',
        body: `Before filling in routine content, block out any known product launches, new service rollouts, or major promotions for the year. These get first claim on your capacity budget because they typically require more lead time and more assets (landing pages, email sequences, ad creative) than routine posts.

Work backward from each launch date and block two to four weeks beforehand for preparation, depending on complexity. If two launches land close together and your capacity audit shows you can't support both well, move one — a launch that gets rushed marketing support usually underperforms one that gets a smaller amount of well-planned support.`,
      },
      {
        heading: 'Step 4: Fill the Remaining Capacity With Routine Content',
        body: `Only after seasonal anchors and launches are placed should you fill remaining capacity with recurring content — regular social posts, a newsletter, blog posts, and so on. Set a cadence you can sustain in a slow month, not a busy one. If you can reliably manage one solid newsletter every two weeks, plan for that, not a weekly newsletter that quietly stops in month four.

Batch similar work where possible: photograph or film several months of content in one session, write several email drafts in one sitting. Batching reduces the setup cost that eats time when content is created one piece at a time.`,
      },
      {
        heading: 'Reviewing and Adjusting the Calendar Monthly',
        body: `Revisit the calendar at the start of each month rather than waiting for the year to end. Check three things: did last month's content actually get produced on schedule, did the capacity estimate hold up in practice, and has anything changed in the business (new hire, new product, unexpected slow period) that should shift the next month's plan.

Treat the annual calendar as a living plan you adjust monthly, not a contract you either follow perfectly or fail. A calendar that gets realistically adjusted every month is far more useful over a year than a perfect-looking plan that gets abandoned entirely after the first missed deadline.`,
      },
    ],
  },
  {
    slug: 'modern-swot-analysis-for-marketing-strategy',
    title: 'Modern SWOT Analysis for Marketing Strategy',
    summary:
      'How to run a SWOT analysis that produces actual marketing decisions instead of a static four-box list, with an honest look at where the SWOT framework came from and why its origin is genuinely debated among historians.',
    topic: 'Strategy',
    level: 'Intermediate',
    readTime: '10 min',
    attribution: 'SWOT analysis — commonly linked to Albert Humphrey and the Stanford Research Institute; exact origin is debated among historians',
    safety: 'cite-creator',
    learningOutcome:
      'run a SWOT analysis that moves past a static list and produces two or three specific, actionable marketing decisions.',
    metaTitle: 'Modern SWOT Analysis for Marketing Strategy | YDM Agency',
    metaDescription:
      'Run a SWOT analysis that leads to real marketing decisions, with an honest account of the framework\'s debated origins at the Stanford Research Institute.',
    lastUpdated: '2026-01-19',
    sections: [
      {
        heading: 'An Honest Account of Where SWOT Came From',
        body: `SWOT — Strengths, Weaknesses, Opportunities, Threats — is one of the most widely taught strategy tools in the world, and also one whose origin is genuinely unsettled. It's commonly attributed online to Albert S. Humphrey, who worked at the Stanford Research Institute, and to research he supposedly led there in the 1960s and 1970s. Humphrey himself, in later writing, described a related "SOFT" approach (Satisfactory, Opportunity, Fault, Threat) that was reportedly developed earlier at the Stanford Research Institute by researcher Robert F. Stewart in the mid-1960s, which Humphrey said later evolved into SWOT.

Historians who have gone back to primary sources note that the documented trail is thin: there's no single, universally accepted academic paper that "introduces" SWOT in the way Doran's 1981 article introduced SMART. Other researchers have separately credited Harvard Business School faculty or strategist Igor Ansoff with related contributions to the same basic idea around the same period. The honest summary is: SWOT most likely grew out of long-range planning work connected to the Stanford Research Institute in the 1960s, Albert Humphrey is the name most commonly associated with popularizing it, but the exact authorship is disputed rather than settled — and it's worth saying so rather than stating a single inventor with false confidence.`,
      },
      {
        heading: 'Why Most SWOT Lists Don\'t Lead Anywhere',
        body: `The typical SWOT exercise produces four lists on a whiteboard, a photo gets taken, and the lists are never referenced again. This happens because listing items is easy and comfortable, while turning those items into decisions requires harder conversations about trade-offs, priorities, and what to stop doing. A SWOT analysis that stops at the list stage has done the easy 20% of the work.

The fix isn't a different four-box template — it's adding a required next step that converts each item into a specific action or explicitly discards it as not currently actionable.`,
      },
      {
        heading: 'Filling the Four Boxes With Marketing-Specific Detail',
        body: `Strengths and Weaknesses should be internal and specific to your marketing function, not general business strengths. "We have a loyal repeat customer base we can email directly" is a marketing strength. "We're a great company" is not specific enough to act on.

Opportunities and Threats should be external and outside your direct control. "A competitor just closed a location near us" is an opportunity. "A new competitor with a lower price point just opened nearby" is a threat. Avoid the common mistake of putting internal issues in the Opportunities or Threats boxes — a weak website is a weakness, not a "threat," and mixing the categories up makes the next step (pairing strengths against threats, etc.) less useful.`,
      },
      {
        heading: 'The Pairing Step That Turns Lists Into Strategy',
        body: `Once all four boxes are filled, don't stop — pair them across a simple grid: Strengths against Opportunities, Strengths against Threats, Weaknesses against Opportunities, Weaknesses against Threats.

Strengths + Opportunities: how can an existing strength be used to capture an external opportunity right now? This pairing usually produces the fastest, lowest-risk actions.

Strengths + Threats: how can an existing strength be used to defend against an external threat?

Weaknesses + Opportunities: is a weakness serious enough that it will cause you to miss an opportunity unless it's fixed first?

Weaknesses + Threats: which weakness-threat combination represents the most serious risk to the business, and does it require a defensive plan?

For each of the four pairings, write at least one specific action with an owner and a deadline. This pairing step is what separates a SWOT analysis that produces decisions from one that produces a whiteboard photo.`,
      },
      {
        heading: 'A Worked Example',
        body: `Strength: an engaged email list of 2,000 past customers. Opportunity: a competitor recently raised prices. Paired action: send a targeted "price-lock" offer to the email list within two weeks, before the competitor's price increase becomes common knowledge in the local market.

Weakness: no one on the team is confident producing video content. Threat: competitors are increasingly winning attention with short-form video. Paired action: rather than ignoring this pairing, decide explicitly — either invest in training or a freelancer for video within the next quarter, or consciously accept the gap and double down on a format where the team is already strong. Either choice is fine; what matters is that it's a decision, not a box left unaddressed.`,
      },
      {
        heading: 'Keeping SWOT a Living Document',
        body: `Revisit the SWOT analysis every six months rather than treating it as an annual, one-time exercise. Markets, competitors, and internal capabilities change faster than a yearly cadence can track. Keep the previous version alongside the new one so you can see which weaknesses got fixed, which threats materialized, and which opportunities were captured or missed — that record is often more useful than the analysis itself, because it shows whether the pairing-and-action step is actually being followed through on.`,
      },
    ],
  },
  {
    slug: 'strategic-partnerships-co-marketing-small-budget',
    title: 'Strategic Partnerships and Co-Marketing on a Small Budget',
    summary:
      'A practical guide to finding, pitching, and executing win-win marketing partnerships with other businesses that extend reach without requiring a large budget.',
    topic: 'Strategy',
    level: 'Advanced',
    readTime: '11 min',
    attribution: 'General co-marketing practice — no single named framework',
    safety: 'public-domain',
    learningOutcome:
      'identify realistic co-marketing partners, pitch a specific win-win arrangement, and run a joint campaign with clear terms and shared measurement.',
    metaTitle: 'Strategic Partnerships and Co-Marketing on a Small Budget | YDM Agency',
    metaDescription:
      'A practical guide to finding, pitching, and running co-marketing partnerships that extend a small business\'s reach without a large budget.',
    lastUpdated: '2026-01-23',
    sections: [
      {
        heading: 'Why Partnerships Work Especially Well for Small Budgets',
        body: `A co-marketing partnership swaps money for shared audience access: instead of paying to reach a new group of people through ads, you reach them through a business that already has their trust. Done well, both businesses gain access to an audience they didn't have before, at a fraction of the cost of paid acquisition.

This works best between businesses that are complementary rather than competitive — serving a similar customer but with a different product or service, so neither side feels like they're handing over customers to a rival. A wedding photographer and a florist, a gym and a healthy meal-prep service, a bookstore and a local coffee shop are typical examples of complementary, non-competing pairs.`,
      },
      {
        heading: 'Finding the Right Partners',
        body: `Start with businesses your own customers already patronize. Ask a handful of loyal customers, informally, what other local businesses they use regularly in a related category — this is more reliable than guessing. Look also at businesses with a similar customer profile but different timing in the buying journey (for example, a business that customers use before yours, and one they use after).

Check basic compatibility before reaching out: does the potential partner have a comparable size and audience engagement level, and does their brand tone and reputation match well enough that association with them wouldn't confuse or concern your own customers. A mismatch in scale (a one-location shop partnering with a large regional chain) usually means one side gets much more value than the other, which makes the partnership harder to sustain.`,
      },
      {
        heading: 'Structuring a Pitch Around Their Interest, Not Yours',
        body: `When reaching out, lead with a specific, concrete idea rather than a vague "let's collaborate sometime." Name the exact mechanic: a bundled offer, a joint event, a cross-promotion where each business features the other to its own list, or a co-hosted giveaway.

Make the value to them obvious and roughly equal to the value you're asking for. If you're asking to be included in their newsletter, offer to include them in yours at a comparable size and frequency. If the exchange is genuinely equal, most independent local businesses will say yes to a low-effort, well-defined proposal — the biggest barrier is usually vagueness, not resistance to partnering itself.`,
      },
      {
        heading: 'A Menu of Low-Cost Co-Marketing Mechanics',
        body: `Cross-promotion swap: each business dedicates one social post or one newsletter section to the other, on an agreed date.

Bundled offer: customers who buy from one business get a discount or perk at the other, tracked with a simple code or referral card.

Co-hosted event or workshop: split the cost and effort of a single event that serves both customer bases, with both businesses promoting it to their own audience.

Joint giveaway: both businesses contribute a prize, and entrants are asked to follow or subscribe to both accounts to enter, which is one of the more reliable low-cost ways to gain new, relevant followers quickly.

Referral arrangement: a standing agreement to refer customers to each other when appropriate, tracked with a simple shared spreadsheet or referral codes.`,
      },
      {
        heading: 'Setting Terms Before You Launch',
        body: `Even an informal partnership benefits from writing down, in a short email both sides agree to, exactly what each business is committing to: what gets posted, on what dates, how discounts or referrals are tracked, and how long the arrangement runs before being reviewed. This isn't about creating a formal legal contract for every small collaboration — it's about avoiding the common failure where one side posts on time and the other forgets, and the imbalance quietly damages the relationship.

Agree on a simple way to track results before launch: unique promo codes, a shared tracking link, or a specific question at checkout ("how did you hear about us?"). Without this, neither business can tell afterward whether the partnership was worth repeating.`,
      },
      {
        heading: 'Reviewing and Deciding Whether to Repeat',
        body: `After the agreed period, compare actual results — redemptions, new followers, referred customers — against what each side expected going in. Be honest with your partner about the results, even if they're underwhelming; a partner who hears the truth is more likely to want to try a refined version later than one who senses they're being told a polished story.

If the partnership worked, formalize it into a recurring arrangement rather than a one-off. If it didn't, diagnose why before discarding the idea entirely — a mismatched audience calls for a different partner, while a good partner with weak execution (bad timing, unclear offer) calls for trying the same partner again with a better mechanic.`,
      },
    ],
  },
  {
    slug: 'portfolio-analysis-which-products-to-invest-in',
    title: 'Portfolio Analysis: Which Products or Services Should You Invest In?',
    summary:
      'How to use the BCG Growth-Share Matrix, created at the Boston Consulting Group under founder Bruce Henderson around 1968-1970, alongside basic product life-cycle thinking, adapted for a small business deciding where to put its limited marketing budget.',
    topic: 'Strategy',
    level: 'Advanced',
    readTime: '12 min',
    attribution: 'BCG Growth-Share Matrix — Bruce Henderson, Boston Consulting Group, circa 1968-1970',
    safety: 'cite-creator',
    learningOutcome:
      'place each of your products or services onto a growth-share style grid and its life-cycle stage, and use both to decide where to direct limited marketing budget.',
    metaTitle: 'Portfolio Analysis: Which Products or Services to Invest In | YDM Agency',
    metaDescription:
      'Use the BCG Growth-Share Matrix and product life-cycle thinking, adapted for small businesses, to decide which products or services deserve marketing investment.',
    lastUpdated: '2026-01-28',
    sections: [
      {
        heading: 'Where the Growth-Share Matrix Came From',
        body: `The Growth-Share Matrix is one of the most recognized tools in business strategy, developed at the Boston Consulting Group (BCG), the firm founded by Bruce Henderson. According to BCG's own historical account, the matrix was created collaboratively — BCG's Alan Zakon first sketched the idea, and Henderson refined and popularized it. Henderson's essay "The Product Portfolio," published in 1970, is the most commonly cited introduction of the concept, though BCG's own history page also traces the underlying idea to 1968. The exact year is treated somewhat loosely even by BCG, which is worth noting honestly rather than picking one date and presenting it as certain.

The core idea: a company (or, for our purposes, a small business) rarely has just one product or service. It has a portfolio, and different items in that portfolio deserve different amounts of investment based on two factors — how fast that market is growing, and how strong your position is within it.`,
      },
      {
        heading: 'The Four Categories, Adapted for a Small Business',
        body: `The original matrix plots relative market share against market growth rate, producing four categories, traditionally named Stars, Cash Cows, Question Marks, and Dogs. A small business rarely has the market research to calculate precise relative market share, so adapt the inputs: use "how strong is our position and reputation in this offering compared to visible competitors" as a stand-in for market share, and "is demand for this growing, flat, or shrinking in our area" as a stand-in for market growth.

Stars: strong position, growing demand. These deserve continued marketing investment because they're winning and the market is still expanding.

Cash Cows: strong position, flat or mature demand. These are reliable revenue generators that don't need heavy new marketing investment — they need retention and efficiency, not growth spending.

Question Marks: weak position, growing demand. These need a real decision: invest seriously to build a stronger position while the market is still growing, or accept that you won't compete effectively here and scale back.

Dogs: weak position, flat or shrinking demand. These generally don't deserve further marketing investment unless there's a specific strategic reason to keep them (e.g., they support the sale of a Star offering).`,
      },
      {
        heading: 'Plotting Your Own Offerings',
        body: `List every distinct product or service line your business sells. For each one, make a rough, honest call on two axes: your competitive position (strong, medium, weak) based on customer feedback, repeat purchase rate, and how you compare to visible local competitors; and demand trajectory (growing, flat, shrinking) based on your own sales trend over the last one to two years, plus any obvious external signals.

Plot each offering onto a simple two-by-two grid. Don't aim for false precision — the value of this exercise is the relative comparison between your own offerings, not an exact scientific measurement. A business with five offerings will usually find that its marketing budget is currently spread close to evenly across all five, even though the grid shows they clearly don't deserve equal investment.`,
      },
      {
        heading: 'Layering in Product Life-Cycle Thinking',
        body: `The product life-cycle concept — the idea that products move through introduction, growth, maturity, and decline stages, each with different marketing needs — adds a time dimension the growth-share grid doesn't fully capture on its own. A "Cash Cow" today might be sliding from maturity into decline, which changes the right move from "maintain with light marketing" to "plan an eventual sunset or refresh."

For each offering, ask which life-cycle stage it's genuinely in right now. Introduction-stage offerings usually need awareness-building marketing even if current revenue is small. Growth-stage offerings need marketing that supports rapid customer acquisition. Maturity-stage offerings need marketing focused on retention, loyalty, and defending share. Decline-stage offerings usually need the least new marketing investment, and the more important decision is often when and how to retire or replace them.`,
      },
      {
        heading: 'Turning the Analysis Into a Budget Decision',
        body: `Once every offering is plotted, redraw your marketing budget allocation to roughly match the analysis rather than historical habit. A common, healthy pattern for a small business: the largest share of budget goes to Stars (protect and grow the winners), a moderate efficient share goes to Cash Cows (retention, not acquisition), a deliberate and time-limited experimental budget goes to a chosen Question Mark or two, and near-zero new investment goes to Dogs.

This reallocation is often uncomfortable, because it usually means pulling marketing spend away from a long-standing offering that the business owner is personally attached to. Treat the discomfort as a signal to look closer at the data, not as a reason to skip the reallocation entirely.`,
      },
      {
        heading: 'Revisiting the Portfolio Annually',
        body: `Offerings move between categories over time — a Question Mark that gets sustained investment can become a Star; a Star can mature into a Cash Cow as its market growth slows; a Cash Cow can slide toward Dog status if a competitor disrupts the category. Rerun this analysis once a year, ideally alongside annual budget planning, so marketing investment keeps pace with where each offering actually sits rather than where it sat two or three years ago.`,
      },
    ],
  },
  {
    slug: 'lightweight-brand-audit-how-to-run-one',
    title: 'How to Design and Run a Lightweight Brand Audit',
    summary:
      'A systematic checklist-based process for reviewing brand consistency, messaging, and customer perception across every touchpoint, sized for a small business without a dedicated brand team.',
    topic: 'Strategy',
    level: 'Advanced',
    readTime: '11 min',
    attribution: 'General brand management practice — no single named framework',
    safety: 'public-domain',
    learningOutcome:
      'run a lightweight brand audit across your visual identity, messaging, and customer touchpoints, and turn the findings into a prioritized fix list.',
    metaTitle: 'How to Design and Run a Lightweight Brand Audit | YDM Agency',
    metaDescription:
      'A step-by-step checklist for running a lightweight brand audit of your visual identity, messaging, and customer touchpoints, sized for small teams.',
    lastUpdated: '2026-02-04',
    sections: [
      {
        heading: 'What a Brand Audit Actually Checks For',
        body: `A brand audit is a systematic review of whether the experience a customer has with your business matches what you intend that experience to be, and whether it's consistent from one touchpoint to the next. It isn't a rebrand, and it isn't a subjective opinion session about whether the logo "feels right." It's closer to a quality-control pass: does every place a customer encounters the business look, sound, and behave like the same business.

For a small business, a lightweight audit that takes a few focused hours produces most of the value of a much larger formal process, as long as it's done systematically rather than as a casual scroll through the website.`,
      },
      {
        heading: 'Step 1: Inventory Every Touchpoint',
        body: `Before judging anything, list every place a customer or prospect might encounter your brand: website (every major page, not just the homepage), social media profiles across each platform, email templates, physical signage and packaging if applicable, printed materials like business cards or menus, the point-of-sale or checkout experience, automated messages (order confirmations, appointment reminders), and how staff describe the business in person or on the phone.

Most brand inconsistency problems hide in the touchpoints that get updated infrequently — an old email signature, a printed flyer from two years ago, a social bio that was never updated after a rebrand. The inventory step exists specifically to surface these forgotten touchpoints before the review begins.`,
      },
      {
        heading: 'Step 2: Check Visual Consistency',
        body: `For each touchpoint, check against a short, specific list: is the correct current logo used (not an old version); are the brand colors consistent (note any touchpoint using an old palette or an inconsistent shade); is the typography consistent or at least compatible; and does the overall visual quality (photo quality, layout, spacing) meet the standard set by your best touchpoint.

Keep a simple log: touchpoint name, what's inconsistent, and how severe the gap is (minor, noticeable, glaring). This turns a vague impression of "things feel inconsistent" into a specific, prioritizable list.`,
      },
      {
        heading: 'Step 3: Check Messaging Consistency',
        body: `Messaging drift is often more damaging than visual drift because it confuses what customers think you actually do. Pull the core description of the business from every touchpoint — website "About" page, social bios, elevator pitch staff give in person, any printed materials — and compare them side by side.

Look for three specific problems: contradictions (one touchpoint says "family-owned since 1998," another omits it or gives a different date), tone mismatches (formal and corporate language on the website next to very casual, joke-heavy social captions, with no clear reason for the difference), and outdated claims (a "now offering" message for something that's been standard for years, or a promotion that technically ended). Note that some tone variation across channels is normal and even healthy — the goal is catching contradictions and neglect, not forcing identical wording everywhere.`,
      },
      {
        heading: 'Step 4: Check Customer-Perceived Experience',
        body: `Visual and messaging consistency only tell part of the story — the other part is how the brand actually feels to go through as a customer. Walk through your own core customer journey as if you were a first-time customer: visit the website cold, go through the actual booking or purchase flow, read the confirmation email or text you'd receive, and if practical, call or message the business with a basic question.

Note where the experience feels inconsistent with the brand's intended positioning. A business that markets itself as premium and personal but sends a generic, typo-ridden automated confirmation email has a brand gap that no amount of logo consistency will fix. Reading a handful of recent public reviews for recurring language customers use to describe the business (both positive and negative) is a useful, low-cost supplement to this step — it tells you how the brand actually lands, not just how it's intended.`,
      },
      {
        heading: 'Turning Findings Into a Prioritized Fix List',
        body: `Combine the visual, messaging, and experience findings into a single list, then sort by two factors: how many customers the issue affects (a homepage inconsistency affects far more people than an old business card) and how easy the fix is. Tackle high-impact, low-effort fixes first — these are usually neglected touchpoints like an outdated social bio or an old email signature, and fixing them takes minutes, not weeks.

Set a recurring lightweight audit — once or twice a year is usually sufficient for a small business — rather than treating this as a one-time cleanup. Brand drift accumulates gradually as new touchpoints get added (a new social platform, a new email tool, a new staff member describing the business slightly differently), so a periodic recheck catches the drift before it becomes noticeable to customers.`,
      },
    ],
  },
];
