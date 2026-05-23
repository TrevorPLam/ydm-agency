import { Card, Button } from "@agency/ui"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { posts, getCategoryColor } from "../data/posts"

export function BlogPostsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 md:grid-rows-2 gap-6">
          {/* Featured post - 2x2 large tile */}
          <Card className="bg-[var(--surface-2)] border border-white/10 p-8 hover:border-[var(--accent)] transition-colors rounded-2xl md:col-span-2 md:row-span-2 relative overflow-hidden group">
            <div className="absolute top-4 right-4 px-3 py-1 bg-[var(--accent)] text-white text-xs font-bold rounded-full">Featured</div>
            <div className={`${getCategoryColor(posts[0].category)} text-xs font-medium mb-3 inline-block px-3 py-1 rounded-full`}>{posts[0].category}</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-rajdhani">{posts[0].title}</h3>
            <p className="text-gray-400 text-base mb-6 font-inter leading-relaxed">{posts[0].excerpt}</p>
            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{posts[0].date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{posts[0].readTime}</span>
              </div>
            </div>
            <Button variant="outline" className="border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white group-hover:shadow-[0_0_20px_rgba(0,128,255,0.3)] transition-all">
              Read More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>

          {/* Second post - 1x1 tile */}
          <Card className="bg-[var(--surface-3)] border border-white/10 p-6 hover:border-[var(--accent)] transition-colors rounded-2xl md:col-span-1 md:row-span-1">
            <div className={`${getCategoryColor(posts[1].category)} text-xs font-medium mb-2 inline-block px-2 py-1 rounded-full`}>{posts[1].category}</div>
            <h3 className="text-lg font-bold mb-2 font-rajdhani line-clamp-2">{posts[1].title}</h3>
            <p className="text-gray-400 text-sm mb-4 font-inter line-clamp-2">{posts[1].excerpt}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{posts[1].date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{posts[1].readTime}</span>
              </div>
            </div>
            <Button variant="outline" className="w-full border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white text-sm">
              Read More
              <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Card>

          {/* Third post - 1x1 tile */}
          <Card className="bg-[var(--surface-2)] border border-white/10 p-6 hover:border-[var(--accent)] transition-colors rounded-2xl md:col-span-1 md:row-span-1">
            <div className={`${getCategoryColor(posts[2].category)} text-xs font-medium mb-2 inline-block px-2 py-1 rounded-full`}>{posts[2].category}</div>
            <h3 className="text-lg font-bold mb-2 font-rajdhani line-clamp-2">{posts[2].title}</h3>
            <p className="text-gray-400 text-sm mb-4 font-inter line-clamp-2">{posts[2].excerpt}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{posts[2].date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{posts[2].readTime}</span>
              </div>
            </div>
            <Button variant="outline" className="w-full border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white text-sm">
              Read More
              <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}
