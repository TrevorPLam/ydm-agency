import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart3, Globe, Megaphone, Palette, Target, Users, Zap, CheckCircle2 } from "lucide-react"
import { Section, SectionHeader, StatCard, FeatureCard, TestimonialCard, PortfolioCard, Container } from "@agency/ui"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Nexus Agency</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/services" className="text-sm font-medium hover:text-primary transition-colors">Services</a>
              <a href="/work" className="text-sm font-medium hover:text-primary transition-colors">Work</a>
              <a href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
              <a href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
            </div>
            <Button>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Section>
        <div className="text-center space-y-8">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-muted">
            <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
            Award-Winning Digital Marketing Agency
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            We Transform Brands Into
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Digital Experiences
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Data-driven strategies meet creative excellence. We help businesses grow through innovative marketing solutions that deliver measurable results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base">
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              View Our Work
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
            <StatCard value="150+" label="Clients Served" />
            <StatCard value="$50M+" label="Revenue Generated" />
            <StatCard value="98%" label="Client Satisfaction" />
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section id="services" variant="muted">
        <SectionHeader
          title="Our Services"
          description="Comprehensive marketing solutions tailored to your business goals"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Target}
            title="Digital Strategy"
            description="Data-driven roadmaps that align marketing efforts with business objectives for maximum ROI."
          />
          <FeatureCard
            icon={Megaphone}
            title="Brand Marketing"
            description="Build powerful brand identities that resonate with your audience and drive loyalty."
          />
          <FeatureCard
            icon={Globe}
            title="SEO & Content"
            description="Optimize your online presence with strategic SEO and compelling content strategies."
          />
          <FeatureCard
            icon={Palette}
            title="Creative Design"
            description="Stunning visual assets and campaigns that capture attention and inspire action."
          />
          <FeatureCard
            icon={BarChart3}
            title="Performance Marketing"
            description="Paid advertising campaigns optimized for conversions and measurable growth."
          />
          <FeatureCard
            icon={Users}
            title="Social Media"
            description="Engage your audience with strategic social media management and community building."
          />
        </div>
      </Section>

      {/* Work/Portfolio Section */}
      <Section id="work">
        <SectionHeader
          title="Featured Work"
          description="See how we've helped brands achieve remarkable results"
        />
        <div className="grid md:grid-cols-2 gap-8">
          <PortfolioCard
            title="Day Care Management System"
            description="Complete booking and scheduling platform for childcare centers with real-time availability management."
            metrics="340%"
            href="/demo/day-care"
          />
          <PortfolioCard
            title="Hair Salon Platform"
            description="Stylist scheduling and appointment booking system with service catalog and client management."
            metrics="2.5M"
            href="/demo/hair-salor"
          />
          <PortfolioCard
            title="Tax Firm Portal"
            description="Client management and document tracking system for tax preparation firms with secure workflows."
            metrics="98%"
            href="/demo/tax-firm"
          />
          <PortfolioCard
            title="Project Management Suite"
            description="Industry-agnostic project management system featuring Kanban boards, email triage, and time tracking."
            metrics="50k+"
            href="/business-applications/project-management"
          />
        </div>
      </Section>

      {/* About Section */}
      <Section id="about" variant="muted">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Nexus?</h2>
            <p className="text-muted-foreground">
              We're not just another marketing agency. We're your strategic partner in growth, combining creativity with data-driven insights to deliver exceptional results.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Results-First Approach</h3>
                  <p className="text-sm text-muted-foreground">Every strategy is designed to deliver measurable business outcomes.</p>
                </div>
              </div>
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
                  <h3 className="font-semibold">Agile & Transparent</h3>
                  <p className="text-sm text-muted-foreground">Real-time reporting and collaborative processes keep you informed.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <Card className="text-center p-6">
                <StatCard value="10+" label="Years Experience" />
              </Card>
              <Card className="text-center p-6">
                <StatCard value="40+" label="Team Members" />
              </Card>
            </div>
            <div className="space-y-4 mt-8">
              <Card className="text-center p-6">
                <StatCard value="15+" label="Industry Awards" />
              </Card>
              <Card className="text-center p-6">
                <StatCard value="24/7" label="Support Available" />
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section variant="muted">
        <SectionHeader
          title="What Our Clients Say"
          description="Don't just take our word for it - hear from the brands we've helped grow"
        />
        <div className="grid md:grid-cols-3 gap-6">
          <TestimonialCard
            quote="Nexus transformed our digital presence completely. Our organic traffic increased by 340% in just 6 months."
            author="Sarah Chen"
            role="CEO"
            company="TechFlow"
          />
          <TestimonialCard
            quote="The team's strategic approach to our brand launch exceeded all expectations. Highly recommend their services."
            author="Michael Roberts"
            role="Marketing Director"
            company="Luxe Fashion"
          />
          <TestimonialCard
            quote="Professional, responsive, and results-driven. They've become an essential partner in our growth strategy."
            author="Emily Watson"
            role="Founder"
            company="GreenStart"
          />
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <Container size="sm">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Let's Grow Together</h2>
            <p className="text-muted-foreground">
              Ready to transform your marketing? Get in touch for a free consultation.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">Company</label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Your Company"
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Nexus Agency</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transforming brands through innovative digital marketing strategies.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Digital Strategy</a></li>
                <li><a href="#" className="hover:text-primary">Brand Marketing</a></li>
                <li><a href="#" className="hover:text-primary">SEO & Content</a></li>
                <li><a href="#" className="hover:text-primary">Performance Marketing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Twitter</a></li>
                <li><a href="#" className="hover:text-primary">LinkedIn</a></li>
                <li><a href="#" className="hover:text-primary">Instagram</a></li>
                <li><a href="#" className="hover:text-primary">Dribbble</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Nexus Agency. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
