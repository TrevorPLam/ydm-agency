import { processSteps } from "../data/processSteps"

export function ProcessSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 font-orbitron">Our Process</h2>

        {/* Scroll progress bar */}
        <div className="progress-bar-scroll mb-16">
          <div className="progress-bar-scroll-fill" />
        </div>

        <div className="space-y-32">
          {processSteps.map((step, index) => (
            <div key={index} className="animate-in-view flex gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center text-2xl font-bold font-orbitron">
                {step.step}
              </div>
              <div className="max-w-lg">
                <h3 className="text-2xl font-bold font-rajdhani mb-4">{step.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed font-inter">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
