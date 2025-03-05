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
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Role, Permission, PERMISSIONS } from './types';
import PermissionGuard from './PermissionGuard';

interface RoleFormData {
  name: string;
  code: string;
  description: string;
  permissions: string[];
}

const mockRoles: Role[] = [
  {
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
  },
  {
    id: '2',
    name: '销售经理',
    code: 'manager',
    description: '管理销售团队和查看报表',
    permissions: [
      { id: 'sales:view', name: '查看销售', code: 'sales:view', description: '' },
      { id: 'sales:edit', name: '编辑销售', code: 'sales:edit', description: '' },
      { id: 'report:view', name: '查看报表', code: 'report:view', description: '' }
    ]
  }
];

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState<RoleFormData>({
    name: '',
    code: '',
    description: '',
    permissions: []
  });

  const handleOpenDialog = (role?: Role) => {
    if (role) {
      setEditingRole(role);
      setFormData({
        name: role.name,
        code: role.code,
        description: role.description,
        permissions: role.permissions.map(p => p.code)
      });
    } else {
      setEditingRole(null);
      setFormData({
        name: '',
        code: '',
        description: '',
        permissions: []
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingRole(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (permission: string) => {
    setFormData(prev => {
      const permissions = prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission];
      return { ...prev, permissions };
    });
  };

  const handleSubmit = () => {
    const newRole: Role = {
      id: editingRole?.id || String(Date.now()),
      name: formData.name,
      code: formData.code,
      description: formData.description,
      permissions: formData.permissions.map(code => ({
        id: code,
        name: code,
        code: code,
        description: ''
      }))
    };

    if (editingRole) {
      setRoles(prev =>
        prev.map(role => (role.id === editingRole.id ? newRole : role))
      );
    } else {
      setRoles(prev => [...prev, newRole]);
    }

    handleCloseDialog();
  };

  return (
    <PermissionGuard permission="ROLE_MANAGE">
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" component="h2">
            角色管理
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog()}
          >
            新建角色
          </Button>
        </Box>

        <Card>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>角色名称</TableCell>
                    <TableCell>角色代码</TableCell>
                    <TableCell>描述</TableCell>
                    <TableCell>权限数量</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roles.map(role => (
                    <TableRow key={role.id}>
                      <TableCell>{role.name}</TableCell>
                      <TableCell>{role.code}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>{role.permissions.length}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleOpenDialog(role)}
                        >
                          编辑
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {editingRole ? '编辑角色' : '新建角色'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="角色名称"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="角色代码"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="描述"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={2}
                sx={{ mb: 3 }}
              />
              <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend">权限设置</FormLabel>
                <FormGroup sx={{ mt: 1 }}>
                  {Object.entries(PERMISSIONS).map(([key, value]) => (
                    <FormControlLabel
                      key={key}
                      control={
                        <Checkbox
                          checked={formData.permissions.includes(value)}
                          onChange={() => handlePermissionChange(value)}
                        />
                      }
                      label={key}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>取消</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={!formData.name || !formData.code}
            >
              确定
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PermissionGuard>
  );
};

export default RoleManagement;