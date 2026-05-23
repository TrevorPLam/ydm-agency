import { TrapIcon, MetricsIcon, FragmentedIcon } from "@/components/illustrations"
import { problemCards, problemPullquote } from "../data/problemCards"

export function ProblemSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 font-orbitron">
          The Way Marketing Is Sold Is Broken.
        </h2>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main column */}
          <div className="flex-1 space-y-8">
            {/* Full-width statement */}
            <div className="relative bg-[var(--surface-2)] border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden group hover:border-[var(--accent)]/40 transition-colors duration-500">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('/texture/noise-512.png')] bg-repeat" />
              <div className="relative z-10">
                <div className="flex items-start gap-6 mb-6">
                  <div className="h-16 w-16 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                    <TrapIcon className="h-8 w-8 text-[var(--accent)]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest mb-2 block font-rajdhani">The Problem</span>
                    <h3 className="text-3xl md:text-4xl font-bold font-rajdhani mb-3">The "Average Trap"</h3>
                  </div>
                </div>
                <p className="text-lg text-gray-300 max-w-2xl leading-relaxed font-inter">
                  {problemCards[0].description}
                </p>
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[var(--accent)]/5 rounded-full blur-3xl" />
            </div>

            {/* Two smaller offset cards */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 bg-[var(--surface-3)] border border-white/10 rounded-2xl p-6 hover:border-[var(--accent)]/50 transition-all duration-300 hover:-translate-y-1">
                <MetricsIcon className="h-8 w-8 text-[var(--accent)] mb-4" />
                <h4 className="text-xl font-bold font-rajdhani mb-2">{problemCards[1].title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed font-inter">{problemCards[1].description}</p>
              </div>
              <div className="flex-1 bg-[var(--surface-3)] border border-white/10 rounded-2xl p-6 hover:border-[var(--accent)]/50 transition-all duration-300 hover:-translate-y-1 md:mt-8">
                <FragmentedIcon className="h-8 w-8 text-[var(--accent)] mb-4" />
                <h4 className="text-xl font-bold font-rajdhani mb-2">{problemCards[2].title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed font-inter">{problemCards[2].description}</p>
              </div>
            </div>
          </div>

          {/* Sticky pullquote sidebar (desktop) */}
          <aside className="lg:w-80 hidden lg:block">
            <div className="sticky top-32">
              <div className="relative">
                <svg viewBox="0 0 80 80" className="w-16 h-16 text-[var(--accent)] opacity-20 -ml-2 -mt-4 absolute">
                  <path d="M15 65 Q15 20 60 20" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
                <div className="pt-12 pl-8">
                  <p className="font-handwritten text-2xl text-gray-200 italic leading-relaxed">
                    {problemPullquote}
                  </p>
                  <div className="mt-6 h-px w-16 bg-gradient-to-r from-[var(--accent)] to-transparent" />
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile pullquote */}
          <div className="lg:hidden">
            <div className="bg-[var(--surface-2)] border-l-4 border-l-[var(--accent)] border-y-0 border-r-0 border-white/10 p-6 rounded-r-2xl">
              <p className="text-gray-300 font-inter italic">
                {problemPullquote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
