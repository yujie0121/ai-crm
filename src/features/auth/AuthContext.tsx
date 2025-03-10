import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, PERMISSIONS } from './types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  checkPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// 模拟用户数据
const mockUser: User = {
  id: '1',
  username: 'admin',
  email: 'admin@example.com',
  role: {
    id: '1',
    name: '系统管理员',
    code: 'admin',
    description: '拥有所有系统权限',
    permissions: Object.values(PERMISSIONS).map(code => ({
      id: code,
      name: code,
      code: code,
      description: ''
    }))
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 检查本地存储中的认证状态
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // 这里应该调用实际的登录 API
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 验证测试账号
      if (username === 'admin' && password === '1') {
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return;
      }
      
      throw new Error('用户名或密码错误');
    } catch (error) {
      console.error('登录失败:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const checkPermission = (permission: string): boolean => {
    if (!user || !user.role) return false;
    return user.role.permissions.some(p => p.code === permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        checkPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};