import React from 'react';
import { PERMISSIONS } from './types';
import { useAuth } from './AuthContext';

interface PermissionGuardProps {
  permission: keyof typeof PERMISSIONS;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permission,
  children,
  fallback = null
}) => {
  const { checkPermission } = useAuth();
  const hasPermission = checkPermission(PERMISSIONS[permission]);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default PermissionGuard;