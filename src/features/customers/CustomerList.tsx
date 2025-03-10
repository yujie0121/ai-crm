import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Avatar,
  Grid
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  lastContact?: string;
  value?: string;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: '张三',
    company: '科技有限公司',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    status: '活跃',
    lastContact: '2024-02-28',
    value: '¥100,000'
  },
  {
    id: '2',
    name: '李四',
    company: '贸易有限公司',
    email: 'lisi@example.com',
    phone: '13900139000',
    status: '潜在',
    lastContact: '2024-02-25',
    value: '¥50,000'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case '活跃':
      return 'success';
    case '潜在':
      return 'primary';
    case '流失风险':
      return 'warning';
    case '已流失':
      return 'error';
    default:
      return 'default';
  }
};

const CustomerList: React.FC = () => {
  const navigate = useNavigate();

  const handleViewCustomer = (customerId: string) => {
    navigate(`/customers/${customerId}`);
  };

  const handleEditCustomer = (customerId: string) => {
    navigate(`/customers/${customerId}/edit`);
  };

  const handleCreateCustomer = () => {
    navigate('/customers/create');
  };

  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  // 处理筛选菜单
  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };
  
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    handleFilterClose();
  };
  
  // 筛选客户数据
  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '全部' || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'primary.dark' }}>
          客户管理
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateCustomer}
          startIcon={<AddIcon />}
          sx={{
            px: 3,
            py: 1,
            fontSize: '0.9rem',
            boxShadow: theme.shadows[2],
            '&:hover': {
              boxShadow: theme.shadows[4],
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.2s'
          }}
        >
          添加客户
        </Button>
      </Box>
      
      {/* 搜索和筛选工具栏 */}
      <Card sx={{ mb: 3, boxShadow: theme.shadows[1], borderRadius: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="搜索客户名称、公司或邮箱..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.background.paper, 0.8),
                    '&:hover': {
                      backgroundColor: theme.palette.background.paper,
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleFilterClick}
                startIcon={<FilterListIcon />}
                sx={{ mr: 1, borderRadius: 2 }}
              >
                {statusFilter === '全部' ? '筛选状态' : `状态: ${statusFilter}`}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleFilterClose}
                PaperProps={{
                  elevation: 3,
                  sx: { borderRadius: 2, minWidth: 180 }
                }}
              >
                <MenuItem 
                  onClick={() => handleStatusFilterChange('全部')}
                  selected={statusFilter === '全部'}
                >
                  全部
                </MenuItem>
                <MenuItem 
                  onClick={() => handleStatusFilterChange('活跃')}
                  selected={statusFilter === '活跃'}
                >
                  <Chip 
                    size="small" 
                    label="活跃" 
                    color="success" 
                    sx={{ mr: 1, height: 20 }} 
                  />
                  活跃
                </MenuItem>
                <MenuItem 
                  onClick={() => handleStatusFilterChange('潜在')}
                  selected={statusFilter === '潜在'}
                >
                  <Chip 
                    size="small" 
                    label="潜在" 
                    color="primary" 
                    sx={{ mr: 1, height: 20 }} 
                  />
                  潜在
                </MenuItem>
                <MenuItem 
                  onClick={() => handleStatusFilterChange('流失风险')}
                  selected={statusFilter === '流失风险'}
                >
                  <Chip 
                    size="small" 
                    label="流失风险" 
                    color="warning" 
                    sx={{ mr: 1, height: 20 }} 
                  />
                  流失风险
                </MenuItem>
                <MenuItem 
                  onClick={() => handleStatusFilterChange('已流失')}
                  selected={statusFilter === '已流失'}
                >
                  <Chip 
                    size="small" 
                    label="已流失" 
                    color="error" 
                    sx={{ mr: 1, height: 20 }} 
                  />
                  已流失
                </MenuItem>
              </Menu>
              <Button
                variant="text"
                color="primary"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('全部');
                }}
                sx={{ borderRadius: 2 }}
              >
                重置
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: theme.shadows[1] }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>客户名称</TableCell>
                <TableCell>公司</TableCell>
                <TableCell>联系方式</TableCell>
                <TableCell>最近联系</TableCell>
                <TableCell>客户价值</TableCell>
                <TableCell>状态</TableCell>
                <TableCell align="center" width="120">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow 
                    key={customer.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      },
                      cursor: 'pointer',
                    }}
                    onClick={() => handleViewCustomer(customer.id)}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ 
                            width: 36, 
                            height: 36, 
                            mr: 2, 
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: 'primary.main',
                            fontWeight: 'bold'
                          }}
                        >
                          {customer.name.charAt(0)}
                        </Avatar>
                        <Typography variant="subtitle2" fontWeight="medium">
                          {customer.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{customer.company}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{customer.phone}</Typography>
                      <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                        {customer.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{customer.lastContact}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="subtitle2" 
                        fontWeight="medium" 
                        color={customer.value && parseInt(customer.value.replace(/[^0-9]/g, '')) > 80000 ? 'success.main' : 'text.primary'}
                      >
                        {customer.value}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={customer.status}
                        color={getStatusColor(customer.status) as 'error' | 'warning' | 'success' | 'default'}
                        size="small"
                        sx={{ 
                          fontWeight: 500,
                          borderRadius: '6px',
                          px: 1,
                          minWidth: 72
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                      <Tooltip title="查看详情" arrow>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewCustomer(customer.id);
                          }}
                          sx={{ 
                            mr: 1,
                            '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.1) }
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="编辑客户" arrow>
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditCustomer(customer.id);
                          }}
                          sx={{ 
                            '&:hover': { backgroundColor: alpha(theme.palette.secondary.main, 0.1) }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <SearchOffIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        未找到匹配的客户
                      </Typography>
                      <Typography variant="body2" color="text.disabled">
                        尝试调整搜索条件或清除筛选器
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default CustomerList;