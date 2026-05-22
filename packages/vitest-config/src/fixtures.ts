import { onTestFinished } from 'vitest';

// Database fixture with builder pattern
export class DatabaseFixture {
	private tables: Map<string, any[]> = new Map();
	private connections: number = 0;

	constructor() {
		this.tables.set('users', []);
		this.tables.set('posts', []);
	}

	withTable(name: string, data: any[] = []): this {
		this.tables.set(name, data);
		return this;
	}

	withUser(user: any): this {
		const users = this.tables.get('users') || [];
		users.push(user);
		this.tables.set('users', users);
		return this;
	}

	withPost(post: any): this {
		const posts = this.tables.get('posts') || [];
		posts.push(post);
		this.tables.set('posts', posts);
		return this;
	}

	connect(): this {
		this.connections++;
		return this;
	}

	getTable(name: string): any[] {
		return this.tables.get(name) || [];
	}

	getUser(id: string): any | undefined {
		const users = this.tables.get('users') || [];
		return users.find((u) => u.id === id);
	}

	cleanup(): void {
		this.tables.clear();
		this.connections = 0;
	}
}

// User fixture with builder pattern
export class UserFixture {
	private user: {
		id?: string;
		name?: string;
		email?: string;
		role?: 'admin' | 'user' | 'guest';
		verified?: boolean;
	};

	constructor() {
		this.user = {
			role: 'user',
			verified: false,
		};
	}

	withId(id: string): this {
		this.user.id = id;
		return this;
	}

	withName(name: string): this {
		this.user.name = name;
		return this;
	}

	withEmail(email: string): this {
		this.user.email = email;
		return this;
	}

	withRole(role: 'admin' | 'user' | 'guest'): this {
		this.user.role = role;
		return this;
	}

	asVerified(): this {
		this.user.verified = true;
		return this;
	}

	asGuest(): this {
		this.user.role = 'guest';
		return this;
	}

	asAdmin(): this {
		this.user.role = 'admin';
		this.user.verified = true;
		return this;
	}

	build(): this['user'] {
		return { ...this.user };
	}
}

// TempFile fixture with onCleanup
export class TempFileFixture {
	private filePaths: string[] = [];

	async create(content: string, filename?: string): Promise<string> {
		const path = filename || `/tmp/test-${Date.now()}.txt`;
		this.filePaths.push(path);
		// In a real implementation, this would write to disk
		// await fs.writeFile(path, content);
		return path;
	}

	async createJSON(data: unknown, filename?: string): Promise<string> {
		const path = filename || `/tmp/test-${Date.now()}.json`;
		this.filePaths.push(path);
		// In a real implementation, this would write to disk
		// await fs.writeFile(path, JSON.stringify(data, null, 2));
		return path;
	}

	cleanup(): void {
		// In a real implementation, this would delete files
		// for (const path of this.filePaths) {
		//   await fs.unlink(path);
		// }
		this.filePaths = [];
	}
}

// Extended test object with type inference
export interface ExtendedTestContext {
	database: DatabaseFixture;
	user: UserFixture;
	tempFile: TempFileFixture;
}

export function createFixtures(): ExtendedTestContext {
	const database = new DatabaseFixture();
	const user = new UserFixture();
	const tempFile = new TempFileFixture();

	// Register cleanup on test finish
	onTestFinished(() => {
		database.cleanup();
		tempFile.cleanup();
	});

	return {
		database,
		user,
		tempFile,
	};
}

// Helper function to create fixtures in tests
export function useFixtures() {
	return createFixtures();
}
