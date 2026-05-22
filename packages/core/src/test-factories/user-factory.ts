import type { User } from '../types';

export const buildUser = (overrides: Partial<User> = {}): User => ({
	id: '1',
	email: 'test@example.com',
	name: 'Test User',
	role: 'member',
	...overrides,
});

export const buildAdminUser = (overrides: Partial<User> = {}): User =>
	buildUser({
		role: 'admin',
		...overrides,
	});

export const buildOwnerUser = (overrides: Partial<User> = {}): User =>
	buildUser({
		role: 'owner',
		...overrides,
	});
