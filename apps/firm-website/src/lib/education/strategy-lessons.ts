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
];
