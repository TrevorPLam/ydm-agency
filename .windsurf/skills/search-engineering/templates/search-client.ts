import algoliasearch from 'algoliasearch'

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY)
const index = client.initIndex('content')

export async function search(query: string, filters?: string) {
  return index.search(query, { filters })
}

export async function indexDocument(id: string, document: any) {
  return index.saveObject({ objectID: id, ...document })
}
