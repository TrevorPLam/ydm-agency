import { Card } from "@agency/ui"
import { timelineSteps } from "../data/timelineSteps"

export function TimelineSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-orbitron">What Happens After You Reach Out.</h2>
        
        {/* Progress Indicator */}
        <div className="progress-indicator mb-8 hidden md:block">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400 font-inter">Step Progress</span>
            <span className="text-sm font-medium text-[var(--accent)] font-inter">4 steps</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" />
          </div>
        </div>

        <div className="relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent)] via-[var(--accent)]/50 to-transparent hidden md:block" />
          
          <div className="space-y-12 md:space-y-16">
            {timelineSteps.map((step, index) => (
              <div key={index} className="timeline-step relative pl-20 md:pl-24">
                <div className="absolute left-0 md:left-8 top-0 h-16 w-16 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(0,128,255,0.5)] z-10">
                  <span className="text-white font-bold text-2xl font-orbitron">{index + 1}</span>
                </div>
                <div className="bg-[var(--surface-2)] border border-white/10 rounded-2xl p-6 md:p-8 hover:border-[var(--accent)]/50 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold font-rajdhani">{step.title}</h3>
                    <span className="text-xs text-[var(--accent)] font-medium bg-[var(--accent)]/10 px-2 py-1 rounded-full">{step.badge}</span>
                  </div>
                  <p className="text-gray-400 font-inter">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
