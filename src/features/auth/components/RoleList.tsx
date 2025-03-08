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
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Role, PERMISSIONS } from '../types';
import { authApi } from '../api/authApi';
import PermissionGuard from '../PermissionGuard';

const RoleList: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    permissions: [] as string[]
  });

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      const data = await authApi.getRoles();
      setRoles(data);
    } catch (err) {
      setError('加载角色列表失败');
    }
  };

  const handleOpenDialog = (role?: Role) => {
    if (role) {
      setSelectedRole(role);
      setFormData({
        name: role.name,
        code: role.code,
        description: role.description,
        permissions: role.permissions.map(p => p.code)
      });
    } else {
      setSelectedRole(null);
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
    setSelectedRole(null);
    setError(null);
  };

  const handleSubmit = async () => {
    try {
      if (selectedRole) {
        await authApi.updateRole(selectedRole.id, {
          ...formData,
          permissions: formData.permissions.map(code => ({
            id: code,
            code,
            name: code,
            description: ''
          }))
        });
      } else {
        await authApi.createRole({
          ...formData,
          permissions: formData.permissions.map(code => ({
            id: code,
            code,
            name: code,
            description: ''
          }))
        });
      }
      await loadRoles();
      handleCloseDialog();
    } catch (err) {
      setError(selectedRole ? '更新角色失败' : '创建角色失败');
    }
  };

  const handleDeleteRole = async (id: string) => {
    if (window.confirm('确定要删除这个角色吗？')) {
      try {
        await authApi.deleteRole(id);
        await loadRoles();
      } catch (err) {
        setError('删除角色失败');
      }
    }
  };

  return (
    <PermissionGuard permission="ROLE_MANAGE">
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">角色管理</Typography>
          <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
            创建角色
          </Button>
        </Box>

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
                    <TableCell>角色名称</TableCell>
                    <TableCell>角色代码</TableCell>
                    <TableCell>描述</TableCell>
                    <TableCell>权限数量</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>{role.name}</TableCell>
                      <TableCell>{role.code}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>{role.permissions.length}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpenDialog(role)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteRole(role.id)}>
                          <DeleteIcon />
                        </IconButton>
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
            {selectedRole ? '编辑角色' : '创建角色'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="角色名称"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="角色代码"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="描述"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                sx={{ mb: 3 }}
                multiline
                rows={2}
              />
              <FormControl component="fieldset">
                <FormLabel component="legend">权限</FormLabel>
                <FormGroup>
                  {Object.entries(PERMISSIONS).map(([key, value]) => (
                    <FormControlLabel
                      key={key}
                      control={
                        <Checkbox
                          checked={formData.permissions.includes(value)}
                          onChange={(e) => {
                            const newPermissions = e.target.checked
                              ? [...formData.permissions, value]
                              : formData.permissions.filter(p => p !== value);
                            setFormData({ ...formData, permissions: newPermissions });
                          }}
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
            <Button onClick={handleSubmit} variant="contained" color="primary">
              确定
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PermissionGuard>
  );
};

export default RoleList;