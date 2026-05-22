export class EventBus {
  private handlers = new Map<string, Set<EventHandler>>()

  on<T>(type: string, handler: EventHandler<T>): void {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set())
    }
    this.handlers.get(type)!.add(handler)
  }

  async emit<T>(event: Event<T>): Promise<void> {
    const handlers = this.handlers.get(event.type) || new Set()
    await Promise.all(Array.from(handlers).map(h => h(event)))
  }
}
