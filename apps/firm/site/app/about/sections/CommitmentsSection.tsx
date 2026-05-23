import { Card } from "@agency/ui"
import { AnimateOnScroll } from "@agency/ui"
import { TransparencyIcon, OwnershipIcon, StrategyIcon, ShieldIcon, AnchorIcon, ConnectionIcon } from "@/components/illustrations"
import { commitments } from "../data/commitments"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Radical Transparency": TransparencyIcon,
  "You Own Everything": OwnershipIcon,
  "Metrics That Matter": StrategyIcon,
  "One Person, Full Accountability": ShieldIcon,
  "Trust Signals": AnchorIcon,
  "Trusted By": ConnectionIcon,
}

export function CommitmentsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">This Is How We Work. No Exceptions.</h2>
        </AnimateOnScroll>
        
        <div className="grid md:grid-cols-2 md:grid-rows-3 gap-6">
          {commitments.map((commitment, index) => {
            const IconComponent = iconMap[commitment.title] || commitment.icon
            return (
              <AnimateOnScroll key={index} delay={index * 100}>
                <Card className={`bg-[var(--surface-2)] border border-white/10 p-8 hover:border-[var(--accent)] transition-colors rounded-2xl ${commitment.span}`}>
                  <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-6">
                    {typeof IconComponent === 'function' ? (
                      <IconComponent className="h-6 w-6 text-[var(--accent)]" />
                    ) : (
                      <commitment.icon className="h-6 w-6 text-[var(--accent)]" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-4 font-rajdhani">{commitment.title}</h3>
                  <p className="text-gray-400 font-inter mb-4">{commitment.description}</p>
                  {commitment.badges && (
                    <div className="flex gap-2 flex-wrap">
                      {commitment.badges.map((badge, badgeIndex) => (
                        <span key={badgeIndex} className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-sm rounded-full">{badge}</span>
                      ))}
                    </div>
                  )}
                  {commitment.title === "Trusted By" && (
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-12 bg-white/5 rounded-lg flex items-center justify-center text-gray-500 text-xs">Logo 1</div>
                      <div className="h-12 bg-white/5 rounded-lg flex items-center justify-center text-gray-500 text-xs">Logo 2</div>
                      <div className="h-12 bg-white/5 rounded-lg flex items-center justify-center text-gray-500 text-xs">Logo 3</div>
                    </div>
                  )}
                </Card>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
