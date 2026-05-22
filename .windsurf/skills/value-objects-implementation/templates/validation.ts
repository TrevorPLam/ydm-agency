export abstract class ValidatedValueObject<T> extends ValueObject<T> {
  constructor(value: T) {
    super(value)
    this.validate(value)
  }

  protected abstract validate(value: T): void
}
