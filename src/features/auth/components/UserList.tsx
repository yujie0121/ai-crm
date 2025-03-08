import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { User, Role } from '../types';
import { authApi } from '../api/authApi';
import PermissionGuard from '../PermissionGuard';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, []);

  const loadUsers = async () => {
    try {
      // 这里应该调用实际的用户列表API
      // 暂时使用模拟数据
      setUsers([
        {
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          role: {
            id: '1',
            name: '系统管理员',
            code: 'admin',
            description: '拥有所有系统权限',
            permissions: []
          }
        }
      ]);
    } catch (err) {
      setError('加载用户列表失败');
    }
  };

  const loadRoles = async () => {
    try {
      const data = await authApi.getRoles();
      setRoles(data);
    } catch (err) {
      setError('加载角色列表失败');
    }
  };

  const handleOpenDialog = (user: User) => {
    setSelectedUser(user);
    setSelectedRole(user.role.id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setSelectedRole('');
    setError(null);
  };

  const handleSubmit = async () => {
    if (!selectedUser || !selectedRole) return;

    try {
      await authApi.assignRole(selectedUser.id, selectedRole);
      await loadUsers();
      handleCloseDialog();
    } catch (err) {
      setError('更新用户角色失败');
    }
  };

  return (
    <PermissionGuard permission="ROLE_MANAGE">
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>用户管理</Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Card>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>用户名</TableCell>
                    <TableCell>邮箱</TableCell>
                    <TableCell>当前角色</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role.name}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpenDialog(user)}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>分配角色</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>角色</InputLabel>
                <Select
                  value={selectedRole}
                  label="角色"
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>取消</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              确定
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PermissionGuard>
  );
};

export default UserList;