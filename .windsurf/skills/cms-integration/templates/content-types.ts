export interface Page {
  sys: { id: string }
  fields: {
    title: string
    slug: string
    content: any
  }
}

export interface Post {
  sys: { id: string }
  fields: {
    title: string
    slug: string
    content: any
    publishedAt: string
  }
}
