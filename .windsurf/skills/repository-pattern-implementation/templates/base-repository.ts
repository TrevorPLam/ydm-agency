export abstract class BaseRepository<T extends Entity> implements Repository<T> {
  abstract findById(id: string): Promise<T | null>
  abstract findAll(): Promise<T[]>
  abstract create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>
  abstract update(id: string, entity: Partial<T>): Promise<T>
  abstract delete(id: string): Promise<void>
}
