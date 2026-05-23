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
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

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

      {/* Section 2: Filter Bar */}
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
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </div>
        </div>
      </section>

      {/* Section 3: Project Grid */}
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

      {/* Section 4: Featured Case Study */}
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

      {/* Section 5: How I Work */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">From Demo to Your Business: The Same Rigor, Applied to You.</h2>
          <p className="text-gray-400 mb-12 font-inter max-w-3xl">
            The same strategic process that built these demos will build your website.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-[var(--surface-2)] border border-white/10 p-6">
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-rajdhani">Strategic Brief</h3>
              <p className="text-gray-400 font-inter">Every project starts with a deep understanding of your audience, goals, and competitive landscape—demo or not.</p>
            </Card>

            <Card className="bg-[var(--surface-2)] border border-white/10 p-6">
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-rajdhani">Custom Build</h3>
              <p className="text-gray-400 font-inter">No templates. No shortcuts. Your site is built to your brand and optimized for performance.</p>
            </Card>

            <Card className="bg-[var(--surface-2)] border border-white/10 p-6">
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-rajdhani">Results Tracking</h3>
              <p className="text-gray-400 font-inter">We define success metrics before launch and track real business outcomes after.</p>
            </Card>
          </div>

          <Link href="/contact">
            <Button size="lg" className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-base px-8">
              Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Section 6: Testimonial Placeholder */}
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

      {/* Section 7: Final CTA */}
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
    </div>
  )
}
