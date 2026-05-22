export class NotificationService {
  async sendBookingConfirmation(booking: Booking): Promise<void> {
    await email.send({
      to: booking.user.email,
      subject: 'Booking Confirmed',
      template: 'booking-confirmation',
      data: booking,
    })
  }

  async sendReminder(booking: Booking): Promise<void> {
    await email.send({
      to: booking.user.email,
      subject: 'Upcoming Booking Reminder',
      template: 'booking-reminder',
      data: booking,
    })
  }
}
