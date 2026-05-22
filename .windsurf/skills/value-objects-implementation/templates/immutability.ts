export class Money extends ValueObject<{ amount: number; currency: string }> {
  constructor(amount: number, currency: string) {
    super({ amount, currency })
  }

  add(other: Money): Money {
    if (this.value.currency !== other.value.currency) {
      throw new Error('Cannot add different currencies')
    }
    return new Money(this.value.amount + other.value.amount, this.value.currency)
  }
}
