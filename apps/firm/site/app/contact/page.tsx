import { Section, SectionHeader, Container } from "@agency/ui"
import { Sparkles, Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
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
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
              <Link href="/contact" className="text-sm font-medium text-primary">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Section>
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your marketing? Reach out for a free consultation and let's discuss how we can help you achieve your goals.
          </p>
        </div>
      </Section>

      {/* Contact Info & Form */}
      <Section variant="muted">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                We'd love to hear from you. Fill out the form or reach out directly using any of the methods below.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground">hello@nexusagency.com</p>
                  <p className="text-sm text-muted-foreground">support@nexusagency.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri 9am-6pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Office</h3>
                  <p className="text-sm text-muted-foreground">
                    123 Marketing Street<br />
                    Suite 456<br />
                    San Francisco, CA 94102
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 9am - 6pm EST<br />
                    Saturday: 10am - 4pm EST<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
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
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      required
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
                  <label htmlFor="service" className="text-sm font-medium">Service Interest</label>
                  <select
                    id="service"
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  >
                    <option value="">Select a service</option>
                    <option value="digital-strategy">Digital Strategy</option>
                    <option value="brand-marketing">Brand Marketing</option>
                    <option value="seo-content">SEO & Content</option>
                    <option value="creative-design">Creative Design</option>
                    <option value="performance-marketing">Performance Marketing</option>
                    <option value="social-media">Social Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section>
        <SectionHeader
          title="Frequently Asked Questions"
          description="Common questions about working with us"
        />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">How quickly do you respond to inquiries?</h3>
              <p className="text-sm text-muted-foreground">
                We typically respond within 24 hours during business days. For urgent matters, please call us directly.
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">Do you offer free consultations?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! We offer a complimentary 30-minute consultation to discuss your needs and how we can help.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">What industries do you work with?</h3>
              <p className="text-sm text-muted-foreground">
                We work with businesses across various industries including technology, healthcare, retail, and professional services.
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">What's your typical project timeline?</h3>
              <p className="text-sm text-muted-foreground">
                Project timelines vary based on scope, but most projects range from 4-12 weeks. We'll provide a detailed timeline during our consultation.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="muted">
        <Container size="sm">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">Prefer to Call?</h2>
            <p className="text-muted-foreground">
              Give us a ring at +1 (555) 123-4567 and we'll be happy to chat.
            </p>
            <Button size="lg">
              <Phone className="mr-2 h-4 w-4" />
              Call Us Now
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  )
}
