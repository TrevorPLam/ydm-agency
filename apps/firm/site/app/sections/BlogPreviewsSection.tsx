import { Card } from "@agency/ui"
import { AnimateOnScroll } from "@agency/ui"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"
import { blogPosts } from "../data/blogPosts"

export function BlogPreviewsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">Latest Insights</h2>
          <p className="text-gray-400 mb-12 font-inter max-w-3xl">
            Practical advice for growing your business without the fluff.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <AnimateOnScroll key={index} delay={index * 100}>
              <Card className="bg-[var(--surface-2)] border border-white/10 p-6 hover:border-[var(--accent)] transition-colors rounded-2xl">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 font-rajdhani line-clamp-2">{post.title}</h3>
                <p className="text-gray-400 text-sm mb-4 font-inter line-clamp-3">{post.excerpt}</p>
                <Link href="/blog" className="text-[var(--accent)] hover:text-[var(--accent)]/80 text-sm font-medium inline-flex items-center">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
