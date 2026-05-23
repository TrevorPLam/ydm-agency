import { Card } from "@agency/ui"
import { AnimateOnScroll } from "@agency/ui"
import { ShieldIcon, GrowthIcon, SparkIcon, CompassIcon, ConnectionIcon, AnchorIcon } from "@/components/illustrations"
import { coreServices } from "../data/coreServices"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Web Design & Development": ShieldIcon,
  "SEO & AIEO": GrowthIcon,
  "Analytics & CRO": SparkIcon,
  "Brand Identity": CompassIcon,
  "Content Marketing": ConnectionIcon,
  "Email & CRM": AnchorIcon,
}

function StatCard({ value, label }: { value: string, label: string }) {
  return (
    <div className="bg-[var(--surface-2)] border border-white/10 p-6 rounded-2xl hover:border-[var(--accent)]/50 transition-colors">
      <div className="text-3xl font-bold text-[var(--accent)] font-rajdhani mb-2">{value}</div>
      <div className="text-sm text-gray-400 font-inter">{label}</div>
    </div>
  )
}

export function CoreServicesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">What We Do</h2>
        
        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
          {/* Main card - spans 2 columns, 2 rows */}
          <div className="lg:col-span-2 lg:row-span-2">
            <Card className="bg-[var(--surface-2)] border border-white/10 p-8 h-full hover:border-[var(--accent)]/50 transition-colors rounded-2xl">
              <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-6">
                <ShieldIcon className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-2xl font-bold font-rajdhani mb-4">Website as Your Growth Engine</h3>
              <p className="text-gray-400 mb-6 font-inter">{coreServices[0].description}</p>
              <a href="/services" className="text-[var(--accent)] font-medium inline-flex items-center gap-2 hover:gap-3 transition-all">
                Learn more <span>→</span>
              </a>
            </Card>
          </div>
          
          {/* Two medium cards */}
          <div className="lg:col-span-1 lg:row-span-1">
            <Card className="bg-[var(--surface-3)] border border-white/10 p-6 h-full hover:border-[var(--accent)]/50 transition-colors rounded-2xl">
              <div className="h-10 w-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <GrowthIcon className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <h4 className="text-lg font-bold font-rajdhani mb-2">{coreServices[1].title}</h4>
              <p className="text-gray-400 text-sm font-inter">{coreServices[1].description}</p>
            </Card>
          </div>
          <div className="lg:col-span-1 lg:row-span-1">
            <Card className="bg-[var(--surface-3)] border border-white/10 p-6 h-full hover:border-[var(--accent)]/50 transition-colors rounded-2xl">
              <div className="h-10 w-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <SparkIcon className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <h4 className="text-lg font-bold font-rajdhani mb-2">{coreServices[2].title}</h4>
              <p className="text-gray-400 text-sm font-inter">{coreServices[2].description}</p>
            </Card>
          </div>
          
          {/* Stat cards */}
          <div className="lg:col-span-1">
            <StatCard value="142%" label="Average conversion increase" />
          </div>
          <div className="lg:col-span-1">
            <StatCard value="98%" label="Client retention" />
          </div>
        </div>
      </div>
    </section>
  )
}
