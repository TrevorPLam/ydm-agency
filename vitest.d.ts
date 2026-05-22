import 'vitest';

declare module 'vitest' {
	interface TestTags {
		tags: 'unit' | 'integration' | 'e2e' | 'slow' | 'db' | 'flaky';
	}
}
