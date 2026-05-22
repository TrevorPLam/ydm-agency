import client from '@/lib/cms-client'
import type { Page } from '@/types/content'

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await client.getEntries<Page>({
    content_type: 'page',
    'fields.slug': params.slug,
  })

  return (
    <div>
      <h1>{page.items[0].fields.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.items[0].fields.content }} />
    </div>
  )
}
