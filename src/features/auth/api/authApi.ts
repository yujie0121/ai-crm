import axios from 'axios';
import { Role, Permission, User } from '../types';

const API_BASE_URL = '/api/auth';

export const authApi = {
  // 用户认证相关
  login: async (username: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
    return response.data;
  },

  register: async (userData: { username: string; email: string; password: string }) => {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  },

  // 角色管理相关
  getRoles: async (): Promise<Role[]> => {
    const response = await axios.get(`${API_BASE_URL}/roles`);
    return response.data;
  },

  createRole: async (roleData: Omit<Role, 'id'>): Promise<Role> => {
    const response = await axios.post(`${API_BASE_URL}/roles`, roleData);
    return response.data;
  },

  updateRole: async (id: string, roleData: Partial<Role>): Promise<Role> => {
    const response = await axios.put(`${API_BASE_URL}/roles/${id}`, roleData);
    return response.data;
  },

  deleteRole: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/roles/${id}`);
  },

  // 权限管理相关
  getPermissions: async (): Promise<Permission[]> => {
    const response = await axios.get(`${API_BASE_URL}/permissions`);
    return response.data;
  },

  assignPermissions: async (roleId: string, permissionIds: string[]): Promise<Role> => {
    const response = await axios.post(`${API_BASE_URL}/roles/${roleId}/permissions`, {
      permissions: permissionIds
    });
    return response.data;
  },

  // 用户角色管理
  assignRole: async (userId: string, roleId: string): Promise<User> => {
    const response = await axios.post(`${API_BASE_URL}/users/${userId}/role`, {
      roleId
    });
    return response.data;
  },

  // 权限检查
  checkPermission: async (permissionCode: string): Promise<boolean> => {
    const response = await axios.get(`${API_BASE_URL}/check-permission/${permissionCode}`);
    return response.data.hasPermission;
  }
};