# Code Consolidation

Generated from: app and components directories

Total files: 22

---

## app/about/layout.tsx

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Your Dedicated Marketer",
  description: "Learn about Your Dedicated Marketer - our philosophy, commitments, and why we're different from traditional agencies.",
  keywords: ["about", "marketing philosophy", "dedicated marketer", "anti-agency"],
  openGraph: {
    title: "About - Your Dedicated Marketer",
    description: "Learn about our philosophy, commitments, and why we're different from traditional agencies.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

```

---

## app/about/page.tsx

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Zap, Link2, Search, Bot, User, Shield, FileCheck, CheckCircle2, MessageSquare, Calendar } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { AnimateOnScroll } from "@agency/ui"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Section 1: Header */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-black via-[#1E1E1E] to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,128,255,0.15),transparent_50%)]" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 py-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-orbitron leading-tight">
            Marketing Shouldn't Be This Hard.<br />
            <span className="text-[#0080FF]">We're Here to Change That.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto font-inter">
            The industry is full of agencies that overpromise, underdeliver, and hide behind vanity metrics. Your Dedicated Marketer was built to be the opposite: transparent, human-led, and relentlessly focused on what actually grows your business.
          </p>
        </div>
      </section>

      {/* Section 2: The Problem — Why We Exist */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">The Way Marketing Is Sold Is Broken.</h2>
          
          <Card className="bg-[#121212] border border-white/10 p-8 md:p-12 mb-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center">
                  <Link2 className="h-6 w-6 text-[#0080FF]" />
                </div>
                <h3 className="text-xl font-bold font-rajdhani">The "Average Trap"</h3>
                <p className="text-gray-400 font-inter">
                  AI has made it easy to churn out generic, synthetic-feeling content and templated websites. Many agencies now all sound, look, and perform exactly the same. Your brand deserves better than a copy-paste solution.
                </p>
              </div>

              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center">
                  <Search className="h-6 w-6 text-[#0080FF]" />
                </div>
                <h3 className="text-xl font-bold font-rajdhani">Vanity Metrics, Not Business Results</h3>
                <p className="text-gray-400 font-inter">
                  Clicks, impressions, and "engagement" don't pay the bills. Yet agencies often report these numbers while ignoring the metrics that matter most: leads, sales, and customer value. We report on what moves your bottom line.
                </p>
              </div>

              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-[#0080FF]" />
                </div>
                <h3 className="text-xl font-bold font-rajdhani">Fragmented Accountability</h3>
                <p className="text-gray-400 font-inter">
                  When your website, SEO, social, and ads are handled by different vendors, who takes responsibility when the strategy fails? Everyone points fingers. We're a single, dedicated partner who owns the entire outcome.
                </p>
              </div>
            </div>
          </Card>

          <p className="text-center text-lg text-gray-300 font-inter italic">
            Your business deserves a marketing partner who is as invested in your success as you are—not a vendor who disappears after the invoice is paid.
          </p>
        </div>
      </section>

      {/* Section 3: Our Philosophy — The Human-AI Symbiosis */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">Technology Is a Tool. Humans Are the Strategy.</h2>
          
          <div className="text-center mb-12">
            <p className="text-xl text-gray-300 max-w-4xl mx-auto font-inter">
              We believe the best marketing comes from a tight collaboration between human creativity, empathy, and strategic judgment—and the speed and analytical power of AI. We use AI as an accelerator, never as a replacement for the thinking, feeling, and nuanced decision-making that only a human can provide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-black border border-white/10 p-8">
              <h3 className="text-xl font-bold mb-6 font-rajdhani text-[#0080FF]">What AI Does Here</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-[#0080FF] shrink-0 mt-0.5" />
                  <span className="text-gray-300 font-inter">Data analysis</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-[#0080FF] shrink-0 mt-0.5" />
                  <span className="text-gray-300 font-inter">Research acceleration</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-[#0080FF] shrink-0 mt-0.5" />
                  <span className="text-gray-300 font-inter">Content drafting assistance</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-[#0080FF] shrink-0 mt-0.5" />
                  <span className="text-gray-300 font-inter">Performance pattern detection</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-black border border-white/10 p-8">
              <h3 className="text-xl font-bold mb-6 font-rajdhani text-[#0080FF]">What Humans Do Here</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-[#0080FF] shrink-0 mt-0.5" />
                  <span className="text-gray-300 font-inter">Brand strategy</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-[#0080FF] shrink-0 mt-0.5" />
                  <span className="text-gray-300 font-inter">Creative direction</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-[#0080FF] shrink-0 mt-0.5" />
                  <span className="text-gray-300 font-inter">Empathy-driven copy</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-[#0080FF] shrink-0 mt-0.5" />
                  <span className="text-gray-300 font-inter">Ethical judgment</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-[#0080FF] shrink-0 mt-0.5" />
                  <span className="text-gray-300 font-inter">Relationship building</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 4: Our Commitments — What You Can Expect */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <AnimateOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">This Is How We Work. No Exceptions.</h2>
          </AnimateOnScroll>
          
          <div className="grid md:grid-cols-2 gap-6">
            <AnimateOnScroll delay={0}>
              <Card className="bg-[#121212] border border-white/10 p-8 hover:border-[#0080FF] transition-colors">
                <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-[#0080FF]" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-rajdhani">Radical Transparency</h3>
                <p className="text-gray-400 font-inter">
                  You'll always know what we're doing, why we're doing it, and what it costs. Our reports are clear, jargon-free, and tied directly to your business goals. No smoke. No mirrors.
                </p>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll delay={100}>
              <Card className="bg-[#121212] border border-white/10 p-8 hover:border-[#0080FF] transition-colors">
                <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-6">
                  <FileCheck className="h-6 w-6 text-[#0080FF]" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-rajdhani">You Own Everything</h3>
                <p className="text-gray-400 font-inter">
                  Your website, your data, your brand assets—they belong to you, period. No proprietary lock-in, no hostage situations. Cancel anytime and take it all with you.
                </p>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <Card className="bg-[#121212] border border-white/10 p-8 hover:border-[#0080FF] transition-colors">
                <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-6">
                  <Search className="h-6 w-6 text-[#0080FF]" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-rajdhani">Metrics That Matter</h3>
                <p className="text-gray-400 font-inter">
                  We don't celebrate a spike in "likes" unless it correlates to leads or revenue. We define success metrics with you during onboarding and report against them relentlessly.
                </p>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll delay={300}>
              <Card className="bg-[#121212] border border-white/10 p-8 hover:border-[#0080FF] transition-colors">
                <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-6">
                  <User className="h-6 w-6 text-[#0080FF]" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-rajdhani">One Person, Full Accountability</h3>
                <p className="text-gray-400 font-inter">
                  You work directly with me—the founder and strategist. No junior account managers, no handoffs, no phone tag. When you have a question, I answer. When something breaks, I fix it.
                </p>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Section 5: Who Is Behind This? (Minimal Founder Note) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212]">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-black border border-white/10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="h-24 w-24 rounded-full bg-[#0080FF]/10 flex items-center justify-center shrink-0">
                <User className="h-12 w-12 text-[#0080FF]" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold font-orbitron">Hello. I'm [Your Name].</h2>
                <p className="text-gray-300 font-inter leading-relaxed">
                  I've spent my career leading marketing and strategy across three very different industries. That experience taught me one universal truth: businesses don't fail because they lack options—they fail because they lack a dedicated partner who can cut through the noise and execute. I started Your Dedicated Marketer to be that partner for businesses that are tired of the agency runaround. No fluff. No ego. Just good work that gets results.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 6: Who This Is For */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">We Work Best With Businesses That...</h2>
          
          <Card className="bg-[#121212] border border-white/10 p-8 md:p-12">
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-[#0080FF] shrink-0 mt-0.5" />
                <span className="text-gray-300 font-inter">Are tired of managing multiple freelancers and agencies.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-[#0080FF] shrink-0 mt-0.5" />
                <span className="text-gray-300 font-inter">Value transparency and direct communication over polished pitches.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-[#0080FF] shrink-0 mt-0.5" />
                <span className="text-gray-300 font-inter">Want a long-term marketing partner, not a one-off project vendor.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-[#0080FF] shrink-0 mt-0.5" />
                <span className="text-gray-300 font-inter">Understand that real growth takes strategy, not just tactics.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-[#0080FF] shrink-0 mt-0.5" />
                <span className="text-gray-300 font-inter">Are ready to invest in a website and marketing engine that actually performs.</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Section 7: Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-black to-[#0080FF]/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Let's Leave the Agency Nonsense Behind.</h2>
          <p className="text-xl text-gray-400 mb-8 font-inter">
            If you're looking for a marketing partner who takes full accountability, tells you the truth, and obsesses over your growth—let's talk. Free 30-minute strategy call, no pressure, no pitch deck.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-[#0080FF] hover:bg-[#0080FF]/90 text-base px-8 mb-4">
              Book Your Free Strategy Call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="text-gray-400 text-sm font-inter">
            Prefer to write? Send me a message directly—I read every one.
          </p>
        </div>
      </section>
    </div>
  )
}

```

---

## app/blog/layout.tsx

```tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Your Dedicated Marketer",
  description: "Actionable insights and practical advice for growing your business without industry jargon.",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

```

---

## app/blog/page.tsx

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Zap, Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Why AI Alone Won't Build Your Brand (And What Actually Works)",
      excerpt: "Learn why human creativity and strategic thinking are essential for building a brand that resonates.",
      category: "Web Design",
      date: "Coming Soon",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Stop Counting Clicks: The Metrics That Actually Matter for Small Business Websites",
      excerpt: "Discover the revenue-focused metrics that drive real business growth, not vanity numbers.",
      category: "SEO/AIEO",
      date: "Coming Soon",
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "The Privacy-First Web: How to Grow Without Being Creepy",
      excerpt: "Build trust and grow your business with privacy-first marketing strategies that respect your customers.",
      category: "Analytics",
      date: "Coming Soon",
      readTime: "7 min read"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/95 backdrop-blur supports-backdrop-filter:bg-black/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-[#0080FF] flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold font-rajdhani">Your Dedicated Marketer</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Home</Link>
              <Link href="/services" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Services</Link>
              <Link href="/work" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Portfolio</Link>
              <Link href="/about" className="text-sm font-medium hover:text-[#0080FF] transition-colors">About</Link>
              <Link href="/blog" className="text-sm font-medium text-[#0080FF]">Blog</Link>
              <Link href="/faq" className="text-sm font-medium hover:text-[#0080FF] transition-colors">FAQ</Link>
              <Link href="/contact" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Contact</Link>
            </div>
            <Button className="bg-[#0080FF] hover:bg-[#0080FF]/90">Book Consultation</Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-black via-[#1E1E1E] to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,128,255,0.1),transparent_50%)]" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 py-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-orbitron leading-tight">
            Actionable Insights, Not Industry Jargon.
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto font-inter">
            Practical advice for growing your business without the fluff.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="bg-[#121212] border border-white/10 p-6 hover:border-[#0080FF] transition-colors">
                <div className="text-[#0080FF] text-xs font-medium mb-2">{post.category}</div>
                <h3 className="text-lg font-bold mb-2 font-rajdhani">{post.title}</h3>
                <p className="text-gray-400 text-sm mb-4 font-inter">{post.excerpt}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-[#0080FF] text-[#0080FF] hover:bg-[#0080FF] hover:text-white text-sm">
                  Read More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Want More Insights Like This?</h2>
          <p className="text-xl text-gray-400 mb-8 font-inter">
            Subscribe to get practical marketing tips delivered to your inbox. No spam, ever.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-[#0080FF] hover:bg-[#0080FF]/90 text-base px-8">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

```

---

## app/contact/layout.tsx

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Your Dedicated Marketer",
  description: "Get in touch for a free consultation. You'll reach me directly—no forms that vanish into a ticket queue.",
  keywords: ["contact", "get in touch", "consultation", "dedicated marketer"],
  openGraph: {
    title: "Contact - Your Dedicated Marketer",
    description: "Get in touch for a free consultation. You'll reach me directly.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

```

---

## app/contact/page.tsx

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Zap, MessageSquare, Calendar, Mail, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "Is there any cost for the initial call?",
      answer: "Absolutely not. It's a free, no-obligation conversation to see if we're a good fit."
    },
    {
      question: "Will I be working with you or a junior team member?",
      answer: "You'll work directly with me, the founder. I handle strategy and execution personally."
    },
    {
      question: "Do you take on every project?",
      answer: "No. I'm selective about who I work with to ensure I can give each client the attention they deserve. The first call helps us both decide if it's the right match."
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/95 backdrop-blur supports-backdrop-filter:bg-black/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-[#0080FF] flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold font-rajdhani">Your Dedicated Marketer</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Home</Link>
              <Link href="/services" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Services</Link>
              <Link href="/work" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Portfolio</Link>
              <Link href="/about" className="text-sm font-medium hover:text-[#0080FF] transition-colors">About</Link>
              <Link href="/blog" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Blog</Link>
              <Link href="/contact" className="text-sm font-medium text-[#0080FF]">Contact</Link>
            </div>
            <Button className="bg-[#0080FF] hover:bg-[#0080FF]/90">Book Consultation</Button>
          </div>
        </div>
      </nav>

      {/* Section 1: Header */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-black via-[#1E1E1E] to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,128,255,0.1),transparent_50%)]" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 py-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-orbitron leading-tight">
            Let's Talk About Your Business.
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto font-inter">
            You'll reach me directly—no forms that vanish into a ticket queue, no "somebody will get back to you." Just a real conversation about how we can grow your business.
          </p>
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-[#0080FF]/10 flex items-center justify-center animate-pulse">
              <MessageSquare className="h-6 w-6 text-[#0080FF]" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Contact Form */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-2xl">
          <Card className="bg-[#121212] border-l-4 border-l-[#0080FF] border-y border-r border-white/10 p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-8 font-orbitron">Send Me a Message</h2>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-black border border-white/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#0080FF] focus:ring-1 focus:ring-[#0080FF] transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">Work Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 bg-black border border-white/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#0080FF] focus:ring-1 focus:ring-[#0080FF] transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-gray-300">Company / Website <span className="text-gray-500">(optional)</span></label>
                <input
                  id="company"
                  type="text"
                  placeholder="yourcompany.com"
                  className="w-full px-4 py-3 bg-black border border-white/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#0080FF] focus:ring-1 focus:ring-[#0080FF] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="interest" className="text-sm font-medium text-gray-300">What Are You Interested In? <span className="text-gray-500">(optional)</span></label>
                <select
                  id="interest"
                  className="w-full px-4 py-3 bg-black border border-white/20 rounded-md text-white focus:outline-none focus:border-[#0080FF] focus:ring-1 focus:ring-[#0080FF] transition-colors"
                >
                  <option value="">Select a topic...</option>
                  <option value="web-design">Web Design / Redesign</option>
                  <option value="seo">SEO & AIEO</option>
                  <option value="brand">Brand Identity & Kit</option>
                  <option value="blog">Blog & Content Management</option>
                  <option value="social">Social Media Management</option>
                  <option value="email">Newsletter & Email Marketing</option>
                  <option value="crm">CRM & Automation</option>
                  <option value="ppc">Paid Media (PPC)</option>
                  <option value="analytics">Analytics & CRO</option>
                  <option value="reputation">Reputation Management</option>
                  <option value="partnership">Full Partnership Package</option>
                  <option value="other">Something Else / Not Sure Yet</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">Tell Me About Your Project or Goals</label>
                <textarea
                  id="message"
                  placeholder="What are you trying to achieve? What challenges are you facing?"
                  rows={5}
                  className="w-full px-4 py-3 bg-black border border-white/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#0080FF] focus:ring-1 focus:ring-[#0080FF] transition-colors resize-none"
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-[#0080FF] hover:bg-[#0080FF]/90 text-base">
                Send Message
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <p className="text-sm text-gray-400 font-inter">
                I read every message personally. No auto-responders, no canned replies. You'll hear back from me, usually within 24 hours on business days.
              </p>
              <p className="text-xs text-gray-500 font-inter">
                Your information is never shared, sold, or used for spam. I hate that too. <Link href="/privacy" className="text-[#0080FF] hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 3: Alternative Ways to Reach Me */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">Prefer Another Way? You've Got Options.</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-black border border-white/10 p-8 hover:border-[#0080FF] transition-colors">
              <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6 text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-4 font-rajdhani">Book a Call Directly</h3>
              <p className="text-gray-400 mb-6 font-inter">
                Skip the back-and-forth. Grab a time that works for you on my calendar. Free 30-minute strategy call, no pressure.
              </p>
              <Link href="/contact">
                <Button variant="outline" className="w-full border-[#0080FF] text-[#0080FF] hover:bg-[#0080FF] hover:text-white">
                  Book Your Free Call
                </Button>
              </Link>
            </Card>

            <Card className="bg-black border border-white/10 p-8 hover:border-[#0080FF] transition-colors">
              <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-6">
                <Mail className="h-6 w-6 text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-4 font-rajdhani">Write Me Directly</h3>
              <p className="text-gray-400 mb-6 font-inter">
                If you prefer to email, reach me at <a href="mailto:hello@yourdedicatedmarketer.com" className="text-[#0080FF] hover:underline">hello@yourdedicatedmarketer.com</a>. It comes straight to my inbox—not a shared team mailbox.
              </p>
            </Card>

            <Card className="bg-black border border-white/10 p-8 hover:border-[#0080FF] transition-colors">
              <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-6">
                <MessageSquare className="h-6 w-6 text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-4 font-rajdhani">Real-Time Chat</h3>
              <p className="text-gray-400 mb-6 font-inter">
                Look for the chat icon in the bottom corner. If I'm available, I'll answer live. If not, leave a message and I'll get back to you quickly.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 4: What Happens Next? */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">What Happens After You Reach Out.</h2>
          
          <Card className="bg-[#121212] border border-white/10 p-8 md:p-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-[#0080FF] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-rajdhani">You send a message or book a call.</h3>
                  <p className="text-gray-400 font-inter">No gatekeepers, no forms disappearing into the void.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-[#0080FF] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-rajdhani">I review and reply within 24 hours (often faster).</h3>
                  <p className="text-gray-400 font-inter">If you booked a call, you'll get a confirmation with details.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-[#0080FF] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-rajdhani">We talk — openly, honestly, no pitch decks.</h3>
                  <p className="text-gray-400 font-inter">We discuss your business, your challenges, and whether we're a good fit. If we are, great. If not, I'll tell you honestly and point you in the right direction.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-[#0080FF] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-rajdhani">You get a clear, transparent proposal if we move forward.</h3>
                  <p className="text-gray-400 font-inter">No hidden fees, no surprise charges. Everything scoped and agreed upon before any work begins.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 5: FAQ Snippet */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212]">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">Common Questions</h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <Card key={index} className="bg-black border border-white/10">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between"
                  >
                    <span className="font-semibold font-rajdhani">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-[#0080FF]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-400 font-inter">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 6: Final CTA (Emergency Option) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-black to-[#0080FF]/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Need Something Urgent? Use the Chat.</h2>
          <p className="text-xl text-gray-400 mb-8 font-inter">
            If you're up against a deadline or have a quick question, the live chat is your fastest path. I'll answer if I'm at my desk.
          </p>
          <Button size="lg" className="bg-[#0080FF] hover:bg-[#0080FF]/90 text-base px-8">
            Start Chat
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}

```

---

## app/faq/layout.tsx

```tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ - Your Dedicated Marketer",
  description: "Honest answers to your questions about web design, SEO, pricing, and working with a dedicated marketing partner. No spin, no jargon.",
}

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

```

---

## app/faq/page.tsx

```tsx
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
              <div className="h-8 w-8 rounded-lg bg-[#0080FF] flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold font-rajdhani">Your Dedicated Marketer</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Home</Link>
              <Link href="/services" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Services</Link>
              <Link href="/work" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Portfolio</Link>
              <Link href="/about" className="text-sm font-medium hover:text-[#0080FF] transition-colors">About</Link>
              <Link href="/faq" className="text-sm font-medium text-[#0080FF]">FAQ</Link>
              <Link href="/blog" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Blog</Link>
              <Link href="/contact" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Contact</Link>
            </div>
            <Button className="bg-[#0080FF] hover:bg-[#0080FF]/90">Book Consultation</Button>
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
                <Card key={category.id} className="bg-[#121212] border border-white/10 overflow-hidden">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:border-[#0080FF] transition-colors"
                  >
                    <div>
                      <h2 className="text-xl font-bold font-rajdhani mb-1">{category.title}</h2>
                      <p className="text-sm text-gray-400 font-inter">{category.description}</p>
                    </div>
                    {isCategoryOpen ? (
                      <ChevronUp className="h-5 w-5 text-[#0080FF] shrink-0 ml-4" />
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
                                <ChevronUp className="h-4 w-4 text-[#0080FF] shrink-0" />
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
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212]">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-black border-2 border-[#0080FF] p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-orbitron">Still have a question? Let's talk.</h2>
            <p className="text-gray-400 mb-8 font-inter max-w-2xl mx-auto">
              If something wasn't covered here, I'm happy to answer directly. Use the chat, send an email, or book a free 15-minute Q&A call.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#0080FF] hover:bg-[#0080FF]/90 text-base px-8">
                Start Chat
                <MessageSquare className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-[#0080FF] text-[#0080FF] hover:bg-[#0080FF] hover:text-white text-base px-8">
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

```

---

## app/globals.css

```css
@import "tailwindcss";

:root {
  /* Dark theme color palette - Your Dedicated Marketer */
  --background: 0 0% 0%;
  --foreground: 0 0% 100%;
  --card: 220 20% 7%;
  --card-foreground: 0 0% 100%;
  --popover: 220 20% 7%;
  --popover-foreground: 0 0% 100%;
  /* Electric blue primary - #0080FF */
  --primary: 210 100% 50%;
  --primary-foreground: 0 0% 100%;
  --secondary: 220 20% 12%;
  --secondary-foreground: 0 0% 100%;
  --muted: 220 20% 12%;
  --muted-foreground: 0 0% 69%;
  --accent: 210 100% 50%;
  --accent-foreground: 0 0% 100%;
  --destructive: 0 70% 50%;
  --destructive-foreground: 0 0% 100%;
  --border: 220 20% 18%;
  --input: 220 20% 18%;
  --ring: 210 100% 50%;
  --radius: 0.5rem;
}

/* High contrast mode for accessibility */
@media (prefers-contrast: high) {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 0%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 0%;
    --primary: 25 80% 35%;
    --primary-foreground: 0 0% 100%;
    --muted-foreground: 0 0% 30%;
    --border: 0 0% 0%;
  }
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

* {
  border-color: hsl(var(--border));
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

/* Glassmorphism utilities */
@utility glass-card {
  background: rgba(18, 18, 18, 0.65);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

@utility glass-nav {
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(20px) saturate(200%);
  -webkit-backdrop-filter: blur(20px) saturate(200%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

@utility glass-card-interactive {
  background: rgba(18, 18, 18, 0.65);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  transition: border-color 300ms ease, box-shadow 300ms ease, transform 200ms ease;
}

.glass-card-interactive:hover {
  border-color: rgba(0, 128, 255, 0.35);
  box-shadow: 0 12px 40px rgba(0, 128, 255, 0.12);
  transform: translateY(-2px);
}

/* Kinetic typography for hero headline */
@keyframes text-reveal {
  from {
    clip-path: inset(0 100% 0 0);
    transform: translateY(2px);
    opacity: 0;
  }
  to {
    clip-path: inset(0 0 0 0);
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-text-reveal {
  animation: text-reveal 800ms ease-out forwards;
}

/* Broken-grid portfolio layout */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: 280px;
  gap: 1.5rem;
}

.portfolio-item-featured {
  grid-column: span 3;
  grid-row: span 2;
}

.portfolio-item:nth-child(2) {
  grid-column: 4 / 7;
  grid-row: 1;
}

.portfolio-item:nth-child(3) {
  grid-column: 6 / 9;
  grid-row: 1 / 3;
}

.portfolio-item:nth-child(4) {
  grid-column: 1 / 4;
  grid-row: 3;
}

.portfolio-item:nth-child(5) {
  grid-column: 4 / 7;
  grid-row: 2;
}

.portfolio-item:nth-child(6) {
  grid-column: 1 / 3;
  grid-row: 4;
}

@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
  
  .portfolio-item-featured,
  .portfolio-item:nth-child(2),
  .portfolio-item:nth-child(3),
  .portfolio-item:nth-child(4),
  .portfolio-item:nth-child(5),
  .portfolio-item:nth-child(6) {
    grid-column: span 1;
    grid-row: span 1;
  }
}

```

---

## app/layout.tsx

```tsx
import type { Metadata } from "next";
import { Rajdhani, Orbitron, Inter } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Dedicated Marketer - Web Design That Builds Your Business",
  description: "Custom websites, transparent SEO, and analytics tied to your revenue. No generic AI fluff, no vanity metrics, no creepy tracking. Just a dedicated marketer in your corner.",
  keywords: ["web design", "SEO", "analytics", "digital marketing", "revenue-focused marketing", "small business marketing"],
  authors: [{ name: "Your Dedicated Marketer" }],
  openGraph: {
    title: "Your Dedicated Marketer - Web Design That Builds Your Business",
    description: "Custom websites, transparent SEO, and analytics tied to your revenue. No generic AI fluff, no vanity metrics, no creepy tracking.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Dedicated Marketer - Web Design That Builds Your Business",
    description: "Custom websites, transparent SEO, and analytics tied to your revenue. No generic AI fluff, no vanity metrics, no creepy tracking.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${orbitron.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

```

---

## app/page.tsx

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Globe, BarChart3, Palette, Megaphone, Mail, Layout, TrendingUp, Shield, Sparkles, Target, Zap, Users, Database, MessageSquare, Search, CheckCircle2, FileText, Calendar, PenTool, Share2, Monitor, CreditCard, Smartphone, Link } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { HeroText } from "@/components/hero-text"
import { HeroSceneWrapper } from "@/components/hero-scene-wrapper"
import { MarketingPartnerStrip } from "@/components/marketing-partner-strip"
import { AnimateOnScroll } from "@agency/ui"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Your Dedicated Marketer - Web Design That Builds Your Business",
  description: "Custom websites, transparent SEO, and analytics tied to your revenue. No generic AI fluff, no vanity metrics, no creepy tracking. Just a dedicated marketer in your corner.",
  keywords: ["web design", "SEO", "analytics", "digital marketing", "revenue-focused marketing", "small business marketing"],
  authors: [{ name: "Your Dedicated Marketer" }],
  openGraph: {
    title: "Your Dedicated Marketer - Web Design That Builds Your Business",
    description: "Custom websites, transparent SEO, and analytics tied to your revenue. No generic AI fluff, no vanity metrics, no creepy tracking.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Dedicated Marketer - Web Design That Builds Your Business",
    description: "Custom websites, transparent SEO, and analytics tied to your revenue. No generic AI fluff, no vanity metrics, no creepy tracking.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Your Dedicated Marketer",
  "description": "Custom websites, transparent SEO, and analytics tied to your revenue. No generic AI fluff, no vanity metrics, no creepy tracking.",
  "url": "https://yourdedicatedmarketer.com",
  "serviceType": ["Web Design", "SEO", "Digital Marketing", "Analytics"],
  "priceRange": "$$",
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Section 1: Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <HeroSceneWrapper />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,128,255,0.1),transparent_50%)]" />
        
        <HeroText />

        {/* Live Chat Widget Placeholder */}
        <div className="fixed bottom-4 right-4 z-50">
          <Button className="bg-[#121212] border border-[#0080FF] hover:bg-[#1E1E1E] text-sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Ask me anything – I'm a real human, not a bot farm.
          </Button>
        </div>
      </section>

      {/* Section 2: What We Do – Core Service Blocks */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <AnimateOnScroll delay={0}>
              <Card className="bg-[#121212] border border-white/10 hover:border-[#0080FF] transition-colors p-8">
                <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-6">
                  <Layout className="h-6 w-6 text-[#0080FF]" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-rajdhani">Website as Your Growth Engine</h3>
                <p className="text-gray-400 mb-6 font-inter">
                  Custom, conversion-focused web design that becomes the central hub of your marketing. Built to perform, built to scale.
                </p>
                <a href="/services" className="text-[#0080FF] hover:text-[#0080FF]/80 text-sm font-medium">
                  Learn More <ArrowRight className="inline ml-1 h-4 w-4" />
                </a>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll delay={100}>
              <Card className="bg-[#121212] border border-white/10 hover:border-[#0080FF] transition-colors p-8">
                <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-6">
                  <Megaphone className="h-6 w-6 text-[#0080FF]" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-rajdhani">Digital Marketing Ecosystem</h3>
                <p className="text-gray-400 mb-6 font-inter">
                  SEO, content, social media, email, and paid ads — all managed cohesively around your website, not in fragmented silos.
                </p>
                <a href="/services" className="text-[#0080FF] hover:text-[#0080FF]/80 text-sm font-medium">
                  Learn More <ArrowRight className="inline ml-1 h-4 w-4" />
                </a>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <Card className="bg-[#121212] border border-white/10 hover:border-[#0080FF] transition-colors p-8">
                <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-6">
                  <BarChart3 className="h-6 w-6 text-[#0080FF]" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-rajdhani">Analytics & Automation</h3>
                <p className="text-gray-400 mb-6 font-inter">
                  CRM setup, marketing automation, and revenue-focused analytics that turn data into decisions — no vanity metrics, just growth.
                </p>
                <a href="/services" className="text-[#0080FF] hover:text-[#0080FF]/80 text-sm font-medium">
                  Learn More <ArrowRight className="inline ml-1 h-4 w-4" />
                </a>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Section 3: Proof of Concept – Featured Demo Sites */}
      <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <AnimateOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Real Work, Real Results.</h2>
            <p className="text-gray-400 mb-12 font-inter">Concept/demo projects labeled transparently</p>
          </AnimateOnScroll>
          
          <div className="grid md:grid-cols-3 gap-8">
            <AnimateOnScroll delay={0}>
              <Card className="bg-[#121212] border border-white/10 p-6">
                <div className="h-48 bg-[#1E1E1E] rounded-lg mb-4 flex items-center justify-center">
                  <Monitor className="h-12 w-12 text-gray-600" />
                </div>
                <div className="text-[#0080FF] text-sm font-medium mb-2">Law Firm</div>
                <div className="text-2xl font-bold mb-2 font-rajdhani">+142% Mobile Conversion</div>
                <p className="text-gray-400 text-sm mb-4 font-inter">
                  Complete booking and scheduling platform with real-time availability management.
                </p>
                <Button variant="outline" className="w-full border-[#0080FF] text-[#0080FF] hover:bg-[#0080FF] hover:text-white">
                  View Case Study
                </Button>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll delay={100}>
              <Card className="bg-[#121212] border border-white/10 p-6">
                <div className="h-48 bg-[#1E1E1E] rounded-lg mb-4 flex items-center justify-center">
                  <Monitor className="h-12 w-12 text-gray-600" />
                </div>
                <div className="text-[#0080FF] text-sm font-medium mb-2">Hair Salon</div>
                <div className="text-2xl font-bold mb-2 font-rajdhani">2.5M Appointments Booked</div>
                <p className="text-gray-400 text-sm mb-4 font-inter">
                  Stylist scheduling and appointment booking system with service catalog and client management.
                </p>
                <Button variant="outline" className="w-full border-[#0080FF] text-[#0080FF] hover:bg-[#0080FF] hover:text-white">
                  View Case Study
                </Button>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <Card className="bg-[#121212] border border-white/10 p-6">
                <div className="h-48 bg-[#1E1E1E] rounded-lg mb-4 flex items-center justify-center">
                  <Monitor className="h-12 w-12 text-gray-600" />
                </div>
                <div className="text-[#0080FF] text-sm font-medium mb-2">Tax Firm</div>
                <div className="text-2xl font-bold mb-2 font-rajdhani">98% Client Retention</div>
                <p className="text-gray-400 text-sm mb-4 font-inter">
                  Client management and document tracking system for tax preparation firms with secure workflows.
                </p>
                <Button variant="outline" className="w-full border-[#0080FF] text-[#0080FF] hover:bg-[#0080FF] hover:text-white">
                  View Case Study
                </Button>
              </Card>
            </AnimateOnScroll>
          </div>

          <div className="text-center mt-8">
            <a href="/work" className="text-[#0080FF] hover:text-[#0080FF]/80 text-sm font-medium">
              View Full Portfolio <ArrowRight className="inline ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Section 4: How It Works – Your Transparent Process */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-4xl">
          <AnimateOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">A Partnership Built on Clarity, Not Confusion.</h2>
            <p className="text-gray-400 mb-12 font-inter">Our transparent process from start to finish</p>
          </AnimateOnScroll>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#0080FF]" />
            
            <div className="space-y-12">
              <AnimateOnScroll delay={0}>
                <div className="relative flex items-start md:items-center">
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 h-4 w-4 rounded-full bg-[#0080FF] border-4 border-black" />
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                    <div className="bg-[#121212] border border-white/10 p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-2 font-rajdhani">Discovery & Data Audit</h3>
                      <p className="text-gray-400 font-inter">
                        We define your goals, audit your data, and agree on revenue-tied success metrics before a single pixel is designed.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={100}>
                <div className="relative flex items-start md:items-center">
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 h-4 w-4 rounded-full bg-[#0080FF] border-4 border-black" />
                  <div className="ml-16 md:ml-auto md:w-1/2 md:pl-12">
                    <div className="bg-[#121212] border border-white/10 p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-2 font-rajdhani">Design & Build</h3>
                      <p className="text-gray-400 font-inter">
                        You get a custom, mobile-first website that respects privacy and amplifies your brand. AI assists, but human judgment leads.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={200}>
                <div className="relative flex items-start md:items-center">
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 h-4 w-4 rounded-full bg-[#0080FF] border-4 border-black" />
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                    <div className="bg-[#121212] border border-white/10 p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-2 font-rajdhani">Launch, Learn & Optimize</h3>
                      <p className="text-gray-400 font-inter">
                        Post-launch, we track real business outcomes, not vanity metrics. Transparent monthly reports show exactly how your site contributes to growth.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4.5: "Beyond the Build" – Full Marketing Partner Strip */}
      <MarketingPartnerStrip />

      {/* Section 5: Insights for Growth – Blog Previews */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <AnimateOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Actionable Insights, Not Industry Jargon.</h2>
            <p className="text-gray-400 mb-12 font-inter">Practical advice for growing your business</p>
          </AnimateOnScroll>
          
          <div className="grid md:grid-cols-3 gap-8">
            <AnimateOnScroll delay={0}>
              <Card className="bg-[#121212] border border-white/10 p-6">
                <div className="text-[#0080FF] text-xs font-medium mb-2">Web Design</div>
                <h3 className="text-lg font-bold mb-2 font-rajdhani">Why AI Alone Won't Build Your Brand (And What Actually Works)</h3>
                <p className="text-gray-400 text-sm mb-4 font-inter">
                  Learn why human creativity and strategic thinking are essential for building a brand that resonates.
                </p>
                <a href="/blog" className="text-[#0080FF] hover:text-[#0080FF]/80 text-sm font-medium">
                  Read More <ArrowRight className="inline ml-1 h-4 w-4" />
                </a>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll delay={100}>
              <Card className="bg-[#121212] border border-white/10 p-6">
                <div className="text-[#0080FF] text-xs font-medium mb-2">SEO/AIEO</div>
                <h3 className="text-lg font-bold mb-2 font-rajdhani">Stop Counting Clicks: The Metrics That Actually Matter for Small Business Websites</h3>
                <p className="text-gray-400 text-sm mb-4 font-inter">
                  Discover the revenue-focused metrics that drive real business growth, not vanity numbers.
                </p>
                <a href="/blog" className="text-[#0080FF] hover:text-[#0080FF]/80 text-sm font-medium">
                  Read More <ArrowRight className="inline ml-1 h-4 w-4" />
                </a>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <Card className="bg-[#121212] border border-white/10 p-6">
                <div className="text-[#0080FF] text-xs font-medium mb-2">Analytics</div>
                <h3 className="text-lg font-bold mb-2 font-rajdhani">The Privacy-First Web: How to Grow Without Being Creepy</h3>
                <p className="text-gray-400 text-sm mb-4 font-inter">
                  Build trust and grow your business with privacy-first marketing strategies that respect your customers.
                </p>
                <a href="/blog" className="text-[#0080FF] hover:text-[#0080FF]/80 text-sm font-medium">
                  Read More <ArrowRight className="inline ml-1 h-4 w-4" />
                </a>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Section 6: The Anti-Agency Pledge (Trust Statement) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-4xl">
          <AnimateOnScroll>
            <Card className="bg-[#121212] border-l-4 border-l-[#0080FF] border-y border-r border-white/10 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-orbitron">We're Not Your Typical Marketing Firm. And We're Proud of It.</h2>
              <p className="text-gray-300 font-inter leading-relaxed">
                The marketing industry is full of overpriced, opaque agencies that deliver templated work, vanity metrics, and intrusive tracking. Your Dedicated Marketer was built to be the opposite: transparent, client-centric, and relentlessly focused on what actually grows your business. We're new, which means you get obsessive attention and a partner who's as invested in your success as you are. Don't believe us? Check out our demo case studies and see the quality for yourself.
              </p>
            </Card>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Section 7: Final CTA – Conversion Zone */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-[#0080FF]/20">
        <div className="container mx-auto max-w-4xl text-center">
          <AnimateOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Ready to Build a Website That Actually Works for Your Business?</h2>
            <p className="text-xl text-gray-400 mb-8 font-inter">
              No flashy promises. No bloated retainers. Just a dedicated marketer who knows how to drive results. Book a free 30-minute consultation.
            </p>
            <Button size="lg" className="bg-[#0080FF] hover:bg-[#0080FF]/90 text-base px-8 mb-4">
              Book Your Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-gray-400 text-sm font-inter">
              Or chat with us now – I answer personally.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-[#0080FF] flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold font-rajdhani">Your Dedicated Marketer</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 font-rajdhani">Navigation</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/services" className="hover:text-[#0080FF]">Services</a></li>
                <li><a href="/work" className="hover:text-[#0080FF]">Portfolio</a></li>
                <li><a href="/about" className="hover:text-[#0080FF]">About</a></li>
                <li><a href="/blog" className="hover:text-[#0080FF]">Blog</a></li>
                <li><a href="/contact" className="hover:text-[#0080FF]">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 font-rajdhani">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/privacy" className="hover:text-[#0080FF]">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-[#0080FF]">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 font-rajdhani">Connect</h3>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-400 hover:text-[#0080FF]">
                <Link className="h-5 w-5" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            <p className="font-inter">© 2026 Your Dedicated Marketer. Human-led, tech-forward, client-obsessed.</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  )
}

```

---

## app/services/layout.tsx

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - Your Dedicated Marketer",
  description: "Complete marketing operating system built around your website. Custom web design, SEO, content, social media, email, and analytics—all transparent, no lock-in.",
  keywords: ["web design services", "SEO services", "digital marketing", "content marketing", "brand identity", "CRM management"],
  openGraph: {
    title: "Services - Your Dedicated Marketer",
    description: "Complete marketing operating system built around your website. Custom web design, SEO, content, social media, email, and analytics.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

```

---

## app/services/page.tsx

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Layout, Zap, Shield, CheckCircle2, Palette, FileText, Mail, Share2, Users, CreditCard, Search, TrendingUp, MessageSquare, Globe, BarChart3, Megaphone, Sparkles, ChevronDown, ChevronUp, User, Lock, Bot, FileCheck } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { AnimateOnScroll } from "@agency/ui"
import * as Accordion from "@radix-ui/react-accordion"

export default function ServicesPage() {

  const faqs = [
    {
      question: "Do I have to sign a long-term contract?",
      answer: "No. While our partnership packages are designed for ongoing success, we offer flexible month-to-month agreements. Cancel anytime, and you keep everything we've built."
    },
    {
      question: "What if I only need a website right now?",
      answer: "Absolutely. The core web design project is standalone. You can always add other services later as your business grows."
    },
    {
      question: "How do you use AI in your work?",
      answer: "We use AI for research, data analysis, and to accelerate repetitive tasks—but every deliverable is reviewed, refined, and infused with human creativity and strategic thinking. You'll never receive generic AI-generated slop."
    },
    {
      question: "Who exactly will I be working with?",
      answer: "Me—[your name], the founder. You get direct access to a senior marketing strategist, not a junior account manager."
    },
    {
      question: "How do you measure success?",
      answer: "We define clear, revenue-tied KPIs during our discovery phase. Reports always connect activity to business outcomes, not just vanity metrics."
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Section 1: Header & Philosophy */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[#1E1E1E] to-black">
        <div className="container mx-auto max-w-4xl text-center">
          <AnimateOnScroll>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-orbitron leading-tight">
              A Complete Marketing Operating System,<br />
              <span className="text-[#0080FF]">Built Around Your Website.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 font-inter max-w-3xl mx-auto">
              Your website is the hub. Everything else—SEO, content, social, email, ads, CRM—connects back to it. We build, launch, and orchestrate it all so you don't have to juggle five different vendors.
            </p>
            <Button size="lg" className="bg-[#0080FF] hover:bg-[#0080FF]/90 text-base px-8">
              Book a Free Strategy Call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Section 2: The Core — Website Design & Development */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">The Core: Custom Web Design That Drives Growth</h2>
          <p className="text-gray-400 mb-12 font-inter max-w-3xl">
            A conversion-focused, mobile-first, and fully owned website is not a cost—it's an asset that compounds over time. We design and build sites that reflect your brand, respect your customers' privacy, and turn visitors into leads and buyers.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-[#121212] border border-white/10 p-6">
              <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-4">
                <Layout className="h-6 w-6 text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-rajdhani">Custom, Not Template-Driven</h3>
              <p className="text-gray-400 font-inter">Every site is built from strategy, not copied from a theme marketplace.</p>
            </Card>

            <Card className="bg-[#121212] border border-white/10 p-6">
              <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-rajdhani">Performance-First</h3>
              <p className="text-gray-400 font-inter">Core Web Vitals optimized, sub-2.5s load times, responsive on every device.</p>
            </Card>

            <Card className="bg-[#121212] border border-white/10 p-6">
              <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-rajdhani">Human-Led, AI-Enhanced</h3>
              <p className="text-gray-400 font-inter">We use AI to accelerate, but human judgment and empathy drive every decision.</p>
            </Card>

            <Card className="bg-[#121212] border border-white/10 p-6">
              <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-rajdhani">You Own Everything</h3>
              <p className="text-gray-400 font-inter">No vendor lock-in, no proprietary black boxes. Your site, your data, 100% yours.</p>
            </Card>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 font-rajdhani">Our Process</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-[#0080FF] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Strategy & Discovery</h4>
                  <p className="text-sm text-gray-400">Goals, audit, metrics</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-[#0080FF] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Wireframes & Design</h4>
                  <p className="text-sm text-gray-400">Visual concepts, UX</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-[#0080FF] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Development & Launch</h4>
                  <p className="text-sm text-gray-400">Build, test, deploy</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-[#0080FF] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Post-Launch Optimization</h4>
                  <p className="text-sm text-gray-400">Monitor, refine, grow</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-[#121212] border border-white/10 p-6 mb-8">
            <h3 className="text-xl font-bold mb-4 font-rajdhani">Deliverables</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-[#0080FF]" />
                <span className="text-gray-300">Fully responsive, pixel-perfect website</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-[#0080FF]" />
                <span className="text-gray-300">Brand identity & style guide (if included)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-[#0080FF]" />
                <span className="text-gray-300">On-page SEO setup (meta, schema, speed)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-[#0080FF]" />
                <span className="text-gray-300">CMS integration for easy content updates</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-[#0080FF]" />
                <span className="text-gray-300">Privacy-compliant cookie consent and analytics setup</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-[#0080FF]" />
                <span className="text-gray-300">30 days of post-launch support</span>
              </li>
            </ul>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/work">
              <Button variant="outline" className="border-[#0080FF] text-[#0080FF] hover:bg-[#0080FF] hover:text-white">
                See Our Work <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-[#0080FF] hover:bg-[#0080FF]/90">
                Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Tiered Partnership Packages */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212]">
        <div className="container mx-auto max-w-6xl">
          <AnimateOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Full-Service Partnership Packages</h2>
            <p className="text-gray-400 mb-12 font-inter max-w-3xl">
              For businesses that want a dedicated marketing team without the overhead. One partner, one invoice, no finger-pointing.
            </p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimateOnScroll delay={0}>
              <Card className="bg-black border border-white/10 p-8 hover:border-[#0080FF] transition-colors">
                <h3 className="text-2xl font-bold mb-2 font-rajdhani">Foundation</h3>
                <p className="text-[#0080FF] font-medium mb-6">Launch & Establish</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[#0080FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Website design & build (core)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[#0080FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Brand identity kit (basic)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[#0080FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Email & CRM setup (basic)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[#0080FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Monthly blog post (1x)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[#0080FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Quarterly analytics report</span>
                  </li>
                </ul>
                <div className="mb-6">
                  <p className="text-2xl font-bold font-rajdhani">Starting at $____/month</p>
                  <p className="text-xs text-gray-400">after initial build fee</p>
                </div>
                <Link href="/contact">
                  <Button variant="outline" className="w-full border-[#0080FF] text-[#0080FF] hover:bg-[#0080FF] hover:text-white">
                    Book a Free Consultation
                  </Button>
                </Link>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll delay={100}>
              <Card className="bg-black border-2 border-[#0080FF] p-8 relative ring-2 ring-[#0080FF]">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#0080FF] text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
                <h3 className="text-2xl font-bold mb-2 font-rajdhani">Growth</h3>
                <p className="text-[#0080FF] font-medium mb-6">Expand Your Reach</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[#0080FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Everything in Foundation, plus:</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[#0080FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">SEO/AIEO ongoing optimization</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[#0080FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Social media (2 platforms, 3 posts/week)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[#0080FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Newsletter design & send (bi-weekly)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[#0080FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Landing pages & lead magnet design</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[#0080FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Monthly performance review call</span>
                  </li>
                </ul>
                <div className="mb-6">
                  <p className="text-2xl font-bold font-rajdhani">Starting at $____/month</p>
                </div>
                <Link href="/contact">
                  <Button className="w-full bg-[#0080FF] hover:bg-[#0080FF]/90">
                    Book a Free Consultation
                  </Button>
                </Link>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <Card className="bg-black border border-white/10 p-8 hover:border-[#0080FF] transition-colors">
                <h3 className="text-2xl font-bold mb-2 font-rajdhani">Scale</h3>
                <p className="text-[#0080FF] font-medium mb-6">Full-Funnel Domination</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[#0080FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Everything in Growth, plus:</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[#0080FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">PPC / paid media management</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[#0080FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Reputation management & reviews</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[#0080FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Advanced CRM automation & lead scoring</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[#0080FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Bi-weekly A/B testing & CRO</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[#0080FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Dedicated Slack/Teams channel & weekly strategy</span>
                  </li>
                </ul>
                <div className="mb-6">
                  <p className="text-2xl font-bold font-rajdhani">Starting at $____/month</p>
                </div>
                <Link href="/contact">
                  <Button variant="outline" className="w-full border-[#0080FF] text-[#0080FF] hover:bg-[#0080FF] hover:text-white">
                    Book a Free Consultation
                  </Button>
                </Link>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Section 4: Modular Add-Ons */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Need Something Specific? Choose À La Carte.</h2>
          <p className="text-gray-400 mb-12 font-inter max-w-3xl">
            Already have a website? Just need CRM help or social management? No problem. All services are available as standalone engagements.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-[#121212] border border-white/10 p-6 hover:border-[#0080FF] transition-colors">
              <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-[#0080FF]" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-rajdhani">Brand Identity & Marketing Kit</h3>
              <p className="text-gray-400 text-sm mb-4 font-inter">From logo systems to presentation templates, get a cohesive visual brand that builds trust.</p>
              <Link href="/contact" className="text-[#0080FF] hover:text-[#0080FF]/80 text-sm font-medium">
                I'm interested <ArrowRight className="inline ml-1 h-4 w-4" />
              </Link>
            </Card>

            <Card className="bg-[#121212] border border-white/10 p-6 hover:border-[#0080FF] transition-colors">
              <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-[#0080FF]" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-rajdhani">Blog & Resource Management</h3>
              <p className="text-gray-400 text-sm mb-4 font-inter">Strategy, writing, and publishing that fuels your SEO and authority.</p>
              <Link href="/contact" className="text-[#0080FF] hover:text-[#0080FF]/80 text-sm font-medium">
                I'm interested <ArrowRight className="inline ml-1 h-4 w-4" />
              </Link>
            </Card>

            <Card className="bg-[#121212] border border-white/10 p-6 hover:border-[#0080FF] transition-colors">
              <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-[#0080FF]" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-rajdhani">Newsletter & Email Marketing</h3>
              <p className="text-gray-400 text-sm mb-4 font-inter">Convert subscribers into customers with beautifully designed, automated sequences.</p>
              <Link href="/contact" className="text-[#0080FF] hover:text-[#0080FF]/80 text-sm font-medium">
                I'm interested <ArrowRight className="inline ml-1 h-4 w-4" />
              </Link>
            </Card>

            <Card className="bg-[#121212] border border-white/10 p-6 hover:border-[#0080FF] transition-colors">
              <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-4">
                <Share2 className="h-6 w-6 text-[#0080FF]" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-rajdhani">Social Media Management</h3>
              <p className="text-gray-400 text-sm mb-4 font-inter">Done-for-you content creation, scheduling, and engagement on the platforms that matter.</p>
              <Link href="/contact" className="text-[#0080FF] hover:text-[#0080FF]/80 text-sm font-medium">
                I'm interested <ArrowRight className="inline ml-1 h-4 w-4" />
              </Link>
            </Card>

            <Card className="bg-[#121212] border border-white/10 p-6 hover:border-[#0080FF] transition-colors">
              <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-[#0080FF]" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-rajdhani">CRM Management</h3>
              <p className="text-gray-400 text-sm mb-4 font-inter">Setup, automation, data hygiene—so your leads never fall through the cracks.</p>
              <Link href="/contact" className="text-[#0080FF] hover:text-[#0080FF]/80 text-sm font-medium">
                I'm interested <ArrowRight className="inline ml-1 h-4 w-4" />
              </Link>
            </Card>

            <Card className="bg-[#121212] border border-white/10 p-6 hover:border-[#0080FF] transition-colors">
              <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-[#0080FF]" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-rajdhani">PPC & Paid Media</h3>
              <p className="text-gray-400 text-sm mb-4 font-inter">Strategic ad buying and optimization tied to real revenue, not just clicks.</p>
              <Link href="/contact" className="text-[#0080FF] hover:text-[#0080FF]/80 text-sm font-medium">
                I'm interested <ArrowRight className="inline ml-1 h-4 w-4" />
              </Link>
            </Card>

            <Card className="bg-[#121212] border border-white/10 p-6 hover:border-[#0080FF] transition-colors">
              <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-[#0080FF]" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-rajdhani">SEO & AIEO</h3>
              <p className="text-gray-400 text-sm mb-4 font-inter">Organic visibility on Google and AI answer engines—ethical, data-driven, transparent.</p>
              <Link href="/contact" className="text-[#0080FF] hover:text-[#0080FF]/80 text-sm font-medium">
                I'm interested <ArrowRight className="inline ml-1 h-4 w-4" />
              </Link>
            </Card>

            <Card className="bg-[#121212] border border-white/10 p-6 hover:border-[#0080FF] transition-colors">
              <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-[#0080FF]" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-rajdhani">Analytics & CRO</h3>
              <p className="text-gray-400 text-sm mb-4 font-inter">Turn data into decisions; improve what's working and fix what's not.</p>
              <Link href="/contact" className="text-[#0080FF] hover:text-[#0080FF]/80 text-sm font-medium">
                I'm interested <ArrowRight className="inline ml-1 h-4 w-4" />
              </Link>
            </Card>

            <Card className="bg-[#121212] border border-white/10 p-6 hover:border-[#0080FF] transition-colors">
              <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-[#0080FF]" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-rajdhani">Reputation Management</h3>
              <p className="text-gray-400 text-sm mb-4 font-inter">Monitor, manage, and generate reviews that build social proof.</p>
              <Link href="/contact" className="text-[#0080FF] hover:text-[#0080FF]/80 text-sm font-medium">
                I'm interested <ArrowRight className="inline ml-1 h-4 w-4" />
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 5: Why Work With Me — The Anti-Agency Difference */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-[#121212] border-l-4 border-l-[#0080FF] border-y border-r border-white/10 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 font-orbitron">Why Work With Me — The Anti-Agency Difference</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center flex-shrink-0">
                  <User className="h-6 w-6 text-[#0080FF]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-rajdhani">One Person, Full Accountability</h3>
                  <p className="text-gray-400 font-inter">No account managers passing blame. You talk to the person doing the work. Always.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="h-6 w-6 text-[#0080FF]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-rajdhani">You Own Your Assets</h3>
                  <p className="text-gray-400 font-inter">Website, CRM data, brand kit—100% yours. No hostage situations. Cancel anytime, take everything with you.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-6 w-6 text-[#0080FF]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-rajdhani">Human-Led, Not AI-Generated</h3>
                  <p className="text-gray-400 font-inter">AI speeds up research and production, but every strategy, design, and piece of content is crafted with human judgment and empathy.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center flex-shrink-0">
                  <FileCheck className="h-6 w-6 text-[#0080FF]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-rajdhani">Transparent Reporting</h3>
                  <p className="text-gray-400 font-inter">We report on leads, sales, and customer value—never just empty impressions.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 6: Frequently Asked Questions */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212]">
        <div className="container mx-auto max-w-4xl">
          <AnimateOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Frequently Asked Questions</h2>
            <p className="text-gray-400 mb-12 font-inter">Common questions about working together</p>
          </AnimateOnScroll>

          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <Accordion.Item key={index} value={`item-${index}`} className="bg-black border border-white/10 rounded-lg">
                <Accordion.Trigger className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors focus:outline-none">
                  <span className="font-semibold font-rajdhani">{faq.question}</span>
                  <ChevronDown className="h-5 w-5 text-[#0080FF] transition-transform duration-200 data-[state=open]:rotate-180" />
                </Accordion.Trigger>
                <Accordion.Content className="px-6 pb-6 pt-0">
                  <p className="text-gray-400 font-inter">{faq.answer}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* Section 7: Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-[#0080FF]/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Your Website Should Be Your Best Salesperson. Let's Make It Happen.</h2>
          <p className="text-xl text-gray-400 mb-8 font-inter">
            No confusing packages, no hidden fees, no pressure. Just a transparent conversation about how we can grow your business together.
          </p>
          <Button size="lg" className="bg-[#0080FF] hover:bg-[#0080FF]/90 text-base px-8 mb-4">
            Book Your Free Strategy Call
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-gray-400 text-sm font-inter">
            Or send me a message directly — I'll reply personally.
          </p>
        </div>
      </section>
    </div>
  )
}

```

---

## app/work/layout.tsx

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Your Dedicated Marketer",
  description: "Real work, real results. Explore our portfolio of concept/demo projects showcasing web design, SEO, and full marketing systems across industries.",
  keywords: ["portfolio", "case studies", "web design projects", "demo sites", "marketing examples"],
  openGraph: {
    title: "Portfolio - Your Dedicated Marketer",
    description: "Real work, real results. Explore our portfolio of concept/demo projects.",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

```

---

## app/work/page.tsx

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Monitor, Zap, FileText, Target, BarChart3, Sparkles, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { AnimateOnScroll } from "@agency/ui"

export default function WorkPage() {
  const [industryFilter, setIndustryFilter] = useState("All")
  const [serviceFilter, setServiceFilter] = useState("All")

  const industries = ["All", "Healthcare", "Legal", "SaaS/Tech", "Home Services", "E-commerce", "Hospitality", "Professional Services", "Real Estate", "Nonprofit"]
  const serviceTypes = ["All", "Web Design", "Brand Identity", "SEO/AIEO", "Full System"]

  const projects = [
    {
      id: 1,
      name: "Modern Dental Practice",
      industry: "Healthcare",
      serviceType: "Web Design",
      stat: "+142% Mobile Conversion",
      blurb: "A dated, non-responsive site was costing this dental practice new patient bookings. We rebuilt with a mobile-first, appointment-optimized experience.",
      href: "/demo/day-care",
      demoHref: "https://demo.example.com/dental"
    },
    {
      id: 2,
      name: "Boutique Law Group",
      industry: "Legal",
      serviceType: "Full System",
      stat: "Organic Traffic +87%",
      blurb: "This law firm had zero online visibility. We built a trust-focused site with local SEO that drove qualified consultation requests.",
      href: "/demo/tax-firm",
      demoHref: "https://demo.example.com/law"
    },
    {
      id: 3,
      name: "SaaS Startup Dashboard",
      industry: "SaaS/Tech",
      serviceType: "Web Design",
      stat: "Page Speed: 98/100",
      blurb: "Slow load times were killing conversions. We optimized every asset and implemented lazy loading for instant page renders.",
      href: "/business-applications/project-management",
      demoHref: "https://demo.example.com/saas"
    },
    {
      id: 4,
      name: "Hair Salon Platform",
      industry: "Home Services",
      serviceType: "Full System",
      stat: "2.5M Appointments Booked",
      blurb: "Manual booking was a nightmare. We created an automated scheduling system that increased bookings by 340%.",
      href: "/demo/hair-salor",
      demoHref: "https://demo.example.com/salon"
    },
    {
      id: 5,
      name: "Luxury Hotel Chain",
      industry: "Hospitality",
      serviceType: "Brand Identity",
      stat: "Direct Bookings +65%",
      blurb: "OTA fees were eating margins. We built a direct booking engine with a premium brand experience.",
      href: "/demo/hotel",
      demoHref: "https://demo.example.com/hotel"
    },
    {
      id: 6,
      name: "Accounting Firm",
      industry: "Professional Services",
      serviceType: "SEO/AIEO",
      stat: "First-Page Rankings: 5",
      blurb: "Invisible in search results. We implemented a comprehensive SEO strategy that put them on page one for target keywords.",
      href: "/demo/accounting",
      demoHref: "https://demo.example.com/accounting"
    }
  ]

  const filteredProjects = projects.filter(project => {
    const industryMatch = industryFilter === "All" || project.industry === industryFilter
    const serviceMatch = serviceFilter === "All" || project.serviceType === serviceFilter
    return industryMatch && serviceMatch
  })

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Section 1: Header */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[#1E1E1E] to-black">
        <div className="container mx-auto max-w-4xl text-center">
          <AnimateOnScroll>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-orbitron">
              Real Work, Real Results.
            </h1>
            <p className="text-xl text-gray-400 mb-6 font-inter max-w-3xl mx-auto">
              Every project below was built from a strategic brief, designed for conversion, and optimized for performance. Explore the case studies. Judge the work. Then let's talk about your business.
            </p>
            <p className="text-sm text-gray-500 font-inter">
              Projects labeled 'Concept/Demo' were self-initiated to demonstrate capability across industries. No client was involved. The strategy, design, and simulated results are all ours.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Section 2: Filter Bar */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-black border-b border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-3 font-inter">Industry</p>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setIndustryFilter(industry)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      industryFilter === industry
                        ? "bg-[#0080FF] text-white"
                        : "bg-[#121212] border border-white/10 text-gray-400 hover:border-[#0080FF]"
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-3 font-inter">Service Type</p>
              <div className="flex flex-wrap gap-2">
                {serviceTypes.map((service) => (
                  <button
                    key={service}
                    onClick={() => setServiceFilter(service)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      serviceFilter === service
                        ? "bg-[#0080FF] text-white"
                        : "bg-[#121212] border border-white/10 text-gray-400 hover:border-[#0080FF]"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Project Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="portfolio-grid">
            {filteredProjects.map((project, index) => (
              <AnimateOnScroll key={project.id} delay={index * 80}>
                <Card className={`${index === 0 ? 'portfolio-item-featured' : 'portfolio-item'} bg-[#121212] border border-white/10 hover:border-[#0080FF] transition-all duration-300 hover:-translate-y-1`}>
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="h-48 bg-[#1E1E1E] rounded-lg mb-4 flex items-center justify-center flex-grow">
                      <Monitor className="h-16 w-16 text-gray-600" />
                    </div>
                    <div className="text-[#0080FF] text-xs font-medium mb-2">{project.industry}</div>
                    <h3 className="text-xl font-bold mb-2 font-rajdhani">{project.name}</h3>
                    <div className="text-2xl font-bold text-[#0080FF] mb-3 font-rajdhani">{project.stat}</div>
                    <p className="text-gray-400 text-sm mb-6 font-inter">{project.blurb}</p>
                    <div className="flex flex-col gap-2 mt-auto">
                      <Link href={project.href}>
                        <Button variant="outline" className="w-full border-[#0080FF] text-[#0080FF] hover:bg-[#0080FF] hover:text-white">
                          View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <a
                        href={project.demoHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center text-sm text-gray-400 hover:text-[#0080FF] transition-colors"
                      >
                        See Live Site <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Featured Case Study */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212]">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-black border border-white/10 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="h-80 bg-[#1E1E1E] rounded-lg flex items-center justify-center">
                <Monitor className="h-24 w-24 text-gray-600" />
              </div>
              <div>
                <div className="text-[#0080FF] text-sm font-medium mb-2">Featured Case Study</div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 font-orbitron">How We Turned an Outdated Site into a Lead-Generating Engine</h2>
                <p className="text-gray-400 mb-6 font-inter">
                  A complete rebuild of a dental practice website that transformed their online presence from invisible to industry leader.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-[#0080FF]" />
                    <span className="text-gray-300">Mobile speed improved by 300%</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-[#0080FF]" />
                    <span className="text-gray-300">Contact form conversions up 85%</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-[#0080FF]" />
                    <span className="text-gray-300">First-page Google ranking for 5 target keywords</span>
                  </li>
                </ul>
                <div className="flex gap-4">
                  <Link href="/demo/day-care">
                    <Button className="bg-[#0080FF] hover:bg-[#0080FF]/90">
                      Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <a
                    href="https://demo.example.com/dental"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="border-[#0080FF] text-[#0080FF] hover:bg-[#0080FF] hover:text-white">
                      See Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 5: How I Work */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">From Demo to Your Business: The Same Rigor, Applied to You.</h2>
          <p className="text-gray-400 mb-12 font-inter max-w-3xl">
            The same strategic process that built these demos will build your website.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-[#121212] border border-white/10 p-6">
              <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-rajdhani">Strategic Brief</h3>
              <p className="text-gray-400 font-inter">Every project starts with a deep understanding of your audience, goals, and competitive landscape—demo or not.</p>
            </Card>

            <Card className="bg-[#121212] border border-white/10 p-6">
              <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-rajdhani">Custom Build</h3>
              <p className="text-gray-400 font-inter">No templates. No shortcuts. Your site is built to your brand and optimized for performance.</p>
            </Card>

            <Card className="bg-[#121212] border border-white/10 p-6">
              <div className="h-12 w-12 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-rajdhani">Results Tracking</h3>
              <p className="text-gray-400 font-inter">We define success metrics before launch and track real business outcomes after.</p>
            </Card>
          </div>

          <Link href="/contact">
            <Button size="lg" className="bg-[#0080FF] hover:bg-[#0080FF]/90 text-base px-8">
              Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Section 6: Testimonial Placeholder */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212]">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-black border-l-4 border-l-[#0080FF] border-y border-r border-white/10 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-orbitron">Building Our Success Stories</h2>
            <p className="text-gray-300 font-inter leading-relaxed">
              We're building our library of client success stories right now. In the meantime, the demos above represent the same strategic rigor and design quality you'll receive. Want to be our first case study? Let's make it a good one.
            </p>
          </Card>
        </div>
      </section>

      {/* Section 7: Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-[#0080FF]/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">See a Project You Like? Let's Build Yours.</h2>
          <p className="text-xl text-gray-400 mb-8 font-inter">
            Every business deserves a website that works as hard as they do. Let's talk about yours. Free 30-minute consultation, no pressure.
          </p>
          <Button size="lg" className="bg-[#0080FF] hover:bg-[#0080FF]/90 text-base px-8 mb-4">
            Book Your Free Strategy Call
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-gray-400 text-sm font-inter">
            Or chat with me now — I'm real, and I'll answer.
          </p>
        </div>
      </section>
    </div>
  )
}

```

---

## components/hero-scene-wrapper.tsx

```tsx
'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const HeroScene = dynamic(() => import('./hero-scene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
})

export function HeroSceneWrapper() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
  }, [])

  if (prefersReducedMotion) {
    return <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a1a] to-black" aria-hidden="true" />
  }

  return <HeroScene />
}

```

---

## components/hero-scene.tsx

```tsx
'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 400
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return pos
  }, [])

  useFrame(() => {
    pointsRef.current.rotation.y += 0.0004
    pointsRef.current.rotation.x += 0.0002
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#0080FF"
        sizeAttenuation
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function MorphingCore() {
  const meshRef = useRef<THREE.Mesh>(null!)
  // Gentle auto-rotation — mutation-based, no React re-render
  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * 0.15
    meshRef.current.rotation.x += delta * 0.05
  })
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <MeshDistortMaterial
          color="#0080FF"
          emissive="#004080"
          roughness={0.4}
          metalness={0.2}
          distort={0.25}
          speed={1.5}
          wireframe
        />
      </mesh>
    </Float>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#0080FF" />
        <ParticleField />
        <MorphingCore />
      </Canvas>
    </div>
  )
}

```

---

## components/hero-text.tsx

```tsx
import { GlassCard } from "@agency/ui"
import { CTAButton } from "@agency/ui"

export function HeroText() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center px-4 pt-32 pb-20">
      <GlassCard className="max-w-3xl space-y-6 p-8">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight animate-text-reveal">
          Web Design That Builds Your Business
          <br />
          <span className="text-accent">—Without the Agency Nonsense.</span>
        </h1>
        <p className="text-secondary text-lg md:text-xl max-w-2xl mx-auto">
          Custom websites, transparent SEO, and analytics tied to your revenue.
          No generic AI fluff, no vanity metrics, no creepy tracking.
          Just a dedicated marketer in your corner.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <CTAButton href="/contact">Start With a Free Consultation</CTAButton>
          <CTAButton href="#work" variant="ghost">See Real Work, Real Results</CTAButton>
        </div>
      </GlassCard>
    </div>
  )
}

```

---

## components/marketing-partner-strip.tsx

```tsx
'use client'

import { useScroll, useTransform, motion } from 'motion/react'
import { useRef } from 'react'
import { Palette, FileText, Mail, Share2, Users, CreditCard, Search, TrendingUp, Shield } from 'lucide-react'
import { AnimateOnScroll } from '@agency/ui'

export function MarketingPartnerStrip() {
  const parallaxRef = useRef<HTMLDivElement>(null!)
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['3%', '-3%'])

  return (
    <section ref={parallaxRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212] overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">Beyond the Build: A Complete Marketing Partner.</h2>
        </AnimateOnScroll>
        
        <motion.div style={{ x }} className="flex gap-8 justify-center flex-wrap mt-12">
          <div className="flex flex-col items-center text-center">
            <Palette className="h-8 w-8 text-[#0080FF] mb-2" />
            <span className="text-xs font-medium">Brand Identity</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <FileText className="h-8 w-8 text-[#0080FF] mb-2" />
            <span className="text-xs font-medium">Blog & Resources</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Mail className="h-8 w-8 text-[#0080FF] mb-2" />
            <span className="text-xs font-medium">Email Marketing</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Share2 className="h-8 w-8 text-[#0080FF] mb-2" />
            <span className="text-xs font-medium">Social Media</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Users className="h-8 w-8 text-[#0080FF] mb-2" />
            <span className="text-xs font-medium">CRM Management</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <CreditCard className="h-8 w-8 text-[#0080FF] mb-2" />
            <span className="text-xs font-medium">PPC & Paid Media</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Search className="h-8 w-8 text-[#0080FF] mb-2" />
            <span className="text-xs font-medium">SEO & AIEO</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <TrendingUp className="h-8 w-8 text-[#0080FF] mb-2" />
            <span className="text-xs font-medium">Analytics & CRO</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Shield className="h-8 w-8 text-[#0080FF] mb-2" />
            <span className="text-xs font-medium">Reputation</span>
          </div>
        </motion.div>

        <div className="text-center mt-8">
          <a href="/services" className="text-[#0080FF] hover:text-[#0080FF]/80 text-sm font-medium">
            Explore all services
          </a>
        </div>
      </div>
    </section>
  )
}

```

---

## components/navigation.tsx

```tsx
'use client'

import { useScroll } from 'motion/react'
import { useRef } from 'react'
import { Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navigation() {
  const ref = useRef<HTMLDivElement>(null!)
  const { scrollY } = useScroll({ container: ref })

  return (
    <nav className="glass-nav sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-[#0080FF] flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold font-rajdhani">Your Dedicated Marketer</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Home</a>
            <a href="/services" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Services</a>
            <a href="/work" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Portfolio</a>
            <a href="/about" className="text-sm font-medium hover:text-[#0080FF] transition-colors">About</a>
            <a href="/blog" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Blog</a>
            <a href="/contact" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Contact</a>
          </div>
          <Button className="bg-[#0080FF] hover:bg-[#0080FF]/90">Book Consultation</Button>
        </div>
      </div>
    </nav>
  )
}

```

---

## components/ui/button.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

---

## components/ui/card.tsx

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

---

