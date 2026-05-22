export class EventHandler {
  constructor(private eventBus: EventBus) {}

  register<T>(type: string, handler: EventHandler<T>): void {
    this.eventBus.on(type, handler)
  }
}
