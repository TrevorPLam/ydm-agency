import type { Workspace } from '../types';

export const buildWorkspace = (overrides: Partial<Workspace> = {}): Workspace => ({
	id: '1',
	name: 'Test Workspace',
	slug: 'test-workspace',
	...overrides,
});
