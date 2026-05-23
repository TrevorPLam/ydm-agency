import { FileText, Palette, Share2, TrendingUp, Users, CreditCard, MessageSquare, Search } from "lucide-react"

export const addOns = [
  {
    id: "content",
    icon: FileText,
    title: "Content Suite",
    description: "Strategy, writing, and publishing that fuels your SEO and authority.",
    badge: "2 services",
    details: "Includes: Blog & Resource Management, Newsletter & Email Marketing",
    span: "md:col-span-2 md:row-span-1"
  },
  {
    id: "brand",
    icon: Palette,
    title: "Brand Identity & Marketing Kit",
    description: "From logo systems to presentation templates, get a cohesive visual brand that builds trust.",
    details: "Deliverables: Logo, style guide, templates, brand guidelines",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    id: "social",
    icon: Share2,
    title: "Social Media Management",
    description: "Done-for-you content creation, scheduling, and engagement on the platforms that matter.",
    details: "Platforms: LinkedIn, Twitter/X, Instagram, Facebook",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    id: "analytics",
    icon: TrendingUp,
    title: "Analytics & Optimization",
    description: "Turn data into decisions; improve what's working and fix what's not.",
    badge: "2 services",
    details: "Includes: Analytics & CRO, SEO & AIEO",
    span: "md:col-span-2 md:row-span-1"
  },
  {
    id: "crm",
    icon: Users,
    title: "CRM Management",
    description: "Setup, automation, data hygiene—so your leads never fall through the cracks.",
    details: "Tools: HubSpot, Salesforce, Pipedrive, custom integrations",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    id: "ppc",
    icon: CreditCard,
    title: "PPC & Paid Media",
    description: "Strategic ad buying and optimization tied to real revenue, not just clicks.",
    details: "Channels: Google Ads, Meta Ads, LinkedIn Ads, retargeting",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    id: "reputation",
    icon: MessageSquare,
    title: "Reputation Management",
    description: "Monitor, manage, and generate reviews that build social proof.",
    details: "Features: Review monitoring, response management, review generation campaigns, sentiment analysis",
    span: "md:col-span-1 md:row-span-2"
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO & AIEO",
    description: "Organic visibility on Google and AI answer engines—ethical, data-driven, transparent.",
    details: "Focus: Technical SEO, content optimization, AI engine optimization",
    span: "md:col-span-1 md:row-span-1"
  }
]
