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
