export const revalidate = 3600 // 1 hour

export async function generateStaticParams() {
  const pages = await client.getEntries({ content_type: 'page' })
  return pages.items.map((page: Page) => ({
    slug: page.fields.slug,
  }))
}
