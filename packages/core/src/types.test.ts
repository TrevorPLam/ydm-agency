import { describe, it, expect } from 'vitest';
import type { User, Workspace, WorkItem } from './types';

describe('types', () => {
  describe('User', () => {
    it('should accept valid user object', () => {
      const user: User = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'admin',
      };
      expect(user.id).toBe('1');
      expect(user.email).toBe('test@example.com');
      expect(user.name).toBe('Test User');
      expect(user.role).toBe('admin');
    });

    it('should accept all valid roles', () => {
      const roles: Array<User['role']> = ['owner', 'admin', 'member', 'client'];
      expect(roles).toHaveLength(4);
    });
  });

  describe('Workspace', () => {
    it('should accept valid workspace object', () => {
      const workspace: Workspace = {
        id: '1',
        name: 'Test Workspace',
        slug: 'test-workspace',
      };
      expect(workspace.id).toBe('1');
      expect(workspace.name).toBe('Test Workspace');
      expect(workspace.slug).toBe('test-workspace');
    });
  });

  describe('WorkItem', () => {
    it('should accept valid work item object', () => {
      const workItem: WorkItem = {
        id: '1',
        title: 'Test Task',
        status: 'todo',
      };
      expect(workItem.id).toBe('1');
      expect(workItem.title).toBe('Test Task');
      expect(workItem.status).toBe('todo');
    });

    it('should accept work item with optional fields', () => {
      const workItem: WorkItem = {
        id: '1',
        title: 'Test Task',
        status: 'in-progress',
        assigneeId: '2',
        templateId: '3',
      };
      expect(workItem.assigneeId).toBe('2');
      expect(workItem.templateId).toBe('3');
    });
  });
});
