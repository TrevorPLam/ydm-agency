import { Card, CardContent, Button } from "@agency/ui"
import { ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import { AnimateOnScroll } from "@agency/ui"
import { projects } from "../data/projects"

interface ProjectGridSectionProps {
  filteredProjects: typeof projects
  hoveredProject: number | null
  setHoveredProject: (id: number | null) => void
}

export function ProjectGridSection({ filteredProjects, hoveredProject, setHoveredProject }: ProjectGridSectionProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6">
          {filteredProjects.map((project, index) => {
            const isFeatured = index === 0
            const isLarge = index === 0 || index === 3
            const isWide = index === 1 || index === 4
            const isTall = index === 2 || index === 5
            
            return (
              <AnimateOnScroll key={project.id} delay={index * 80}>
                <Card
                  className={`
                    bg-[var(--surface-2)] border border-white/10 rounded-2xl
                    hover:border-[var(--accent)] transition-all duration-300
                    hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,128,255,0.12)]
                    h-full overflow-hidden relative group timeline-parallax
                    ${isFeatured ? 'md:col-span-2 md:row-span-2 ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-black' : ''}
                    ${isLarge && !isFeatured ? 'md:col-span-2 md:row-span-2' : ''}
                    ${isWide ? 'md:col-span-2 md:row-span-1' : ''}
                    ${isTall ? 'md:col-span-1 md:row-span-2' : ''}
                  `}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {isFeatured && (
                    <div className="absolute top-4 left-4 z-10 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_20px_rgba(0,128,255,0.5)]">
                      Featured
                    </div>
                  )}
                  <CardContent className="p-0 h-full flex flex-col">
                    <div 
                      className={`
                        relative overflow-hidden rounded-t-lg
                        ${isFeatured ? 'h-64' : isTall ? 'h-48' : 'h-40'}
                        bg-gradient-to-br from-[var(--surface-3)] to-[var(--surface-2)]
                      `}
                    >
                      <div 
                        className={`
                          absolute inset-0 flex items-center justify-center
                          transition-transform duration-500 ease-out
                          ${hoveredProject === project.id ? 'scale-110' : 'scale-100'}
                        `}
                      >
                        <div className="text-center">
                          <div className="text-6xl font-bold text-[var(--accent)]/20 font-orbitron mb-2">
                            {project.industry.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="text-sm text-gray-500 font-inter">{project.serviceType}</div>
                        </div>
                      </div>
                      <div 
                        className={`
                          absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                          transition-opacity duration-300
                          ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}
                        `}
                      />
                      <div 
                        className={`
                          absolute bottom-0 left-0 right-0 p-4
                          transform transition-transform duration-300
                          ${hoveredProject === project.id ? 'translate-y-0' : 'translate-y-full'}
                        `}
                      >
                        <div className="text-[var(--accent)] text-xs font-medium mb-1">{project.industry}</div>
                        <h3 className="text-lg font-bold font-rajdhani text-white">{project.name}</h3>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-2xl font-bold text-[var(--accent)] mb-3 font-rajdhani">{project.stat}</div>
                      <p className="text-gray-400 text-sm mb-6 font-inter flex-grow">{project.blurb}</p>
                      <div className="flex flex-col gap-2">
                        <Link href={project.href}>
                          <Button variant="outline" className="w-full border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white">
                            View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                        <a
                          href={project.demoHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center text-sm text-gray-400 hover:text-[var(--accent)] transition-colors"
                        >
                          See Live Site <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
