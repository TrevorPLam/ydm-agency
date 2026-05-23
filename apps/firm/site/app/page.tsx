import { Navigation } from "@/components/navigation"
import { HeroSection } from "./sections/HeroSection"
import { AntiTemplateStorySection } from "./sections/AntiTemplateStorySection"
import { HandcraftedServicesSection } from "./sections/HandcraftedServicesSection"
import { PortfolioSection } from "./sections/PortfolioSection"
import { ProcessSection } from "./sections/ProcessSection"
import { MarketingPartnerStripSection } from "./sections/MarketingPartnerStrip"
import { BlogPreviewsSection } from "./sections/BlogPreviewsSection"
import { TrustStatementSection } from "./sections/TrustStatementSection"
import { CTASection } from "./sections/CTASection"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Your Dedicated Marketer - Web Design That Builds Your Business",
  description: "Custom websites, transparent SEO, and analytics tied to your revenue. No generic AI fluff, no vanity metrics, no creepy tracking. Just a dedicated marketer in your corner.",
  keywords: ["web design", "SEO", "analytics", "digital marketing", "revenue-focused marketing", "small business marketing"],
  authors: [{ name: "Your Dedicated Marketer" }],
  openGraph: {
    title: "Your Dedicated Marketer - Web Design That Builds Your Business",
    description: "Custom websites, transparent SEO, and analytics tied to your revenue. No generic AI fluff, no vanity metrics, no creepy tracking.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Dedicated Marketer - Web Design That Builds Your Business",
    description: "Custom websites, transparent SEO, and analytics tied to your revenue. No generic AI fluff, no vanity metrics, no creepy tracking.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Your Dedicated Marketer",
  "description": "Custom websites, transparent SEO, and analytics tied to your revenue. No generic AI fluff, no vanity metrics, no creepy tracking.",
  "url": "https://yourdedicatedmarketer.com",
  "serviceType": ["Web Design", "SEO", "Digital Marketing", "Analytics"],
  "priceRange": "$$",
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <HeroSection />
        <AntiTemplateStorySection />
        <HandcraftedServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <MarketingPartnerStripSection />
        <BlogPreviewsSection />
        <TrustStatementSection />
        <CTASection />
      </div>
    </>
  )
}
