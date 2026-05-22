import { describe, it, expect, vi } from 'vitest'
import { EventBus } from './event-bus'

describe('EventBus', () => {
  it('should emit events to handlers', async () => {
    const bus = new EventBus()
    const handler = vi.fn()
    bus.on('test', handler)
    await bus.emit({ type: 'test', payload: {}, timestamp: new Date() })
    expect(handler).toHaveBeenCalled()
  })
})
