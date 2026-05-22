import { describe, it, expect } from 'vitest';
import type { AutomatorRule, Condition, Action } from './types';

describe('automator types', () => {
	describe('AutomatorRule', () => {
		it('should accept valid rule object', () => {
			const rule: AutomatorRule = {
				id: 'rule-1',
				name: 'Test Rule',
				conditions: [
					{
						type: 'field',
						field: 'status',
						operator: 'equals',
						value: 'pending',
					},
				],
				actions: [
					{
						type: 'change-status',
						params: { status: 'in-progress' },
					},
				],
			};
			expect(rule.id).toBe('rule-1');
			expect(rule.name).toBe('Test Rule');
			expect(rule.conditions).toHaveLength(1);
			expect(rule.actions).toHaveLength(1);
		});

		it('should accept multiple conditions', () => {
			const rule: AutomatorRule = {
				id: 'rule-2',
				name: 'Multi-condition Rule',
				conditions: [
					{
						type: 'field',
						field: 'status',
						operator: 'equals',
						value: 'pending',
					},
					{
						type: 'field',
						field: 'priority',
						operator: 'greater-than',
						value: 5,
					},
				],
				actions: [],
			};
			expect(rule.conditions).toHaveLength(2);
		});

		it('should accept multiple actions', () => {
			const rule: AutomatorRule = {
				id: 'rule-3',
				name: 'Multi-action Rule',
				conditions: [],
				actions: [
					{
						type: 'change-status',
						params: { status: 'in-progress' },
					},
					{
						type: 'send-notification',
						params: { message: 'Task started' },
					},
				],
			};
			expect(rule.actions).toHaveLength(2);
		});
	});

	describe('Condition', () => {
		it('should accept valid condition object', () => {
			const condition: Condition = {
				type: 'field',
				field: 'status',
				operator: 'equals',
				value: 'pending',
			};
			expect(condition.type).toBe('field');
			expect(condition.field).toBe('status');
			expect(condition.operator).toBe('equals');
			expect(condition.value).toBe('pending');
		});

		it('should accept numeric values', () => {
			const condition: Condition = {
				type: 'field',
				field: 'priority',
				operator: 'greater-than',
				value: 5,
			};
			expect(condition.value).toBe(5);
		});

		it('should accept boolean values', () => {
			const condition: Condition = {
				type: 'field',
				field: 'isActive',
				operator: 'equals',
				value: true,
			};
			expect(condition.value).toBe(true);
		});
	});

	describe('Action', () => {
		it('should accept change-status action', () => {
			const action: Action = {
				type: 'change-status',
				params: { status: 'completed' },
			};
			expect(action.type).toBe('change-status');
			expect(action.params.status).toBe('completed');
		});

		it('should accept send-notification action', () => {
			const action: Action = {
				type: 'send-notification',
				params: { message: 'Test notification', userId: '123' },
			};
			expect(action.type).toBe('send-notification');
		});

		it('should accept create-task action', () => {
			const action: Action = {
				type: 'create-task',
				params: { title: 'New Task', assigneeId: '456' },
			};
			expect(action.type).toBe('create-task');
		});

		it('should accept assign-user action', () => {
			const action: Action = {
				type: 'assign-user',
				params: { userId: '789' },
			};
			expect(action.type).toBe('assign-user');
		});

		it('should accept all valid action types', () => {
			const actionTypes: Array<Action['type']> = [
				'change-status',
				'send-notification',
				'create-task',
				'assign-user',
			];
			expect(actionTypes).toHaveLength(4);
		});
	});
});
