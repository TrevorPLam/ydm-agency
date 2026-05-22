import { Entity } from '@agency/repository-pattern'

export interface AggregateRoot extends Entity {
  getDomainEvents(): DomainEvent[]
  clearDomainEvents(): void
}

export abstract class BaseAggregateRoot implements AggregateRoot {
  private events: DomainEvent[] = []
  id: string
  createdAt: Date
  updatedAt: Date

  constructor(id: string) {
    this.id = id
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  protected addEvent(event: DomainEvent): void {
    this.events.push(event)
  }

  getDomainEvents(): DomainEvent[] {
    return [...this.events]
  }

  clearDomainEvents(): void {
    this.events = []
  }
}
