import { Card } from "@agency/ui"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { addOns } from "../data/addOns"

interface AddOnsSectionProps {
  hoveredCard: string | null
  setHoveredCard: (card: string | null) => void
}

export function AddOnsSection({ hoveredCard, setHoveredCard }: AddOnsSectionProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Need Something Specific? Choose À La Carte.</h2>
        <p className="text-gray-400 mb-12 font-inter max-w-3xl">
          Already have a website? Just need CRM help or social management? No problem. All services are available as standalone engagements.
        </p>

        <div className="grid md:grid-cols-2 md:grid-rows-4 gap-6">
          {addOns.map((addOn) => (
            <Card
              key={addOn.id}
              className={`bg-[var(--surface-2)] border border-white/10 p-6 hover:border-[var(--accent)] transition-all duration-300 ${addOn.span} group`}
              onMouseEnter={() => setHoveredCard(addOn.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <addOn.icon className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold font-rajdhani">{addOn.title}</h3>
                {addOn.badge && (
                  <span className="text-xs bg-[var(--accent)]/20 text-[var(--accent)] px-2 py-0.5 rounded-full">{addOn.badge}</span>
                )}
              </div>
              <p className="text-gray-400 text-sm mb-4 font-inter">{addOn.description}</p>
              <div className={`overflow-hidden transition-all duration-300 ${hoveredCard === addOn.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-500 text-xs mb-3">{addOn.details}</p>
              </div>
              <Link href="/contact" className="text-[var(--accent)] hover:text-[var(--accent)]/80 text-sm font-medium">
                I'm interested <ArrowRight className="inline ml-1 h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
