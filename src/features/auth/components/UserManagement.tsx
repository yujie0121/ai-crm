import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { User, ROLES } from '../types';
import PermissionGuard from '../PermissionGuard';

interface UserFormData {
  username: string;
  email: string;
  password: string;
  roleCode: string;
}

// 模拟用户数据
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: {
      id: '1',
      name: '系统管理员',
      code: ROLES.ADMIN,
      description: '拥有所有系统权限',
      permissions: []
    }
  },
  {
    id: '2',
    username: 'manager',
    email: 'manager@example.com',
    role: {
      id: '2',
      name: '销售经理',
      code: ROLES.MANAGER,
      description: '管理销售团队和查看报表',
      permissions: []
    }
  }
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    email: '',
    password: '',
    roleCode: ''
  });

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        username: user.username,
        email: user.email,
        password: '',
        roleCode: user.role.code
      });
    } else {
      setEditingUser(null);
      setFormData({
        username: '',
        email: '',
        password: '',
        roleCode: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (e: any) => {
    setFormData(prev => ({
      ...prev,
      roleCode: e.target.value
    }));
  };

  const handleSubmit = () => {
    // 这里应该调用API保存用户数据
    // 模拟保存操作
    if (editingUser) {
      setUsers(prev =>
        prev.map(user =>
          user.id === editingUser.id
            ? {
                ...user,
                username: formData.username,
                email: formData.email,
                role: {
                  ...user.role,
                  code: formData.roleCode
                }
              }
            : user
        )
      );
    } else {
      const newUser: User = {
        id: String(Date.now()),
        username: formData.username,
        email: formData.email,
        role: {
          id: String(Date.now()),
          name: formData.roleCode === ROLES.ADMIN ? '系统管理员' : '普通用户',
          code: formData.roleCode,
          description: '',
          permissions: []
        }
      };
      setUsers(prev => [...prev, newUser]);
    }

    handleCloseDialog();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h2">
          用户管理
        </Typography>
        <PermissionGuard permission="ROLE_MANAGE">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog()}
          >
            添加用户
          </Button>
        </PermissionGuard>
      </Box>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>用户名</TableCell>
                  <TableCell>邮箱</TableCell>
                  <TableCell>角色</TableCell>
                  <TableCell>操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role.name}</TableCell>
                    <TableCell>
                      <PermissionGuard permission="ROLE_MANAGE">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleOpenDialog(user)}
                        >
                          编辑
                        </Button>
                      </PermissionGuard>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingUser ? '编辑用户' : '添加用户'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="用户名"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="邮箱"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              margin="normal"
            />
            {!editingUser && (
              <TextField
                fullWidth
                label="密码"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                margin="normal"
              />
            )}
            <FormControl fullWidth margin="normal">
              <InputLabel>角色</InputLabel>
              <Select
                value={formData.roleCode}
                onChange={handleRoleChange}
                label="角色"
              >
                <MenuItem value={ROLES.ADMIN}>系统管理员</MenuItem>
                <MenuItem value={ROLES.MANAGER}>销售经理</MenuItem>
                <MenuItem value={ROLES.SALES}>销售人员</MenuItem>
                <MenuItem value={ROLES.VIEWER}>普通用户</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;