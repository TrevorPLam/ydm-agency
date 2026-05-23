import { Button } from "@agency/ui"
import { Zap } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "./sections/HeroSection"
import { BlogPostsSection } from "./sections/BlogPostsSection"
import { CTASection } from "./sections/CTASection"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />
      <BlogPostsSection />
      <CTASection />
    </div>
  )
}
