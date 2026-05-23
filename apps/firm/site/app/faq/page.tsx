"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "./sections/HeroSection"
import { CategoriesSection } from "./sections/CategoriesSection"
import { CTASection } from "./sections/CTASection"
import { useState } from "react"

export default function FaqPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)

  const toggleCategory = (categoryId: string) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId)
    setOpenQuestion(null) // Close any open question when switching categories
  }

  const toggleQuestion = (questionId: string) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />
      <CategoriesSection 
        openCategory={openCategory}
        openQuestion={openQuestion}
        toggleCategory={toggleCategory}
        toggleQuestion={toggleQuestion}
      />
      <CTASection />
    </div>
  )
}
