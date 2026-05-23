import { Card } from "@agency/ui"
import { ChevronDown, ChevronUp, Star } from "lucide-react"
import { categories } from "../data/categories"

interface CategoriesSectionProps {
  openCategory: string | null
  openQuestion: string | null
  toggleCategory: (categoryId: string) => void
  toggleQuestion: (questionId: string) => void
}

export function CategoriesSection({ openCategory, openQuestion, toggleCategory, toggleQuestion }: CategoriesSectionProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 md:grid-rows-2 gap-6">
          {categories.map((category, index) => {
            const isCategoryOpen = openCategory === category.id
            // Bento layout: first 3 categories are 2x1, last 3 are 1x1
            const isWide = index < 3
            return (
              <Card 
                key={category.id} 
                className={`bg-[var(--surface-2)] border border-white/10 overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${isWide ? 'md:col-span-2 md:row-span-1' : 'md:col-span-1 md:row-span-1'}`}
                style={{ 
                  '--category-accent': category.accent,
                  borderColor: isCategoryOpen ? `var(--category-accent)` : 'rgba(255,255,255,0.1)'
                } as React.CSSProperties}
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors relative"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold font-rajdhani" style={{ color: 'var(--category-accent)' }}>{category.title}</h2>
                      {category.popular && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--category-accent)20', color: 'var(--category-accent)' }}>
                          <Star className="h-3 w-3" />
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 font-inter mb-2">{category.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="font-medium" style={{ color: 'var(--category-accent)' }}>{category.questions.length} questions</span>
                    </div>
                  </div>
                  {isCategoryOpen ? (
                    <ChevronUp className="h-5 w-5 shrink-0 ml-4" style={{ color: 'var(--category-accent)' }} />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 shrink-0 ml-4" />
                  )}
                </button>
                
                {isCategoryOpen && (
                  <div className="border-t border-white/10">
                    {category.questions.map((question) => {
                      const isQuestionOpen = openQuestion === question.id
                      return (
                        <div key={question.id} className="border-b border-white/10 last:border-b-0">
                          <button
                            onClick={() => toggleQuestion(question.id)}
                            className="w-full p-4 text-left flex items-start justify-between hover:bg-white/5 transition-colors"
                          >
                            <span className="font-medium font-rajdhani pr-4">{question.question}</span>
                            {isQuestionOpen ? (
                              <ChevronUp className="h-4 w-4 shrink-0" style={{ color: 'var(--category-accent)' }} />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                            )}
                          </button>
                          {isQuestionOpen && (
                            <div className="px-4 pb-4">
                              <p className="text-gray-400 font-inter leading-relaxed">{question.answer}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
