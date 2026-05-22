import type { WorkItem } from '../types';

export const buildWorkItem = (overrides: Partial<WorkItem> = {}): WorkItem => ({
	id: '1',
	title: 'Test Task',
	status: 'todo',
	...overrides,
});

export const buildInProgressWorkItem = (
	overrides: Partial<WorkItem> = {},
): WorkItem =>
	buildWorkItem({
		status: 'in-progress',
		...overrides,
	});

export const buildCompletedWorkItem = (
	overrides: Partial<WorkItem> = {},
): WorkItem =>
	buildWorkItem({
		status: 'done',
		...overrides,
	});
