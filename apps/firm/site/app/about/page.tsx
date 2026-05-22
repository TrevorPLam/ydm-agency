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
