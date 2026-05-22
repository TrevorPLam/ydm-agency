import { describe, it, expect } from 'vitest';
import type { User, Workspace, WorkItem } from './types';
import {
	buildUser,
	buildAdminUser,
	buildWorkspace,
	buildWorkItem,
	buildInProgressWorkItem,
} from './test-factories';

describe('types', { tags: ['unit'] }, () => {
  describe('User', () => {
    it('should accept valid user object from factory', () => {
      const user = buildUser({ role: 'admin' });
      expect(user.id).toBeDefined();
      expect(user.email).toBe('test@example.com');
      expect(user.name).toBe('Test User');
      expect(user.role).toBe('admin');
    });

    it('should accept all valid roles', () => {
      const roles: Array<User['role']> = ['owner', 'admin', 'member', 'client'];
      expect(roles).toHaveLength(4);
    });

    it('should create admin user with correct role', () => {
      const admin = buildAdminUser();
      expect(admin.role).toBe('admin');
    });
  });

  describe('Workspace', () => {
    it('should accept valid workspace object from factory', () => {
      const workspace = buildWorkspace();
      expect(workspace.id).toBeDefined();
      expect(workspace.name).toBe('Test Workspace');
      expect(workspace.slug).toBe('test-workspace');
    });

    it('should accept workspace with custom values', () => {
      const workspace = buildWorkspace({
        name: 'Custom Workspace',
        slug: 'custom-workspace',
      });
      expect(workspace.name).toBe('Custom Workspace');
      expect(workspace.slug).toBe('custom-workspace');
    });
  });

  describe('WorkItem', () => {
    it('should accept valid work item object from factory', () => {
      const workItem = buildWorkItem();
      expect(workItem.id).toBeDefined();
      expect(workItem.title).toBe('Test Task');
      expect(workItem.status).toBe('todo');
    });

    it('should accept work item with optional fields', () => {
      const workItem = buildInProgressWorkItem({
        assigneeId: '2',
        templateId: '3',
      });
      expect(workItem.status).toBe('in-progress');
      expect(workItem.assigneeId).toBe('2');
      expect(workItem.templateId).toBe('3');
    });
  });
});
