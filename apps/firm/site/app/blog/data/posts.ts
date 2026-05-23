export const posts = [
  {
    id: 1,
    title: "Why AI Alone Won't Build Your Brand (And What Actually Works)",
    excerpt: "Learn why human creativity and strategic thinking are essential for building a brand that resonates. AI tools are powerful, but they can't replace the nuanced understanding of human psychology and market dynamics that drives authentic brand building.",
    category: "Web Design",
    date: "Jan 15, 2026",
    readTime: "5 min read",
    featured: true
  },
  {
    id: 2,
    title: "Stop Counting Clicks: The Metrics That Actually Matter for Small Business Websites",
    excerpt: "Discover the revenue-focused metrics that drive real business growth, not vanity numbers.",
    category: "SEO/AIEO",
    date: "Jan 8, 2026",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 3,
    title: "The Privacy-First Web: How to Grow Without Being Creepy",
    excerpt: "Build trust and grow your business with privacy-first marketing strategies that respect your customers.",
    category: "Analytics",
    date: "Dec 22, 2025",
    readTime: "7 min read",
    featured: false
  }
]

export const categoryColors: Record<string, string> = {
  "Web Design": "bg-blue-500/20 text-blue-400",
  "SEO/AIEO": "bg-purple-500/20 text-purple-400",
  "Analytics": "bg-green-500/20 text-green-400"
}

export function getCategoryColor(category: string): string {
  return categoryColors[category] || "bg-[var(--accent)]/10 text-[var(--accent)]"
}
