export class Email extends ValueObject<string> {
  constructor(value: string) {
    super(value)
    if (!this.isValidEmail(value)) {
      throw new Error('Invalid email')
    }
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
}
