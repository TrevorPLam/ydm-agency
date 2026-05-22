import { describe, it, expect, beforeEach } from 'vitest';
import { AutomatorEngine } from './engine';
import type { AutomatorRule } from './types';

describe('AutomatorEngine', { tags: ['unit'] }, () => {
	let engine: AutomatorEngine;

	beforeEach(() => {
		engine = new AutomatorEngine();
	});

	describe('constructor', () => {
		it('should create an instance', () => {
			expect(engine).toBeInstanceOf(AutomatorEngine);
		});

		it('should initialize with an engine', () => {
			expect(engine).toBeDefined();
		});
	});

	describe('addRule', () => {
		it('should add a rule without throwing', () => {
			const rule: AutomatorRule = {
				id: 'rule-1',
				name: 'Test Rule',
				conditions: [],
				actions: [],
			};
			expect(() => engine.addRule(rule)).not.toThrow();
		});

		it('should accept rule with valid structure', () => {
			const rule: AutomatorRule = {
				id: 'rule-2',
				name: 'Valid Rule',
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
			expect(() => engine.addRule(rule)).not.toThrow();
		});
	});

	describe('evaluate', () => {
		it('should return an array', async () => {
			const result = await engine.evaluate({});
			expect(Array.isArray(result)).toBe(true);
		});

		it('should return empty array for no rules', async () => {
			const result = await engine.evaluate({});
			expect(result).toHaveLength(0);
		});

		it('should accept facts object', async () => {
			const facts = { status: 'pending', priority: 5 };
			const result = await engine.evaluate(facts);
			expect(Array.isArray(result)).toBe(true);
		});

		it('should handle empty facts', async () => {
			const result = await engine.evaluate({});
			expect(Array.isArray(result)).toBe(true);
		});
	});
});
