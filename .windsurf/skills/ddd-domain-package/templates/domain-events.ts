export interface DomainEvent {
  type: string
  aggregateId: string
  occurredAt: Date
  payload: unknown
}

export class EventDispatcher {
  private handlers = new Map<string, Set<EventHandler>>()

  register(type: string, handler: EventHandler): void {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set())
    }
    this.handlers.get(type)!.add(handler)
  }

  async dispatch(event: DomainEvent): Promise<void> {
    const handlers = this.handlers.get(event.type) || new Set()
    await Promise.all(Array.from(handlers).map(h => h(event)))
  }
}

export type EventHandler = (event: DomainEvent) => Promise<void>
