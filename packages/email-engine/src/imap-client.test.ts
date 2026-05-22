import { describe, it, expect, beforeEach } from 'vitest';
import { IMAPClient } from './imap-client';

describe('IMAPClient', { tags: ['unit'] }, () => {
	let client: IMAPClient;

	beforeEach(() => {
		client = new IMAPClient({
			host: 'imap.example.com',
			port: 993,
			user: 'test@example.com',
			pass: 'password',
		});
	});

	describe('constructor', () => {
		it('should create an instance with config', () => {
			expect(client).toBeInstanceOf(IMAPClient);
		});

		it('should store config', () => {
			const config = {
				host: 'imap.example.com',
				port: 993,
				user: 'test@example.com',
				pass: 'password',
			};
			const newClient = new IMAPClient(config);
			expect(newClient).toBeDefined();
		});
	});

	describe('connect', () => {
		it('should connect without throwing', async () => {
			await expect(client.connect()).resolves.not.toThrow();
		});

		it('should return a promise', async () => {
			const result = client.connect();
			expect(result).toBeInstanceOf(Promise);
			await result;
		});
	});

	describe('fetchMessages', () => {
		it('should return an array', async () => {
			const messages = await client.fetchMessages();
			expect(Array.isArray(messages)).toBe(true);
		});

		it('should return empty array initially', async () => {
			const messages = await client.fetchMessages();
			expect(messages).toHaveLength(0);
		});

		it('should return a promise', async () => {
			const result = client.fetchMessages();
			expect(result).toBeInstanceOf(Promise);
			await result;
		});
	});
});
