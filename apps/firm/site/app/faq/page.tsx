"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Zap, MessageSquare, Calendar, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function FaqPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)

  const toggleCategory = (categoryId: string) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId)
    setOpenQuestion(null) // Close any open question when switching categories
  }

  const toggleQuestion = (questionId: string) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId)
  }

  const categories = [
    {
      id: "working-with-me",
      title: "Working With Me",
      description: "Designed to humanize the solo-founder model and differentiate from faceless agencies.",
      questions: [
        {
          id: "who-work-with",
          question: "Who exactly will I work with?",
          answer: "You'll work directly with me, [Your Name], the founder and lead strategist. No junior account managers, no handoffs, no phone tag. One dedicated marketer who knows your business inside and out."
        },
        {
          id: "one-person",
          question: "Is this a one-person operation?",
          answer: "Yes, by design. I keep it lean so you get senior-level thinking and execution without agency overhead. For specialized tasks, I collaborate with a small network of trusted specialists, but I remain your single point of accountability."
        },
        {
          id: "sick-vacation",
          question: "What if you get sick or go on vacation?",
          answer: "I plan ahead. Ongoing campaigns are scheduled, automated, and monitored. For true emergencies, I have contingency plans in place. I'll always communicate proactively if anything impacts your work."
        },
        {
          id: "take-every-project",
          question: "Do you take on every project?",
          answer: "No. I'm selective about who I work with. It ensures I can give each client deep attention and do my best work. If we're not the right fit, I'll tell you honestly and try to point you in the right direction."
        }
      ]
    },
    {
      id: "pricing",
      title: "Pricing, Contracts & Commitment",
      description: "Directly addresses fear of hidden costs, long lock-ins, and agency bloat.",
      questions: [
        {
          id: "website-cost",
          question: "How much does a website cost?",
          answer: "Custom web design projects start at $[X,XXX]. The final price depends on scope, complexity, and functionality. During our free strategy call, we'll define exactly what you need and I'll give you a clear, itemized proposal—no surprise charges."
        },
        {
          id: "long-term-contract",
          question: "Do I have to sign a long-term contract?",
          answer: "No. Partnership packages are month-to-month. Web design projects are typically fixed-scope with a clear timeline. Cancel anytime, and you keep everything we've built—no hostage situations."
        },
        {
          id: "ongoing-retainers",
          question: "What about ongoing marketing retainers?",
          answer: "If you choose an ongoing partnership (e.g., SEO, social, content), retainers start at $[X,XXX]/month depending on scope. All services are available à la carte, so you only pay for what you need."
        },
        {
          id: "hidden-fees",
          question: "Are there any hidden fees?",
          answer: "Never. Every cost is scoped and agreed upon before work begins. Third-party costs (like domain registration, premium plugins, or ad spend) are passed through at cost and always pre-approved."
        }
      ]
    },
    {
      id: "web-design",
      title: "Web Design & Development",
      description: "Clarifies process, ownership, and technical standards.",
      questions: [
        {
          id: "platform",
          question: "What platform do you build on?",
          answer: "I primarily build on Webflow—it offers best-in-class performance, SEO, and design flexibility. You'll get a custom site, not a template tweak. I also work with headless CMS solutions like Strapi when a project demands it."
        },
        {
          id: "mobile-friendly",
          question: "Will my website be mobile-friendly?",
          answer: "Absolutely. Every site is designed mobile-first and tested across devices. It's not an upsell—it's the baseline."
        },
        {
          id: "templates",
          question: "Do you use templates?",
          answer: "No. Every site is built from a strategic brief and designed specifically for your brand, audience, and conversion goals. I use AI to accelerate research and production, but every design decision is human-led."
        },
        {
          id: "own-website",
          question: "Do I own my website?",
          answer: "100%. Your domain, your hosting, your content, your data. I help you set it up in your own accounts. Cancel anytime and take everything with you—no vendor lock-in."
        },
        {
          id: "timeline",
          question: "How long does a typical website project take?",
          answer: "Most projects take 4–8 weeks from kickoff to launch, depending on scope and how quickly we receive feedback. We'll set a clear timeline with milestones during onboarding."
        }
      ]
    },
    {
      id: "seo-content",
      title: "SEO, AIEO & Content",
      description: "Educates on modern search and counters AI-generated slop concerns.",
      questions: [
        {
          id: "seo-vs-aieo",
          question: "What's the difference between SEO and AIEO?",
          answer: "SEO optimizes your site to rank on Google. AIEO (Answer Engine Optimization) ensures your content is structured so AI tools like ChatGPT and Google's AI Overviews can find, cite, and recommend it. You need both in 2026."
        },
        {
          id: "ai-content",
          question: "Do you use AI to write content?",
          answer: "AI assists with research, outlines, and drafting speed—but every piece is reviewed, refined, and infused with human strategic thinking, empathy, and your unique brand voice. You'll never receive generic AI-generated slop."
        },
        {
          id: "seo-results",
          question: "How long does it take to see SEO results?",
          answer: "SEO is a long game. You'll typically see initial movement in 3–6 months, with meaningful, sustained growth over 6–12 months. I set realistic expectations and report transparently on progress."
        },
        {
          id: "ranking-guarantee",
          question: "Can you guarantee a #1 ranking on Google?",
          answer: "No. Anyone who guarantees that is lying to you. I focus on ethical, sustainable strategies that drive consistent, compounding results over time."
        }
      ]
    },
    {
      id: "process",
      title: "Process & Reporting",
      description: "Counters vanity metrics and the 'black box' agency experience.",
      questions: [
        {
          id: "reporting",
          question: "How do you report on results?",
          answer: "I report on metrics tied to your business goals—leads, conversions, sales, customer value—not just clicks and impressions. Reports are clear, jargon-free, and delivered on a schedule we agree on."
        },
        {
          id: "communication",
          question: "How often will we communicate?",
          answer: "That depends on your package. At minimum, you'll get monthly performance reports and a check-in. For higher-tier partnerships, we'll have bi-weekly or weekly strategy calls. And you can always reach me directly via email or chat."
        },
        {
          id: "post-launch",
          question: "What happens after my website launches?",
          answer: "All projects include 30 days of post-launch support. After that, you can choose to continue with an ongoing maintenance and optimization retainer, or we part ways amicably with you holding all the keys."
        }
      ]
    },
    {
      id: "privacy",
      title: "Privacy, Data & Ethics",
      description: "Directly addresses the privacy vs. personalization paradox from your research.",
      questions: [
        {
          id: "customer-data",
          question: "How do you handle customer data and privacy?",
          answer: "I take privacy seriously. All sites include compliant cookie consent, clear privacy policies, and I don't deploy intrusive tracking. Your customers' trust is non-negotiable."
        },
        {
          id: "share-data",
          question: "Do you share or sell client data?",
          answer: "Never. Your data, your customers' data, and your business information stay private. Period."
        },
        {
          id: "gdpr-ccpa",
          question: "Are you GDPR/CCPA compliant?",
          answer: "Yes. I build all sites with these regulations in mind and can advise on compliance for your specific region and industry."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/95 backdrop-blur supports-backdrop-filter:bg-black/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold font-rajdhani">Your Dedicated Marketer</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium hover:text-[var(--accent)] transition-colors">Home</Link>
              <Link href="/services" className="text-sm font-medium hover:text-[var(--accent)] transition-colors">Services</Link>
              <Link href="/work" className="text-sm font-medium hover:text-[var(--accent)] transition-colors">Portfolio</Link>
              <Link href="/about" className="text-sm font-medium hover:text-[var(--accent)] transition-colors">About</Link>
              <Link href="/faq" className="text-sm font-medium text-[var(--accent)]">FAQ</Link>
              <Link href="/blog" className="text-sm font-medium hover:text-[var(--accent)] transition-colors">Blog</Link>
              <Link href="/contact" className="text-sm font-medium hover:text-[var(--accent)] transition-colors">Contact</Link>
            </div>
            <Button className="bg-[var(--accent)] hover:bg-[var(--accent)]/90">Book Consultation</Button>
          </div>
        </div>
      </nav>

      {/* Section 1: Header */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-black via-[#1E1E1E] to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,128,255,0.1),transparent_50%)]" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 py-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-orbitron leading-tight">
            Honest Answers to Your Questions.
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto font-inter">
            No spin. No jargon. Just direct answers about how we work, what it costs, and what you can expect.
          </p>
        </div>
      </section>

      {/* Section 2: Question Categories */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category) => {
              const isCategoryOpen = openCategory === category.id
              return (
                <Card key={category.id} className="bg-[var(--surface-2)] border border-white/10 overflow-hidden">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:border-[var(--accent)] transition-colors"
                  >
                    <div>
                      <h2 className="text-xl font-bold font-rajdhani mb-1">{category.title}</h2>
                      <p className="text-sm text-gray-400 font-inter">{category.description}</p>
                    </div>
                    {isCategoryOpen ? (
                      <ChevronUp className="h-5 w-5 text-[var(--accent)] shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 shrink-0 ml-4" />
                    )}
                  </button>
                  
                  {isCategoryOpen && (
                    <div className="border-t border-white/10">
                      {category.questions.map((question) => {
                        const isQuestionOpen = openQuestion === question.id
                        return (
                          <div key={question.id} className="border-b border-white/10 last:border-b-0">
                            <button
                              onClick={() => toggleQuestion(question.id)}
                              className="w-full p-4 text-left flex items-start justify-between hover:bg-white/5 transition-colors"
                            >
                              <span className="font-medium font-rajdhani pr-4">{question.question}</span>
                              {isQuestionOpen ? (
                                <ChevronUp className="h-4 w-4 text-[var(--accent)] shrink-0" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                              )}
                            </button>
                            {isQuestionOpen && (
                              <div className="px-4 pb-4">
                                <p className="text-gray-400 font-inter leading-relaxed">{question.answer}</p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Didn't Find Your Answer? */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-black border-2 border-[var(--accent)] p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-orbitron">Still have a question? Let's talk.</h2>
            <p className="text-gray-400 mb-8 font-inter max-w-2xl mx-auto">
              If something wasn't covered here, I'm happy to answer directly. Use the chat, send an email, or book a free 15-minute Q&A call.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base px-8">
                Start Chat
                <MessageSquare className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white text-base px-8">
                  Book a Quick Call
                  <Calendar className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
