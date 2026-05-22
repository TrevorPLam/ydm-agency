export type Event<T = unknown> = {
  type: string
  payload: T
  timestamp: Date
}

export type EventHandler<T = unknown> = (event: Event<T>) => Promise<void>
