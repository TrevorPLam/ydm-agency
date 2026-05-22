import { Section, SectionHeader, FeatureCard, Container } from "@agency/ui"
import { Target, Megaphone, Globe, Palette, BarChart3, Users, LineChart, FileText, Sparkles } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation - simplified for subpages */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
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
              <Link href="/services" className="text-sm font-medium text-primary">Services</Link>
              <Link href="/work" className="text-sm font-medium hover:text-primary transition-colors">Work</Link>
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
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive marketing solutions tailored to your business goals. From strategy to execution, we deliver measurable results.
          </p>
        </div>
      </Section>

      {/* Services Detail Section */}
      <Section variant="muted">
        <SectionHeader
          title="Core Services"
          description="Full-service digital marketing capabilities to grow your brand"
        />
        <div className="grid md:grid-cols-2 gap-8">
          <FeatureCard
            icon={Target}
            title="Digital Strategy"
            description="Data-driven roadmaps that align marketing efforts with business objectives for maximum ROI. We analyze market trends, competitor strategies, and customer behavior to create comprehensive digital roadmaps."
          />
          <FeatureCard
            icon={Megaphone}
            title="Brand Marketing"
            description="Build powerful brand identities that resonate with your audience and drive loyalty. From brand positioning to messaging frameworks, we help you stand out in crowded markets."
          />
          <FeatureCard
            icon={Globe}
            title="SEO & Content"
            description="Optimize your online presence with strategic SEO and compelling content strategies. Our approach combines technical SEO, content creation, and link building for sustainable growth."
          />
          <FeatureCard
            icon={Palette}
            title="Creative Design"
            description="Stunning visual assets and campaigns that capture attention and inspire action. Our creative team delivers everything from brand assets to campaign creatives."
          />
          <FeatureCard
            icon={BarChart3}
            title="Performance Marketing"
            description="Paid advertising campaigns optimized for conversions and measurable growth. We manage campaigns across all major platforms with continuous optimization."
          />
          <FeatureCard
            icon={Users}
            title="Social Media"
            description="Engage your audience with strategic social media management and community building. We create content strategies that drive engagement and build brand communities."
          />
        </div>
      </Section>

      {/* Specialized Services */}
      <Section>
        <SectionHeader
          title="Specialized Solutions"
          description="Advanced services for specific business needs"
        />
        <div className="grid md:grid-cols-2 gap-8">
          <FeatureCard
            icon={LineChart}
            title="Analytics & Reporting"
            description="Advanced analytics setup and custom reporting dashboards. We help you understand your data and make data-driven decisions."
          />
          <FeatureCard
            icon={FileText}
            title="Content Marketing"
            description="Strategic content creation and distribution. From blog posts to whitepapers, we create content that establishes thought leadership."
          />
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="muted">
        <Container size="sm">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-muted-foreground">
              Let's discuss how our services can help you achieve your business goals.
            </p>
            <Link href="/contact">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                Contact Us Today
              </button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  )
}
