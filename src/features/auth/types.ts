export type Permission = {
  id: string;
  name: string;
  code: string;
  description: string;
};

export type Role = {
  id: string;
  name: string;
  code: string;
  description: string;
  permissions: Permission[];
};

export type User = {
  id: string;
  username: string;
  email: string;
  role: Role;
};

export const PERMISSIONS = {
  // 客户管理权限
  CUSTOMER_VIEW: 'customer:view',
  CUSTOMER_CREATE: 'customer:create',
  CUSTOMER_EDIT: 'customer:edit',
  CUSTOMER_DELETE: 'customer:delete',

  // 销售管理权限
  SALES_VIEW: 'sales:view',
  SALES_CREATE: 'sales:create',
  SALES_EDIT: 'sales:edit',
  SALES_DELETE: 'sales:delete',

  // 任务管理权限
  TASK_VIEW: 'task:view',
  TASK_CREATE: 'task:create',
  TASK_EDIT: 'task:edit',
  TASK_DELETE: 'task:delete',

  // 报表管理权限
  REPORT_VIEW: 'report:view',
  REPORT_CREATE: 'report:create',
  REPORT_EDIT: 'report:edit',
  REPORT_DELETE: 'report:delete',

  // 权限管理
  ROLE_MANAGE: 'role:manage'
};

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  SALES: 'sales',
  VIEWER: 'viewer'
};