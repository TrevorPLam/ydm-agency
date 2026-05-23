import { industries, serviceTypes } from "../data/projects"

interface FilterSectionProps {
  industryFilter: string
  serviceFilter: string
  setIndustryFilter: (filter: string) => void
  setServiceFilter: (filter: string) => void
  filteredCount: number
}

export function FilterSection({ industryFilter, serviceFilter, setIndustryFilter, setServiceFilter, filteredCount }: FilterSectionProps) {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-black border-b border-white/10 sticky top-16 z-40">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-3 font-inter">Industry</p>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setIndustryFilter(industry)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    industryFilter === industry
                      ? "bg-[var(--accent)] text-white shadow-[0_0_20px_rgba(0,128,255,0.3)]"
                      : "bg-[var(--surface-2)] border border-white/10 text-gray-400 hover:border-[var(--accent)] hover:bg-[var(--surface-3)]"
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-3 font-inter">Service Type</p>
            <div className="flex flex-wrap gap-2">
              {serviceTypes.map((service) => (
                <button
                  key={service}
                  onClick={() => setServiceFilter(service)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    serviceFilter === service
                      ? "bg-[var(--accent)] text-white shadow-[0_0_20px_rgba(0,128,255,0.3)]"
                      : "bg-[var(--surface-2)] border border-white/10 text-gray-400 hover:border-[var(--accent)] hover:bg-[var(--surface-3)]"
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500 font-inter">
          {filteredCount} project{filteredCount !== 1 ? 's' : ''}
        </div>
      </div>
    </section>
  )
}
