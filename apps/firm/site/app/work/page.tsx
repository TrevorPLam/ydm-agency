import { Section, SectionHeader, PortfolioCard, Container } from "@agency/ui"
import { Sparkles, Calendar, Users, BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function WorkPage() {
  const projects = [
    {
      title: "Day Care Management System",
      description: "Complete booking and scheduling platform for childcare centers with real-time availability management, parent portal, and automated notifications.",
      metrics: "340%",
      metricLabel: "ROI Increase",
      href: "/demo/day-care",
      tags: ["Booking", "Scheduling", "Parent Portal"]
    },
    {
      title: "Hair Salon Platform",
      description: "Stylist scheduling and appointment booking system with service catalog, client management, and payment processing integration.",
      metrics: "2.5M",
      metricLabel: "Appointments Booked",
      href: "/demo/hair-salor",
      tags: ["Scheduling", "Service Catalog", "Payments"]
    },
    {
      title: "Tax Firm Portal",
      description: "Client management and document tracking system for tax preparation firms with secure workflows, document sharing, and deadline tracking.",
      metrics: "98%",
      metricLabel: "On-Time Filing",
      href: "/demo/tax-firm",
      tags: ["Document Management", "Security", "Compliance"]
    },
    {
      title: "Project Management Suite",
      description: "Industry-agnostic project management system featuring Kanban boards, email triage, time tracking, and template-based workflows.",
      metrics: "50k+",
      metricLabel: "Tasks Managed",
      href: "/business-applications/project-management",
      tags: ["Kanban", "Email Triage", "Time Tracking"]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Nexus Agency</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
              <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">Services</Link>
              <Link href="/work" className="text-sm font-medium text-primary">Work</Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Section>
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Our Work
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of successful projects. Each case study demonstrates our commitment to delivering measurable results and innovative solutions.
          </p>
        </div>
      </Section>

      {/* Stats Section */}
      <Section variant="muted">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">150+</div>
            <div className="text-sm text-muted-foreground">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">$50M+</div>
            <div className="text-sm text-muted-foreground">Client Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">15+</div>
            <div className="text-sm text-muted-foreground">Industry Awards</div>
          </div>
        </div>
      </Section>

      {/* Projects Grid */}
      <Section>
        <SectionHeader
          title="Featured Projects"
          description="Live demos and case studies showcasing our capabilities"
        />
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              className="group block p-6 rounded-lg border bg-card hover:shadow-lg transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{project.metrics}</div>
                  <div className="text-sm text-muted-foreground">{project.metricLabel}</div>
                </div>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center text-sm font-medium text-primary">
                View Live Demo
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="muted">
        <Container size="sm">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">Have a Project in Mind?</h2>
            <p className="text-muted-foreground">
              Let's discuss how we can help bring your vision to life.
            </p>
            <Link href="/contact">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                Start Your Project
              </button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  )
}
