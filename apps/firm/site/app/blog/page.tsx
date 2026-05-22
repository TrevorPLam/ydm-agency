import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Zap, Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Why AI Alone Won't Build Your Brand (And What Actually Works)",
      excerpt: "Learn why human creativity and strategic thinking are essential for building a brand that resonates.",
      category: "Web Design",
      date: "Coming Soon",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Stop Counting Clicks: The Metrics That Actually Matter for Small Business Websites",
      excerpt: "Discover the revenue-focused metrics that drive real business growth, not vanity numbers.",
      category: "SEO/AIEO",
      date: "Coming Soon",
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "The Privacy-First Web: How to Grow Without Being Creepy",
      excerpt: "Build trust and grow your business with privacy-first marketing strategies that respect your customers.",
      category: "Analytics",
      date: "Coming Soon",
      readTime: "7 min read"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/95 backdrop-blur supports-backdrop-filter:bg-black/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-[#0080FF] flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold font-rajdhani">Your Dedicated Marketer</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Home</Link>
              <Link href="/services" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Services</Link>
              <Link href="/work" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Portfolio</Link>
              <Link href="/about" className="text-sm font-medium hover:text-[#0080FF] transition-colors">About</Link>
              <Link href="/blog" className="text-sm font-medium text-[#0080FF]">Blog</Link>
              <Link href="/faq" className="text-sm font-medium hover:text-[#0080FF] transition-colors">FAQ</Link>
              <Link href="/contact" className="text-sm font-medium hover:text-[#0080FF] transition-colors">Contact</Link>
            </div>
            <Button className="bg-[#0080FF] hover:bg-[#0080FF]/90">Book Consultation</Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-black via-[#1E1E1E] to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,128,255,0.1),transparent_50%)]" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 py-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-orbitron leading-tight">
            Actionable Insights, Not Industry Jargon.
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto font-inter">
            Practical advice for growing your business without the fluff.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="bg-[#121212] border border-white/10 p-6 hover:border-[#0080FF] transition-colors">
                <div className="text-[#0080FF] text-xs font-medium mb-2">{post.category}</div>
                <h3 className="text-lg font-bold mb-2 font-rajdhani">{post.title}</h3>
                <p className="text-gray-400 text-sm mb-4 font-inter">{post.excerpt}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-[#0080FF] text-[#0080FF] hover:bg-[#0080FF] hover:text-white text-sm">
                  Read More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Want More Insights Like This?</h2>
          <p className="text-xl text-gray-400 mb-8 font-inter">
            Subscribe to get practical marketing tips delivered to your inbox. No spam, ever.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-[#0080FF] hover:bg-[#0080FF]/90 text-base px-8">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
