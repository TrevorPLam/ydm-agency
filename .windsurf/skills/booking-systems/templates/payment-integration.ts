export class PaymentService {
  async createPaymentIntent(bookingId: string, amount: number): Promise<PaymentIntent> {
    return stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      metadata: { bookingId },
    })
  }

  async handleWebhook(event: Stripe.Event): Promise<void> {
    if (event.type === 'payment_intent.succeeded') {
      await this.confirmBooking(event.data.object.metadata.bookingId)
    }
  }
}
