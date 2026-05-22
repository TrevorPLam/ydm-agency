import { describe, it, expect } from 'vitest';
import { parseEmail, type EmailMessage } from './mail-parser';

describe('mail parser', () => {
	describe('EmailMessage type', () => {
		it('should accept valid email message object', () => {
			const email: EmailMessage = {
				id: 'msg-123',
				subject: 'Test Subject',
				from: 'sender@example.com',
				to: ['recipient@example.com'],
				body: 'Test body content',
				timestamp: new Date('2024-05-22T10:00:00.000Z'),
			};
			expect(email.id).toBe('msg-123');
			expect(email.subject).toBe('Test Subject');
			expect(email.from).toBe('sender@example.com');
			expect(email.to).toEqual(['recipient@example.com']);
			expect(email.body).toBe('Test body content');
		});

		it('should accept multiple recipients', () => {
			const email: EmailMessage = {
				id: 'msg-456',
				subject: 'Group Email',
				from: 'sender@example.com',
				to: ['recipient1@example.com', 'recipient2@example.com'],
				body: 'Group message',
				timestamp: new Date(),
			};
			expect(email.to).toHaveLength(2);
		});
	});

	describe('parseEmail', () => {
		it('should return an EmailMessage object', () => {
			const result = parseEmail('raw email content');
			expect(result).toBeDefined();
			expect(result.id).toBeDefined();
			expect(result.subject).toBeDefined();
			expect(result.from).toBeDefined();
			expect(result.to).toBeDefined();
			expect(result.body).toBeDefined();
			expect(result.timestamp).toBeInstanceOf(Date);
		});

		it('should handle empty string input', () => {
			const result = parseEmail('');
			expect(result).toBeDefined();
		});

		it('should handle null-like input', () => {
			const result = parseEmail('');
			expect(result).toBeDefined();
		});
	});
});
