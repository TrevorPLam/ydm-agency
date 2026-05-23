"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "./sections/HeroSection"
import { FilterSection } from "./sections/FilterSection"
import { ProjectGridSection } from "./sections/ProjectGridSection"
import { FeaturedCaseStudySection } from "./sections/FeaturedCaseStudySection"
import { ProcessSection } from "./sections/ProcessSection"
import { TestimonialSection } from "./sections/TestimonialSection"
import { CTASection } from "./sections/CTASection"
import { useState } from "react"
import { projects } from "./data/projects"

export default function WorkPage() {
  const [industryFilter, setIndustryFilter] = useState("All")
  const [serviceFilter, setServiceFilter] = useState("All")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const filteredProjects = projects.filter(project => {
    const industryMatch = industryFilter === "All" || project.industry === industryFilter
    const serviceMatch = serviceFilter === "All" || project.serviceType === serviceFilter
    return industryMatch && serviceMatch
  })

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />
      <FilterSection 
        industryFilter={industryFilter}
        serviceFilter={serviceFilter}
        setIndustryFilter={setIndustryFilter}
        setServiceFilter={setServiceFilter}
        filteredCount={filteredProjects.length}
      />
      <ProjectGridSection 
        filteredProjects={filteredProjects}
        hoveredProject={hoveredProject}
        setHoveredProject={setHoveredProject}
      />
      <FeaturedCaseStudySection />
      <ProcessSection />
      <TestimonialSection />
      <CTASection />
    </div>
  )
}
