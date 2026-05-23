import { Card, Button } from "@agency/ui"
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { pricingTiers } from "../data/pricingTiers"
import { AnimateOnScroll } from "@agency/ui"

interface PricingSectionProps {
  isAnnual: boolean
  expandedFeatures: { [key: string]: boolean }
  toggleFeatures: (tier: string) => void
}

export function PricingSection({ isAnnual, expandedFeatures, toggleFeatures }: PricingSectionProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)]">
      <div className="container mx-auto max-w-6xl">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Full-Service Partnership Packages</h2>
          <p className="text-gray-400 mb-8 font-inter max-w-3xl">
            For businesses that want a dedicated marketing team without the overhead. One partner, one invoice, no finger-pointing.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <AnimateOnScroll key={tier.id} delay={index * 100}>
              <Card className={`bg-black border border-white/10 p-8 hover:border-[var(--accent)] transition-colors ${tier.popular ? 'border-2 border-[var(--accent)] relative ring-2 ring-[var(--accent)] transform md:-translate-y-4 shadow-[0_0_30px_rgba(0,128,255,0.3)]' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 font-rajdhani">{tier.name}</h3>
                <p className="text-[var(--accent)] font-medium mb-6">{tier.subtitle}</p>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => toggleFeatures(tier.id)}
                  className="text-[var(--accent)] text-sm font-medium mb-6 hover:text-[var(--accent)]/80 flex items-center"
                >
                  {expandedFeatures[tier.id] ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      View all features
                    </>
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedFeatures[tier.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="space-y-3 mb-6">
                    {tier.expandedFeatures.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6">
                  <p className="text-2xl font-bold font-rajdhani">
                    Starting at ${isAnnual ? '____' : '____'}/month
                  </p>
                  <p className="text-xs text-gray-400">after initial build fee</p>
                </div>
                <Link href="/contact">
                  <Button variant={tier.popular ? "default" : "outline"} className={`w-full ${tier.popular ? 'bg-[var(--accent)] hover:bg-[var(--accent)]/90' : 'border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white'}`}>
                    Book a Free Consultation
                  </Button>
                </Link>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
