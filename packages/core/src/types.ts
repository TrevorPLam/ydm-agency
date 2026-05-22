// Shared TypeScript interfaces and types

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'member' | 'client';
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
}

export interface WorkItem {
  id: string;
  title: string;
  status: string;
  assigneeId?: string;
  templateId?: string;
}
