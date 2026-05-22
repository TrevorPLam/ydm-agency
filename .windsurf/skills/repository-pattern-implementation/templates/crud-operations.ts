export class InMemoryRepository<T extends Entity> extends BaseRepository<T> {
  private entities = new Map<string, T>()

  async findById(id: string): Promise<T | null> {
    return this.entities.get(id) || null
  }

  async findAll(): Promise<T[]> {
    return Array.from(this.entities.values())
  }

  async create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    const newEntity = {
      ...entity,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as T
    this.entities.set(newEntity.id, newEntity)
    return newEntity
  }

  async update(id: string, entity: Partial<T>): Promise<T> {
    const existing = await this.findById(id)
    if (!existing) throw new Error('Entity not found')
    const updated = { ...existing, ...entity, updatedAt: new Date() }
    this.entities.set(id, updated)
    return updated
  }

  async delete(id: string): Promise<void> {
    this.entities.delete(id)
  }
}
