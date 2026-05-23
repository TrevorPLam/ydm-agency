import { Navigation } from "@/components/navigation"
import { HeroSection } from "./sections/HeroSection"
import { ProblemSection } from "./sections/ProblemSection"
import { PhilosophySection } from "./sections/PhilosophySection"
import { CommitmentsSection } from "./sections/CommitmentsSection"
import { FounderSection } from "./sections/FounderSection"
import { AudienceSection } from "./sections/AudienceSection"
import { CTASection } from "./sections/CTASection"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <PhilosophySection />
      <CommitmentsSection />
      <FounderSection />
      <AudienceSection />
      <CTASection />
    </div>
  )
}
