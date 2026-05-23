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
              <Link href="/blog" className="text-sm font-medium hover:text-[var(--accent)] transition-colors">Blog</Link>
              <Link href="/contact" className="text-sm font-medium text-[var(--accent)]">Contact</Link>
            </div>
            <Button className="bg-[var(--accent)] hover:bg-[var(--accent)]/90">Book Consultation</Button>
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
            <div className="h-12 w-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center animate-pulse">
              <MessageSquare className="h-6 w-6 text-[var(--accent)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Contact Form */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-2xl">
          <Card className="bg-[var(--surface-2)] border-l-4 border-l-[var(--accent)] border-y border-r border-white/10 p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-8 font-orbitron">Send Me a Message</h2>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-black border border-white/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">Work Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 bg-black border border-white/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-gray-300">Company / Website <span className="text-gray-500">(optional)</span></label>
                <input
                  id="company"
                  type="text"
                  placeholder="yourcompany.com"
                  className="w-full px-4 py-3 bg-black border border-white/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="interest" className="text-sm font-medium text-gray-300">What Are You Interested In? <span className="text-gray-500">(optional)</span></label>
                <select
                  id="interest"
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
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">Tell Me About Your Project or Goals</label>
                <textarea
                  id="message"
                  placeholder="What are you trying to achieve? What challenges are you facing?"
                  rows={5}
                  className="w-full px-4 py-3 bg-black border border-white/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors resize-none"
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base">
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

      {/* Section 3: Alternative Ways to Reach Me */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">Prefer Another Way? You've Got Options.</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-black border border-white/10 p-8 hover:border-[var(--accent)] transition-colors">
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-xl font-bold mb-4 font-rajdhani">Book a Call Directly</h3>
              <p className="text-gray-400 mb-6 font-inter">
                Skip the back-and-forth. Grab a time that works for you on my calendar. Free 30-minute strategy call, no pressure.
              </p>
              <Link href="/contact">
                <Button variant="outline" className="w-full border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white">
                  Book Your Free Call
                </Button>
              </Link>
            </Card>

            <Card className="bg-black border border-white/10 p-8 hover:border-[var(--accent)] transition-colors">
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-6">
                <Mail className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-xl font-bold mb-4 font-rajdhani">Write Me Directly</h3>
              <p className="text-gray-400 mb-6 font-inter">
                If you prefer to email, reach me at <a href="mailto:hello@yourdedicatedmarketer.com" className="text-[var(--accent)] hover:underline">hello@yourdedicatedmarketer.com</a>. It comes straight to my inbox—not a shared team mailbox.
              </p>
            </Card>

            <Card className="bg-black border border-white/10 p-8 hover:border-[var(--accent)] transition-colors">
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-6">
                <MessageSquare className="h-6 w-6 text-[var(--accent)]" />
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
          
          <Card className="bg-[var(--surface-2)] border border-white/10 p-8 md:p-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-rajdhani">You send a message or book a call.</h3>
                  <p className="text-gray-400 font-inter">No gatekeepers, no forms disappearing into the void.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-rajdhani">I review and reply within 24 hours (often faster).</h3>
                  <p className="text-gray-400 font-inter">If you booked a call, you'll get a confirmation with details.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-rajdhani">We talk — openly, honestly, no pitch decks.</h3>
                  <p className="text-gray-400 font-inter">We discuss your business, your challenges, and whether we're a good fit. If we are, great. If not, I'll tell you honestly and point you in the right direction.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
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

      {/* Section 6: Final CTA (Emergency Option) */}
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
    </div>
  )
}
