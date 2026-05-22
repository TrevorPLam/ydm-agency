export class SchedulingService {
  async checkAvailability(resourceId: string, startTime: Date, endTime: Date): Promise<boolean> {
    const conflicts = await db.query(
      'SELECT * FROM bookings WHERE resource_id = $1 AND (start_time < $2 AND end_time > $3)',
      [resourceId, endTime, startTime]
    )
    return conflicts.length === 0
  }

  async createBooking(booking: Booking): Promise<Booking> {
    const available = await this.checkAvailability(booking.resourceId, booking.startTime, booking.endTime)
    if (!available) {
      throw new Error('Time slot not available')
    }
    return db.query('INSERT INTO bookings (...) VALUES (...) RETURNING *', [booking])
  }
}
