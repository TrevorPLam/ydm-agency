import { Section, SectionHeader, StatCard, Container } from "@agency/ui"
import { Sparkles, CheckCircle2, Award, Users, Target, Lightbulb, Heart } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const team = [
    {
      name: "Alex Thompson",
      role: "Founder & CEO",
      bio: "15+ years in digital marketing and brand strategy"
    },
    {
      name: "Sarah Chen",
      role: "Creative Director",
      bio: "Award-winning designer with Fortune 500 experience"
    },
    {
      name: "Michael Roberts",
      role: "Head of Strategy",
      bio: "Data-driven marketing specialist and analytics expert"
    },
    {
      name: "Emily Watson",
      role: "Technical Lead",
      bio: "Full-stack developer and systems architect"
    }
  ]

  const values = [
    {
      icon: Target,
      title: "Results-First",
      description: "Every strategy is designed to deliver measurable business outcomes that matter."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace cutting-edge technology and creative approaches to stay ahead."
    },
    {
      icon: Heart,
      title: "Partnership",
      description: "We work as an extension of your team, committed to your success."
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
              <Link href="/work" className="text-sm font-medium hover:text-primary transition-colors">Work</Link>
              <Link href="/about" className="text-sm font-medium text-primary">About</Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Section>
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            About Nexus Agency
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're not just another marketing agency. We're your strategic partner in growth, combining creativity with data-driven insights to deliver exceptional results.
          </p>
        </div>
      </Section>

      {/* Our Story */}
      <Section variant="muted">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-muted-foreground">
              Founded in 2016, Nexus Agency started with a simple mission: to help businesses navigate the complex digital landscape with confidence. What began as a small team of passionate marketers has grown into a full-service agency serving clients across industries.
            </p>
            <p className="text-muted-foreground">
              Our approach has always been different. We believe that great marketing isn't about tricks or shortcuts—it's about understanding your business, your audience, and your goals, then crafting strategies that deliver real, measurable results.
            </p>
            <p className="text-muted-foreground">
              Today, we're proud to have helped over 150 clients achieve their marketing goals, generating $50M+ in revenue and earning recognition as one of the region's top digital agencies.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="p-6 rounded-lg border bg-card text-center">
                <StatCard value="10+" label="Years Experience" />
              </div>
              <div className="p-6 rounded-lg border bg-card text-center">
                <StatCard value="40+" label="Team Members" />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="p-6 rounded-lg border bg-card text-center">
                <StatCard value="15+" label="Industry Awards" />
              </div>
              <div className="p-6 rounded-lg border bg-card text-center">
                <StatCard value="150+" label="Happy Clients" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Our Values */}
      <Section>
        <SectionHeader
          title="Our Values"
          description="The principles that guide everything we do"
        />
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div key={value.title} className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <value.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section variant="muted">
        <SectionHeader
          title="Why Choose Nexus?"
          description="What sets us apart from other agencies"
        />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Cross-Disciplinary Team</h3>
                <p className="text-sm text-muted-foreground">Experts in strategy, creative, technology, and analytics working together.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Data-Driven Approach</h3>
                <p className="text-sm text-muted-foreground">Every decision backed by data and continuous optimization.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Transparent Communication</h3>
                <p className="text-sm text-muted-foreground">Real-time reporting and collaborative processes keep you informed.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Agile Methodology</h3>
                <p className="text-sm text-muted-foreground">Flexible processes that adapt to your changing needs.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Industry Expertise</h3>
                <p className="text-sm text-muted-foreground">Deep experience across multiple industries and business models.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Long-Term Partnership</h3>
                <p className="text-sm text-muted-foreground">We're invested in your success for the long haul.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Team Section */}
      <Section>
        <SectionHeader
          title="Meet Our Team"
          description="The talented people behind our success"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="p-6 rounded-lg border bg-card text-center space-y-4">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
                <p className="text-xs text-muted-foreground mt-2">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="muted">
        <Container size="sm">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Work Together?</h2>
            <p className="text-muted-foreground">
              Let's discuss how our team can help you achieve your goals.
            </p>
            <Link href="/contact">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                Get in Touch
              </button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  )
}
