"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Layout, Zap, Shield, CheckCircle2, Palette, FileText, Mail, Share2, Users, CreditCard, Search, TrendingUp, MessageSquare, Globe, BarChart3, Megaphone, Sparkles, ChevronDown, ChevronUp, User, Lock, Bot, FileCheck } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { AnimateOnScroll } from "@agency/ui"
import * as Accordion from "@radix-ui/react-accordion"
import { useState } from "react"

export default function ServicesPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [expandedFeatures, setExpandedFeatures] = useState<{ [key: string]: boolean }>({})
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const toggleFeatures = (tier: string) => {
    setExpandedFeatures(prev => ({ ...prev, [tier]: !prev[tier] }))
  }

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

      {/* Section 2: The Core — Website Design & Development */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">The Core: Custom Web Design That Drives Growth</h2>
          <p className="text-gray-400 mb-12 font-inter max-w-3xl">
            A conversion-focused, mobile-first, and fully owned website is not a cost—it's an asset that compounds over time. We design and build sites that reflect your brand, respect your customers' privacy, and turn visitors into leads and buyers.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-[var(--surface-2)] border border-white/10 p-6 rounded-2xl md:col-span-2 hover:border-[var(--accent)] transition-colors">
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <Layout className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-rajdhani">Custom, Not Template-Driven</h3>
              <p className="text-gray-400 font-inter">Every site is built from strategy, not copied from a theme marketplace.</p>
            </Card>

            <Card className="bg-[var(--surface-3)] border border-white/10 p-6 rounded-2xl hover:border-[var(--accent)] transition-colors">
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-rajdhani">Performance-First</h3>
              <p className="text-gray-400 font-inter">Core Web Vitals optimized, sub-2.5s load times, responsive on every device.</p>
            </Card>

            <Card className="bg-[var(--surface-2)] border border-white/10 p-6 rounded-2xl hover:border-[var(--accent)] transition-colors">
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-rajdhani">Human-Led, AI-Enhanced</h3>
              <p className="text-gray-400 font-inter">We use AI to accelerate, but human judgment and empathy drive every decision.</p>
            </Card>

            <Card className="bg-[var(--surface-3)] border border-white/10 p-6 rounded-2xl hover:border-[var(--accent)] transition-colors">
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-rajdhani">You Own Everything</h3>
              <p className="text-gray-400 font-inter">No vendor lock-in, no proprietary black boxes. Your site, your data, 100% yours.</p>
            </Card>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 font-rajdhani">Our Process</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="bg-[var(--surface-2)] border border-white/10 p-4 rounded-2xl hover:border-[var(--accent)] transition-colors">
                <div className="h-8 w-8 rounded-full bg-[var(--accent)] flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <h4 className="font-semibold mb-1 font-rajdhani">Strategy & Discovery</h4>
                <p className="text-sm text-gray-400 font-inter">Goals, audit, metrics</p>
              </Card>
              <Card className="bg-[var(--surface-3)] border border-white/10 p-4 rounded-2xl hover:border-[var(--accent)] transition-colors">
                <div className="h-8 w-8 rounded-full bg-[var(--accent)] flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <h4 className="font-semibold mb-1 font-rajdhani">Wireframes & Design</h4>
                <p className="text-sm text-gray-400 font-inter">Visual concepts, UX</p>
              </Card>
              <Card className="bg-[var(--surface-2)] border border-white/10 p-4 rounded-2xl hover:border-[var(--accent)] transition-colors">
                <div className="h-8 w-8 rounded-full bg-[var(--accent)] flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <h4 className="font-semibold mb-1 font-rajdhani">Development & Launch</h4>
                <p className="text-sm text-gray-400 font-inter">Build, test, deploy</p>
              </Card>
              <Card className="bg-[var(--surface-3)] border border-white/10 p-4 rounded-2xl hover:border-[var(--accent)] transition-colors">
                <div className="h-8 w-8 rounded-full bg-[var(--accent)] flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <h4 className="font-semibold mb-1 font-rajdhani">Post-Launch Optimization</h4>
                <p className="text-sm text-gray-400 font-inter">Monitor, refine, grow</p>
              </Card>
            </div>
          </div>

          <Card className="bg-[var(--surface-2)] border border-white/10 p-6 mb-8 rounded-2xl hover:border-[var(--accent)] transition-colors">
            <h3 className="text-xl font-bold mb-4 font-rajdhani">Deliverables</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-[var(--accent)]" />
                <span className="text-gray-300">Fully responsive, pixel-perfect website</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-[var(--accent)]" />
                <span className="text-gray-300">Brand identity & style guide (if included)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-[var(--accent)]" />
                <span className="text-gray-300">On-page SEO setup (meta, schema, speed)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-[var(--accent)]" />
                <span className="text-gray-300">CMS integration for easy content updates</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-[var(--accent)]" />
                <span className="text-gray-300">Privacy-compliant cookie consent and analytics setup</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-[var(--accent)]" />
                <span className="text-gray-300">30 days of post-launch support</span>
              </li>
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

      {/* Section 3: Tiered Partnership Packages */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
        <div className="container mx-auto max-w-6xl">
          <AnimateOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Full-Service Partnership Packages</h2>
            <p className="text-gray-400 mb-8 font-inter max-w-3xl">
              For businesses that want a dedicated marketing team without the overhead. One partner, one invoice, no finger-pointing.
            </p>
          </AnimateOnScroll>

          {/* Monthly/Annual Toggle */}
          <div className="flex items-center justify-center mb-12">
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

          <div className="grid md:grid-cols-3 gap-8">
            <AnimateOnScroll delay={0}>
              <Card className="bg-black border border-white/10 p-8 hover:border-[var(--accent)] transition-colors">
                <h3 className="text-2xl font-bold mb-2 font-rajdhani">Foundation</h3>
                <p className="text-[var(--accent)] font-medium mb-6">Launch & Establish</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Website design & build (core)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Brand identity kit (basic)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Email & CRM setup (basic)</span>
                  </li>
                </ul>
                <button
                  onClick={() => toggleFeatures('foundation')}
                  className="text-[var(--accent)] text-sm font-medium mb-6 hover:text-[var(--accent)]/80 flex items-center"
                >
                  {expandedFeatures.foundation ? (
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
                    expandedFeatures.foundation ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Monthly blog post (1x)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Quarterly analytics report</span>
                    </li>
                  </ul>
                </div>
                <div className="mb-6">
                  <p className="text-2xl font-bold font-rajdhani">
                    Starting at ${isAnnual ? '____' : '____'}/month
                  </p>
                  <p className="text-xs text-gray-400">after initial build fee</p>
                </div>
                <Link href="/contact">
                  <Button variant="outline" className="w-full border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white">
                    Book a Free Consultation
                  </Button>
                </Link>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll delay={100}>
              <Card className="bg-black border-2 border-[var(--accent)] p-8 relative ring-2 ring-[var(--accent)] transform md:-translate-y-4">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
                <h3 className="text-2xl font-bold mb-2 font-rajdhani">Growth</h3>
                <p className="text-[var(--accent)] font-medium mb-6">Expand Your Reach</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Everything in Foundation, plus:</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">SEO/AIEO ongoing optimization</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Social media (2 platforms, 3 posts/week)</span>
                  </li>
                </ul>
                <button
                  onClick={() => toggleFeatures('growth')}
                  className="text-[var(--accent)] text-sm font-medium mb-6 hover:text-[var(--accent)]/80 flex items-center"
                >
                  {expandedFeatures.growth ? (
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
                    expandedFeatures.growth ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Newsletter design & send (bi-weekly)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Landing pages & lead magnet design</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Monthly performance review call</span>
                    </li>
                  </ul>
                </div>
                <div className="mb-6">
                  <p className="text-2xl font-bold font-rajdhani">
                    Starting at ${isAnnual ? '____' : '____'}/month
                  </p>
                </div>
                <Link href="/contact">
                  <Button className="w-full bg-[var(--accent)] hover:bg-[var(--accent)]/90">
                    Book a Free Consultation
                  </Button>
                </Link>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <Card className="bg-black border border-white/10 p-8 hover:border-[var(--accent)] transition-colors">
                <h3 className="text-2xl font-bold mb-2 font-rajdhani">Scale</h3>
                <p className="text-[var(--accent)] font-medium mb-6">Full-Funnel Domination</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Everything in Growth, plus:</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">PPC / paid media management</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Reputation management & reviews</span>
                  </li>
                </ul>
                <button
                  onClick={() => toggleFeatures('scale')}
                  className="text-[var(--accent)] text-sm font-medium mb-6 hover:text-[var(--accent)]/80 flex items-center"
                >
                  {expandedFeatures.scale ? (
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
                    expandedFeatures.scale ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Advanced CRM automation & lead scoring</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Bi-weekly A/B testing & CRO</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">Dedicated Slack/Teams channel & weekly strategy</span>
                    </li>
                  </ul>
                </div>
                <div className="mb-6">
                  <p className="text-2xl font-bold font-rajdhani">
                    Starting at ${isAnnual ? '____' : '____'}/month
                  </p>
                </div>
                <Link href="/contact">
                  <Button variant="outline" className="w-full border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white">
                    Book a Free Consultation
                  </Button>
                </Link>
              </Card>
            </AnimateOnScroll>
          </div>

          {/* FAQ Section - Moved closer to pricing */}
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
        </div>
      </section>

      {/* Section 4: Modular Add-Ons */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Need Something Specific? Choose À La Carte.</h2>
          <p className="text-gray-400 mb-12 font-inter max-w-3xl">
            Already have a website? Just need CRM help or social management? No problem. All services are available as standalone engagements.
          </p>

          <div className="grid md:grid-cols-2 md:grid-rows-4 gap-6">
            {/* Content Group - 2x1 tile */}
            <Card
              className="bg-[var(--surface-2)] border border-white/10 p-6 hover:border-[var(--accent)] transition-all duration-300 md:col-span-2 md:row-span-1 group"
              onMouseEnter={() => setHoveredCard('content')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold font-rajdhani">Content Suite</h3>
                    <span className="text-xs bg-[var(--accent)]/20 text-[var(--accent)] px-2 py-0.5 rounded-full">2 services</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3 font-inter">Strategy, writing, and publishing that fuels your SEO and authority.</p>
                  <div className={`overflow-hidden transition-all duration-300 ${hoveredCard === 'content' ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-gray-500 text-xs mb-3">Includes: Blog & Resource Management, Newsletter & Email Marketing</p>
                  </div>
                  <Link href="/contact" className="text-[var(--accent)] hover:text-[var(--accent)]/80 text-sm font-medium">
                    I'm interested <ArrowRight className="inline ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>

            {/* Brand Identity - 1x1 tile */}
            <Card
              className="bg-[var(--surface-3)] border border-white/10 p-6 hover:border-[var(--accent)] transition-all duration-300 md:col-span-1 md:row-span-1 group"
              onMouseEnter={() => setHoveredCard('brand')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-rajdhani">Brand Identity & Marketing Kit</h3>
              <p className="text-gray-400 text-sm mb-4 font-inter">From logo systems to presentation templates, get a cohesive visual brand that builds trust.</p>
              <div className={`overflow-hidden transition-all duration-300 ${hoveredCard === 'brand' ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-500 text-xs mb-3">Deliverables: Logo, style guide, templates, brand guidelines</p>
              </div>
              <Link href="/contact" className="text-[var(--accent)] hover:text-[var(--accent)]/80 text-sm font-medium">
                I'm interested <ArrowRight className="inline ml-1 h-4 w-4" />
              </Link>
            </Card>

            {/* Social Media - 1x1 tile */}
            <Card
              className="bg-[var(--surface-2)] border border-white/10 p-6 hover:border-[var(--accent)] transition-all duration-300 md:col-span-1 md:row-span-1 group"
              onMouseEnter={() => setHoveredCard('social')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <Share2 className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-rajdhani">Social Media Management</h3>
              <p className="text-gray-400 text-sm mb-4 font-inter">Done-for-you content creation, scheduling, and engagement on the platforms that matter.</p>
              <div className={`overflow-hidden transition-all duration-300 ${hoveredCard === 'social' ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-500 text-xs mb-3">Platforms: LinkedIn, Twitter/X, Instagram, Facebook</p>
              </div>
              <Link href="/contact" className="text-[var(--accent)] hover:text-[var(--accent)]/80 text-sm font-medium">
                I'm interested <ArrowRight className="inline ml-1 h-4 w-4" />
              </Link>
            </Card>

            {/* Analytics Group - 2x1 tile */}
            <Card
              className="bg-[var(--surface-3)] border border-white/10 p-6 hover:border-[var(--accent)] transition-all duration-300 md:col-span-2 md:row-span-1 group"
              onMouseEnter={() => setHoveredCard('analytics')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold font-rajdhani">Analytics & Optimization</h3>
                    <span className="text-xs bg-[var(--accent)]/20 text-[var(--accent)] px-2 py-0.5 rounded-full">2 services</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3 font-inter">Turn data into decisions; improve what's working and fix what's not.</p>
                  <div className={`overflow-hidden transition-all duration-300 ${hoveredCard === 'analytics' ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-gray-500 text-xs mb-3">Includes: Analytics & CRO, SEO & AIEO</p>
                  </div>
                  <Link href="/contact" className="text-[var(--accent)] hover:text-[var(--accent)]/80 text-sm font-medium">
                    I'm interested <ArrowRight className="inline ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>

            {/* CRM - 1x1 tile */}
            <Card
              className="bg-[var(--surface-2)] border border-white/10 p-6 hover:border-[var(--accent)] transition-all duration-300 md:col-span-1 md:row-span-1 group"
              onMouseEnter={() => setHoveredCard('crm')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-rajdhani">CRM Management</h3>
              <p className="text-gray-400 text-sm mb-4 font-inter">Setup, automation, data hygiene—so your leads never fall through the cracks.</p>
              <div className={`overflow-hidden transition-all duration-300 ${hoveredCard === 'crm' ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-500 text-xs mb-3">Tools: HubSpot, Salesforce, Pipedrive, custom integrations</p>
              </div>
              <Link href="/contact" className="text-[var(--accent)] hover:text-[var(--accent)]/80 text-sm font-medium">
                I'm interested <ArrowRight className="inline ml-1 h-4 w-4" />
              </Link>
            </Card>

            {/* PPC - 1x1 tile */}
            <Card
              className="bg-[var(--surface-3)] border border-white/10 p-6 hover:border-[var(--accent)] transition-all duration-300 md:col-span-1 md:row-span-1 group"
              onMouseEnter={() => setHoveredCard('ppc')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-rajdhani">PPC & Paid Media</h3>
              <p className="text-gray-400 text-sm mb-4 font-inter">Strategic ad buying and optimization tied to real revenue, not just clicks.</p>
              <div className={`overflow-hidden transition-all duration-300 ${hoveredCard === 'ppc' ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-500 text-xs mb-3">Channels: Google Ads, Meta Ads, LinkedIn Ads, retargeting</p>
              </div>
              <Link href="/contact" className="text-[var(--accent)] hover:text-[var(--accent)]/80 text-sm font-medium">
                I'm interested <ArrowRight className="inline ml-1 h-4 w-4" />
              </Link>
            </Card>

            {/* Reputation - 1x2 tile */}
            <Card
              className="bg-[var(--surface-2)] border border-white/10 p-6 hover:border-[var(--accent)] transition-all duration-300 md:col-span-1 md:row-span-2 group"
              onMouseEnter={() => setHoveredCard('reputation')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-rajdhani">Reputation Management</h3>
              <p className="text-gray-400 text-sm mb-4 font-inter">Monitor, manage, and generate reviews that build social proof.</p>
              <div className={`overflow-hidden transition-all duration-300 ${hoveredCard === 'reputation' ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-500 text-xs mb-3">Features: Review monitoring, response management, review generation campaigns, sentiment analysis</p>
              </div>
              <Link href="/contact" className="text-[var(--accent)] hover:text-[var(--accent)]/80 text-sm font-medium">
                I'm interested <ArrowRight className="inline ml-1 h-4 w-4" />
              </Link>
            </Card>

            {/* SEO - 1x1 tile */}
            <Card
              className="bg-[var(--surface-3)] border border-white/10 p-6 hover:border-[var(--accent)] transition-all duration-300 md:col-span-1 md:row-span-1 group"
              onMouseEnter={() => setHoveredCard('seo')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-rajdhani">SEO & AIEO</h3>
              <p className="text-gray-400 text-sm mb-4 font-inter">Organic visibility on Google and AI answer engines—ethical, data-driven, transparent.</p>
              <div className={`overflow-hidden transition-all duration-300 ${hoveredCard === 'seo' ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-500 text-xs mb-3">Focus: Technical SEO, content optimization, AI engine optimization</p>
              </div>
              <Link href="/contact" className="text-[var(--accent)] hover:text-[var(--accent)]/80 text-sm font-medium">
                I'm interested <ArrowRight className="inline ml-1 h-4 w-4" />
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 5: Why Work With Me — The Anti-Agency Difference */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-[var(--surface-2)] border-l-4 border-l-[var(--accent)] border-y border-r border-white/10 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 font-orbitron">Why Work With Me — The Anti-Agency Difference</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                  <User className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-rajdhani">One Person, Full Accountability</h3>
                  <p className="text-gray-400 font-inter">No account managers passing blame. You talk to the person doing the work. Always.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-rajdhani">You Own Your Assets</h3>
                  <p className="text-gray-400 font-inter">Website, CRM data, brand kit—100% yours. No hostage situations. Cancel anytime, take everything with you.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-rajdhani">Human-Led, Not AI-Generated</h3>
                  <p className="text-gray-400 font-inter">AI speeds up research and production, but every strategy, design, and piece of content is crafted with human judgment and empathy.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                  <FileCheck className="h-6 w-6 text-[var(--accent)]" />
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


      {/* Section 7: Final CTA */}
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
    </div>
  )
}
