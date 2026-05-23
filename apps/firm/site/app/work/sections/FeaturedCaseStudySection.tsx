import { Card, CardContent, Button } from "@agency/ui"
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react"
import Link from "next/link"

export function FeaturedCaseStudySection() {
  return (
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
  )
}
