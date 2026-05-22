export async function indexContent(content: Content[]) {
  const index = client.initIndex('content')

  const objects = content.map((item) => ({
    objectID: item.id,
    title: item.title,
    content: item.content,
    tags: item.tags,
    publishedAt: item.publishedAt,
  }))

  await index.saveObjects(objects)
}

export async function deleteFromIndex(id: string) {
  const index = client.initIndex('content')
  await index.deleteObject(id)
}
