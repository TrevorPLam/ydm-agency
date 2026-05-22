---
name: booking-systems
description: Comprehensive booking systems guide covering Cal.com-style scheduling, resource management, timezone handling, payment integration, and notification workflows
---

## Purpose
Guide booking systems implementation with Cal.com-style scheduling, resource management, timezone handling, payment integration, and notification workflows for marketing agency client tools.

## When to Invoke
- When implementing booking systems
- When setting up scheduling features
- When integrating payment processing

## Prerequisites
- Next.js configured
- Database configured
- Payment provider account

## Implementation Steps

### 1. Design booking data model
Use the template in `templates/booking-schema.sql`

### 2. Implement scheduling logic
Reference `templates/scheduling-service.ts`

### 3. Add timezone handling
Use `templates/timezone-utils.ts`

### 4. Integrate payment processing
Use `templates/payment-integration.ts`

### 5. Configure notifications
Use `templates/notification-workflow.ts`

## Templates
- `templates/booking-schema.sql` - Booking database schema
- `templates/scheduling-service.ts` - Scheduling service template
- `templates/timezone-utils.ts` - Timezone utilities
- `templates/payment-integration.ts` - Payment integration
- `templates/notification-workflow.ts` - Notification workflow

## Patterns
- Use UTC for storage, local for display
- Implement conflict detection
- Use webhooks for payment updates

## Anti-Patterns
- Don't ignore timezone offsets
- Don't allow double bookings
- Don't skip payment verification

## Related Skills
- Multi-Tenant Architecture Skill
- DDD Domain Package Skill
