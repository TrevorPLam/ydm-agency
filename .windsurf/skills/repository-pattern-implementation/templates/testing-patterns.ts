import { describe, it, expect } from 'vitest'
import { InMemoryRepository } from './crud-operations'

describe('Repository', () => {
  it('should create and find entity', async () => {
    const repo = new InMemoryRepository()
    const entity = await repo.create({ name: 'test' } as any)
    const found = await repo.findById(entity.id)
    expect(found).toEqual(entity)
  })
})
