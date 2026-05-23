import { Card } from "@agency/ui"
import { User, Zap } from "lucide-react"
import { ShieldIcon, CompassIcon, GrowthIcon } from "@/components/illustrations"
import { founderTimeline, founderQuote, founderNote } from "../data/founderTimeline"

export function FounderSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-2)] overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">The Person Behind This.</h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Photo & quote area */}
          <div className="space-y-8">
            <div className="relative group">
              {/* Organic blob photo frame */}
              <div className="relative w-full aspect-[3/4] max-w-md mx-auto">
                <svg viewBox="0 0 200 270" className="absolute inset-0 w-full h-full text-[var(--accent)]/20">
                  <path d="M100,10 C170,10 190,60 190,130 C190,200 170,260 100,260 C30,260 10,200 10,130 C10,60 30,10 100,10 Z" fill="currentColor" opacity="0.1" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <User className="h-24 w-24 text-[var(--accent)]/30 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm font-inter">Photo Coming Soon</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-right">
                <p className="font-handwritten text-3xl text-[var(--accent)] opacity-80">— [Your Name]</p>
              </div>
            </div>

            {/* Handwritten quote (desktop) */}
            <div className="hidden lg:block bg-[var(--surface-3)] border border-white/10 p-8 rounded-2xl">
              <p className="font-handwritten text-2xl md:text-3xl text-gray-200 leading-relaxed">
                "{founderQuote}"
              </p>
              <div className="h-1 w-16 bg-[var(--accent)] rounded-full mt-4" />
            </div>
          </div>

          {/* Timeline & note */}
          <div className="space-y-8">
            <Card className="bg-black border border-white/10 p-8 rounded-2xl hover:border-[var(--accent)] transition-colors">
              <h3 className="text-lg font-bold mb-6 font-rajdhani text-[var(--accent)]">The Journey</h3>
              <div className="space-y-4">
                {founderTimeline.map((item, index) => {
                  const IconComponent = item.icon || Zap
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0 border border-[var(--accent)]/30">
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium font-inter">{item.title}</p>
                        <p className="text-gray-400 text-sm font-inter">{item.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            <Card className="bg-[var(--surface-3)] border-l-4 border-l-[var(--accent)] border-y-0 border-r-0 border-white/10 p-8 rounded-2xl">
              <p className="text-gray-300 font-inter leading-relaxed">
                {founderNote}
                <span className="font-handwritten text-[var(--accent)] ml-2">— really</span>
              </p>
            </Card>
          </div>
        </div>

        {/* Handwritten quote (mobile) */}
        <div className="lg:hidden mt-8 bg-[var(--surface-3)] border border-white/10 p-8 rounded-2xl">
          <p className="font-handwritten text-2xl text-gray-200 leading-relaxed">
            "{founderQuote}"
          </p>
          <div className="h-1 w-16 bg-[var(--accent)] rounded-full mt-4" />
        </div>
      </div>
    </section>
  )
}
