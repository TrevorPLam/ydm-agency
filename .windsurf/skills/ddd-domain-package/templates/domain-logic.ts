export class Order extends BaseAggregateRoot {
  private constructor(
    public readonly customerId: string,
    private items: OrderItem[],
  ) {
    super(crypto.randomUUID())
  }

  static create(customerId: string, items: OrderItem[]): Order {
    const order = new Order(customerId, items)
    order.addEvent({
      type: 'OrderCreated',
      aggregateId: order.id,
      occurredAt: new Date(),
      payload: { customerId, items },
    })
    return order
  }

  addItem(item: OrderItem): void {
    this.items.push(item)
    this.updatedAt = new Date()
  }
}

export interface OrderItem {
  productId: string
  quantity: number
  price: number
}
