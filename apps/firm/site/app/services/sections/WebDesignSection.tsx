import { Card, Button } from "@agency/ui"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { webDesignFeatures, webDesignProcess, webDesignDeliverables } from "../data/webDesignFeatures"

export function WebDesignSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">The Core: Custom Web Design That Drives Growth</h2>
        <p className="text-gray-400 mb-12 font-inter max-w-3xl">
          A conversion-focused, mobile-first, and fully owned website is not a cost—it's an asset that compounds over time. We design and build sites that reflect your brand, respect your customers' privacy, and turn visitors into leads and buyers.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {webDesignFeatures.map((feature, index) => (
            <Card key={index} className={`bg-[var(--surface-2)] border border-white/10 p-6 rounded-2xl hover:border-[var(--accent)] transition-colors ${feature.span}`}>
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-rajdhani">{feature.title}</h3>
              <p className="text-gray-400 font-inter">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-bold mb-6 font-rajdhani">Our Process</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {webDesignProcess.map((step, index) => (
              <Card key={index} className="bg-[var(--surface-2)] border border-white/10 p-4 rounded-2xl hover:border-[var(--accent)] transition-colors">
                <div className="h-8 w-8 rounded-full bg-[var(--accent)] flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-sm">{step.step}</span>
                </div>
                <h4 className="font-semibold mb-1 font-rajdhani">{step.title}</h4>
                <p className="text-sm text-gray-400 font-inter">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-[var(--surface-2)] border border-white/10 p-6 mb-8 rounded-2xl hover:border-[var(--accent)] transition-colors">
          <h3 className="text-xl font-bold mb-4 font-rajdhani">Deliverables</h3>
          <ul className="space-y-2">
            {webDesignDeliverables.map((deliverable, index) => (
              <li key={index} className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-[var(--accent)]" />
                <span className="text-gray-300">{deliverable}</span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/work">
            <Button variant="outline" className="border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white">
              See Our Work <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button className="bg-[var(--accent)] hover:bg-[var(--accent)]/90">
              Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
