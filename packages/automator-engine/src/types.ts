// Automator types
export interface AutomatorRule {
  id: string;
  name: string;
  conditions: Condition[];
  actions: Action[];
}

export interface Condition {
  type: string;
  field: string;
  operator: string;
  value: any;
}

export interface Action {
  type: 'change-status' | 'send-notification' | 'create-task' | 'assign-user';
  params: Record<string, any>;
}
