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

interface SalesOpportunity {
  id: string;
  customerName: string;
  productName: string;
  amount: number;
  stage: string;
  probability: number;
  expectedClosingDate: string;
}

const mockSalesData: SalesOpportunity[] = [
  {
    id: '1',
    customerName: '科技有限公司',
    productName: '企业管理系统',
    amount: 100000,
    stage: '需求确认',
    probability: 60,
    expectedClosingDate: '2024-06-30'
  },
  {
    id: '2',
    customerName: '贸易有限公司',
    productName: '仓储管理系统',
    amount: 80000,
    stage: '商务谈判',
    probability: 40,
    expectedClosingDate: '2024-07-15'
  }
];

const getStageColor = (stage: string) => {
  switch (stage) {
    case '已成交':
      return 'success';
    case '商务谈判':
      return 'warning';
    case '需求确认':
      return 'primary';
    case '已失败':
      return 'error';
    default:
      return 'default';
  }
};

const SalesList: React.FC = () => {
  const navigate = useNavigate();

  const handleViewOpportunity = (opportunityId: string) => {
    navigate(`/sales/${opportunityId}`);
  };

  const handleEditOpportunity = (opportunityId: string) => {
    navigate(`/sales/${opportunityId}/edit`);
  };

  const handleCreateOpportunity = () => {
    navigate('/sales/create');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          销售机会
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateOpportunity}
          startIcon={<AddIcon />}
          sx={{
            px: 3,
            py: 1,
            fontSize: '0.9rem'
          }}
        >
          新增机会
        </Button>
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          mb: 4,
          width: '100%',
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
              <TableCell>产品名称</TableCell>
              <TableCell>金额</TableCell>
              <TableCell>阶段</TableCell>
              <TableCell>成功概率</TableCell>
              <TableCell>预计成交日期</TableCell>
              <TableCell align="center" width="120">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockSalesData.map((opportunity) => (
              <TableRow 
                key={opportunity.id} 
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
                onClick={() => handleViewOpportunity(opportunity.id)}
              >
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {opportunity.customerName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{opportunity.productName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'primary.main' }}>
                    ¥{opportunity.amount.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={opportunity.stage}
                    size="small"
                    color={getStageColor(opportunity.stage) as 'error' | 'warning' | 'success' | 'default'}
                    sx={{ minWidth: 80 }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      {opportunity.probability}%
                    </Typography>
                    <Box
                      sx={{
                        width: 60,
                        height: 4,
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                        borderRadius: 2,
                        overflow: 'hidden'
                      }}
                    >
                      <Box
                        sx={{
                          width: `${opportunity.probability}%`,
                          height: '100%',
                          backgroundColor: 'primary.main',
                          transition: 'width 0.3s ease-in-out'
                        }}
                      />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{opportunity.expectedClosingDate}</Typography>
                </TableCell>
                <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                  <Tooltip title="查看详情" arrow>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleViewOpportunity(opportunity.id)}
                      sx={{ mr: 1 }}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="编辑机会" arrow>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEditOpportunity(opportunity.id)}
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

export default SalesList;