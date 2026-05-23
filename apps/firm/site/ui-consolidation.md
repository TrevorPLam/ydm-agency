# UI Code Consolidation - Firm Site

This document contains all UI-related code files from `apps/firm/site`.

**Generated on:** 2026-05-23T03:11:31.881Z

---

## Configuration

### app/about/layout.tsx

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

### app/about/page.tsx

```tsx
import { Navigation } from "@/components/navigation"
import { HeroSection } from "./sections/HeroSection"
import { ProblemSection } from "./sections/ProblemSection"
import { PhilosophySection } from "./sections/PhilosophySection"
import { CommitmentsSection } from "./sections/CommitmentsSection"
import { FounderSection } from "./sections/FounderSection"
import { AudienceSection } from "./sections/AudienceSection"
import { CTASection } from "./sections/CTASection"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <PhilosophySection />
      <CommitmentsSection />
      <FounderSection />
      <AudienceSection />
      <CTASection />
    </div>
  )
}

```

---

### app/about/sections/AudienceSection.tsx

```tsx
import { Card } from "@agency/ui"
import { CheckCircle2 } from "lucide-react"
import { audienceItems } from "../data/audienceItems"

export function AudienceSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">We Work Best With Businesses That...</h2>
        
        <Card className="bg-[var(--surface-2)] border border-white/10 p-8 md:p-12">
          <ul className="space-y-4">
            {audienceItems.map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
                <span className="text-gray-300 font-inter">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}

```

---

### app/about/sections/CTASection.tsx

```tsx
import { Button } from "@agency/ui"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-black to-[var(--accent)]/20">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Let's Leave the Agency Nonsense Behind.</h2>
        <p className="text-xl text-gray-400 mb-8 font-inter">
          If you're looking for a marketing partner who takes full accountability, tells you the truth, and obsesses over your growth—let's talk. Free 30-minute strategy call, no pressure, no pitch deck.
        </p>
        <Link href="/contact">
          <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base px-8 mb-4">
            Book Your Free Strategy Call
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <p className="text-gray-400 text-sm font-inter">
          Prefer to write? Send me a message directly—I read every one.
        </p>
      </div>
    </section>
  )
}

```

---

### app/about/sections/CommitmentsSection.tsx

```tsx
import { Card } from "@agency/ui"
import { AnimateOnScroll } from "@agency/ui"
import { commitments } from "../data/commitments"

export function CommitmentsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">This Is How We Work. No Exceptions.</h2>
        </AnimateOnScroll>
        
        <div className="grid md:grid-cols-2 md:grid-rows-3 gap-6">
          {commitments.map((commitment, index) => (
            <AnimateOnScroll key={index} delay={index * 100}>
              <Card className={`bg-[var(--surface-2)] border border-white/10 p-8 hover:border-[var(--accent)] transition-colors rounded-2xl ${commitment.span}`}>
                <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-6">
                  <commitment.icon className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-rajdhani">{commitment.title}</h3>
                <p className="text-gray-400 font-inter mb-4">{commitment.description}</p>
                {commitment.badges && (
                  <div className="flex gap-2 flex-wrap">
                    {commitment.badges.map((badge, badgeIndex) => (
                      <span key={badgeIndex} className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-sm rounded-full">{badge}</span>
                    ))}
                  </div>
                )}
                {commitment.title === "Trusted By" && (
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-12 bg-white/5 rounded-lg flex items-center justify-center text-gray-500 text-xs">Logo 1</div>
                    <div className="h-12 bg-white/5 rounded-lg flex items-center justify-center text-gray-500 text-xs">Logo 2</div>
                    <div className="h-12 bg-white/5 rounded-lg flex items-center justify-center text-gray-500 text-xs">Logo 3</div>
                  </div>
                )}
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

```

---

### app/about/sections/FounderSection.tsx

```tsx
import { Card } from "@agency/ui"
import { User } from "lucide-react"
import { founderTimeline, founderQuote, founderNote } from "../data/founderTimeline"

export function FounderSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">The Person Behind This.</h2>
        
        <div className="grid md:grid-cols-2 md:grid-rows-2 gap-6">
          {/* Photo tile - larger, stylized frame */}
          <Card className="bg-black border border-white/10 p-8 md:col-span-1 md:row-span-2 rounded-2xl hover:border-[var(--accent)] transition-colors">
            <div className="relative">
              <div className="aspect-[3/4] bg-gradient-to-br from-[var(--surface-3)] to-[var(--surface-2)] rounded-xl overflow-hidden shadow-2xl border border-white/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <User className="h-24 w-24 text-[var(--accent)]/30 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm font-inter">Photo Coming Soon</p>
                  </div>
                </div>
                {/* Subtle accent glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,128,255,0.1),transparent_50%)]" />
              </div>
              {/* Handwritten signature accent */}
              <div className="mt-6 text-right">
                <p className="font-handwritten text-3xl text-[var(--accent)] opacity-80">— [Your Name]</p>
              </div>
            </div>
          </Card>

          {/* Handwritten quote tile */}
          <Card className="bg-[var(--surface-3)] border border-white/10 p-8 rounded-2xl hover:border-[var(--accent)] transition-colors">
            <div className="space-y-4">
              <p className="font-handwritten text-2xl md:text-3xl text-gray-200 leading-relaxed">
                "{founderQuote}"
              </p>
              <div className="h-1 w-16 bg-[var(--accent)] rounded-full" />
            </div>
          </Card>

          {/* Career timeline tile */}
          <Card className="bg-black border border-white/10 p-8 rounded-2xl hover:border-[var(--accent)] transition-colors">
            <h3 className="text-lg font-bold mb-6 font-rajdhani text-[var(--accent)]">The Journey</h3>
            <div className="space-y-4">
              {founderTimeline.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0 border border-[var(--accent)]/30">
                    {item.icon ? (
                      <item.icon className="h-4 w-4 text-white" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium font-inter">{item.title}</p>
                    <p className="text-gray-400 text-sm font-inter">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Personal note below */}
        <Card className="bg-[var(--surface-3)] border-l-4 border-l-[var(--accent)] border-y-0 border-r-0 border-white/10 p-8 rounded-2xl mt-6">
          <p className="text-gray-300 font-inter leading-relaxed">
            {founderNote}
          </p>
        </Card>
      </div>
    </section>
  )
}

```

---

### app/about/sections/HeroSection.tsx

```tsx
export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-linear-to-br from-black via-[var(--surface-3)] to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,128,255,0.15),transparent_50%)]" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight font-orbitron leading-tight mb-8 overflow-hidden">
            <div className="animate-text-reveal">
              Marketing Shouldn't Be This Hard.
            </div>
            <div className="animate-text-reveal-delay-1 mt-4">
              <span className="text-[var(--accent)]">We're Here to Change That.</span>
            </div>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl font-inter leading-relaxed animate-text-reveal-delay-2">
            The industry is full of agencies that overpromise, underdeliver, and hide behind vanity metrics. Your Dedicated Marketer was built to be the opposite: transparent, human-led, and relentlessly focused on what actually grows your business.
          </p>
        </div>
      </div>
    </section>
  )
}

```

---

### app/about/sections/PhilosophySection.tsx

```tsx
import { Card } from "@agency/ui"
import { CheckCircle2 } from "lucide-react"
import { philosophyAIItems } from "../data/philosophyAIItems"
import { philosophyHumanItems } from "../data/philosophyHumanItems"

export function PhilosophySection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">Technology Is a Tool. Humans Are the Strategy.</h2>
        
        <div className="text-center mb-12">
          <p className="text-xl text-gray-300 max-w-4xl mx-auto font-inter">
            We believe the best marketing comes from a tight collaboration between human creativity, empathy, and strategic judgment—and the speed and analytical power of AI. We use AI as an accelerator, never as a replacement for the thinking, feeling, and nuanced decision-making that only a human can provide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-black border border-white/10 p-8">
            <h3 className="text-xl font-bold mb-6 font-rajdhani text-[var(--accent)]">What AI Does Here</h3>
            <ul className="space-y-3">
              {philosophyAIItems.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span className="text-gray-300 font-inter">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="bg-black border border-white/10 p-8">
            <h3 className="text-xl font-bold mb-6 font-rajdhani text-[var(--accent)]">What Humans Do Here</h3>
            <ul className="space-y-3">
              {philosophyHumanItems.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span className="text-gray-300 font-inter">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}

```

---

### app/about/sections/ProblemSection.tsx

```tsx
import { Card } from "@agency/ui"
import { problemCards, problemPullquote } from "../data/problemCards"

export function ProblemSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">The Way Marketing Is Sold Is Broken.</h2>
        
        <div className="grid md:grid-cols-2 md:grid-rows-2 gap-6 mb-6">
          {problemCards.map((card, index) => (
            <Card 
              key={index}
              className={`bg-[var(--surface-2)] border border-white/10 p-8 hover:border-[var(--accent)] transition-colors rounded-2xl ${card.span}`}
            >
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                  <card.icon className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <h3 className="text-xl font-bold font-rajdhani">{card.title}</h3>
                <p className="text-gray-400 font-inter">{card.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-[var(--surface-2)] border-l-4 border-l-[var(--accent)] border-y-0 border-r-0 border-white/10 p-8 rounded-2xl">
          <p className="text-lg text-gray-300 font-inter italic text-center">
            {problemPullquote}
          </p>
        </Card>
      </div>
    </section>
  )
}

```

---

### app/blog/layout.tsx

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

### app/blog/page.tsx

```tsx
import { Button } from "@agency/ui"
import { Zap } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "./sections/HeroSection"
import { BlogPostsSection } from "./sections/BlogPostsSection"
import { CTASection } from "./sections/CTASection"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />
      <BlogPostsSection />
      <CTASection />
    </div>
  )
}

```

---

### app/blog/sections/BlogPostsSection.tsx

```tsx
import { Card, Button } from "@agency/ui"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { posts, getCategoryColor } from "../data/posts"

export function BlogPostsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 md:grid-rows-2 gap-6">
          {/* Featured post - 2x2 large tile */}
          <Card className="bg-[var(--surface-2)] border border-white/10 p-8 hover:border-[var(--accent)] transition-colors rounded-2xl md:col-span-2 md:row-span-2 relative overflow-hidden group">
            <div className="absolute top-4 right-4 px-3 py-1 bg-[var(--accent)] text-white text-xs font-bold rounded-full">Featured</div>
            <div className={`${getCategoryColor(posts[0].category)} text-xs font-medium mb-3 inline-block px-3 py-1 rounded-full`}>{posts[0].category}</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-rajdhani">{posts[0].title}</h3>
            <p className="text-gray-400 text-base mb-6 font-inter leading-relaxed">{posts[0].excerpt}</p>
            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{posts[0].date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{posts[0].readTime}</span>
              </div>
            </div>
            <Button variant="outline" className="border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white group-hover:shadow-[0_0_20px_rgba(0,128,255,0.3)] transition-all">
              Read More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>

          {/* Second post - 1x1 tile */}
          <Card className="bg-[var(--surface-3)] border border-white/10 p-6 hover:border-[var(--accent)] transition-colors rounded-2xl md:col-span-1 md:row-span-1">
            <div className={`${getCategoryColor(posts[1].category)} text-xs font-medium mb-2 inline-block px-2 py-1 rounded-full`}>{posts[1].category}</div>
            <h3 className="text-lg font-bold mb-2 font-rajdhani line-clamp-2">{posts[1].title}</h3>
            <p className="text-gray-400 text-sm mb-4 font-inter line-clamp-2">{posts[1].excerpt}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{posts[1].date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{posts[1].readTime}</span>
              </div>
            </div>
            <Button variant="outline" className="w-full border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white text-sm">
              Read More
              <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Card>

          {/* Third post - 1x1 tile */}
          <Card className="bg-[var(--surface-2)] border border-white/10 p-6 hover:border-[var(--accent)] transition-colors rounded-2xl md:col-span-1 md:row-span-1">
            <div className={`${getCategoryColor(posts[2].category)} text-xs font-medium mb-2 inline-block px-2 py-1 rounded-full`}>{posts[2].category}</div>
            <h3 className="text-lg font-bold mb-2 font-rajdhani line-clamp-2">{posts[2].title}</h3>
            <p className="text-gray-400 text-sm mb-4 font-inter line-clamp-2">{posts[2].excerpt}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{posts[2].date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{posts[2].readTime}</span>
              </div>
            </div>
            <Button variant="outline" className="w-full border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white text-sm">
              Read More
              <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}

```

---

### app/blog/sections/CTASection.tsx

```tsx
import { Button } from "@agency/ui"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Want More Insights Like This?</h2>
        <p className="text-xl text-gray-400 mb-8 font-inter">
          Subscribe to get practical marketing tips delivered to your inbox. No spam, ever.
        </p>
        <Link href="/contact">
          <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base px-8">
            Get in Touch
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}

```

---

### app/blog/sections/HeroSection.tsx

```tsx
export function HeroSection() {
  return (
    <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-black via-[var(--surface-3)] to-black">
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
  )
}

```

---

### app/contact/layout.tsx

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

### app/contact/page.tsx

```tsx
"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "./sections/HeroSection"
import { ContactFormSection } from "./sections/ContactFormSection"
import { ContactOptionsSection } from "./sections/ContactOptionsSection"
import { TimelineSection } from "./sections/TimelineSection"
import { FAQSection } from "./sections/FAQSection"
import { CTASection } from "./sections/CTASection"
import { useState } from "react"

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: '',
    message: '',
    preferredContact: 'email'
  })
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  })

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateName = (name: string) => {
    return name.trim().length >= 2
  }

  const validateMessage = (message: string) => {
    return message.trim().length >= 10
  }

  const isEmailValid = formData.email === '' || validateEmail(formData.email)
  const isNameValid = formData.name === '' || validateName(formData.name)
  const isMessageValid = formData.message === '' || validateMessage(formData.message)

  const requiredFields = ['name', 'email', 'message']
  const filledRequiredFields = requiredFields.filter(field => {
    if (field === 'name') return validateName(formData.name)
    if (field === 'email') return validateEmail(formData.email)
    if (field === 'message') return validateMessage(formData.message)
    return false
  }).length

  const progress = (filledRequiredFields / requiredFields.length) * 100

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />
      <ContactFormSection 
        formData={formData}
        touched={touched}
        isEmailValid={isEmailValid}
        isNameValid={isNameValid}
        isMessageValid={isMessageValid}
        progress={progress}
        handleInputChange={handleInputChange}
        handleBlur={handleBlur}
        setFormData={setFormData}
      />
      <ContactOptionsSection />
      <TimelineSection />
      <FAQSection 
        openFaq={openFaq}
        toggleFaq={toggleFaq}
      />
      <CTASection />
    </div>
  )
}

```

---

### app/contact/sections/CTASection.tsx

```tsx
import { Button } from "@agency/ui"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-black to-[var(--accent)]/20">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Need Something Urgent? Use the Chat.</h2>
        <p className="text-xl text-gray-400 mb-8 font-inter">
          If you're up against a deadline or have a quick question, the live chat is your fastest path. I'll answer if I'm at my desk.
        </p>
        <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base px-8">
          Start Chat
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}

```

---

### app/contact/sections/ContactFormSection.tsx

```tsx
import { Card, Button } from "@agency/ui"
import { ArrowRight, Mail, Phone, MessageSquare, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

interface ContactFormSectionProps {
  formData: {
    name: string
    email: string
    company: string
    interest: string
    message: string
    preferredContact: string
  }
  touched: {
    name: boolean
    email: boolean
    message: boolean
  }
  isEmailValid: boolean
  isNameValid: boolean
  isMessageValid: boolean
  progress: number
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleBlur: (field: string) => void
  setFormData: (data: any) => void
}

export function ContactFormSection({ 
  formData, 
  touched, 
  isEmailValid, 
  isNameValid, 
  isMessageValid, 
  progress,
  handleInputChange,
  handleBlur,
  setFormData 
}: ContactFormSectionProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-2xl">
        <Card className="bg-[var(--surface-2)] border-l-4 border-l-[var(--accent)] border-y border-r border-white/10 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-8 font-orbitron">Send Me a Message</h2>
          
          <form className="space-y-6">
            {/* Progress Indicator */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400 font-inter">Form Completion</span>
                <span className="text-sm font-medium text-[var(--accent)] font-inter">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-black rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[var(--accent)] transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Preferred Contact Method */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">Preferred Contact Method</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, preferredContact: 'email' }))}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md border transition-all ${
                    formData.preferredContact === 'email'
                      ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                      : 'bg-black border-white/20 text-gray-400 hover:border-white/40'
                  }`}
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-sm font-medium">Email</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, preferredContact: 'phone' }))}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md border transition-all ${
                    formData.preferredContact === 'phone'
                      ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                      : 'bg-black border-white/20 text-gray-400 hover:border-white/40'
                  }`}
                >
                  <Phone className="h-4 w-4" />
                  <span className="text-sm font-medium">Phone</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, preferredContact: 'chat' }))}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md border transition-all ${
                    formData.preferredContact === 'chat'
                      ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                      : 'bg-black border-white/20 text-gray-400 hover:border-white/40'
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm font-medium">Chat</span>
                </button>
              </div>
            </div>

            {/* Name Input with Floating Label */}
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={() => handleBlur('name')}
                placeholder=" "
                className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none focus:ring-1 transition-colors peer ${
                  touched.name && !isNameValid
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : touched.name && isNameValid
                    ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                    : 'border-white/20 focus:border-[var(--accent)] focus:ring-[var(--accent)]'
                }`}
                required
              />
              <label
                htmlFor="name"
                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-[var(--accent)] peer-focus:bg-black peer-focus:px-1 peer-[&:not(:placeholder-shown)]:top-[-10px] peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[var(--accent)] peer-[&:not(:placeholder-shown)]:bg-black peer-[&:not(:placeholder-shown)]:px-1"
              >
                Full Name
              </label>
              {touched.name && formData.name && (
                <div className="absolute right-3 top-3">
                  {isNameValid ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
              {touched.name && !isNameValid && (
                <p className="text-red-500 text-xs mt-1">Please enter at least 2 characters</p>
              )}
            </div>

            {/* Email Input with Floating Label */}
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={() => handleBlur('email')}
                placeholder=" "
                className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none focus:ring-1 transition-colors peer ${
                  touched.email && !isEmailValid
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : touched.email && isEmailValid
                    ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                    : 'border-white/20 focus:border-[var(--accent)] focus:ring-[var(--accent)]'
                }`}
                required
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-[var(--accent)] peer-focus:bg-black peer-focus:px-1 peer-[&:not(:placeholder-shown)]:top-[-10px] peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[var(--accent)] peer-[&:not(:placeholder-shown)]:bg-black peer-[&:not(:placeholder-shown)]:px-1"
              >
                Work Email
              </label>
              {touched.email && formData.email && (
                <div className="absolute right-3 top-3">
                  {isEmailValid ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
              {touched.email && !isEmailValid && (
                <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
              )}
            </div>

            {/* Company Input with Floating Label */}
            <div className="relative">
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleInputChange}
                placeholder=" "
                className="w-full px-4 py-3 bg-black border border-white/20 rounded-md text-white focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors peer"
              />
              <label
                htmlFor="company"
                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-[var(--accent)] peer-focus:bg-black peer-focus:px-1 peer-[&:not(:placeholder-shown)]:top-[-10px] peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[var(--accent)] peer-[&:not(:placeholder-shown)]:bg-black peer-[&:not(:placeholder-shown)]:px-1"
              >
                Company / Website <span className="text-gray-500 font-normal">(optional)</span>
              </label>
            </div>

            {/* Interest Select with Floating Label */}
            <div className="relative">
              <select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black border border-white/20 rounded-md text-white focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
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
              <label htmlFor="interest" className="text-sm font-medium text-gray-300 block mb-2">
                What Are You Interested In? <span className="text-gray-500">(optional)</span>
              </label>
            </div>

            {/* Message Input with Floating Label */}
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onBlur={() => handleBlur('message')}
                placeholder=" "
                rows={5}
                className={`w-full px-4 py-3 bg-black border rounded-md text-white focus:outline-none focus:ring-1 transition-colors resize-none peer ${
                  touched.message && !isMessageValid
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : touched.message && isMessageValid
                    ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                    : 'border-white/20 focus:border-[var(--accent)] focus:ring-[var(--accent)]'
                }`}
                required
              />
              <label
                htmlFor="message"
                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-[var(--accent)] peer-focus:bg-black peer-focus:px-1 peer-[&:not(:placeholder-shown)]:top-[-10px] peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[var(--accent)] peer-[&:not(:placeholder-shown)]:bg-black peer-[&:not(:placeholder-shown)]:px-1"
              >
                Tell Me About Your Project or Goals
              </label>
              {touched.message && formData.message && (
                <div className="absolute right-3 top-3">
                  {isMessageValid ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
              {touched.message && !isMessageValid && (
                <p className="text-red-500 text-xs mt-1">Please enter at least 10 characters</p>
              )}
            </div>

            {/* Personal Reassurance Near Submit */}
            <div className="flex items-center gap-2 text-sm text-gray-400 bg-black/50 px-4 py-3 rounded-md border border-white/10">
              <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />
              <span className="font-inter">I read every message personally</span>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base"
              disabled={!isNameValid || !isEmailValid || !isMessageValid}
            >
              Send Message
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 space-y-3">
            <p className="text-sm text-gray-400 font-inter">
              I read every message personally. No auto-responders, no canned replies. You'll hear back from me, usually within 24 hours on business days.
            </p>
            <p className="text-xs text-gray-500 font-inter">
              Your information is never shared, sold, or used for spam. I hate that too. <Link href="/privacy" className="text-[var(--accent)] hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}

```

---

### app/contact/sections/ContactOptionsSection.tsx

```tsx
import { Card, Button } from "@agency/ui"
import { contactOptions } from "../data/contactOptions"
import Link from "next/link"

export function ContactOptionsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">Prefer Another Way? You've Got Options.</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {contactOptions.map((option, index) => (
            <Card key={index} className={`bg-${index === 0 ? '[var(--surface-3)]' : 'black'} border border-white/10 p-8 hover:border-[var(--accent)] transition-all hover:scale-105 ${option.span} rounded-2xl`}>
              <div className="flex items-start justify-between mb-6">
                <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                  <option.icon className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${option.available ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                  <span className={`text-xs ${option.available ? 'text-green-500' : 'text-gray-500'} font-medium`}>{option.available ? 'Available' : 'Offline'}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 font-rajdhani">{option.title}</h3>
              <p className="text-gray-400 mb-6 font-inter">
                {option.description}
              </p>
              {option.buttonText && (
                <Link href="/contact">
                  <Button variant="outline" className="w-full border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white">
                    {option.buttonText}
                  </Button>
                </Link>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

```

---

### app/contact/sections/FAQSection.tsx

```tsx
import { Card } from "@agency/ui"
import { ChevronDown, ChevronUp } from "lucide-react"
import { faqs } from "../data/faqs"

interface FAQSectionProps {
  openFaq: number | null
  toggleFaq: (index: number) => void
}

export function FAQSection({ openFaq, toggleFaq }: FAQSectionProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
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
                    <ChevronUp className="h-5 w-5 text-[var(--accent)]" />
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
  )
}

```

---

### app/contact/sections/HeroSection.tsx

```tsx
import { MessageSquare } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-black via-[var(--surface-3)] to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,128,255,0.1),transparent_50%)]" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-orbitron leading-tight">
          Let's Talk About Your Business.
        </h1>
        <p className="text-xl text-gray-400 max-w-4xl mx-auto font-inter">
          You'll reach me directly—no forms that vanish into a ticket queue, no "somebody will get back to you." Just a real conversation about how we can grow your business.
        </p>
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center animate-pulse">
            <MessageSquare className="h-6 w-6 text-[var(--accent)]" />
          </div>
        </div>
      </div>
    </section>
  )
}

```

---

### app/contact/sections/TimelineSection.tsx

```tsx
import { Card } from "@agency/ui"
import { timelineSteps } from "../data/timelineSteps"

export function TimelineSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">What Happens After You Reach Out.</h2>
        
        {/* Progress Indicator */}
        <div className="progress-indicator mb-8 hidden md:block">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400 font-inter">Step Progress</span>
            <span className="text-sm font-medium text-[var(--accent)] font-inter">4 steps</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" />
          </div>
        </div>

        <div className="relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent)] via-[var(--accent)]/50 to-transparent hidden md:block" />
          
          <div className="space-y-12 md:space-y-16">
            {timelineSteps.map((step, index) => (
              <div key={index} className="timeline-step relative pl-20 md:pl-24">
                <div className="absolute left-0 md:left-8 top-0 h-16 w-16 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(0,128,255,0.5)] z-10">
                  <span className="text-white font-bold text-2xl font-orbitron">{index + 1}</span>
                </div>
                <div className="bg-[var(--surface-2)] border border-white/10 rounded-2xl p-6 md:p-8 hover:border-[var(--accent)]/50 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold font-rajdhani">{step.title}</h3>
                    <span className="text-xs text-[var(--accent)] font-medium bg-[var(--accent)]/10 px-2 py-1 rounded-full">{step.badge}</span>
                  </div>
                  <p className="text-gray-400 font-inter">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

```

---

### app/faq/layout.tsx

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

### app/faq/page.tsx

```tsx
"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "./sections/HeroSection"
import { CategoriesSection } from "./sections/CategoriesSection"
import { CTASection } from "./sections/CTASection"
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

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />
      <CategoriesSection 
        openCategory={openCategory}
        openQuestion={openQuestion}
        toggleCategory={toggleCategory}
        toggleQuestion={toggleQuestion}
      />
      <CTASection />
    </div>
  )
}

```

---

### app/faq/sections/CTASection.tsx

```tsx
import { Card, Button } from "@agency/ui"
import { MessageSquare, Calendar } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
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
  )
}

```

---

### app/faq/sections/CategoriesSection.tsx

```tsx
import { Card } from "@agency/ui"
import { ChevronDown, ChevronUp, Star } from "lucide-react"
import { categories } from "../data/categories"

interface CategoriesSectionProps {
  openCategory: string | null
  openQuestion: string | null
  toggleCategory: (categoryId: string) => void
  toggleQuestion: (questionId: string) => void
}

export function CategoriesSection({ openCategory, openQuestion, toggleCategory, toggleQuestion }: CategoriesSectionProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 md:grid-rows-2 gap-6">
          {categories.map((category, index) => {
            const isCategoryOpen = openCategory === category.id
            // Bento layout: first 3 categories are 2x1, last 3 are 1x1
            const isWide = index < 3
            return (
              <Card 
                key={category.id} 
                className={`bg-[var(--surface-2)] border border-white/10 overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${isWide ? 'md:col-span-2 md:row-span-1' : 'md:col-span-1 md:row-span-1'}`}
                style={{ 
                  '--category-accent': category.accent,
                  borderColor: isCategoryOpen ? `var(--category-accent)` : 'rgba(255,255,255,0.1)'
                } as React.CSSProperties}
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors relative"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold font-rajdhani" style={{ color: 'var(--category-accent)' }}>{category.title}</h2>
                      {category.popular && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--category-accent)20', color: 'var(--category-accent)' }}>
                          <Star className="h-3 w-3" />
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 font-inter mb-2">{category.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="font-medium" style={{ color: 'var(--category-accent)' }}>{category.questions.length} questions</span>
                    </div>
                  </div>
                  {isCategoryOpen ? (
                    <ChevronUp className="h-5 w-5 shrink-0 ml-4" style={{ color: 'var(--category-accent)' }} />
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
                              <ChevronUp className="h-4 w-4 shrink-0" style={{ color: 'var(--category-accent)' }} />
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
  )
}

```

---

### app/faq/sections/HeroSection.tsx

```tsx
export function HeroSection() {
  return (
    <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-black via-[var(--surface-3)] to-black">
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
  )
}

```

---

### app/globals.css

```css
@import "tailwindcss";

:root {
  color-scheme: dark;
  
  /* Primitives */
  --blue-500: #0080FF;
  --blue-600: #0060CC;
  --zinc-50: #fafafa;
  --zinc-900: #18181b;
  --zinc-950: #09090b;
  
  /* Semantic tokens - dark mode default */
  --surface-0: #000000;
  --surface-1: #0A0A0A;
  --surface-2: #121212;
  --surface-3: #1E1E1E;
  
  --text-primary: #FFFFFF;
  --text-secondary: #B0B0B0;
  --text-muted: #6B6B6B;
  
  --accent: #0080FF;
  --accent-glow: rgba(0, 128, 255, 0.18);
  
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-accent: rgba(0, 128, 255, 0.30);
  
  /* Legacy HSL values for Tailwind compatibility */
  --background: 0 0% 0%;
  --foreground: 0 0% 100%;
  --card: 220 20% 7%;
  --card-foreground: 0 0% 100%;
  --popover: 220 20% 7%;
  --popover-foreground: 0 0% 100%;
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

.animate-text-reveal-delay-1 {
  animation: text-reveal 800ms ease-out forwards;
  animation-delay: 200ms;
}

.animate-text-reveal-delay-2 {
  animation: text-reveal 800ms ease-out forwards;
  animation-delay: 400ms;
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

/* Fluid typography utilities */
.text-fluid-xl {
  font-size: clamp(1.25rem, 2vw + 0.75rem, 1.5rem);
}

.text-fluid-2xl {
  font-size: clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem);
}

.text-fluid-3xl {
  font-size: clamp(1.875rem, 3vw + 0.75rem, 2.25rem);
}

.text-fluid-4xl {
  font-size: clamp(2.25rem, 4vw + 0.75rem, 3rem);
}

.text-fluid-5xl {
  font-size: clamp(3rem, 5vw + 1rem, 4.5rem);
}

.text-fluid-6xl {
  font-size: clamp(3.75rem, 6vw + 1rem, 6rem);
}

.text-fluid-7xl {
  font-size: clamp(4.5rem, 8vw + 1rem, 7.5rem);
}

.text-fluid-8xl {
  font-size: clamp(5rem, 10vw + 1rem, 9rem);
}

/* Scroll-driven font weight animation */
@keyframes font-weight-scroll {
  0% {
    font-weight: 400;
  }
  100% {
    font-weight: 700;
  }
}

@supports (animation-timeline: view()) {
  .animate-font-weight-scroll {
    animation: font-weight-scroll linear both;
    animation-timeline: view();
    animation-range: 0% 50%;
  }
}

@supports not (animation-timeline: view()) {
  .animate-font-weight-scroll {
    animation: font-weight-scroll 1s ease-out forwards;
  }
}

/* Scroll-driven timeline animations */
@keyframes timeline-reveal {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes progress-fill {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

@keyframes parallax-depth {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-20px);
  }
}

@supports (animation-timeline: view()) {
  .timeline-step {
    animation: timeline-reveal ease-out both;
    animation-timeline: view();
    animation-range: 0% 20%;
  }

  .timeline-step:nth-child(2) {
    animation-timeline: view();
    animation-range: 20% 40%;
  }

  .timeline-step:nth-child(3) {
    animation-timeline: view();
    animation-range: 40% 60%;
  }

  .timeline-parallax {
    animation: parallax-depth linear both;
    animation-timeline: view();
    animation-range: 0% 100%;
  }

  .progress-bar-fill {
    animation: progress-fill linear both;
    animation-timeline: view();
    animation-range: 0% 100%;
  }
}

@supports not (animation-timeline: view()) {
  .timeline-step {
    animation: timeline-reveal 0.6s ease-out forwards;
  }

  .timeline-step:nth-child(2) {
    animation-delay: 0.2s;
  }

  .timeline-step:nth-child(3) {
    animation-delay: 0.4s;
  }
}

/* Sticky timeline step positioning */
.timeline-step-sticky {
  position: sticky;
  top: 20vh;
}

/* Progress indicator styles */
.progress-indicator {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 50;
  background: var(--surface-2);
  border: 1px solid var(--border-subtle);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}

.progress-bar {
  height: 2px;
  background: var(--surface-3);
  border-radius: 1px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress-bar-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 1px;
}

/* Handwritten font accent for personal touches */
.font-handwritten {
  font-family: var(--font-caveat), cursive;
}

```

---

### app/globals.css

```css
@import "tailwindcss";

:root {
  color-scheme: dark;
  
  /* Primitives */
  --blue-500: #0080FF;
  --blue-600: #0060CC;
  --zinc-50: #fafafa;
  --zinc-900: #18181b;
  --zinc-950: #09090b;
  
  /* Semantic tokens - dark mode default */
  --surface-0: #000000;
  --surface-1: #0A0A0A;
  --surface-2: #121212;
  --surface-3: #1E1E1E;
  
  --text-primary: #FFFFFF;
  --text-secondary: #B0B0B0;
  --text-muted: #6B6B6B;
  
  --accent: #0080FF;
  --accent-glow: rgba(0, 128, 255, 0.18);
  
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-accent: rgba(0, 128, 255, 0.30);
  
  /* Legacy HSL values for Tailwind compatibility */
  --background: 0 0% 0%;
  --foreground: 0 0% 100%;
  --card: 220 20% 7%;
  --card-foreground: 0 0% 100%;
  --popover: 220 20% 7%;
  --popover-foreground: 0 0% 100%;
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

.animate-text-reveal-delay-1 {
  animation: text-reveal 800ms ease-out forwards;
  animation-delay: 200ms;
}

.animate-text-reveal-delay-2 {
  animation: text-reveal 800ms ease-out forwards;
  animation-delay: 400ms;
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

/* Fluid typography utilities */
.text-fluid-xl {
  font-size: clamp(1.25rem, 2vw + 0.75rem, 1.5rem);
}

.text-fluid-2xl {
  font-size: clamp(1.5rem, 2.5vw + 0.75rem, 1.875rem);
}

.text-fluid-3xl {
  font-size: clamp(1.875rem, 3vw + 0.75rem, 2.25rem);
}

.text-fluid-4xl {
  font-size: clamp(2.25rem, 4vw + 0.75rem, 3rem);
}

.text-fluid-5xl {
  font-size: clamp(3rem, 5vw + 1rem, 4.5rem);
}

.text-fluid-6xl {
  font-size: clamp(3.75rem, 6vw + 1rem, 6rem);
}

.text-fluid-7xl {
  font-size: clamp(4.5rem, 8vw + 1rem, 7.5rem);
}

.text-fluid-8xl {
  font-size: clamp(5rem, 10vw + 1rem, 9rem);
}

/* Scroll-driven font weight animation */
@keyframes font-weight-scroll {
  0% {
    font-weight: 400;
  }
  100% {
    font-weight: 700;
  }
}

@supports (animation-timeline: view()) {
  .animate-font-weight-scroll {
    animation: font-weight-scroll linear both;
    animation-timeline: view();
    animation-range: 0% 50%;
  }
}

@supports not (animation-timeline: view()) {
  .animate-font-weight-scroll {
    animation: font-weight-scroll 1s ease-out forwards;
  }
}

/* Scroll-driven timeline animations */
@keyframes timeline-reveal {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes progress-fill {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

@keyframes parallax-depth {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-20px);
  }
}

@supports (animation-timeline: view()) {
  .timeline-step {
    animation: timeline-reveal ease-out both;
    animation-timeline: view();
    animation-range: 0% 20%;
  }

  .timeline-step:nth-child(2) {
    animation-timeline: view();
    animation-range: 20% 40%;
  }

  .timeline-step:nth-child(3) {
    animation-timeline: view();
    animation-range: 40% 60%;
  }

  .timeline-parallax {
    animation: parallax-depth linear both;
    animation-timeline: view();
    animation-range: 0% 100%;
  }

  .progress-bar-fill {
    animation: progress-fill linear both;
    animation-timeline: view();
    animation-range: 0% 100%;
  }
}

@supports not (animation-timeline: view()) {
  .timeline-step {
    animation: timeline-reveal 0.6s ease-out forwards;
  }

  .timeline-step:nth-child(2) {
    animation-delay: 0.2s;
  }

  .timeline-step:nth-child(3) {
    animation-delay: 0.4s;
  }
}

/* Sticky timeline step positioning */
.timeline-step-sticky {
  position: sticky;
  top: 20vh;
}

/* Progress indicator styles */
.progress-indicator {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 50;
  background: var(--surface-2);
  border: 1px solid var(--border-subtle);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}

.progress-bar {
  height: 2px;
  background: var(--surface-3);
  border-radius: 1px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress-bar-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 1px;
}

/* Handwritten font accent for personal touches */
.font-handwritten {
  font-family: var(--font-caveat), cursive;
}

```

---

### app/layout.tsx

```tsx
import type { Metadata } from "next";
import { Rajdhani, Orbitron, Inter, Caveat } from "next/font/google";
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

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
      className={`${rajdhani.variable} ${orbitron.variable} ${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

```

---

### app/page.tsx

```tsx
import { Navigation } from "@/components/navigation"
import { HeroSection } from "./sections/HeroSection"
import { CoreServicesSection } from "./sections/CoreServicesSection"
import { PortfolioSection } from "./sections/PortfolioSection"
import { ProcessSection } from "./sections/ProcessSection"
import { MarketingPartnerStripSection } from "./sections/MarketingPartnerStrip"
import { BlogPreviewsSection } from "./sections/BlogPreviewsSection"
import { TrustStatementSection } from "./sections/TrustStatementSection"
import { CTASection } from "./sections/CTASection"
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
        <HeroSection />
        <CoreServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <MarketingPartnerStripSection />
        <BlogPreviewsSection />
        <TrustStatementSection />
        <CTASection />
      </div>
    </>
  )
}

```

---

### app/sections/BlogPreviewsSection.tsx

```tsx
import { Card } from "@agency/ui"
import { AnimateOnScroll } from "@agency/ui"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"
import { blogPosts } from "../data/blogPosts"

export function BlogPreviewsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Latest Insights</h2>
          <p className="text-gray-400 mb-12 font-inter max-w-3xl">
            Practical advice for growing your business without the fluff.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <AnimateOnScroll key={index} delay={index * 100}>
              <Card className="bg-[var(--surface-2)] border border-white/10 p-6 hover:border-[var(--accent)] transition-colors rounded-2xl">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 font-rajdhani line-clamp-2">{post.title}</h3>
                <p className="text-gray-400 text-sm mb-4 font-inter line-clamp-3">{post.excerpt}</p>
                <Link href="/blog" className="text-[var(--accent)] hover:text-[var(--accent)]/80 text-sm font-medium inline-flex items-center">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

```

---

### app/sections/CTASection.tsx

```tsx
import { Button } from "@agency/ui"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-black to-[var(--accent)]/20">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Ready to Grow Your Business?</h2>
        <p className="text-xl text-gray-400 mb-8 font-inter">
          Let's talk about how we can help you build a marketing engine that actually works.
        </p>
        <Link href="/contact">
          <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base px-8">
            Book Your Free Strategy Call
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}

```

---

### app/sections/CoreServicesSection.tsx

```tsx
import { Card } from "@agency/ui"
import { AnimateOnScroll } from "@agency/ui"
import { coreServices } from "../data/coreServices"

export function CoreServicesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Core Services</h2>
          <p className="text-gray-400 mb-12 font-inter max-w-3xl">
            Everything you need to grow your business online, integrated into one cohesive system.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreServices.map((service, index) => (
            <AnimateOnScroll key={index} delay={index * 100}>
              <Card className="bg-[var(--surface-2)] border border-white/10 p-6 hover:border-[var(--accent)] transition-colors rounded-2xl">
                <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <h3 className="text-lg font-bold mb-2 font-rajdhani">{service.title}</h3>
                <p className="text-gray-400 text-sm font-inter">{service.description}</p>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

```

---

### app/sections/HeroSection.tsx

```tsx
import { HeroText } from "@/components/hero-text"
import { HeroSceneWrapper } from "@/components/hero-scene-wrapper"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-linear-to-br from-black via-[var(--surface-3)] to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,128,255,0.15),transparent_50%)]" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <HeroText />
          </div>
          <div className="relative h-[500px] md:h-[600px]">
            <HeroSceneWrapper />
          </div>
        </div>
      </div>
    </section>
  )
}

```

---

### app/sections/MarketingPartnerStrip.tsx

```tsx
import { MarketingPartnerStrip } from "@/components/marketing-partner-strip"

export function MarketingPartnerStripSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
      <div className="container mx-auto max-w-6xl">
        <MarketingPartnerStrip />
      </div>
    </section>
  )
}

```

---

### app/sections/PortfolioSection.tsx

```tsx
import { Card } from "@agency/ui"
import { AnimateOnScroll } from "@agency/ui"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { portfolioItems } from "../data/portfolioItems"

export function PortfolioSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
      <div className="container mx-auto max-w-6xl">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Recent Work</h2>
          <p className="text-gray-400 mb-12 font-inter max-w-3xl">
            Real results for real businesses. Every project is custom-built from strategy, not templates.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <AnimateOnScroll key={index} delay={index * 100}>
              <Card className="bg-black border border-white/10 p-6 hover:border-[var(--accent)] transition-colors rounded-2xl">
                <div className="text-sm text-[var(--accent)] font-medium mb-2">{item.industry}</div>
                <h3 className="text-xl font-bold mb-2 font-rajdhani">{item.name}</h3>
                <div className="text-2xl font-bold text-[var(--accent)] mb-3 font-rajdhani">{item.result}</div>
                <p className="text-gray-400 text-sm mb-4 font-inter">{item.description}</p>
                <Link href="/work" className="text-[var(--accent)] hover:text-[var(--accent)]/80 text-sm font-medium inline-flex items-center">
                  View Case Study <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

```

---

### app/sections/ProcessSection.tsx

```tsx
import { Card } from "@agency/ui"
import { AnimateOnScroll } from "@agency/ui"
import { processSteps } from "../data/processSteps"

export function ProcessSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Our Process</h2>
          <p className="text-gray-400 mb-12 font-inter max-w-3xl">
            A proven methodology that delivers results, not just deliverables.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <AnimateOnScroll key={index} delay={index * 100}>
              <Card className="bg-[var(--surface-2)] border border-white/10 p-8 hover:border-[var(--accent)] transition-colors rounded-2xl">
                <div className="h-16 w-16 rounded-full bg-[var(--accent)] flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-2xl font-orbitron">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 font-rajdhani">{step.title}</h3>
                <p className="text-gray-400 font-inter">{step.description}</p>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

```

---

### app/sections/TrustStatementSection.tsx

```tsx
import { Card } from "@agency/ui"
import { Shield, CheckCircle2, FileCheck, Search, User, Award } from "lucide-react"

export function TrustStatementSection() {
  const trustPoints = [
    {
      icon: Shield,
      title: "Radical Transparency",
      description: "You'll always know what we're doing, why we're doing it, and what it costs."
    },
    {
      icon: FileCheck,
      title: "You Own Everything",
      description: "Your website, your data, your brand assets—they belong to you, period."
    },
    {
      icon: Search,
      title: "Metrics That Matter",
      description: "We report on leads, sales, and customer value—not vanity metrics."
    },
    {
      icon: User,
      title: "One Person, Full Accountability",
      description: "You work directly with me—the founder and strategist."
    }
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">Why Work With Us</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {trustPoints.map((point, index) => (
            <Card key={index} className="bg-black border border-white/10 p-6 hover:border-[var(--accent)] transition-colors rounded-2xl">
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <point.icon className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-rajdhani">{point.title}</h3>
              <p className="text-gray-400 text-sm font-inter">{point.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

```

---

### app/services/layout.tsx

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

### app/services/page.tsx

```tsx
"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "./sections/HeroSection"
import { WebDesignSection } from "./sections/WebDesignSection"
import { PricingSection } from "./sections/PricingSection"
import { FAQSection } from "./sections/FAQSection"
import { AddOnsSection } from "./sections/AddOnsSection"
import { AntiAgencySection } from "./sections/AntiAgencySection"
import { CTASection } from "./sections/CTASection"
import { useState } from "react"

export default function ServicesPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [expandedFeatures, setExpandedFeatures] = useState<{ [key: string]: boolean }>({})
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const toggleFeatures = (tier: string) => {
    setExpandedFeatures(prev => ({ ...prev, [tier]: !prev[tier] }))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />
      <WebDesignSection />
      
      {/* Monthly/Annual Toggle */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-12 mb-12">
        <div className="flex items-center justify-center">
          <div className="bg-black border border-white/10 rounded-full p-1 flex items-center">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !isAnnual
                  ? 'bg-[var(--accent)] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                isAnnual
                  ? 'bg-[var(--accent)] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual
              <span className="ml-1 text-xs opacity-75">(Save 20%)</span>
            </button>
          </div>
        </div>
      </div>

      <PricingSection 
        isAnnual={isAnnual} 
        expandedFeatures={expandedFeatures} 
        toggleFeatures={toggleFeatures} 
      />
      <FAQSection />
      <AddOnsSection 
        hoveredCard={hoveredCard} 
        setHoveredCard={setHoveredCard} 
      />
      <AntiAgencySection />
      <CTASection />
    </div>
  )
}

```

---

### app/services/sections/AddOnsSection.tsx

```tsx
import { Card } from "@agency/ui"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { addOns } from "../data/addOns"

interface AddOnsSectionProps {
  hoveredCard: string | null
  setHoveredCard: (card: string | null) => void
}

export function AddOnsSection({ hoveredCard, setHoveredCard }: AddOnsSectionProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Need Something Specific? Choose À La Carte.</h2>
        <p className="text-gray-400 mb-12 font-inter max-w-3xl">
          Already have a website? Just need CRM help or social management? No problem. All services are available as standalone engagements.
        </p>

        <div className="grid md:grid-cols-2 md:grid-rows-4 gap-6">
          {addOns.map((addOn) => (
            <Card
              key={addOn.id}
              className={`bg-[var(--surface-2)] border border-white/10 p-6 hover:border-[var(--accent)] transition-all duration-300 ${addOn.span} group`}
              onMouseEnter={() => setHoveredCard(addOn.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <addOn.icon className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold font-rajdhani">{addOn.title}</h3>
                {addOn.badge && (
                  <span className="text-xs bg-[var(--accent)]/20 text-[var(--accent)] px-2 py-0.5 rounded-full">{addOn.badge}</span>
                )}
              </div>
              <p className="text-gray-400 text-sm mb-4 font-inter">{addOn.description}</p>
              <div className={`overflow-hidden transition-all duration-300 ${hoveredCard === addOn.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-500 text-xs mb-3">{addOn.details}</p>
              </div>
              <Link href="/contact" className="text-[var(--accent)] hover:text-[var(--accent)]/80 text-sm font-medium">
                I'm interested <ArrowRight className="inline ml-1 h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

```

---

### app/services/sections/AntiAgencySection.tsx

```tsx
import { Card } from "@agency/ui"
import { antiAgencyPoints } from "../data/antiAgencyPoints"

export function AntiAgencySection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-[var(--surface-2)] border-l-4 border-l-[var(--accent)] border-y border-r border-white/10 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 font-orbitron">Why Work With Me — The Anti-Agency Difference</h2>
          <div className="space-y-6">
            {antiAgencyPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                  <point.icon className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-rajdhani">{point.title}</h3>
                  <p className="text-gray-400 font-inter">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}

```

---

### app/services/sections/CTASection.tsx

```tsx
import { Button } from "@agency/ui"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-[var(--accent)]/20">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Your Website Should Be Your Best Salesperson. Let's Make It Happen.</h2>
        <p className="text-xl text-gray-400 mb-8 font-inter">
          No confusing packages, no hidden fees, no pressure. Just a transparent conversation about how we can grow your business together.
        </p>
        <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base px-8 mb-4">
          Book Your Free Strategy Call
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <p className="text-gray-400 text-sm font-inter">
          Or send me a message directly — I'll reply personally.
        </p>
      </div>
    </section>
  )
}

```

---

### app/services/sections/FAQSection.tsx

```tsx
import { ChevronDown } from "lucide-react"
import * as Accordion from "@radix-ui/react-accordion"
import { AnimateOnScroll } from "@agency/ui"
import { faqs } from "../data/faqs"

export function FAQSection() {
  return (
    <div className="mt-24">
      <AnimateOnScroll>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Frequently Asked Questions</h2>
        <p className="text-gray-400 mb-12 font-inter">Common questions about pricing and packages</p>
      </AnimateOnScroll>

      <Accordion.Root type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <Accordion.Item key={index} value={`item-${index}`} className="bg-black border border-white/10 rounded-lg">
            <Accordion.Trigger className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors focus:outline-none">
              <span className="font-semibold font-rajdhani">{faq.question}</span>
              <ChevronDown className="h-5 w-5 text-[var(--accent)] transition-transform duration-200 data-[state=open]:rotate-180" />
            </Accordion.Trigger>
            <Accordion.Content className="px-6 pb-6 pt-0">
              <p className="text-gray-400 font-inter">{faq.answer}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  )
}

```

---

### app/services/sections/HeroSection.tsx

```tsx
import { Button } from "@agency/ui"
import { ArrowRight } from "lucide-react"
import { AnimateOnScroll } from "@agency/ui"

export function HeroSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[var(--surface-3)] to-black">
      <div className="container mx-auto max-w-4xl text-center">
        <AnimateOnScroll>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-orbitron leading-tight">
            A Complete Marketing Operating System,<br />
            <span className="text-[var(--accent)]">Built Around Your Website.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 font-inter max-w-3xl mx-auto">
            Your website is the hub. Everything else—SEO, content, social, email, ads, CRM—connects back to it. We build, launch, and orchestrate it all so you don't have to juggle five different vendors.
          </p>
          <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base px-8">
            Book a Free Strategy Call
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

```

---

### app/services/sections/PricingSection.tsx

```tsx
import { Card, Button } from "@agency/ui"
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { pricingTiers } from "../data/pricingTiers"
import { AnimateOnScroll } from "@agency/ui"

interface PricingSectionProps {
  isAnnual: boolean
  expandedFeatures: { [key: string]: boolean }
  toggleFeatures: (tier: string) => void
}

export function PricingSection({ isAnnual, expandedFeatures, toggleFeatures }: PricingSectionProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
      <div className="container mx-auto max-w-6xl">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Full-Service Partnership Packages</h2>
          <p className="text-gray-400 mb-8 font-inter max-w-3xl">
            For businesses that want a dedicated marketing team without the overhead. One partner, one invoice, no finger-pointing.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <AnimateOnScroll key={tier.id} delay={index * 100}>
              <Card className={`bg-black border border-white/10 p-8 hover:border-[var(--accent)] transition-colors ${tier.popular ? 'border-2 border-[var(--accent)] relative ring-2 ring-[var(--accent)] transform md:-translate-y-4' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 font-rajdhani">{tier.name}</h3>
                <p className="text-[var(--accent)] font-medium mb-6">{tier.subtitle}</p>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => toggleFeatures(tier.id)}
                  className="text-[var(--accent)] text-sm font-medium mb-6 hover:text-[var(--accent)]/80 flex items-center"
                >
                  {expandedFeatures[tier.id] ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      View all features
                    </>
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedFeatures[tier.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="space-y-3 mb-6">
                    {tier.expandedFeatures.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6">
                  <p className="text-2xl font-bold font-rajdhani">
                    Starting at ${isAnnual ? '____' : '____'}/month
                  </p>
                  <p className="text-xs text-gray-400">after initial build fee</p>
                </div>
                <Link href="/contact">
                  <Button variant={tier.popular ? "default" : "outline"} className={`w-full ${tier.popular ? 'bg-[var(--accent)] hover:bg-[var(--accent)]/90' : 'border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white'}`}>
                    Book a Free Consultation
                  </Button>
                </Link>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

```

---

### app/services/sections/WebDesignSection.tsx

```tsx
import { Card, Button } from "@agency/ui"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { webDesignFeatures, webDesignProcess, webDesignDeliverables } from "../data/webDesignFeatures"

export function WebDesignSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">The Core: Custom Web Design That Drives Growth</h2>
        <p className="text-gray-400 mb-12 font-inter max-w-3xl">
          A conversion-focused, mobile-first, and fully owned website is not a cost—it's an asset that compounds over time. We design and build sites that reflect your brand, respect your customers' privacy, and turn visitors into leads and buyers.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {webDesignFeatures.map((feature, index) => (
            <Card key={index} className={`bg-[var(--surface-2)] border border-white/10 p-6 rounded-2xl hover:border-[var(--accent)] transition-colors ${feature.span}`}>
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-rajdhani">{feature.title}</h3>
              <p className="text-gray-400 font-inter">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-bold mb-6 font-rajdhani">Our Process</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {webDesignProcess.map((step, index) => (
              <Card key={index} className="bg-[var(--surface-2)] border border-white/10 p-4 rounded-2xl hover:border-[var(--accent)] transition-colors">
                <div className="h-8 w-8 rounded-full bg-[var(--accent)] flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-sm">{step.step}</span>
                </div>
                <h4 className="font-semibold mb-1 font-rajdhani">{step.title}</h4>
                <p className="text-sm text-gray-400 font-inter">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-[var(--surface-2)] border border-white/10 p-6 mb-8 rounded-2xl hover:border-[var(--accent)] transition-colors">
          <h3 className="text-xl font-bold mb-4 font-rajdhani">Deliverables</h3>
          <ul className="space-y-2">
            {webDesignDeliverables.map((deliverable, index) => (
              <li key={index} className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-[var(--accent)]" />
                <span className="text-gray-300">{deliverable}</span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/work">
            <Button variant="outline" className="border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white">
              See Our Work <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button className="bg-[var(--accent)] hover:bg-[var(--accent)]/90">
              Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

```

---

### app/work/layout.tsx

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

### app/work/page.tsx

```tsx
"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "./sections/HeroSection"
import { FilterSection } from "./sections/FilterSection"
import { ProjectGridSection } from "./sections/ProjectGridSection"
import { FeaturedCaseStudySection } from "./sections/FeaturedCaseStudySection"
import { ProcessSection } from "./sections/ProcessSection"
import { TestimonialSection } from "./sections/TestimonialSection"
import { CTASection } from "./sections/CTASection"
import { useState } from "react"
import { projects } from "./data/projects"

export default function WorkPage() {
  const [industryFilter, setIndustryFilter] = useState("All")
  const [serviceFilter, setServiceFilter] = useState("All")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const filteredProjects = projects.filter(project => {
    const industryMatch = industryFilter === "All" || project.industry === industryFilter
    const serviceMatch = serviceFilter === "All" || project.serviceType === serviceFilter
    return industryMatch && serviceMatch
  })

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />
      <FilterSection 
        industryFilter={industryFilter}
        serviceFilter={serviceFilter}
        setIndustryFilter={setIndustryFilter}
        setServiceFilter={setServiceFilter}
        filteredCount={filteredProjects.length}
      />
      <ProjectGridSection 
        filteredProjects={filteredProjects}
        hoveredProject={hoveredProject}
        setHoveredProject={setHoveredProject}
      />
      <FeaturedCaseStudySection />
      <ProcessSection />
      <TestimonialSection />
      <CTASection />
    </div>
  )
}

```

---

### app/work/sections/CTASection.tsx

```tsx
import { Button } from "@agency/ui"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-[var(--accent)]/20">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">See a Project You Like? Let's Build Yours.</h2>
        <p className="text-xl text-gray-400 mb-8 font-inter">
          Every business deserves a website that works as hard as they do. Let's talk about yours. Free 30-minute consultation, no pressure.
        </p>
        <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base px-8 mb-4">
          Book Your Free Strategy Call
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <p className="text-gray-400 text-sm font-inter">
          Or chat with me now — I'm real, and I'll answer.
        </p>
      </div>
    </section>
  )
}

```

---

### app/work/sections/FeaturedCaseStudySection.tsx

```tsx
import { Card, CardContent, Button } from "@agency/ui"
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react"
import Link from "next/link"

export function FeaturedCaseStudySection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="text-[var(--accent)] text-sm font-medium mb-2">Featured Case Study</div>
          <h2 className="text-3xl md:text-4xl font-bold font-orbitron">How We Turned an Outdated Site into a Lead-Generating Engine</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
          {/* Main Content Tile - 2x2 */}
          <Card className="md:col-span-2 md:row-span-2 bg-black border border-white/10 rounded-2xl overflow-hidden">
            <CardContent className="p-0 h-full flex flex-col">
              <div className="h-64 bg-gradient-to-br from-[var(--surface-3)] to-[var(--surface-2)] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl font-bold text-[var(--accent)]/20 font-orbitron mb-2">DP</div>
                  <div className="text-sm text-gray-500 font-inter">Dental Practice</div>
                </div>
              </div>
              <div className="p-8 flex-grow">
                <p className="text-gray-400 mb-6 font-inter text-lg">
                  A complete rebuild of a dental practice website that transformed their online presence from invisible to industry leader.
                </p>
                <div className="flex gap-4">
                  <Link href="/demo/day-care">
                    <Button className="bg-[var(--accent)] hover:bg-[var(--accent)]/90">
                      Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <a
                    href="https://demo.example.com/dental"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white">
                      See Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stat Tile 1 - 1x1 */}
          <Card className="bg-black border border-white/10 rounded-2xl p-6 hover:border-[var(--accent)] transition-all duration-300">
            <CardContent className="p-0">
              <div className="text-4xl font-bold text-[var(--accent)] mb-2 font-rajdhani">+142%</div>
              <div className="text-gray-400 text-sm font-inter">Mobile Conversion</div>
            </CardContent>
          </Card>

          {/* Stat Tile 2 - 1x1 */}
          <Card className="bg-[var(--surface-3)] border border-white/10 rounded-2xl p-6 hover:border-[var(--accent)] transition-all duration-300">
            <CardContent className="p-0">
              <div className="text-4xl font-bold text-[var(--accent)] mb-2 font-rajdhani">+85%</div>
              <div className="text-gray-400 text-sm font-inter">Form Conversions</div>
            </CardContent>
          </Card>

          {/* Stat Tile 3 - 1x1 */}
          <Card className="bg-black border border-white/10 rounded-2xl p-6 hover:border-[var(--accent)] transition-all duration-300">
            <CardContent className="p-0">
              <div className="text-4xl font-bold text-[var(--accent)] mb-2 font-rajdhani">5</div>
              <div className="text-gray-400 text-sm font-inter">First-Page Rankings</div>
            </CardContent>
          </Card>

          {/* Testimonial Tile - 1x1 */}
          <Card className="md:col-span-1 bg-black border-l-4 border-l-[var(--accent)] border-y border-r border-white/10 rounded-2xl p-6">
            <CardContent className="p-0">
              <div className="text-gray-300 font-inter text-sm mb-4 italic">
                "The new site has completely transformed how we attract new patients. We're booking more appointments than ever before."
              </div>
              <div className="text-[var(--accent)] text-xs font-medium">— Dr. Sarah Mitchell, Practice Owner</div>
            </CardContent>
          </Card>

          {/* Key Learnings Tile - 1x1 */}
          <Card className="md:col-span-2 bg-[var(--surface-3)] border border-white/10 rounded-2xl p-6">
            <CardContent className="p-0">
              <div className="text-[var(--accent)] text-sm font-medium mb-3 font-rajdhani">Key Learnings</div>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <Sparkles className="h-4 w-4 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 text-sm font-inter">Mobile-first design is non-negotiable for healthcare</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Sparkles className="h-4 w-4 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 text-sm font-inter">Trust signals (reviews, credentials) drive conversions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Sparkles className="h-4 w-4 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 text-sm font-inter">Local SEO dominates for service-based businesses</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

```

---

### app/work/sections/FilterSection.tsx

```tsx
import { industries, serviceTypes } from "../data/projects"

interface FilterSectionProps {
  industryFilter: string
  serviceFilter: string
  setIndustryFilter: (filter: string) => void
  setServiceFilter: (filter: string) => void
  filteredCount: number
}

export function FilterSection({ industryFilter, serviceFilter, setIndustryFilter, setServiceFilter, filteredCount }: FilterSectionProps) {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-black border-b border-white/10 sticky top-16 z-40">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-3 font-inter">Industry</p>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setIndustryFilter(industry)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    industryFilter === industry
                      ? "bg-[var(--accent)] text-white shadow-[0_0_20px_rgba(0,128,255,0.3)]"
                      : "bg-[var(--surface-2)] border border-white/10 text-gray-400 hover:border-[var(--accent)] hover:bg-(--surface-3)"
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    serviceFilter === service
                      ? "bg-[var(--accent)] text-white shadow-[0_0_20px_rgba(0,128,255,0.3)]"
                      : "bg-[var(--surface-2)] border border-white/10 text-gray-400 hover:border-[var(--accent)] hover:bg-(--surface-3)"
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500 font-inter">
          {filteredCount} project{filteredCount !== 1 ? 's' : ''}
        </div>
      </div>
    </section>
  )
}

```

---

### app/work/sections/HeroSection.tsx

```tsx
import { AnimateOnScroll } from "@agency/ui"

export function HeroSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[var(--surface-3)] to-black">
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
  )
}

```

---

### app/work/sections/ProcessSection.tsx

```tsx
import { Card, Button } from "@agency/ui"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { processSteps } from "../data/processSteps"

export function ProcessSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">From Demo to Your Business: The Same Rigor, Applied to You.</h2>
        <p className="text-gray-400 mb-12 font-inter max-w-3xl">
          The same strategic process that built these demos will build your website.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {processSteps.map((step, index) => (
            <Card key={index} className="bg-[var(--surface-2)] border border-white/10 p-6">
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <step.icon className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-rajdhani">{step.title}</h3>
              <p className="text-gray-400 font-inter">{step.description}</p>
            </Card>
          ))}
        </div>

        <Link href="/contact">
          <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base px-8">
            Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}

```

---

### app/work/sections/ProjectGridSection.tsx

```tsx
import { Card, CardContent, Button } from "@agency/ui"
import { ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import { AnimateOnScroll } from "@agency/ui"
import { projects } from "../data/projects"

interface ProjectGridSectionProps {
  filteredProjects: typeof projects
  hoveredProject: number | null
  setHoveredProject: (id: number | null) => void
}

export function ProjectGridSection({ filteredProjects, hoveredProject, setHoveredProject }: ProjectGridSectionProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6">
          {filteredProjects.map((project, index) => {
            const isFeatured = index === 0
            const isLarge = index === 0 || index === 3
            const isWide = index === 1 || index === 4
            const isTall = index === 2 || index === 5
            
            return (
              <AnimateOnScroll key={project.id} delay={index * 80}>
                <Card
                  className={`
                    bg-[var(--surface-2)] border border-white/10 rounded-2xl
                    hover:border-[var(--accent)] transition-all duration-300
                    hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,128,255,0.12)]
                    h-full overflow-hidden relative group timeline-parallax
                    ${isFeatured ? 'md:col-span-2 md:row-span-2 ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-black' : ''}
                    ${isLarge && !isFeatured ? 'md:col-span-2 md:row-span-2' : ''}
                    ${isWide ? 'md:col-span-2 md:row-span-1' : ''}
                    ${isTall ? 'md:col-span-1 md:row-span-2' : ''}
                  `}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {isFeatured && (
                    <div className="absolute top-4 left-4 z-10 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_20px_rgba(0,128,255,0.5)]">
                      Featured
                    </div>
                  )}
                  <CardContent className="p-0 h-full flex flex-col">
                    <div 
                      className={`
                        relative overflow-hidden rounded-t-lg
                        ${isFeatured ? 'h-64' : isTall ? 'h-48' : 'h-40'}
                        bg-gradient-to-br from-[var(--surface-3)] to-[var(--surface-2)]
                      `}
                    >
                      <div 
                        className={`
                          absolute inset-0 flex items-center justify-center
                          transition-transform duration-500 ease-out
                          ${hoveredProject === project.id ? 'scale-110' : 'scale-100'}
                        `}
                      >
                        <div className="text-center">
                          <div className="text-6xl font-bold text-[var(--accent)]/20 font-orbitron mb-2">
                            {project.industry.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="text-sm text-gray-500 font-inter">{project.serviceType}</div>
                        </div>
                      </div>
                      <div 
                        className={`
                          absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                          transition-opacity duration-300
                          ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}
                        `}
                      />
                      <div 
                        className={`
                          absolute bottom-0 left-0 right-0 p-4
                          transform transition-transform duration-300
                          ${hoveredProject === project.id ? 'translate-y-0' : 'translate-y-full'}
                        `}
                      >
                        <div className="text-[var(--accent)] text-xs font-medium mb-1">{project.industry}</div>
                        <h3 className="text-lg font-bold font-rajdhani text-white">{project.name}</h3>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-2xl font-bold text-[var(--accent)] mb-3 font-rajdhani">{project.stat}</div>
                      <p className="text-gray-400 text-sm mb-6 font-inter flex-grow">{project.blurb}</p>
                      <div className="flex flex-col gap-2">
                        <Link href={project.href}>
                          <Button variant="outline" className="w-full border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white">
                            View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                        <a
                          href={project.demoHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center text-sm text-gray-400 hover:text-[var(--accent)] transition-colors"
                        >
                          See Live Site <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}

```

---

### app/work/sections/TestimonialSection.tsx

```tsx
import { Card } from "@agency/ui"

export function TestimonialSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-black border-l-4 border-l-[var(--accent)] border-y border-r border-white/10 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 font-orbitron">Building Our Success Stories</h2>
          <p className="text-gray-300 font-inter leading-relaxed">
            We're building our library of client success stories right now. In the meantime, the demos above represent the same strategic rigor and design quality you'll receive. Want to be our first case study? Let's make it a good one.
          </p>
        </Card>
      </div>
    </section>
  )
}

```

---

### components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}

```

---

### components/hero-scene-wrapper.tsx

```tsx
'use client'

import dynamic from 'next/dynamic'
import React, { Suspense, useEffect, useState } from 'react'

const HeroScene = dynamic(() => import('./hero-scene'), {
  ssr: false,
})

function HeroSceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <p className="text-sm text-gray-400">Loading 3D experience...</p>
      </div>
    </div>
  )
}

function HeroSceneError({ error }: { error: Error }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-black via-[var(--surface-1)] to-black">
      <div className="text-center">
        <p className="text-sm text-gray-400">
          3D content unavailable. Please refresh or contact support.
        </p>
      </div>
    </div>
  )
}

class HeroSceneErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return <HeroSceneError error={this.state.error} />
    }
    return this.props.children
  }
}

export function HeroSceneWrapper() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  if (prefersReducedMotion) {
    return (
      <div
        className="absolute inset-0 bg-linear-to-br from-black via-[var(--surface-1)] to-black"
        aria-label="Animated 3D particle field disabled for reduced motion preference"
      />
    )
  }

  return (
    <HeroSceneErrorBoundary>
      <Suspense fallback={<HeroSceneFallback />}>
        <HeroScene />
      </Suspense>
    </HeroSceneErrorBoundary>
  )
}

```

---

### components/hero-scene.tsx

```tsx
'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 600
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return pos
  }, [])

  useFrame((_, delta) => {
    pointsRef.current.rotation.y += delta * 0.08
    pointsRef.current.rotation.x += delta * 0.03
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
        size={0.04}
        color="#0080FF"
        sizeAttenuation
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function MorphingCore() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * 0.15
    meshRef.current.rotation.x += delta * 0.05
  })

  return (
    <Float speed={1.0} rotationIntensity={0.25} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.0, 1]} />
        <MeshDistortMaterial
          color="#0080FF"
          emissive="#0060CC"
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.1}
          distort={0.2}
          speed={1.5}
          wireframe
        />
      </mesh>
    </Float>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10" aria-label="Interactive 3D particle field with morphing geometric core">
      <Canvas
        camera={{ position: [0, -0.2, 3.8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          alpha: true
        }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.25} />
        <pointLight position={[5, 5, 5]} intensity={0.9} color="#0080FF" />
        <pointLight position={[-3, -2, 3]} intensity={0.4} color="#004499" />
        <ParticleField />
        <MorphingCore />
      </Canvas>
    </div>
  )
}

```

---

### components/hero-text.tsx

```tsx
import Link from 'next/link'

export function HeroText() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center px-4 pt-32 pb-20 w-full">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight animate-text-reveal">
          <div className="overflow-hidden">
            <span className="block">Web Design That Builds Your Business</span>
          </div>
          <div className="overflow-hidden">
            <span className="block text-2xl md:text-3xl lg:text-4xl text-[var(--accent)]">—Without the Agency Nonsense.</span>
          </div>
        </h1>
        <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto">
          Custom websites, transparent SEO, and analytics tied to your revenue.
          No generic AI fluff, no vanity metrics, no creepy tracking.
          Just a dedicated marketer in your corner.
        </p>
        <div className="flex gap-4 justify-center pt-4 flex-wrap">
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white rounded-lg font-medium transition-all hover:shadow-[0_0_28px_rgba(0,128,255,0.45)] active:scale-[0.97]">
            Start With a Free Consultation
          </Link>
          <Link href="#work" className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-subtle)] hover:border-[var(--accent)] text-white rounded-lg font-medium transition-all opacity-80 hover:opacity-100">
            See Real Work, Real Results
          </Link>
        </div>
      </div>
    </div>
  )
}

```

---

### components/marketing-partner-strip.tsx

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
    <section ref={parallaxRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)] overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">Beyond the Build: A Complete Marketing Partner.</h2>
        </AnimateOnScroll>
        
        <motion.div style={{ x }} className="flex gap-8 justify-center flex-wrap mt-12">
          <div className="flex flex-col items-center text-center">
            <Palette className="h-8 w-8 text-[var(--accent)] mb-2" />
            <span className="text-xs font-medium">Brand Identity</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <FileText className="h-8 w-8 text-[var(--accent)] mb-2" />
            <span className="text-xs font-medium">Blog & Resources</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Mail className="h-8 w-8 text-[var(--accent)] mb-2" />
            <span className="text-xs font-medium">Email Marketing</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Share2 className="h-8 w-8 text-[var(--accent)] mb-2" />
            <span className="text-xs font-medium">Social Media</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Users className="h-8 w-8 text-[var(--accent)] mb-2" />
            <span className="text-xs font-medium">CRM Management</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <CreditCard className="h-8 w-8 text-[var(--accent)] mb-2" />
            <span className="text-xs font-medium">PPC & Paid Media</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Search className="h-8 w-8 text-[var(--accent)] mb-2" />
            <span className="text-xs font-medium">SEO & AIEO</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <TrendingUp className="h-8 w-8 text-[var(--accent)] mb-2" />
            <span className="text-xs font-medium">Analytics & CRO</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Shield className="h-8 w-8 text-[var(--accent)] mb-2" />
            <span className="text-xs font-medium">Reputation</span>
          </div>
        </motion.div>

        <div className="text-center mt-8">
          <a href="/services" className="text-[var(--accent)] hover:text-[var(--accent)]/80 text-sm font-medium">
            Explore all services
          </a>
        </div>
      </div>
    </section>
  )
}

```

---

### components/navigation.tsx

```tsx
'use client'

import { Menu, X, Zap } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null)
  const lastMenuItemRef = useRef<HTMLAnchorElement>(null)

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Focus management
  useEffect(() => {
    if (isMobileMenuOpen) {
      firstMenuItemRef.current?.focus()
    } else {
      menuButtonRef.current?.focus()
    }
  }, [isMobileMenuOpen])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsMobileMenuOpen(false)
    }
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstMenuItemRef.current) {
        e.preventDefault()
        lastMenuItemRef.current?.focus()
      } else if (!e.shiftKey && document.activeElement === lastMenuItemRef.current) {
        e.preventDefault()
        firstMenuItemRef.current?.focus()
      }
    }
  }

  return (
    <nav className="sticky top-0 z-50 h-16
      bg-[rgba(0,0,0,0.72)] 
      backdrop-blur-[20px] backdrop-saturate-200
      border-b border-[var(--border-subtle)]
      transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex h-full items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold font-rajdhani">Your Dedicated Marketer</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: 'Portfolio', href: '/work' },
              { label: 'About', href: '/about' },
              { label: 'Blog', href: '/blog' },
              { label: 'Contact', href: '/contact' }
            ].map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--accent)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
          <button
            ref={menuButtonRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-white/10 transition-colors"
            aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white text-sm font-medium rounded-lg transition-all hover:shadow-[0_0_20px_rgba(0,128,255,0.35)]"
          >
            Book Consultation
          </Link>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-[var(--surface-2)] backdrop-blur-xl border-l border-white/10 z-50 md:hidden transform transition-transform duration-300 ease-in-out"
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 id="mobile-menu-title" className="text-xl font-bold font-rajdhani text-white">
                  Menu
                </h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center p-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex-1 space-y-2">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Services', href: '/services' },
                  { label: 'Portfolio', href: '/work' },
                  { label: 'About', href: '/about' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'Contact', href: '/contact' }
                ].map((item, index) => {
                  const isActive = pathname === item.href
                  const isFirst = index === 0
                  const isLast = index === 5
                  return (
                    <Link
                      key={item.href}
                      ref={isFirst ? firstMenuItemRef : isLast ? lastMenuItemRef : undefined}
                      href={item.href}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-[var(--accent)]/20 text-[var(--accent)]'
                          : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-white'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white text-sm font-medium rounded-lg transition-all hover:shadow-[0_0_20px_rgba(0,128,255,0.35)]"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}

```

---

## Summary

- **Total UI Files:** 63
- **Configuration:** 63 files
