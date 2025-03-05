import React from 'react';
import {
  Box,
  Paper,
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
  Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
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
            fontSize: '0.9rem'
          }}
        >
          添加客户
        </Button>
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          mb: 4,
          width: '90%',
          margin: '0 auto',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
          background: 'linear-gradient(to right bottom, #ffffff, #fafafa)',
          backdropFilter: 'blur(10px)',
          '& .MuiTable-root': {
            borderCollapse: 'separate',
            borderSpacing: '0 8px',
            width: '100%',
            overflowX: 'auto'
          },
          '& .MuiTableCell-root': {
            padding: '12px 20px',
            transition: 'all 0.2s ease-in-out'
          },
          '& .MuiTableHead-root .MuiTableCell-root': {
            fontWeight: 600,
            color: '#1a1f2c',
            borderBottom: '2px solid rgba(33, 150, 243, 0.1)'
          }
        }}
      >
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
            {mockCustomers.map((customer) => (
              <TableRow 
                key={customer.id} 
                hover
                sx={{
                  cursor: 'pointer',
                  background: '#ffffff',
                  '& > td': {
                    transition: 'all 0.3s ease',
                    borderBottom: '1px solid rgba(224, 224, 224, 0.4)',
                    '&:first-of-type': {
                      borderTopLeftRadius: '8px',
                      borderBottomLeftRadius: '8px'
                    },
                    '&:last-of-type': {
                      borderTopRightRadius: '8px',
                      borderBottomRightRadius: '8px'
                    }
                  },
                  '&:hover > td': {
                    backgroundColor: 'rgba(33, 150, 243, 0.04)',
                    transform: 'translateY(-1px)'
                  }
                }}
                onClick={() => handleViewCustomer(customer.id)}
              >
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {customer.name}
                  </Typography>
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
                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'primary.main' }}>
                    {customer.value}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={customer.status}
                    size="small"
                    color={getStatusColor(customer.status) as 'error' | 'warning' | 'success' | 'default'}
                    sx={{ minWidth: 72 }}
                  />
                </TableCell>
                <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                  <Tooltip title="查看详情" arrow>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleViewCustomer(customer.id)}
                      sx={{ mr: 1 }}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="编辑客户" arrow>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEditCustomer(customer.id)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomerList;